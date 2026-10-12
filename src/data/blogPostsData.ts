import { BlogPost } from '../types.js';
import { articlesPart1 } from './articlesListPart1.js';
import { articlesPart2 } from './articlesListPart2.js';

export const initialBlogPosts: BlogPost[] = [
  ...articlesPart1,
  ...articlesPart2
];

export const getArticleBySlug = (slug: string): BlogPost | undefined => {
  return initialBlogPosts.find((p) => p.slug === slug || p.id === slug);
};
