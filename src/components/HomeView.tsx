import React from 'react';
import { Course, Category, Language, NavView } from '../types.js';
import { translations } from '../translations.js';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Users,
  Award,
  Clock,
  Star,
  Zap,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  Play,
} from 'lucide-react';

interface HomeViewProps {
  currentLanguage: Language;
  courses: Course[];
  categories: Category[];
  onViewChange: (view: NavView) => void;
  onSelectCourse: (course: Course) => void;
  onSelectCategory: (categoryName: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentLanguage,
  courses,
  categories,
  onViewChange,
  onSelectCourse,
  onSelectCategory,
}) => {
  const t = translations[currentLanguage];

  // Take top featured courses
  const featuredCourses = courses; // Show all to satisfy user request

  const reviews = [
    {
      id: 'rev-1',
      name: 'Maxamed Axmed Cali',
      role: 'Shorts Creator & YouTuber',
      comment:
        'Koorsada Shorts & Monetization waxay iga caawisay inaan gaaro 12 milyan oo views 45 maalmood gudahood. Hadda kanaalkaygu wuxuu si buuxda ugu jiraa barnaamijka dakhliga YouTube.',
      rating: 5,
      date: 'Febraayo 2026',
    },
    {
      id: 'rev-2',
      name: 'Cabdiraxmaan Xasan',
      role: 'Football Video Editor',
      comment:
        'FOOTBALL EDITING MASTERCLASS waa koorsada ugu tayada wanaagsan. Premiere Pro iyo beat syncing-ka aan ka bartay ayaa ii horseeday inaan helo macaamiil caalami ah.',
      rating: 5,
      date: 'Janaayo 2026',
    },
    {
      id: 'rev-3',
      name: 'Nimco Jaamac',
      role: 'Shopify Dropshipper',
      comment:
        'Dukaankayga Shopify dropshipping-ka waxaan ku dhisay hagaha XirfadoNet. Waxay si toos ah ii tustay sida alaabta looga helo TikTok loona xalliyo lacagaha.',
      rating: 5,
      date: 'Maarso 2026',
    },
  ];

  return (
    <div className="flex flex-col w-full bg-slate-50 text-slate-900">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-slate-900 text-white pt-16 pb-20 lg:pt-24 lg:pb-28">
        {/* Subtle geometric background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-700/60 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>XirfadoNet • Online Education Platform</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                {t.heroTitle}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-sky-300 to-amber-200">
                  {t.heroHighlight}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-blue-100/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t.heroSubtitle}
              </p>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  id="hero-btn-courses"
                  type="button"
                  onClick={() => onViewChange('courses')}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-bold text-blue-900 bg-white hover:bg-blue-50 shadow-lg shadow-blue-950/40 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 mr-2 text-blue-700" />
                  <span>{t.browseCourses}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>

                <button
                  id="hero-btn-ai-support"
                  type="button"
                  onClick={() => onViewChange('support')}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600/80 hover:bg-blue-600 border border-blue-400/40 shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-amber-300" />
                  <span>{t.askAiSupport}</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-blue-700/40 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">5,000+</div>
                  <div className="text-xs text-blue-200">{t.studentsCount}</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">10+</div>
                  <div className="text-xs text-blue-200">{t.coursesCount}</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">99%</div>
                  <div className="text-xs text-blue-200">{t.satisfactionRate}</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">100%</div>
                  <div className="text-xs text-blue-200">{t.practicalLearning}</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Card / Banner */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Live AI Assistant
                    </span>
                  </div>
                  <span className="text-xs text-blue-200">24/7 Support</span>
                </div>

                <div className="space-y-2.5">
                  <div className="bg-white/15 p-3 rounded-xl text-xs text-blue-50 border border-white/10">
                    <p className="font-semibold text-white mb-1">
                      {currentLanguage === 'so'
                        ? 'Ku soo dhawoow XirfadoNet 👋'
                        : 'Welcome to XirfadoNet 👋'}
                    </p>
                    <p className="text-blue-100">
                      {currentLanguage === 'so'
                        ? 'Ma qabtaa dhibaato YouTube views, Google AdSense PIN, ama diiwaangelinta koorsooyinka?'
                        : 'Experiencing low YouTube views, AdSense verification issues, or need course enrollment guidance?'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => onViewChange('support')}
                      className="p-2.5 rounded-lg bg-blue-700/60 hover:bg-blue-600/80 border border-blue-400/30 text-white font-medium text-left transition-colors cursor-pointer"
                    >
                      🚀 {currentLanguage === 'so' ? 'Kordhi YouTube Views' : 'Boost YouTube Views'}
                    </button>
                    <button
                      type="button"
                      onClick={() => onViewChange('support')}
                      className="p-2.5 rounded-lg bg-blue-700/60 hover:bg-blue-600/80 border border-blue-400/30 text-white font-medium text-left transition-colors cursor-pointer"
                    >
                      🛡️ {currentLanguage === 'so' ? 'AdSense PIN Xallin' : 'Fix AdSense PIN'}
                    </button>
                    <button
                      type="button"
                      onClick={() => onViewChange('support')}
                      className="p-2.5 rounded-lg bg-blue-700/60 hover:bg-blue-600/80 border border-blue-400/30 text-white font-medium text-left transition-colors cursor-pointer"
                    >
                      💳 {currentLanguage === 'so' ? 'Tilmaamaha Lacagta' : 'Payment Guidance'}
                    </button>
                    <button
                      type="button"
                      onClick={() => onViewChange('support')}
                      className="p-2.5 rounded-lg bg-blue-700/60 hover:bg-blue-600/80 border border-blue-400/30 text-white font-medium text-left transition-colors cursor-pointer"
                    >
                      🎓 {currentLanguage === 'so' ? 'Dooro Koorsadaada' : 'Find Best Course'}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onViewChange('support')}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-colors cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>{currentLanguage === 'so' ? 'Wada-hadal la bilow AI' : 'Start Chatting with AI'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Categories Horizontal / Grid Bar */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {t.categoriesTitle}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {t.categoriesSubtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onViewChange('categories')}
              className="mt-3 md:mt-0 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            >
              <span>{currentLanguage === 'so' ? 'Eeg Dhammaan Qaybaha' : 'View All Categories'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {categories.slice(0, 10).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.name)}
                className="flex flex-col items-start p-4 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-300 transition-all text-left group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span className="font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 line-clamp-1">
                  {cat.name}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  {cat.course_count || 0} {currentLanguage === 'so' ? 'Koorso' : 'Courses'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Courses Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-2">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                <span>{currentLanguage === 'so' ? 'Xulashada Ugu Fiican' : 'Top Recommendations'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {t.featuredCoursesTitle}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {t.featuredCoursesSubtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onViewChange('courses')}
              className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors cursor-pointer"
            >
              <span>{t.viewAllCourses}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <div
                key={course.course_id}
                className="flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow group"
              >
                {/* Course Image & Badges */}
                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/1e3a8a/ffffff?text=' + encodeURIComponent(course.title); }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-900 text-white">
                      <BookOpen className="w-12 h-12 opacity-40" />
                    </div>
                  )}

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-xs">
                      {course.category}
                    </span>
                  </div>

                  {/* Discount Badge */}
                  {course.discount_percent && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-red-600 text-white shadow-xs">
                        {course.discount_percent}% OFF
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {course.duration && (
                      <div className="flex items-center text-xs text-slate-500 mb-2">
                        <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        <span>{course.duration}</span>
                      </div>
                    )}

                    <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Price & Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-xl font-extrabold text-blue-700">
                          ${course.price}
                        </span>
                        {course.previous_price && (
                          <span className="text-xs text-slate-400 line-through">
                            ${course.previous_price}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium">USD • Lifetime Access</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => onSelectCourse(course)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                      >
                        {t.viewCourse}
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectCourse(course)}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                      >
                        {t.enrollNow}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Problem Solver Spotlight Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{currentLanguage === 'so' ? 'Adeegga AI Support ee XirfadoNet' : 'XirfadoNet AI Support'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {t.problemSolverBannerTitle}
              </h2>
              <p className="text-blue-100 text-sm sm:text-base max-w-2xl leading-relaxed">
                {t.problemSolverBannerDesc}
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                type="button"
                onClick={() => onViewChange('support')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-bold text-blue-900 bg-white hover:bg-blue-50 shadow-xl transition-transform hover:scale-105 cursor-pointer flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>{t.problemSolverBannerBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Student Reviews / Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.reviewsTitle}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              {t.reviewsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">{rev.name}</h4>
                    <p className="text-slate-500 text-[11px]">{rev.role}</p>
                  </div>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
