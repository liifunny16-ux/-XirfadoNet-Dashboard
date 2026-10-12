import React from 'react';
import { Language, NavView } from '../types.js';
import { translations } from '../translations.js';
import {
  GraduationCap,
  ShieldCheck,
  Target,
  Sparkles,
  Users,
  Compass,
  ArrowRight,
} from 'lucide-react';

interface AboutViewProps {
  currentLanguage: Language;
  onViewChange: (view: NavView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  currentLanguage,
  onViewChange,
}) => {
  const t = translations[currentLanguage];

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Intro */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
            <GraduationCap className="w-4 h-4" />
            <span>XirfadoNet Education</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t.aboutTitle}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.aboutSubtitle}
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">{t.missionTitle}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.missionText}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              {currentLanguage === 'so' ? '100% Casharro Dhab ah & Farsamo' : '100% Practical Skills'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {currentLanguage === 'so'
                ? 'Koorsooyinkayagu kuma tiirsana aragtiyo aan shaqaynayn. Cashar kasta waa tallaabo toos ah oo qofka ka caawinaya inuu wax soo saaro, dakhli ka helo YouTube, video editing, Shopify, ama automation.'
                : 'Our curriculum focuses purely on practical implementation without filler theory. Every lesson guides learners directly towards actionable outcomes.'}
            </p>
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900">
              {currentLanguage === 'so' ? 'Maxaa XirfadoNet Ka Duwaya Kuwa Kale?' : 'Why Choose XirfadoNet?'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto font-bold text-base">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                {currentLanguage === 'so' ? 'Af-Soomaali & Fududeyn' : 'Native Somali Instruction'}
              </h4>
              <p className="text-xs text-slate-500">
                {currentLanguage === 'so'
                  ? 'Fahanka ugu sarreeya ee luqaddaada hooyo oo leh ereyo farsamo oo la fahmi karo.'
                  : 'Delivered in clear, fluent Somali accessible to learners everywhere.'}
              </p>
            </div>

            <div className="p-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto font-bold text-base">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                {currentLanguage === 'so' ? 'Taageero Joogto ah' : 'Dedicated Support'}
              </h4>
              <p className="text-xs text-slate-500">
                {currentLanguage === 'so'
                  ? 'AI Support 24/7 ah iyo maamulka oo si toos ah kugu garab taagan xallinta dhibaatooyinkaaga.'
                  : '24/7 intelligent assistance paired with direct human instructor mentorship.'}
              </p>
            </div>

            <div className="p-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto font-bold text-base">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                {currentLanguage === 'so' ? 'Qiimo Macquul ah' : 'Affordable Pricing'}
              </h4>
              <p className="text-xs text-slate-500">
                {currentLanguage === 'so'
                  ? 'Dhimis joogto ah iyo qiimo jaban oo qof kasta u sahlaya inuu helo cilmi tayo sare leh.'
                  : 'Accessible pricing with high discounts designed for student growth.'}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => onViewChange('courses')}
              className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors cursor-pointer"
            >
              <span>{t.browseCourses}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
