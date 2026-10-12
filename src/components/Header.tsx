import React, { useState } from 'react';
import { Language, NavView } from '../types.js';
import { translations } from '../translations.js';
import {
  GraduationCap,
  Globe,
  Sparkles,
  LayoutDashboard,
  Menu,
  X,
  User,
  LogIn,
  BookOpen,
  FolderTree,
  FileText,
  Info,
  PhoneCall,
  Lightbulb,
  TrendingUp,
  Briefcase,
  UserCheck,
  Award,
} from 'lucide-react';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  activeView: NavView;
  onViewChange: (view: NavView) => void;
  needsAdminCount?: number;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  currentUser?: { name: string; phone?: string } | null;
  onSignOut?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  activeView,
  onViewChange,
  needsAdminCount = 0,
  onOpenAuth,
  currentUser,
  onSignOut,
}) => {
  const t = translations[currentLanguage];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavView; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'courses', label: t.navCourses, icon: <BookOpen className="w-4 h-4" /> },
    { id: 'niches', label: t.navNiches, icon: <Sparkles className="w-4 h-4 text-purple-600" /> },
    { id: 'content-ideas', label: t.navContentIdeas, icon: <Lightbulb className="w-4 h-4 text-amber-600" /> },
    { id: 'views-hub', label: t.navViewsHub, icon: <TrendingUp className="w-4 h-4 text-rose-600" /> },
    { id: 'online-work', label: t.navOnlineWork, icon: <Briefcase className="w-4 h-4 text-emerald-600" /> },
    { id: 'coaching', label: t.navCoaching, icon: <UserCheck className="w-4 h-4 text-indigo-600" />, badge: 'VIP' },
    { id: 'blog', label: t.navBlog, icon: <FileText className="w-4 h-4" /> },
    { id: 'reviews', label: t.navReviews, icon: <Award className="w-4 h-4 text-amber-500" /> },
    {
      id: 'support',
      label: t.navSupport,
      icon: <Sparkles className="w-4 h-4 text-blue-500" />,
      badge: '24/7 AI',
    },
  ];

  const handleNavClick = (view: NavView) => {
    onViewChange(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl text-slate-900 tracking-tight font-display">
                  Xirfado<span className="text-blue-600">Net</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                {t.brandTagline}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'text-blue-700 bg-blue-50/80 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white tracking-wide">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Switcher */}
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 text-xs font-semibold p-0.5">
              <button
                type="button"
                id="header-lang-so"
                onClick={() => onLanguageChange('so')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  currentLanguage === 'so'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                SO
              </button>
              <button
                type="button"
                id="header-lang-en"
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  currentLanguage === 'en'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>

            {/* Admin Dashboard Entry Button */}
            <button
              id="header-btn-admin"
              type="button"
              onClick={() => handleNavClick('admin')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer relative border ${
                activeView === 'admin'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.navAdmin}</span>
              {needsAdminCount > 0 && (
                <span className="ml-1 inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                  {needsAdminCount}
                </span>
              )}
            </button>

            {/* User Auth Buttons */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1.5 text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span className="max-w-[100px] truncate">{currentUser.name}</span>
                </div>
                {onSignOut && (
                  <button
                    type="button"
                    onClick={onSignOut}
                    className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                  >
                    {t.signOut}
                  </button>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <button
                  id="header-btn-signin"
                  type="button"
                  onClick={() => onOpenAuth('signin')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  {t.signIn}
                </button>
                <button
                  id="header-btn-signup"
                  type="button"
                  onClick={() => onOpenAuth('signup')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs shadow-blue-500/20 transition-all cursor-pointer"
                >
                  {t.signUp}
                </button>
              </div>
            )}

            {/* Mobile Menu Hamburger Button */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-blue-700 bg-blue-50 font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
            {!currentUser && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signin');
                  }}
                  className="w-full py-2 text-center text-xs font-semibold text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  {t.signIn}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="w-full py-2 text-center text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {t.signUp}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
