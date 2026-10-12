import React, { useState } from 'react';
import { ViewsGuideTopic, Language, Course } from '../types.js';
import { initialViewsGuides } from '../data/viewsHubData.js';
import {
  TrendingUp,
  Search,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Eye,
  Zap,
} from 'lucide-react';

interface ViewsHubViewProps {
  currentLanguage: Language;
  courses?: Course[];
  onSelectCourse?: (courseId: string) => void;
  onOpenRegister?: (course: Course) => void;
}

export const ViewsHubView: React.FC<ViewsHubViewProps> = ({
  currentLanguage,
  courses = [],
  onSelectCourse,
  onOpenRegister,
}) => {
  const isSo = currentLanguage === 'so';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<ViewsGuideTopic | null>(null);

  const filteredGuides = initialViewsGuides.filter((guide) => {
    const title = guide.title || (isSo ? guide.title_so : guide.title_en) || guide.title_so || '';
    const concept = guide.core_concept || (isSo ? guide.summary_so : guide.summary_en) || guide.summary_so || '';
    const cat = guide.category || '';
    const steps = guide.action_steps || (isSo ? guide.actionable_steps_so : guide.actionable_steps_en) || [];

    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      steps.some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-4 border border-rose-200">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{isSo ? 'Xarunta Views-ka & Algorithm-ka YouTube 2026' : 'Views Hub & Algorithm Science'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isSo ? 'Sida Loo Kordhiyo Views-ka & Loo Jabiyo 1k Views Jail' : 'Master YouTube Metrics, CTR & Retention'}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            {isSo
              ? '18 hage cilmiyeed oo qeexaya sababaha muuqaalladu u gaari waayaan dadweynaha, sida loo kordhiyo CTR-ka, Retention-ka, iyo sida algorithm-ku dhab ahaantii u shaqeeyo.'
              : '18 comprehensive blueprints analyzing why videos flatline, how to sustain high Retention, and step-by-step algorithms.'}
          </p>
        </div>

        {/* Search */}
        <div className="mb-10 max-w-xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="input-search-views-guides"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isSo ? 'Raadi hage (tusaale: 1000 views, retention, hook, thumbnail)...' : 'Search views guide (e.g., CTR, retention, hook)...'}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => {
            const courseId = guide.related_course_id || guide.recommended_course_id;
            const matchedCourse = courses.find((c) => c.course_id === courseId);
            const displayTitle = guide.title || (isSo ? guide.title_so : guide.title_en) || guide.title_so || '';
            const displayConcept = guide.core_concept || (isSo ? guide.summary_so : guide.summary_en) || guide.summary_so || '';
            const steps = guide.action_steps || (isSo ? guide.actionable_steps_so : guide.actionable_steps_en) || [];

            return (
              <div
                key={guide.id}
                id={`guide-card-${guide.id}`}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-all hover:border-rose-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100">
                      {guide.category || 'Algorithm'}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                      <Zap className="w-3 h-3 text-rose-500" />
                      {steps.length} {isSo ? 'tallaabo' : 'steps'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {displayTitle}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-3">
                    {displayConcept}
                  </p>

                  {/* Action Steps preview */}
                  <div className="p-3.5 bg-slate-50 rounded-xl mb-4 border border-slate-100 space-y-1.5">
                    <span className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      {isSo ? 'Tallaabooyinka lagu hagaajiyo:' : 'Actionable Fixes:'}
                    </span>
                    {steps.slice(0, 2).map((step: string, idx: number) => (
                      <p key={idx} className="text-xs text-slate-600 line-clamp-1">
                        • {step}
                      </p>
                    ))}
                    {steps.length > 2 && (
                      <span className="text-[11px] text-rose-600 font-semibold block pt-1">
                        +{steps.length - 2} {isSo ? 'tallaabooyin kale' : 'more action steps'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-2">
                  <button
                    id={`btn-open-guide-${guide.id}`}
                    onClick={() => setSelectedGuide(guide)}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 py-1"
                  >
                    {isSo ? 'Akhriso Hagaha oo dhan' : 'Read Full Guide'}
                  </button>

                  {matchedCourse && onSelectCourse && (
                    <button
                      id={`btn-guide-course-${guide.id}`}
                      onClick={() => onSelectCourse(matchedCourse.course_id)}
                      className="text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg shadow-sm transition-colors flex items-center gap-1"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>{isSo ? 'Koorsada' : 'Course'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Full Guide Details */}
        {selectedGuide && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200">
              <button
                id="btn-close-guide-modal"
                onClick={() => setSelectedGuide(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                ✕
              </button>

              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100 mb-2 inline-block">
                {selectedGuide.category || 'Algorithm'}
              </span>

              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                {selectedGuide.title || (isSo ? selectedGuide.title_so : selectedGuide.title_en) || selectedGuide.title_so}
              </h2>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                {selectedGuide.core_concept || (isSo ? selectedGuide.summary_so : selectedGuide.summary_en) || selectedGuide.summary_so}
              </p>

              {/* Action Steps */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  {isSo ? 'Tallaabooyinka Tooska ah ee la Qaadayo:' : 'Proven Step-by-Step Action Plan:'}
                </h4>
                <div className="space-y-2.5">
                  {(selectedGuide.action_steps || (isSo ? selectedGuide.actionable_steps_so : selectedGuide.actionable_steps_en) || []).map((step: string, idx: number) => (
                    <div key={idx} className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mistakes to Avoid */}
              {(selectedGuide.mistakes_to_avoid || selectedGuide.common_mistakes_so) && (selectedGuide.mistakes_to_avoid || selectedGuide.common_mistakes_so)!.length > 0 && (
                <div className="mb-6 p-4 bg-rose-50/60 rounded-xl border border-rose-200">
                  <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    {isSo ? 'Qaladaadka Laga Digtoonaado:' : 'Critical Mistakes to Avoid:'}
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-rose-950">
                    {(selectedGuide.mistakes_to_avoid || selectedGuide.common_mistakes_so)!.map((m: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-600 font-bold">✕</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommended Course Link */}
              {(selectedGuide.related_course_id || selectedGuide.recommended_course_id) && (
                <div className="p-5 bg-gradient-to-r from-rose-950 to-slate-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-rose-300 font-bold block mb-1 uppercase">
                      {isSo ? 'Koorsada Lagu Baranayo Xirfaddan:' : 'Master This in Our Practical Course:'}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-white">
                      {courses.find((c) => c.course_id === (selectedGuide.related_course_id || selectedGuide.recommended_course_id))?.title || 'XirfadoNet Masterclass'}
                    </h4>
                  </div>
                  <button
                    id="btn-guide-modal-course"
                    onClick={() => {
                      const cid = selectedGuide.related_course_id || selectedGuide.recommended_course_id;
                      if (cid && onSelectCourse) {
                        onSelectCourse(cid);
                        setSelectedGuide(null);
                      }
                    }}
                    className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm whitespace-nowrap flex items-center gap-1.5 transition-colors"
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
