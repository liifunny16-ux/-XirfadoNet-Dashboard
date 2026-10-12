import React, { useState, useEffect } from 'react';
import {
  Course,
  KnowledgeItem,
  CustomerProfile,
  Conversation,
  AdminStats,
  Language,
  KnowledgeCategory,
  Category,
  PaymentSettings,
  CourseRegistration,
  CoachingRequest,
  NicheRecommendation,
  ViralContentIdea,
  StudentReview,
} from '../types.js';
import { translations } from '../translations.js';
import {
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  MessageSquare,
  Users,
  AlertTriangle,
  FileText,
  HelpCircle,
  Phone,
  Send,
  Shield,
  RefreshCw,
  FolderTree,
  CreditCard,
  Check,
  X,
  Clock,
  User,
  Sliders,
  DollarSign,
  Bot,
  Settings2,
  UserCheck,
  Sparkles,
  Lightbulb,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { AdminArticlesTab } from './admin/AdminArticlesTab.js';
import { AdminReviewsTab } from './admin/AdminReviewsTab.js';

interface AdminDashboardProps {
  currentLanguage: Language;
  onRefreshData: () => void;
  courses: Course[];
  knowledge: KnowledgeItem[];
  customers: CustomerProfile[];
  conversations: Conversation[];
  stats: AdminStats;
  categories: Category[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentLanguage,
  onRefreshData,
  courses,
  knowledge,
  customers,
  conversations,
  stats,
  categories,
}) => {
  const t = translations[currentLanguage];

  const [activeTab, setActiveTab] = useState<
    | 'categories'
    | 'courses'
    | 'articles'
    | 'registrations'
    | 'coaching'
    | 'reviews'
    | 'niches'
    | 'ideas'
    | 'knowledge'
    | 'payment'
    | 'conversations'
    | 'customers'
    | 'ai-settings'
  >('categories');

  // Phase 2.5 entities state
  const [registrations, setRegistrations] = useState<CourseRegistration[]>([]);
  const [coachingRequests, setCoachingRequests] = useState<CoachingRequest[]>([]);
  const [nichesList, setNichesList] = useState<NicheRecommendation[]>([]);
  const [ideasList, setIdeasList] = useState<ViralContentIdea[]>([]);
  const [reviewsList, setReviewsList] = useState<StudentReview[]>([]);

  const fetchPhase25Data = () => {
    fetch('/api/course-registrations')
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setRegistrations(d))
      .catch(() => {});
    fetch('/api/coaching-requests')
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setCoachingRequests(d))
      .catch(() => {});
    fetch('/api/niches')
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setNichesList(d))
      .catch(() => {});
    fetch('/api/content-ideas')
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setIdeasList(d))
      .catch(() => {});
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setReviewsList(d))
      .catch(() => {});
  };

  // Selected conversation for takeover / inspection
  const [selectedConvId, setSelectedConvId] = useState<string | null>(
    conversations.find((c) => c.status === 'needs_admin')?.id ||
      conversations[0]?.id ||
      null
  );
  const [adminReplyText, setAdminReplyText] = useState('');
  const [sendingAdminReply, setSendingAdminReply] = useState(false);

  // Filter for conversations
  const [convFilter, setConvFilter] = useState<'all' | 'needs_admin' | 'payment_proof_received' | 'resolved'>('all');

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    order: 0,
    is_active: true,
  });

  // Course modal state (add or edit)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: '',
    slug: '',
    description: '',
    price: 39,
    previous_price: 99,
    discount_percent: 60,
    duration: '3 Toddobaad',
    currency: 'USD',
    category: 'YouTube & Content Creation',
    image: '',
    learning_outcomes: '',
    status: 'published' as 'published' | 'draft' | 'archived',
    course_url: 'https://xirfadonet.com',
  });

  // Knowledge modal state (add or edit)
  const [editingKnowledge, setEditingKnowledge] = useState<KnowledgeItem | null>(null);
  const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState(false);
  const [knowledgeForm, setKnowledgeForm] = useState({
    title: '',
    content: '',
    category: 'youtube' as KnowledgeCategory,
    language: 'both' as 'so' | 'en' | 'both',
    status: 'active' as 'active' | 'draft',
  });

  // Payment Settings state
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings | null>(null);
  const [savingPayment, setSavingPayment] = useState(false);
  const [paymentSavedAlert, setPaymentSavedAlert] = useState(false);
  const [previewProofImage, setPreviewProofImage] = useState<string | null>(null);

  // AI Settings state
  const [aiSettings, setAiSettings] = useState<any>(null);
  const [savingAiSettings, setSavingAiSettings] = useState(false);

  useEffect(() => {
    fetch('/api/payment-settings')
      .then((r) => r.json())
      .then((data) => setPaymentSettings(data))
      .catch((err) => console.error('Error fetching payment settings:', err));
      
    fetch('/api/ai-settings')
      .then((r) => r.json())
      .then((data) => setAiSettings(data))
      .catch((err) => console.error('Error fetching AI settings:', err));

    fetchPhase25Data();
  }, []);

  const selectedConversation = conversations.find((c) => c.id === selectedConvId);

  // Filtered conversations
  const filteredConversations = conversations.filter((c) => {
    if (convFilter === 'needs_admin') return c.status === 'needs_admin';
    if (convFilter === 'payment_proof_received') return c.status === 'payment_proof_received';
    if (convFilter === 'resolved') return c.status === 'resolved';
    return true;
  });

  // Handle Admin takeover reply
  const handleSendAdminReply = async () => {
    if (!selectedConvId || !adminReplyText.trim() || sendingAdminReply) return;

    setSendingAdminReply(true);
    try {
      const res = await fetch(`/api/conversations/${selectedConvId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: adminReplyText.trim(),
          sender: 'admin',
          language: currentLanguage,
        }),
      });

      if (res.ok) {
        setAdminReplyText('');
        onRefreshData();
      }
    } catch (err) {
      console.error('Failed to send admin message:', err);
    } finally {
      setSendingAdminReply(false);
    }
  };


  const handleApprovePayment = async (convId: string) => {
    try {
      const res = await fetch(`/api/conversations/${convId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: 'Lacagtaada maamulka ayaa xaqiijiyay ✅ Course-kaaga hadda waa laguu furay.',
          sender: 'admin',
          language: 'so'
        })
      });
      if (res.ok) {
        await fetch(`/api/conversations/${convId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'payment_verified' })
        });
        onRefreshData();
      }
    } catch (err) {
      console.error('Failed to approve payment:', err);
    }
  };

  const handleRejectPayment = async (convId: string) => {
    try {
      const res = await fetch(`/api/conversations/${convId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: 'Caddeynta payment-ka lama xaqiijin karin. Fadlan hubi in aad soo dirtay sawir sax ah ama la xiriir maamulka wixii faahfaahin ah.',
          sender: 'admin',
          language: 'so'
        })
      });
      if (res.ok) {
        await fetch(`/api/conversations/${convId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'open' })
        });
        onRefreshData();
      }
    } catch (err) {
      console.error('Failed to reject payment:', err);
    }
  };

  // Phase 2.5 Management Handlers
  const handleUpdateRegistrationStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/course-registrations/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setRegistrations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus as any } : r))
        );
      }
    } catch (err) {
      console.error('Failed to update registration status:', err);
    }
  };

  const handleUpdateCoachingStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/coaching-requests/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setCoachingRequests((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus as any } : c))
        );
      }
    } catch (err) {
      console.error('Failed to update coaching status:', err);
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm("Ma hubtaa inaad tirtirto ra'yigan?")) return;
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReviewsList((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNiche = async (id: string) => {
    if (!confirm('Ma hubtaa inaad tirtirto niche-kan?')) return;
    try {
      const res = await fetch(`/api/niches/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setNichesList((prev) => prev.filter((n) => n.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteIdea = async (id: string) => {
    if (!confirm('Ma hubtaa inaad tirtirto idea-dan?')) return;
    try {
      const res = await fetch(`/api/content-ideas/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setIdeasList((prev) => prev.filter((i) => i.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Mark conversation resolved
  const handleResolveConversation = async (convId: string) => {
    try {
      const res = await fetch(`/api/conversations/${convId}/resolve`, {
        method: 'POST',
      });
      if (res.ok) {
        onRefreshData();
      }
    } catch (err) {
      console.error('Failed to resolve conversation:', err);
    }
  };

  // --- Category Handlers ---
  const handleOpenCategoryModal = (cat?: Category) => {
    if (cat) {
      setEditingCategory(cat);
      setCategoryForm({
        name: cat.name,
        description: cat.description || '',
        order: cat.order || 0,
        is_active: cat.is_active ?? true,
      });
    } else {
      setEditingCategory(null);
      setCategoryForm({
        name: '',
        description: '',
        order: categories.length + 1,
        is_active: true,
      });
    }
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) return;

    try {
      const url = editingCategory ? `/api/categories/${editingCategory.id}` : '/api/categories';
      const method = editingCategory ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm),
      });

      if (res.ok) {
        setIsCategoryModalOpen(false);
        onRefreshData();
      }
    } catch (err) {
      console.error('Error saving category:', err);
    }
  };

  const handleDeleteCategory = async (catId: string) => {
    if (!confirm('Ma hubtaa inaad tirtirto qaybtan? (Are you sure you want to delete this category?)'))
      return;
    try {
      const res = await fetch(`/api/categories/${catId}`, { method: 'DELETE' });
      if (res.ok) onRefreshData();
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  // --- Course Handlers ---
  const handleOpenCourseModal = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      setCourseForm({
        title: course.title,
        slug: course.slug,
        description: course.description,
        price: course.price,
        previous_price: course.previous_price || course.price,
        discount_percent: course.discount_percent || 0,
        duration: course.duration || '3 Toddobaad',
        currency: course.currency,
        category: course.category,
        image: course.image || '',
        learning_outcomes: (course.learning_outcomes || []).join('\n'),
        status: course.status,
        course_url: course.course_url,
      });
    } else {
      setEditingCourse(null);
      setCourseForm({
        title: '',
        slug: '',
        description: '',
        price: 39,
        previous_price: 99,
        discount_percent: 60,
        duration: '3 Toddobaad',
        currency: 'USD',
        category: categories[0]?.name || 'YouTube & Content Creation',
        image: '',
        learning_outcomes: '',
        status: 'published',
        course_url: 'https://xirfadonet.com',
      });
    }
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title.trim()) return;

    const payload = {
      ...courseForm,
      learning_outcomes: courseForm.learning_outcomes
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const url = editingCourse
        ? `/api/courses/${editingCourse.course_id}`
        : '/api/courses';
      const method = editingCourse ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsCourseModalOpen(false);
        onRefreshData();
      }
    } catch (err) {
      console.error('Error saving course:', err);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Ma hubtaa inaad tirtirto koorsadan?')) return;
    try {
      const res = await fetch(`/api/courses/${courseId}`, { method: 'DELETE' });
      if (res.ok) onRefreshData();
    } catch (err) {
      console.error('Error deleting course:', err);
    }
  };

  // --- Knowledge Handlers ---
  const handleOpenKnowledgeModal = (item?: KnowledgeItem) => {
    if (item) {
      setEditingKnowledge(item);
      setKnowledgeForm({
        title: item.title,
        content: item.content,
        category: item.category,
        language: item.language,
        status: item.status,
      });
    } else {
      setEditingKnowledge(null);
      setKnowledgeForm({
        title: '',
        content: '',
        category: 'youtube',
        language: 'both',
        status: 'active',
      });
    }
    setIsKnowledgeModalOpen(true);
  };

  const handleSaveKnowledge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!knowledgeForm.title.trim() || !knowledgeForm.content.trim()) return;

    try {
      const url = editingKnowledge
        ? `/api/knowledge/${editingKnowledge.id}`
        : '/api/knowledge';
      const method = editingKnowledge ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(knowledgeForm),
      });

      if (res.ok) {
        setIsKnowledgeModalOpen(false);
        onRefreshData();
      }
    } catch (err) {
      console.error('Error saving knowledge item:', err);
    }
  };

  const handleDeleteKnowledge = async (id: string) => {
    if (!confirm('Ma hubtaa inaad tirtirto qodobkan xogta ah?')) return;
    try {
      const res = await fetch(`/api/knowledge/${id}`, { method: 'DELETE' });
      if (res.ok) onRefreshData();
    } catch (err) {
      console.error('Error deleting knowledge item:', err);
    }
  };

  // --- Payment Settings Handlers ---
  const handleSavePaymentSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentSettings) return;

    setSavingPayment(true);
    try {
      const res = await fetch('/api/payment-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentSettings),
      });
      if (res.ok) {
        setPaymentSavedAlert(true);
        setTimeout(() => setPaymentSavedAlert(false), 3000);
      }
    } catch (err) {
      console.error('Error updating payment settings:', err);
    } finally {
      setSavingPayment(false);
    }
  };

  // --- AI Settings Handlers ---
  const handleSaveAiSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiSettings) return;

    setSavingAiSettings(true);
    try {
      const res = await fetch('/api/ai-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aiSettings),
      });
      if (res.ok) {
        setPaymentSavedAlert(true);
        setTimeout(() => setPaymentSavedAlert(false), 3000);
      }
    } catch (err) {
      console.error('Error updating AI settings:', err);
    } finally {
      setSavingAiSettings(false);
    }
  };

  const needsAdminCount = stats.needs_admin_conversations || 0;

  return (
    <div className="w-full bg-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header & Metrics */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                XirfadoNet Admin Dashboard
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                Live Management
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Maamulka guud ee Koorsooyinka, Qaybaha (Categories), Taageerada Macaamiisha, iyo Hababka Lacag Bixinta.
            </p>
          </div>

          <button
            type="button"
            onClick={onRefreshData}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors self-start md:self-auto cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium">Total Courses</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{stats.total_courses}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium">Categories</span>
            <div className="text-2xl font-black text-blue-600 mt-1">{categories.length}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium">Needs Human Help</span>
            <div className="text-2xl font-black text-amber-600 mt-1">{needsAdminCount}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium">Registered Students</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">{stats.total_customers}</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'categories'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'courses'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Courses ({courses.length})</span>
          </button>

          <button
            type="button"
            id="tab-btn-articles"
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'articles'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Articles / Maqaallo</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('registrations')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center space-x-2 relative ${
              activeTab === 'registrations'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Registrations ({registrations.length})</span>
            {registrations.filter((r) => r.status === 'pending').length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-white font-bold">
                {registrations.filter((r) => r.status === 'pending').length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('coaching')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center space-x-2 relative ${
              activeTab === 'coaching'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>1-on-1 Coaching ({coachingRequests.length})</span>
            {coachingRequests.filter((c) => c.status === 'pending').length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500 text-white font-bold">
                {coachingRequests.filter((c) => c.status === 'pending').length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'reviews'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Reviews ({reviewsList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('niches')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'niches'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Niches ({nichesList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ideas')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'ideas'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Viral Ideas ({ideasList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('conversations')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center space-x-2 relative ${
              activeTab === 'conversations'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Support Inbox ({conversations.length})</span>
            {needsAdminCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-white font-bold">
                {needsAdminCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('payment')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'payment'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Payment Instructions</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('knowledge')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'knowledge'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Knowledge Base ({knowledge.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'customers'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Students ({customers.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ai-settings')}
            className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'ai-settings'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>AI Settings</span>
          </button>
        </div>

        {/* TAB 1: CATEGORIES MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Manage Course Categories</h3>
                <p className="text-xs text-slate-500">
                  Add, edit, and organize skill categories. The AI Support and Course filter update dynamically.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenCategoryModal()}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => {
                const count =
                  cat.course_count ??
                  courses.filter((c) => c.category === cat.name || c.category_id === cat.id).length;
                return (
                  <div
                    key={cat.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900">{cat.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                          {count} Courses
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {cat.description || 'No description provided'}
                      </p>
                    </div>

                    <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-200/80">
                      <button
                        type="button"
                        onClick={() => handleOpenCategoryModal(cat)}
                        className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                        title="Edit Category"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="p-1.5 text-slate-600 hover:text-red-600 rounded-lg hover:bg-slate-100"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: COURSES MANAGEMENT */}
        {activeTab === 'courses' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Manage Courses</h3>
                <p className="text-xs text-slate-500">
                  Update course details, pricing, discount percentages, duration, and learning outcomes.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenCourseModal()}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Course</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((c) => (
                <div
                  key={c.course_id}
                  className="rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between bg-white shadow-2xs"
                >
                  <div className="aspect-video bg-slate-100 relative">
                    {c.image ? (
                      <img
                        src={c.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-900 text-white">
                        <BookOpen className="w-10 h-10 opacity-30" />
                      </div>
                    )}
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-white/90 text-slate-800">
                      {c.category}
                    </span>
                    {c.discount_percent && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-extrabold bg-red-600 text-white">
                        {c.discount_percent}% OFF
                      </span>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{c.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{c.description}</p>
                    <div className="flex items-center justify-between text-xs pt-2">
                      <span className="font-extrabold text-blue-700">${c.price} USD</span>
                      <span className="text-slate-400 text-[11px]">{c.duration}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => handleOpenCourseModal(c)}
                      className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-white"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCourse(c.course_id)}
                      className="p-1.5 text-slate-600 hover:text-red-600 rounded-lg hover:bg-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: COURSE REGISTRATIONS */}
        {activeTab === 'registrations' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Student Course Registrations</h3>
                <p className="text-xs text-slate-500">
                  Manage incoming student course enrollments, verify manual payments, and send activation links.
                </p>
              </div>
              <button
                type="button"
                onClick={fetchPhase25Data}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer self-start"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>
            </div>

            {registrations.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                No course registrations yet. When students complete the registration modal, they appear here.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 bg-slate-50 font-semibold">
                      <th className="p-3">Student</th>
                      <th className="p-3">Course</th>
                      <th className="p-3">Payment Details</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {registrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-slate-50/50">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{reg.full_name}</div>
                          <div className="text-slate-500 text-[11px] flex items-center space-x-1">
                            <span>{reg.phone || reg.phone_number || ''}</span>
                            {(reg.phone || reg.phone_number) && (
                              <a
                                href={`https://wa.me/${(reg.phone || reg.phone_number || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                  `Asc ${reg.full_name || reg.student_name}, waxaan kaala soo xiriiray XirfadoNet ku saabsan koorsadaada: ${reg.course_title}`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-600 hover:underline inline-flex items-center text-[10px] font-bold"
                              >
                                (WhatsApp)
                              </a>
                            )}
                          </div>
                          {reg.email && <div className="text-slate-400 text-[10px]">{reg.email}</div>}
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-slate-800">{reg.course_title}</div>
                          <div className="text-emerald-600 font-bold text-[11px]">
                            ${reg.price} {reg.currency}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">
                              {reg.payment_method || 'Manual'}
                            </span>
                            {reg.payment_proof_image && (
                              <button
                                type="button"
                                onClick={() => setPreviewProofImage(reg.payment_proof_image!)}
                                className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold hover:bg-blue-200 cursor-pointer flex items-center space-x-1"
                              >
                                <span>📷 Proof</span>
                              </button>
                            )}
                          </div>
                          {(reg.payment_proof_text || reg.payment_reference) && (
                            <div className="text-[10px] font-mono text-slate-600 mt-1">
                              {reg.payment_proof_text || `Ref: ${reg.payment_reference}`}
                            </div>
                          )}
                          {reg.notes && (
                            <div className="text-[10px] text-slate-400 italic mt-0.5">
                              {reg.notes}
                            </div>
                          )}
                        </td>
                        <td className="p-3 text-slate-400 text-[11px]">
                          {new Date(reg.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              reg.status === 'enrolled'
                                ? 'bg-emerald-100 text-emerald-800'
                                : reg.status === 'payment_proof_received' || reg.status === 'proof_received'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : reg.status === 'contacted'
                                ? 'bg-blue-100 text-blue-800'
                                : reg.status === 'cancelled'
                                ? 'bg-slate-200 text-slate-600'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {reg.status === 'payment_proof_received' || reg.status === 'proof_received'
                              ? 'PROOF RECEIVED (REVIEW)'
                              : reg.status === 'enrolled'
                              ? 'VERIFIED & ENROLLED'
                              : reg.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1">
                          {reg.status !== 'enrolled' && (
                            <button
                              type="button"
                              onClick={() => handleUpdateRegistrationStatus(reg.id, 'enrolled')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 text-[11px] cursor-pointer shadow-xs"
                            >
                              Xaqiiji & Fur (Approve)
                            </button>
                          )}
                          {reg.status === 'pending' && (
                            <button
                              type="button"
                              onClick={() => handleUpdateRegistrationStatus(reg.id, 'contacted')}
                              className="px-2 py-1 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 text-[10px] cursor-pointer"
                            >
                              Contacted
                            </button>
                          )}
                          {reg.status !== 'cancelled' && (
                            <button
                              type="button"
                              onClick={() => handleUpdateRegistrationStatus(reg.id, 'cancelled')}
                              className="px-2 py-1 rounded bg-slate-100 text-slate-600 font-semibold hover:bg-slate-200 text-[10px] cursor-pointer"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB: 1-ON-1 COACHING REQUESTS */}
        {activeTab === 'coaching' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">1-on-1 Mentorship & Coaching Bookings</h3>
                <p className="text-xs text-slate-500">
                  Review personalized live video call coaching requests from creators and students.
                </p>
              </div>
              <button
                type="button"
                onClick={fetchPhase25Data}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer self-start"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>
            </div>

            {coachingRequests.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                No coaching requests received yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coachingRequests.map((req) => (
                  <div key={req.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-900 text-sm">{req.full_name}</div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          req.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : req.status === 'scheduled'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {req.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-1 text-slate-600">
                      <div><strong className="text-slate-800">Topic:</strong> {req.topic}</div>
                      <div><strong className="text-slate-800">Phone / WhatsApp:</strong> {req.phone}</div>
                      {req.email && <div><strong className="text-slate-800">Email:</strong> {req.email}</div>}
                      <div><strong className="text-slate-800">Experience:</strong> {req.experience_level}</div>
                      <div><strong className="text-slate-800">Available Time:</strong> {req.preferred_time}</div>
                    </div>

                    {req.message && (
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] italic">
                        "{req.message}"
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      {(req.phone || req.phone_number) ? (
                        <a
                          href={`https://wa.me/${(req.phone || req.phone_number || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Asc ${req.full_name || req.student_name}, waxaan kaaga soo jawaabay codsigii 1-on-1 Coaching-ka XirfadoNet ku saabsan: ${req.topic}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 inline-flex items-center space-x-1"
                        >
                          <span>Message on WhatsApp</span>
                        </a>
                      ) : <span />}

                      <div className="space-x-1">
                        {req.status === 'pending' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateCoachingStatus(req.id, 'scheduled')}
                            className="px-2 py-1 rounded bg-blue-600 text-white font-semibold text-[10px] cursor-pointer"
                          >
                            Mark Scheduled
                          </button>
                        )}
                        {req.status !== 'completed' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateCoachingStatus(req.id, 'completed')}
                            className="px-2 py-1 rounded bg-emerald-600 text-white font-semibold text-[10px] cursor-pointer"
                          >
                            Mark Done
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: ARTICLES MANAGEMENT */}
        {activeTab === 'articles' && (
          <AdminArticlesTab courses={courses} />
        )}

        {/* TAB: REVIEWS MANAGEMENT */}
        {activeTab === 'reviews' && (
          <AdminReviewsTab
            courses={courses}
            reviews={reviewsList}
            onRefresh={fetchPhase25Data}
          />
        )}

        {/* TAB: NICHES MANAGEMENT */}
        {activeTab === 'niches' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">AI YouTube & TikTok Niches</h3>
                <p className="text-xs text-slate-500">
                  Manage high-earning niche blueprints recommended to beginners and creators.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nichesList.map((niche) => (
                <div key={niche.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3 text-xs">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{niche.title}</span>
                      <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">
                        {niche.cpm_tier} CPM
                      </span>
                    </div>
                    <p className="mt-1.5 text-slate-600 leading-relaxed">{niche.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {(niche.software_needed || niche.tools_needed || []).map((soft, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-600 font-medium">
                          {soft}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-end pt-2 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => handleDeleteNiche(niche.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg cursor-pointer"
                      title="Delete Niche"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: CONTENT IDEAS MANAGEMENT */}
        {activeTab === 'ideas' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Viral Content Ideas & Frameworks</h3>
                <p className="text-xs text-slate-500">
                  Curated viral hooks and retention templates for students and creators.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ideasList.map((idea) => (
                <div key={idea.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3 text-xs">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{idea.topic}</span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                        {idea.niche}
                      </span>
                    </div>
                    <div className="mt-2 p-2 rounded bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-medium">
                      <strong>Hook:</strong> "{idea.hook}"
                    </div>
                    <div className="mt-2 text-slate-600 text-[11px]">
                      <strong>Target:</strong> {idea.target_audience}
                    </div>
                  </div>
                  <div className="flex items-center justify-end pt-2 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => handleDeleteIdea(idea.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg cursor-pointer"
                      title="Delete Idea"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SUPPORT INBOX & CONVERSATIONS */}
        {activeTab === 'conversations' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[650px]">
            {/* Conversations List */}
            <div className="lg:col-span-4 border-r border-slate-200 flex flex-col">
              <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900">Conversations</h3>
                  <span className="text-xs text-slate-500">{filteredConversations.length}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setConvFilter('all')}
                    className={`py-1 rounded text-center cursor-pointer ${
                      convFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setConvFilter('payment_proof_received')}
                    className={`py-1 rounded text-center text-xs cursor-pointer ${
                      convFilter === 'payment_proof_received'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    Payments
                  </button>
                  <button
                    type="button"
                    onClick={() => setConvFilter('needs_admin')}
                    className={`py-1 rounded text-center text-xs cursor-pointer ${
                      convFilter === 'needs_admin'
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    Needs Admin ({needsAdminCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setConvFilter('resolved')}
                    className={`py-1 rounded text-center cursor-pointer ${
                      convFilter === 'resolved' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    Resolved
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                {filteredConversations.map((conv) => {
                  const isSelected = conv.id === selectedConvId;
                  const lastMsg = conv.messages[conv.messages.length - 1];
                  return (
                    <button
                      key={conv.id}
                      type="button"
                      onClick={() => setSelectedConvId(conv.id)}
                      className={`w-full p-4 text-left transition-colors cursor-pointer block ${
                        isSelected ? 'bg-blue-50/80' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-900 truncate">
                          {conv.customer_name || 'Visitor'}
                        </span>
                        {conv.status === 'payment_proof_received' ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900">
                            Payment Proof
                          </span>
                        ) : conv.status === 'needs_admin' ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                            Needs Admin
                          </span>
                        ) : conv.status === 'admin_active' ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-900">
                            Live Admin
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900">
                            Resolved
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {lastMsg ? lastMsg.content : 'No messages'}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                        <span>{conv.customer_phone || 'Web session'}</span>
                        <span>{new Date(conv.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Conversation Active View & Takeover Box */}
            <div className="lg:col-span-8 flex flex-col">
              {selectedConversation ? (
                <>
                  <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">
                        {selectedConversation.customer_name || 'Visitor'}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Phone: {selectedConversation.customer_phone || 'N/A'} • Status:{' '}
                        <span className="font-semibold uppercase">{selectedConversation.status}</span>
                      </p>
                    </div>

                    
                    <div className="flex gap-2">
                      {(selectedConversation.status === 'payment_proof_received' || selectedConversation.status === 'needs_admin') && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleApprovePayment(selectedConversation.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                          >
                            Approve Payment & Grant
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRejectPayment(selectedConversation.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
                          >
                            Reject Payment
                          </button>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => handleResolveConversation(selectedConversation.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors"
                      >
                        Mark Resolved
                      </button>
                    </div>

                  </div>

                  {/* Messages Scroll Area */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/40 max-h-[450px]">
                    {selectedConversation.messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex flex-col ${
                          m.sender === 'customer'
                            ? 'items-start'
                            : m.sender === 'admin'
                            ? 'items-end'
                            : 'items-start'
                        }`}
                      >
                        <span className="text-[10px] text-slate-400 mb-0.5 px-1 font-semibold uppercase">
                          {m.sender}
                        </span>
                        <div
                          className={`max-w-[80%] p-3 rounded-xl text-xs whitespace-pre-line ${
                            m.sender === 'customer'
                              ? 'bg-white border border-slate-200 text-slate-900'
                              : m.sender === 'admin'
                              ? 'bg-purple-600 text-white'
                              : 'bg-blue-100 text-blue-900'
                          }`}
                        >
                          {m.content}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Admin Reply & Takeover Form */}
                  <div className="p-4 border-t border-slate-200 bg-white">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendAdminReply();
                      }}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="text"
                        value={adminReplyText}
                        onChange={(e) => setAdminReplyText(e.target.value)}
                        placeholder="Type human admin response to customer..."
                        className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-purple-600 bg-slate-50"
                      />
                      <button
                        type="submit"
                        disabled={!adminReplyText.trim() || sendingAdminReply}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 transition-colors flex items-center space-x-1"
                      >
                        <span>Take Over & Send</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400 text-xs">
                  Select a conversation from the left to inspect or take over.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: MANUAL PAYMENT SETTINGS */}
        {activeTab === 'payment' && paymentSettings && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Manual Payment Settings</h3>
              <p className="text-xs text-slate-500">
                Configure your official payment accounts and instructions. The AI assistant uses these exact instructions when customers ask how to pay.
              </p>
            </div>

            {paymentSavedAlert && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Payment instructions updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSavePaymentSettings} className="space-y-6">
              {/* Primary Contact & Payment Number Configuration */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-emerald-50/40 space-y-4">
                <h4 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>Official Payment & Admin Credentials (Strictly Separated)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      📱 Somalia Payment Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentSettings.payment_number || paymentSettings.somalia_payment_number || '+252615941664'}
                      onChange={(e) => {
                        const num = e.target.value;
                        const updatedMethods = (paymentSettings.somalia_methods || []).map((m) => ({
                          ...m,
                          account_number: num,
                        }));
                        setPaymentSettings({
                          ...paymentSettings,
                          payment_number: num,
                          somalia_payment_number: num,
                          somalia_methods: updatedMethods,
                        });
                      }}
                      placeholder="+252615941664"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold text-emerald-800 bg-white"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Manual payments only (EVC/Zaad/Sahal)</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      💬 Admin WhatsApp Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentSettings.admin_whatsapp_number || paymentSettings.support_phone || '+252615940000'}
                      onChange={(e) =>
                        setPaymentSettings({
                          ...paymentSettings,
                          admin_whatsapp_number: e.target.value,
                          support_phone: e.target.value,
                        })
                      }
                      placeholder="+252615940000"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white text-blue-900 font-mono font-bold"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Separate from payment number</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      👤 Admin Contact Name
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.admin_contact_name || paymentSettings.support_whatsapp_display || 'Maamulka XirfadoNet'}
                      onChange={(e) =>
                        setPaymentSettings({
                          ...paymentSettings,
                          admin_contact_name: e.target.value,
                          support_whatsapp_display: e.target.value,
                        })
                      }
                      placeholder="Maamulka XirfadoNet"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 font-semibold"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Displayed on platform</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      ✉️ Support Email
                    </label>
                    <input
                      type="email"
                      value={paymentSettings.support_email || 'support@xirfadonet.com'}
                      onChange={(e) =>
                        setPaymentSettings({ ...paymentSettings, support_email: e.target.value })
                      }
                      placeholder="support@xirfadonet.com"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-800"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Official support inbox</span>
                  </div>
                </div>
              </div>

              {/* Somalia Methods & Instructions */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
                <h4 className="font-bold text-sm text-slate-900">1. Somalia Payment Instructions (EVC / ZAAD / Sahal)</h4>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Guidance for customers in Somalia
                  </label>
                  <textarea
                    rows={3}
                    value={paymentSettings.somalia_instructions}
                    onChange={(e) =>
                      setPaymentSettings({ ...paymentSettings, somalia_instructions: e.target.value })
                    }
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs leading-relaxed bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800">Somalia Payment Accounts:</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {paymentSettings.somalia_methods.map((method, idx) => (
                      <div key={method.id} className="p-3 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
                        <input
                          type="text"
                          value={method.provider}
                          onChange={(e) => {
                            const newMethods = [...paymentSettings.somalia_methods];
                            newMethods[idx].provider = e.target.value;
                            setPaymentSettings({ ...paymentSettings, somalia_methods: newMethods });
                          }}
                          placeholder="Provider (e.g. EVC Plus)"
                          className="w-full p-1.5 border border-slate-200 rounded font-semibold text-slate-800"
                        />
                        <input
                          type="text"
                          value={method.account_number}
                          onChange={(e) => {
                            const newMethods = [...paymentSettings.somalia_methods];
                            newMethods[idx].account_number = e.target.value;
                            setPaymentSettings({ ...paymentSettings, somalia_methods: newMethods });
                          }}
                          placeholder="Account Number"
                          className="w-full p-1.5 border border-slate-200 rounded font-mono text-emerald-700"
                        />
                        <input
                          type="text"
                          value={method.account_name}
                          onChange={(e) => {
                            const newMethods = [...paymentSettings.somalia_methods];
                            newMethods[idx].account_name = e.target.value;
                            setPaymentSettings({ ...paymentSettings, somalia_methods: newMethods });
                          }}
                          placeholder="Account Name"
                          className="w-full p-1.5 border border-slate-200 rounded text-slate-600"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* International Methods & Instructions */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
                <h4 className="font-bold text-sm text-slate-900">2. International Payment Instructions (WorldRemit / Sendwave / Remitly)</h4>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Guidance for customers outside Somalia (Diaspora)
                  </label>
                  <textarea
                    rows={3}
                    value={paymentSettings.international_instructions}
                    onChange={(e) =>
                      setPaymentSettings({ ...paymentSettings, international_instructions: e.target.value })
                    }
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs leading-relaxed bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800">International Payment Accounts:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {paymentSettings.international_methods.map((method, idx) => (
                      <div key={method.id} className="p-3 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
                        <input
                          type="text"
                          value={method.provider}
                          onChange={(e) => {
                            const newMethods = [...paymentSettings.international_methods];
                            newMethods[idx].provider = e.target.value;
                            setPaymentSettings({ ...paymentSettings, international_methods: newMethods });
                          }}
                          placeholder="Provider"
                          className="w-full p-1.5 border border-slate-200 rounded font-semibold text-slate-800"
                        />
                        <input
                          type="text"
                          value={method.account_number}
                          onChange={(e) => {
                            const newMethods = [...paymentSettings.international_methods];
                            newMethods[idx].account_number = e.target.value;
                            setPaymentSettings({ ...paymentSettings, international_methods: newMethods });
                          }}
                          placeholder="Account Details"
                          className="w-full p-1.5 border border-slate-200 rounded font-mono text-blue-700"
                        />
                        <input
                          type="text"
                          value={method.account_name}
                          onChange={(e) => {
                            const newMethods = [...paymentSettings.international_methods];
                            newMethods[idx].account_name = e.target.value;
                            setPaymentSettings({ ...paymentSettings, international_methods: newMethods });
                          }}
                          placeholder="Account Name"
                          className="w-full p-1.5 border border-slate-200 rounded text-slate-600"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verification Instructions */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Verification & Screenshot Instructions (What student should do after sending money)
                </label>
                <textarea
                  rows={2}
                  value={paymentSettings.verification_instructions}
                  onChange={(e) =>
                    setPaymentSettings({ ...paymentSettings, verification_instructions: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs leading-relaxed bg-white"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingPayment}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {savingPayment ? 'Saving...' : 'Save Payment Settings'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: KNOWLEDGE BASE */}
        {activeTab === 'knowledge' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Knowledge Base Articles</h3>
                <p className="text-xs text-slate-500">
                  Factual diagnostic guides and policies used by the AI to answer technical troubleshooting questions.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenKnowledgeModal()}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Knowledge Item</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {knowledge.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">{item.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-200/80">
                    <button
                      type="button"
                      onClick={() => handleOpenKnowledgeModal(item)}
                      className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteKnowledge(item.id)}
                      className="p-1.5 text-slate-600 hover:text-red-600 rounded-lg hover:bg-slate-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: STUDENTS / CUSTOMERS */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Registered Students Directory</h3>
              <p className="text-xs text-slate-500">
                Contact profiles of students and visitors who interacted with support or signed up.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Phone / WhatsApp</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Language</th>
                    <th className="p-3">Enrolled Courses</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {customers.map((c, idx) => (
                    <tr key={c.customer_id || c.id || idx} className="hover:bg-slate-50/80">
                      <td className="p-3 font-bold text-slate-900">{c.name || 'Anonymous'}</td>
                      <td className="p-3 font-mono text-slate-700">{c.phone || 'N/A'}</td>
                      <td className="p-3 text-slate-500">{c.email || 'N/A'}</td>
                      <td className="p-3 uppercase">{c.preferred_language || 'so'}</td>
                      <td className="p-3">
                        {c.enrolled_courses && c.enrolled_courses.length > 0 ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                            {c.enrolled_courses.length} Courses
                          </span>
                        ) : (
                          <span className="text-slate-400">None</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: AI SETTINGS */}
        {activeTab === 'ai-settings' && aiSettings && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">AI Personality & Persona Settings</h3>
              <p className="text-xs text-slate-500">
                Configure how the AI agent behaves, communicates, and assists customers.
              </p>
            </div>

            <form onSubmit={handleSaveAiSettings} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    System Persona / System Prompt
                  </label>
                  <textarea
                    rows={8}
                    value={aiSettings.persona_prompt}
                    onChange={(e) =>
                      setAiSettings({ ...aiSettings, persona_prompt: e.target.value })
                    }
                    placeholder="Enter the master system prompt..."
                    className="w-full p-4 rounded-xl border border-slate-300 text-xs leading-relaxed bg-slate-50"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    The core identity of the assistant. Defines tone, restrictions, and general goals.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Fallback Strategy
                  </label>
                  <select
                    value={aiSettings.fallback_strategy}
                    onChange={(e) =>
                      setAiSettings({ ...aiSettings, fallback_strategy: e.target.value })
                    }
                    className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-sm"
                  >
                    <option value="handoff">Handoff to Human (Needs Admin)</option>
                    <option value="apologize">Apologize & Keep Asking (AI Loop)</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3 mt-8">
                  <input
                    type="checkbox"
                    id="auto_recommend"
                    checked={aiSettings.auto_recommend_courses}
                    onChange={(e) =>
                      setAiSettings({ ...aiSettings, auto_recommend_courses: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                  />
                  <label htmlFor="auto_recommend" className="text-sm font-semibold text-slate-700">
                    Auto-Recommend Courses (Sales Mode)
                  </label>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  disabled={savingAiSettings}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {savingAiSettings ? 'Saving...' : 'Save AI Settings'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* CATEGORY MODAL */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <button
              type="button"
              onClick={() => setIsCategoryModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h3>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  placeholder="e.g. YouTube & Content Creation"
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  placeholder="Describe the skills in this category..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 leading-relaxed"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-bold shadow-xs"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* COURSE MODAL */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsCourseModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">
              {editingCourse ? 'Edit Course' : 'Add New Course'}
            </h3>

            <form onSubmit={handleSaveCourse} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    placeholder="e.g. 3 Toddobaad"
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Price ($ USD) *</label>
                  <input
                    type="number"
                    required
                    value={courseForm.price}
                    onChange={(e) => setCourseForm({ ...courseForm, price: Number(e.target.value) })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    value={courseForm.previous_price}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, previous_price: Number(e.target.value) })
                    }
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Discount %</label>
                  <input
                    type="number"
                    value={courseForm.discount_percent}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, discount_percent: Number(e.target.value) })
                    }
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={courseForm.image}
                  onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Learning Outcomes (One per line)
                </label>
                <textarea
                  rows={3}
                  value={courseForm.learning_outcomes}
                  onChange={(e) => setCourseForm({ ...courseForm, learning_outcomes: e.target.value })}
                  placeholder="Baro sida loo abuuro kanaal guuleysta&#10;Baro monetization&#10;Baro video editing"
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 leading-relaxed"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-bold shadow-xs"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* KNOWLEDGE MODAL */}
      {isKnowledgeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            <button
              type="button"
              onClick={() => setIsKnowledgeModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">
              {editingKnowledge ? 'Edit Knowledge Article' : 'Add Knowledge Article'}
            </h3>

            <form onSubmit={handleSaveKnowledge} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={knowledgeForm.title}
                  onChange={(e) => setKnowledgeForm({ ...knowledgeForm, title: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={knowledgeForm.category}
                    onChange={(e) =>
                      setKnowledgeForm({ ...knowledgeForm, category: e.target.value as any })
                    }
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  >
                    <option value="youtube">YouTube</option>
                    <option value="adsense">AdSense</option>
                    <option value="registration">Registration</option>
                    <option value="payment_instructions">Payment</option>
                    <option value="faq">FAQ</option>
                    <option value="policy">Policy</option>
                    <option value="general_support">General Support</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Language</label>
                  <select
                    value={knowledgeForm.language}
                    onChange={(e) =>
                      setKnowledgeForm({ ...knowledgeForm, language: e.target.value as any })
                    }
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50"
                  >
                    <option value="both">Both (SO & EN)</option>
                    <option value="so">Somali only</option>
                    <option value="en">English only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Content (AI will use this factual diagnosis) *
                </label>
                <textarea
                  rows={6}
                  required
                  value={knowledgeForm.content}
                  onChange={(e) => setKnowledgeForm({ ...knowledgeForm, content: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 leading-relaxed"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsKnowledgeModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-bold shadow-xs"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Proof Image Modal Preview */}
      {previewProofImage && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-4 overflow-hidden shadow-2xl relative">
            <button
              type="button"
              onClick={() => setPreviewProofImage(null)}
              className="absolute top-3 right-3 p-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>📷 Proof of Payment Receipt</span>
            </h4>
            <div className="max-h-[75vh] overflow-auto rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
              <img
                src={previewProofImage}
                alt="Payment proof receipt"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewProofImage(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
