import React, { useState } from 'react';
import { ContentIdea, Language, Course } from '../types.js';
import { initialContentIdeas } from '../data/contentIdeasData.js';
import {
  Lightbulb,
  Search,
  Copy,
  Check,
  Video,
  Flame,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface ContentIdeasViewProps {
  currentLanguage: Language;
  courses?: Course[];
  onSelectCourse?: (courseId: string) => void;
  onOpenRegister?: (course: Course) => void;
}

export const ContentIdeasView: React.FC<ContentIdeasViewProps> = ({
  currentLanguage,
  courses = [],
  onSelectCourse,
  onOpenRegister,
}) => {
  const isSo = currentLanguage === 'so';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'All',
    'Shorts',
    'Automation',
    'Football',
    'Ecommerce',
    'AI Tools',
    'Growth',
  ];

  const filteredIdeas = initialContentIdeas.filter((idea) => {
    const titleText = idea.title || idea.topic || '';
    const descText = idea.description || idea.short_explanation || '';
    const catText = idea.category || '';
    const hookText = idea.hook || '';

    const matchesSearch =
      titleText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hookText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      descText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      catText.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat =
      selectedCategory === 'All' ||
      catText.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCat;
  });

  const handleCopyHook = (id: string, hookText: string) => {
    navigator.clipboard.writeText(hookText);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-4 border border-amber-200">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>{isSo ? '53 Fikradood oo Muuqaal ah & Hooks Diyaar ah' : '53 Viral Video Hooks & Blueprints'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isSo ? 'Fikrado Muuqaal oo Views & Daawasho Keena' : 'High-Retention Video Ideas & Angles'}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            {isSo
              ? 'Ka hel hooks diyaar ah oo tijaabiyay YouTube Shorts, TikTok, iyo Reels. Koobiyay hook-ga oo bilow duubista ama tafatirka isla maanta.'
              : 'Actionable video ideas with tested hooks, optimal formats, and step-by-step structural workflows for creators.'}
          </p>
        </div>

        {/* Search & Categories */}
        <div className="mb-10 max-w-2xl mx-auto space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="input-search-content-ideas"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isSo ? 'Raadi fikrad, hook, ama mawduuc...' : 'Search ideas, hooks, or topics...'}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm shadow-sm"
            />
          </div>

          <div className="flex items-center justify-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`btn-filter-idea-cat-${cat.toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => {
            const isCopied = copiedId === idea.id;
            const matchedCourse = courses.find((c) => c.course_id === idea.related_course_id);

            return (
              <div
                key={idea.id}
                id={`content-idea-card-${idea.id}`}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-all hover:border-amber-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      {idea.category || 'General'}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 flex items-center gap-1">
                      <Video className="w-3 h-3 text-slate-400" />
                      {idea.target_format || idea.suggested_format || 'Video'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {idea.title || idea.topic}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-3">
                    {idea.description || idea.short_explanation}
                  </p>

                  {/* Hook Box with One-Click Copy */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 relative group">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
                        🎯 Hook-ga Muuqaalka:
                      </span>
                      <button
                        id={`btn-copy-hook-${idea.id}`}
                        onClick={() => handleCopyHook(idea.id, idea.hook)}
                        className="text-[11px] font-semibold text-slate-600 hover:text-amber-700 flex items-center gap-1 transition-colors px-2 py-0.5 rounded bg-white border border-slate-200"
                        title={isSo ? 'Koobiyay Hook-ga' : 'Copy hook'}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">{isSo ? 'Waa la koobiyay!' : 'Copied!'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>{isSo ? 'Koobiyeey' : 'Copy'}</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs font-medium text-slate-800 italic leading-relaxed">
                      "{idea.hook}"
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    XirfadoNet Content Vault
                  </span>
                  {matchedCourse && onSelectCourse && (
                    <button
                      id={`btn-idea-course-${idea.id}`}
                      onClick={() => onSelectCourse(matchedCourse.course_id)}
                      className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>{isSo ? 'Koorsada Barashada' : 'Learn Skills'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredIdeas.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 max-w-md mx-auto">
            <Lightbulb className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">
              {isSo ? 'Ma jirto fikrad ku habboon raadintaada.' : 'No ideas matched your query.'}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg hover:bg-amber-100 transition-colors"
            >
              {isSo ? 'Dib u deji Raadinta' : 'Reset Filters'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
