import React, { useState, useEffect } from 'react';
import { BlogPost, Language, Course } from '../types.js';
import {
  FileText,
  Clock,
  ArrowRight,
  Search,
  BookOpen,
  User,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { initialBlogPosts } from '../data/blogPostsData.js';
import { ArticleDetailView } from './ArticleDetailView.js';

interface BlogViewProps {
  currentLanguage: Language;
  courses?: Course[];
  onSelectArticle?: (post: BlogPost) => void;
  onSelectCourse?: (courseId: string) => void;
  onOpenRegister?: (course: Course) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  currentLanguage,
  courses = [],
  onSelectArticle,
  onSelectCourse,
  onOpenRegister,
}) => {
  const isSo = currentLanguage === 'so';
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    fetch('/api/blog-posts')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
        }
      })
      .catch(() => {});
  }, []);

  // Requested categories matching educational curricula
  const categories = [
    'All',
    'YouTube',
    'YouTube Growth',
    'YouTube Automation',
    'Video Editing',
    'AI',
    'Online Income',
    'E-commerce',
    'Freelancing',
  ];

  const filteredPosts = posts.filter((post) => {
    // Only published posts for public view
    if (post.published === false) return false;

    const title = post.title || (isSo ? post.title_so : post.title_en) || '';
    const excerpt = post.excerpt || (isSo ? post.excerpt_so : post.excerpt_en) || '';
    const content = post.content || (isSo ? post.content_so : post.content_en) || '';
    const term = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !term ||
      title.toLowerCase().includes(term) ||
      excerpt.toLowerCase().includes(term) ||
      content.toLowerCase().includes(term) ||
      post.category.toLowerCase().includes(term) ||
      (post.slug && post.slug.toLowerCase().includes(term));

    const matchesCat =
      selectedCategory === 'All' ||
      post.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'YouTube' && post.category.toLowerCase().includes('youtube'));

    return matchesSearch && matchesCat;
  });

  if (activeArticle) {
    return (
      <ArticleDetailView
        post={activeArticle}
        allPosts={posts}
        currentLanguage={currentLanguage}
        courses={courses}
        onBack={() => {
          setActiveArticle(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectPost={(post) => {
          setActiveArticle(post);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCourse={onSelectCourse || (() => {})}
        onOpenRegister={onOpenRegister}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4 border border-blue-200">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isSo ? 'Maqaallada & Xarunta Waxbarashada' : 'Educational Knowledge & Blog'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isSo ? 'Maqaallo Qoto-Dheer & Xalal Ficil Ah' : 'In-Depth Guides & Educational Articles'}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            {isSo
              ? 'Baro xeeladaha dhabta ah ee YouTube views, tafatirka muuqaallada (CapCut & Alight Motion), faceless automation, AI content, iyo lacag-abuurka online-ka. Maqaallo wax ku ool ah oo bilaash ah.'
              : 'Actionable, in-depth tutorials on YouTube growth, viral mobile editing, faceless automation, AI workflows, and online careers.'}
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mb-10 space-y-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="input-search-articles"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isSo ? 'Raadi: YouTube, Views, Shorts, CapCut, Football, AI, Payoneer...' : 'Search: YouTube, Views, Shorts, CapCut, Football, AI, Payoneer...'}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-sm"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`cat-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const title = post.title || (isSo ? post.title_so : post.title_en);
            const excerpt = post.excerpt || (isSo ? post.excerpt_so : post.excerpt_en);
            const author = post.author || 'XirfadoNet Team';
            const readTime = post.readingTime || post.read_time || '7 daqiiqo';
            const date = post.date || post.publishedAt || '';

            return (
              <article
                key={post.id}
                id={`article-card-${post.slug || post.id}`}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all group cursor-pointer"
                onClick={() => {
                  setActiveArticle(post);
                  if (onSelectArticle) onSelectArticle(post);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {/* Image */}
                <div className="h-52 overflow-hidden relative bg-slate-100">
                  <img
                    src={post.featuredImage || post.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-blue-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-slate-100">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Metadata Header */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                      <span className="flex items-center gap-1 text-slate-600 font-medium">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {author}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {readTime}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 leading-snug">
                      {title}
                    </h2>
                    <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                      {excerpt}
                    </p>
                  </div>

                  {/* Card Action */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                      {isSo ? 'Akhri Maqaalka' : 'Read Article'}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    {post.headings && post.headings.length > 0 && (
                      <span className="text-[11px] text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                        {post.headings.length} {isSo ? 'qodob' : 'sections'}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">
              {isSo ? 'Ma jiro maqaal la helay oo ku saabsan raadintaada.' : 'No articles found matching your criteria.'}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
            >
              {isSo ? 'Dib u deji Raadinta' : 'Reset Filters'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
