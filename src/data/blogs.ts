export interface Blog {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  tags: string[];
  category?: string;
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: "How Planetary Cycles Shape Career Success",
    slug: "planetary-cycles-career-success",
    thumbnail: "/placeholder.svg",
    excerpt: "Explore the profound impact of planetary transits on professional growth and decision-making. Learn how understanding these cosmic rhythms can guide your career trajectory with precision and foresight.",
    content: `
      <p class="mb-6">The ancient science of Vedic astrology reveals that our professional lives are intricately woven into the cosmic tapestry of planetary movements. Understanding these celestial rhythms can transform how we approach career decisions, timing our moves with precision that aligns with universal forces.</p>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">Understanding Planetary Transits</h2>
      <p class="mb-4">Planetary transits are periods when planets move through different houses in your birth chart, activating specific energies that influence various aspects of life. In the context of career, certain planetary positions can create optimal windows for:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 font-body text-foreground/70">
        <li>Career transitions and job changes</li>
        <li>Negotiations and salary discussions</li>
        <li>Starting new businesses or projects</li>
        <li>Making strategic business decisions</li>
        <li>Networking and building professional relationships</li>
      </ul>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">Jupiter's Role in Career Expansion</h2>
      <p class="mb-4">Jupiter, the planet of wisdom and expansion, plays a crucial role in career growth. When Jupiter transits favorable houses in your chart, you may experience:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 font-body text-foreground/70">
        <li>Enhanced opportunities for promotion</li>
        <li>Recognition for your work and expertise</li>
        <li>Increased financial rewards</li>
        <li>Expansion of professional network</li>
      </ul>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">Saturn's Lessons in Discipline</h2>
      <p class="mb-4">Saturn, often misunderstood, actually brings structure and discipline to your career. During Saturn transits, you may need to:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 font-body text-foreground/70">
        <li>Focus on long-term career planning</li>
        <li>Build foundational skills and expertise</li>
        <li>Exercise patience in career advancement</li>
        <li>Create sustainable professional structures</li>
      </ul>

      <blockquote class="border-l-4 border-secondary pl-6 py-4 my-8 italic font-body text-foreground/80">
        "The stars align not to determine our fate, but to illuminate the path of our highest potential. Understanding planetary cycles is the key to navigating your career with cosmic wisdom."
      </blockquote>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">Practical Applications</h2>
      <p class="mb-4">To leverage planetary cycles for career success:</p>
      <ol class="list-decimal list-inside space-y-3 mb-6 font-body text-foreground/70">
        <li><strong>Consult your birth chart:</strong> Understand your unique planetary positions and their influence on your career house (10th house in Vedic astrology).</li>
        <li><strong>Track major transits:</strong> Pay attention to Jupiter, Saturn, and Rahu/Ketu transits that affect your career house.</li>
        <li><strong>Time your moves:</strong> Plan significant career decisions during favorable planetary periods.</li>
        <li><strong>Work with challenges:</strong> During difficult transits, focus on skill-building and foundation-laying rather than seeking immediate results.</li>
      </ol>

      <p class="mb-6">By aligning your career decisions with planetary cycles, you can navigate professional challenges with greater clarity and timing. This cosmic intelligence serves as a powerful tool for executives, entrepreneurs, and professionals seeking to optimize their career trajectory.</p>
    `,
    author: "Astrologer Sameer",
    publishedDate: "January 15, 2026",
    tags: ["Career", "Planetary Cycles", "Professional Growth", "Vedic Astrology"],
    category: "Career & Business",
  },
  {
    id: 2,
    title: "Marriage Compatibility in Vedic Astrology",
    slug: "marriage-compatibility-vedic-astrology",
    thumbnail: "/placeholder.svg",
    excerpt: "Discover the intricate art of synastry analysis and how Vedic astrology determines harmony in relationships. Uncover the astrological foundations of lasting partnerships and marital bliss.",
    content: `
      <p class="mb-6">Vedic astrology offers a sophisticated system for evaluating marriage compatibility through the analysis of two birth charts. This ancient science, known as synastry or matching, examines multiple factors to determine the harmony and longevity of a marital union.</p>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">The Importance of Gun Milan</h2>
      <p class="mb-4">Gun Milan, or Ashtakoot matching, is a fundamental compatibility system that evaluates 36 points across eight categories:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 font-body text-foreground/70">
        <li><strong>Varna (4 points):</strong> Spiritual compatibility based on mental and spiritual attributes</li>
        <li><strong>Vashya (2 points):</strong> Mutual attraction and control dynamics</li>
        <li><strong>Tara (3 points):</strong> Health and longevity of the relationship</li>
        <li><strong>Yoni (4 points):</strong> Physical compatibility and sexual harmony</li>
        <li><strong>Graha Maitri (5 points):</strong> Mental compatibility and friendship</li>
        <li><strong>Gana (6 points):</strong> Temperament compatibility (Deva, Manushya, Rakshasa)</li>
        <li><strong>Bhakoot (7 points):</strong> Emotional and mental prosperity in marriage</li>
        <li><strong>Nadi (8 points):</strong> Health and progeny considerations</li>
      </ul>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">Nakshatra Compatibility</h2>
      <p class="mb-4">The compatibility of Nakshatras (lunar constellations) plays a crucial role in determining relationship harmony. Each Nakshatra belongs to one of three Ganas:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 font-body text-foreground/70">
        <li><strong>Deva Gana:</strong> Divine nature - gentle, spiritual, and harmonious</li>
        <li><strong>Manushya Gana:</strong> Human nature - balanced, practical, and adaptable</li>
        <li><strong>Rakshasa Gana:</strong> Demon nature - passionate, intense, and transformative</li>
      </ul>
      <p class="mb-6">Compatibility within the same Gana is generally favorable, while cross-Gana matches require careful analysis and often need specific remedies.</p>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">Dosha Analysis</h2>
      <p class="mb-4">Several Doshas (astrological afflictions) can impact marriage compatibility:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 font-body text-foreground/70">
        <li><strong>Manglik Dosha:</strong> Mars placement that can create challenges if not matched properly</li>
        <li><strong>Nadi Dosha:</strong> Same Nadi in both charts affecting health and progeny</li>
        <li><strong>Bhakoot Dosha:</strong> Incompatible Moon signs leading to emotional discord</li>
      </ul>

      <blockquote class="border-l-4 border-secondary pl-6 py-4 my-8 italic font-body text-foreground/80">
        "A successful marriage is not just about love; it's about cosmic compatibility. When two souls align under favorable stars, their union becomes a source of mutual growth and lasting happiness."
      </blockquote>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">Modern Applications</h2>
      <p class="mb-4">While traditional matching methods remain valuable, modern Vedic astrologers also consider:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 font-body text-foreground/70">
        <li>Synastry of Venus and Mars (romance and passion)</li>
        <li>7th house compatibility (partnership house)</li>
        <li>Composite chart analysis</li>
        <li>Timing of marriage (Muhurta)</li>
      </ul>

      <p class="mb-6">Understanding these compatibility factors can help couples navigate challenges, set realistic expectations, and create remedies to strengthen their marital bond. This knowledge is especially valuable for families arranging marriages and couples seeking to understand their relationship dynamics.</p>
    `,
    author: "Astrologer Sameer",
    publishedDate: "January 10, 2026",
    tags: ["Marriage", "Compatibility", "Relationships", "Synastry"],
    category: "Relationships",
  },
  {
    id: 3,
    title: "Powerful Remedies for Career Growth",
    slug: "powerful-remedies-career-growth",
    thumbnail: "/placeholder.svg",
    excerpt: "Ancient Vedic remedies and practices that align cosmic energies to accelerate professional advancement. From gemstone therapy to mantra meditation, unlock tools for transformative career growth.",
    content: `
      <p class="mb-6">Vedic astrology offers numerous remedies (Upayas) that can harmonize planetary energies and remove obstacles to career growth. These time-tested practices, when performed with sincerity and proper guidance, can significantly enhance professional success.</p>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">Gemstone Therapy (Ratna Therapy)</h2>
      <p class="mb-4">Wearing appropriate gemstones can strengthen beneficial planets in your chart:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 font-body text-foreground/70">
        <li><strong>Yellow Sapphire (Pukhraj):</strong> Enhances Jupiter's influence for wisdom, growth, and recognition</li>
        <li><strong>Blue Sapphire (Neelam):</strong> Strengthens Saturn for discipline, perseverance, and long-term success</li>
        <li><strong>Red Coral (Moonga):</strong> Activates Mars for courage, leadership, and competitive advantage</li>
        <li><strong>Emerald (Panna):</strong> Boosts Mercury for communication, business skills, and intelligence</li>
      </ul>
      <p class="mb-6">Important: Gemstones should only be worn after proper astrological consultation, as incorrect selection can cause harm.</p>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">Mantra Meditation</h2>
      <p class="mb-4">Chanting specific mantras can invoke planetary energies favorable for career:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 font-body text-foreground/70">
        <li><strong>Jupiter Mantra:</strong> "Om Gurave Namaha" - for wisdom and expansion</li>
        <li><strong>Sun Mantra:</strong> "Om Suryaya Namaha" - for authority and leadership</li>
        <li><strong>Saturn Mantra:</strong> "Om Shanaye Namaha" - for discipline and career stability</li>
        <li><strong>Mercury Mantra:</strong> "Om Budhaya Namaha" - for communication and business acumen</li>
      </ul>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">Rudraksha for Career Enhancement</h2>
      <p class="mb-4">Different Rudraksha beads provide specific career benefits:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 font-body text-foreground/70">
        <li><strong>4 Mukhi Rudraksha:</strong> Improves communication and learning abilities</li>
        <li><strong>6 Mukhi Rudraksha:</strong> Removes career obstacles and enhances focus</li>
        <li><strong>7 Mukhi Rudraksha:</strong> Provides financial stability and career growth</li>
        <li><strong>14 Mukhi Rudraksha:</strong> Bestows leadership qualities and authority</li>
      </ul>

      <blockquote class="border-l-4 border-secondary pl-6 py-4 my-8 italic font-body text-foreground/80">
        "Remedies are not shortcuts to success, but keys to unlocking your inherent potential. When performed with faith and consistency, they align you with cosmic forces that support your highest aspirations."
      </blockquote>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">Yantra Worship</h2>
      <p class="mb-4">Yantras are geometric diagrams that channel specific energies:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 font-body text-foreground/70">
        <li><strong>Shri Yantra:</strong> For overall prosperity and success</li>
        <li><strong>Shani Yantra:</strong> For career stability and removing obstacles</li>
        <li><strong>Lakshmi Yantra:</strong> For financial abundance</li>
      </ul>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">Charity and Service (Dana)</h2>
      <p class="mb-4">Performing charity according to planetary influences can mitigate negative effects:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 font-body text-foreground/70">
        <li>Donate yellow items (food, clothing) on Thursdays for Jupiter</li>
        <li>Donate black items (sesame, cloth) on Saturdays for Saturn</li>
        <li>Offer water to Sun daily for career authority</li>
        <li>Feed cows or donate to education on Thursdays</li>
      </ul>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">Vastu for Career Success</h2>
      <p class="mb-4">Office and workspace Vastu adjustments:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 font-body text-foreground/70">
        <li>Face East or North while working for positive energy flow</li>
        <li>Keep workspace clutter-free and well-lit</li>
        <li>Place important documents in Northeast direction</li>
        <li>Avoid sitting under beams or facing sharp corners</li>
      </ul>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">Daily Practices</h2>
      <p class="mb-4">Simple daily routines that support career growth:</p>
      <ol class="list-decimal list-inside space-y-3 mb-6 font-body text-foreground/70">
        <li>Begin each day with gratitude and intention-setting</li>
        <li>Chant planetary mantras during your specific planetary hours</li>
        <li>Keep a clean and organized workspace</li>
        <li>Practice meditation for clarity and focus</li>
        <li>Perform your duties with excellence and integrity</li>
      </ol>

      <p class="mb-6">These remedies work best when combined with sincere effort and professional dedication. They are tools to support your journey, not substitutes for hard work. Consulting with an experienced Vedic astrologer can help you select the most appropriate remedies for your unique chart and career goals.</p>
    `,
    author: "Astrologer Sameer",
    publishedDate: "January 5, 2026",
    tags: ["Remedies", "Career", "Vedic Astrology", "Professional Growth"],
    category: "Remedies",
  },
  {
    id: 4,
    title: "Understanding Dashas: Your Life's Timeline",
    slug: "understanding-dashas-life-timeline",
    thumbnail: "/placeholder.svg",
    excerpt: "Dive deep into the Vedic system of planetary periods (Dashas) that map out your life's major phases. Learn how to identify key periods for growth, challenges, and transformations.",
    content: `
      <p class="mb-6">Dashas are time periods in Vedic astrology that reveal which planetary influence is most active at any given time in your life. This sophisticated timing system helps predict life events, opportunities, and challenges with remarkable accuracy.</p>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">The Vimshottari Dasha System</h2>
      <p class="mb-4">The most commonly used Dasha system, Vimshottari (120-year cycle), assigns specific periods to nine planets:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 font-body text-foreground/70">
        <li><strong>Sun:</strong> 6 years - Leadership, authority, recognition</li>
        <li><strong>Moon:</strong> 10 years - Emotions, mind, public image</li>
        <li><strong>Mars:</strong> 7 years - Energy, courage, conflicts</li>
        <li><strong>Rahu:</strong> 18 years - Ambition, materialism, transformation</li>
        <li><strong>Jupiter:</strong> 16 years - Growth, wisdom, spirituality</li>
        <li><strong>Saturn:</strong> 19 years - Discipline, challenges, long-term gains</li>
        <li><strong>Mercury:</strong> 17 years - Communication, business, intellect</li>
        <li><strong>Ketu:</strong> 7 years - Spirituality, detachment, hidden knowledge</li>
        <li><strong>Venus:</strong> 20 years - Luxury, relationships, arts</li>
      </ul>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">How Dashas Work</h2>
      <p class="mb-4">Each major Dasha is divided into sub-periods (Bhuktis) of all nine planets, creating a complex timing system. The combination of major and sub-periods determines the quality of experiences during any given time.</p>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">Understanding Your Dasha Periods</h2>
      <p class="mb-6">By analyzing your Dasha periods, you can understand the themes and energies active in different phases of life, enabling better decision-making and preparation for upcoming changes.</p>
    `,
    author: "Astrologer Sameer",
    publishedDate: "December 28, 2025",
    tags: ["Dashas", "Vedic Astrology", "Timing", "Life Phases"],
    category: "Astrology Basics",
  },
  {
    id: 5,
    title: "Wealth Creation Through Astrological Timing",
    slug: "wealth-creation-astrological-timing",
    thumbnail: "/placeholder.svg",
    excerpt: "Master the art of Muhurta for financial decisions. Learn how to time investments, business launches, and major purchases using Vedic principles.",
    content: `
      <p class="mb-6">Financial success often depends not just on what you do, but when you do it. Vedic astrology's Muhurta (electional astrology) provides precise timing for wealth-building activities.</p>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">Timing Investments</h2>
      <p class="mb-6">Selecting auspicious times for investments can significantly impact returns. Key factors include planetary positions, lunar phases, and individual chart analysis.</p>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">Business Launch Timing</h2>
      <p class="mb-6">Launching a business during favorable planetary alignments can set the foundation for long-term success and prosperity.</p>
    `,
    author: "Astrologer Sameer",
    publishedDate: "December 20, 2025",
    tags: ["Finance", "Wealth", "Muhurta", "Investments"],
    category: "Finance & Wealth",
  },
  {
    id: 6,
    title: "Health and Wellness in Vedic Astrology",
    slug: "health-wellness-vedic-astrology",
    thumbnail: "/placeholder.svg",
    excerpt: "Understand how planetary positions influence your health and well-being. Explore preventive measures, dietary recommendations, and lifestyle adjustments based on your astrological chart.",
    content: `
      <p class="mb-6">Vedic astrology views health as a balance of elemental energies influenced by planetary positions. Understanding these influences can guide preventive healthcare and wellness practices.</p>

      <h2 class="text-2xl font-display text-foreground mt-8 mb-4">Planetary Health Influences</h2>
      <p class="mb-6">Each planet governs specific body parts and health aspects. By analyzing your chart, you can identify potential health vulnerabilities and take preventive measures.</p>
    `,
    author: "Astrologer Sameer",
    publishedDate: "December 15, 2025",
    tags: ["Health", "Wellness", "Vedic Astrology", "Lifestyle"],
    category: "Health & Wellness",
  },
];

/**
 * Get all blogs
 */
export const getAllBlogs = (): Blog[] => {
  return blogs;
};

/**
 * Get blog by slug
 */
export const getBlogBySlug = (slug: string): Blog | undefined => {
  return blogs.find((blog) => blog.slug === slug);
};

/**
 * Get related blogs (excluding current blog)
 */
export const getRelatedBlogs = (currentBlogId: number, limit: number = 3): Blog[] => {
  return blogs.filter((blog) => blog.id !== currentBlogId).slice(0, limit);
};
