export type Language = 'so' | 'en';

export type NavView =
  | 'home'
  | 'courses'
  | 'categories'
  | 'niches'
  | 'content-ideas'
  | 'views-hub'
  | 'online-work'
  | 'coaching'
  | 'blog'
  | 'reviews'
  | 'about'
  | 'contact'
  | 'support'
  | 'admin';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  status?: 'published' | 'draft';
  order?: number;
  is_active?: boolean;
  course_count?: number;
  created_at?: string;
}

export interface Course {
  course_id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  previous_price?: number;
  discount_percent?: number;
  currency: string;
  category: string;
  category_id?: string;
  duration?: string;
  image?: string;
  thumbnail?: string;
  target_audience?: string;
  learning_outcomes: string[];
  lessons: string[];
  requirements: string[];
  status: 'published' | 'draft' | 'archived';
  course_url: string;
  created_at: string;
  updated_at: string;
}

export type KnowledgeCategory =
  | 'help_article'
  | 'faq'
  | 'course_info'
  | 'registration'
  | 'youtube'
  | 'adsense'
  | 'payment_instructions'
  | 'policy'
  | 'general_support';

export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category: KnowledgeCategory;
  language: 'so' | 'en' | 'both';
  status: 'active' | 'draft';
  created_at: string;
  updated_at: string;
}

export interface ProblemTopic {
  id: string;
  title_so: string;
  title_en: string;
  category: string;
  prompt_starter_so: string;
  prompt_starter_en: string;
  icon?: string;
  is_active: boolean;
}

export interface PaymentMethodItem {
  id: string;
  provider: string; // e.g. EVC Plus, ZAAD, Sahal, Premier Bank, WorldRemit, etc.
  account_number: string;
  account_name: string;
  currency: string;
  instructions: string;
  type: 'somalia' | 'international';
}

export const SUPPORTED_PROBLEM_TYPES = [
  'YouTube Views',
  'YouTube Channel',
  'YouTube Settings',
  'YouTube Monetization',
  'Google AdSense',
  'AdSense PIN',
  'AdSense Verification',
  'Course Registration',
  'Login / Account',
  'Course Recommendation',
  'Payment Question',
  'Other Digital Problems',
  'Talk to Admin',
] as const;

export type ProblemCategory = (typeof SUPPORTED_PROBLEM_TYPES)[number];

export interface PaymentSettings {
  payment_number?: string;
  admin_whatsapp_number?: string; // Configurable by Admin separately - NEVER the same as payment number
  admin_contact_name?: string; // Admin contact name
  somalia_payment_number?: string;
  somalia_instructions: string;
  international_instructions: string;
  somalia_methods: PaymentMethodItem[];
  international_methods: PaymentMethodItem[];
  verification_instructions: string;
  support_phone: string;
  support_email: string;
  support_whatsapp_display: string;
}

export interface AiSettings {
  ai_welcome_message_so: string;
  ai_welcome_message_en: string;
  ai_tone: 'friendly_professional' | 'direct_technical' | 'educational';
  supported_languages: 'both' | 'so' | 'en';
  business_name: string;
  business_website: string;
  business_hours: string;
  support_rules: string;
  course_recommendation_enabled: boolean;
  admin_contact_phone: string;
  admin_contact_whatsapp: string;
  admin_contact_email: string;
}

export interface CustomerProfile {
  customer_id: string;
  id?: string;
  name: string;
  phone: string;
  email: string;
  preferred_language: Language;
  problem_category?: ProblemCategory | string;
  course_interest?: string;
  status?: 'lead' | 'contacted' | 'enrolled' | 'needs_help';
  notes?: string;
  conversation_history: string[];
  enrolled_courses?: string[];
  created_at: string;
  updated_at?: string;
}

export interface Message {
  id: string;
  sender: 'customer' | 'assistant' | 'admin' | 'system';
  content: string;
  timestamp: string;
  attachment_url?: string;
  attachment_type?: 'image';
  is_handoff_offer?: boolean;
  suggested_course_id?: string;
  suggested_course?: Course;
}

export type ConversationStatus =
  | 'open'
  | 'in_progress'
  | 'waiting_for_customer'
  | 'resolved'
  // Legacy / alias statuses
  | 'active'
  | 'needs_admin'
  | 'admin_active'
  | 'payment_proof_received'
  | 'payment_verified';

export interface Conversation {
  id: string;
  customer_id: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  channel: 'web' | 'whatsapp';
  status: ConversationStatus;
  problem_category?: ProblemCategory | string;
  ai_summary?: string;
  course_interest?: string;
  language: Language;
  messages: Message[];
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

export interface AdminStats {
  total_courses: number;
  published_courses: number;
  total_customers: number;
  total_conversations: number;
  conversations_needing_help: number;
  needs_admin_conversations?: number;
  courses_by_category?: { category: string; count: number }[];
}

export interface BlogPost {
  id: string;
  title?: string;
  title_so: string;
  title_en: string;
  slug: string;
  excerpt?: string;
  excerpt_so: string;
  excerpt_en: string;
  content?: string;
  content_so: string;
  content_en: string;
  category: string;
  author: string;
  read_time: string;
  readingTime?: string;
  date: string;
  publishedAt?: string;
  image: string;
  featuredImage?: string;
  published: boolean;
  related_course_id?: string;
  headings?: string[];
  bullet_points?: string[];
  example_cases?: string[];
  checklist?: string[];
  meta_description?: string;
}

export type Article = BlogPost;

export interface AiNicheIdea {
  id: string;
  name?: string;
  name_so?: string;
  title?: string;
  description?: string;
  description_so?: string;
  description_en?: string;
  example_video_ideas?: string[];
  suggested_platform?: string;
  content_format?: string;
  difficulty_level?: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  difficulty?: string;
  is_faceless_friendly?: boolean;
  ai_tools?: string[];
  tools_needed?: string[];
  category?: string;
  target_audience?: string;
  monetization_potential?: string;
  recommended_course_id?: string;
  cpm_tier?: string;
  cpm_potential?: string;
  why_it_works?: string;
  software_needed?: string[];
}
export type NicheRecommendation = AiNicheIdea;

export interface ContentIdea {
  id: string;
  hook: string;
  topic: string;
  title?: string;
  description?: string;
  short_explanation?: string;
  suggested_format?: string;
  target_format?: string;
  category?: string;
  suggested_ai_tools?: string[];
  niche?: string;
  target_audience?: string;
  structure?: string[];
  related_course_id?: string;
}
export type ViralContentIdea = ContentIdea;

export interface ViewsGuideTopic {
  id: string;
  title?: string;
  title_so?: string;
  title_en?: string;
  category?: string;
  key_metric?: string;
  core_concept?: string;
  summary_so?: string;
  summary_en?: string;
  action_steps?: string[];
  actionable_steps_so?: string[];
  actionable_steps_en?: string[];
  mistakes_to_avoid?: string[];
  common_mistakes_so?: string[];
  recommended_course_id?: string;
  related_course_id?: string;
}

export interface OnlineWorkTopic {
  id: string;
  title?: string;
  title_so?: string;
  title_en?: string;
  description?: string;
  tagline_so?: string;
  what_it_is_so?: string;
  how_it_works_so?: string;
  skills_needed_so?: string[];
  required_skills?: string[];
  beginner_steps_so?: string[];
  roadmap_steps?: string[];
  common_mistakes_so?: string[];
  tools_needed?: string[];
  course_id_help?: string;
  related_course_id?: string;
  earning_potential?: string;
  difficulty?: string;
}

export interface StudentReview {
  id: string;
  student_name: string;
  studentName?: string;
  name?: string;
  avatar_url?: string;
  photo?: string;
  course_id?: string;
  course?: string;
  course_name?: string;
  course_title?: string;
  review?: string;
  comment?: string;
  comment_so?: string;
  comment_en?: string;
  rating: number; // 1-5
  date?: string;
  created_at?: string;
  published: boolean;
  is_published?: boolean;
  verified: boolean;
  is_verified?: boolean;
  verified_student?: boolean;
  is_sample?: boolean;
  achievement?: string;
  outcome_highlight?: string;
  role_or_channel?: string;
}

export interface CoachingRequest {
  id: string;
  name?: string;
  student_name?: string;
  full_name?: string;
  phone?: string;
  phone_number?: string;
  email?: string;
  skill_topic?: string;
  skill_or_topic?: string;
  topic?: string;
  preferred_language?: Language;
  message?: string;
  experience_level?: string;
  preferred_time?: string;
  status: 'pending' | 'scheduled' | 'completed' | 'contacted' | string;
  created_at: string;
}

export interface CourseRegistration {
  id: string;
  name?: string;
  student_name?: string;
  full_name?: string;
  phone?: string;
  phone_number?: string;
  email?: string;
  course_id: string;
  course_title: string;
  course_price?: number;
  price?: number;
  currency?: string;
  payment_method?: string;
  payment_reference?: string;
  payment_number_used?: string;
  payment_proof_image?: string;
  payment_proof_text?: string;
  status: 'pending' | 'pending_payment' | 'proof_received' | 'payment_proof_received' | 'under_admin_review' | 'contacted' | 'enrolled' | 'verified' | 'cancelled' | string;
  notes?: string;
  created_at: string;
}
