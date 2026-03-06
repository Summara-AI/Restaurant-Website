require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const User = require('./models/User');
const MenuItem = require('./models/MenuItem');
const BlogPost = require('./models/BlogPost');
const Reservation = require('./models/Reservation');
const EventInquiry = require('./models/EventInquiry');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ember-crest';

const menuItems = [
  { name: 'Wood-Fired Oysters', description: 'Half dozen Gulf oysters with smoked chili butter and lime', price: 18, category: 'Starters', tags: ['GF'], isChefsPick: true, imageUrl: 'https://images.unsplash.com/photo-1519708227418-8e0c1d2a4682?w=400' },
  { name: 'Texas Wagyu Carpaccio', description: 'Thinly sliced wagyu with truffle aioli and arugula', price: 24, category: 'Starters', tags: ['GF'], isChefsPick: true, imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400' },
  { name: 'Burrata & Heirloom Tomatoes', description: 'Creamy burrata with balsamic reduction and basil oil', price: 16, category: 'Starters', tags: ['V', 'GF'], imageUrl: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400' },
  { name: 'Smoked Brisket Tacos', description: 'Three mini tacos with pickled onion and cotija', price: 14, category: 'Starters', tags: [], imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400' },
  { name: 'Roasted Bone Marrow', description: 'Bone marrow with gremolata and grilled bread', price: 22, category: 'Starters', tags: ['GF'], imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400' },
  { name: 'Texas Hill Country Tomato Soup', description: 'Creamy tomato soup with basil crème fraîche', price: 12, category: 'Soups & Salads', tags: ['V'], imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400' },
  { name: 'Ember Caesar', description: 'Romaine, wood-fired croutons, parmesan, anchovy dressing', price: 14, category: 'Soups & Salads', tags: ['GF'], imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400' },
  { name: 'Grilled Peach & Arugula', description: 'Local peaches, goat cheese, pecans, honey vinaigrette', price: 15, category: 'Soups & Salads', tags: ['V', 'GF'], imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400' },
  { name: 'Wood-Grilled Ribeye', description: '14oz prime ribeye, compound butter, roasted garlic', price: 58, category: 'Grills & Steaks', tags: ['GF'], isChefsPick: true, imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400' },
  { name: 'Lamb Chops', description: 'Frenched lamb chops with mint chimichurri and couscous', price: 52, category: 'Grills & Steaks', tags: ['GF'], imageUrl: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400' },
  { name: 'Smoked Short Rib', description: '12hr smoked beef short rib, pickled jalapeño slaw', price: 48, category: 'Grills & Steaks', tags: ['GF'], isChefsPick: true, imageUrl: 'https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=400' },
  { name: 'Grilled Salmon', description: 'Wild-caught salmon, seasonal vegetables, lemon butter', price: 38, category: 'Mains', tags: ['GF'], imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400' },
  { name: 'Roasted Chicken', description: 'Half chicken, herb jus, roasted potatoes', price: 32, category: 'Mains', tags: ['GF'], imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400' },
  { name: 'Duck Breast', description: 'Seared duck, cherry reduction, duck fat potatoes', price: 42, category: 'Mains', tags: ['GF'], imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c2880322?w=400' },
  { name: 'Lobster Risotto', description: 'Maine lobster, arborio rice, saffron, parmesan', price: 46, category: 'Pasta & Risotto', tags: [], imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400' },
  { name: 'Wild Mushroom Risotto', description: 'Mixed mushrooms, truffle oil, aged parmesan', price: 28, category: 'Pasta & Risotto', tags: ['V'], imageUrl: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400' },
  { name: 'Cacio e Pepe', description: 'House-made spaghetti, pecorino, black pepper', price: 24, category: 'Pasta & Risotto', tags: ['V'], imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400' },
  { name: 'Roasted Cauliflower Steak', description: 'Whole cauliflower, tahini, pomegranate, herbs', price: 26, category: 'Vegetarian', tags: ['V', 'VG', 'GF'], imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400' },
  { name: 'Grilled Vegetable Plate', description: 'Seasonal vegetables, romesco, quinoa', price: 24, category: 'Vegetarian', tags: ['V', 'VG', 'GF'], imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400' },
  { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake, vanilla bean ice cream', price: 14, category: 'Desserts', tags: [], isChefsPick: true, imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400' },
  { name: 'Texas Pecan Pie', description: 'House-made pecan pie with bourbon whipped cream', price: 12, category: 'Desserts', tags: [], imageUrl: 'https://images.unsplash.com/photo-1562007908-17c67e878c88?w=400' },
  { name: 'Crème Brûlée', description: 'Classic vanilla crème brûlée with shortbread', price: 12, category: 'Desserts', tags: ['GF'], imageUrl: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400' },
  { name: 'Ember Old Fashioned', description: 'Bourbon, smoked simple syrup, orange bitters', price: 16, category: 'Cocktails', tags: [], imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400' },
  { name: 'Crest Margarita', description: 'Tequila, lime, agave, smoked salt rim', price: 14, category: 'Cocktails', tags: [], imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400' },
  { name: 'Texas Mule', description: 'Vodka, ginger beer, lime, jalapeño', price: 13, category: 'Cocktails', tags: [], imageUrl: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400' },
  { name: 'House Red Blend', description: 'Texas Hill Country red, glass', price: 12, category: 'Wine', tags: [], imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400' },
  { name: 'Chardonnay', description: 'California chardonnay, glass', price: 14, category: 'Wine', tags: [], imageUrl: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400' },
  { name: 'Sparkling Water', description: 'Topo Chico or house sparkling', price: 5, category: 'Non-Alcoholic', tags: [], imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400' },
  { name: 'Craft Lemonade', description: 'House-made with Texas honey and mint', price: 6, category: 'Non-Alcoholic', tags: ['V'], imageUrl: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400' },
];

const blogPosts = [
  { title: 'The Art of Wood-Fire Cooking', slug: 'art-of-wood-fire-cooking', excerpt: 'Discover how our chefs harness live fire to create unforgettable flavors.', content: '<p>At Ember & Crest, fire is not just a cooking method—it\'s the soul of our kitchen. Our wood-fired grill reaches temperatures that sear and smoke in ways gas simply cannot replicate.</p><p>Chef Marcus Dellacroix has spent decades perfecting the balance of heat, smoke, and time. From our signature ribeye to the delicate oysters, every dish tells a story of flame and flavor.</p>', category: 'Chef Stories', featuredImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800', readTime: 5 },
  { title: 'Seasonal Menu: Spring 2025', slug: 'seasonal-menu-spring-2025', excerpt: 'New dishes celebrating Texas spring produce and Hill Country ingredients.', content: '<p>Spring in Austin brings an abundance of local produce. This season we\'re featuring grilled peaches from Johnson City, heirloom tomatoes from Round Rock, and fresh herbs from our partner farms.</p><p>Our new spring menu launches March 15. Reserve your table to be among the first to experience these limited-time offerings.</p>', category: 'Seasonal Menus', featuredImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800', readTime: 4 },
  { title: 'Wine Pairings for Fire-Cooked Meats', slug: 'wine-pairings-fire-cooked-meats', excerpt: 'Our sommelier shares the perfect wines to complement wood-fired dishes.', content: '<p>Smoke and char create unique flavor profiles that demand thoughtful wine pairings. For our wood-grilled ribeye, we recommend a bold Texas Tempranillo or a California Cabernet.</p><p>Lighter meats like our duck breast pair beautifully with Pinot Noir. Discover our full pairing menu when you dine with us.</p>', category: 'Wine Pairings', featuredImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800', readTime: 6 },
  { title: 'Austin Food Culture: Then and Now', slug: 'austin-food-culture-then-now', excerpt: 'How Austin\'s dining scene has evolved since we opened in 2009.', content: '<p>When Ember & Crest opened on Congress Avenue in 2009, Austin was a different city. The food scene was growing, but fine dining with a Texas twist was rare.</p><p>Today, we\'re proud to be part of a thriving culinary community. From food trucks to white tablecloths, Austin eats with passion—and we\'re here for it.</p>', category: 'Austin Food Culture', featuredImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', readTime: 5 },
  { title: 'Meet Chef Marcus Dellacroix', slug: 'meet-chef-marcus-dellacroix', excerpt: 'The man behind the flames shares his journey from France to Texas.', content: '<p>Chef Marcus grew up in Lyon, France, where his grandmother taught him to cook over an open hearth. That early exposure to fire cooking shaped his entire career.</p><p>After stints in Paris and New York, he found his home in Austin. "Texas has the best ingredients and the most open-minded diners," he says. "It\'s the perfect place for Ember & Crest."</p>', category: 'Chef Stories', featuredImage: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800', readTime: 7 },
  { title: 'Private Dining: The Hearth Room', slug: 'private-dining-hearth-room', excerpt: 'An intimate space for celebrations and corporate gatherings.', content: '<p>The Hearth Room seats up to 20 guests in an intimate setting with views of our main kitchen. Custom menus, AV equipment, and dedicated service make it ideal for birthdays, anniversaries, and business dinners.</p><p>Contact our events team to plan your next gathering. We offer Bronze, Silver, and Gold packages to suit every occasion.</p>', category: 'Events', featuredImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800', readTime: 4 },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  await User.deleteMany({});
  await MenuItem.deleteMany({});
  await BlogPost.deleteMany({});
  await Reservation.deleteMany({});
  await EventInquiry.deleteMany({});

  const admin = await User.create({ name: 'Admin', email: 'admin@emberandcrest.com', password: 'Admin@1234', role: 'admin' });
  console.log('Admin created:', admin.email);

  await MenuItem.insertMany(menuItems);
  console.log('Menu items created:', menuItems.length);

  await BlogPost.insertMany(blogPosts);
  console.log('Blog posts created:', blogPosts.length);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const reservations = [
    { name: 'John Smith', email: 'john@example.com', phone: '512-555-0101', date: new Date(today.getTime() + 86400000), time: '7:00PM', partySize: 2, seatingPreference: 'Indoor', specialOccasion: 'Anniversary', bookingRef: 'EC123456' },
    { name: 'Sarah Johnson', email: 'sarah@example.com', phone: '512-555-0102', date: new Date(today.getTime() + 86400000), time: '7:30PM', partySize: 4, seatingPreference: 'Outdoor Patio', specialOccasion: 'None', bookingRef: 'EC234567' },
    { name: 'Michael Chen', email: 'michael@example.com', phone: '512-555-0103', date: new Date(today.getTime() + 2 * 86400000), time: '6:00PM', partySize: 6, seatingPreference: 'Private Dining Room', specialOccasion: 'Business Dinner', bookingRef: 'EC345678' },
    { name: 'Emily Davis', email: 'emily@example.com', phone: '512-555-0104', date: new Date(today.getTime() + 3 * 86400000), time: '8:00PM', partySize: 2, seatingPreference: 'Bar Area', specialOccasion: 'Birthday', bookingRef: 'EC456789' },
    { name: 'Robert Wilson', email: 'robert@example.com', phone: '512-555-0105', date: new Date(today.getTime() + 4 * 86400000), time: '7:00PM', partySize: 8, seatingPreference: 'Indoor', specialOccasion: 'Proposal', bookingRef: 'EC567890' },
  ];
  await Reservation.insertMany(reservations);
  console.log('Reservations created:', reservations.length);

  const eventInquiries = [
    { name: 'Corporate Events Inc', email: 'events@corp.com', phone: '512-555-0201', eventType: 'Corporate Events', date: new Date(today.getTime() + 14 * 86400000), guestCount: 18, message: 'Looking to host a quarterly meeting.', status: 'new' },
    { name: 'Jennifer Lee', email: 'jennifer@email.com', phone: '512-555-0202', eventType: 'Special Occasions', date: new Date(today.getTime() + 21 * 86400000), guestCount: 12, message: 'Planning a 50th birthday celebration.', status: 'contacted' },
    { name: 'Austin Tech Co', email: 'hello@atech.com', phone: '512-555-0203', eventType: 'Buyout / Full Venue', date: new Date(today.getTime() + 30 * 86400000), guestCount: 80, message: 'Company anniversary party.', status: 'new' },
  ];
  await EventInquiry.insertMany(eventInquiries);
  console.log('Event inquiries created:', eventInquiries.length);

  console.log('Seed complete.');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
