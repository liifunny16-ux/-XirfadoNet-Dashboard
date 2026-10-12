import { AiNicheIdea } from '../types.js';

export const initialAiNiches: AiNicheIdea[] = [
  {
    id: 'niche-ai-future-tech',
    name: 'AI & Future Technology',
    name_so: 'AI & Tiknoolajiyada Mustaqbalka',
    description_so: 'Muuqaallo ka hadlaya aaladaha cusub ee AI, robotics-ka, chips-ka, iyo sida dunidu isu beddelayso. Fikradan waxay leedahay fursad content badan laga sameeyo sababtoo ah dadku waxay aad u xiiseeyaan mustaqbalka.',
    description_en: 'Videos exploring breakthrough AI tools, robotics, and emerging technologies that capture global curiosity.',
    example_video_ideas: [
      'Top 5 AI Robots oo sanadkan 2026 shaqooyinka dadka qabanaya',
      'AI ma beddeli doonaa programmers-ka iyo dhakhaatiirta?',
      'Sidee AI loogu abuuraa sawirro iyo muuqaallo dhab ah oo bilaash ah?',
      '3 Aaladood oo AI ah oo waxbarashadaada iyo shaqadaada 10x ka dhigi kara'
    ],
    suggested_platform: 'YouTube Shorts / TikTok / Long-form',
    content_format: 'Faceless / AI Voiceover / B-roll visuals',
    difficulty_level: 'Beginner',
    is_faceless_friendly: true,
    ai_tools: ['ChatGPT', 'Midjourney', 'ElevenLabs', 'CapCut', 'Pika'],
    category: 'Technology'
  },
  {
    id: 'niche-amazing-houses',
    name: 'House Building / Amazing Houses',
    name_so: 'Dhismaha Guryaha & Guryaha Cajiibka ah',
    description_so: 'Soo bandhigidda guryaha cajiibka ah ee dabeecadda ku dhex yaal, naqshadaha casriga ah, iyo hababka casriga ah ee wax loo dhiso. Content-kani wuxuu leeyahay daawasho sare oo caalami ah.',
    description_en: 'Showcasing luxury architecture, creative modular houses, and extraordinary interior design.',
    example_video_ideas: [
      'Guri $5,000 ku baxay oo dhex yaal keyn balse gudaha ka ah hotel 5 star',
      '5 Guri oo dunida ugu yaabka badan oo buur korkeed laga dhisay',
      'Sida 24 saac gudahood guri loogu dhiso 3D Printing',
      'Guri yar oo container ah oo qof kasta ka yaabiyay quruxdiisa'
    ],
    suggested_platform: 'YouTube Shorts / TikTok / Instagram Reels',
    content_format: 'Faceless / Video compilation / Voiceover',
    difficulty_level: 'Beginner',
    is_faceless_friendly: true,
    ai_tools: ['Leonardo.ai', 'ElevenLabs', 'CapCut'],
    category: 'Architecture & Design'
  },
  {
    id: 'niche-pranks-funny',
    name: 'Pranks & Funny Situations',
    name_so: 'Kaftan & Dhacdooyinka Qosolka leh',
    description_so: 'Muuqaallo gaagaaban oo qosol iyo xaalado lama filaan ah xambaarsan oo qoraal ama sharaxaad cod ah wata. Content-kani wuxuu keeni karaa rewatch value wanaagsan marka si hufan loo maareeyo.',
    description_en: 'Short-form comedy, clean humorous situations, and engaging reaction clips with strong retention hooks.',
    example_video_ideas: [
      '3 Kaftan oo dadkii loo sameeyay aysan waligood ilaawi doonin',
      'Xaalado qosol badan oo kaamirooyinka waddooyinka qabteen',
      'Falcelinta dadka marka ay arkaan qof taleefankiisa ku hadlaya oo yaab leh',
      'Waqtiyo cajiib ah oo carruurtu sameeyeen oo qosol reebay'
    ],
    suggested_platform: 'TikTok / YouTube Shorts / Facebook',
    content_format: 'Curated clips / Text-on-screen / Sound effects',
    difficulty_level: 'Beginner',
    is_faceless_friendly: true,
    ai_tools: ['CapCut', 'Soundly', 'ElevenLabs'],
    category: 'Entertainment'
  },
  {
    id: 'niche-history-stories',
    name: 'History & Historical Stories',
    name_so: 'Taariikhda & Sheekooyinka Taariikhiga ah',
    description_so: 'Sheekooyin xiiso badan oo ku saabsan dagaalladii hore, boqortooyooyinkii burburay, iyo geesiyaashii taariikhda. Sheekada wanaagsan waxay haysataa daawadayaasha bilow ilaa dhammaad.',
    description_en: 'Engaging storytelling about ancient civilizations, forgotten battles, and historic turning points.',
    example_video_ideas: [
      'Sirta ka dambaysay dhismaha Ahraamta Masar oo la ogaaday',
      'Sidee Boqortooyadii Cusmaaniyiintu u qabsadeen Constantinople?',
      'Sheekada yaabka leh ee ninkii ugu taajirsanaa taariikhda (Mansa Musa)',
      'Dagaalkii ugu gaabnaa taariikhda dunida oo socday 38 daqiiqo'
    ],
    suggested_platform: 'YouTube (Shorts & Long) / TikTok',
    content_format: 'Faceless / AI Images / Narrative Voiceover',
    difficulty_level: 'Intermediate',
    is_faceless_friendly: true,
    ai_tools: ['Midjourney', 'ElevenLabs', 'CapCut', 'ChatGPT'],
    category: 'History & Education'
  },
  {
    id: 'niche-animals-nature',
    name: 'Animals & Animal Stories',
    name_so: 'Xayawaanka & Dabeecadda Cajiibka ah',
    description_so: 'Dabeecadaha yaabka leh ee xayawaanka, daacadnimada xayawaanka rabaayadda ah, iyo xaqiiqooyinka duurjoogta. Waa niche jecel daawashada qoysaska iyo dhalinyarada.',
    description_en: 'Heartwarming animal rescues, wild animal superpowers, and nature mysteries.',
    example_video_ideas: [
      'Shabeelka Badda vs Yaxaas: Yaabaa awood badan biyaha dhexdiisa?',
      'Xayawaanka kaliya ee dunida ee aan waligood gabow iyo dhimasho dabiici ah aqoon',
      'Sheeko qiiro leh: Ey 10 sano sugayay milkiilihiisii oo geeriyooday',
      '5 Xayawaan oo leh awoodo u eg kuwa superheroes-ka'
    ],
    suggested_platform: 'YouTube Shorts / TikTok / Facebook',
    content_format: 'Faceless / B-roll compilation / Story voiceover',
    difficulty_level: 'Beginner',
    is_faceless_friendly: true,
    ai_tools: ['ChatGPT', 'ElevenLabs', 'CapCut'],
    category: 'Wildlife & Nature'
  },
  {
    id: 'niche-mystery-unsolved',
    name: 'Mystery & Unsolved Stories',
    name_so: 'Dhacdooyinka Dahsoon & Sheekooyinka Aan Xalka Lahayn',
    description_so: 'Xujooyinka dunida, diyaaradaha la waayay, meelaha dadku ku lumaan sida Bermuda Triangle. Niche-kani wuxuu leeyahay retention aad u sarreeya sababtoo ah daawaduhu wuxuu sugayaa natiijada.',
    description_en: 'Unsolved disappearances, mysterious historical artifacts, and unexplained anomalies.',
    example_video_ideas: [
      'Maxaa ku dhacay Diyaaraddii MH370? Xaqiiqooyinka aan weli la shaacin',
      'Bermuda Triangle: Maxaa maraakiibta iyo diyaaradaha halkaas ku liqa?',
      'Magaalo dhan oo hal habeen gudaheed dadkeedii oo dhan lagu waayay',
      'Sanduuq 2,000 sano jir ah oo cilmi-baarayaashu ku dhiirran waayeen inay furaan'
    ],
    suggested_platform: 'YouTube / TikTok / Facebook Reels',
    content_format: 'Faceless / Dark aesthetic / Suspense sound design',
    difficulty_level: 'Intermediate',
    is_faceless_friendly: true,
    ai_tools: ['Midjourney', 'ElevenLabs', 'CapCut'],
    category: 'Mystery & Storytelling'
  },
  {
    id: 'niche-space-universe',
    name: 'Space & Universe',
    name_so: 'Hawada Sare & Koonka Weyn',
    description_so: 'Sawirrada Telescope-ka James Webb, godadka madow (Black Holes), meerayaasha cusub, iyo xaqiiqooyinka koonka. Muuqaallada galactic-ka ah waxay dhiirrigeliyaan wadaagista.',
    description_en: 'Exploring black holes, distant exoplanets, James Webb discoveries, and cosmic scale mysteries.',
    example_video_ideas: [
      'Haddii aad ku dhacdo Black Hole, maxaa kugu dhacaya ilbiriqsigii ugu horreeyay?',
      'Meere dhan oo laga sameeyay Dheemman (Diamond Planet)',
      'Sidee Qorraxdu noqon doontaa 5 bilyan oo sano kadib?',
      'Codka cabsida leh ee Black Hole oo ay NASA duubtay'
    ],
    suggested_platform: 'YouTube Shorts / TikTok / Facebook',
    content_format: 'Faceless / NASA 4K footage / Cosmic AI Art',
    difficulty_level: 'Beginner',
    is_faceless_friendly: true,
    ai_tools: ['Midjourney', 'RunwayML', 'ElevenLabs', 'CapCut'],
    category: 'Science & Astronomy'
  },
  {
    id: 'niche-science-facts',
    name: 'Science Facts',
    name_so: 'Xaqiiqooyinka Sayniska & Cilmi-baarista',
    description_so: 'Xaqiiqooyin degdeg ah oo saynis ah oo ku saabsan jirka bini\'aadamka, maskaxda, iyo sharciyada physics-ka. Waxay ku fiican yihiin shorts-ka waxbarashada.',
    description_en: 'Fast-paced, verified scientific trivia about the human brain, biology, and chemistry.',
    example_video_ideas: [
      'Waxa maskaxdaada ku dhaca marka aad taleefanka eegto habeenkii gudcurka',
      'Wadnaheenna maalin kasta intee jeer ayuu garaacaa?',
      'Maxay biyaha barafka u dul sabbeeyaan halkii ay ka degi lahaayeen?',
      '3 Xaqiiqo oo ku saabsan DNA-gaaga oo aanad horay u maqal'
    ],
    suggested_platform: 'YouTube Shorts / TikTok',
    content_format: 'Faceless / Fast infographics / Dynamic text',
    difficulty_level: 'Beginner',
    is_faceless_friendly: true,
    ai_tools: ['ChatGPT', 'CapCut', 'ElevenLabs'],
    category: 'Science & Education'
  },
  {
    id: 'niche-motivation-success',
    name: 'Motivation & Success',
    name_so: 'Dhiirrigelin & Guusha Nolosha',
    description_so: 'Xikmado, dhiirrigelin, dabeecadaha dadka guuleystay, iyo sida looga baxo caajiska. Waxay leedahay dhagaystayaal daacad ah oo maalin kasta raba tamar wanaagsan.',
    description_en: 'Stoic philosophy, daily discipline reminders, and speeches designed to overcome procrastination.',
    example_video_ideas: [
      'Haddii aad dareemayso in waqtigu kaa lumay, daawo 60-kan ilbiriqsi',
      '3 Dabeecadood oo qof kasta oo sabool ah ku celceliyo',
      'Sirta nolosha ee Marcus Aurelius: Sida looga guuleysto fekerka badan',
      'Hal sano oo adkaysi ah: Sida aad noloshaada ugu beddeli karto 365 maalmood'
    ],
    suggested_platform: 'YouTube Shorts / TikTok / Instagram Reels',
    content_format: 'Faceless / Dark cinematic / Deep voiceover',
    difficulty_level: 'Beginner',
    is_faceless_friendly: true,
    ai_tools: ['ElevenLabs', 'CapCut', 'Midjourney'],
    category: 'Motivation & Mindset'
  },
  {
    id: 'niche-football-edits',
    name: 'Football',
    name_so: 'Kubadda Cagta & Football Edits',
    description_so: 'Highlights-ka ciyaartoyda, xirfadaha, velocity edits, iyo beat sync videos. Niche-kani wuxuu u baahan yahay xirfado CapCut iyo Alight Motion oo tayadoodu sarreyso.',
    description_en: 'Cinematic sports highlights, velocity beat syncs, and viral player storytelling for football fans.',
    example_video_ideas: [
      'Cristiano Ronaldo vs Messi: Waqtiyadii ugu xusuusta badnaa ee El Clasico',
      'Real Madrid Comeback: Velocity Edit leh dhawaaq wadnaha taabanaya',
      'Lamine Yamal: Xirfadaha cajiibka ah ee da\'da 17 sano',
      'Goolashii ugu waalida badnaa ee taariikhda Champions League'
    ],
    suggested_platform: 'TikTok / YouTube Shorts / Instagram Reels',
    content_format: 'Mobile Video Edit / CapCut / Alight Motion',
    difficulty_level: 'Intermediate',
    is_faceless_friendly: true,
    ai_tools: ['CapCut', 'Alight Motion', 'Topaz Video AI'],
    category: 'Sports & Editing'
  },
  {
    id: 'niche-gaming-stream',
    name: 'Gaming',
    name_so: 'Cayaaraha & Gaming Moments',
    description_so: 'Moments-ka ugu xiisaha badan ee FIFA/FC24, PUBG, GTA, iyo cayaaraha mobile-ka. Waxaa lagu dari karaa cod sharaxaad ah ama qoraallo firfircoon.',
    description_en: 'Epic clutches, hilarious fails, and secret easter eggs across popular video games.',
    example_video_ideas: [
      'Waqtigii ugu yaabka badnaa ee GTA 5 oo qofna uusan fileyn',
      'PUBG Mobile: 1 vs 4 clutch daqiiqaddii ugu dambeysay',
      '5 Sir oo ku qarsoon EA FC 24 oo aad goolal badan ku dhalin karto',
      'Cayaartoyda ugu fiican dunida markii ay ku kufaan cayaar fudud'
    ],
    suggested_platform: 'YouTube (Shorts/Long) / TikTok / Twitch',
    content_format: 'Gameplay Capture / Facecam or Faceless voiceover',
    difficulty_level: 'Beginner',
    is_faceless_friendly: true,
    ai_tools: ['CapCut', 'OBS Studio', 'ElevenLabs'],
    category: 'Gaming'
  },
  {
    id: 'niche-ai-tools-tutorials',
    name: 'AI Tools & Tutorials',
    name_so: 'Aaladaha AI & Hagaha Isticmaalka',
    description_so: 'Sharaxaadda tooska ah ee websaytyada iyo aaladaha AI ee dadka shaqada u fududeeya. Niche-kani wuxuu aad u soo jiitaa dadka shaqada online-ka ah doonaya.',
    description_en: 'Actionable step-by-step tutorials on free AI tools for productivity, video, and design.',
    example_video_ideas: [
      '3 Websayt oo AI ah oo kuu samaynaya PowerPoint dhammaystiran 30 ilbiriqsi gudahood',
      'Sida bilaash loogu sameeyo codkaaga oo AI ku hadlaya 10 luqadood oo kala duwan',
      'Aalad AI oo videos-kaaga YouTube si toos ah ugu daraysa subtitles qurux badan',
      'ChatGPT Hacks: 5 Prompt oo shaqadaada kuu badbaadinaya 5 saacadood maalin kasta'
    ],
    suggested_platform: 'YouTube / TikTok / LinkedIn',
    content_format: 'Screen recording / Voiceover / Tutorial',
    difficulty_level: 'Beginner',
    is_faceless_friendly: true,
    ai_tools: ['ChatGPT', 'CapCut', 'Screen Recorder', 'Canva'],
    category: 'Education & Tech'
  },
  {
    id: 'niche-luxury-expensive',
    name: 'Luxury & Expensive Things',
    name_so: 'Nolosha Qaliga ah & Waxyaabaha Dunida ugu Qaalisan',
    description_so: 'Diyaaradaha gaarka ah, maraakiibta yacht-ka ah, saacadaha malaayiinta dollar jooga, iyo nolosha bilyaneerrada. Dadku waxay jecel yihiin daawashada nolosha qaaliga ah.',
    description_en: 'Fascinating tours of private jets, mega-yachts, haute horlogerie, and billionaire lifestyle assets.',
    example_video_ideas: [
      'Gudaha diyaaradda gaarka ah ee $400 Million oo qasri ah',
      'Saacadda dunida ugu qaalisan oo $55 Million joogta: Maxaa ku dhex jira?',
      'Hotel-ka ugu qaalisan dunida: $100,000 hal habeen oo keliya!',
      'Guryaha ay ku nool yihiin Elon Musk, Jeff Bezos, iyo Mark Zuckerberg'
    ],
    suggested_platform: 'YouTube Shorts / TikTok / Instagram Reels',
    content_format: 'Faceless / High-res B-roll / Story voiceover',
    difficulty_level: 'Beginner',
    is_faceless_friendly: true,
    ai_tools: ['Midjourney', 'ElevenLabs', 'CapCut'],
    category: 'Luxury & Lifestyle'
  },
  {
    id: 'niche-cars-supercars',
    name: 'Cars & Supercars',
    name_so: 'Baabuurta & Supercars-ka Casriga ah',
    description_so: 'Baabuurta ugu dheereeya dunida, naqshadaha cusub ee korontada, iyo codadka xooggan ee matoorada V8/V12. Waxay leedahay bulsho aad u ballaaran.',
    description_en: 'Supercar engine sounds, drag race breakdowns, and electric vehicle innovation reviews.',
    example_video_ideas: [
      'Bugatti vs Koenigsegg: Baabuurkee baa ugu dheereeya dunida 2026?',
      'Baabuur $3 Million jooga oo 1 ilbiriqsi gudaheed 100km/h ku gaaraya',
      'Muxuu Rolls-Royce u yahay baabuurka ugu qaalisan ee aamusnaanta badan?',
      '5 Baabuur oo mustaqbalka oo duuli kara ama biyaha geli kara'
    ],
    suggested_platform: 'YouTube Shorts / TikTok / Facebook',
    content_format: 'Sound effects / Fast cuts / Car footage',
    difficulty_level: 'Beginner',
    is_faceless_friendly: true,
    ai_tools: ['CapCut', 'ElevenLabs'],
    category: 'Automotive'
  },
  {
    id: 'niche-travel-places',
    name: 'Travel & Beautiful Places',
    name_so: 'Socdaalka & Meelaha Dunida Ugu Quruxda Badan',
    description_so: 'Jasiiradaha qarsoon, magaalooyinka taariikhiga ah, dabeecadda cajiibka ah, iyo hagaha safarrada jaban. Waxay leedahay daawasho caalami ah.',
    description_en: 'Breathtaking travel cinematography, hidden budget destinations, and cultural landmarks.',
    example_video_ideas: [
      '5 Waddan oo aad u qurux badan oo aad maalintii $20 oo kaliya ku joogi karto',
      'Jasiirad dunida ku taal oo aan baabuur laga ogolayn balse janno u eg',
      'Magaalada Switzerland ee hawadeeda nadiifka ah qof kasta ku riyoodo',
      'Meelaha ugu quruxda badan Soomaaliya ee dabiiciga ah'
    ],
    suggested_platform: 'YouTube (Shorts/Long) / Instagram / TikTok',
    content_format: '4K scenic videos / Relaxing soundtrack / Voiceover',
    difficulty_level: 'Beginner',
    is_faceless_friendly: true,
    ai_tools: ['CapCut', 'ElevenLabs', 'Canva'],
    category: 'Travel & Culture'
  },
  {
    id: 'niche-food-cooking',
    name: 'Food & Cooking',
    name_so: 'Cuntada & Cunto Karinta Casriga ah',
    description_so: 'Cuntooyin degdeg ah oo 10 daqiiqo lagu sameeyo, cuntada waddooyinka (Street food), iyo farsamooyinka jikada. Dadku waxay jecel yihiin daawashada habka cuntada loo diyaariyo.',
    description_en: 'Sensory ASMR cooking, 10-minute quick recipes, and global street food explorations.',
    example_video_ideas: [
      'Cunto aad u macaan oo aad 5 maaddadood oo kaliya ku samayn karto gurigaaga',
      'Cuntada waddooyinka Japan: Sida loo sameeyo canjeelada caanka ah ee Fluffy',
      'Quraac caafimaad leh oo 5 daqiiqo ku diyaarsan',
      'Sambusad iyo cuntooyinka Soomaalida ee sida casriga ah loo habeeyay'
    ],
    suggested_platform: 'TikTok / YouTube Shorts / Facebook',
    content_format: 'ASMR / Recipe text / Close-up cooking shots',
    difficulty_level: 'Beginner',
    is_faceless_friendly: true,
    ai_tools: ['CapCut', 'Canva'],
    category: 'Food & Cooking'
  },
  {
    id: 'niche-business-entrepreneurship',
    name: 'Business & Entrepreneurship',
    name_so: 'Ganacsiga & Fikradaha Dhaqaalaha',
    description_so: 'Sheekooyinka shirkadaha waaweyn sida Apple, Amazon, Nike, iyo sababihii ay ku guuleysteen ama ku fashilmeen. Waxay soo jiidataa dadka hanka leh.',
    description_en: 'Deep-dive business case studies on growth, brand psychology, and startup success stories.',
    example_video_ideas: [
      'Sidee Nike ugu garaacday Adidas hal kab oo Michael Jordan loo sameeyay?',
      'Sidee shirkadda Nokia oo dunida haysatay hal go\'aan ku burburtay?',
      'Sirta ka dambaysa in McDonald\'s uusan ahayn shirkad burger balse yahay shirkad dhul!',
      '3 Fikradood oo ganacsi oo yar oo qofku ku bilaabi karo lacag yar'
    ],
    suggested_platform: 'YouTube / TikTok / LinkedIn',
    content_format: 'Faceless / Documentary style / Business graphics',
    difficulty_level: 'Intermediate',
    is_faceless_friendly: true,
    ai_tools: ['ChatGPT', 'ElevenLabs', 'Midjourney', 'CapCut'],
    category: 'Business & Finance'
  },
  {
    id: 'niche-interesting-facts',
    name: 'Interesting Facts',
    name_so: 'Xaqiiqooyin Cajiib ah oo Yaab leh',
    description_so: 'Waxyaabo yaab leh oo ku saabsan dunida oo dadka badankiisu aysan ogayn. Niche-kani wuxuu ku fiican yahay Shorts-ka sababtoo ah qofku wuxuu rabaa inuu la yaabo.',
    description_en: 'Mind-bending trivia, historical coincidences, and daily curiosity hooks that stop the scroll.',
    example_video_ideas: [
      'Xaqiiqooyin ku saabsan jirkaaga oo haddii aad ogaato aad yaabi doonto',
      'Muxuu baasaboorka Singapore u yahay kan ugu awoodda badan dunida?',
      '3 Meel oo dhulka ku taal oo cuf-jiidka (gravity) uusan si caadi ah uga shaqayn',
      'Sababta dhabta ah ee diyaaradaha loo dhigo kursi midabkiisu buluug yahay'
    ],
    suggested_platform: 'YouTube Shorts / TikTok',
    content_format: 'Faceless / Fast pacing / Strong hook',
    difficulty_level: 'Beginner',
    is_faceless_friendly: true,
    ai_tools: ['ChatGPT', 'ElevenLabs', 'CapCut'],
    category: 'Facts & Trivia'
  },
  {
    id: 'niche-horror-mystery',
    name: 'Horror / Mystery Stories',
    name_so: 'Sheekooyinka Cabsida & Xaqiiqooyinka Mugdiga ah',
    description_so: 'Sheekooyin cabsi leh, guryaha laga guuray, iyo dhacdooyin dhab ah oo habeenkii dhacay. Codka xabeebta leh iyo muusigga mugdiga ah waxay abuuraan jawi soo jiidasho leh.',
    description_en: 'Atmospheric campfire horror stories, abandoned location lore, and chilling historical folklore.',
    example_video_ideas: [
      '3 Dhacdo oo dhab ah oo cabsi leh oo ku dhacay dad kaligood guri joogay',
      'Hotel-ka laga wada qaxay ee buuraha ku dhex yaal: Maxaa ka dhacay gudaha?',
      'Fariin cod ah oo laga helay taleefan badda laga soo saaray 10 sano kadib',
      'Magaalada looga cararay cabsida darteed ee Japan ku taal'
    ],
    suggested_platform: 'YouTube (Shorts & Long) / TikTok',
    content_format: 'Faceless / Atmospheric dark visual / Suspense audio',
    difficulty_level: 'Intermediate',
    is_faceless_friendly: true,
    ai_tools: ['Midjourney', 'ElevenLabs', 'CapCut'],
    category: 'Horror & Mystery'
  },
  {
    id: 'niche-3d-cartoon-stories',
    name: '3D Cartoon Stories',
    name_so: 'Sheekooyinka Animation-ka & 3D Cartoons',
    description_so: 'Sheekooyin carruureed, xikmado, iyo animation 3D ah oo lagu sameeyo qalabka casriga ah ee AI. Niche-kani wuxuu leeyahay daawasho aad u sareysa maadaama carruurtu dib iyo dib u daawadaan.',
    description_en: 'Engaging 3D animated fables, moral bedtime stories, and stylized kids educational shorts.',
    example_video_ideas: [
      'Sheekada wiilkii beenta badnaa iyo yeeydii (3D Animation)',
      'Sidee libaaxii iyo jiirkii saaxiib ku noqdeen (Sheeko xikmad leh)',
      'Safarkii geesiga yar ee tagay jasiiradda sixirka ah',
      'Casharro carruur: Barashada xarfaha iyo lambarrada oo leh 3D cartoon'
    ],
    suggested_platform: 'YouTube Kids / YouTube Shorts / TikTok',
    content_format: '3D Animation / Wholesome storytelling / Sound effects',
    difficulty_level: 'Intermediate',
    is_faceless_friendly: true,
    ai_tools: ['Midjourney', 'Leonardo.ai', 'RunwayML', 'CapCut', 'ElevenLabs'],
    category: 'Animation & Kids'
  }
];
