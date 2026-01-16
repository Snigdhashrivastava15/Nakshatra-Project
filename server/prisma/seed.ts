import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed Services
  const services = [
    {
      title: 'The Celestial Strategy™',
      description: 'Long-term strategic guidance for CXOs, industrialists, and public figures.',
      shortDescription: 'Long-term strategic guidance for CXOs, industrialists, and public figures.',
      fullDescription: 'A comprehensive long-term strategic guidance program designed specifically for CXOs, industrialists, and public figures. This service provides in-depth astrological analysis to help you make critical decisions with cosmic alignment. Our expert astrologer will analyze your birth chart, planetary transits, and dasha periods to provide strategic insights that align with your professional and personal goals. Perfect for major life transitions, career decisions, and long-term planning.',
      category: 'Executive',
      iconName: 'Crown',
      duration: 90,
      active: true,
    },
    {
      title: 'The Destiny Architecture™',
      description: 'Structuring personal and professional life with planetary cycles.',
      shortDescription: 'Structuring personal and professional life with planetary cycles.',
      fullDescription: 'Transform your life by aligning personal and professional decisions with planetary cycles. This service helps you understand the optimal timing for major life events, career moves, and personal growth opportunities. Through detailed chart analysis, we identify your strongest planetary periods and guide you on when to take action and when to wait. Ideal for individuals seeking harmony between their personal aspirations and professional ambitions.',
      category: 'Personal',
      iconName: 'Building2',
      duration: 60,
      active: true,
    },
    {
      title: 'The Maharaja Protocol™',
      description: 'Generational legacy and succession planning for distinguished families.',
      shortDescription: 'Generational legacy and succession planning for distinguished families.',
      fullDescription: 'Preserve and enhance your family legacy through astrologically-guided succession planning. This comprehensive service addresses generational wealth transfer, family harmony, and ensuring prosperity for future generations. We analyze family charts collectively and individually to identify optimal timing for major transitions, estate planning, and preparing next-generation leaders. Essential for distinguished families maintaining multi-generational legacies.',
      category: 'Legacy',
      iconName: 'Users',
      duration: 90,
      active: true,
    },
    {
      title: 'Cosmic Capital Advisory™',
      description: 'Precision timing for wealth accumulation and business decisions.',
      shortDescription: 'Precision timing for wealth accumulation and business decisions.',
      fullDescription: 'Maximize your financial success through precise timing of investments, business decisions, and wealth-building activities. This service combines financial astrology with practical guidance to identify the most auspicious periods for major transactions, investments, and business ventures. We analyze planetary positions affecting wealth houses and guide you on optimal timing for significant financial moves. Perfect for entrepreneurs, investors, and business leaders.',
      category: 'Wealth',
      iconName: 'TrendingUp',
      duration: 60,
      active: true,
    },
    {
      title: 'The Boardroom Muhurta™',
      description: 'Timing validation for critical corporate decisions and launches.',
      shortDescription: 'Timing validation for critical corporate decisions and launches.',
      fullDescription: 'Ensure successful corporate initiatives through precise timing analysis. This service validates the optimal timing for product launches, mergers, acquisitions, major announcements, and critical business decisions. Using traditional muhurta principles combined with modern business needs, we identify the most favorable dates and times for corporate milestones. Essential for C-suite executives making high-stakes decisions.',
      category: 'Corporate',
      iconName: 'Calendar',
      duration: 45,
      active: true,
    },
    {
      title: 'The Legacy Continuum™',
      description: 'Securing next-generation stability and sustained growth.',
      shortDescription: 'Securing next-generation stability and sustained growth.',
      fullDescription: 'Build unshakeable foundations for future generations through strategic astrological planning. This service focuses on creating sustainable systems for family wealth, values, and continuity. We analyze charts across generations to identify patterns, opportunities, and potential challenges. The consultation includes strategies for maintaining family harmony, preparing successors, and ensuring long-term prosperity. Designed for families with substantial legacies to protect and grow.',
      category: 'Legacy',
      iconName: 'Shield',
      duration: 60,
      active: true,
    },
    {
      title: 'Union Intelligence™',
      description: 'Compatibility advisory for elite marriages and business partnerships.',
      shortDescription: 'Compatibility advisory for elite marriages and business partnerships.',
      fullDescription: 'Ensure harmonious and prosperous unions through comprehensive compatibility analysis. This service evaluates astrological compatibility for marriages, business partnerships, and strategic alliances. We analyze individual charts, compare key planetary positions, and identify areas of strength and potential challenges. The consultation includes guidance on optimal timing for commitments, strategies for relationship harmony, and remedies for any challenging aspects. Perfect for arranged marriages, strategic partnerships, and long-term alliances.',
      category: 'Relationships',
      iconName: 'Heart',
      duration: 60,
      active: true,
    },
    {
      title: 'The Spatial Sovereignty™',
      description: 'Vastu guidance for power, control, and positive influence.',
      shortDescription: 'Vastu guidance for power, control, and positive influence.',
      fullDescription: 'Optimize your living and working spaces for maximum power, control, and positive energy flow. This comprehensive Vastu consultation analyzes your property layout, directions, energy flow, and provides specific recommendations for enhancing success, health, and prosperity. We combine traditional Vastu Shastra principles with modern architectural needs to create spaces that support your goals. Ideal for new constructions, renovations, and optimizing existing spaces for better outcomes.',
      category: 'Vastu',
      iconName: 'Home',
      duration: 90,
      active: true,
    },
    {
      title: 'The Energetic Optimization™',
      description: 'Precision remedies designed for high performers.',
      shortDescription: 'Precision remedies designed for high performers.',
      fullDescription: 'Unlock your peak performance through targeted astrological remedies and optimization techniques. This service identifies specific planetary challenges affecting your performance and provides precise, personalized remedies. We combine gemstone recommendations, ritual guidance, mantra prescriptions, and lifestyle adjustments tailored to your chart. The consultation focuses on removing obstacles, enhancing natural talents, and maximizing your potential. Perfect for executives, athletes, artists, and high-achievers seeking an edge.',
      category: 'Remedies',
      iconName: 'Zap',
      duration: 45,
      active: true,
    },
    {
      title: 'The Black Swan Protocol™',
      description: 'Crisis timing and emergency advisory for unforeseen challenges.',
      shortDescription: 'Crisis timing and emergency advisory for unforeseen challenges.',
      fullDescription: 'Navigate unexpected crises and challenges with astrological guidance. This emergency advisory service helps you understand the timing and nature of sudden challenges, identify the underlying planetary influences, and provides immediate remedies and strategies. We analyze current transits, dasha periods, and challenging planetary aspects to provide clarity during difficult times. The consultation includes crisis management strategies, protective measures, and guidance on when the situation will improve. Essential for managing sudden reversals, legal issues, health crises, or unexpected business challenges.',
      category: 'Crisis',
      iconName: 'AlertTriangle',
      duration: 60,
      active: true,
    },
    {
      title: 'The Inner Circle Retainer™',
      description: 'Ongoing subscription-based strategic astrological consultation.',
      shortDescription: 'Ongoing subscription-based strategic astrological consultation.',
      fullDescription: 'Maintain continuous astrological guidance through our premium retainer service. This ongoing subscription provides regular consultations, monthly chart reviews, transit analyses, and priority access for urgent questions. You receive personalized guidance for all major decisions, optimal timing for initiatives, and proactive insights into upcoming opportunities and challenges. This service includes quarterly deep-dive sessions and annual comprehensive planning. Ideal for high-net-worth individuals, executives, and families requiring continuous strategic astrological support.',
      category: 'Retainer',
      iconName: 'Star',
      duration: 120,
      active: true,
    },
  ];

  for (const service of services) {
    // Check if service exists by title, if so update, otherwise create
    const existing = await prisma.service.findFirst({
      where: { title: service.title },
    });

    if (existing) {
      await prisma.service.update({
        where: { id: existing.id },
        data: service,
      });
    } else {
      await prisma.service.create({
        data: service,
      });
    }
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
