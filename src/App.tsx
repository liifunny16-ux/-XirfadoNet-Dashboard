import React, { useState, useEffect } from 'react';
import {
  Course,
  Category,
  KnowledgeItem,
  CustomerProfile,
  Conversation,
  AdminStats,
  Language,
  NavView,
  PaymentSettings,
} from './types.js';
import { Header } from './components/Header.js';
import { HomeView } from './components/HomeView.js';
import { CoursesView } from './components/CoursesView.js';
import { CategoriesView } from './components/CategoriesView.js';
import { CustomerChat } from './components/CustomerChat.js';
import { BlogView } from './components/BlogView.js';
import { NichesView } from './components/NichesView.js';
import { ContentIdeasView } from './components/ContentIdeasView.js';
import { ViewsHubView } from './components/ViewsHubView.js';
import { OnlineWorkView } from './components/OnlineWorkView.js';
import { CoachingView } from './components/CoachingView.js';
import { ReviewsView } from './components/ReviewsView.js';
import { AboutView } from './components/AboutView.js';
import { ContactView } from './components/ContactView.js';
import { AdminDashboard } from './components/AdminDashboard.js';
import { CourseModal } from './components/CourseModal.js';
import { CourseRegistrationModal } from './components/CourseRegistrationModal.js';
import { AuthModal } from './components/AuthModal.js';
import { Footer } from './components/Footer.js';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('so');
  const [activeView, setActiveView] = useState<NavView>('home');

  // Application Data State
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>([]);
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    payment_number: '+252615941664',
    admin_whatsapp_number: '+252711870601',
    somalia_payment_number: '+252615941664',
    somalia_instructions: 'Ku dir lacagta EVC Plus lambarka +252615941664, kadib rasiidka usoo dir maamulka.',
    international_instructions: 'La soo xiriir maamulka XirfadoNet si laguu siiyo habka lacag-bixinta caalamiga ah.',
    somalia_methods: [],
    international_methods: [],
    verification_instructions: 'Soo dir screenshot-ka ama SMS-ka lacag bixinta si laguu furo koorsada.',
    support_phone: '+252711870601',
    support_email: 'support@xirfadonet.com',
    support_whatsapp_display: 'Maamulka XirfadoNet',
  });
  const [stats, setStats] = useState<AdminStats>({
    total_courses: 0,
    published_courses: 0,
    total_customers: 0,
    total_conversations: 0,
    conversations_needing_help: 0,
    courses_by_category: [],
  });

  // Current customer active conversation
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);

  // Selected course for detail modal
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);

  // Selected course for registration modal
  const [selectedCourseForRegistration, setSelectedCourseForRegistration] = useState<Course | null>(null);

  // Filter state for courses view
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);

  // Auth modal state & current user
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [currentUser, setCurrentUser] = useState<{ name: string; phone?: string; email?: string } | null>(() => {
    try {
      const saved = localStorage.getItem('xirfadonet_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Load all initial data from API
  const fetchAllData = async () => {
    try {
      const [coursesRes, categoriesRes, knowledgeRes, customersRes, convsRes, statsRes, payRes] =
        await Promise.all([
          fetch('/api/courses'),
          fetch('/api/categories'),
          fetch('/api/knowledge'),
          fetch('/api/customers'),
          fetch('/api/conversations'),
          fetch('/api/admin/stats'),
          fetch('/api/payment-settings'),
        ]);

      if (coursesRes.ok) setCourses(await coursesRes.json());
      if (categoriesRes.ok) setCategories(await categoriesRes.json());
      if (knowledgeRes.ok) setKnowledge(await knowledgeRes.json());
      if (customersRes.ok) setCustomers(await customersRes.json());
      if (payRes.ok) setPaymentSettings(await payRes.json());
      if (convsRes.ok) {
        const convList: Conversation[] = await convsRes.json();
        setConversations(convList);

        // Keep active customer conversation up to date
        if (activeConversation) {
          const fresh = convList.find((c) => c.id === activeConversation.id);
          if (fresh) setActiveConversation(fresh);
        }
      }
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (err) {
      console.error('Error fetching data from server:', err);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Sync active conversation updates
  const handleUpdateConversation = (updated: Conversation) => {
    setActiveConversation(updated);
    setConversations((prev) => {
      const idx = prev.findIndex((c) => c.id === updated.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = updated;
        return next;
      }
      return [updated, ...prev];
    });

    // Refresh stats
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((s) => setStats(s))
      .catch(() => {});
  };

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategoryFilter(categoryName);
    setActiveView('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: { name: string; email: string; phone: string }) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('xirfadonet_user', JSON.stringify(user));
    } catch {}
    fetchAllData();
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('xirfadonet_user');
    } catch {}
  };

  const needsAdminCount = stats.needs_admin_conversations || stats.conversations_needing_help || 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation & Brand Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        needsAdminCount={needsAdminCount}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onSignOut={handleSignOut}
      />

      {/* Main View Switcher */}
      <main className="flex-1 flex flex-col">
        {activeView === 'home' && (
          <HomeView
            currentLanguage={currentLanguage}
            courses={courses}
            categories={categories}
            onViewChange={setActiveView}
            onSelectCourse={setSelectedCourseForModal}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {activeView === 'courses' && (
          <CoursesView
            currentLanguage={currentLanguage}
            courses={courses}
            categories={categories}
            onSelectCourse={setSelectedCourseForModal}
            selectedCategoryFilter={selectedCategoryFilter}
            onClearCategoryFilter={() => setSelectedCategoryFilter(null)}
          />
        )}

        {activeView === 'categories' && (
          <CategoriesView
            currentLanguage={currentLanguage}
            categories={categories}
            courses={courses}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {activeView === 'support' && (
          <CustomerChat
            currentLanguage={currentLanguage}
            onOpenCourseModal={setSelectedCourseForModal}
            activeConversation={activeConversation}
            onUpdateConversation={handleUpdateConversation}
            allCourses={courses}
            studentUser={currentUser}
          />
        )}

        {activeView === 'niches' && (
          <NichesView
            currentLanguage={currentLanguage}
            courses={courses}
            onSelectCourse={(id) => {
              const c = courses.find((item) => item.course_id === id);
              if (c) setSelectedCourseForModal(c);
            }}
            onOpenRegister={(c) => setSelectedCourseForRegistration(c)}
          />
        )}

        {activeView === 'content-ideas' && (
          <ContentIdeasView
            currentLanguage={currentLanguage}
            courses={courses}
            onSelectCourse={(id) => {
              const c = courses.find((item) => item.course_id === id);
              if (c) setSelectedCourseForModal(c);
            }}
            onOpenRegister={(c) => setSelectedCourseForRegistration(c)}
          />
        )}

        {activeView === 'views-hub' && (
          <ViewsHubView
            currentLanguage={currentLanguage}
            courses={courses}
            onSelectCourse={(id) => {
              const c = courses.find((item) => item.course_id === id);
              if (c) setSelectedCourseForModal(c);
            }}
            onOpenRegister={(c) => setSelectedCourseForRegistration(c)}
          />
        )}

        {activeView === 'online-work' && (
          <OnlineWorkView
            currentLanguage={currentLanguage}
            courses={courses}
            onSelectCourse={(id) => {
              const c = courses.find((item) => item.course_id === id);
              if (c) setSelectedCourseForModal(c);
            }}
            onOpenRegister={(c) => setSelectedCourseForRegistration(c)}
          />
        )}

        {activeView === 'coaching' && (
          <CoachingView
            currentLanguage={currentLanguage}
            paymentSettings={paymentSettings}
          />
        )}

        {activeView === 'reviews' && (
          <ReviewsView
            currentLanguage={currentLanguage}
            courses={courses}
          />
        )}

        {activeView === 'blog' && (
          <BlogView
            currentLanguage={currentLanguage}
            onSelectCourse={(id) => {
              const c = courses.find((item) => item.course_id === id);
              if (c) setSelectedCourseForModal(c);
            }}
            onOpenRegister={(c) => setSelectedCourseForRegistration(c)}
          />
        )}

        {activeView === 'about' && (
          <AboutView currentLanguage={currentLanguage} onViewChange={setActiveView} />
        )}

        {activeView === 'contact' && (
          <ContactView
            currentLanguage={currentLanguage}
            onViewChange={setActiveView}
            paymentSettings={paymentSettings}
          />
        )}

        {activeView === 'admin' && (
          <AdminDashboard
            currentLanguage={currentLanguage}
            onRefreshData={fetchAllData}
            courses={courses}
            knowledge={knowledge}
            customers={customers}
            conversations={conversations}
            stats={stats}
            categories={categories}
          />
        )}
      </main>

      {/* Footer on all client views (hide only in admin mode if desired, or show consistently) */}
      {activeView !== 'admin' && (
        <Footer currentLanguage={currentLanguage} onViewChange={setActiveView} />
      )}

      {/* Global Course Modal */}
      <CourseModal
        course={selectedCourseForModal}
        isOpen={Boolean(selectedCourseForModal)}
        onClose={() => setSelectedCourseForModal(null)}
        language={currentLanguage}
        onOpenRegister={(c) => setSelectedCourseForRegistration(c)}
        onOpenPaymentGuide={() => {
          setActiveView('support');
        }}
      />

      {/* Course Registration & Payment Modal */}
      {selectedCourseForRegistration && (
        <CourseRegistrationModal
          course={selectedCourseForRegistration}
          isOpen={Boolean(selectedCourseForRegistration)}
          onClose={() => setSelectedCourseForRegistration(null)}
          currentLanguage={currentLanguage}
          paymentSettings={paymentSettings}
        />
      )}

      {/* Student Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authMode}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        language={currentLanguage}
      />
    </div>
  );
}
