import { Request, Response } from 'express';
import { storage } from './storage.js';
import { processCustomerMessage } from './gemini.js';

export interface WhatsAppIncomingMessage {
  from: string; // phone number e.g. "252615000000"
  body: string;
  name?: string;
  timestamp?: string;
}

export interface WhatsAppOutgoingMessage {
  to: string;
  body: string;
  preview_url?: boolean;
}

/**
 * WhatsApp Webhook Verification (GET /api/whatsapp/webhook)
 * Standard Meta WhatsApp Cloud API Webhook handshake
 */
export function handleWhatsAppVerify(req: Request, res: Response): void {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'xirfadonet_secure_token';

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WhatsApp webhook verified successfully');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
}

/**
 * WhatsApp Inbound Message Handler (POST /api/whatsapp/webhook)
 * Clean pipeline ready for Meta WhatsApp Cloud API payloads or Twilio
 */
export async function handleWhatsAppInbound(req: Request, res: Response): Promise<void> {
  try {
    const body = req.body;

    // Support both standard Meta Webhook shape and clean test payload
    let incomingMessage: WhatsAppIncomingMessage | null = null;

    if (body.entry && body.entry[0]?.changes && body.entry[0].changes[0]?.value?.messages) {
      // Standard Meta Cloud API
      const metaMsg = body.entry[0].changes[0].value.messages[0];
      const contact = body.entry[0].changes[0].value.contacts?.[0];
      if (metaMsg && metaMsg.type === 'text') {
        incomingMessage = {
          from: metaMsg.from,
          body: metaMsg.text.body,
          name: contact?.profile?.name,
          timestamp: metaMsg.timestamp,
        };
      }
    } else if (body.from && body.body) {
      // Direct integration payload (e.g. from simulator or microservice proxy)
      incomingMessage = {
        from: body.from,
        body: body.body,
        name: body.name,
      };
    }

    if (!incomingMessage) {
      res.status(200).json({ status: 'ignored_or_non_text' });
      return;
    }

    const { from, body: messageText, name } = incomingMessage;

    // 1. Customer Identification / Profile
    const customer = storage.findOrCreateCustomer(name || `WhatsApp (${from})`, from, '', 'so');

    // 2. Locate active conversation or create new
    let conv = storage
      .getAllConversations()
      .find((c) => c.customer_id === customer.customer_id && c.channel === 'whatsapp' && c.status !== 'resolved');

    if (!conv) {
      conv = storage.createConversation({
        customer_id: customer.customer_id,
        customer_name: customer.name,
        customer_phone: customer.phone,
        channel: 'whatsapp',
        language: customer.preferred_language,
      });
    }

    // 3. Record user message
    storage.addMessageToConversation(conv.id, {
      sender: 'customer',
      content: messageText,
    });

    // 4. Check if currently assigned to human admin
    if (conv.status === 'admin_active') {
      res.status(200).json({
        status: 'queued_for_admin',
        conversation_id: conv.id,
      });
      return;
    }

    // 5. Generate AI reply
    const history = conv.messages.slice(-8).map((m) => ({
      role: m.sender === 'customer' ? ('user' as const) : ('assistant' as const),
      text: m.content,
    }));

    const aiResult = await processCustomerMessage(messageText, history, conv.language);

    // 6. Record AI assistant reply
    storage.addMessageToConversation(conv.id, {
      sender: 'assistant',
      content: aiResult.reply,
      is_handoff_offer: aiResult.isHandoffOffer,
      suggested_course_id: aiResult.suggestedCourseId,
    });

    if (aiResult.isPaymentProof) {
      storage.updateConversationStatus(conv.id, 'payment_proof_received');
    } else if (aiResult.isHandoffOffer) {
      storage.updateConversationStatus(conv.id, 'needs_admin');
    }

    if (aiResult.suggestedCourseId || aiResult.courseInterest || aiResult.problemCategory) {
      storage.updateCustomerProfile(customer.customer_id, {
        course_interest: aiResult.courseInterest || aiResult.suggestedCourse?.title,
        problem_category: aiResult.problemCategory,
      });
    }

    // 7. Dispatch outgoing WhatsApp payload
    const outgoingPayload: WhatsAppOutgoingMessage = {
      to: from,
      body: aiResult.reply,
    };

    console.log('[WhatsApp Dispatch Ready]:', JSON.stringify(outgoingPayload));

    res.status(200).json({
      status: 'success',
      conversation_id: conv.id,
      reply: aiResult.reply,
      isHandoffOffer: aiResult.isHandoffOffer,
      suggestedCourse: aiResult.suggestedCourse,
    });
  } catch (err) {
    console.error('WhatsApp inbound handler error:', err);
    res.status(500).json({ error: 'Internal error processing message' });
  }
}
