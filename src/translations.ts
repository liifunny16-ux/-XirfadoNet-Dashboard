import { Language } from './types.js';

export interface Translations {
  // Brand
  brandName: string;
  brandTagline: string;
  officialSite: string;

  // Navigation
  navHome: string;
  navCourses: string;
  navCategories: string;
  navNiches: string;
  navContentIdeas: string;
  navViewsHub: string;
  navOnlineWork: string;
  navCoaching: string;
  navReviews: string;
  navSupport: string;
  navBlog: string;
  navAbout: string;
  navContact: string;
  navAdmin: string;
  signIn: string;
  signUp: string;
  signOut: string;

  // Home
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  browseCourses: string;
  askAiSupport: string;
  exploreCategories: string;
  featuredCoursesTitle: string;
  featuredCoursesSubtitle: string;
  viewAllCourses: string;
  problemSolverBannerTitle: string;
  problemSolverBannerDesc: string;
  problemSolverBannerBtn: string;
  reviewsTitle: string;
  reviewsSubtitle: string;

  // Badges & Stats
  studentsCount: string;
  coursesCount: string;
  satisfactionRate: string;
  practicalLearning: string;

  // Course Cards
  viewCourse: string;
  enrollNow: string;
  duration: string;
  price: string;
  discount: string;
  lessons: string;
  outcomes: string;
  requirements: string;
  targetAudience: string;

  // Categories
  categoriesTitle: string;
  categoriesSubtitle: string;
  viewCategoryCourses: string;

  // AI Support
  supportTitle: string;
  supportSubtitle: string;
  quickProblemsTitle: string;
  chatPlaceholder: string;
  send: string;
  talkToAdmin: string;
  adminRequested: string;
  adminActiveNotice: string;
  aiBadge: string;
  adminBadge: string;
  customerBadge: string;
  systemBadge: string;

  // Payment
  manualPaymentTitle: string;
  manualPaymentNotice: string;
  locationQuestion: string;
  inSomalia: string;
  abroad: string;
  howToPay: string;

  // Blog
  blogTitle: string;
  blogSubtitle: string;
  readMore: string;

  // About
  aboutTitle: string;
  aboutSubtitle: string;
  missionTitle: string;
  missionText: string;

  // Contact
  contactTitle: string;
  contactSubtitle: string;
  sendMessage: string;
  nameLabel: string;
  phoneLabel: string;
  emailLabel: string;
  messageLabel: string;

  // Common
  close: string;
  searchPlaceholder: string;
  allCategories: string;
}

export const translations: Record<Language, Translations> = {
  so: {
    brandName: 'XirfadoNet',
    brandTagline: 'Madasha Waxbarashada Dijitaalka ah & Caawiyaha AI',
    officialSite: 'xirfadonet.com',

    navHome: 'Bogga Hore',
    navCourses: 'Koorsooyinka',
    navCategories: 'Qaybaha',
    navNiches: 'AI Niches',
    navContentIdeas: 'Content Ideas',
    navViewsHub: 'Views Hub',
    navOnlineWork: 'Online Work',
    navCoaching: '1-on-1 Coaching',
    navReviews: 'Aragtiyada',
    navSupport: 'AI Caawiyaha',
    navBlog: 'Maqaallada',
    navAbout: 'Nagu Saabsan',
    navContact: 'Nala Soo Xiriir',
    navAdmin: 'Maamulka',
    signIn: 'Soo Gal',
    signUp: 'Is-Diiwaangeli',
    signOut: 'Ka Bax',

    heroTitle: 'Baro Xirfadaha Casriga ah ee',
    heroHighlight: 'AI & YouTube Automation',
    heroSubtitle: 'Ku guuleyso YouTube Shorts, Faceless Channels, Video Editing, Dropshipping, iyo xirfado suuq leh oo dakhli joogto ah ka abuura internet-ka.',
    browseCourses: 'Baadh Koorsooyinka',
    askAiSupport: 'Weydii AI Caawiyaha',
    exploreCategories: 'Sahmi Qaybaha',
    featuredCoursesTitle: 'Koorsooyinka Ugu Caansan',
    featuredCoursesSubtitle: 'Koorsooyin tayo sare leh oo si toos ah kuu baraya sida looga shaqeysto internet-ka.',
    viewAllCourses: 'Eeg Dhammaan Koorsooyinka',
    problemSolverBannerTitle: 'Ma ku haysataa dhibaato YouTube, AdSense, ama Daawashada?',
    problemSolverBannerDesc: 'AI Caawiyaha XirfadoNet wuxuu kuu xallinayaa dhibaatooyinka YouTube Views, AdSense PIN, diiwaangelinta, iyo hababka lacag bixinta.',
    problemSolverBannerBtn: 'Bilow Xallinta Dhibaatadaada Hadda',
    reviewsTitle: 'Fikradaha Ardayda XirfadoNet',
    reviewsSubtitle: 'Kumanaan arday Soomaaliyeed ah ayaa xirfado noloshooda beddelay ka bartay XirfadoNet.',

    studentsCount: '5,000+ Arday',
    coursesCount: '10+ Koorsooyin Dhab ah',
    satisfactionRate: '99% Ku Qanacsanaanta',
    practicalLearning: '100% Casharro Farsamo ah',

    viewCourse: 'Eeg Koorsada',
    enrollNow: 'Diiwaangeli Hadda',
    duration: 'Muddada',
    price: 'Qiimaha',
    discount: 'Dhimis',
    lessons: 'Casharrada Koorsada',
    outcomes: 'Waxa Aad Baran Doonto',
    requirements: 'Shuruudaha Loo Baahan Yahay',
    targetAudience: 'Yaa Loogu Talagalay',

    categoriesTitle: 'Qaybaha Koorsooyinka',
    categoriesSubtitle: 'Dooro xirfadda aad doonayso inaad ku takhasusto.',
    viewCategoryCourses: 'Eeg Koorsooyinka Qaybtan',

    supportTitle: 'AI Caawiyaha Macaamiisha & Koorsooyinka',
    supportSubtitle: 'Shaqaalahaaga farsamada ee 24/7 u heellan xallinta dhibaatooyinkaaga iyo kugu hagidda koorsooyinka saxda ah.',
    quickProblemsTitle: 'Dhibaatooyinka Badanaa La Isweydiiyo (Dooro mid):',
    chatPlaceholder: 'Qor dhibaatadaada (tusaale: Views-ka YouTube, AdSense PIN, ama diiwaangelinta koorsooyinka)...',
    send: 'Dir',
    talkToAdmin: 'La Hadal Maamulka',
    adminRequested: 'Waxaa laguu gudbiyay Maamulka',
    adminActiveNotice: 'Maamulaha XirfadoNet ayaa hadda kula hadlaya.',
    aiBadge: 'Caawiyaha AI',
    adminBadge: 'Maamulka XirfadoNet',
    customerBadge: 'Adiga',
    systemBadge: 'Nidaamka',

    manualPaymentTitle: 'Tilmaamaha Lacag Bixinta Gacanta ah',
    manualPaymentNotice: 'Digniin: AI ma qabto lacag toos ah. Lacag bixintu waxay ku socotaa gacanta adigoo u diraya lambarka rasmiga ah ee maamulka kadibna rasiidka u soo diraya.',
    locationQuestion: 'Ma Somalia ayaad joogtaa mise dibadda?',
    inSomalia: 'Soomaaliya Gudaheeda',
    abroad: 'Dibadda (Caalamka)',
    howToPay: 'Sida Loo Bixiyo',

    blogTitle: 'Maqaallada & Xogta Xirfadaha',
    blogSubtitle: 'Hagayaal iyo xeelado casri ah oo ku saabsan YouTube, AdSense, iyo Earning.',
    readMore: 'Akhriso Maqaalka',

    aboutTitle: 'Ku Saabsan XirfadoNet',
    aboutSubtitle: 'Madasha koowaad ee Soomaaliyeed ee barashada xirfadaha dhabta ah ee internet-ka.',
    missionTitle: 'Hadafkayaga',
    missionText: 'Inaan dhalinyarada Soomaaliyeed ku qalabayno xirfado heer sare ah oo casri ah oo u sahlaya inay dakhli joogto ah ka helaan internet-ka iyagoo ku sugan meel kasta oo ay dunida ka joogaan.',

    contactTitle: 'Nala Soo Xiriir',
    contactSubtitle: 'Waxaan diyaar u nahay inaan kaaga jawaabno su\'aal kasta oo aad qabto.',
    sendMessage: 'Dir Fariinta',
    nameLabel: 'Magacaaga',
    phoneLabel: 'Lambarka Taleefanka / WhatsApp',
    emailLabel: 'Email-kaaga',
    messageLabel: 'Fariintaada',

    close: 'Xir',
    searchPlaceholder: 'Raadi koorso magaceeda ama mawduuc...',
    allCategories: 'Dhammaan Qaybaha',
  },
  en: {
    brandName: 'XirfadoNet',
    brandTagline: 'Online Digital Skills Platform & AI Customer Support',
    officialSite: 'xirfadonet.com',

    navHome: 'Home',
    navCourses: 'Courses',
    navCategories: 'Categories',
    navNiches: 'AI Niches',
    navContentIdeas: 'Content Ideas',
    navViewsHub: 'Views Hub',
    navOnlineWork: 'Online Work',
    navCoaching: '1-on-1 Coaching',
    navReviews: 'Reviews',
    navSupport: 'AI Support',
    navBlog: 'Blog',
    navAbout: 'About Us',
    navContact: 'Contact',
    navAdmin: 'Admin',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',

    heroTitle: 'Master High-Income Digital Skills in',
    heroHighlight: 'AI & YouTube Automation',
    heroSubtitle: 'Achieve massive results with YouTube Shorts, Faceless Channels, Video Editing, Dropshipping, and actionable skills to earn online.',
    browseCourses: 'Browse Courses',
    askAiSupport: 'Ask AI Support',
    exploreCategories: 'Explore Categories',
    featuredCoursesTitle: 'Popular Courses',
    featuredCoursesSubtitle: 'High-quality, hands-on courses designed to help you monetize your skills online.',
    viewAllCourses: 'View All Courses',
    problemSolverBannerTitle: 'Facing issues with YouTube, AdSense, or Low Views?',
    problemSolverBannerDesc: 'XirfadoNet AI Support helps you troubleshoot low impressions, AdSense PIN verification, enrollment, and payment procedures 24/7.',
    problemSolverBannerBtn: 'Start Troubleshooting Now',
    reviewsTitle: 'What Our Students Say',
    reviewsSubtitle: 'Over 5,000 Somali students have built digital careers through XirfadoNet courses.',

    studentsCount: '5,000+ Students',
    coursesCount: '10+ Real Courses',
    satisfactionRate: '99% Satisfaction',
    practicalLearning: '100% Practical Training',

    viewCourse: 'View Course',
    enrollNow: 'Enroll Now',
    duration: 'Duration',
    price: 'Price',
    discount: 'Discount',
    lessons: 'Course Lessons',
    outcomes: 'What You Will Learn',
    requirements: 'Requirements',
    targetAudience: 'Who Is This For',

    categoriesTitle: 'Course Categories',
    categoriesSubtitle: 'Select a specialty to level up your career.',
    viewCategoryCourses: 'View Category Courses',

    supportTitle: 'AI Customer Support & Course Assistant',
    supportSubtitle: 'Your 24/7 intelligent technical employee solving creator issues and guiding enrollment.',
    quickProblemsTitle: 'Common Inquiries (Select one):',
    chatPlaceholder: 'Describe your issue (e.g. YouTube views, AdSense PIN, course registration)...',
    send: 'Send',
    talkToAdmin: 'Talk to Admin',
    adminRequested: 'Connected to Management',
    adminActiveNotice: 'A XirfadoNet manager has taken over the chat.',
    aiBadge: 'AI Assistant',
    adminBadge: 'XirfadoNet Admin',
    customerBadge: 'You',
    systemBadge: 'System',

    manualPaymentTitle: 'Manual Payment Instructions',
    manualPaymentNotice: 'Note: AI does not process payments directly. All payments are transferred manually to official management accounts and verified.',
    locationQuestion: 'Are you located in Somalia or internationally?',
    inSomalia: 'Inside Somalia',
    abroad: 'International / Diaspora',
    howToPay: 'Payment Methods',

    blogTitle: 'Articles & Guides',
    blogSubtitle: 'Expert tutorials and strategies on YouTube, monetization, and online skills.',
    readMore: 'Read Article',

    aboutTitle: 'About XirfadoNet',
    aboutSubtitle: 'The premier online academy for practical, high-income digital skills.',
    missionTitle: 'Our Mission',
    missionText: 'To equip Somali youth worldwide with modern, high-demand skills to build independent digital income streams from anywhere.',

    contactTitle: 'Contact Us',
    contactSubtitle: 'We are here to help answer all your inquiries.',
    sendMessage: 'Send Message',
    nameLabel: 'Your Name',
    phoneLabel: 'Phone / WhatsApp Number',
    emailLabel: 'Your Email',
    messageLabel: 'Your Message',

    close: 'Close',
    searchPlaceholder: 'Search courses by title or topic...',
    allCategories: 'All Categories',
  },
};
