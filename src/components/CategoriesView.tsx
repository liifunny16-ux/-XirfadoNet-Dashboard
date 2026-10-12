import React from 'react';
import { Category, Course, Language } from '../types.js';
import { translations } from '../translations.js';
import {
  FolderTree,
  ArrowRight,
  BookOpen,
  Youtube,
  Cpu,
  Film,
  Palette,
  Megaphone,
  ShoppingCart,
  DollarSign,
  Share2,
  BadgePercent,
  Sparkles,
} from 'lucide-react';

interface CategoriesViewProps {
  currentLanguage: Language;
  categories: Category[];
  courses: Course[];
  onSelectCategory: (categoryName: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  currentLanguage,
  categories,
  courses,
  onSelectCategory,
}) => {
  const t = translations[currentLanguage];

  const getCategoryIcon = (slugOrName: string) => {
    const s = slugOrName.toLowerCase();
    if (s.includes('youtube')) return <Youtube className="w-6 h-6 text-red-600" />;
    if (s.includes('ai') || s.includes('automation')) return <Cpu className="w-6 h-6 text-indigo-600" />;
    if (s.includes('video') || s.includes('editing')) return <Film className="w-6 h-6 text-purple-600" />;
    if (s.includes('graphic') || s.includes('design')) return <Palette className="w-6 h-6 text-pink-600" />;
    if (s.includes('marketing')) return <Megaphone className="w-6 h-6 text-amber-600" />;
    if (s.includes('commerce') || s.includes('shopify')) return <ShoppingCart className="w-6 h-6 text-emerald-600" />;
    if (s.includes('earning') || s.includes('online')) return <DollarSign className="w-6 h-6 text-teal-600" />;
    if (s.includes('social')) return <Share2 className="w-6 h-6 text-blue-600" />;
    if (s.includes('monetization')) return <BadgePercent className="w-6 h-6 text-cyan-600" />;
    return <Sparkles className="w-6 h-6 text-blue-600" />;
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-2">
            <FolderTree className="w-3.5 h-3.5" />
            <span>{currentLanguage === 'so' ? 'Qaybaha Xirfadaha XirfadoNet' : 'Skill Categories'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.categoriesTitle}
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            {t.categoriesSubtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const courseCount =
              cat.course_count ??
              courses.filter(
                (c) => c.category === cat.name || c.category_id === cat.id
              ).length;

            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getCategoryIcon(cat.slug || cat.name)}
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                      {courseCount} {currentLanguage === 'so' ? 'Koorso' : 'Courses'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {cat.description ||
                      (currentLanguage === 'so'
                        ? 'Xirfado casri ah oo suuq caalami ah leh.'
                        : 'Modern skills with global market opportunities.')}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onSelectCategory(cat.name)}
                    className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white cursor-pointer"
                  >
                    <span>{t.viewCategoryCourses}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
