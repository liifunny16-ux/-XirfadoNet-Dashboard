import React from 'react';
import { BlogPost, Language, Course } from '../types.js';
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Share2,
  CheckCircle2,
  Lightbulb,
  BookOpen,
  ArrowRight,
  Bookmark,
  CheckSquare,
} from 'lucide-react';

interface ArticleDetailViewProps {
  post: BlogPost;
  currentLanguage: Language;
  courses: Course[];
  allPosts: BlogPost[];
  onBack: () => void;
  onSelectPost: (post: BlogPost) => void;
  onSelectCourse: (courseId: string) => void;
  onOpenRegister?: (course: Course) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  post,
  currentLanguage,
  courses,
  allPosts,
  onBack,
  onSelectPost,
  onSelectCourse,
}) => {
  const isSo = currentLanguage === 'so';
  const [copied, setCopied] = React.useState(false);

  const title = post.title || (isSo ? post.title_so : post.title_en) || '';
  const content = post.content || (isSo ? post.content_so : post.content_en) || '';
  const excerpt = post.excerpt || (isSo ? post.excerpt_so : post.excerpt_en) || '';
  const author = post.author || 'XirfadoNet Team';
  const readTime = post.readingTime || post.read_time || '7 daqiiqo';
  const date = post.date || post.publishedAt || '';
  const featuredImage = post.featuredImage || post.image;

  // Find related course if any (subtle)
  const relatedCourse = post.related_course_id
    ? courses.find((c) => c.course_id === post.related_course_id)
    : undefined;

  // Other related educational articles
  const otherArticles = allPosts
    .filter((p) => p.id !== post.id && p.slug !== post.slug)
    .slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch {
        // Fallback
      }
    }
  };

  // Helper to render markdown-like content blocks into rich HTML
  const renderContentBlocks = (rawText: string) => {
    if (!rawText) return null;

    const paragraphs = rawText.split(/\n\s*\n/);

    return paragraphs.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // H2 Heading: ## Title
      if (trimmed.startsWith('## ')) {
        const text = trimmed.replace(/^##\s+/, '');
        return (
          <h2
            key={idx}
            className="text-2xl sm:text-3xl font-bold text-slate-900 mt-8 mb-4 pt-4 border-t border-slate-100 first:border-0 first:pt-0"
          >
            {text}
          </h2>
        );
      }

      // H3 Heading: ### Title
      if (trimmed.startsWith('### ')) {
        const text = trimmed.replace(/^###\s+/, '');
        return (
          <h3
            key={idx}
            className="text-xl sm:text-2xl font-bold text-slate-800 mt-6 mb-3"
          >
            {text}
          </h3>
        );
      }

      // Blockquote: > Text
      if (trimmed.startsWith('> ')) {
        const quoteText = trimmed.replace(/^>\s*/gm, '');
        return (
          <blockquote
            key={idx}
            className="my-5 p-4 sm:p-5 bg-blue-50/70 border-l-4 border-blue-600 rounded-r-xl text-slate-800 italic text-base sm:text-lg"
          >
            {quoteText}
          </blockquote>
        );
      }

      // Bullet list block: lines starting with * or -
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const lines = trimmed.split('\n');
        return (
          <ul key={idx} className="my-4 space-y-2.5 pl-2">
            {lines.map((line, lIdx) => {
              const cleaned = line.replace(/^[\*\-]\s+/, '').trim();
              // parse **bold**
              const parts = cleaned.split(/(\*\*.*?\*\*)/g);
              return (
                <li key={lIdx} className="flex items-start gap-2.5 text-slate-700 text-base sm:text-lg leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-blue-600 mt-2.5 shrink-0" />
                  <span>
                    {parts.map((p, pIdx) => {
                      if (p.startsWith('**') && p.endsWith('**')) {
                        return (
                          <strong key={pIdx} className="font-bold text-slate-900">
                            {p.slice(2, -2)}
                          </strong>
                        );
                      }
                      return p;
                    })}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      }

      // Numbered list: lines starting with digits like 1. 2.
      if (/^\d+\.\s+/.test(trimmed)) {
        const lines = trimmed.split('\n');
        return (
          <ol key={idx} className="my-4 space-y-3 pl-2">
            {lines.map((line, lIdx) => {
              const match = line.match(/^(\d+)\.\s+(.*)$/);
              if (!match) {
                return (
                  <li key={lIdx} className="text-slate-700 text-base leading-relaxed">
                    {line}
                  </li>
                );
              }
              const num = match[1];
              const rest = match[2];
              const parts = rest.split(/(\*\*.*?\*\*)/g);

              return (
                <li key={lIdx} className="flex items-start gap-3 text-slate-700 text-base sm:text-lg leading-relaxed">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold shrink-0 mt-0.5">
                    {num}
                  </span>
                  <span>
                    {parts.map((p, pIdx) => {
                      if (p.startsWith('**') && p.endsWith('**')) {
                        return (
                          <strong key={pIdx} className="font-bold text-slate-900">
                            {p.slice(2, -2)}
                          </strong>
                        );
                      }
                      return p;
                    })}
                  </span>
                </li>
              );
            })}
          </ol>
        );
      }

      // Standard Paragraph with bold support
      const inlineParts = trimmed.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4">
          {inlineParts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-slate-900">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            id="btn-back-to-articles"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isSo ? 'Dib ugu noqo Maqaallada' : 'Back to Articles'}</span>
          </button>

          <button
            id="btn-share-article"
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? (isSo ? 'Waa la koobiyay! ✓' : 'Link Copied! ✓') : (isSo ? 'Wadaag' : 'Share')}</span>
          </button>
        </div>

        {/* Article Main Card */}
        <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-12">
          {/* Article Header & Metadata */}
          <div className="p-6 sm:p-10 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200/60 uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              {title}
            </h1>

            {/* Author and Date Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-sm text-slate-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  {author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <span>{author}</span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                <span>XirfadoNet Educational Guide</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {featuredImage && (
            <div className="w-full h-80 sm:h-[420px] overflow-hidden bg-slate-100 relative">
              <img
                src={featuredImage}
                alt={title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Article Body */}
          <div className="p-6 sm:p-12 space-y-6">
            {/* Excerpt Summary */}
            {excerpt && (
              <div className="p-6 bg-slate-50 border-l-4 border-blue-600 rounded-r-2xl text-slate-800 font-medium text-lg leading-relaxed shadow-sm">
                {excerpt}
              </div>
            )}

            {/* Table of Headings (if multiple) */}
            {post.headings && post.headings.length > 1 && (
              <div className="my-8 p-5 bg-slate-50/80 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>{isSo ? 'Tusmada Qodobada Maqaalka' : 'Table of Contents'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {post.headings.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {hIdx + 1}
                      </span>
                      <span className="line-clamp-1">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Parsed Content */}
            <div className="article-body">
              {renderContentBlocks(content)}
            </div>

            {/* Practical Checklist Box */}
            {post.checklist && post.checklist.length > 0 && (
              <div className="my-8 p-6 bg-blue-50/70 rounded-2xl border border-blue-200/80">
                <h4 className="text-base font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-blue-600" />
                  <span>{isSo ? 'Tallaabooyinka Ficilka Ah (Action Checklist)' : 'Action Checklist'}</span>
                </h4>
                <div className="space-y-2.5">
                  {post.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-slate-800 text-sm sm:text-base bg-white p-3 rounded-xl border border-blue-100">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Real World Example Box */}
            {post.example_cases && post.example_cases.length > 0 && (
              <div className="my-8 p-6 bg-amber-50/70 rounded-2xl border border-amber-200/80">
                <h4 className="text-base font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  <span>{isSo ? 'Tusaale Dhab ah & Xaalad Dhaqan Gashay' : 'Real-World Example'}</span>
                </h4>
                {post.example_cases.map((ex, idx) => (
                  <p key={idx} className="text-slate-800 text-sm sm:text-base leading-relaxed mb-2 last:mb-0">
                    {ex}
                  </p>
                ))}
              </div>
            )}
          </div>
        </article>

        {/* RELATED ARTICLES SECTION (Primary recommendation per instructions) */}
        {otherArticles.length > 0 && (
          <section className="mt-12 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <span>{isSo ? 'Maqaallo Kale oo Muhiim ah' : 'Related Educational Articles'}</span>
              </h2>
              <button
                onClick={onBack}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>{isSo ? 'Dhammaan Maqaallada' : 'View All'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherArticles.map((item) => (
                <div
                  key={item.id}
                  id={`related-article-${item.slug || item.id}`}
                  onClick={() => {
                    onSelectPost(item);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col group"
                >
                  <div className="h-44 overflow-hidden relative bg-slate-100">
                    <img
                      src={item.featuredImage || item.image}
                      alt={item.title || (isSo ? item.title_so : item.title_en)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 text-blue-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                        <span>{item.date || item.publishedAt}</span>
                        <span>•</span>
                        <span>{item.readingTime || item.read_time}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {item.title || (isSo ? item.title_so : item.title_en)}
                      </h3>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600">
                      <span>{isSo ? 'Akhri Maqaalka' : 'Read Article'}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SUBTLE, NON-INTRUSIVE RELATED COURSE LINK (At bottom, optional per instructions) */}
        {relatedCourse && (
          <div className="mt-8 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                {isSo ? 'Ma rabtaa tababar buuxa oo mawduucan ku saabsan?' : 'Looking for structured training on this topic?'}
              </span>
              <h4 className="text-base font-bold text-slate-900">
                {relatedCourse.title}
              </h4>
            </div>
            <button
              id={`btn-course-link-${relatedCourse.course_id}`}
              onClick={() => onSelectCourse(relatedCourse.course_id)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isSo ? 'Eeg Koorsada' : 'View Course'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
