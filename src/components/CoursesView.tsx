import React, { useState, useMemo } from 'react';
import { Course, Category, Language } from '../types.js';
import { translations } from '../translations.js';
import {
  Search,
  BookOpen,
  Clock,
  Filter,
  ArrowUpDown,
  Zap,
  CheckCircle2,
} from 'lucide-react';

interface CoursesViewProps {
  currentLanguage: Language;
  courses: Course[];
  categories: Category[];
  onSelectCourse: (course: Course) => void;
  selectedCategoryFilter?: string | null;
  onClearCategoryFilter?: () => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  currentLanguage,
  courses,
  categories,
  onSelectCourse,
  selectedCategoryFilter,
  onClearCategoryFilter,
}) => {
  const t = translations[currentLanguage];
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategoryFilter || 'all');
  const [sortBy, setSortBy] = useState<'default' | 'price_low' | 'price_high'>('default');

  // Update category when prop changes
  React.useEffect(() => {
    if (selectedCategoryFilter) {
      setActiveCategory(selectedCategoryFilter);
    }
  }, [selectedCategoryFilter]);

  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        const matchesCategory =
          activeCategory === 'all' ||
          course.category.toLowerCase() === activeCategory.toLowerCase();

        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !query ||
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query);

        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        return 0;
      });
  }, [courses, activeCategory, searchQuery, sortBy]);

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{currentLanguage === 'so' ? 'Dhammaan Koorsooyinka XirfadoNet' : 'Official Course Catalog'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.navCourses}
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            {currentLanguage === 'so'
              ? 'Ka baro xirfado dhab ah oo suuq leh dhalinyarada Soomaaliyeed ee dunida ku nool.'
              : 'Empower yourself with actionable, high-demand skills designed for real online earnings.'}
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Search Field */}
            <div className="sm:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="course-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="sm:col-span-4 relative">
              <div className="flex items-center space-x-2">
                <ArrowUpDown className="w-4 h-4 text-slate-400" />
                <select
                  id="course-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 bg-slate-50 text-slate-700"
                >
                  <option value="default">{currentLanguage === 'so' ? 'Kala sooc (Koorsooyinka)' : 'Sort: Default'}</option>
                  <option value="price_low">{currentLanguage === 'so' ? 'Qiimaha: Ugu Hooseeya' : 'Price: Low to High'}</option>
                  <option value="price_high">{currentLanguage === 'so' ? 'Qiimaha: Ugu Sarreeya' : 'Price: High to Low'}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                if (onClearCategoryFilter) onClearCategoryFilter();
              }}
              className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.allCategories} ({courses.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.name)}
                className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat.name
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
          <span>
            {currentLanguage === 'so'
              ? `Waxaa la helay ${filteredCourses.length} koorso`
              : `Showing ${filteredCourses.length} courses`}
          </span>
          {activeCategory !== 'all' && (
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                if (onClearCategoryFilter) onClearCategoryFilter();
              }}
              className="text-blue-600 hover:text-blue-800 underline font-medium cursor-pointer"
            >
              {currentLanguage === 'so' ? 'Tir dhammaan filter-ka' : 'Clear filters'}
            </button>
          )}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.course_id}
                className="flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow group"
              >
                {/* Course Thumbnail & Tag */}
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

                {/* Card Content */}
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

                    {/* Short highlights */}
                    {course.learning_outcomes && course.learning_outcomes.length > 0 && (
                      <div className="mt-3 space-y-1">
                        {course.learning_outcomes.slice(0, 2).map((outcome, idx) => (
                          <div key={idx} className="flex items-start text-[11px] text-slate-600">
                            <CheckCircle2 className="w-3 h-3 mr-1.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline space-x-2">
                        {course.price > 0 ? (
                          <span className="text-xl font-extrabold text-blue-700">
                            ${course.price}
                          </span>
                        ) : (
                          <span className="text-base font-extrabold text-emerald-600">
                            {currentLanguage === 'so' ? 'Hadda diyaar ah' : 'Available'}
                          </span>
                        )}
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
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-lg">
              {currentLanguage === 'so' ? 'Lama helin koorsooyin' : 'No courses found'}
            </h3>
            <p className="text-xs text-slate-500">
              {currentLanguage === 'so'
                ? 'Fadlan hubi ereyada aad baartay ama dooro qayb kale.'
                : 'Try adjusting your search terms or filter to find what you are looking for.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                if (onClearCategoryFilter) onClearCategoryFilter();
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              {currentLanguage === 'so' ? 'Dib u celi baaritaanka' : 'Reset Search'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
