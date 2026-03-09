import { ClientStatus, PostStatus, PrismaClient, ProjectStatus, Role, SocialPlatform } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  const hashedPassword = await bcrypt.hash('Admin123!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@primeconceptdecor.com' },
    update: {},
    create: {
      email: 'admin@primeconceptdecor.com',
      password: hashedPassword,
      firstName: 'Prime',
      lastName: 'Admin',
      role: Role.ADMIN,
      isActive: true,
    },
  });

  const editor = await prisma.user.upsert({
    where: { email: 'editor@primeconceptdecor.com' },
    update: {},
    create: {
      email: 'editor@primeconceptdecor.com',
      password: hashedPassword,
      firstName: 'Content',
      lastName: 'Editor',
      role: Role.EDITOR,
      isActive: true,
    },
  });

  const socialManager = await prisma.user.upsert({
    where: { email: 'social@primeconceptdecor.com' },
    update: {},
    create: {
      email: 'social@primeconceptdecor.com',
      password: hashedPassword,
      firstName: 'Social',
      lastName: 'Manager',
      role: Role.SOCIAL_MEDIA_MANAGER,
      isActive: true,
    },
  });

  console.log('✅ Users created');

  const client1 = await prisma.client.create({
    data: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1234567890',
      company: 'Modern Living Co.',
      address: '123 Design Street',
      city: 'Paris',
      country: 'France',
      status: ClientStatus.ACTIVE,
      notes: 'Interested in modern minimalist design',
      source: 'Website Contact Form',
    },
  });

  const client2 = await prisma.client.create({
    data: {
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@example.com',
      phone: '+9876543210',
      company: 'Luxury Homes Inc.',
      address: '456 Elegance Avenue',
      city: 'London',
      country: 'UK',
      status: ClientStatus.LEAD,
      notes: 'Looking for luxury interior design',
      source: 'Instagram',
    },
  });

  console.log('✅ Clients created');

  const project1 = await prisma.project.create({
    data: {
      title: 'Modern Apartment Renovation',
      description: 'Complete renovation of a 120sqm apartment with modern minimalist design',
      status: ProjectStatus.COMPLETED,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-03-30'),
      budget: 50000,
      location: 'Paris, France',
      featured: true,
      clientId: client1.id,
      userId: admin.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      title: 'Luxury Villa Interior Design',
      description: 'High-end interior design for a 300sqm villa',
      status: ProjectStatus.IN_PROGRESS,
      startDate: new Date('2024-02-01'),
      budget: 150000,
      location: 'London, UK',
      featured: true,
      clientId: client2.id,
      userId: admin.id,
    },
  });

  console.log('✅ Projects created');

  await prisma.portfolioItem.create({
    data: {
      title: 'Minimalist Living Room',
      description: 'A stunning minimalist living room with natural light and clean lines',
      category: 'Living Room',
      tags: ['minimalist', 'modern', 'natural-light'],
      featured: true,
      order: 1,
      projectId: project1.id,
      coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
        'https://images.unsplash.com/photo-1600210492493-0946911123ea',
      ],
      published: true,
    },
  });

  await prisma.portfolioItem.create({
    data: {
      title: 'Luxury Master Bedroom',
      description: 'Elegant master bedroom with custom furniture and premium materials',
      category: 'Bedroom',
      tags: ['luxury', 'elegant', 'custom'],
      featured: true,
      order: 2,
      projectId: project2.id,
      coverImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0',
      images: [
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
      ],
      published: true,
    },
  });

  console.log('✅ Portfolio items created');

  await prisma.blogPost.create({
    data: {
      title: '10 Interior Design Trends for 2024',
      slug: '10-interior-design-trends-2024',
      excerpt: 'Discover the hottest interior design trends that will dominate in 2024',
      content: `# 10 Interior Design Trends for 2024

As we step into 2024, the world of interior design continues to evolve with fresh ideas and innovative concepts. Here are the top 10 trends to watch:

## 1. Sustainable Materials
Eco-friendly materials are taking center stage...

## 2. Biophilic Design
Bringing nature indoors has never been more important...

## 3. Warm Minimalism
The cold minimalism of the past is giving way to warmer, more inviting spaces...`,
      coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6',
      category: 'Trends',
      tags: ['trends', '2024', 'design-tips'],
      published: true,
      featured: true,
      views: 1250,
      authorId: editor.id,
      publishedAt: new Date('2024-01-10'),
    },
  });

  await prisma.blogPost.create({
    data: {
      title: 'How to Choose the Perfect Color Palette',
      slug: 'how-to-choose-perfect-color-palette',
      excerpt: 'A comprehensive guide to selecting colors that transform your space',
      content: `# How to Choose the Perfect Color Palette

Choosing the right color palette is crucial for creating a cohesive and beautiful interior...`,
      coverImage: 'https://images.unsplash.com/photo-1615873968403-89e068629265',
      category: 'Guides',
      tags: ['color', 'guide', 'tips'],
      published: true,
      featured: false,
      views: 890,
      authorId: editor.id,
      publishedAt: new Date('2024-02-05'),
    },
  });

  console.log('✅ Blog posts created');

  await prisma.socialPost.create({
    data: {
      caption: '✨ Transform your living space with our latest minimalist design project! Swipe to see the before and after. #InteriorDesign #MinimalistHome #HomeDecor',
      platforms: [SocialPlatform.INSTAGRAM, SocialPlatform.FACEBOOK, SocialPlatform.PINTEREST],
      status: PostStatus.PUBLISHED,
      scheduledFor: new Date('2024-03-01T10:00:00Z'),
      publishedAt: new Date('2024-03-01T10:00:00Z'),
      hashtags: ['InteriorDesign', 'MinimalistHome', 'HomeDecor', 'ModernLiving'],
      mediaUrls: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7'],
      aiGenerated: false,
      authorId: socialManager.id,
    },
  });

  await prisma.socialPost.create({
    data: {
      caption: '🏡 Luxury meets comfort in this stunning master bedroom design. What do you think? Comment below! #LuxuryInteriors #BedroomDesign #InteriorInspiration',
      platforms: [SocialPlatform.INSTAGRAM, SocialPlatform.TIKTOK],
      status: PostStatus.SCHEDULED,
      scheduledFor: new Date(Date.now() + 86400000),
      hashtags: ['LuxuryInteriors', 'BedroomDesign', 'InteriorInspiration'],
      mediaUrls: ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0'],
      aiGenerated: true,
      authorId: socialManager.id,
    },
  });

  console.log('✅ Social posts created');

  await prisma.contactSubmission.create({
    data: {
      name: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      phone: '+1122334455',
      subject: 'Kitchen Renovation Inquiry',
      message: 'I would like to get a quote for a complete kitchen renovation. My kitchen is approximately 20 square meters.',
      source: 'website',
      read: false,
    },
  });

  console.log('✅ Contact submissions created');

  await prisma.systemSettings.createMany({
    data: [
      { key: 'site_name', value: 'Rajiv Interiors' },
      { key: 'site_description', value: 'Premium Interior Design & Decoration Services' },
      { key: 'contact_email', value: 'contact@rajivinteriors.com' },
      { key: 'contact_phone', value: '+33 1 23 45 67 89' },
      { key: 'social_instagram', value: 'https://instagram.com/rajivinteriors' },
      { key: 'social_facebook', value: 'https://facebook.com/rajivinteriors' },
      { key: 'social_pinterest', value: 'https://pinterest.com/rajivinteriors' },
    ],
  });

  console.log('✅ System settings created');
  console.log('');
  console.log('🎉 Database seeded successfully!');
  console.log('');
  console.log('📧 Default users:');
  console.log('   Admin: admin@rajivinteriors.com / Admin123!');
  console.log('   Editor: editor@rajivinteriors.com / Admin123!');
  console.log('   Social Manager: social@rajivinteriors.com / Admin123!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
