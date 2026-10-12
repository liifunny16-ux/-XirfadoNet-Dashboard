import React, { useState, useEffect } from 'react';
import { StudentReview, Language, Course } from '../types.js';
import { initialStudentReviews } from '../data/reviewsData.js';
import {
  Star,
  CheckCircle2,
  MessageSquarePlus,
  Award,
  AlertCircle,
  Clock,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface ReviewsViewProps {
  currentLanguage: Language;
  courses?: Course[];
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({
  currentLanguage,
  courses = [],
}) => {
  const isSo = currentLanguage === 'so';
  const [reviews, setReviews] = useState<StudentReview[]>(initialStudentReviews);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('All');
  const [newReview, setNewReview] = useState({
    student_name: '',
    course_name: courses[0]?.title || 'Shorts & Monetization Masterclass',
    rating: 5,
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      })
      .catch(() => {});
  }, []);

  // Only published reviews appear publicly
  const publishedReviews = reviews.filter(
    (rev) => rev.published !== false && rev.is_published !== false
  );

  const filteredReviews = publishedReviews.filter((rev) => {
    if (selectedCourseFilter === 'All') return true;
    const courseTitle = rev.course_name || rev.course_title || rev.course || '';
    return courseTitle.toLowerCase().includes(selectedCourseFilter.toLowerCase());
  });

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.student_name.trim() || !newReview.comment.trim()) {
      alert(isSo ? 'Fadlan geli magacaaga iyo ra\'yigaaga.' : 'Please enter your name and review.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_name: newReview.student_name.trim(),
          course_name: newReview.course_name,
          rating: Number(newReview.rating),
          comment: newReview.comment.trim(),
          published: true,
          verified: false,
          is_sample: false, // User submitted reviews are real, not sample
        }),
      });

      if (res.ok) {
        const created = await res.json();
        setReviews([created, ...reviews]);
        setSubmitSuccess(true);
        setTimeout(() => {
          setShowSubmitModal(false);
          setSubmitSuccess(false);
          setNewReview({
            student_name: '',
            course_name: courses[0]?.title || 'Shorts & Monetization Masterclass',
            rating: 5,
            comment: '',
          });
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold mb-4 border border-blue-200">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>{isSo ? 'Aragtiyada & Khibradaha Ardayda' : 'Student Feedback & Experiences'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isSo ? 'Khibradaha Dhabta ah ee Barashada' : 'Real Experiences from Learners'}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            {isSo
              ? 'Akhriso sida ardaydu u arkaan casharrada YouTube Shorts, tafatirka taleefanka (CapCut & Alight Motion), iyo nidaamyada faceless content. Ra\'yi daacad ah oo aan la buunbuunin.'
              : 'Unfiltered learner feedback on practical modules, hands-on mobile editing, and channel workflows.'}
          </p>

          {/* Development Transparency Banner */}
          <div className="mt-4 p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-800 flex items-center justify-center gap-2 max-w-xl mx-auto">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              {isSo
                ? 'Hufnaan: Tusaalooyinka horumarinta waxaa lagu calaamadeeyay "Sample Review" si looga fogaado marin habaabin.'
                : 'Transparency Note: Sample reviews during development are clearly labeled "Sample Review" to prevent any misleading claims.'}
            </span>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              id="btn-open-add-review-modal"
              onClick={() => setShowSubmitModal(true)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>{isSo ? 'Dhiibo Ra\'yigaaga (Arday)' : 'Write a Student Review'}</span>
            </button>
          </div>
        </div>

        {/* Course Filter Tabs if courses exist */}
        {courses.length > 0 && (
          <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
            <button
              id="filter-review-all"
              onClick={() => setSelectedCourseFilter('All')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCourseFilter === 'All'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {isSo ? 'Dhammaan Koorsooyinka' : 'All Courses'}
            </button>
            {courses.slice(0, 4).map((c) => (
              <button
                key={c.course_id}
                id={`filter-review-${c.course_id}`}
                onClick={() => setSelectedCourseFilter(c.title)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCourseFilter === c.title
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => {
            const isSample = Boolean(rev.is_sample);
            const isVerified = Boolean(rev.verified || rev.verified_student || rev.is_verified) && !isSample;
            const studentName = rev.student_name || rev.studentName || rev.name || 'Arday';
            const courseName = rev.course_name || rev.course_title || rev.course || 'XirfadoNet Course';
            const reviewComment = rev.comment || rev.comment_so || rev.comment_en || rev.review || '';
            const date = rev.date || rev.created_at || '';

            return (
              <div
                key={rev.id}
                id={`review-card-${rev.id}`}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative"
              >
                <div>
                  {/* Top Bar: Rating, Verified Badge or Sample Review Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (rev.rating || 5)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Prominent Sample Review Label if sample */}
                    {isSample ? (
                      <span
                        id={`badge-sample-${rev.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200"
                        title="Sample review for development / testing"
                      >
                        <AlertCircle className="w-3 h-3 text-amber-600" />
                        <span>Sample Review</span>
                      </span>
                    ) : isVerified ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{isSo ? 'Arday Xaqiijisan' : 'Verified Student'}</span>
                      </span>
                    ) : null}
                  </div>

                  {/* Course Tag */}
                  <div className="mb-3 px-3 py-1 bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border border-slate-100">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span className="line-clamp-1">{courseName}</span>
                  </div>

                  {/* Comment */}
                  <p className="text-slate-700 text-sm leading-relaxed mb-6">
                    "{reviewComment}"
                  </p>
                </div>

                {/* Author & Date */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs">
                      {studentName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {studentName}
                      </h4>
                      {rev.role_or_channel && (
                        <p className="text-[11px] text-slate-400">
                          {rev.role_or_channel}
                        </p>
                      )}
                    </div>
                  </div>
                  {date && (
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {date}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredReviews.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-slate-600 font-medium">
              {isSo ? 'Weli wax ra\'yi ah laguma darin koorsadan.' : 'No reviews found for this course.'}
            </p>
          </div>
        )}

        {/* Submit Review Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
              <button
                id="btn-close-review-modal"
                onClick={() => setShowSubmitModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>

              <h3 className="text-xl font-bold text-slate-900 mb-1">
                {isSo ? 'Dhiibo Ra\'yigaaga Ardaynimo' : 'Submit Your Feedback'}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-6">
                {isSo
                  ? 'Fadlan la wadaag ardayda kale sida casharradu kuu caawiyeen. Qor khibrad dhab ah oo aad leedahay.'
                  : 'Share how the training impacted your workflow and creative confidence.'}
              </p>

              {submitSuccess ? (
                <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-900">
                    {isSo ? 'Mahadsanid!' : 'Thank you!'}
                  </h4>
                  <p className="text-emerald-700 text-xs sm:text-sm">
                    {isSo ? 'Ra\'yigaaga si guul leh ayaa loo diiwaangeliyay.' : 'Your feedback has been saved.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isSo ? 'Magacaaga (ama Anonymous):' : 'Your Name (or Anonymous):'}
                    </label>
                    <input
                      id="input-review-student-name"
                      type="text"
                      required
                      value={newReview.student_name}
                      onChange={(e) => setNewReview({ ...newReview, student_name: e.target.value })}
                      placeholder={isSo ? 'Tusaale: Axmed Cali' : 'e.g. Ahmed Ali'}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isSo ? 'Koorsada aad qaadatay:' : 'Course Completed:'}
                    </label>
                    <select
                      id="select-review-course"
                      value={newReview.course_name}
                      onChange={(e) => setNewReview({ ...newReview, course_name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {courses.map((c) => (
                        <option key={c.course_id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                      <option value="Shorts & Monetization Masterclass">
                        Shorts & Monetization Masterclass
                      </option>
                      <option value="Football Video Editing Masterclass">
                        Football Video Editing Masterclass
                      </option>
                      <option value="YouTube Automation (Faceless Channel)">
                        YouTube Automation (Faceless Channel)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isSo ? 'Qiimeynta (Rating):' : 'Rating:'}
                    </label>
                    <div className="flex items-center gap-2 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          id={`star-select-${star}`}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newReview.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isSo ? 'Ra\'yigaaga (Khibradaada dhabta ah):' : 'Your Review / Experience:'}
                    </label>
                    <textarea
                      id="input-review-text"
                      required
                      rows={4}
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder={isSo ? 'Qor waxa aad ka baratay, qodobka ku anfacay, ama sida tababarku kuu caawiyay...' : 'Write what you learned, what practically helped you, or how it impacted your skills...'}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowSubmitModal(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                    >
                      {isSo ? 'Ka noqo' : 'Cancel'}
                    </button>
                    <button
                      id="btn-submit-review"
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (isSo ? 'Waa la dirayaa...' : 'Submitting...') : (isSo ? 'Dir Ra\'yiga' : 'Submit Review')}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
