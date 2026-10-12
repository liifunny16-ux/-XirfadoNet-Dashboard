import React, { useState } from 'react';
import { OnlineWorkTopic, Language, Course } from '../types.js';
import { initialOnlineWorkTopics } from '../data/onlineWorkData.js';
import {
  Briefcase,
  Search,
  CheckCircle,
  DollarSign,
  Layers,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Wrench,
} from 'lucide-react';

interface OnlineWorkViewProps {
  currentLanguage: Language;
  courses?: Course[];
  onSelectCourse?: (courseId: string) => void;
  onOpenRegister?: (course: Course) => void;
}

export const OnlineWorkView: React.FC<OnlineWorkViewProps> = ({
  currentLanguage,
  courses = [],
  onSelectCourse,
  onOpenRegister,
}) => {
  const isSo = currentLanguage === 'so';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<OnlineWorkTopic | null>(null);

  const filteredTopics = initialOnlineWorkTopics.filter((topic) => {
    const title = topic.title || (isSo ? topic.title_so : topic.title_en) || topic.title_so || '';
    const desc = topic.description || (isSo ? topic.what_it_is_so : topic.tagline_so) || '';
    const skills = topic.required_skills || topic.skills_needed_so || topic.tools_needed || [];

    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skills.some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-4 border border-emerald-200">
            <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isSo ? '10 Waddo oo Shaqo Online ah & Dakhli' : '10 Verified Online Work Paths'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isSo ? 'Waddooyinka Dhabta ah ee Shaqada & Dakhliga Online-ka' : 'Real Online Earning & Freelance Pathways'}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            {isSo
              ? 'Waddooyin cad oo aan ballanqaad been ah lahayn: Tafatirka Clips-ka, Upwork freelancing, TikTok organic, YouTube automation, iyo maaraynta kanaallada.'
              : 'Actionable pathways with realistic income brackets, beginner roadmaps, and required software stacks.'}
          </p>
        </div>

        {/* Search */}
        <div className="mb-10 max-w-xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="input-search-online-work"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isSo ? 'Raadi shaqo, xirfad (tusaale: Upwork, CapCut, Thumbnail, Clips)...' : 'Search work path, skill or tool...'}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => {
            const matchedCourse = courses.find((c) => c.course_id === (topic.related_course_id || topic.course_id_help));
            const displayTitle = topic.title || (isSo ? topic.title_so : topic.title_en) || topic.title_so || '';
            const displayDesc = topic.description || (isSo ? topic.what_it_is_so : topic.tagline_so) || '';
            const skillsList = topic.required_skills || topic.skills_needed_so || topic.tools_needed || [];
            const stepsList = topic.roadmap_steps || topic.beginner_steps_so || [];

            return (
              <div
                key={topic.id}
                id={`online-work-card-${topic.id}`}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-all hover:border-emerald-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-emerald-600" />
                      {topic.earning_potential || '$300 - $2,500/mo'}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {topic.difficulty || 'Beginner'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {displayTitle}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-3">
                    {displayDesc}
                  </p>

                  {/* Required Skills */}
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-slate-500 block mb-1.5 flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-slate-400" />
                      {isSo ? 'Xirfadaha & Qalabka:' : 'Skills & Tools:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {skillsList.map((skill: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* First Step Preview */}
                  {stepsList.length > 0 && (
                    <div className="p-3 bg-slate-50 rounded-xl mb-4 border border-slate-100">
                      <span className="text-xs font-bold text-slate-700 block mb-1">
                        🚀 {isSo ? 'Tallaabada 1-aad:' : 'Step 1:'}
                      </span>
                      <p className="text-xs text-slate-600 line-clamp-2 font-medium">
                        {stepsList[0]}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-2">
                  <button
                    id={`btn-open-work-detail-${topic.id}`}
                    onClick={() => setSelectedTopic(topic)}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 py-1"
                  >
                    {isSo ? 'Arag Roadmap-ka' : 'View Roadmap'}
                  </button>

                  {matchedCourse && onSelectCourse && (
                    <button
                      id={`btn-work-course-${topic.id}`}
                      onClick={() => onSelectCourse(matchedCourse.course_id)}
                      className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg shadow-sm transition-colors flex items-center gap-1"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>{isSo ? 'Baro Xirfaddan' : 'Learn Skill'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Roadmap */}
        {selectedTopic && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200">
              <button
                id="btn-close-work-modal"
                onClick={() => setSelectedTopic(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
                  {selectedTopic.earning_potential || '$300 - $2,500/mo'}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {selectedTopic.difficulty || 'Beginner'}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                {selectedTopic.title || (isSo ? selectedTopic.title_so : selectedTopic.title_en) || selectedTopic.title_so}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {selectedTopic.description || (isSo ? selectedTopic.what_it_is_so : selectedTopic.tagline_so)}
              </p>

              {/* Skills and Tools */}
              <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {isSo ? 'Xirfadaha & Qalabka Muhiimka ah:' : 'Skills & Tools Required:'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedTopic.required_skills || selectedTopic.skills_needed_so || selectedTopic.tools_needed || []).map((skill: string, idx: number) => (
                    <span key={idx} className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-800">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Roadmap Steps */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  {isSo ? 'Roadmap-ka Tallaabo-Tallaabo ah:' : 'Step-by-Step Execution Roadmap:'}
                </h4>
                <div className="space-y-3">
                  {(selectedTopic.roadmap_steps || selectedTopic.beginner_steps_so || []).map((step: string, idx: number) => (
                    <div key={idx} className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Course Link */}
              {(selectedTopic.related_course_id || selectedTopic.course_id_help) && (
                <div className="p-5 bg-gradient-to-r from-emerald-950 to-slate-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-emerald-300 font-bold block mb-1 uppercase">
                      {isSo ? 'Koorsada Barashada Tooska ah:' : 'Recommended Training Course:'}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-white">
                      {courses.find((c) => c.course_id === (selectedTopic.related_course_id || selectedTopic.course_id_help))?.title || 'XirfadoNet Masterclass'}
                    </h4>
                  </div>
                  <button
                    id="btn-work-modal-course"
                    onClick={() => {
                      const cid = selectedTopic.related_course_id || selectedTopic.course_id_help;
                      if (cid && onSelectCourse) {
                        onSelectCourse(cid);
                        setSelectedTopic(null);
                      }
                    }}
                    className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-sm whitespace-nowrap flex items-center gap-1.5 transition-colors"
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
