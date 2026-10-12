import { ViewsGuideTopic } from '../types.js';

export const initialViewsGuides: ViewsGuideTopic[] = [
  {
    id: 'guide-strong-hooks',
    title_so: '1. Hook-ka Xooggan (Strong Hooks)',
    title_en: '1. Crafting Strong Hooks',
    category: 'Hooks & First Seconds',
    key_metric: '0-3s Drop-off rate < 25%',
    summary_so: 'Hook-ku waa jumalada ugu horreysa ama ficilka ugu horreeya ee daawadaha ku qasba inuu sii joogo. Haddii bilowgu daciif yahay, qofna ma daawan doono nuxurka intiisa kale.',
    summary_en: 'The first hook determines whether a viewer stays or scrolls away.',
    actionable_steps_so: [
      'Biloow su\'aal xiiso leh ama weedh dhiirrigelinaysa cajiibnimo ("Marna ha taaban lambarkan haddii...")',
      'Marna ha ku bilaabin logo-gaaga, salaan dheer, ama "Ku soo dhawoow kanaalkayga"',
      'Muuji ficil ama natiijo yaab leh ilbiriqsigii koowaad (Visual Hook)'
    ],
    actionable_steps_en: [
      'Start with high curiosity immediately',
      'Cut intros and greetings',
      'Pair spoken hook with matching on-screen motion'
    ],
    common_mistakes_so: [
      'Hordhac dheer oo 10 ilbiriqsi ah',
      'Inaad bilowdo adigoo leh "Maanta waxaan ka hadlaynaa..." halkii aad toos mawduuca ka geli lahayd'
    ],
    recommended_course_id: 'course-shorts-monetization'
  },
  {
    id: 'guide-first-1-3-seconds',
    title_so: '2. 1-3-da Ilbiriqsi ee Hore (First 1-3 Seconds)',
    title_en: '2. The Critical First 1-3 Seconds',
    category: 'Hooks & First Seconds',
    key_metric: 'Viewed vs Swiped Away > 75%',
    summary_so: 'Platform-yada gaagaaban (Shorts & TikTok) waxay daawadaha siinayaan fursad uu hal far kaga gudbo muuqaalkaaga. 3-da ilbiriqsi ee hore waa halka lagu kala baxo.',
    summary_en: 'The 3-second window decides the algorithmic fate of any short-form clip.',
    actionable_steps_so: [
      'Ka dhig motion-ka bilowga mid degdeg ah (Fast pacing & dynamic text)',
      'Ku dar cod ama sound effect (whoosh, pop, ding) ilbiriqsigii 1-aad',
      'Hubi in qoraalka shaashadda (captions) uu si weyn u muuqdo'
    ],
    actionable_steps_en: [
      'Inject immediate visual motion',
      'Layer snappy sound effects at second 0',
      'Use bold, large on-screen animated subtitles'
    ],
    common_mistakes_so: [
      'Shaashad aamusan ama qoraal aad u yar oo aan la akhrin karin',
      'Muuqaal tartiib ah oo caajis ah bilowga'
    ],
    recommended_course_id: 'course-shorts-monetization'
  },
  {
    id: 'guide-retention',
    title_so: '3. Haysashada Daawadayaasha (Retention & Pacing)',
    title_en: '3. Audience Retention & Pacing',
    category: 'Retention',
    key_metric: 'Audience Retention Curve > 80%',
    summary_so: 'Retention waa cabbirka muujinaya celcelis ahaan intee in le\'eg ayuu qofku daawaday muuqaalkaaga. YouTube wuxuu aad u jecel yahay muuqaallada daawadayaasha muddo dheer haya.',
    summary_en: 'Retention is YouTube’s primary satisfaction signal.',
    actionable_steps_so: [
      'Beddel xagasha kaamerada ama sawirka 3-5 ilbiriqsi kasta (Visual resets)',
      'Jar meel kasta oo aamusnaan ah (Remove all dead air and breathing pauses)',
      'Abuuro "Open Loops": Su\'aalo aad jawaabtooda ku hayso ilaa dhammaadka'
    ],
    actionable_steps_en: [
      'Apply visual resets every 3-5 seconds',
      'Eliminate all dead air',
      'Chain micro-questions that resolve near the finish'
    ],
    common_mistakes_so: [
      'Hal sawir ama hal meel oo 20 ilbiriqsi aan isbeddel lahayn',
      'Jawaabta oo dhan oo la bixiyo bilowga kadibna qofku ka tago'
    ],
    recommended_course_id: 'course-yt-automation'
  },
  {
    id: 'guide-ctr-click-through',
    title_so: '4. Heerka Gujinta (Click-Through Rate - CTR)',
    title_en: '4. Click-Through Rate (CTR)',
    category: 'CTR & Packaging',
    key_metric: 'CTR > 6% - 10%',
    summary_so: 'CTR waa boqolkiiba inta qof ee riixday muuqaalkaaga markii YouTube shaashadda ugu soo bandhigay (Impressions). Haddii CTR uu hooseeyo, muuqaalku views ma helayo.',
    summary_en: 'CTR measures the magnetic pull of your title and thumbnail package.',
    actionable_steps_so: [
      'Isku xir Title-ka iyo Thumbnail-ka si ay isu dhamaystiraan halkii ay isku hadal noqon lahaayeen',
      'Gal YouTube Studio > Reach > Hubi CTR 24 saac gudahood',
      'Haddii CTR uu ka yar yahay 4%, isla markiiba tijaabi Thumbnail iyo Title cusub'
    ],
    actionable_steps_en: [
      'Make title and thumbnail complementary, not duplicate',
      'Check Reach metrics within the first 24 hours',
      'A/B test replacement thumbnails if CTR falls below 4%'
    ],
    common_mistakes_so: [
      'In qoraalka thumbnail-ka lagu qoro isla cinwaanka oo dhan',
      'Midabbo madow oo aan ka dhex muuqan iftiinka YouTube'
    ],
    recommended_course_id: 'course-yt-automation'
  },
  {
    id: 'guide-thumbnails',
    title_so: '5. Sawirka Madaxa (Thumbnails)',
    title_en: '5. High-Impact Thumbnails',
    category: 'CTR & Packaging',
    key_metric: 'Mobile Readability at 100x100px',
    summary_so: 'Thumbnail-ku waa albaabka kanaalkaaga. 90% dadku waxay muuqaal ku doortaan sida uu u eg yahay sawirka madaxu marka ay dhex marayaan taleefankooda.',
    summary_en: 'Your thumbnail is a billboard for phone screens.',
    actionable_steps_so: [
      'Ha gelin wax ka badan 3 ilaa 4 eray oo waaweyn (High contrast font)',
      'Isticmaal wejiyo leh dareen xooggan (lama filaan, cabsi, farxad)',
      'Gadaal ka dhig midab ka duwan kan afka hore (High Color Contrast)'
    ],
    actionable_steps_en: [
      'Cap text at 3-4 high-contrast words',
      'Use high-emotion human or stylized focal points',
      'Optimize for small screens by zooming out before saving'
    ],
    common_mistakes_so: [
      'Thumbnail aad u buuxa oo faahfaahin badan lagu qoray',
      'Qoraal aad u yar oo taleefanka lagu akhrin karin'
    ],
    recommended_course_id: 'course-yt-automation'
  },
  {
    id: 'guide-titles',
    title_so: '6. Cinwaannada Soojiidashada leh (Magnetic Titles)',
    title_en: '6. Magnetic Video Titles',
    category: 'CTR & Packaging',
    key_metric: 'Character count < 55 characters',
    summary_so: 'Cinwaanka wanaagsan wuxuu abuuraa baahi degdeg ah (Urgency) ama xiiso weyn (Curiosity). Waa inuu noqdaa mid toos ah oo taleefanka ku wada muuqda.',
    summary_en: 'Craft titles that trigger curiosity and emotional investment.',
    actionable_steps_so: [
      'Ku hay cinwaanka ka yar 50-60 xaraf si uusan taleefanka ugu go\'in (...)',
      'Isticmaal weedho toos ah: "Sidee...", "Sababta dhabta ah ee...", "Marna ha..."',
      'Ilaali ballanta cinwaanka si aadan clickbait been ah u noqon'
    ],
    actionable_steps_en: [
      'Keep titles under 55 characters to avoid mobile truncation',
      'Front-load power keywords',
      'Deliver on the title promise to maintain trust'
    ],
    common_mistakes_so: [
      'Cinwaan aad u dheer oo caajis ah sida: "Video ku saabsan barashada..."',
      'Cinwaan aan wax xiiso ah u lahayn qofka caadiga ah'
    ],
    recommended_course_id: 'course-shorts-monetization'
  },
  {
    id: 'guide-shorts-structure',
    title_so: '7. Qaab-dhismeedka Shorts-ka (Shorts Structure)',
    title_en: '7. Short-Form Video Architecture',
    category: 'Shorts & Formatting',
    key_metric: 'Pacing: 15s to 35s optimal sweet spot',
    summary_so: 'Shorts-ka guuleysta ma dhacaan si kadis ah; waxay leeyihiin qaab-dhismeed sax ah: Hook (0-3s), Build-up (4-15s), Climax/Value (16-25s), iyo Seamless Loop.',
    summary_en: 'Predictable structural beats drive viral short-form performance.',
    actionable_steps_so: [
      '0-3s: Hook xooggan oo la xiriira su\'aal ama ficil',
      '4-20s: Faahfaahin degdeg ah oo aan lahayn ereyo macno darro ah',
      'Dhammaad: Ka dhig mid si dabiici ah ugu xirma bilowga (Loop Loop)'
    ],
    actionable_steps_en: [
      'Structure into Hook -> Escalation -> Punchline/Resolution',
      'Keep pacing brisk without verbal filler',
      'Blend the outro audio into the intro phrase'
    ],
    common_mistakes_so: [
      'Shorts aad u dheer oo 55 ilbiriqsi ah oo wax macno leh aysan ku jirin',
      'In lagu daro codsi dheer sida "Fadlan subscribe saara oo share gareeya"'
    ],
    recommended_course_id: 'course-shorts-monetization'
  },
  {
    id: 'guide-youtube-seo',
    title_so: '8. YouTube SEO & Metadata',
    title_en: '8. YouTube SEO & Algorithmic Metadata',
    category: 'Algorithm & SEO',
    key_metric: 'Search impressions & Browse feature balance',
    summary_so: 'SEO (Search Engine Optimization) waxay ka caawisaa YouTube inuu fahmo mawduuca muuqaalkaaga si uu ugu geeyo dadka saxda ah ee xiiseeya.',
    summary_en: 'Clear metadata helps YouTube index and match your content to the right viewers.',
    actionable_steps_so: [
      'Geli ereyada muhiimka ah (keywords) labada sadar ee ugu horreeya description-ka',
      'Isticmaal 3 ilaa 5 hashtag oo toos u taabanaya niche-kaaga (#Shorts #Football #Tech)',
      'Samee playlist mawduuc gaar ah leh si dadku u wada daawadaan dhammaan videos-kaaga'
    ],
    actionable_steps_en: [
      'Place top keywords in the first 2 sentences of the description',
      'Use 3-5 hyper-relevant hashtags',
      'Group related videos into topic playlists to spark session watch time'
    ],
    common_mistakes_so: [
      'In description-ka laga buuxiyo 50 tags oo aan la xiriirin muuqaalka (Spam tags)',
      'In la iska daayo description-ka oo maran'
    ],
    recommended_course_id: 'course-yt-automation'
  },
  {
    id: 'guide-audience-targeting',
    title_so: '9. Barashada Dhagaystayaasha (Audience Targeting)',
    title_en: '9. Audience Targeting & Viewer Persona',
    category: 'Audience & Strategy',
    key_metric: 'Returning Viewers count',
    summary_so: 'Muuqaalka loogu talagalay "qof kasta" ugu dambeyntii qofna ma daawado. Xulo qofka aad la hadlayso: da\'diisa, luqaddiisa, iyo xiisihiisa gaarka ah.',
    summary_en: 'Targeting everybody produces content for nobody.',
    actionable_steps_so: [
      'U samee muuqaalka hal qof oo gaar ah oo aad taqaano baahidiisa',
      'Eeg YouTube Studio > Analytics > Audience > Da\'da iyo waddamada ugu badan',
      'U door luqadda iyo qaabka hadalka mid ku habboon dhagaystayaashaada'
    ],
    actionable_steps_en: [
      'Design content for a singular, clear viewer persona',
      'Track geographic and demographic clusters in Analytics',
      'Match tone and cultural context to that core group'
    ],
    common_mistakes_so: [
      'In hal kanaal lagu soo geliyo maanta ciyaaro, berrito cunto, maalin kalena siyaasad'
    ],
    recommended_course_id: 'course-yt-automation'
  },
  {
    id: 'guide-posting-consistency',
    title_so: '10. Joogteynta Soo Gelinta (Posting Consistency)',
    title_en: '10. Posting Consistency & Cadence',
    category: 'Audience & Strategy',
    key_metric: 'Predictable schedule (e.g. 1 video/day or 3/week)',
    summary_so: 'Joogteyntu micnaheedu ma ahan in maalin kasta la soo geliyo 10 muuqaal oo liita. Waxay micnaheedu tahay in jadwalkaaga la ogyahay tayadana la ilaaliyo.',
    summary_en: 'Consistency means predictable quality over frantic quantity.',
    actionable_steps_so: [
      'Xulo jadwal aad awoodi karto (tusaale: 1 Shorts maalin kasta ama 3 todobaadkii)',
      'Horay u diyaari 10 muuqaal (Content Batching) ka hor inta aadan bilaabin',
      'Ha quusan haddii 10-ka muuqaal ee ugu horeeya aysan helin views badan'
    ],
    actionable_steps_en: [
      'Select a sustainable rhythm you can stick to for 6 months',
      'Batch-create 10 videos in advance before public release',
      'Judge results on 30-day averages, not single uploads'
    ],
    common_mistakes_so: [
      'Soo gelinta 5 muuqaal hal maalin gudaheed, kadibna 2 bilood oo la waayo',
      'Quusasho degdeg ah toddobaadka koowaad'
    ],
    recommended_course_id: 'course-shorts-monetization'
  },
  {
    id: 'guide-niche-consistency',
    title_so: '11. Hal Niche ku Xirnaanshaha (Niche Consistency)',
    title_en: '11. Niche Purity & Categorization',
    category: 'Audience & Strategy',
    key_metric: 'Viewer interest overlap > 90%',
    summary_so: 'Algorithm-ku wuxuu u baahan yahay inuu ogaado nooca dadka uu u geynayo muuqaalkaaga. Haddii aad niche-ka beddesho maalin kasta, algorithm-ku wuu wareeraa.',
    summary_en: 'Niche discipline allows YouTube to reliably find your audience.',
    actionable_steps_so: [
      'Dooro hal mawduuc ugu yaraan 30-ka muuqaal ee ugu horreeya',
      'Haddii aad doonayso niche cusub, fur kanaal gaar ah',
      'Ha ku khaldin taageerayaashaada mawduucyo aysan u imaan'
    ],
    actionable_steps_en: [
      'Maintain one strict niche for at least your first 30 uploads',
      'Spin off separate channels for completely unrelated topics',
      'Build topic authority before branching out'
    ],
    common_mistakes_so: [
      'In hal kanaal loo isticmaalo sida barta shakhsiga ah ee TikTok ama WhatsApp'
    ],
    recommended_course_id: 'course-yt-automation'
  },
  {
    id: 'guide-watch-time-avd',
    title_so: '12. Muddada Daawashada & AVD (Watch Time)',
    title_en: '12. Watch Time & Average View Duration',
    category: 'Analytics & Metrics',
    key_metric: 'AVD > 80% for Shorts, > 45% for Long-form',
    summary_so: 'Average View Duration (AVD) waa celceliska daqiiqadaha ama ilbiriqsiyada daawadayaashu ku qaataan muuqaalkaaga. Waa shidaalka ugu weyn ee koboca kanaalka.',
    summary_en: 'Watch time is the engine of algorithmic promotion.',
    actionable_steps_so: [
      'Shorts-ka ka dhig mid adag oo la safeeyay oo aan erey aan loo baahnayn ku jirin',
      'Geli xujo ama countdown si qofku u sugo ilaa ilbiriqsiga ugu dambeeya',
      'Haddii muuqaalkaagu yahay 30s, isku day in AVD-gu gaaro 25s+'
    ],
    actionable_steps_en: [
      'Trim unnecessary sentences ruthlessly in post-production',
      'Use progress bars or countdown cues',
      'Aim for > 85% AVD on videos under 30 seconds'
    ],
    common_mistakes_so: [
      'Muuqaal dheeraysasho aan tayo lahayn oo daawadaha ka ceyriya bartamaha'
    ],
    recommended_course_id: 'course-shorts-monetization'
  },
  {
    id: 'guide-rewatch-value',
    title_so: '13. Dib u Daawashada (Rewatch Value & Loops)',
    title_en: '13. Rewatch Value & Infinite Loops',
    category: 'Shorts & Formatting',
    key_metric: 'Retention Percentage > 100%',
    summary_so: 'Marka qofku muuqaalkaaga laba jeer daawado, YouTube wuxuu u arkaa in muuqaalkani yahay mid heer sare ah, wuxuuna gaarsiinayaa malaayiin qof.',
    summary_en: 'Seamless loops drive total watch time past 100%.',
    actionable_steps_so: [
      'Ku dhamee jumladaada eray si toos ah ugu xirma erayga ugu horreeya ee bilowga',
      'Geli xaqiiqooyin degdeg ah oo daawaduhu u baahdo inuu hakiyo (Pause) ama laba jeer eego',
      'Ha gelin wax calaamad ah oo muujinaya in muuqaalku dhammaaday (sida fade out)'
    ],
    actionable_steps_en: [
      'Blend the final spoken sentence with the opening words',
      'Include fast on-screen details that reward a second viewing',
      'Avoid fade-to-black endings'
    ],
    common_mistakes_so: [
      'Shaashad madow oo 3 ilbiriqsi ah dhammaadka oo qofka ka fujisa'
    ],
    recommended_course_id: 'course-shorts-monetization'
  },
  {
    id: 'guide-engagement',
    title_so: '14. Falcelinta Dadka (Engagement & Comments)',
    title_en: '14. Audience Engagement & Community Signals',
    category: 'Audience & Strategy',
    key_metric: 'Likes, Shares & Comments ratio',
    summary_so: 'Faallooyinka (comments) iyo wadaagista (shares) waxay algorithm-ka u sheegaan in muuqaalkani dadka dareenkooda taabtay oo dadku ka hadlayaan.',
    summary_en: 'Comments and shares indicate deep psychological connection.',
    actionable_steps_so: [
      'Weydii su\'aal dood keeni karta dhammaadka: "Adigu labadan keed dooran lahayd?"',
      'Ku dheji faalladaada ugu horreysa (Pinned comment) su\'aal furan',
      'U jawaab 20-ka qof ee ugu horreeya ee faallo ka bixiya saacadda ugu horreysa'
    ],
    actionable_steps_en: [
      'End with an open question that sparks friendly debate',
      'Pin an engaging starter comment',
      'Reply to the first wave of comments within the first 60 minutes'
    ],
    common_mistakes_so: [
      'In la iska indho-tiro dhammaan faallooyinka taageerayaasha'
    ],
    recommended_course_id: 'course-shorts-monetization'
  },
  {
    id: 'guide-youtube-analytics',
    title_so: '15. Fahamka YouTube Analytics',
    title_en: '15. Decoding YouTube Analytics',
    category: 'Analytics & Metrics',
    key_metric: 'Traffic Sources: Shorts Feed vs Browse',
    summary_so: 'Data-du ma been sheegto. Halkii aad qiyaasi lahayd waxa khaldan, YouTube Analytics wuxuu kuu sheegayaa ilbiriqsiga saxda ah ee dadku ka baxeen muuqaalkaaga.',
    summary_en: 'Analytics eliminate guesswork by pinpointing exact viewer drop-offs.',
    actionable_steps_so: [
      'Fur YouTube Studio > Analytics > Content > Audience Retention graph',
      'Eeg meesha xariiqdu hoos ugu dhacday (Dips) si aad u ogaato waxa caajiska keenay',
      'Eeg meelaha xariiqdu kor u kacday (Spikes) si aad u ogaato waxa dadku jeclaysteen'
    ],
    actionable_steps_en: [
      'Analyze the Audience Retention drop-off curve for sharp dips',
      'Note moments where retention spikes to duplicate that style',
      'Track traffic source trends week over week'
    ],
    common_mistakes_so: [
      'In la eego kaliya tirada views-ka halkii laga eegi lahaa AVD iyo CTR'
    ],
    recommended_course_id: 'course-yt-automation'
  },
  {
    id: 'guide-content-testing',
    title_so: '16. Tijaabinta Content-ka (A/B Testing)',
    title_en: '16. Content Testing & Iteration',
    category: 'Strategy & Growth',
    key_metric: 'Test variations of Titles & Thumbnails',
    summary_so: 'Marna ha ku kalsoonaan kaliya hal feker. Abuurayaasha ugu waaweyn waxay tijaabiyaan cinwaanno iyo sawirro kala duwan si ay u helaan midka ugu fiican.',
    summary_en: 'Top creators treat every upload as an ongoing experiment.',
    actionable_steps_so: [
      'Diyaari 2 thumbnail oo kala duwan muuqaal kasta',
      'Haddii 48 saac gudahood views-ku ku xayirnaado, beddel Title-ka ama Thumbnail-ka',
      'Tijaabi dherer kala duwan: mid 20 ilbiriqsi ah iyo mid 45 ilbiriqsi ah'
    ],
    actionable_steps_en: [
      'Design two distinct thumbnail styles per long video',
      'Swap packaging if an upload stalls within 48 hours',
      'Vary short-form durations (15s vs 40s) to gauge audience tolerance'
    ],
    common_mistakes_so: [
      'In muuqaalka la masaxo isla markiiba marka uu views waayo halkii la beddeli lahaa packaging-ka'
    ],
    recommended_course_id: 'course-yt-automation'
  },
  {
    id: 'guide-avoid-repetitive',
    title_so: '17. Ka Fogaanshaha Content-ka Soo Noqnoqda',
    title_en: '17. Avoiding Repetitive Content Penalties',
    category: 'Strategy & Growth',
    key_metric: 'YouTube Monetization Compliance',
    summary_so: 'YouTube wuxuu leeyahay xeerar adag oo ku saabsan Repetitious Content iyo Reused Content. Waa inaad muuqaal kasta gelisaa taabasho cusub iyo qiime dhab ah.',
    summary_en: 'Stay clear of repetitive content flags by ensuring human transformative value.',
    actionable_steps_so: [
      'Ha ku celin isla hal muusig iyo isla hal qaab 50 jeer',
      'Ha soo gelin muuqaallo aad dad kale ka soo qaadatay adigoon wax qiimo ah ku darin',
      'Ku dar codkaaga, qoraal gaar ah, ama falanqayn xirfadeed'
    ],
    actionable_steps_en: [
      'Avoid templated identical slide shows with zero narrative variety',
      'Always add transformative commentary or high-effort editing to third-party footage',
      'Review YouTube Reused Content monetization policies'
    ],
    common_mistakes_so: [
      'Soo dejinta clips TikTok laga keenay oo watermark wata'
    ],
    recommended_course_id: 'course-yt-automation'
  },
  {
    id: 'guide-improving-weak-videos',
    title_so: '18. Hagaajinta Muuqaallada Daciifka ah',
    title_en: '18. Diagnosing and Reviving Underperforming Videos',
    category: 'Strategy & Growth',
    key_metric: 'Post-launch recovery audits',
    summary_so: 'Muuqaal kasta oo daciif ah wuxuu leeyahay sabab cad: ama Thumbnail-ka ma fiicneyn, ama Hook-ga ayaa jilicsanaa, ama mawduucu ma xiiso badnayn. Baro sida loo ogaado.',
    summary_en: 'Turn underperforming uploads into valuable optimization data.',
    actionable_steps_so: [
      'Haddii Impressions badan yihiin balse views yar yihiin -> Beddel Thumbnail & Title',
      'Haddii dadku 5-ta ilbiriqsi ee hore ka baxaan -> Dib u eeg Hook-gaaga videos-ka dambe',
      'Haddii Impressions aysan jirin -> Hubi in mawduucu yahay mid dadku raadinayaan (Search volume)'
    ],
    actionable_steps_en: [
      'High impressions but low views -> Upgrade Thumbnail & Title',
      'Instant viewer drop in first 5 seconds -> Rework your Hook formula',
      'Zero impressions -> Verify topic demand and niche categorization'
    ],
    common_mistakes_so: [
      'Eedeynta algorithm-ka halkii la baran lahaa falanqaynta xogta'
    ],
    recommended_course_id: 'course-shorts-monetization'
  }
];
