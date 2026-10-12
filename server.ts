import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { storage } from './server/storage.js';
import { processCustomerMessage } from './server/gemini.js';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support JSON and URL-encoded with 50mb limit for phone screenshot uploads
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'XirfadoNet Education Platform & AI Customer Service',
      version: '2.0.0',
      time: new Date().toISOString(),
      geminiConfigured: !!process.env.GEMINI_API_KEY,
    });
  });

  // --- AI Settings API ---
  app.get('/api/ai/settings', (req: Request, res: Response) => {
    try {
      res.json(storage.getAiSettings());
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch AI settings' });
    }
  });

  app.put('/api/ai/settings', (req: Request, res: Response) => {
    try {
      const updated = storage.updateAiSettings(req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update AI settings' });
    }
  });

  // --- Admin Stats ---
  app.get('/api/admin/stats', (req: Request, res: Response) => {
    try {
      const stats = storage.getStats();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch admin stats' });
    }
  });

  // --- Categories API ---
  app.get('/api/categories', (req: Request, res: Response) => {
    const { publishedOnly } = req.query;
    const categories =
      publishedOnly === 'true'
        ? storage.getPublishedCategories()
        : storage.getAllCategories();
    res.json(categories);
  });

  app.post('/api/categories', (req: Request, res: Response) => {
    try {
      const { name, slug, description, icon, status } = req.body;
      if (!name) {
        res.status(400).json({ error: 'Category name is required' });
        return;
      }
      const newCat = storage.createCategory({
        name,
        slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: description || '',
        icon: icon || 'Folder',
        status: status || 'published',
      });
      res.status(201).json(newCat);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create category' });
    }
  });

  app.put('/api/categories/:id', (req: Request, res: Response) => {
    const updated = storage.updateCategory(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json(updated);
  });

  app.patch('/api/categories/:id/status', (req: Request, res: Response) => {
    const { status } = req.body;
    if (!['published', 'draft'].includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }
    const updated = storage.updateCategory(req.params.id, { status });
    if (!updated) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json(updated);
  });

  app.delete('/api/categories/:id', (req: Request, res: Response) => {
    const deleted = storage.deleteCategory(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json({ success: true, message: 'Category deleted' });
  });

  // --- Courses API ---
  app.get('/api/courses', (req: Request, res: Response) => {
    const { publishedOnly } = req.query;
    const courses = publishedOnly === 'true' ? storage.getPublishedCourses() : storage.getAllCourses();
    res.json(courses);
  });

  app.get('/api/courses/:id', (req: Request, res: Response) => {
    const course = storage.getCourseById(req.params.id);
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json(course);
  });

  app.post('/api/courses', (req: Request, res: Response) => {
    try {
      const {
        title,
        slug,
        description,
        price,
        previous_price,
        discount_percent,
        currency,
        category,
        category_id,
        duration,
        image,
        target_audience,
        learning_outcomes,
        lessons,
        requirements,
        status,
        course_url,
      } = req.body;

      if (!title || price === undefined) {
        res.status(400).json({ error: 'Title and price are required' });
        return;
      }

      const numPrice = Number(price);
      const numPrevPrice = previous_price !== undefined && previous_price !== '' ? Number(previous_price) : undefined;
      const discount =
        discount_percent !== undefined && discount_percent !== ''
          ? Number(discount_percent)
          : numPrevPrice && numPrevPrice > numPrice
          ? Math.round(((numPrevPrice - numPrice) / numPrevPrice) * 100)
          : undefined;

      const newCourse = storage.createCourse({
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: description || '',
        price: numPrice,
        previous_price: numPrevPrice,
        discount_percent: discount,
        currency: currency || 'USD',
        category: category || 'YouTube & Content Creation',
        category_id,
        duration: duration || '',
        image: image || '',
        target_audience: target_audience || '',
        learning_outcomes: Array.isArray(learning_outcomes) ? learning_outcomes : [],
        lessons: Array.isArray(lessons) ? lessons : [],
        requirements: Array.isArray(requirements) ? requirements : [],
        status: status || 'published',
        course_url: course_url || 'https://xirfadonet.com',
      });

      res.status(201).json(newCourse);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create course' });
    }
  });

  app.put('/api/courses/:id', (req: Request, res: Response) => {
    const data = { ...req.body };
    if (data.price !== undefined) data.price = Number(data.price);
    if (data.previous_price !== undefined && data.previous_price !== '') {
      data.previous_price = Number(data.previous_price);
      if (data.previous_price > data.price) {
        data.discount_percent = Math.round(((data.previous_price - data.price) / data.previous_price) * 100);
      }
    }
    const updated = storage.updateCourse(req.params.id, data);
    if (!updated) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json(updated);
  });

  app.patch('/api/courses/:id/status', (req: Request, res: Response) => {
    const { status } = req.body;
    if (!['published', 'draft', 'archived'].includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }
    const updated = storage.updateCourse(req.params.id, { status });
    if (!updated) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json(updated);
  });

  app.delete('/api/courses/:id', (req: Request, res: Response) => {
    const deleted = storage.deleteCourse(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json({ success: true, message: 'Course deleted successfully' });
  });

  // --- Problem Topics API (Manageable from Admin) ---
  app.get('/api/topics', (req: Request, res: Response) => {
    const { activeOnly } = req.query;
    res.json(activeOnly === 'true' ? storage.getActiveTopics() : storage.getAllTopics());
  });

  app.post('/api/topics', (req: Request, res: Response) => {
    try {
      const { title_so, title_en, category, prompt_starter_so, prompt_starter_en, icon } = req.body;
      if (!title_so || !title_en) {
        res.status(400).json({ error: 'Titles are required' });
        return;
      }
      const newTopic = storage.createTopic({
        title_so,
        title_en,
        category: category || 'general',
        prompt_starter_so: prompt_starter_so || title_so,
        prompt_starter_en: prompt_starter_en || title_en,
        icon: icon || 'HelpCircle',
        is_active: true,
      });
      res.status(201).json(newTopic);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create topic' });
    }
  });

  app.put('/api/topics/:id', (req: Request, res: Response) => {
    const updated = storage.updateTopic(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Topic not found' });
      return;
    }
    res.json(updated);
  });

  app.delete('/api/topics/:id', (req: Request, res: Response) => {
    const deleted = storage.deleteTopic(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Topic not found' });
      return;
    }
    res.json({ success: true, message: 'Topic deleted' });
  });

  // --- Payment Settings API (Admin-managed manual workflow) ---
  app.get('/api/payment-settings', (req: Request, res: Response) => {
    res.json(storage.getPaymentSettings());
  });

  app.put('/api/payment-settings', (req: Request, res: Response) => {
    try {
      const updated = storage.updatePaymentSettings(req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update payment settings' });
    }
  });

  // --- AI Settings API ---
  app.get('/api/ai-settings', (req: Request, res: Response) => {
    res.json(storage.getAiSettings());
  });

  app.put('/api/ai-settings', (req: Request, res: Response) => {
    try {
      const updated = storage.updateAiSettings(req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update AI settings' });
    }
  });

  // --- AI Niches API ---
  app.get('/api/niches', (req: Request, res: Response) => {
    res.json(storage.getNiches());
  });

  app.post('/api/niches', (req: Request, res: Response) => {
    try {
      const newNiche = storage.createNiche(req.body);
      res.status(201).json(newNiche);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create niche idea' });
    }
  });

  app.put('/api/niches/:id', (req: Request, res: Response) => {
    const updated = storage.updateNiche(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Niche not found' });
      return;
    }
    res.json(updated);
  });

  app.delete('/api/niches/:id', (req: Request, res: Response) => {
    const deleted = storage.deleteNiche(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Niche not found' });
      return;
    }
    res.json({ success: true, message: 'Niche deleted' });
  });

  // --- Content Ideas API ---
  app.get('/api/content-ideas', (req: Request, res: Response) => {
    const { category } = req.query;
    res.json(storage.getContentIdeas(typeof category === 'string' ? category : undefined));
  });

  app.post('/api/content-ideas', (req: Request, res: Response) => {
    try {
      const newIdea = storage.createContentIdea(req.body);
      res.status(201).json(newIdea);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create content idea' });
    }
  });

  app.delete('/api/content-ideas/:id', (req: Request, res: Response) => {
    const deleted = storage.deleteContentIdea(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Content idea not found' });
      return;
    }
    res.json({ success: true, message: 'Content idea deleted' });
  });

  // --- Blog Posts API ---
  app.get('/api/blog-posts', (req: Request, res: Response) => {
    res.json(storage.getBlogPosts());
  });

  app.get('/api/blog-posts/:id', (req: Request, res: Response) => {
    const post = storage.getBlogPostById(req.params.id);
    if (!post) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }
    res.json(post);
  });

  app.post('/api/blog-posts', (req: Request, res: Response) => {
    try {
      const newPost = storage.createBlogPost(req.body);
      res.status(201).json(newPost);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create blog post' });
    }
  });

  app.put('/api/blog-posts/:id', (req: Request, res: Response) => {
    const updated = storage.updateBlogPost(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }
    res.json(updated);
  });

  app.delete('/api/blog-posts/:id', (req: Request, res: Response) => {
    const deleted = storage.deleteBlogPost(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }
    res.json({ success: true, message: 'Blog post deleted' });
  });

  // --- Student Reviews API ---
  app.get('/api/reviews', (req: Request, res: Response) => {
    res.json(storage.getReviews());
  });

  app.post('/api/reviews', (req: Request, res: Response) => {
    try {
      const newReview = storage.createReview(req.body);
      res.status(201).json(newReview);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create review' });
    }
  });

  app.put('/api/reviews/:id', (req: Request, res: Response) => {
    const updated = storage.updateReview(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }
    res.json(updated);
  });

  app.delete('/api/reviews/:id', (req: Request, res: Response) => {
    const deleted = storage.deleteReview(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }
    res.json({ success: true, message: 'Review deleted' });
  });

  // --- 1-on-1 Coaching Requests API ---
  app.get('/api/coaching-requests', (req: Request, res: Response) => {
    res.json(storage.getCoachingRequests());
  });

  app.post('/api/coaching-requests', (req: Request, res: Response) => {
    try {
      const { student_name, phone_number, email, skill_or_topic, preferred_language, message } = req.body;
      if (!student_name || !phone_number || !skill_or_topic) {
        res.status(400).json({ error: 'Magaca, taleefanka, iyo mawduuca coaching-ka waa qasab' });
        return;
      }
      const newReq = storage.createCoachingRequest({
        student_name,
        phone_number,
        email,
        skill_or_topic,
        preferred_language: preferred_language || 'so',
        message,
      });
      res.status(201).json(newReq);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create coaching request' });
    }
  });

  app.patch('/api/coaching-requests/:id/status', (req: Request, res: Response) => {
    const { status } = req.body;
    const updated = storage.updateCoachingStatus(req.params.id, status);
    if (!updated) {
      res.status(404).json({ error: 'Coaching request not found' });
      return;
    }
    res.json(updated);
  });

  // --- Course Registrations API ---
  app.get('/api/course-registrations', (req: Request, res: Response) => {
    res.json(storage.getCourseRegistrations());
  });

  app.post('/api/course-registrations', (req: Request, res: Response) => {
    try {
      const { student_name, phone_number, email, course_id, course_title, course_price, notes } = req.body;
      if (!student_name || !phone_number || !course_id) {
        res.status(400).json({ error: 'Magaca, taleefanka, iyo koorsada waa qasab' });
        return;
      }
      const newReg = storage.createCourseRegistration({
        student_name,
        phone_number,
        email,
        course_id,
        course_title: course_title || 'Course Registration',
        course_price: course_price || 0,
        notes,
      });
      res.status(201).json(newReg);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create course registration' });
    }
  });

  app.patch('/api/course-registrations/:id/status', (req: Request, res: Response) => {
    const { status, notes } = req.body;
    const updated = storage.updateCourseRegistrationStatus(req.params.id, status, notes);
    if (!updated) {
      res.status(404).json({ error: 'Registration not found' });
      return;
    }
    res.json(updated);
  });

  app.post('/api/course-registrations/:id/payment-proof', (req: Request, res: Response) => {
    try {
      const { proof_image, proof_text, payment_method, payment_number_used } = req.body;
      const updated = storage.submitCoursePaymentProof(req.params.id, {
        proof_image,
        proof_text,
        payment_method,
        payment_number_used,
      });
      if (!updated) {
        res.status(404).json({ error: 'Registration not found' });
        return;
      }
      res.json({
        success: true,
        message: 'Caddeynta payment-ka waan helnay ✅ Maamulka ayaa hubinaya.',
        registration: updated,
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to process payment proof' });
    }
  });

  // --- Views Guides & Online Work Read APIs ---
  app.get('/api/views-guides', (req: Request, res: Response) => {
    res.json(storage.getViewsGuides());
  });

  app.get('/api/online-work', (req: Request, res: Response) => {
    res.json(storage.getOnlineWorkTopics());
  });

  // --- Knowledge Base API ---
  app.get('/api/knowledge', (req: Request, res: Response) => {
    const { activeOnly } = req.query;
    const items = activeOnly === 'true' ? storage.getActiveKnowledge() : storage.getAllKnowledge();
    res.json(items);
  });

  app.get('/api/knowledge/:id', (req: Request, res: Response) => {
    const item = storage.getKnowledgeById(req.params.id);
    if (!item) {
      res.status(404).json({ error: 'Knowledge item not found' });
      return;
    }
    res.json(item);
  });

  app.post('/api/knowledge', (req: Request, res: Response) => {
    try {
      const { title, content, category, language, status } = req.body;
      if (!title || !content) {
        res.status(400).json({ error: 'Title and content are required' });
        return;
      }

      const newItem = storage.createKnowledge({
        title,
        content,
        category: category || 'general_support',
        language: language || 'both',
        status: status || 'active',
      });

      res.status(201).json(newItem);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create knowledge item' });
    }
  });

  app.put('/api/knowledge/:id', (req: Request, res: Response) => {
    const updated = storage.updateKnowledge(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Knowledge item not found' });
      return;
    }
    res.json(updated);
  });

  app.delete('/api/knowledge/:id', (req: Request, res: Response) => {
    const deleted = storage.deleteKnowledge(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Knowledge item not found' });
      return;
    }
    res.json({ success: true, message: 'Knowledge item deleted' });
  });

  // --- Customers API ---
  app.get('/api/customers', (req: Request, res: Response) => {
    res.json(storage.getAllCustomers());
  });

  app.get('/api/customers/:id', (req: Request, res: Response) => {
    const customer = storage.getCustomerById(req.params.id);
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    res.json(customer);
  });

  app.post('/api/customers', (req: Request, res: Response) => {
    const { name, phone, email, preferred_language } = req.body;
    const customer = storage.findOrCreateCustomer(name, phone, email, preferred_language);
    res.status(201).json(customer);
  });

  app.put('/api/customers/:id', (req: Request, res: Response) => {
    const updated = storage.updateCustomer(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    res.json(updated);
  });

  // --- Conversations API ---
  app.get('/api/conversations', (req: Request, res: Response) => {
    res.json(storage.getAllConversations());
  });

  app.get('/api/conversations/:id', (req: Request, res: Response) => {
    const conv = storage.getConversationById(req.params.id);
    if (!conv) {
      res.status(404).json({ error: 'Conversation not found' });
      return;
    }
    res.json(conv);
  });

  // Create conversation or initiate chat
  app.post('/api/conversations', async (req: Request, res: Response) => {
    try {
      const {
        name,
        phone,
        email,
        language,
        initial_message,
        initial_attachment_url,
        attachment,
        problem_category,
        course_interest,
        channel,
      } = req.body;

      const customer = storage.findOrCreateCustomer(name, phone, email, language || 'so');

      const conv = storage.createConversation({
        customer_id: customer.customer_id,
        customer_name: customer.name,
        customer_phone: customer.phone,
        customer_email: customer.email,
        channel: channel || 'web',
        language: language || 'so',
        problem_category,
        course_interest,
        initial_message,
        initial_attachment_url: initial_attachment_url || (attachment ? attachment.data : undefined),
      });

      if (initial_message || attachment) {
        const aiResult = await processCustomerMessage(
          initial_message || '',
          [],
          conv.language,
          attachment ? { attachment } : undefined
        );

        storage.addMessageToConversation(conv.id, {
          sender: 'assistant',
          content: aiResult.reply,
          is_handoff_offer: aiResult.isHandoffOffer,
          suggested_course_id: aiResult.suggestedCourseId,
        });

        storage.updateConversationDetails(conv.id, {
          problem_category: aiResult.problemCategory,
          ai_summary: aiResult.aiSummary,
          course_interest: aiResult.courseInterest || conv.course_interest,
          status: aiResult.isPaymentProof ? 'payment_proof_received' : (aiResult.isHandoffOffer ? 'needs_admin' : 'open'),
        });
      }

      const updatedConv = storage.getConversationById(conv.id);
      res.status(201).json(updatedConv);
    } catch (err) {
      console.error('Error starting conversation:', err);
      res.status(500).json({ error: 'Failed to start conversation' });
    }
  });

  // Add message to existing conversation
  app.post('/api/conversations/:id/messages', async (req: Request, res: Response) => {
    try {
      const convId = req.params.id;
      const { content, sender, language, attachment } = req.body;

      const conv = storage.getConversationById(convId);
      if (!conv) {
        res.status(404).json({ error: 'Conversation not found' });
        return;
      }

      const msgSender = sender || 'customer';

      // Record incoming message (with screenshot if provided)
      storage.addMessageToConversation(convId, {
        sender: msgSender,
        content: content || (attachment ? 'Waxaan soo diray screenshot' : ''),
        attachment_url: attachment?.data,
        attachment_type: attachment ? 'image' : undefined,
      });

      // If sender is admin, do not trigger AI
      if (msgSender === 'admin') {
        storage.updateConversationStatus(convId, 'admin_active');
        const updated = storage.getConversationById(convId);
        res.json({ conversation: updated });
        return;
      }

      // If conversation is already taken over by human admin, queue for admin
      if (conv.status === 'admin_active') {
        const updated = storage.getConversationById(convId);
        res.json({
          conversation: updated,
          statusNote: 'queued_for_human_admin',
        });
        return;
      }

      // Format history for AI
      const history = conv.messages.map((m) => ({
        role: m.sender === 'customer' ? ('user' as const) : ('assistant' as const),
        text: m.content,
      }));

      // Generate AI response
      const convLang = language || conv.language || 'so';
      const aiResult = await processCustomerMessage(
        content || '',
        history,
        convLang,
        attachment ? { attachment } : undefined
      );

      // Save AI reply
      storage.addMessageToConversation(convId, {
        sender: 'assistant',
        content: aiResult.reply,
        is_handoff_offer: aiResult.isHandoffOffer,
        suggested_course_id: aiResult.suggestedCourseId,
      });

      // Update conversation diagnostic metadata
      storage.updateConversationDetails(convId, {
        problem_category: aiResult.problemCategory,
        ai_summary: aiResult.aiSummary,
        course_interest: aiResult.courseInterest || conv.course_interest,
        status: aiResult.isPaymentProof ? 'payment_proof_received' : (aiResult.isHandoffOffer ? 'needs_admin' : 'in_progress'),
      });

      const finalConv = storage.getConversationById(convId);
      res.json({
        conversation: finalConv,
        aiResponse: aiResult,
      });
    } catch (err) {
      console.error('Error sending message:', err);
      res.status(500).json({ error: 'Wax yar ayay cilad farsamo naga haysataa. Fadlan mar kale isku day.' });
    }
  });

  // Request Human Handoff
  app.post('/api/conversations/:id/handoff', (req: Request, res: Response) => {
    const convId = req.params.id;
    const conv = storage.getConversationById(convId);
    if (!conv) {
      res.status(404).json({ error: 'Conversation not found' });
      return;
    }

    const { language } = req.body;
    const lang = language || conv.language || 'so';

    const handoffMsg =
      lang === 'so'
        ? 'Codsigaaga xiriirka maamulka waa la diiwaangeliyay. Xubin ka tirsan maamulka XirfadoNet ayaa dhawaan kula soo xiriiri doonta halkan ama taleefankaaga.'
        : 'Your request for human support has been received. A member of XirfadoNet management will follow up with you shortly.';

    storage.addMessageToConversation(convId, {
      sender: 'system',
      content: handoffMsg,
    });

    storage.updateConversationStatus(convId, 'needs_admin');

    const updated = storage.getConversationById(convId);
    res.json(updated);
  });

  // Update conversation status or details
  app.patch('/api/conversations/:id/details', (req: Request, res: Response) => {
    const conv = storage.updateConversationDetails(req.params.id, req.body);
    if (!conv) {
      res.status(404).json({ error: 'Conversation not found' });
      return;
    }
    res.json(conv);
  });

  // Update conversation status (admin takeover, mark resolved, etc.)
  app.patch('/api/conversations/:id/status', (req: Request, res: Response) => {
    const { status } = req.body;
    const conv = storage.updateConversationStatus(req.params.id, status);
    if (!conv) {
      res.status(404).json({ error: 'Conversation not found' });
      return;
    }
    res.json(conv);
  });

  // Vite middleware for development vs Static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`XirfadoNet server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
