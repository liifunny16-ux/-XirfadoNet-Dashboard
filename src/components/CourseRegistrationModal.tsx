import React, { useState } from 'react';
import { Course, Language, PaymentSettings } from '../types.js';
import { getAdminWhatsAppUrl } from '../utils/whatsapp.js';
import {
  X,
  CheckCircle,
  Copy,
  Check,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Phone,
  User,
  Mail,
  DollarSign,
  Upload,
  Clock,
  ExternalLink,
  ChevronLeft,
} from 'lucide-react';

interface CourseRegistrationModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  paymentSettings: PaymentSettings;
}

export const CourseRegistrationModal: React.FC<CourseRegistrationModalProps> = ({
  course,
  isOpen,
  onClose,
  currentLanguage,
  paymentSettings,
}) => {
  const isSo = currentLanguage === 'so';
  const [step, setStep] = useState<'info' | 'payment'>('info');
  const [formData, setFormData] = useState({
    student_name: '',
    phone_number: '',
    email: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [registrationId, setRegistrationId] = useState<string>('');

  // Step 2 state: Location check
  const [isSomalia, setIsSomalia] = useState<boolean | null>(null);

  // Step 2 state: Proof upload
  const [showProofForm, setShowProofForm] = useState(false);
  const [proofImage, setProofImage] = useState<string>('');
  const [proofText, setProofText] = useState<string>('');
  const [paymentMethodUsed, setPaymentMethodUsed] = useState<string>('EVC Plus');
  const [submittingProof, setSubmittingProof] = useState(false);
  const [proofSubmitted, setProofSubmitted] = useState(false);

  if (!isOpen) return null;

  // Strict separation of numbers:
  // paymentNumber is ONLY for manual payment (+252615941664)
  // adminWhatsApp is ONLY for WhatsApp contact (+252711870601)
  const paymentNumber = paymentSettings.payment_number || '+252615941664';
  const adminWhatsApp = paymentSettings.admin_whatsapp_number || '+252711870601';

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.student_name.trim() || !formData.phone_number.trim()) {
      setErrorMsg(isSo ? 'Fadlan geli magacaaga iyo taleefankaaga.' : 'Please enter your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/course-registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_name: formData.student_name,
          phone_number: formData.phone_number,
          email: formData.email,
          course_id: course.course_id,
          course_title: course.title,
          course_price: course.price,
          notes: formData.notes,
        }),
      });

      if (!res.ok) {
        throw new Error('Registration failed');
      }

      const data = await res.json();
      if (data?.id) {
        setRegistrationId(data.id);
      }
      setStep('payment');
    } catch (err) {
      console.error(err);
      setErrorMsg(isSo ? 'Khalad baa dhacay, fadlan mar kale isku day.' : 'An error occurred, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(paymentNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleSendWhatsAppContact = () => {
    const text = isSo
      ? `Asc Maamulka XirfadoNet, Waxaan iska diiwaangeliyay koorsada: ${course.title} ($${course.price}). Magacaygu waa: ${formData.student_name} (${formData.phone_number}). ${
          isSomalia === false
            ? 'Waxaan joogaa dalka dibaddiisa, fadlan ii soo dira habka lacag-bixinta ee ii shaqaynaya.'
            : 'Waxaan rabaa inaan idiin soo diro caddeynta lacag-bixinta.'
        }`
      : `Hello XirfadoNet Admin, I registered for: ${course.title} ($${course.price}). My name is: ${formData.student_name} (${formData.phone_number}). ${
          isSomalia === false
            ? 'I am located outside Somalia, please provide payment options for my location.'
            : 'I would like to submit my payment proof.'
        }`;
    const url = getAdminWhatsAppUrl(paymentSettings, text);
    window.open(url, '_blank');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setProofImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationId && !formData.phone_number) return;

    setSubmittingProof(true);
    try {
      const regId = registrationId || 'latest';
      const res = await fetch(`/api/course-registrations/${regId}/payment-proof`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proof_image: proofImage,
          proof_text: proofText,
          payment_method: paymentMethodUsed,
          payment_number_used: formData.phone_number,
        }),
      });

      if (res.ok) {
        setProofSubmitted(true);
      }
    } catch (err) {
      console.error('Error submitting proof:', err);
    } finally {
      setSubmittingProof(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200">
        <button
          id="btn-close-registration-modal"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Course Info Banner */}
        <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200 mb-6">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-14 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {course.category}
            </span>
            <h4 className="font-bold text-slate-900 text-sm truncate mt-1">{course.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-base font-extrabold text-blue-600">${course.price}</span>
              {course.duration && <span className="text-xs text-slate-500">· {course.duration}</span>}
            </div>
          </div>
        </div>

        {step === 'info' ? (
          /* Step 1: Student Information Form */
          <div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                {isSo ? 'Diiwaangelinta Koorsada' : 'Course Registration'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isSo
                  ? 'Fadlan geli xogtaada hoose si loogu keydiyo akoonkaaga.'
                  : 'Please enter your details below to begin registration.'}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleInfoSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isSo ? 'Magacaaga oo Buuxa *' : 'Full Name *'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="input-register-name"
                    type="text"
                    required
                    value={formData.student_name}
                    onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                    placeholder={isSo ? 'Tusaale: Ahmed Ali Warsame' : 'e.g. John Doe'}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isSo ? 'Taleefanka / WhatsApp *' : 'Phone / WhatsApp *'}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="input-register-phone"
                    type="tel"
                    required
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    placeholder="+252 61 XXX XXXX"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isSo ? 'Email (Ikhtiyaari)' : 'Email (Optional)'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="input-register-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {isSo ? "Fariin ama Su'aal (Ikhtiyaari)" : 'Notes or Question (Optional)'}
                </label>
                <textarea
                  id="textarea-register-notes"
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={isSo ? 'Waxaad rabto inaad nala wadaagto...' : 'Any notes...'}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                id="btn-register-next-to-payment"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
              >
                <span>
                  {isSubmitting
                    ? isSo
                      ? 'Waa la diiwaangelinayaa...'
                      : 'Saving...'
                    : isSo
                    ? 'U Gudub Lacag-bixinta'
                    : 'Proceed to Payment'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Step 2: Payment Flow — Manual Only */
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Ask: "Ma Somalia ayaad joogtaa?" if not answered yet */}
            {isSomalia === null ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isSo ? 'Ma Somalia ayaad joogtaa?' : 'Are you currently located in Somalia?'}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {isSo
                    ? 'Fadlan dooro halka aad ku sugan tahay si aan kuugu soo bandhigno habka lacag-bixinta kuugu habboon.'
                    : 'Please select your location so we can present the appropriate payment channel.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    id="btn-location-somalia-yes"
                    type="button"
                    onClick={() => setIsSomalia(true)}
                    className="p-4 rounded-xl border-2 border-blue-500 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-sm text-center transition-all cursor-pointer shadow-xs"
                  >
                    <div className="text-base mb-1">🇸🇴</div>
                    <span>{isSo ? 'Haa, Somalia ayaan joogaa' : 'Yes, I am in Somalia'}</span>
                    <div className="text-[11px] font-normal text-blue-700 mt-0.5">EVC Plus / Zaad / Sahal</div>
                  </button>

                  <button
                    id="btn-location-somalia-no"
                    type="button"
                    onClick={() => setIsSomalia(false)}
                    className="p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm text-center transition-all cursor-pointer shadow-xs"
                  >
                    <div className="text-base mb-1">🌍</div>
                    <span>{isSo ? 'Maya, Dibadda ayaan joogaa' : 'No, I am outside Somalia'}</span>
                    <div className="text-[11px] font-normal text-slate-500 mt-0.5">Remitly / PayPal / Contact Admin</div>
                  </button>
                </div>
              </div>
            ) : isSomalia === false ? (
              /* Outside Somalia Message */
              <div className="space-y-4 py-2 text-center animate-in fade-in">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed text-left">
                  <p className="font-semibold">
                    {isSo
                      ? 'Waad mahadsan tahay. Maadaama aad Somalia ka baxsan tahay, fadlan la xiriir maamulka XirfadoNet si laguu siiyo habka lacag-bixinta kuu shaqaynaya.'
                      : 'Thank you. Since you are outside Somalia, please contact XirfadoNet administration to receive the payment options working for your country.'}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    id="btn-contact-admin-outside"
                    onClick={handleSendWhatsAppContact}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{isSo ? '📞 La Xiriir Maamulka WhatsApp' : '📞 Contact Management on WhatsApp'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsSomalia(null)}
                    className="text-xs text-slate-500 hover:text-slate-800 transition-colors py-1 cursor-pointer flex items-center justify-center gap-1 mx-auto"
                  >
                    <ChevronLeft className="w-3 h-3" />
                    <span>{isSo ? 'Dib ugu noqo doorashada goobta' : 'Back to location selection'}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Inside Somalia: Manual Payment Instruction & Proof Upload */
              <div className="space-y-4 animate-in fade-in">
                <div className="text-center">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-1.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {isSo ? 'Lacag-bixinta Gacanta (Somalia)' : 'Manual Payment Instructions'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isSo
                      ? 'Waxaad lacagta ugu diri kartaa lambarka rasmiga ah:'
                      : 'You can send the course fee to the official payment number:'}
                  </p>
                </div>

                {/* Payment Number Card */}
                <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                      📱 {paymentNumber}
                    </span>
                    <span className="text-[11px] font-black text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      EVC / Zaad / Sahal
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white border border-blue-200 rounded-lg">
                    <span className="font-mono text-base font-extrabold text-slate-900">
                      {paymentNumber}
                    </span>
                    <button
                      id="btn-copy-payment-num"
                      type="button"
                      onClick={handleCopyNumber}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedNumber ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{isSo ? 'Waa la koobiyay' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{isSo ? 'Koobiyay' : 'Copy'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-700 font-medium">
                    {isSo
                      ? `Markaad lacagta dirto ($${course.price}), fadlan halkan kusoo dir caddeynta payment-ka.`
                      : `After sending $${course.price}, please submit your payment proof here.`}
                  </p>
                </div>

                {/* Proof submission result */}
                {proofSubmitted ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 animate-in fade-in">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                      Payment Proof Received • Under Admin Review
                    </div>
                    <p className="text-sm font-bold text-emerald-900">
                      Caddeynta payment-ka waan helnay ✅
                    </p>
                    <p className="text-xs text-emerald-800">
                      Maamulka ayaa hubinaya. Koorsadaada ayaa la furi doonaa isla marka maamulku xaqiijiyo.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleSendWhatsAppContact}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{isSo ? '📞 La Xiriir Maamulka WhatsApp' : '📞 Contact Management on WhatsApp'}</span>
                      </button>
                    </div>
                  </div>
                ) : showProofForm ? (
                  /* Form to attach screenshot and notes */
                  <form onSubmit={handleSubmitProof} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        {isSo ? 'Caddeynta Lacag-bixinta' : 'Submit Payment Proof'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowProofForm(false)}
                        className="text-xs text-slate-400 hover:text-slate-600"
                      >
                        {isSo ? 'Ka noqo' : 'Cancel'}
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        {isSo ? 'Habka lacag bixinta' : 'Payment Method'}
                      </label>
                      <select
                        value={paymentMethodUsed}
                        onChange={(e) => setPaymentMethodUsed(e.target.value)}
                        className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
                      >
                        <option value="EVC Plus">EVC Plus (Hormuud)</option>
                        <option value="ZAAD">ZAAD Service (Telesom)</option>
                        <option value="Sahal">Sahal (Golis)</option>
                        <option value="Other">Other / Kale</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        {isSo ? 'Screenshot / Sawirka Rasiidka' : 'Upload Receipt Screenshot'}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {proofImage && (
                        <div className="mt-2">
                          <img
                            src={proofImage}
                            alt="Proof Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-slate-200"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        {isSo ? 'Taleefanka aad ka dirtay ama Transaction ID' : 'Sender Phone or Transaction ID'}
                      </label>
                      <input
                        type="text"
                        value={proofText}
                        onChange={(e) => setProofText(e.target.value)}
                        placeholder="Tusaale: Trx ID ama 061XXXXXXX"
                        className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>

                    <button
                      id="btn-submit-proof-confirm"
                      type="submit"
                      disabled={submittingProof || (!proofImage && !proofText)}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {submittingProof ? (isSo ? 'Waa la dirayaa...' : 'Submitting...') : (isSo ? 'Gudbi Caddeynta' : 'Submit Proof')}
                    </button>
                  </form>
                ) : (
                  /* Two clear options */
                  <div className="space-y-2.5 pt-1">
                    <button
                      id="btn-upload-payment-proof"
                      type="button"
                      onClick={() => setShowProofForm(true)}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{isSo ? '📤 Soo Dir Caddeynta Payment-ka' : '📤 Upload Payment Proof'}</span>
                    </button>

                    <button
                      id="btn-contact-admin-proof"
                      type="button"
                      onClick={handleSendWhatsAppContact}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{isSo ? '📞 La Xiriir Maamulka WhatsApp' : '📞 Contact Management on WhatsApp'}</span>
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSomalia(null)}
                    className="text-xs text-slate-500 hover:text-slate-800 transition-colors py-1 cursor-pointer flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3 h-3" />
                    <span>{isSo ? 'Dooro goobta mar kale' : 'Change location'}</span>
                  </button>

                  <button
                    id="btn-back-to-step1"
                    type="button"
                    onClick={() => setStep('info')}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    {isSo ? '← Wax ka beddel xogta' : '← Edit info'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
