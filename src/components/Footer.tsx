import React from 'react';
import { Language, NavView } from '../types.js';
import { translations } from '../translations.js';
import { GraduationCap, Sparkles, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  currentLanguage: Language;
  onViewChange: (view: NavView) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLanguage, onViewChange }) => {
  const t = translations[currentLanguage];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Xirfado<span className="text-blue-400">Net</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {currentLanguage === 'so'
                ? 'Madasha koowaad ee Soomaaliyeed ee barashada xirfadaha dhabta ah ee internet-ka, YouTube, video editing, iyo automation.'
                : 'The premier Somali online academy for hands-on, high-income digital skills and online income generation.'}
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{currentLanguage === 'so' ? '100% Koorsooyin La Hubiyay' : '100% Verified Courses'}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {currentLanguage === 'so' ? 'Bogagga Muhiimka ah' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onViewChange('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onViewChange('courses')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.navCourses}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onViewChange('categories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.navCategories}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onViewChange('support')}
                  className="hover:text-white transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{t.navSupport}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {currentLanguage === 'so' ? 'Taageerada & Xogta' : 'Resources & Help'}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onViewChange('blog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.navBlog}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onViewChange('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onViewChange('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.navContact}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onViewChange('admin')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.navAdmin}
                </button>
              </li>
            </ul>
          </div>

          {/* Official Website & Payment Note */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {currentLanguage === 'so' ? 'Website-ka Rasmiga ah' : 'Official Portal'}
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {currentLanguage === 'so'
                ? 'Booqo website-kayaga rasmiga ah ee xirfadonet.com si aad u hesho macluumaad dheeraad ah.'
                : 'Visit our official portal at xirfadonet.com to explore our complete ecosystem.'}
            </p>
            <a
              href="https://xirfadonet.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors space-x-1.5"
            >
              <span>xirfadonet.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} XirfadoNet. All rights reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Designed for Somali Digital Creators</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
