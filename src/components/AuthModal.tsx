import React, { useState } from 'react';
import { Language } from '../types.js';
import { translations } from '../translations.js';
import { X, User, Mail, Phone, Lock, GraduationCap } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'signin' | 'signup';
  onClose: () => void;
  onSuccess: (user: { name: string; email: string; phone: string }) => void;
  language: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onSuccess,
  language,
}) => {
  const t = translations[language];
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const studentName = name.trim() || (email ? email.split('@')[0] : 'Arday Cusub');
    const studentPhone = phone.trim();
    const studentEmail = email.trim();

    try {
      await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: studentName,
          phone: studentPhone,
          email: studentEmail,
          preferred_language: language,
        }),
      });
    } catch (err) {
      console.error('Error saving customer info:', err);
    }

    onSuccess({
      name: studentName,
      email: studentEmail,
      phone: studentPhone,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6 space-y-2">
          <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center mx-auto shadow-md">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            {mode === 'signin' ? t.signIn : t.signUp}
          </h3>
          <p className="text-xs text-slate-500">
            {mode === 'signin'
              ? (language === 'so' ? 'Ku soo gal akoonkaaga XirfadoNet' : 'Log in to your XirfadoNet student account')
              : (language === 'so' ? 'Sameyso akoon cusub si aad u bilowdo koorsooyinka' : 'Create a new account to enroll in courses')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.nameLabel} *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'so' ? 'Magacaaga oo buuxa' : 'Full Name'}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 bg-slate-50"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.phoneLabel} *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+252 61..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.emailLabel}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {language === 'so' ? 'Lambarka Sirta ah (Password)' : 'Password'} *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 bg-slate-50"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors cursor-pointer"
          >
            {mode === 'signin' ? t.signIn : t.signUp}
          </button>
        </form>

        {/* Switch Mode */}
        <div className="mt-4 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          {mode === 'signin' ? (
            <p>
              {language === 'so' ? 'Weli ma lihid akoon?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-blue-600 font-bold hover:underline"
              >
                {t.signUp}
              </button>
            </p>
          ) : (
            <p>
              {language === 'so' ? 'Horay ma u leedahay akoon?' : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-blue-600 font-bold hover:underline"
              >
                {t.signIn}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
