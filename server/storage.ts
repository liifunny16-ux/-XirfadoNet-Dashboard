import fs from 'fs';
import path from 'path';
import {
  Course,
  Category,
  KnowledgeItem,
  ProblemTopic,
  PaymentSettings,
  AiSettings,
  CustomerProfile,
  Conversation,
  ConversationStatus,
  AdminStats,
  AiNicheIdea,
  ContentIdea,
  BlogPost,
  StudentReview,
  CoachingRequest,
  CourseRegistration,
  ViewsGuideTopic,
  OnlineWorkTopic,
} from '../src/types.js';
import { initialAiNiches } from '../src/data/nichesData.js';
import { initialContentIdeas } from '../src/data/contentIdeasData.js';
import { initialBlogPosts } from '../src/data/blogPostsData.js';
import { initialStudentReviews } from '../src/data/reviewsData.js';
import { initialViewsGuides } from '../src/data/viewsHubData.js';
import { initialOnlineWorkTopics } from '../src/data/onlineWorkData.js';

const DATA_DIR = path.join(process.cwd(), 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const COURSES_FILE = path.join(DATA_DIR, 'courses.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const KNOWLEDGE_FILE = path.join(DATA_DIR, 'knowledge.json');
const TOPICS_FILE = path.join(DATA_DIR, 'problem_topics.json');
const PAYMENT_SETTINGS_FILE = path.join(DATA_DIR, 'payment_settings.json');
const AI_SETTINGS_FILE = path.join(DATA_DIR, 'ai_settings.json');
const CUSTOMERS_FILE = path.join(DATA_DIR, 'customers.json');
const CONVERSATIONS_FILE = path.join(DATA_DIR, 'conversations.json');
const NICHES_FILE = path.join(DATA_DIR, 'niches.json');
const CONTENT_IDEAS_FILE = path.join(DATA_DIR, 'content_ideas.json');
const BLOG_POSTS_FILE = path.join(DATA_DIR, 'blog_posts.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');
const COACHING_REQUESTS_FILE = path.join(DATA_DIR, 'coaching_requests.json');
const COURSE_REGISTRATIONS_FILE = path.join(DATA_DIR, 'course_registrations.json');
const VIEWS_GUIDES_FILE = path.join(DATA_DIR, 'views_guides.json');
const ONLINE_WORK_FILE = path.join(DATA_DIR, 'online_work.json');

// Safe Read JSON
function readJson<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return fallback;
}

// Safe Write JSON
function writeJson<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// 1. Official Starter Categories (Connected to real courses)
export const initialCategories: Category[] = [
  {
    id: 'cat-yt',
    name: 'YouTube & Monetization',
    slug: 'youtube-monetization',
    description: 'Baro dhisidda kanaal YouTube oo guuleysta, algorithm-ka, content strategy, iyo monetization.',
    icon: 'Youtube',
    status: 'published',
    created_at: new Date('2025-01-01').toISOString(),
  },
  {
    id: 'cat-ai',
    name: 'AI & Automation',
    slug: 'ai-automation',
    description: 'Adeegso aaladaha AI iyo automation-ka casriga ah sida 3D Cartoons iyo Clipster si aad u kordhiso dakhligaaga.',
    icon: 'Cpu',
    status: 'published',
    created_at: new Date('2025-01-01').toISOString(),
  },
  {
    id: 'cat-video',
    name: 'Video Editing',
    slug: 'video-editing',
    description: 'Xirfadaha video editing-ka mobile-ka iyo heer sare (CapCut, Alight Motion, Football Highlights & Cinematic Edits).',
    icon: 'Film',
    status: 'published',
    created_at: new Date('2025-01-01').toISOString(),
  },
  {
    id: 'cat-ecommerce',
    name: 'E-commerce',
    slug: 'ecommerce',
    description: 'Shopify dropshipping, dhisidda dukaamo online ah, iyo iibinta alaabada caalamiga ah.',
    icon: 'ShoppingCart',
    status: 'published',
    created_at: new Date('2025-01-01').toISOString(),
  },
];

// 2. Exact Real Courses from XirfadoNet (Source of Truth)
export const initialCourses: Course[] = [
  {
    course_id: 'course-shorts-monetization',
    title: 'Shorts & Monetization 3 Weaks',
    slug: 'shorts-monetization-3-weaks',
    description: 'Koorsada ugu caansan ee barashada sida YouTube Shorts loogu abuuro views malaayiin ah loogana sameeyo dakhli degdeg ah 3 toddobaad gudahood.',
    price: 30,
    previous_price: 99,
    discount_percent: 70,
    currency: 'USD',
    category: 'YouTube & Monetization',
    category_id: 'cat-yt',
    duration: '3 Weaks',
    image: 'https://xirfadonet.com/wp-content/uploads/2026/07/45ECBB6B-5B78-4826-9D76-7E15CD42B50C.png',
    target_audience: 'Qof kasta oo raba inuu bilaabo ama kordhiyo views-ka kanaalka YouTube Shorts oo gaaro shuruudaha monetization.',
    learning_outcomes: [
      'YouTube Shorts',
      'Getting more views',
      'YouTube Shorts SEO',
      'YouTube algorithm',
      'Subscribers',
      'Monetization preparation',
      'Growth strategies',
      'Viral niche/video creation',
      'YouTube settings',
      'Views growth'
    ],
    lessons: [],
    requirements: ['Taleefan casri ah (Smartphone) ama Kombuyuutar', 'Ku xirnaan internet iyo furashada akoonka YouTube'],
    status: 'published',
    course_url: 'https://xirfadonet.com/courses/new-course-2/',
    created_at: new Date('2025-01-10').toISOString(),
    updated_at: new Date('2026-02-15').toISOString(),
  },
  {
    course_id: 'course-football-editing',
    title: 'FOOTBALL EDITING MASTERCLASS (Mobile)',
    slug: 'football-editing-masterclass',
    description: 'Baro sida taleefankaaga loogu habeeyo muuqaallada kubadda cagta ee tayada sare leh adigoo isticmaalaya CapCut iyo Alight Motion. Waxaad baranaysaa keyframes, velocity edits, beat syncing, transitions, camera shakes, effects, cinematic color correction, iyo sida loogu sameeyo content viral ah TikTok, Shorts, iyo Reels.',
    price: 10,
    previous_price: 30,
    discount_percent: 67,
    currency: 'USD',
    category: 'Video Editing',
    category_id: 'cat-video',
    duration: '4 Saacadood',
    image: 'https://xirfadonet.com/wp-content/uploads/2026/08/8AEEC973-B375-43F5-A171-F7694BD8CB64.png',
    target_audience: 'Dhalinyarada xiiseeya kubadda cagta ee doonaya inay taleefankooda ku abuuraan clips, highlights, iyo edits tayo sare leh oo viral noqda.',
    learning_outcomes: [
      'Football video editing on mobile (Taleefanka gacanta)',
      'CapCut Mobile: Beat Syncing, Cut & Timeline management',
      'Alight Motion: Keyframes, Velocity graphs & Speed ramping',
      'Dynamic transitions, camera shakes & glow effects',
      'Cinematic football edits & color correction on mobile',
      'TikTok, YouTube Shorts & Instagram Reels viral packaging',
      'Sound design & crowd audio layering',
      'Sourcing 1080p/4K clips & avoiding pixelated edits',
      'Quality export settings (1080p / 60fps) for crisp mobile playback'
    ],
    lessons: [
      '1. Hordhaca Football Editing-ka Mobile-ka (CapCut & Alight Motion)',
      '2. Sida loo helo clips 4K/1080p ah oo aan pixelated ahayn',
      '3. Beat Matching & Timeline cutting ee CapCut',
      '4. Keyframes & Velocity curves ee Alight Motion',
      '5. Camera Shakes, Glows, iyo Cinematic Effects',
      '6. Color Correction & Sharpness settings',
      '7. Sound Design: Dhawaaqa laadadka, garoonka, iyo bass boost',
      '8. Export Settings (1080p/60fps) iyo soo gelinta TikTok/Shorts'
    ],
    requirements: [
      'Taleefan casri ah (Android ama iPhone)',
      'Barnaamijyada CapCut iyo Alight Motion (Bilaash)'
    ],
    status: 'published',
    course_url: 'https://xirfadonet.com/courses/football-editing-masterclass/',
    created_at: new Date('2025-01-15').toISOString(),
    updated_at: new Date('2026-03-01').toISOString(),
  },
  {
    course_id: 'course-clipster-income',
    title: 'Sida Loo Shaqeeyo Clipster & Sida Lacag Loo Kasbado',
    slug: 'sida-loo-shaqeeyo-clipster-sida-lacag-loo-kasbado',
    description: 'Hagaha dhabta ah ee barashada shaqada Clipster, sida loogu shaqeeyo loona helo dakhli joogto ah adigoo internet-ka jooga.',
    price: 18,
    previous_price: 45,
    discount_percent: 60,
    currency: 'USD',
    category: 'AI & Automation',
    category_id: 'cat-ai',
    duration: '5 Saacadood',
    image: 'https://xirfadonet.com/wp-content/uploads/2026/07/24CC1052-3BC2-4FAE-93A1-903B8BABF95A.png',
    target_audience: 'Qof kasta oo doonaya inuu lacag ka sameeyo video clipping iyo shaqooyinka Clipster.',
    learning_outcomes: [
      'Clipster account',
      'Campaigns',
      'Choosing campaigns',
      'Creating clipping videos',
      'TikTok/Shorts/Reels',
      'Submission',
      'Avoiding common mistakes',
      'Growing views and earning potential'
    ],
    lessons: [],
    requirements: ['Kombuyuutar ama taleefan leh internet deggan'],
    status: 'published',
    course_url: 'https://xirfadonet.com/courses/sida-loo-shaqeeyo-clipster-sida-lacag-loo-kasbado/',
    created_at: new Date('2025-02-01').toISOString(),
    updated_at: new Date('2026-02-20').toISOString(),
  },
  {
    course_id: 'course-shopify-dropshipping',
    title: 'Shopify Dropshipping Masterclass 2026: Complete A–Z Course',
    slug: 'shopify-dropshipping-masterclass-2026-complete-az-course',
    description: 'Baro sida loo dhiso dukaan Shopify oo casri ah, loona helo alaabada guuleysta (Winning Products), loona sameeyo xayeysiis iib keena.',
    price: 25,
    previous_price: 40,
    discount_percent: 38,
    currency: 'USD',
    category: 'E-commerce',
    category_id: 'cat-ecommerce',
    duration: '8 Saacadood',
    image: 'https://xirfadonet.com/wp-content/uploads/2026/07/C6F2DEC9-2FD8-4434-8E3C-8D9CBC3D0349.png',
    target_audience: 'Ganacsatada iyo dhalinyarada doonaya inay ganacsi caalami ah oo e-commerce ah ka bilaabaan meel kasta.',
    learning_outcomes: [
      'Shopify store',
      'Winning products',
      'Suppliers',
      'Payment gateways',
      'Store design',
      'Product research',
      'Product listings',
      'TikTok/Facebook Ads',
      'Store optimization',
      'Scaling'
    ],
    lessons: [],
    requirements: ['Kombuyuutar iyo internet leh xawaare wanaagsan'],
    status: 'published',
    course_url: 'https://xirfadonet.com/courses/shopify-dropshipping-masterclass-2026-complete-az-course/',
    created_at: new Date('2025-02-05').toISOString(),
    updated_at: new Date('2026-02-22').toISOString(),
  },
  {
    course_id: 'course-yt-automation',
    title: 'Youtube Automation course',
    slug: 'youtube-automation-course',
    description: 'Sida loo abuuro kanaallo YouTube oo wajigaaga aan la arkeyn (Faceless YouTube Channels) adigoo adeegsanaya qalabka AI iyo nidaamyo automated ah.',
    price: 14,
    previous_price: 25,
    discount_percent: 44,
    currency: 'USD',
    category: 'YouTube & Monetization',
    category_id: 'cat-yt',
    duration: '6 Saacadood',
    image: 'https://xirfadonet.com/wp-content/uploads/2026/02/5147798_5faa.webp',
    target_audience: 'Qof kasta oo raba inuu yeesho kanaal YouTube bilaa waji ah oo dakhli joogto ah kasoo xereeyo.',
    learning_outcomes: [
      'YouTube Automation',
      'Niche selection',
      'Viral video ideas',
      'Scripts',
      'AI video creation',
      'Thumbnails',
      'YouTube SEO',
      'Faceless channels',
      'Channel growth'
    ],
    lessons: [],
    requirements: ['Kombuyuutar iyo internet'],
    status: 'published',
    course_url: 'https://xirfadonet.com/courses/youtube-automation-course/',
    created_at: new Date('2025-02-10').toISOString(),
    updated_at: new Date('2026-02-25').toISOString(),
  },
  {
    course_id: 'course-automation-cartoons-3d',
    title: 'Automation cartoons 3d Course',
    slug: 'automation-cartoons-3d-course',
    description: 'Baro sida loo sameeyo animations iyo cartoons 3D ah oo loogu talagalay carruurta ama sheekooyinka iyadoo la adeegsanayo aaladaha casriga ah.',
    price: 12,
    previous_price: 20,
    discount_percent: 40,
    currency: 'USD',
    category: 'AI & Automation',
    category_id: 'cat-ai',
    duration: '5 Saacadood',
    image: 'https://xirfadonet.com/wp-content/uploads/2026/03/Whisk_02259a0a98c272698b545074837d4e1edr.jpeg',
    target_audience: 'Kuwa doonaya inay bilaabaan kanaal YouTube oo animation/cartoons ah.',
    learning_outcomes: [
      'Cartoon automation',
      'Viral cartoon ideas',
      '3D characters',
      'Story writing',
      'AI animation tools',
      'Automated cartoon videos',
      'Thumbnails/titles',
      'Views/subscribers'
    ],
    lessons: [],
    requirements: ['Kombuyuutar leh awood dhexdhexaad ah'],
    status: 'published',
    course_url: 'https://xirfadonet.com/courses/automation-cartoons-3d-course/',
    created_at: new Date('2025-02-12').toISOString(),
    updated_at: new Date('2026-02-26').toISOString(),
  },
  {
    course_id: 'course-fb-automation',
    title: 'Baro Facebook Automation & Passive Income',
    slug: 'baro-facebook-automation',
    description: 'Baro sida loo sameeyo Facebook automation.',
    price: 15,
    previous_price: 25,
    discount_percent: 40,
    currency: 'USD',
    category: 'AI & Automation',
    category_id: 'cat-ai',
    duration: '4 Saacadood',
    image: 'https://xirfadonet.com/wp-content/uploads/2026/03/fb_auto.jpeg',
    target_audience: 'Qof kasta oo raba inuu dakhli ka sameeyo Facebook pages.',
    learning_outcomes: [
      'Facebook pages',
      'Facebook automation',
      'Content scheduling',
      'Auto posting',
      'Monetization strategies',
      'Affiliate marketing',
      'Digital products',
      'Followers and engagement',
      'Facebook insights',
      'Scaling'
    ],
    lessons: [],
    requirements: ['Kombuyuutar leh internet'],
    status: 'published',
    course_url: 'https://xirfadonet.com/courses/baro-facebook-automation/',
    created_at: new Date('2025-03-01').toISOString(),
    updated_at: new Date('2026-03-01').toISOString(),
  },
  {
    course_id: 'course-payoneer-account',
    title: 'Baro Sida Loo Sameeyo Payoneer Account & Lacag U Qaadasho (Step-by-Step 2026)',
    slug: 'payoneer-account-step-by-step',
    description: 'Sida loo sameysto Payoneer account si rasmi ah.',
    price: 9,
    previous_price: 15,
    discount_percent: 40,
    currency: 'USD',
    category: 'E-commerce',
    category_id: 'cat-ecommerce',
    duration: '2 Saacadood',
    image: 'https://xirfadonet.com/wp-content/uploads/2026/03/payoneer.jpeg',
    target_audience: 'Freelancers iyo ganacsatada online-ka.',
    learning_outcomes: [
      'Payoneer account creation',
      'Verification',
      'Connecting payment methods',
      'Receiving money',
      'Common errors',
      'Security',
      'Freelance payment use'
    ],
    lessons: [],
    requirements: ['ID card ama Passport'],
    status: 'published',
    course_url: 'https://xirfadonet.com/courses/payoneer-account/',
    created_at: new Date('2025-03-05').toISOString(),
    updated_at: new Date('2026-03-05').toISOString(),
  },
  {
    course_id: 'course-memo-coin',
    title: 'Sida loo sameyo memo coin course',
    slug: 'sida-loo-sameyo-memo-coin-course',
    description: 'Sida loo sameeyo meme coin laguna xiro blockchain.',
    price: 11,
    previous_price: 20,
    discount_percent: 45,
    currency: 'USD',
    category: 'AI & Automation',
    category_id: 'cat-ai',
    duration: '3 Saacadood',
    image: 'https://xirfadonet.com/wp-content/uploads/2026/03/meme_coin.jpeg',
    target_audience: 'Xiiseeyayaasha Crypto.',
    learning_outcomes: [
      'Pump.fun',
      'Meme coin creation',
      'Coin name/logo',
      'Coin information',
      'Launch process',
      'Crypto tools',
      'Risk considerations'
    ],
    lessons: [],
    requirements: ['Internet'],
    status: 'published',
    course_url: 'https://xirfadonet.com/courses/memo-coin-course/',
    created_at: new Date('2025-03-10').toISOString(),
    updated_at: new Date('2026-03-10').toISOString(),
  },
  {
    course_id: 'course-meme-trading',
    title: 'Meme Coins Trading Masterclass',
    slug: 'meme-coins-trading-masterclass',
    description: 'Masterclass ku saabsan ka ganacsiga meme coins-ka.',
    price: 0,
    previous_price: 0,
    discount_percent: 0,
    currency: 'USD',
    category: 'AI & Automation',
    category_id: 'cat-ai',
    duration: '2 Saacadood',
    image: 'https://xirfadonet.com/wp-content/uploads/2026/03/meme_trading.jpeg',
    target_audience: 'Qof kasta.',
    learning_outcomes: [
      'Meme coin trading',
      'Crypto analysis'
    ],
    lessons: [],
    requirements: [],
    status: 'published',
    course_url: 'https://xirfadonet.com/courses/meme-coins-trading/',
    created_at: new Date('2025-03-15').toISOString(),
    updated_at: new Date('2026-03-15').toISOString(),
  }
];

// 3. Dynamic Problem Topics for AI Support (13 Supported Types)
export const initialProblemTopics: ProblemTopic[] = [
  {
    id: 'topic-yt-views',
    title_so: 'YouTube Views Problem',
    title_en: 'YouTube Views Problem',
    category: 'YouTube Views',
    prompt_starter_so: 'Muuqaalladayda YouTube-ka views badan ma helaan, sideen u kordhin karaa?',
    prompt_starter_en: 'My YouTube videos are not getting views. How can I fix this?',
    icon: 'Eye',
    is_active: true,
  },
  {
    id: 'topic-yt-channel',
    title_so: 'YouTube Channel Problem',
    title_en: 'YouTube Channel Problem',
    category: 'YouTube Channel',
    prompt_starter_so: 'Kanaalkeyga YouTube ayaa dhibaato farsamo ama copyright heysataa.',
    prompt_starter_en: 'My YouTube channel is facing technical or copyright issues.',
    icon: 'Tv',
    is_active: true,
  },
  {
    id: 'topic-yt-settings',
    title_so: 'YouTube Settings Problem',
    title_en: 'YouTube Settings Problem',
    category: 'YouTube Settings',
    prompt_starter_so: 'My YouTube settings are wrong / Waxaan rabaa inaan hagaajiyo settings-ka kanaalkeyga.',
    prompt_starter_en: 'My YouTube settings are wrong. I need help configuring them properly.',
    icon: 'Sliders',
    is_active: true,
  },
  {
    id: 'topic-yt-monetization',
    title_so: 'YouTube Monetization',
    title_en: 'YouTube Monetization',
    category: 'YouTube Monetization',
    prompt_starter_so: 'Waxaan rabaa inaan ogaado sida loo gaaro shuruudaha dakhliga YouTube (Monetization).',
    prompt_starter_en: 'How do I reach YouTube monetization requirements and fix monetization issues?',
    icon: 'DollarSign',
    is_active: true,
  },
  {
    id: 'topic-adsense',
    title_so: 'Google AdSense Problem',
    title_en: 'Google AdSense Problem',
    category: 'Google AdSense',
    prompt_starter_so: 'Akoonkayga Google AdSense ma shaqeynayo ama qalad ayaa ka muuqda.',
    prompt_starter_en: 'My Google AdSense has an error or issue.',
    icon: 'ShieldAlert',
    is_active: true,
  },
  {
    id: 'topic-adsense-pin',
    title_so: 'AdSense PIN Problem',
    title_en: 'AdSense PIN Problem',
    category: 'AdSense PIN',
    prompt_starter_so: 'AdSense PIN ayaan ku dhibtoonayaa, ma iima imaanin.',
    prompt_starter_en: 'I am struggling with my AdSense PIN verification. It has not arrived.',
    icon: 'Key',
    is_active: true,
  },
  {
    id: 'topic-adsense-verif',
    title_so: 'AdSense Verification',
    title_en: 'AdSense Verification',
    category: 'AdSense Verification',
    prompt_starter_so: 'Sideen u xaqiijiyaa cinwaankeyga iyo aqoonsigayga AdSense?',
    prompt_starter_en: 'How do I complete identity and address verification in AdSense?',
    icon: 'CheckCircle',
    is_active: true,
  },
  {
    id: 'topic-course-reg',
    title_so: 'Course Registration Problem',
    title_en: 'Course Registration Problem',
    category: 'Course Registration',
    prompt_starter_so: 'Sidee isku diiwaangeliyaa course-ka? Tallaabo tallaabo iigu sharax.',
    prompt_starter_en: 'How do I register for a course? Please guide me step-by-step.',
    icon: 'GraduationCap',
    is_active: true,
  },
  {
    id: 'topic-login',
    title_so: 'Login / Account Problem',
    title_en: 'Login / Account Problem',
    category: 'Login / Account',
    prompt_starter_so: 'Password-kayga waan ilaaway / Ma geli karo akoonka.',
    prompt_starter_en: 'I forgot my password or cannot access my account.',
    icon: 'Lock',
    is_active: true,
  },
  {
    id: 'topic-recommendation',
    title_so: 'Course Recommendation',
    title_en: 'Course Recommendation',
    category: 'Course Recommendation',
    prompt_starter_so: 'Waxaan rabaa inaan barto xirfad online ah, koorsadee ayaa iigu habboon?',
    prompt_starter_en: 'I want to learn an online digital skill. Which course is best suited for me?',
    icon: 'Compass',
    is_active: true,
  },
  {
    id: 'topic-payment',
    title_so: 'Payment Question',
    title_en: 'Payment Question',
    category: 'Payment Question',
    prompt_starter_so: 'Waan rabaa inaan iibsado, sidee loo bixiyaa lacagta?',
    prompt_starter_en: 'I want to buy, how do I make the payment?',
    icon: 'CreditCard',
    is_active: true,
  },
  {
    id: 'topic-other',
    title_so: 'Other Digital Problems',
    title_en: 'Other Digital Problems',
    category: 'Other Digital Problems',
    prompt_starter_so: 'Waxaan qabaa dhibaato kale oo digital ah oo xal u baahan.',
    prompt_starter_en: 'I have another digital or online business problem.',
    icon: 'HelpCircle',
    is_active: true,
  },
  {
    id: 'topic-talk-to-admin',
    title_so: 'Talk to Admin (Maamulka)',
    title_en: 'Talk to Admin',
    category: 'Talk to Admin',
    prompt_starter_so: 'Waxaan rabaa inaan la hadlo maamulka XirfadoNet.',
    prompt_starter_en: 'I want to speak with XirfadoNet human management.',
    icon: 'Headphones',
    is_active: true,
  },
];

// 4. Initial AI Settings (Configurable in Admin)
export const initialAiSettings: AiSettings = {
  ai_welcome_message_so: 'Ku soo dhawoow XirfadoNet 👋! Waxaan ahay AI Caawiyaha rasmiga ah ee XirfadoNet. Sideen maanta kuugu caawin karaa?',
  ai_welcome_message_en: 'Welcome to XirfadoNet 👋! I am the official XirfadoNet AI Support Assistant. How can I help you today?',
  ai_tone: 'friendly_professional',
  supported_languages: 'both',
  business_name: 'XirfadoNet',
  business_website: 'https://xirfadonet.com',
  business_hours: '24/7 AI Troubleshooting & Daily Admin Review',
  support_rules: `1. Always prioritize diagnosing and helping the customer solve their problem before recommending any course.
2. Never promise guaranteed YouTube views, retention, or AdSense approvals.
3. For payment requests: ask "Ma Somalia ayaad joogtaa?". If yes, give official number +252615941664 for manual transfer. If no, direct them to contact management.
4. If AdSense or YouTube issues require account access or human review, offer admin handoff immediately.
5. Only recommend real courses present in the official database.`,
  course_recommendation_enabled: true,
  admin_contact_phone: '+252711870601',
  admin_contact_whatsapp: '+252711870601',
  admin_contact_email: 'support@xirfadonet.com',
};

// 5. Initial Payment Settings (Owner configures in Admin)
export const initialPaymentSettings: PaymentSettings = {
  payment_number: '+252615941664',
  admin_whatsapp_number: '+252711870601',
  somalia_payment_number: '+252615941664',
  somalia_instructions: `Waad ku mahadsan tahay. Lacagta waxaad si toos ah ugu diri kartaa lambarka lacag-bixinta gacanta ee XirfadoNet: +252615941664. Markaad lacagta dirto, fadlan rasiidka u soo dir maamulka si ay kuu xaqiijiyaan.`,
  international_instructions: `Fadlan la xiriir maamulka XirfadoNet si laguu siiyo habka lacag bixinta ee dalkaaga.`,
  somalia_methods: [
    {
      id: 'pay-evc',
      provider: 'EVC Plus (Hormuud)',
      account_number: '+252615941664',
      account_name: 'XirfadoNet Official',
      currency: 'USD',
      instructions: '*712*615941664*LACAGTA# kadibna rasiidka u soo dir maamulka WhatsApp-ka',
      type: 'somalia',
    },
    {
      id: 'pay-zaad',
      provider: 'ZAAD Service (Telesom)',
      account_number: '+252615941664',
      account_name: 'XirfadoNet Official',
      currency: 'USD',
      instructions: '*880*615941664*LACAGTA# kadibna rasiidka u soo dir maamulka',
      type: 'somalia',
    },
    {
      id: 'pay-sahal',
      provider: 'Sahal Service (Golis)',
      account_number: '+252615941664',
      account_name: 'XirfadoNet Official',
      currency: 'USD',
      instructions: '*801*615941664*LACAGTA# kadibna rasiidka u soo dir maamulka',
      type: 'somalia',
    },
  ],
  international_methods: [
    {
      id: 'pay-international-contact',
      provider: 'La Xiriir Maamulka (Direct Support)',
      account_number: 'Contact Management',
      account_name: 'XirfadoNet Admin',
      currency: 'USD',
      instructions: 'Fadlan la xiriir maamulka XirfadoNet si laguu siiyo habka lacag bixinta ee dalkaaga.',
      type: 'international',
    },
  ],
  verification_instructions: `Ogeysiis: Nidaamka lacag-bixintu waa mid gacanta ah (Manual). AI ma qabto lacag mana xaqiijiyo si toos ah. Markaad lacagta dirto, rasiidka u dir maamulka XirfadoNet si ay gacanta ugu xaqiijiyaan kuuna furaan koorsadaada.`,
  support_phone: '+252711870601',
  support_email: 'support@xirfadonet.com',
  support_whatsapp_display: 'Maamulka XirfadoNet',
};

// 5. Initial Knowledge Base
export const initialKnowledge: KnowledgeItem[] = [
  {
    id: 'kb-yt-views-01',
    title: 'Xallinta Dhibaatada Views-ka Yar ee YouTube (YouTube Low Views Troubleshooting)',
    content: `Dhibaatada views-ka yar ee YouTube waxay inta badan ka timaadaa arrimahan:
1. Click-Through Rate (CTR) oo hooseeya: Dadka muuqaalkaaga arkay ma riixaan. Xalku waa Thumbnail aad u cad oo xiiso leh iyo Cinwaan (Title) kooban oo toos ah (ka yar 60 xaraf).
2. Audience Retention (Muddada daawashada): Haddii dadku 30-ka ilbiriqsi ee hore ka baxaan muuqaalka, YouTube ma siinayo dhiirigelin (recommendation). Bilowga muuqaalka waa inuu toos u galaa mawduuca (Hook), lagana fogaado horudhac dheer oo caajis ah.
3. Shorts vs Long-form: Shorts-ka waxay u baahan yihiin hook 3-da ilbiriqsi ee hore iyo loop video ah.
4. Tallaabooyinka lagu ogaanayo: Gal YouTube Studio > Analytics > Reach > Hubi Impressions iyo CTR. Haddii CTR ka yar yahay 4%, beddel Thumbnail-ka iyo Title-ka.
Haddii aad rabto inaad si xirfadaysan u barato, koorsada "Shorts & Monetization" ama "YouTube Automation" ee XirfadoNet ayaa si qoto dheer kuu baraya.`,
    category: 'youtube',
    language: 'both',
    status: 'active',
    created_at: new Date('2025-01-10').toISOString(),
    updated_at: new Date('2026-02-10').toISOString(),
  },
  {
    id: 'kb-adsense-pin-02',
    title: 'AdSense PIN & Address Verification Troubleshooting',
    content: `Google AdSense wuxuu soo diraa warqadda PIN-ka marka dakhligaagu gaaro $10 (verification threshold).
Tallaabooyinka xallinta:
1. Xilliga sugitaanka: PIN-ku wuxuu qaataa inta badan 2 ilaa 4 toddobaad.
2. Haddii uusan ku soo gaarin: Waxaad codsan kartaa PIN cusub (Resend PIN) ilaa 3 jeer, iyadoo u dhexeyso 3 toddobaad codsi kasta.
3. Caddeynta gacanta (Manual Verification / Document ID): Haddii 3 jeer aad codsatay oo uusan ku soo gaarin, AdSense wuxuu kuu furayaa "AdSense Troubleshooter" foom aad ku soo gelin karto baasaboorkaaga ama kaarka aqoonsiga si cinwaanka loogu caddeeyo.
4. Canshuuraha (US Tax): Xusuusnow inaad buuxiso foomka W-8BEN si cashuur dheeraad ah looga goyn dakhligaaga caalamiga ah.
5. Haddii aad caawinaad dheeraad ah uga baahan tahay AdSense, waxaad la xiriiri kartaa maamulka XirfadoNet.`,
    category: 'adsense',
    language: 'both',
    status: 'active',
    created_at: new Date('2025-01-12').toISOString(),
    updated_at: new Date('2026-02-12').toISOString(),
  },
  {
    id: 'kb-reg-steps-03',
    title: 'Sida Loogu Diiwaangeliyo Koorsooyinka XirfadoNet (How to Register)',
    content: `Diiwaangelinta koorsooyinka XirfadoNet waxay u socotaa tallaabooyinkan fudud:
1. Fur bogga rasmiga ah ee XirfadoNet (xirfadonet.com).
2. Guji qaybta "Courses" ama koorsada aad rabto liiska koorsooyinka.
3. Riix "Eeg Koorsada" si aad u aragto qiimaha, casharrada, iyo waxaad baraneyso.
4. Riix badhanka "Diiwaangeli" ama la hadal AI Caawiyaha.
5. Xul habka lacag-bixinta gacanta ah (Somalia: EVC, ZAAD, Sahal, Bangi; Dibadda: Remitly, WorldRemit, Sendwave).
6. U dir rasiidka maamulka si degdeg ah loogu furo akoonkaaga koorsada.
Haddii aad meel ku xayiranto, weydii AI Support ama riix "La Hadal Maamulka".`,
    category: 'registration',
    language: 'both',
    status: 'active',
    created_at: new Date('2025-01-14').toISOString(),
    updated_at: new Date('2026-02-14').toISOString(),
  },
  {
    id: 'kb-payment-manual-04',
    title: 'Tilmaamaha Lacag Bixinta Gacanta ah (Manual Payment Workflow)',
    content: `XirfadoNet waxay ku shaqaysaa nidaam lacag-bixin gacanta ah oo toos ah (Manual Payment Flow):
1. Macmiilku marka uu doorto koorsada, AI wuxuu weydiinayaa: "Ma Somalia ayaad joogtaa?"
2. Haddii HAA tahay: Waxaa la siinayaa tilmaamaha xawaaladaha maxalliga ah ee milkiilaha.
3. Haddii DIBADDA tahay: Waxaa la siinayaa tilmaamaha caalamiga ah.
4. Macmiilku lacagta toos ayuu ugu dirayaa milkiilaha.
5. Macmiilku wuxuu soo dirayaa rasiidka/tixraaca lacag-bixinta.
6. Milkiilaha XirfadoNet ayaa gacanta ku xaqiijinaya lacagta kadibna siinaya galitaanka koorsada (Course Access).
Digniin: AI ma hayo mana xakameeyo lacagta.`,
    category: 'payment_instructions',
    language: 'both',
    status: 'active',
    created_at: new Date('2025-01-15').toISOString(),
    updated_at: new Date('2026-02-15').toISOString(),
  },
  {
    id: 'kb-policy-05',
    title: 'Xeerarka & Siyaasadda XirfadoNet (XirfadoNet Policies)',
    content: `1. Helitaanka Koorsada: Marka lacag-bixinta la xaqiijiyo, ardaygu wuxuu helayaa Lifetime Access dhammaan casharrada koorsada.
2. Taageerada Ardayda: Arday kasta wuxuu xaq u leeyahay inuu helo caawimaad toos ah iyo jawaab celin maamulka XirfadoNet.
3. Xuquuqda Daabacaadda: Dhammaan casharrada XirfadoNet waa hanti dhowran, loomana ogola in dib loo iibiyo ama lala wadaago qof aan is-diiwaangelin.
4. Handoff Maamul: Haddii ardaygu dhibaato farsamo la kulmo oo AI uusan xallin karin, maamulka ayaa toos ula hadlaya.`,
    category: 'policy',
    language: 'both',
    status: 'active',
    created_at: new Date('2025-01-16').toISOString(),
    updated_at: new Date('2026-02-16').toISOString(),
  },
  {
    id: 'kb-faq-06',
    title: 'Su\'aalaha Badanaa La Isweydiiyo (Frequently Asked Questions)',
    content: `S: Koorsooyinka ma toos baa mise waa duuban yihiin?
J: Koorsooyinka XirfadoNet waa casharro video ah oo tayo sare leh oo horay loo duubay, waxaadna daawan kartaa wakhti kasta oo kugu habboon.

S: Ma heli karaa shahaado marka aan dhammeeyo?
J: Haa, dhammaan ardayda dhammeysa koorsada waxay helayaan shahaadada XirfadoNet.

S: Haddii aan wax fahmi waayo sideen u helaa caawimaad?
J: Waxaad si toos ah ula hadli kartaa AI Support Assistant ama waxaad la xiriiri kartaa maamulka XirfadoNet.`,
    category: 'faq',
    language: 'both',
    status: 'active',
    created_at: new Date('2025-01-18').toISOString(),
    updated_at: new Date('2026-02-18').toISOString(),
  },
];

class StorageService {
  private courses: Course[];
  private categories: Category[];
  private knowledge: KnowledgeItem[];
  private problemTopics: ProblemTopic[];
  private paymentSettings: PaymentSettings;
  private aiSettings: AiSettings;
  private customers: CustomerProfile[];
  private conversations: Conversation[];
  private niches: AiNicheIdea[];
  private contentIdeas: ContentIdea[];
  private blogPosts: BlogPost[];
  private reviews: StudentReview[];
  private coachingRequests: CoachingRequest[];
  private courseRegistrations: CourseRegistration[];
  private viewsGuides: ViewsGuideTopic[];
  private onlineWorkTopics: OnlineWorkTopic[];

  constructor() {
    // Always load real XirfadoNet courses if empty or outdated
    const loadedCourses = readJson<Course[]>(COURSES_FILE, []);
    if (!loadedCourses || loadedCourses.length === 0 || !loadedCourses.some(c => c.course_id === 'course-shorts-monetization')) {
      this.courses = initialCourses;
      writeJson(COURSES_FILE, this.courses);
    } else {
      this.courses = loadedCourses;
    }

    // Categories
    const loadedCategories = readJson<Category[]>(CATEGORIES_FILE, []);
    if (!loadedCategories || loadedCategories.length === 0) {
      this.categories = initialCategories;
      writeJson(CATEGORIES_FILE, this.categories);
    } else {
      this.categories = loadedCategories;
    }

    // Knowledge
    const loadedKnowledge = readJson<KnowledgeItem[]>(KNOWLEDGE_FILE, []);
    if (!loadedKnowledge || loadedKnowledge.length === 0) {
      this.knowledge = initialKnowledge;
      writeJson(KNOWLEDGE_FILE, this.knowledge);
    } else {
      this.knowledge = loadedKnowledge;
    }

    // Problem Topics
    const loadedTopics = readJson<ProblemTopic[]>(TOPICS_FILE, []);
    if (!loadedTopics || loadedTopics.length === 0) {
      this.problemTopics = initialProblemTopics;
      writeJson(TOPICS_FILE, this.problemTopics);
    } else {
      this.problemTopics = loadedTopics;
    }

    // Payment Settings
    const loadedPayment = readJson<PaymentSettings | null>(PAYMENT_SETTINGS_FILE, null);
    if (!loadedPayment) {
      this.paymentSettings = initialPaymentSettings;
      writeJson(PAYMENT_SETTINGS_FILE, this.paymentSettings);
    } else {
      this.paymentSettings = {
        ...initialPaymentSettings,
        ...loadedPayment,
        payment_number: loadedPayment.payment_number || '+252615941664',
        admin_whatsapp_number: loadedPayment.admin_whatsapp_number || '+252711870601',
      };
    }

    // AI Settings
    const loadedAiSettings = readJson<AiSettings | null>(AI_SETTINGS_FILE, null);
    if (!loadedAiSettings) {
      this.aiSettings = initialAiSettings;
      writeJson(AI_SETTINGS_FILE, this.aiSettings);
    } else {
      this.aiSettings = loadedAiSettings;
    }

    this.customers = readJson<CustomerProfile[]>(CUSTOMERS_FILE, []);
    this.conversations = readJson<Conversation[]>(CONVERSATIONS_FILE, []);

    // Niches
    const loadedNiches = readJson<AiNicheIdea[]>(NICHES_FILE, []);
    if (!loadedNiches || loadedNiches.length === 0) {
      this.niches = initialAiNiches;
      writeJson(NICHES_FILE, this.niches);
    } else {
      this.niches = loadedNiches;
    }

    // Content Ideas
    const loadedContentIdeas = readJson<ContentIdea[]>(CONTENT_IDEAS_FILE, []);
    if (!loadedContentIdeas || loadedContentIdeas.length === 0) {
      this.contentIdeas = initialContentIdeas;
      writeJson(CONTENT_IDEAS_FILE, this.contentIdeas);
    } else {
      this.contentIdeas = loadedContentIdeas;
    }

    // Blog Posts - Ensure full 20 educational articles are available
    const loadedBlog = readJson<BlogPost[]>(BLOG_POSTS_FILE, []);
    if (!loadedBlog || loadedBlog.length < 20) {
      this.blogPosts = initialBlogPosts;
      writeJson(BLOG_POSTS_FILE, this.blogPosts);
    } else {
      this.blogPosts = loadedBlog;
    }

    // Reviews - Ensure authentic reviews with sample labels are initialized
    const loadedReviews = readJson<StudentReview[]>(REVIEWS_FILE, []);
    if (!loadedReviews || loadedReviews.length === 0 || !loadedReviews.some(r => r.id.includes('sample'))) {
      this.reviews = initialStudentReviews;
      writeJson(REVIEWS_FILE, this.reviews);
    } else {
      this.reviews = loadedReviews;
    }

    // Views Guides
    const loadedViews = readJson<ViewsGuideTopic[]>(VIEWS_GUIDES_FILE, []);
    if (!loadedViews || loadedViews.length === 0) {
      this.viewsGuides = initialViewsGuides;
      writeJson(VIEWS_GUIDES_FILE, this.viewsGuides);
    } else {
      this.viewsGuides = loadedViews;
    }

    // Online Work
    const loadedOnlineWork = readJson<OnlineWorkTopic[]>(ONLINE_WORK_FILE, []);
    if (!loadedOnlineWork || loadedOnlineWork.length === 0) {
      this.onlineWorkTopics = initialOnlineWorkTopics;
      writeJson(ONLINE_WORK_FILE, this.onlineWorkTopics);
    } else {
      this.onlineWorkTopics = loadedOnlineWork;
    }

    this.coachingRequests = readJson<CoachingRequest[]>(COACHING_REQUESTS_FILE, []);
    this.courseRegistrations = readJson<CourseRegistration[]>(COURSE_REGISTRATIONS_FILE, []);
  }

  // --- Course Operations ---
  getAllCourses(): Course[] {
    return this.courses;
  }

  getPublishedCourses(): Course[] {
    return this.courses.filter((c) => c.status === 'published');
  }

  getCourseById(courseId: string): Course | undefined {
    return this.courses.find((c) => c.course_id === courseId);
  }

  createCourse(courseData: Omit<Course, 'course_id' | 'created_at' | 'updated_at'>): Course {
    const newCourse: Course = {
      ...courseData,
      course_id: `course-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.courses.unshift(newCourse);
    writeJson(COURSES_FILE, this.courses);
    return newCourse;
  }

  updateCourse(courseId: string, updates: Partial<Course>): Course | null {
    const idx = this.courses.findIndex((c) => c.course_id === courseId);
    if (idx === -1) return null;

    this.courses[idx] = {
      ...this.courses[idx],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    writeJson(COURSES_FILE, this.courses);
    return this.courses[idx];
  }

  deleteCourse(courseId: string): boolean {
    const initialLen = this.courses.length;
    this.courses = this.courses.filter((c) => c.course_id !== courseId);
    if (this.courses.length !== initialLen) {
      writeJson(COURSES_FILE, this.courses);
      return true;
    }
    return false;
  }

  // --- Category Operations ---
  getAllCategories(): Category[] {
    // Dynamically calculate course count
    return this.categories.map((cat) => ({
      ...cat,
      course_count: this.courses.filter(
        (c) => c.category === cat.name || c.category_id === cat.id
      ).length,
    }));
  }

  getPublishedCategories(): Category[] {
    const publishedCourses = this.getPublishedCourses();
    return this.categories
      .filter((cat) => cat.status === 'published')
      .map((cat) => ({
        ...cat,
        course_count: publishedCourses.filter(
          (c) => c.category === cat.name || c.category_id === cat.id
        ).length,
      }))
      .filter((cat) => (cat.course_count || 0) > 0);
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories.find((c) => c.id === id);
  }

  createCategory(data: Omit<Category, 'id' | 'created_at'>): Category {
    const newCat: Category = {
      ...data,
      id: `cat-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      created_at: new Date().toISOString(),
    };
    this.categories.push(newCat);
    writeJson(CATEGORIES_FILE, this.categories);
    return newCat;
  }

  updateCategory(id: string, updates: Partial<Category>): Category | null {
    const idx = this.categories.findIndex((c) => c.id === id);
    if (idx === -1) return null;

    this.categories[idx] = {
      ...this.categories[idx],
      ...updates,
    };
    writeJson(CATEGORIES_FILE, this.categories);
    return this.categories[idx];
  }

  deleteCategory(id: string): boolean {
    const initialLen = this.categories.length;
    this.categories = this.categories.filter((c) => c.id !== id);
    if (this.categories.length !== initialLen) {
      writeJson(CATEGORIES_FILE, this.categories);
      return true;
    }
    return false;
  }

  // --- Problem Topics Operations ---
  getAllTopics(): ProblemTopic[] {
    return this.problemTopics;
  }

  getActiveTopics(): ProblemTopic[] {
    return this.problemTopics.filter((t) => t.is_active);
  }

  createTopic(data: Omit<ProblemTopic, 'id'>): ProblemTopic {
    const newTopic: ProblemTopic = {
      ...data,
      id: `topic-${Date.now()}`,
    };
    this.problemTopics.push(newTopic);
    writeJson(TOPICS_FILE, this.problemTopics);
    return newTopic;
  }

  updateTopic(id: string, updates: Partial<ProblemTopic>): ProblemTopic | null {
    const idx = this.problemTopics.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    this.problemTopics[idx] = {
      ...this.problemTopics[idx],
      ...updates,
    };
    writeJson(TOPICS_FILE, this.problemTopics);
    return this.problemTopics[idx];
  }

  deleteTopic(id: string): boolean {
    const initialLen = this.problemTopics.length;
    this.problemTopics = this.problemTopics.filter((t) => t.id !== id);
    if (this.problemTopics.length !== initialLen) {
      writeJson(TOPICS_FILE, this.problemTopics);
      return true;
    }
    return false;
  }

  // --- Payment Settings Operations ---
  getPaymentSettings(): PaymentSettings {
    return this.paymentSettings;
  }

  updatePaymentSettings(updates: Partial<PaymentSettings>): PaymentSettings {
    this.paymentSettings = {
      ...this.paymentSettings,
      ...updates,
    };
    writeJson(PAYMENT_SETTINGS_FILE, this.paymentSettings);
    return this.paymentSettings;
  }

  // --- AI Settings Operations ---
  getAiSettings(): AiSettings {
    return this.aiSettings;
  }

  updateAiSettings(updates: Partial<AiSettings>): AiSettings {
    this.aiSettings = {
      ...this.aiSettings,
      ...updates,
    };
    writeJson(AI_SETTINGS_FILE, this.aiSettings);
    return this.aiSettings;
  }

  // --- Knowledge Base Operations ---
  getAllKnowledge(): KnowledgeItem[] {
    return this.knowledge;
  }

  getActiveKnowledge(): KnowledgeItem[] {
    return this.knowledge.filter((k) => k.status === 'active');
  }

  getKnowledgeById(id: string): KnowledgeItem | undefined {
    return this.knowledge.find((k) => k.id === id);
  }

  createKnowledge(data: Omit<KnowledgeItem, 'id' | 'created_at' | 'updated_at'>): KnowledgeItem {
    const newItem: KnowledgeItem = {
      ...data,
      id: `kb-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.knowledge.unshift(newItem);
    writeJson(KNOWLEDGE_FILE, this.knowledge);
    return newItem;
  }

  updateKnowledge(id: string, updates: Partial<KnowledgeItem>): KnowledgeItem | null {
    const idx = this.knowledge.findIndex((k) => k.id === id);
    if (idx === -1) return null;

    this.knowledge[idx] = {
      ...this.knowledge[idx],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    writeJson(KNOWLEDGE_FILE, this.knowledge);
    return this.knowledge[idx];
  }

  deleteKnowledge(id: string): boolean {
    const initialLen = this.knowledge.length;
    this.knowledge = this.knowledge.filter((k) => k.id !== id);
    if (this.knowledge.length !== initialLen) {
      writeJson(KNOWLEDGE_FILE, this.knowledge);
      return true;
    }
    return false;
  }

  // --- Customer Operations ---
  getAllCustomers(): CustomerProfile[] {
    return this.customers;
  }

  getCustomerById(id: string): CustomerProfile | undefined {
    return this.customers.find((c) => c.customer_id === id);
  }

  findOrCreateCustomer(name: string, phone: string, email?: string, lang: 'so' | 'en' = 'so'): CustomerProfile {
    let existing = this.customers.find(
      (c) => (phone && c.phone === phone) || (email && c.email && c.email.toLowerCase() === email.toLowerCase())
    );

    if (existing) {
      if (name && (!existing.name || existing.name === 'Macmiil Cusub')) {
        existing.name = name;
        writeJson(CUSTOMERS_FILE, this.customers);
      }
      return existing;
    }

    const newCustomer: CustomerProfile = {
      customer_id: `cust-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: name || 'Macmiil Cusub',
      phone: phone || '',
      email: email || '',
      preferred_language: lang,
      status: 'lead',
      conversation_history: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.customers.push(newCustomer);
    writeJson(CUSTOMERS_FILE, this.customers);
    return newCustomer;
  }

  updateCustomer(id: string, updates: Partial<CustomerProfile>): CustomerProfile | null {
    const idx = this.customers.findIndex((c) => c.customer_id === id);
    if (idx === -1) return null;

    this.customers[idx] = {
      ...this.customers[idx],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    writeJson(CUSTOMERS_FILE, this.customers);
    return this.customers[idx];
  }

  updateCustomerProfile(id: string, updates: Partial<CustomerProfile>): CustomerProfile | null {
    return this.updateCustomer(id, updates);
  }

  // --- Conversation Operations ---
  getAllConversations(): Conversation[] {
    return this.conversations;
  }

  getConversationById(id: string): Conversation | undefined {
    return this.conversations.find((c) => c.id === id);
  }

  createConversation(params: {
    customer_id: string;
    customer_name?: string;
    customer_phone?: string;
    customer_email?: string;
    channel?: 'web' | 'whatsapp';
    language?: 'so' | 'en';
    problem_category?: string;
    course_interest?: string;
    initial_message?: string;
    initial_attachment_url?: string;
  }): Conversation {
    const convId = `conv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newConv: Conversation = {
      id: convId,
      customer_id: params.customer_id,
      customer_name: params.customer_name,
      customer_phone: params.customer_phone,
      customer_email: params.customer_email,
      channel: params.channel || 'web',
      status: 'open',
      problem_category: params.problem_category || 'YouTube Views',
      course_interest: params.course_interest,
      language: params.language || 'so',
      messages: params.initial_message
        ? [
            {
              id: `msg-${Date.now()}`,
              sender: 'customer',
              content: params.initial_message,
              attachment_url: params.initial_attachment_url,
              attachment_type: params.initial_attachment_url ? 'image' : undefined,
              timestamp: new Date().toISOString(),
            },
          ]
        : [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.conversations.unshift(newConv);
    writeJson(CONVERSATIONS_FILE, this.conversations);

    // Link conversation to customer profile
    const customer = this.getCustomerById(params.customer_id);
    if (customer) {
      if (!customer.conversation_history.includes(convId)) {
        customer.conversation_history.push(convId);
      }
      if (params.problem_category) {
        customer.problem_category = params.problem_category;
      }
      if (params.course_interest) {
        customer.course_interest = params.course_interest;
      }
      writeJson(CUSTOMERS_FILE, this.customers);
    }

    return newConv;
  }

  addMessageToConversation(
    convId: string,
    message: {
      sender: 'customer' | 'assistant' | 'admin' | 'system';
      content: string;
      attachment_url?: string;
      attachment_type?: 'image';
      is_handoff_offer?: boolean;
      suggested_course_id?: string;
    }
  ): Conversation | null {
    const conv = this.getConversationById(convId);
    if (!conv) return null;

    let suggestedCourse: Course | undefined;
    if (message.suggested_course_id) {
      suggestedCourse = this.getCourseById(message.suggested_course_id);
    }

    const newMsg = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sender: message.sender,
      content: message.content,
      attachment_url: message.attachment_url,
      attachment_type: message.attachment_type,
      timestamp: new Date().toISOString(),
      is_handoff_offer: message.is_handoff_offer,
      suggested_course_id: message.suggested_course_id,
      suggested_course: suggestedCourse,
    };

    conv.messages.push(newMsg);
    conv.updated_at = new Date().toISOString();
    writeJson(CONVERSATIONS_FILE, this.conversations);
    return conv;
  }

  updateConversationStatus(
    convId: string,
    status: ConversationStatus
  ): Conversation | null {
    const conv = this.getConversationById(convId);
    if (!conv) return null;

    conv.status = status;
    conv.updated_at = new Date().toISOString();
    if (status === 'resolved') {
      conv.resolved_at = new Date().toISOString();
    }

    writeJson(CONVERSATIONS_FILE, this.conversations);
    return conv;
  }

  updateConversationDetails(
    convId: string,
    updates: Partial<Conversation>
  ): Conversation | null {
    const conv = this.getConversationById(convId);
    if (!conv) return null;

    Object.assign(conv, updates, { updated_at: new Date().toISOString() });
    if (updates.status === 'resolved' && !conv.resolved_at) {
      conv.resolved_at = new Date().toISOString();
    }

    writeJson(CONVERSATIONS_FILE, this.conversations);

    // Also sync problem category or course interest to customer
    if (conv.customer_id && (updates.problem_category || updates.course_interest)) {
      const customer = this.getCustomerById(conv.customer_id);
      if (customer) {
        if (updates.problem_category) customer.problem_category = updates.problem_category;
        if (updates.course_interest) customer.course_interest = updates.course_interest;
        writeJson(CUSTOMERS_FILE, this.customers);
      }
    }

    return conv;
  }

  // --- Admin Stats ---
  getStats(): AdminStats {
    const totalCourses = this.courses.length;
    const publishedCourses = this.courses.filter((c) => c.status === 'published').length;
    const totalCustomers = this.customers.length;
    const totalConversations = this.conversations.length;
    const conversationsNeedingHelp = this.conversations.filter(
      (c) => c.status === 'needs_admin' || c.status === 'open' || c.status === 'in_progress'
    ).length;

    // Courses by Category calculation
    const catMap = new Map<string, number>();
    for (const c of this.courses) {
      const cat = c.category || 'Other';
      catMap.set(cat, (catMap.get(cat) || 0) + 1);
    }

    const coursesByCategory = Array.from(catMap.entries()).map(([category, count]) => ({
      category,
      count,
    }));

    return {
      total_courses: totalCourses,
      published_courses: publishedCourses,
      total_customers: totalCustomers,
      total_conversations: totalConversations,
      conversations_needing_help: conversationsNeedingHelp,
      courses_by_category: coursesByCategory,
    };
  }

  // --- AI Niches Operations ---
  getNiches(): AiNicheIdea[] {
    return this.niches;
  }

  getNicheById(id: string): AiNicheIdea | undefined {
    return this.niches.find((n) => n.id === id);
  }

  createNiche(data: Omit<AiNicheIdea, 'id'>): AiNicheIdea {
    const newNiche: AiNicheIdea = {
      ...data,
      id: `niche-${Date.now()}`,
    };
    this.niches.unshift(newNiche);
    writeJson(NICHES_FILE, this.niches);
    return newNiche;
  }

  updateNiche(id: string, updates: Partial<AiNicheIdea>): AiNicheIdea | null {
    const idx = this.niches.findIndex((n) => n.id === id);
    if (idx === -1) return null;
    this.niches[idx] = { ...this.niches[idx], ...updates };
    writeJson(NICHES_FILE, this.niches);
    return this.niches[idx];
  }

  deleteNiche(id: string): boolean {
    const len = this.niches.length;
    this.niches = this.niches.filter((n) => n.id !== id);
    if (this.niches.length !== len) {
      writeJson(NICHES_FILE, this.niches);
      return true;
    }
    return false;
  }

  // --- Content Ideas Operations ---
  getContentIdeas(category?: string): ContentIdea[] {
    if (!category || category === 'all') return this.contentIdeas;
    return this.contentIdeas.filter((c) => (c.category || '').toLowerCase() === category.toLowerCase());
  }

  createContentIdea(data: Omit<ContentIdea, 'id'>): ContentIdea {
    const newIdea: ContentIdea = {
      ...data,
      id: `idea-${Date.now()}`,
    };
    this.contentIdeas.unshift(newIdea);
    writeJson(CONTENT_IDEAS_FILE, this.contentIdeas);
    return newIdea;
  }

  deleteContentIdea(id: string): boolean {
    const len = this.contentIdeas.length;
    this.contentIdeas = this.contentIdeas.filter((i) => i.id !== id);
    if (this.contentIdeas.length !== len) {
      writeJson(CONTENT_IDEAS_FILE, this.contentIdeas);
      return true;
    }
    return false;
  }

  // --- Blog Posts Operations ---
  getBlogPosts(): BlogPost[] {
    return this.blogPosts;
  }

  getBlogPostById(idOrSlug: string): BlogPost | undefined {
    return this.blogPosts.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
  }

  createBlogPost(data: Partial<BlogPost>): BlogPost {
    const rawTitle = data.title || data.title_so || data.title_en || 'Maqaal Cusub';
    const slug = data.slug || rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newPost: BlogPost = {
      id: `art-${Date.now()}`,
      slug: slug || `article-${Date.now()}`,
      title: rawTitle,
      title_so: data.title_so || rawTitle,
      title_en: data.title_en || rawTitle,
      excerpt: data.excerpt || data.excerpt_so || '',
      excerpt_so: data.excerpt_so || data.excerpt || '',
      excerpt_en: data.excerpt_en || data.excerpt || '',
      content: data.content || data.content_so || '',
      content_so: data.content_so || data.content || '',
      content_en: data.content_en || data.content || '',
      category: data.category || 'YouTube Growth',
      author: data.author || 'Kooxda XirfadoNet',
      read_time: data.read_time || data.readingTime || '7 daqiiqo',
      readingTime: data.readingTime || data.read_time || '7 daqiiqo',
      date: data.date || new Date().toLocaleDateString('so-SO', { day: '2-digit', month: 'short', year: 'numeric' }),
      publishedAt: data.publishedAt || new Date().toISOString(),
      image: data.image || data.featuredImage || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
      featuredImage: data.featuredImage || data.image || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
      published: data.published !== false,
      headings: data.headings || [],
      bullet_points: data.bullet_points || [],
      example_cases: data.example_cases || [],
      checklist: data.checklist || [],
      meta_description: data.meta_description || data.excerpt || '',
      related_course_id: data.related_course_id,
    };
    this.blogPosts.unshift(newPost);
    writeJson(BLOG_POSTS_FILE, this.blogPosts);
    return newPost;
  }

  updateBlogPost(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const idx = this.blogPosts.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.blogPosts[idx] = { ...this.blogPosts[idx], ...updates };
    writeJson(BLOG_POSTS_FILE, this.blogPosts);
    return this.blogPosts[idx];
  }

  deleteBlogPost(id: string): boolean {
    const len = this.blogPosts.length;
    this.blogPosts = this.blogPosts.filter((p) => p.id !== id);
    if (this.blogPosts.length !== len) {
      writeJson(BLOG_POSTS_FILE, this.blogPosts);
      return true;
    }
    return false;
  }

  // --- Student Reviews Operations ---
  getReviews(): StudentReview[] {
    return this.reviews;
  }

  createReview(data: Partial<StudentReview>): StudentReview {
    const rawName = data.student_name || data.studentName || data.name || 'Arday';
    const rawCourse = data.course_name || data.course_title || data.course || 'Koorso Guud';
    const rawComment = data.comment || data.comment_so || data.comment_en || data.review || '';
    const newReview: StudentReview = {
      id: `rev-${Date.now()}`,
      student_name: rawName,
      studentName: rawName,
      course_id: data.course_id || '',
      course_name: rawCourse,
      course_title: rawCourse,
      course: rawCourse,
      comment: rawComment,
      comment_so: data.comment_so || rawComment,
      comment_en: data.comment_en || rawComment,
      review: rawComment,
      rating: Number(data.rating) || 5,
      date: data.date || new Date().toLocaleDateString('so-SO', { day: '2-digit', month: 'short', year: 'numeric' }),
      published: data.published !== false,
      is_published: data.published !== false,
      verified: Boolean(data.verified || data.verified_student || data.is_verified),
      is_verified: Boolean(data.verified || data.verified_student || data.is_verified),
      verified_student: Boolean(data.verified || data.verified_student || data.is_verified),
      is_sample: Boolean(data.is_sample),
      role_or_channel: data.role_or_channel || 'Student',
      outcome_highlight: data.outcome_highlight || data.achievement || '',
    };
    this.reviews.unshift(newReview);
    writeJson(REVIEWS_FILE, this.reviews);
    return newReview;
  }

  updateReview(id: string, updates: Partial<StudentReview>): StudentReview | null {
    const idx = this.reviews.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    this.reviews[idx] = { ...this.reviews[idx], ...updates };
    writeJson(REVIEWS_FILE, this.reviews);
    return this.reviews[idx];
  }

  deleteReview(id: string): boolean {
    const len = this.reviews.length;
    this.reviews = this.reviews.filter((r) => r.id !== id);
    if (this.reviews.length !== len) {
      writeJson(REVIEWS_FILE, this.reviews);
      return true;
    }
    return false;
  }

  // --- 1-on-1 Coaching Requests Operations ---
  getCoachingRequests(): CoachingRequest[] {
    return this.coachingRequests;
  }

  createCoachingRequest(data: Omit<CoachingRequest, 'id' | 'created_at' | 'status'>): CoachingRequest {
    const newReq: CoachingRequest = {
      ...data,
      id: `coach-${Date.now()}`,
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    this.coachingRequests.unshift(newReq);
    writeJson(COACHING_REQUESTS_FILE, this.coachingRequests);
    return newReq;
  }

  updateCoachingStatus(id: string, status: CoachingRequest['status']): CoachingRequest | null {
    const req = this.coachingRequests.find((r) => r.id === id);
    if (!req) return null;
    req.status = status;
    writeJson(COACHING_REQUESTS_FILE, this.coachingRequests);
    return req;
  }

  // --- Course Registrations Operations ---
  getCourseRegistrations(): CourseRegistration[] {
    return this.courseRegistrations;
  }

  createCourseRegistration(data: Omit<CourseRegistration, 'id' | 'created_at' | 'status'>): CourseRegistration {
    const newReg: CourseRegistration = {
      ...data,
      id: `reg-${Date.now()}`,
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    this.courseRegistrations.unshift(newReg);
    writeJson(COURSE_REGISTRATIONS_FILE, this.courseRegistrations);
    return newReg;
  }

  updateCourseRegistrationStatus(id: string, status: CourseRegistration['status'], notes?: string): CourseRegistration | null {
    const reg = this.courseRegistrations.find((r) => r.id === id);
    if (!reg) return null;
    reg.status = status;
    if (notes !== undefined) reg.notes = notes;
    writeJson(COURSE_REGISTRATIONS_FILE, this.courseRegistrations);
    return reg;
  }

  updateCourseRegistration(id: string, updates: Partial<CourseRegistration>): CourseRegistration | null {
    const reg = this.courseRegistrations.find((r) => r.id === id);
    if (!reg) return null;
    Object.assign(reg, updates);
    writeJson(COURSE_REGISTRATIONS_FILE, this.courseRegistrations);
    return reg;
  }

  submitCoursePaymentProof(
    id: string,
    proof: { proof_image?: string; proof_text?: string; payment_method?: string; payment_number_used?: string }
  ): CourseRegistration | null {
    const reg = this.courseRegistrations.find((r) => r.id === id);
    if (!reg) return null;
    reg.status = 'payment_proof_received';
    if (proof.proof_image) reg.payment_proof_image = proof.proof_image;
    if (proof.proof_text) reg.payment_proof_text = proof.proof_text;
    if (proof.payment_method) reg.payment_method = proof.payment_method;
    if (proof.payment_number_used) reg.payment_number_used = proof.payment_number_used;
    reg.notes = 'Payment Proof Received - Under Admin Review';
    writeJson(COURSE_REGISTRATIONS_FILE, this.courseRegistrations);
    return reg;
  }

  // --- Views Guides & Online Work Read Operations ---
  getViewsGuides(): ViewsGuideTopic[] {
    return this.viewsGuides;
  }

  getOnlineWorkTopics(): OnlineWorkTopic[] {
    return this.onlineWorkTopics;
  }
}

export const storage = new StorageService();
