import React, { useState } from 'react';
import { StudentReview, Course } from '../../types.js';
import {
  Award,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Star,
  RefreshCw,
  Search,
  BookOpen,
} from 'lucide-react';

interface AdminReviewsTabProps {
  courses: Course[];
  reviews: StudentReview[];
  onRefresh: () => void;
}

export const AdminReviewsTab: React.FC<AdminReviewsTabProps> = ({
  courses,
  reviews,
  onRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'published' | 'sample' | 'verified'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<StudentReview | null>(null);
  const [formData, setFormData] = useState({
    student_name: '',
    course_name: courses[0]?.title || 'Shorts & Monetization Masterclass',
    rating: 5,
    comment: '',
    published: true,
    verified: false,
    is_sample: false,
  });

  const handleOpenModal = (review?: StudentReview) => {
    if (review) {
      setEditingReview(review);
      setFormData({
        student_name: review.student_name || review.studentName || review.name || '',
        course_name: review.course_name || review.course_title || review.course || '',
        rating: review.rating || 5,
        comment: review.comment || review.comment_so || review.comment_en || review.review || '',
        published: review.published !== false && review.is_published !== false,
        verified: Boolean(review.verified || review.verified_student || review.is_verified),
        is_sample: Boolean(review.is_sample),
      });
    } else {
      setEditingReview(null);
      setFormData({
        student_name: '',
        course_name: courses[0]?.title || 'Shorts & Monetization Masterclass',
        rating: 5,
        comment: '',
        published: true,
        verified: false,
        is_sample: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.student_name.trim() || !formData.comment.trim()) {
      alert('Fadlan geli magaca ardayga iyo ra\'yiga.');
      return;
    }

    try {
      if (editingReview) {
        const res = await fetch(`/api/reviews/${editingReview.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setIsModalOpen(false);
          onRefresh();
        }
      } else {
        const res = await fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setIsModalOpen(false);
          onRefresh();
        }
      }
    } catch (err) {
      console.error('Error saving review:', err);
    }
  };

  const handleTogglePublished = async (review: StudentReview) => {
    const nextPublished = !(review.published !== false && review.is_published !== false);
    try {
      const res = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: nextPublished, is_published: nextPublished }),
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error('Error toggling published:', err);
    }
  };

  const handleToggleVerified = async (review: StudentReview) => {
    const nextVerified = !Boolean(review.verified || review.verified_student || review.is_verified);
    try {
      const res = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verified: nextVerified,
          is_verified: nextVerified,
          verified_student: nextVerified,
        }),
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error('Error toggling verified:', err);
    }
  };

  const handleToggleSample = async (review: StudentReview) => {
    const nextSample = !Boolean(review.is_sample);
    try {
      const res = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_sample: nextSample }),
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error('Error toggling sample:', err);
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm('Ma hubtaa inaad tirtirto ra\'yigan?')) return;
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  const filteredReviews = reviews.filter((rev) => {
    const name = (rev.student_name || rev.studentName || rev.name || '').toLowerCase();
    const course = (rev.course_name || rev.course_title || rev.course || '').toLowerCase();
    const comment = (rev.comment || rev.comment_so || rev.review || '').toLowerCase();
    const term = searchTerm.toLowerCase();

    const matchesSearch = !term || name.includes(term) || course.includes(term) || comment.includes(term);

    const isPublished = rev.published !== false && rev.is_published !== false;
    const isSample = Boolean(rev.is_sample);
    const isVerified = Boolean(rev.verified || rev.verified_student || rev.is_verified);

    if (filterType === 'published') return matchesSearch && isPublished;
    if (filterType === 'sample') return matchesSearch && isSample;
    if (filterType === 'verified') return matchesSearch && isVerified;
    return matchesSearch;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-900">Maamulka Ra'yiga & Reviews-ka</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              {reviews.length} Reviews
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Xakamee xaqiijinta ardayda (Verified Student), calaamadeynta tusaalooyinka (Sample Review), iyo baahinta (Published / Unpublished).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRefresh}
            className="p-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Refresh reviews"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            id="btn-admin-add-review"
            type="button"
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Kudar Review Cusub</span>
          </button>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="admin-search-reviews"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Raadi magaca ardayga, koorsada, ama qoraalka..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {(['all', 'published', 'sample', 'verified'] as const).map((ft) => (
            <button
              key={ft}
              onClick={() => setFilterType(ft)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap cursor-pointer ${
                filterType === ft
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {ft === 'all' ? 'All Reviews' : ft}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReviews.map((rev) => {
          const isPublished = rev.published !== false && rev.is_published !== false;
          const isSample = Boolean(rev.is_sample);
          const isVerified = Boolean(rev.verified || rev.verified_student || rev.is_verified);
          const studentName = rev.student_name || rev.studentName || rev.name || 'Arday';
          const courseName = rev.course_name || rev.course_title || rev.course || 'XirfadoNet';
          const comment = rev.comment || rev.comment_so || rev.review || '';

          return (
            <div
              key={rev.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3 text-xs"
            >
              <div>
                {/* Header with name & rating */}
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 text-sm">{studentName}</span>
                  <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{rev.rating || 5}/5</span>
                  </div>
                </div>

                <div className="text-[11px] text-blue-700 font-semibold mb-2 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  <span className="line-clamp-1">{courseName}</span>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isPublished
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isPublished ? 'Published' : 'Unpublished'}
                  </span>

                  {isSample && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                      Sample Review
                    </span>
                  )}

                  {isVerified && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                      Verified Student
                    </span>
                  )}
                </div>

                <p className="text-slate-700 leading-relaxed italic line-clamp-4">
                  "{comment}"
                </p>
              </div>

              {/* Toggles and Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-1 text-[11px]">
                <div className="flex items-center gap-1">
                  {/* Toggle Published */}
                  <button
                    type="button"
                    onClick={() => handleTogglePublished(rev)}
                    className={`p-1.5 rounded-lg cursor-pointer ${
                      isPublished ? 'text-emerald-700 hover:bg-emerald-100' : 'text-slate-400 hover:bg-slate-200'
                    }`}
                    title={isPublished ? 'Unpublish' : 'Publish'}
                  >
                    {isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  {/* Toggle Verified */}
                  <button
                    type="button"
                    onClick={() => handleToggleVerified(rev)}
                    className={`p-1.5 rounded-lg cursor-pointer ${
                      isVerified ? 'text-blue-700 hover:bg-blue-100' : 'text-slate-400 hover:bg-slate-200'
                    }`}
                    title={isVerified ? 'Remove Verified Student Badge' : 'Mark as Verified Student'}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  {/* Toggle Sample */}
                  <button
                    type="button"
                    onClick={() => handleToggleSample(rev)}
                    className={`p-1.5 rounded-lg cursor-pointer ${
                      isSample ? 'text-amber-700 hover:bg-amber-100' : 'text-slate-400 hover:bg-slate-200'
                    }`}
                    title={isSample ? 'Remove Sample Label' : 'Mark as Sample Review'}
                  >
                    <AlertCircle className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenModal(rev)}
                    className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg cursor-pointer"
                    title="Edit review"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteReview(rev.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg cursor-pointer"
                    title="Delete review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredReviews.length === 0 && (
        <div className="p-8 text-center text-slate-500 text-xs">
          Ma jiro review la helay.
        </div>
      )}

      {/* Add / Edit Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {editingReview ? 'Wax ka baddal Review-ga' : 'Kudar Review Cusub'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Magaca Ardayga (Student Name) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.student_name}
                  onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Tusaale: Cabdi Maxamed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Koorsada (Course) *
                </label>
                <select
                  value={formData.course_name}
                  onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
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
                <label className="block font-semibold text-slate-700 mb-1">
                  Qiimeynta (Rating: 1 - 5)
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value={5}>5 Stars (Aad u Wanaagsan)</option>
                  <option value={4}>4 Stars (Wanaagsan)</option>
                  <option value={3}>3 Stars (Dhexdhexaad)</option>
                  <option value={2}>2 Stars (Hoose)</option>
                  <option value={1}>1 Star (Aad u Hoose)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Qoraalka Review-ga (Natural feedback) *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Qor ra'yiga ardayga oo dabiici ah..."
                />
              </div>

              {/* Toggles */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-semibold text-slate-700">
                    Published (Dadweynaha u muuqanaya)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.verified}
                    onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-semibold text-slate-700">
                    Verified Student Badge (Kaliya marka xaqiijin dhab ah jirto)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_sample}
                    onChange={(e) => setFormData({ ...formData, is_sample: e.target.checked })}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span className="font-semibold text-slate-700">
                    Sample Review (Calaamadee tusaale horumarineed ahaan)
                  </span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Ka noqo
                </button>
                <button
                  id="btn-admin-save-review-submit"
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm"
                >
                  Keydi Review-ga
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
