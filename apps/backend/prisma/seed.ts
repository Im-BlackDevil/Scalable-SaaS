import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Created user:', user.email);

  // Create a test team
  const team = await prisma.team.upsert({
    where: { slug: 'demo-team' },
    update: {},
    create: {
      name: 'Demo Team',
      slug: 'demo-team',
      description: 'A demo team for testing',
      members: {
        create: {
          userId: user.id,
          role: 'OWNER',
        },
      },
    },
  });

  console.log('✅ Created team:', team.name);

  // Create some test links
  const links = await Promise.all([
    prisma.link.create({
      data: {
        originalUrl: 'https://google.com',
        shortCode: 'google',
        title: 'Google Search',
        description: 'Search the web',
        userId: user.id,
        utmParams: {
          create: {
            source: 'demo',
            medium: 'web',
            campaign: 'test',
          },
        },
      },
    }),
    prisma.link.create({
      data: {
        originalUrl: 'https://github.com',
        shortCode: 'github',
        title: 'GitHub',
        description: 'Code repository',
        userId: user.id,
        tags: ['development', 'code'],
      },
    }),
  ]);

  console.log('✅ Created links:', links.map(l => l.shortCode));

  // Create some test clicks
  await Promise.all([
    prisma.click.create({
      data: {
        linkId: links[0].id,
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        referer: 'https://example.com',
        country: 'US',
        city: 'New York',
        browser: 'Chrome',
        os: 'Windows',
        device: 'desktop',
      },
    }),
    prisma.click.create({
      data: {
        linkId: links[1].id,
        ipAddress: '192.168.1.2',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
        referer: 'https://mobile.example.com',
        country: 'UK',
        city: 'London',
        browser: 'Safari',
        os: 'iOS',
        device: 'mobile',
      },
    }),
  ]);

  console.log('✅ Created test clicks');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 