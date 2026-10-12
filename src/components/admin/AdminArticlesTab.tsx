import React, { useState, useEffect } from 'react';
import { BlogPost, Course } from '../../types.js';
import {
  FileText,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Search,
  RefreshCw,
  BookOpen,
  Calendar,
  Clock,
  User,
  Link,
  CheckCircle,
} from 'lucide-react';

interface AdminArticlesTabProps {
  courses: Course[];
}

export const AdminArticlesTab: React.FC<AdminArticlesTabProps> = ({ courses }) => {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'YouTube Growth',
    author: 'Kooxda XirfadoNet',
    readingTime: '7 daqiiqo',
    featuredImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
    excerpt: '',
    content: '',
    status: 'published' as 'published' | 'draft',
    related_course_id: '',
  });

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blog-posts');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setArticles(data);
        }
      }
    } catch (err) {
      console.error('Failed to load articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleOpenModal = (article?: BlogPost) => {
    if (article) {
      setEditingArticle(article);
      setFormData({
        title: article.title || article.title_so || '',
        slug: article.slug || '',
        category: article.category || 'YouTube Growth',
        author: article.author || 'Kooxda XirfadoNet',
        readingTime: article.readingTime || article.read_time || '7 daqiiqo',
        featuredImage: article.featuredImage || article.image || '',
        excerpt: article.excerpt || article.excerpt_so || '',
        content: article.content || article.content_so || '',
        status: article.published === false ? 'draft' : 'published',
        related_course_id: article.related_course_id || '',
      });
    } else {
      setEditingArticle(null);
      setFormData({
        title: '',
        slug: '',
        category: 'YouTube Growth',
        author: 'Kooxda XirfadoNet',
        readingTime: '7 daqiiqo',
        featuredImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
        excerpt: '',
        content: '',
        status: 'published',
        related_course_id: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Fadlan geli cinwaanka iyo nuxurka maqaalka.');
      return;
    }

    const payload = {
      ...formData,
      published: formData.status === 'published',
    };

    try {
      if (editingArticle) {
        const res = await fetch(`/api/blog-posts/${editingArticle.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const updated = await res.json();
          setArticles(articles.map((a) => (a.id === updated.id ? updated : a)));
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch('/api/blog-posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          setArticles([created, ...articles]);
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Error saving article:', err);
    }
  };

  const handleTogglePublish = async (article: BlogPost) => {
    const nextPublished = article.published === false;
    try {
      const res = await fetch(`/api/blog-posts/${article.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: nextPublished }),
      });
      if (res.ok) {
        setArticles(
          articles.map((a) =>
            a.id === article.id ? { ...a, published: nextPublished } : a
          )
        );
      }
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Ma hubtaa inaad tirtirto maqaalkan?')) return;
    try {
      const res = await fetch(`/api/blog-posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setArticles(articles.filter((a) => a.id !== id));
      }
    } catch (err) {
      console.error('Error deleting article:', err);
    }
  };

  const filteredArticles = articles.filter((a) => {
    const title = (a.title || a.title_so || '').toLowerCase();
    const term = searchTerm.toLowerCase();
    const matchesSearch = !term || title.includes(term) || a.category.toLowerCase().includes(term);
    const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const categories = ['All', 'YouTube Growth', 'YouTube Automation', 'Video Editing', 'AI Tools', 'Monetization', 'E-commerce', 'Online Work'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-900">Maamulka Maqaallada & Blog-ga</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              {articles.length} Maqaal
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Qor maqaallo waxbarasho oo qoto-dheer. Maqaalladu waa waxbarasho madaxbannaan oo aan xayaysiis koorso ahayn.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchArticles}
            className="p-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Refresh articles"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            id="btn-admin-add-article"
            type="button"
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Kudar Maqaal Cusub</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="admin-search-articles"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Raadi cinwaanka maqaalka ama qaybta..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer ${
                selectedCategory === c
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Table / Grid */}
      <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
        {filteredArticles.map((art) => {
          const title = art.title || art.title_so || 'Cinwaan la\'aan';
          const isPublished = art.published !== false;
          const readTime = art.readingTime || art.read_time || '7 daq';
          const date = art.date || art.publishedAt || '';

          return (
            <div
              key={art.id}
              className="p-4 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <img
                  src={art.featuredImage || art.image}
                  alt={title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                      {art.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isPublished
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}
                    >
                      {isPublished ? 'Published' : 'Draft'}
                    </span>
                    {art.related_course_id && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 flex items-center gap-1">
                        <Link className="w-2.5 h-2.5" />
                        <span>Koorso ku xiran</span>
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">
                    {title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>Qoraa: {art.author || 'XirfadoNet'}</span>
                    <span>•</span>
                    <span>{date}</span>
                    <span>•</span>
                    <span>{readTime}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => handleTogglePublish(art)}
                  className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                    isPublished
                      ? 'text-slate-600 hover:bg-slate-200 bg-slate-100'
                      : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                  title={isPublished ? 'Unpublish to Draft' : 'Publish Article'}
                >
                  {isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span>{isPublished ? 'Make Draft' : 'Publish'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenModal(art)}
                  className="p-2 text-blue-600 hover:bg-blue-50 bg-blue-50/50 rounded-xl cursor-pointer"
                  title="Edit Article"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteArticle(art.id)}
                  className="p-2 text-red-500 hover:bg-red-50 bg-red-50/50 rounded-xl cursor-pointer"
                  title="Delete Article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredArticles.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs">
            Ma jiro maqaal la helay.
          </div>
        )}
      </div>

      {/* Add / Edit Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {editingArticle ? 'Wax ka baddal Maqaalka' : 'Kudar Maqaal Cusub'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Cinwaanka Maqaalka (Title) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="Tusaale: Sida YouTube Algorithm-ka u Shaqeeyo 2026"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Slug (URL friendly)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="how-youtube-algorithm-works-2026"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Qaybta (Category)
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="YouTube Growth">YouTube Growth</option>
                    <option value="YouTube Automation">YouTube Automation</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="AI Tools">AI Tools</option>
                    <option value="Monetization">Monetization</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Online Work">Online Work</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Qoraaga (Author)
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Waqtiga Akhriska (Reading Time)
                  </label>
                  <input
                    type="text"
                    value={formData.readingTime}
                    onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Sawirka Maqaalka (Featured Image URL)
                </label>
                <input
                  type="url"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Soo Koobid (Excerpt / Lead)
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  placeholder="Muxuu maqaalkani ku saabsan yahay si kooban..."
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nuxurka Buuxa ee Maqaalka (Full Educational Content - Markdown) *
                </label>
                <textarea
                  required
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs leading-relaxed"
                  placeholder="Qor casharka oo dhan. Isticmaal ## Qodobada, liisaska (* qodob), tusaalooyinka, iwm."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Koorso La Xiriirta (Ikhtiyaari - Optional)
                  </label>
                  <select
                    value={formData.related_course_id}
                    onChange={(e) => setFormData({ ...formData, related_course_id: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="">-- Koorso La'aan (Standalone Article) --</option>
                    {courses.map((c) => (
                      <option key={c.course_id} value={c.course_id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Xaaladda (Status)
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="published">Published (U furan dadweynaha)</option>
                    <option value="draft">Draft (Qabyo - Lama arki karo)</option>
                  </select>
                </div>
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
                  id="btn-admin-save-article"
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm"
                >
                  Keydi Maqaalka
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
