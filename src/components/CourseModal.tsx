import React, { useState } from 'react';
import { Course, Language } from '../types.js';
import { translations } from '../translations.js';
import {
  X,
  CheckCircle2,
  BookOpen,
  Clock,
  Sparkles,
  CreditCard,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onOpenPaymentGuide?: () => void;
  onOpenRegister?: (course: Course) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  isOpen,
  onClose,
  language,
  onOpenPaymentGuide,
  onOpenRegister,
}) => {
  if (!isOpen || !course) return null;
  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                {course.category}
              </span>
              {course.discount_percent && (
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-extrabold bg-red-600 text-white">
                  {course.discount_percent}% OFF
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-900 leading-snug">
              {course.title}
            </h3>
            <div className="mt-2 flex items-center space-x-3 text-sm">
              <span className="font-extrabold text-blue-700 text-xl">
                ${course.price} {course.currency}
              </span>
              {course.previous_price && (
                <span className="text-slate-400 line-through text-sm">
                  ${course.previous_price}
                </span>
              )}
              {course.duration && (
                <>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600 flex items-center space-x-1 text-xs">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.duration}</span>
                  </span>
                </>
              )}
            </div>
          </div>
          <button
            type="button"
            id="modal-close-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Course Cover Image if available */}
          {course.image && (
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100">
              <img
                src={course.image}
                alt={course.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/800x450/1e3a8a/ffffff?text=' + encodeURIComponent(course.title); }}
              />
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-1">
              {language === 'so' ? 'Ku saabsan Koorsada' : 'About the Course'}
            </h4>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              {course.description}
            </p>
          </div>

          {/* Target Audience */}
          {course.target_audience && (
            <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 text-blue-900">
              <span className="font-semibold block mb-1 text-xs">
                {language === 'so' ? 'Qofka loogu talagalay:' : 'Target Audience:'}
              </span>
              <p className="text-xs text-blue-800">{course.target_audience}</p>
            </div>
          )}

          {/* Learning Outcomes */}
          {course.learning_outcomes && course.learning_outcomes.length > 0 && (
            <div>
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center space-x-1.5 text-xs sm:text-sm">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>{t.outcomes}</span>
              </h4>
              <ul className="space-y-2">
                {course.learning_outcomes.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Course Lessons if any */}
          {course.lessons && course.lessons.length > 0 && (
            <div>
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center space-x-1.5 text-xs sm:text-sm">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>{t.lessons}</span>
              </h4>
              <div className="space-y-1.5">
                {course.lessons.map((lesson, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800"
                  >
                    <span className="font-semibold text-blue-700 mr-2">{idx + 1}.</span>
                    <span>{typeof lesson === 'string' ? lesson : (lesson as any).title || String(lesson)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Manual Payment Notice */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 space-y-1.5 text-xs">
            <div className="flex items-center space-x-2 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{t.manualPaymentTitle}</span>
            </div>
            <p className="text-emerald-800 text-[11px] leading-relaxed">
              {t.manualPaymentNotice}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">
              {language === 'so' ? 'Qiimaha:' : 'Price:'}
            </span>
            <span className="text-lg font-black text-blue-700">
              ${course.price} USD
            </span>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {onOpenRegister && (
              <button
                type="button"
                id="btn-modal-register-now"
                onClick={() => {
                  onClose();
                  onOpenRegister(course);
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 cursor-pointer shadow-xs"
              >
                <span>{language === 'so' ? 'Is-diiwaangeli Hadda' : 'Register Now'}</span>
              </button>
            )}

            {onOpenPaymentGuide && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenPaymentGuide();
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>{t.howToPay}</span>
              </button>
            )}

            {course.course_url && (
              <a
                href={course.course_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
              >
                <span>{language === 'so' ? 'Website-ka' : 'Website'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
