import React, { useState, useEffect, useRef } from 'react';
import { Conversation, Message, Course, Language, ProblemTopic, PaymentSettings } from '../types.js';
import { translations } from '../translations.js';
import {
  Send,
  User,
  Bot,
  ShieldCheck,
  Headphones,
  Sparkles,
  ArrowRight,
  BookOpen,
  Phone,
  Check,
  AlertCircle,
  Clock,
  HelpCircle,
  Eye,
  Sliders,
  Tv,
  DollarSign,
  Key,
  GraduationCap,
  LogIn,
  Lock,
  CreditCard,
  Compass,
  CheckCircle2,
  Image as ImageIcon,
  X,
  RotateCcw,
} from 'lucide-react';

interface CustomerChatProps {
  currentLanguage: Language;
  onOpenCourseModal: (course: Course) => void;
  activeConversation: Conversation | null;
  onUpdateConversation: (conv: Conversation) => void;
  allCourses: Course[];
  studentUser?: { name: string; phone?: string; email?: string } | null;
}

export const CustomerChat: React.FC<CustomerChatProps> = ({
  currentLanguage,
  onOpenCourseModal,
  activeConversation,
  onUpdateConversation,
  allCourses,
  studentUser,
}) => {
  const t = translations[currentLanguage];
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [customerName, setCustomerName] = useState(studentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(studentUser?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(studentUser?.email || '');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [handoffSuccess, setHandoffSuccess] = useState(false);
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings | null>(null);
  const [problemTopics, setProblemTopics] = useState<ProblemTopic[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<'somalia' | 'international' | null>(null);
  const [attachment, setAttachment] = useState<{ data: string; mimeType: string; name: string } | null>(null);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [failedMessage, setFailedMessage] = useState<{ text: string; attachment?: { data: string; mimeType: string; name: string } | null } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync user prop if logged in
  useEffect(() => {
    if (studentUser) {
      if (studentUser.name && !customerName) setCustomerName(studentUser.name);
      if (studentUser.phone && !customerPhone) setCustomerPhone(studentUser.phone);
      if (studentUser.email && !customerEmail) setCustomerEmail(studentUser.email);
    }
  }, [studentUser]);

  // Load problem topics and payment settings from server
  useEffect(() => {
    fetch('/api/topics?activeOnly=true')
      .then((r) => r.json())
      .then((data) => setProblemTopics(data))
      .catch((err) => console.error('Error fetching topics:', err));

    fetch('/api/payment-settings')
      .then((r) => r.json())
      .then((data) => setPaymentSettings(data))
      .catch((err) => console.error('Error fetching payment settings:', err));
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages, isLoading]);

  // Initial Welcome message if conversation is fresh
  const defaultWelcomeMessage: Message = {
    id: 'welcome-0',
    sender: 'assistant',
    content:
      currentLanguage === 'so'
        ? `Ku soo dhawoow XirfadoNet 👋!

Waxaan ahay Caawiyahaaga rasmiga ah ee XirfadoNet. Waxaan halkan u joogaa inaan kaa caawiyo:
1. Dhibaatada Views-ka YouTube & Algorithm-ka
2. Xallinta Google AdSense & PIN Verification
3. Diiwaangelinta Koorsooyinka & Qiimaha
4. Akoonka, Login-ka, & Password-ka
5. Tilmaamaha lacag bixinta gacanta ah

Maxaan kaa caawin karaa maanta? Fadlan su'aashaada qor ama dooro mid ka mid ah dhibaatooyinka hoose.`
        : `Welcome to XirfadoNet 👋!

I am your official XirfadoNet Customer Service & Course Assistant. I am here to assist you with:
1. YouTube Views & Algorithm troubleshooting
2. Google AdSense & PIN verification
3. Course enrollment & pricing
4. Account, login & password recovery
5. Manual payment instructions

How can I help you today? Please type your question or select one of the common problem topics below.`,
    timestamp: new Date().toISOString(),
  };

  const messages: Message[] =
    activeConversation && activeConversation.messages && activeConversation.messages.length > 0
      ? activeConversation.messages
      : [defaultWelcomeMessage];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase()) && !file.type.startsWith('image/')) {
      alert(currentLanguage === 'so' ? 'Fadlan dooro sawir noociisu yahay JPG, PNG, ama WebP.' : 'Please select a valid JPG, PNG, or WebP image.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      alert(currentLanguage === 'so' ? 'Cabirka sawirku waa inuu ka yaraadaa 25MB' : 'Image size must be less than 25MB');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result as string;
      setAttachment({
        data,
        mimeType: file.type || 'image/jpeg',
        name: file.name,
      });
      // Clear any prior failed state when a new image is loaded
      setFailedMessage(null);
    };
    reader.readAsDataURL(file);

    // Reset file input value so selecting the exact same file again works
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSendMessage = async (
    textToSend?: string,
    attachmentToSend?: { data: string; mimeType: string; name: string } | null
  ) => {
    const text = (textToSend !== undefined ? textToSend : inputText).trim();
    const currentAttachment = attachmentToSend !== undefined ? attachmentToSend : attachment;
    if ((!text && !currentAttachment) || isLoading) return;

    if (textToSend === undefined) {
      setInputText('');
    }
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    const hadAttachment = !!currentAttachment;
    setIsAnalyzingImage(hadAttachment);
    setIsLoading(true);

    try {
      let conv = activeConversation;

      // If no conversation exists yet, create one
      if (!conv) {
        const createRes = await fetch('/api/conversations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: customerName || 'Macaamil',
            phone: customerPhone,
            email: customerEmail,
            language: currentLanguage,
            channel: 'web',
            initial_message: text,
            attachment: currentAttachment,
          }),
        });

        if (!createRes.ok) {
          throw new Error('Server returned error status');
        }

        const newConv: Conversation = await createRes.json();
        onUpdateConversation(newConv);

        // Check if last message was a technical error to enable retry
        const lastMsg = newConv.messages?.[newConv.messages.length - 1];
        if (lastMsg && lastMsg.content.includes('Wax yar ayay cilad farsamo naga haysataa')) {
          setFailedMessage({ text, attachment: currentAttachment });
        } else {
          setFailedMessage(null);
        }
        return;
      }

      // If conversation already exists, post message
      const res = await fetch(`/api/conversations/${conv.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: text,
          sender: 'customer',
          language: currentLanguage,
          attachment: currentAttachment,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to send message to server');
      }

      const data = await res.json();
      if (data.conversation) {
        onUpdateConversation(data.conversation);
        const lastMsg = data.conversation.messages?.[data.conversation.messages.length - 1];
        if (lastMsg && lastMsg.content.includes('Wax yar ayay cilad farsamo naga haysataa')) {
          setFailedMessage({ text, attachment: currentAttachment });
        } else {
          setFailedMessage(null);
        }
      }
    } catch (err) {
      console.error('Failed to send message:', err);
      setFailedMessage({ text, attachment: currentAttachment });
    } finally {
      setIsLoading(false);
      setIsAnalyzingImage(false);
    }
  };

  const handleRetry = () => {
    if (!failedMessage || isLoading) return;
    const { text, attachment: retryAtt } = failedMessage;
    handleSendMessage(text, retryAtt);
  };

  // Request Human Handoff (La Hadal Maamulka)
  const handleRequestHandoff = async () => {
    if (!activeConversation) {
      // Start conversation first with handoff request
      const handoffText =
        currentLanguage === 'so'
          ? 'Waxaan rabaa inaan la hadlo maamulka XirfadoNet.'
          : 'I would like to speak directly with XirfadoNet management.';
      handleSendMessage(handoffText);
      setShowContactModal(true);
      return;
    }

    try {
      const res = await fetch(`/api/conversations/${activeConversation.id}/handoff`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: currentLanguage }),
      });

      if (res.ok) {
        const updated: Conversation = await res.json();
        onUpdateConversation(updated);
        setHandoffSuccess(true);
        setShowContactModal(true);
      }
    } catch (err) {
      console.error('Error requesting handoff:', err);
    }
  };

  // Save Customer Contact Profile
  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone && !customerEmail) return;

    try {
      await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customerName,
          phone: customerPhone,
          email: customerEmail,
          preferred_language: currentLanguage,
        }),
      });
      setShowContactModal(false);
    } catch (err) {
      console.error('Error saving contact:', err);
    }
  };

  const getTopicIcon = (topic: ProblemTopic) => {
    const s = (topic.category + ' ' + topic.title_en).toLowerCase();
    if (s.includes('view')) return <Eye className="w-3.5 h-3.5 text-blue-600" />;
    if (s.includes('setting')) return <Sliders className="w-3.5 h-3.5 text-indigo-600" />;
    if (s.includes('channel')) return <Tv className="w-3.5 h-3.5 text-purple-600" />;
    if (s.includes('pin') || s.includes('key')) return <Key className="w-3.5 h-3.5 text-amber-600" />;
    if (s.includes('adsense') || s.includes('monetiz')) return <DollarSign className="w-3.5 h-3.5 text-emerald-600" />;
    if (s.includes('course') || s.includes('reg')) return <GraduationCap className="w-3.5 h-3.5 text-blue-600" />;
    if (s.includes('login')) return <LogIn className="w-3.5 h-3.5 text-cyan-600" />;
    if (s.includes('password')) return <Lock className="w-3.5 h-3.5 text-rose-600" />;
    if (s.includes('pay')) return <CreditCard className="w-3.5 h-3.5 text-emerald-600" />;
    if (s.includes('recom')) return <Compass className="w-3.5 h-3.5 text-teal-600" />;
    return <HelpCircle className="w-3.5 h-3.5 text-slate-500" />;
  };

  return (
    <div className="w-full bg-slate-100 min-h-[calc(100vh-4.5rem)] flex flex-col items-center py-6 px-4 sm:px-6">
      <div className="max-w-4xl w-full flex flex-col flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[700px]">
        {/* Chat Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <Bot className="w-6 h-6" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                  {t.supportTitle}
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                  Official
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{currentLanguage === 'so' ? 'Diyaar u ah xallinta dhibaatooyinkaaga' : 'Online & ready to diagnose issues'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Payment Guide Trigger */}
            <button
              id="chat-btn-payment-guide"
              type="button"
              onClick={() => setShowPaymentModal(true)}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>{t.howToPay}</span>
            </button>

            {/* Talk to Admin Handoff Button */}
            <button
              id="chat-btn-talk-to-admin"
              type="button"
              onClick={handleRequestHandoff}
              className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs ${
                activeConversation?.status === 'needs_admin'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : activeConversation?.status === 'admin_active'
                  ? 'bg-purple-100 text-purple-900 border border-purple-300'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
              }`}
            >
              <Headphones className="w-3.5 h-3.5 text-blue-600" />
              <span>
                {activeConversation?.status === 'needs_admin'
                  ? t.adminRequested
                  : activeConversation?.status === 'admin_active'
                  ? t.adminBadge
                  : t.talkToAdmin}
              </span>
            </button>
          </div>
        </div>

        {/* Live Admin Active Notice Banner */}
        {activeConversation?.status === 'admin_active' && (
          <div className="bg-purple-50 border-b border-purple-200 px-4 py-2 text-xs font-semibold text-purple-900 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping"></span>
              <span>{t.adminActiveNotice}</span>
            </div>
            <span className="text-[11px] text-purple-700">Live Human Support</span>
          </div>
        )}

        {/* Quick Problem Chips Area */}
        <div className="bg-slate-50/70 px-4 py-2.5 border-b border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-slate-600 flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-blue-600" />
              <span>{t.quickProblemsTitle}</span>
            </span>
            <button
              type="button"
              onClick={() => setShowPaymentModal(true)}
              className="text-[11px] font-semibold text-emerald-600 hover:underline sm:hidden"
            >
              💳 {t.howToPay}
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {problemTopics.map((topic) => {
              const label = currentLanguage === 'so' ? topic.title_so : topic.title_en;
              const starter = currentLanguage === 'so' ? topic.prompt_starter_so : topic.prompt_starter_en;
              return (
                <button
                  key={topic.id}
                  id={`topic-chip-${topic.id}`}
                  type="button"
                  onClick={() => handleSendMessage(starter)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 transition-colors whitespace-nowrap shadow-2xs cursor-pointer"
                >
                  {getTopicIcon(topic)}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Message Thread Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/30">
          {messages.map((msg) => {
            const isUser = msg.sender === 'customer';
            const isAdmin = msg.sender === 'admin';
            const isSystem = msg.sender === 'system';

            if (isSystem) {
              return (
                <div key={msg.id} className="flex justify-center my-2">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-xs text-amber-900 max-w-lg text-center flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{msg.content}</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                {/* Sender Badge */}
                <div className="flex items-center space-x-1.5 mb-1 px-1 text-[11px] text-slate-500 font-medium">
                  {isUser ? (
                    <>
                      <span>{customerName || t.customerBadge}</span>
                      <User className="w-3 h-3 text-slate-400" />
                    </>
                  ) : isAdmin ? (
                    <>
                      <Headphones className="w-3 h-3 text-purple-600" />
                      <span className="font-bold text-purple-700">{t.adminBadge}</span>
                    </>
                  ) : (
                    <>
                      <Bot className="w-3 h-3 text-blue-600" />
                      <span className="font-bold text-blue-700">{t.aiBadge}</span>
                    </>
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-2xs ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-xs'
                      : isAdmin
                      ? 'bg-purple-50 text-slate-900 border border-purple-200 rounded-tl-xs'
                      : 'bg-white text-slate-900 border border-slate-200 rounded-tl-xs'
                  }`}
                >
                  {msg.attachment_url && msg.attachment_type === 'image' && (
                    <div className="mb-2.5 overflow-hidden rounded-xl bg-slate-900/5 border border-slate-200/80">
                      <img
                        src={msg.attachment_url}
                        alt="Uploaded screenshot"
                        className="max-h-80 w-auto max-w-full rounded-xl object-contain mx-auto block"
                      />
                    </div>
                  )}
                  {msg.content}

                  {/* Inline Retry Button if image analysis failed */}
                  {msg.sender === 'assistant' && msg.content.includes('Wax yar ayay cilad farsamo naga haysataa') && (
                    <div className="mt-3 pt-2 border-t border-slate-200/80">
                      <button
                        type="button"
                        onClick={handleRetry}
                        disabled={isLoading}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{currentLanguage === 'so' ? '🔄 Mar kale isku day' : '🔄 Retry analysis'}</span>
                      </button>
                    </div>
                  )}

                  {/* Embedded Course Recommendation Card */}
                  {msg.suggested_course && (
                    <div className="mt-3.5 p-3 rounded-xl bg-blue-50 border border-blue-200 text-slate-900 space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs truncate">
                            {msg.suggested_course.title}
                          </h4>
                          <p className="text-[11px] text-blue-800 font-semibold">
                            ${msg.suggested_course.price} USD
                            {msg.suggested_course.previous_price && (
                              <span className="ml-1 text-slate-400 line-through text-[10px]">
                                ${msg.suggested_course.previous_price}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 line-clamp-2">
                        {msg.suggested_course.description}
                      </p>

                      <div className="pt-1 flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => onOpenCourseModal(msg.suggested_course!)}
                          className="flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold text-blue-700 bg-white hover:bg-blue-100 border border-blue-200 text-center"
                        >
                          {t.viewCourse}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onOpenCourseModal(msg.suggested_course!);
                            setShowPaymentModal(true);
                          }}
                          className="flex-1 py-1.5 px-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 text-center"
                        >
                          {t.enrollNow}
                        </button>
                      </div>
                    </div>
                  )}

                                    {/* Embedded Handoff Trigger */}
                  {msg.is_handoff_offer && activeConversation?.status !== 'needs_admin' && (
                    <div className="mt-3 pt-3 border-t border-slate-200/80 flex flex-col space-y-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 shadow-xs"
                      >
                        <span>📤 {currentLanguage === 'so' ? 'Soo Dir Caddeynta Payment-ka' : 'Upload Payment Proof'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleRequestHandoff}
                        className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs"
                      >
                        <span>📞 {currentLanguage === 'so' ? 'La Xiriir Maamulka' : 'Talk to Admin'}</span>
                      </button>
                    </div>
                  )}

                </div>

                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex flex-col items-start">
              <div className="flex items-center space-x-1.5 mb-1 px-1 text-[11px] text-blue-600 font-bold">
                <Bot className="w-3 h-3" />
                <span>{t.aiBadge}</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl rounded-tl-xs border border-slate-200 text-xs text-slate-600 flex items-center space-x-2.5 shadow-xs">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></div>
                </div>
                <span className="text-xs font-semibold text-blue-900">
                  {isAnalyzingImage
                    ? (currentLanguage === 'so' ? '🔍 Sawirka ayaan eegayaa...' : '🔍 Analyzing screenshot...')
                    : (currentLanguage === 'so' ? 'Caawiyaha ayaa falanqeynaya...' : 'Assistant is analyzing...')}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white">
          {/* Failed message retry banner */}
          {failedMessage && !isLoading && (
            <div className="mb-2.5 p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-900 shadow-2xs">
              <span className="font-medium">
                {currentLanguage === 'so'
                  ? '⚠️ Falanqayntii sawirka ma guuleysan. Fadlan mar kale isku day.'
                  : '⚠️ Screenshot analysis could not be completed. Please try again.'}
              </span>
              <button
                type="button"
                onClick={handleRetry}
                className="ml-2 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs shadow-xs transition-colors cursor-pointer shrink-0"
              >
                {currentLanguage === 'so' ? 'Mar kale isku day' : 'Retry'}
              </button>
            </div>
          )}

          {/* Complete Uncropped Image Preview */}
          {attachment && (
            <div className="mb-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200 relative inline-flex flex-col max-w-xs sm:max-w-sm shadow-2xs">
              <div className="flex items-center justify-between w-full mb-1.5 pb-1 border-b border-slate-200/60">
                <span className="text-[11px] font-semibold text-slate-700 truncate max-w-[200px]">
                  📷 {attachment.name}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setAttachment(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-xs cursor-pointer hover:bg-rose-600 transition-colors"
                  title={currentLanguage === 'so' ? 'Ka noqo' : 'Remove image'}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div className="relative rounded-lg overflow-hidden border border-slate-200/80 bg-white max-h-56 flex items-center justify-center">
                <img
                  src={attachment.data}
                  alt="Complete preview"
                  className="max-h-52 w-auto max-w-full object-contain rounded-md"
                />
              </div>
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="p-3 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-50"
              title={currentLanguage === 'so' ? 'Soo lifaaq sawir (screenshot)' : 'Attach an image'}
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <input
              id="customer-chat-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.chatPlaceholder}
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50"
            />
            <button
              id="customer-chat-send-btn"
              type="submit"
              disabled={(!inputText.trim() && !attachment) || isLoading}
              className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <span>{t.send}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Contact capture preview */}
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 px-1">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400">
                {customerPhone ? `WhatsApp: ${customerPhone}` : (currentLanguage === 'so' ? 'Lambar lama gelin' : 'No phone linked')}
              </span>
              <button
                type="button"
                onClick={() => setShowContactModal(true)}
                className="text-blue-600 hover:underline font-semibold"
              >
                {customerPhone ? (currentLanguage === 'so' ? 'Beddel' : 'Change') : (currentLanguage === 'so' ? '+ Ku dar lambar' : '+ Add phone')}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowPaymentModal(true)}
              className="text-emerald-700 hover:underline font-semibold flex items-center space-x-1"
            >
              <CreditCard className="w-3 h-3" />
              <span>{t.manualPaymentTitle}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Manual Payment Modal */}
      {showPaymentModal && paymentSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <CreditCard className="w-3.5 h-3.5" />
                <span>{t.manualPaymentTitle}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {t.locationQuestion}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.manualPaymentNotice}
              </p>
            </div>

            {/* Location Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedLocation('somalia')}
                className={`p-3 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                  selectedLocation === 'somalia'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🇸🇴 {t.inSomalia}
              </button>
              <button
                type="button"
                onClick={() => setSelectedLocation('international')}
                className={`p-3 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                  selectedLocation === 'international'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🌍 {t.abroad}
              </button>
            </div>

            {/* Location Content */}
            {selectedLocation === 'somalia' && (
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-slate-800 space-y-2">
                  <p className="font-bold text-slate-900">
                    {currentLanguage === 'so' ? 'Tilmaamaha Lacag Bixinta (Soomaaliya):' : 'Payment Instructions (Somalia):'}
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    {paymentSettings.somalia_instructions ||
                      'Waad ku mahadsan tahay. Lacagta waxaad si toos ah ugu diri kartaa lambarka XirfadoNet:'}
                  </p>
                  <div className="p-3 bg-white rounded-lg border border-emerald-300 font-mono font-bold text-base text-emerald-800 text-center tracking-wider">
                    {paymentSettings.somalia_payment_number || '+252615941664'}
                  </div>
                  <p className="text-[11px] text-emerald-800 font-medium">
                    {currentLanguage === 'so'
                      ? 'Markaad lacagta dirto, fadlan WhatsApp-kan kusoo dir caddeynta lacag bixinta. Maamulka XirfadoNet ayaa xaqiijin doona kadibna kuu diyaarin doona course-ka.'
                      : 'After sending payment, please send proof of payment to this WhatsApp number. Management will verify and activate your course.'}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
                    {currentLanguage === 'so' ? 'Hababka Lacag Bixinta ee Diyaar ah:' : 'Available Mobile Methods:'}
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {paymentSettings.somalia_methods.map((method) => (
                      <div
                        key={method.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-bold text-slate-900">{method.provider}</p>
                          <p className="text-emerald-800 font-mono text-[11px] font-semibold">
                            {paymentSettings.somalia_payment_number || method.account_number}
                          </p>
                          <p className="text-[10px] text-slate-500">{method.instructions}</p>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                          {method.currency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedLocation === 'international' && (
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-slate-800 space-y-3">
                  <p className="font-bold text-slate-900 text-sm">
                    {currentLanguage === 'so'
                      ? 'Fadlan la xiriir maamulka XirfadoNet si laguu siiyo habka lacag bixinta ee dalkaaga.'
                      : 'Please contact XirfadoNet management to receive payment instructions for your country.'}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {paymentSettings.international_instructions}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPaymentModal(false);
                      handleRequestHandoff();
                    }}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs flex items-center justify-center space-x-2 cursor-pointer transition-colors"
                  >
                    <Headphones className="w-4 h-4" />
                    <span>{currentLanguage === 'so' ? 'La Xiriir Maamulka XirfadoNet' : 'Contact XirfadoNet Management'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Verification Steps */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="flex items-center space-x-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>{currentLanguage === 'so' ? 'Xaqiijinta Lacagta (Step-by-Step):' : 'Payment Verification:'}</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                {paymentSettings.verification_instructions}
              </p>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Contact Details Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-4">
            <button
              type="button"
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {currentLanguage === 'so' ? 'Xogtaada Xiriirka' : 'Your Contact Details'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {currentLanguage === 'so'
                  ? 'Fadlan geli lambarkaaga WhatsApp si maamuluhu toos kuula soo xiriiro.'
                  : 'Please provide your WhatsApp or phone number so our support team can follow up.'}
              </p>
            </div>

            <form onSubmit={handleSaveContact} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={currentLanguage === 'so' ? 'Magacaaga' : 'Your name'}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.phoneLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+252 61..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 bg-slate-50"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  {t.close}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
                >
                  {currentLanguage === 'so' ? 'Keydi Xogta' : 'Save Details'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
