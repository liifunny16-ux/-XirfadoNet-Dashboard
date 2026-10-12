import React, { useState } from 'react';
import { Language, NavView, PaymentSettings } from '../types.js';
import { translations } from '../translations.js';
import { getAdminWhatsAppUrl } from '../utils/whatsapp.js';
import {
  PhoneCall,
  Mail,
  Globe,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Clock,
  MessageCircle,
} from 'lucide-react';

interface ContactViewProps {
  currentLanguage: Language;
  onViewChange: (view: NavView) => void;
  paymentSettings?: PaymentSettings | null;
}

export const ContactView: React.FC<ContactViewProps> = ({
  currentLanguage,
  onViewChange,
  paymentSettings,
}) => {
  const t = translations[currentLanguage];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>XirfadoNet Helpdesk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.contactTitle}
          </h1>
          <p className="text-sm text-slate-600">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {currentLanguage === 'so' ? 'Fariintaada waa la diray!' : 'Message Received!'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  {currentLanguage === 'so'
                    ? 'Mahadsanid. Maamulka XirfadoNet ayaa dhawaan kula soo xiriiri doona email ama WhatsApp.'
                    : 'Thank you. XirfadoNet support team will reach back to you shortly via phone or email.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                    setSubmitted(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100"
                >
                  {currentLanguage === 'so' ? 'Dir fariin kale' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {currentLanguage === 'so' ? 'Fariin Toos ah U Dir Maamulka' : 'Send a Message to Management'}
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={currentLanguage === 'so' ? 'Tusaale: Axmed Cali' : 'e.g. John Doe'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.phoneLabel}
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+252 61..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.messageLabel} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      currentLanguage === 'so'
                        ? 'Faahfaahi su\'aashaada ama koorsada aad rabto...'
                        : 'Describe your inquiry or the course you want to enroll in...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-blue-600 bg-slate-50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors cursor-pointer"
                >
                  {t.sendMessage}
                </button>
              </form>
            )}
          </div>

          {/* Right: Instant Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* AI Assistant card */}
            <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-6 rounded-2xl shadow-md space-y-3">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold text-amber-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>24/7 Live AI Helpdesk</span>
              </div>
              <h3 className="text-xl font-bold">
                {currentLanguage === 'so' ? 'Jawaab Degdeg ah Ma Rabtaa?' : 'Need Immediate Help?'}
              </h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                {currentLanguage === 'so'
                  ? 'AI Caawiyaha XirfadoNet wuxuu isla markiiba ku siinayaa xalka dhibaatooyinka YouTube views, Google AdSense PIN, iyo hababka lacag bixinta.'
                  : 'Get instant diagnosis for your YouTube algorithm issues, AdSense verification, and course enrollment questions.'}
              </p>
              <button
                type="button"
                onClick={() => onViewChange('support')}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-blue-900 bg-white hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>{currentLanguage === 'so' ? 'Fur AI Support Hadda' : 'Open AI Support'}</span>
              </button>
            </div>

            {/* Direct Admin WhatsApp Contact Card */}
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl shadow-xs space-y-3">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>{currentLanguage === 'so' ? 'WhatsApp Toos ah' : 'Direct WhatsApp'}</span>
              </div>
              <h3 className="text-xl font-bold text-emerald-950">
                {currentLanguage === 'so' ? 'La Xiriir Maamulka WhatsApp' : 'Contact Management on WhatsApp'}
              </h3>
              <p className="text-xs text-emerald-900 leading-relaxed">
                {currentLanguage === 'so'
                  ? 'Fadlan la xiriir maamulka XirfadoNet si aad u hesho talo toos ah, isdiiwaangalinta koorsada, ama xog ku saabsan barnaamijyada.'
                  : 'Chat directly with XirfadoNet administration for course registration guidance, 1-on-1 coaching details, and assistance.'}
              </p>
              <a
                href={getAdminWhatsAppUrl(
                  paymentSettings,
                  currentLanguage === 'so'
                    ? 'Asc Maamulka XirfadoNet, waxaan rabaa macluumaad dheeraad ah.'
                    : 'Hello XirfadoNet Management, I would like more information.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>La Xiriir Maamulka WhatsApp</span>
              </a>
            </div>

            {/* Support Details */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs text-slate-600">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Admin WhatsApp</p>
                  <a
                    href={getAdminWhatsAppUrl(paymentSettings)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-emerald-700 font-bold hover:underline"
                  >
                    {paymentSettings?.admin_whatsapp_number || '+252711870601'}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Email Support</p>
                  <p className="text-slate-500">support@xirfadonet.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Official Website</p>
                  <a
                    href="https://xirfadonet.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://xirfadonet.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Support Hours</p>
                  <p className="text-slate-500">
                    {currentLanguage === 'so'
                      ? 'AI: 24/7 Furan • Maamulka: 8:00 AM – 10:00 PM (EAT)'
                      : 'AI: 24/7 • Staff: 8:00 AM – 10:00 PM (EAT)'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
