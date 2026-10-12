import React, { useState } from 'react';
import { AiNicheIdea, Language, Course } from '../types.js';
import { initialAiNiches } from '../data/nichesData.js';
import {
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  DollarSign,
  Gauge,
  Layers,
  Users,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  X,
  BookOpen,
} from 'lucide-react';

interface NichesViewProps {
  currentLanguage: Language;
  courses?: Course[];
  onSelectCourse?: (courseId: string) => void;
  onOpenRegister?: (course: Course) => void;
}

export const NichesView: React.FC<NichesViewProps> = ({
  currentLanguage,
  courses = [],
  onSelectCourse,
  onOpenRegister,
}) => {
  const isSo = currentLanguage === 'so';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedNiche, setSelectedNiche] = useState<AiNicheIdea | null>(null);

  const filteredNiches = initialAiNiches.filter((niche) => {
    const title = niche.title || (isSo ? niche.name_so : niche.name) || niche.name || '';
    const desc = niche.description || (isSo ? niche.description_so : niche.description_en) || '';
    const cat = niche.category || '';
    const tools = niche.tools_needed || niche.ai_tools || [];
    const diff = niche.difficulty || niche.difficulty_level || 'Beginner';

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tools.some((t: string) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDifficulty =
      selectedDifficulty === 'All' ||
      diff.toLowerCase() === selectedDifficulty.toLowerCase();

    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-4 border border-purple-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isSo ? '20 Fikradood oo AI Niche ah 2026' : '20 High-Growth AI Niche Ideas'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isSo ? 'Niches Lacag Sameeya oo aan Wajiga La Muujin' : 'Profitable Faceless & AI Niches'}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            {isSo
              ? 'Ka dooro niche-yada ugu koritaanka badan YouTube Shorts, TikTok, iyo Automation-ka. Waxaa lagu lifaaqay qalabka aad u baahan tahay iyo koorsada kuu fududaynaysa.'
              : 'Explore the highest-performing niches for YouTube Shorts, TikTok, and AI Automation with actionable roadmaps and tool recommendations.'}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 max-w-2xl mx-auto space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="input-search-niches"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isSo ? 'Raadi niche, qalab (tusaale: CapCut, ChatGPT), ama category...' : 'Search niche, tool, or category...'}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm shadow-sm"
            />
          </div>

          <div className="flex items-center justify-center gap-2">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
              <button
                key={lvl}
                id={`btn-filter-difficulty-${lvl.toLowerCase()}`}
                onClick={() => setSelectedDifficulty(lvl)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedDifficulty === lvl
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {lvl === 'All' ? (isSo ? 'Dhammaan Heerarka' : 'All Levels') : lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Niches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNiches.map((niche) => {
            const matchedCourse = courses.find((c) => c.course_id === niche.recommended_course_id);

            return (
              <div
                key={niche.id}
                id={`niche-card-${niche.id}`}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-all hover:border-purple-200"
              >
                <div>
                  {/* Category & CPM */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                      {niche.category || 'Niche'}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {niche.cpm_potential || niche.cpm_tier || '$8 - $15 CPM'}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {niche.title || (isSo ? niche.name_so : niche.name) || niche.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-3">
                    {niche.description || (isSo ? niche.description_so : niche.description_en)}
                  </p>

                  {/* Why it works pill */}
                  <div className="p-3 bg-slate-50 rounded-xl mb-4 border border-slate-100">
                    <span className="text-xs font-bold text-slate-700 block mb-1">
                      💡 {isSo ? 'Sababta ay u shaqeyso:' : 'Why it works:'}
                    </span>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {niche.why_it_works || (isSo ? 'Fursad weyn oo daawasho caalami ah iyo CPM sare leh.' : 'High international retention and CPM potential.')}
                    </p>
                  </div>

                  {/* Tools Needed */}
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-slate-500 block mb-1.5">
                      {isSo ? 'Qalabka loo baahan yahay:' : 'Tools Needed:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(niche.tools_needed || niche.ai_tools || []).map((tool: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action / Recommended Course */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-4">
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-purple-600" />
                    <span>{niche.difficulty || niche.difficulty_level || 'Beginner'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      id={`btn-niche-details-${niche.id}`}
                      onClick={() => setSelectedNiche(niche)}
                      className="text-xs font-semibold text-purple-600 hover:text-purple-700 px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      {isSo ? 'Eeg Faahfaahinta' : 'Details'}
                    </button>
                    {matchedCourse && onSelectCourse && (
                      <button
                        id={`btn-niche-course-${niche.id}`}
                        onClick={() => onSelectCourse(matchedCourse.course_id)}
                        className="text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg shadow-sm transition-colors flex items-center gap-1"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>{isSo ? 'Baro Koorsada' : 'Learn Course'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Niche Details */}
        {selectedNiche && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200">
              <button
                id="btn-close-niche-modal"
                onClick={() => setSelectedNiche(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                  {selectedNiche.category || 'Niche'}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                  CPM: {selectedNiche.cpm_potential || selectedNiche.cpm_tier || '$8 - $15 CPM'}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {selectedNiche.difficulty || selectedNiche.difficulty_level || 'Beginner'}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                {selectedNiche.title || (isSo ? selectedNiche.name_so : selectedNiche.name) || selectedNiche.name}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {selectedNiche.description || (isSo ? selectedNiche.description_so : selectedNiche.description_en)}
              </p>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100">
                  <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wider mb-1">
                    {isSo ? 'Maxay Fikradani u Guulaysataa?' : 'Why This Niche Succeeds:'}
                  </h4>
                  <p className="text-sm text-purple-950 leading-relaxed">
                    {selectedNiche.why_it_works || (isSo ? 'Fursad aad u weyn oo daawasho caalami ah iyo dakhli sare leh.' : 'High organic algorithmic momentum and global monetization.')}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {isSo ? 'Dadka loogu Talagalay (Audience):' : 'Target Audience:'}
                  </h4>
                  <p className="text-sm text-slate-700">
                    {selectedNiche.target_audience || (isSo ? 'Dhalinyarada, creators-ka, iyo daawadayaasha caalamiga ah' : 'Global audience & YouTube / TikTok viewers')}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {isSo ? 'Qalabka Looga Baahan Yahay Fikradan:' : 'Required Tools & Stack:'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedNiche.tools_needed || selectedNiche.ai_tools || []).map((tool: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold"
                      >
                        ✓ {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Course Recommendation */}
              {selectedNiche.recommended_course_id && (
                <div className="p-5 bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-purple-300 font-bold block mb-1 uppercase">
                      {isSo ? 'Koorsada Lagu Baranayo:' : 'Direct Skill Training:'}
                    </span>
                    <h4 className="font-bold text-base text-white">
                      {courses.find((c) => c.course_id === selectedNiche.recommended_course_id)?.title || 'XirfadoNet Masterclass'}
                    </h4>
                  </div>
                  <button
                    id="btn-modal-open-course"
                    onClick={() => {
                      if (selectedNiche.recommended_course_id && onSelectCourse) {
                        onSelectCourse(selectedNiche.recommended_course_id);
                        setSelectedNiche(null);
                      }
                    }}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-sm whitespace-nowrap flex items-center gap-1.5 transition-colors"
                  >
                    <span>{isSo ? 'Eeg Koorsada' : 'View Course'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
