import React, { useState } from 'react';
import { Language, PaymentSettings } from '../types.js';
import { getAdminWhatsAppUrl } from '../utils/whatsapp.js';
import {
  UserCheck,
  Video,
  CheckCircle,
  MessageSquare,
  Shield,
  Clock,
  Sparkles,
  ArrowRight,
  Send,
  Headphones,
  Award,
  Calendar,
  Check,
} from 'lucide-react';

interface CoachingViewProps {
  currentLanguage: Language;
  paymentSettings: PaymentSettings;
}

export const CoachingView: React.FC<CoachingViewProps> = ({
  currentLanguage,
  paymentSettings,
}) => {
  const isSo = currentLanguage === 'so';
  const [formData, setFormData] = useState({
    student_name: '',
    phone_number: '',
    email: '',
    skill_or_topic: 'YouTube Shorts & Automation',
    preferred_language: isSo ? 'so' : 'en',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Strict separation of numbers
  const adminWhatsApp = paymentSettings.admin_whatsapp_number || '+252615940000';
  const cleanPhone = adminWhatsApp.replace(/[^0-9]/g, '');

  const topicsList = [
    'YouTube Growth & Algorithm',
    'Shorts Mastery',
    'YouTube Automation (Faceless Channels)',
    'AI Tools & Automation',
    'Video Editing',
    'Football Editing (CapCut & Alight Motion)',
    'Facebook Automation & Monetization',
    'Shopify & E-Commerce',
    'Clipster & Content Repurposing',
    'Payoneer & Payment Setup',
    '3D Cartoon Animation',
    'AdSense Verification & PIN Issue Fix',
    'Other / Mawduuc Kale',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.student_name.trim() || !formData.phone_number.trim()) {
      setErrorMsg(isSo ? 'Fadlan geli magacaaga iyo lambarkaaga taleefanka.' : 'Please enter your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/coaching-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit coaching request');
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMsg(isSo ? 'Wax yar baa qaldamay, fadlan toos WhatsApp ugala xiriir maamulka.' : 'Something went wrong, please reach out directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = isSo
      ? `Asc Maamulka XirfadoNet, Waxaan xiisaynayaa 1-on-1 Live Coaching gaar ah mawduuca: ${formData.skill_or_topic || 'Coaching'}. Magacaygu waa: ${formData.student_name || 'Arday'} (${formData.phone_number}).`
      : `Hello XirfadoNet Admin, I am interested in 1-on-1 Live Coaching for: ${formData.skill_or_topic || 'Coaching'}. My name is: ${formData.student_name || 'Student'} (${formData.phone_number}).`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-4 border border-indigo-200">
            <UserCheck className="w-3.5 h-3.5" />
            <span>{isSo ? 'Adeeg Gaar ah oo Toos ah (VIP 1-on-1)' : 'Personalized 1-on-1 Mentorship'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isSo ? '1-on-1 Live Coaching: Tababar Khaas ah oo Toos ah' : '1-on-1 Live Coaching with Senior Mentors'}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            {isSo
              ? 'Kuma filna fiidiyowyo duuban? La fariiso macallinka khabiirka ah shaashad wadaag toos ah (Google Meet / Zoom). Xalliso dhibaatadaada gaarka ah oo dhis istiraatiijiyad dhab ah.'
              : 'Direct screen-sharing sessions tailored to your channel, AdSense roadblocks, editing workflow, or monetization goals.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: What's Included & Benefits */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                {isSo ? 'Faa\'iidooyinka Kalfadhiga 1-on-1 Coaching' : 'Benefits of 1-on-1 Coaching'}
              </h3>

              <div className="space-y-4">
                {[
                  {
                    title_so: 'Waxbarasho Toos ah (Live Teaching)',
                    title_en: 'Direct Live Teaching',
                    desc_so: 'Macallinka ayaa toos kuula fariisanaya Google Meet/Zoom, isagoo shaashadda kuu wadaagaya.',
                    desc_en: 'Direct live teaching with the mentor via Google Meet or Zoom screen sharing.',
                  },
                  {
                    title_so: 'Su\'aalo Toos ah (Direct Questions & Answers)',
                    title_en: 'Immediate Direct Questions',
                    desc_so: 'Weydii su\'aal kasta oo kugu adkaatay oo isla goobta uga helo jawaab caddayn leh.',
                    desc_en: 'Ask any specific question blocking your progress and get immediate concrete answers.',
                  },
                  {
                    title_so: 'Hagid Gaar ah (Personalized Guidance)',
                    title_en: 'Personalized Strategic Guidance',
                    desc_so: 'Qorshe khaas ah oo ku saleysan heerkaaga, wakhtigaaga, iyo ujeedooyinkaaga dhabta ah.',
                    desc_en: 'Customized roadmap designed around your exact skill level, schedule, and goals.',
                  },
                  {
                    title_so: 'Layliyo Ficil ah (Practical Exercises)',
                    title_en: 'Practical Hands-on Exercises',
                    desc_so: 'Ha daawan oo kaliya — isla fadhiga dhexdiisa wax ka qabo macallinkana ha ku saxo.',
                    desc_en: 'Do not just watch theory — execute live during the call while the mentor guides you.',
                  },
                  {
                    title_so: 'Caawinta Mashruucaaga Gaarka ah (Your Project Help)',
                    title_en: 'Help with Your Actual Project / Channel',
                    desc_so: 'Gacanta ku hay kanaalkaaga, muuqaalkaaga, ama dhibaatada AdSense ee ku haysata.',
                    desc_en: 'Direct hands-on troubleshooting of your specific channel, video edit, or store setup.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 font-bold text-sm">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {isSo ? item.title_so : item.title_en}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {isSo ? item.desc_so : item.desc_en}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Integrity note */}
              <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
                <span className="font-bold block mb-1">
                  🛡️ {isSo ? 'Ballanqaad Dhab ah oo Xaqiiqo ku Dhisan:' : 'Honest Commitment:'}
                </span>
                {isSo
                  ? 'XirfadoNet ma bixiso ballanqaadyo been ah oo dakhli dammaanad ah. Waxaan ku siinaynaa aqoonta, farsamada casriga ah, iyo hufnaanta aad ugu baahan tahay inaad shaqo suuq dhab ah ka dhex samayso.'
                  : 'XirfadoNet never provides false promises of guaranteed income. We equip you with real, verified, market-ready digital skills and hands-on execution.'}
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                {isSo ? 'Codso Kalfadhi Toos ah' : 'Request a Live Session'}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-6 leading-relaxed">
                {isSo
                  ? 'Foomkan buuxi si maamulku kuu xiriiro oo laguu diyaariyo kalfadhi gaar ah.'
                  : 'Submit your contact info and topic to have our team schedule your dedicated session.'}
              </p>

              {submitted ? (
                <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-4 animate-in fade-in">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">
                    {isSo ? 'Codsigaaga waa la helay.' : 'Request Received.'}
                  </h4>
                  <p className="text-sm font-semibold text-emerald-800 leading-relaxed">
                    {isSo
                      ? 'Codsigaaga waa la helay. Maamulka XirfadoNet ayaa kula soo xiriiri doona.'
                      : 'Your request has been received. XirfadoNet administration will reach out to you.'}
                  </p>
                  <button
                    id="btn-coaching-success-whatsapp"
                    onClick={handleWhatsAppDirect}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{isSo ? '📞 La Xiriir Maamulka WhatsApp' : '📞 Contact Administration WhatsApp'}</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-rose-50 text-rose-700 rounded-lg text-xs font-medium border border-rose-200">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {isSo ? 'Magacaaga oo Buuxa *' : 'Full Name *'}
                    </label>
                    <input
                      id="input-coaching-name"
                      type="text"
                      required
                      value={formData.student_name}
                      onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                      placeholder={isSo ? 'Tusaale: Axmed Cali' : 'e.g. Ahmed Ali'}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {isSo ? 'Lambarka WhatsApp / Taleefanka *' : 'WhatsApp / Phone Number *'}
                    </label>
                    <input
                      id="input-coaching-phone"
                      type="text"
                      required
                      value={formData.phone_number}
                      onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                      placeholder="+252..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {isSo ? 'Email (Ikhtiyaari)' : 'Email (Optional)'}
                    </label>
                    <input
                      id="input-coaching-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {isSo ? 'Mawduuca aad Rabto inaad Barato *' : 'Preferred Topic / Skill *'}
                    </label>
                    <select
                      id="select-coaching-topic"
                      value={formData.skill_or_topic}
                      onChange={(e) => setFormData({ ...formData, skill_or_topic: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {topicsList.map((t, idx) => (
                        <option key={idx} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {isSo ? 'Luuqadda aad Doorbiddo *' : 'Preferred Language *'}
                    </label>
                    <select
                      id="select-coaching-lang"
                      value={formData.preferred_language}
                      onChange={(e) => setFormData({ ...formData, preferred_language: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="so">Af-Soomaali</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {isSo ? 'Fariin ama Su\'aashaada (Ikhtiyaari)' : 'Message / Details (Optional)'}
                    </label>
                    <textarea
                      id="textarea-coaching-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={isSo ? 'Sharax dhibaatadaada gaarka ah ama waxa aad doonayso inaad xalliso...' : 'Briefly describe your channel or roadblock...'}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <button
                    id="btn-submit-coaching-request"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{isSo ? 'Waa la dirayaa...' : 'Submitting...'}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{isSo ? 'Diyaar ayaan ahay (Dir Codsiga)' : 'I am Ready (Submit Request)'}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
