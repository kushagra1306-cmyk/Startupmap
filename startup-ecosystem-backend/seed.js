const { sequelize } = require('./src/config/database');
const { User, Business, CollaborationRequest, Notification } = require('./src/models');
const bcrypt = require('bcrypt');

const categories = [
  'Technology', 'Manufacturing', 'Design', 'Marketing', 
  'Healthcare', 'Education', 'Finance', 'Retail',
  'Food & Beverage', 'Consulting', 'Real Estate', 'Entertainment'
];

const cities = [
  'San Francisco', 'New York', 'Los Angeles', 'Chicago',
  'Boston', 'Seattle', 'Austin', 'Denver',
  'Miami', 'Atlanta', 'Portland', 'Dallas'
];

const collaborationTypes = [
  'Partnership', 'Joint Venture', 'Supply Chain',
  'Marketing Collaboration', 'Technology Integration',
  'Distribution Agreement', 'Co-branding', 'Research & Development'
];

const demoUsers = [
  {
    name: 'Sarah Johnson',
    email: 'sarah@demo.com',
    password: 'demo123'
  },
  {
    name: 'Michael Chen',
    email: 'michael@demo.com',
    password: 'demo123'
  }
];

const businessNames = [
  { name: 'TechVision AI', category: 'Technology', description: 'AI-powered analytics platform for enterprise solutions' },
  { name: 'GreenLeaf Manufacturing', category: 'Manufacturing', description: 'Sustainable packaging solutions for eco-conscious brands' },
  { name: 'PixelPerfect Design', category: 'Design', description: 'Award-winning UI/UX design studio' },
  { name: 'BrandBoost Marketing', category: 'Marketing', description: 'Digital marketing agency specializing in growth hacking' },
  { name: 'HealthTech Solutions', category: 'Healthcare', description: 'Telemedicine platform connecting patients with specialists' },
  { name: 'EduConnect Online', category: 'Education', description: 'E-learning platform for professional development' },
  { name: 'FinanceFlow Pro', category: 'Finance', description: 'Automated accounting and bookkeeping for SMBs' },
  { name: 'RetailNext POS', category: 'Retail', description: 'Cloud-based point of sale system' },
  { name: 'FreshBite Catering', category: 'Food & Beverage', description: 'Farm-to-table catering service' },
  { name: 'ConsultPro Advisory', category: 'Consulting', description: 'Management consulting for startups' },
  { name: 'UrbanSpaces Realty', category: 'Real Estate', description: 'Commercial real estate brokerage' },
  { name: 'StreamPlay Media', category: 'Entertainment', description: 'Content production and streaming platform' },
  { name: 'CloudSync Systems', category: 'Technology', description: 'Enterprise cloud migration services' },
  { name: 'EcoPackage Co', category: 'Manufacturing', description: 'Biodegradable packaging materials' },
  { name: 'CreativeMinds Studio', category: 'Design', description: 'Branding and visual identity specialists' },
  { name: 'SocialBuzz Agency', category: 'Marketing', description: 'Social media management and influencer marketing' },
  { name: 'WellnessTech Labs', category: 'Healthcare', description: 'Wearable health monitoring devices' },
  { name: 'SkillBridge Academy', category: 'Education', description: 'Corporate training and certification programs' },
  { name: 'InvestSmart Platform', category: 'Finance', description: 'Robo-advisor for personal investments' },
  { name: 'FashionForward Boutique', category: 'Retail', description: 'Sustainable fashion marketplace' },
  { name: 'CraftBrew Collective', category: 'Food & Beverage', description: 'Artisan coffee roasting and distribution' },
  { name: 'Strategy Partners Group', category: 'Consulting', description: 'Strategic planning and business transformation' },
  { name: 'PropTech Innovations', category: 'Real Estate', description: 'Smart building automation systems' },
  { name: 'GameOn Studios', category: 'Entertainment', description: 'Indie game development studio' },
  { name: 'DataSecure Systems', category: 'Technology', description: 'Cybersecurity solutions for enterprises' }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Notification.destroy({ where: {} });
    await CollaborationRequest.destroy({ where: {} });
    await Business.destroy({ where: {} });
    await User.destroy({ where: {} });

    // Create demo users
    console.log('👥 Creating demo users...');
    const createdUsers = [];
    
    for (const userData of demoUsers) {
      // Don't hash here - the User model will hash it automatically
      const user = await User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password // Pass plain password, model will hash it
      });
      createdUsers.push(user);
      console.log(`   ✓ Created user: ${user.email} (password: ${userData.password})`);
    }

    // Create additional users for other businesses
    console.log('👥 Creating additional business owners...');
    const additionalUserCount = businessNames.length - demoUsers.length;
    
    for (let i = 0; i < additionalUserCount; i++) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = await User.create({
        name: `Business Owner ${i + 3}`,
        email: `owner${i + 3}@startup.com`,
        password: hashedPassword
      });
      createdUsers.push(user);
    }

    // Create businesses
    console.log('🏢 Creating businesses...');
    const createdBusinesses = [];
    
    for (let i = 0; i < businessNames.length; i++) {
      const businessData = businessNames[i];
      const owner = createdUsers[i % createdUsers.length];
      const city = cities[i % cities.length];
      
      // Generate random coordinates (US approximate range)
      const latitude = (Math.random() * 20 + 30).toFixed(6); // 30-50 latitude
      const longitude = -(Math.random() * 50 + 70).toFixed(6); // -70 to -120 longitude
      
      const business = await Business.create({
        name: businessData.name,
        category: businessData.category,
        description: businessData.description,
        city: city,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        status: 'VERIFIED',
        ownerId: owner.id,
        contactEmail: `contact@${businessData.name.toLowerCase().replace(/\s+/g, '')}.com`
      });
      
      createdBusinesses.push(business);
      console.log(`   ✓ Created business: ${business.name}`);
    }

    // Create collaboration requests
    console.log('🤝 Creating collaboration requests...');
    const requestsToCreate = [];
    
    // Create 30-40 random collaboration requests
    const numRequests = 35;
    
    for (let i = 0; i < numRequests; i++) {
      const senderBusiness = createdBusinesses[Math.floor(Math.random() * createdBusinesses.length)];
      let receiverBusiness = createdBusinesses[Math.floor(Math.random() * createdBusinesses.length)];
      
      // Ensure sender and receiver are different
      while (receiverBusiness.id === senderBusiness.id) {
        receiverBusiness = createdBusinesses[Math.floor(Math.random() * createdBusinesses.length)];
      }
      
      const requestType = collaborationTypes[Math.floor(Math.random() * collaborationTypes.length)];
      const statuses = ['PENDING', 'ACCEPTED', 'REJECTED'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      const messages = [
        `We'd love to explore ${requestType.toLowerCase()} opportunities with your team.`,
        `Interested in discussing how we can collaborate on ${requestType.toLowerCase()}.`,
        `Our companies have complementary strengths. Let's talk about ${requestType.toLowerCase()}.`,
        `We see great potential for ${requestType.toLowerCase()} between our businesses.`,
        `Would you be open to a meeting to discuss ${requestType.toLowerCase()}?`
      ];
      
      const request = await CollaborationRequest.create({
        senderBusinessId: senderBusiness.id,
        receiverBusinessId: receiverBusiness.id,
        requestType: requestType,
        message: messages[Math.floor(Math.random() * messages.length)],
        status: status
      });
      
      requestsToCreate.push(request);
      
      // Create notification for receiver
      await Notification.create({
        userId: receiverBusiness.ownerId,
        type: status === 'PENDING' ? 'COLLAB_REQUEST' : status,
        message: status === 'PENDING' 
          ? `${senderBusiness.name} sent you a ${requestType} collaboration request`
          : `Your ${requestType} request from ${senderBusiness.name} was ${status.toLowerCase()}`,
        isRead: Math.random() > 0.5 // 50% chance of being read
      });
      
      console.log(`   ✓ Created ${status} request: ${senderBusiness.name} → ${receiverBusiness.name}`);
    }

    console.log('\n✨ Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Users created: ${createdUsers.length}`);
    console.log(`   - Businesses created: ${createdBusinesses.length}`);
    console.log(`   - Collaboration requests: ${requestsToCreate.length}`);
    console.log(`   - Notifications created: ${requestsToCreate.length}`);
    
    console.log('\n🔑 Demo Credentials:');
    console.log('   User 1:');
    console.log('   Email: sarah@demo.com');
    console.log('   Password: demo123');
    console.log(`   Businesses: ${createdBusinesses.filter(b => b.ownerId === createdUsers[0].id).map(b => b.name).join(', ')}\n`);
    
    console.log('   User 2:');
    console.log('   Email: michael@demo.com');
    console.log('   Password: demo123');
    console.log(`   Businesses: ${createdBusinesses.filter(b => b.ownerId === createdUsers[1].id).map(b => b.name).join(', ')}\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();