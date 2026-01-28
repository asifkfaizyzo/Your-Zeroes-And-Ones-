// scripts\seed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Seed AboutContent (Who We Are section)
  const aboutContent = await prisma.aboutContent.upsert({
    where: { id: 'default-about-content' },
    update: {},
    create: {
      id: 'default-about-content',
      badge: 'Who We Are',
      title: 'Crafting Digital',
      highlightedText: 'Excellence',
      paragraph1: 'Your Zeros and Ones is a premier IT consulting and software development company dedicated to helping businesses thrive in the digital age. We combine technical expertise with business acumen to deliver innovative solutions that drive growth and efficiency.',
      paragraph2: 'Our team of passionate developers, designers, and strategists work collaboratively to transform complex challenges into elegant, user-friendly solutions.',
      media: '/images/about/about-company.png',
      mediaType: 'image',
      stats: [
        { value: '50+', label: 'Projects Completed', icon: 'CheckCircle' },
        { value: '15+', label: 'Years Experience', icon: 'Calendar' },
        { value: '30+', label: 'Happy Clients', icon: 'Users' },
        { value: '24/7', label: 'Support', icon: 'Clock' }
      ],
      published: true,
    },
  });

  console.log('✅ AboutContent seeded:', aboutContent.id);

  // Seed Timeline items
  const timelineItems = [
    {
      year: '2010',
      title: 'The Beginning',
      description: 'Founded with a vision to make technology accessible to businesses of all sizes. Our first project was a simple e-commerce website that grew into a long-term partnership.',
      icon: 'Rocket',
      position: 1,
      published: true,
    },
    {
      year: '2015',
      title: 'Expansion & Growth',
      description: 'Expanded our team and services to include mobile app development and cloud solutions. Partnered with major corporations and startups alike.',
      icon: 'Users',
      position: 2,
      published: true,
    },
    {
      year: '2020',
      title: 'Digital Transformation Leaders',
      description: 'Recognized as industry leaders in digital transformation. Adapted to remote work seamlessly and helped clients navigate the digital-first world.',
      icon: 'Award',
      position: 3,
      published: true,
    },
    {
      year: '2024',
      title: 'Today & Beyond',
      description: 'Continuing to innovate with AI, machine learning, and cutting-edge technologies. Committed to delivering exceptional value and building lasting partnerships.',
      icon: 'Zap',
      position: 4,
      published: true,
    },
  ];

  for (const item of timelineItems) {
    const timeline = await prisma.timeline.create({
      data: item,
    });
    console.log(`✅ Timeline item created: ${timeline.year} - ${timeline.title}`);
  }

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });