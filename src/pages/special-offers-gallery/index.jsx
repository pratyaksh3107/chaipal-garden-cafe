import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import OfferCard from './components/OfferCard';
import FilterTabs from './components/FilterTabs';
import StatsSection from './components/StatsSection';

const SpecialOffersGallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
  { id: 'all', label: 'All Offers', icon: 'Sparkles' },
  { id: 'student', label: 'Student Deals', icon: 'GraduationCap' },
  { id: 'family', label: 'Family Packages', icon: 'Users' },
  { id: 'professional', label: 'Professional', icon: 'Briefcase' },
  { id: 'seasonal', label: 'Seasonal', icon: 'Calendar' }];


  const offers = [
  {
    id: 1,
    category: 'Student Deals',
    targetAudience: 'Students',
    title: 'Student Evening Special',
    description: 'Perfect for study sessions and group hangouts. Enjoy unlimited chai refills with any snack combo during evening hours.',
    image: "https://images.unsplash.com/photo-1695141482705-7df6fb3df273",
    imageAlt: 'Group of young students sitting together at outdoor cafe table with chai cups and snacks, laughing and studying in warm evening light',
    originalPrice: 299,
    discountedPrice: 199,
    discount: 33,
    features: [
    'Valid 4 PM - 8 PM on weekdays',
    'Unlimited chai refills (any flavor)',
    'Choice of samosa, pakora, or sandwich',
    'Free WiFi access',
    'Student ID required'],

    expiryDate: '31/03/2026',
    promoCode: 'STUDENT199',
    terms: 'Valid student ID must be presented. One offer per person. Cannot be combined with other promotions. Valid at Sitapura location only.',
    badge: 'Popular',
    categoryId: 'student'
  },
  {
    id: 2,
    category: 'Family Packages',
    targetAudience: 'Families',
    title: 'Weekend Family Feast',
    description: 'Quality family time in our garden setting. Complete meal package for 4 people with diverse menu options for all ages.',
    image: "https://images.unsplash.com/photo-1719505881804-00ab383e3969",
    imageAlt: 'Happy family of four sitting at garden cafe table with variety of food plates, chai cups, and desserts, children smiling with parents in peaceful outdoor setting',
    originalPrice: 1499,
    discountedPrice: 999,
    discount: 33,
    features: [
    '4 chai varieties of choice',
    '2 main course items (veg/non-veg)',
    '4 snack items selection',
    '2 desserts included',
    'Kids play area access',
    'Complimentary family photo'],

    expiryDate: '30/04/2026',
    promoCode: 'FAMILY999',
    terms: 'Valid on Saturdays and Sundays only. Advance booking recommended. Package serves 4 people. Additional charges for extra items.',
    badge: 'Best Value',
    categoryId: 'family'
  },
  {
    id: 3,
    category: 'Professional',
    targetAudience: 'Professionals',
    title: 'Business Meeting Package',
    description: 'Premium private seating for professional meetings. Includes refreshments and conducive environment for productive discussions.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1105ad726-1768390356633.png",
    imageAlt: 'Two business professionals in formal attire having meeting at elegant cafe table with laptops, documents, and premium chai service in quiet corner',
    originalPrice: 799,
    discountedPrice: 599,
    discount: 25,
    features: [
    'Reserved private seating (2 hours)',
    'Premium chai service for 2-4 people',
    'Assorted snacks platter',
    'High-speed WiFi access',
    'Power outlets available',
    'Quiet zone guarantee'],

    expiryDate: '31/05/2026',
    promoCode: 'BIZMEET599',
    terms: 'Advance booking required (24 hours). Valid Monday to Friday, 10 AM - 6 PM. Maximum 4 people per booking. Extended hours available at additional cost.',
    categoryId: 'professional'
  },
  {
    id: 4,
    category: 'Seasonal',
    targetAudience: 'All',
    title: 'Monsoon Magic Combo',
    description: 'Celebrate the rainy season with our special monsoon menu. Hot chai paired with crispy pakoras in our covered garden area.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_12342f4e8-1764659988136.png",
    imageAlt: 'Steaming cup of masala chai with plate of golden crispy pakoras on wooden table, rain drops visible on window in background creating cozy monsoon atmosphere',
    originalPrice: 249,
    discountedPrice: 179,
    discount: 28,
    features: [
    'Special monsoon chai blend',
    'Mixed vegetable pakora platter',
    'Mint chutney and sauces',
    'Covered seating with rain view',
    'Complimentary ginger shot'],

    expiryDate: '30/09/2026',
    promoCode: 'MONSOON179',
    terms: 'Valid during monsoon season (June-September). Subject to weather conditions. Covered seating based on availability. Cannot be combined with other offers.',
    badge: 'Limited Time',
    categoryId: 'seasonal'
  },
  {
    id: 5,
    category: 'Student Deals',
    targetAudience: 'Students',
    title: 'Exam Week Power Pack',
    description: 'Fuel your study sessions during exam season. Energy-boosting snacks and unlimited chai to keep you focused and refreshed.',
    image: "https://images.unsplash.com/photo-1683527466442-04e82f78081d",
    imageAlt: 'Student studying at cafe table with open textbooks, laptop, and multiple chai cups, surrounded by healthy snacks and energy bars in focused study environment',
    originalPrice: 349,
    discountedPrice: 249,
    discount: 29,
    features: [
    'Unlimited chai refills (6 hours)',
    'Energy bar and dry fruits mix',
    'Sandwich or wrap of choice',
    'Fresh fruit platter',
    'Extended seating hours',
    'Quiet study zone access'],

    expiryDate: '15/06/2026',
    promoCode: 'EXAMPOWER249',
    terms: 'Valid during university exam periods (March-June, November-December). Student ID mandatory. One package per day per student. Advance booking preferred.',
    categoryId: 'student'
  },
  {
    id: 6,
    category: 'Family Packages',
    targetAudience: 'Families',
    title: 'Birthday Celebration Special',
    description: 'Make birthdays memorable in our garden setting. Complete party package with decorations, cake, and special menu for your celebration.',
    image: "https://images.unsplash.com/photo-1726532712888-dd196b82c78d",
    imageAlt: 'Birthday celebration setup at garden cafe with decorated table, colorful balloons, birthday cake with candles, and family members gathered around in festive atmosphere',
    originalPrice: 2499,
    discountedPrice: 1799,
    discount: 28,
    features: [
    'Decorated private area (3 hours)',
    'Custom birthday cake (1 kg)',
    'Chai and snacks for 10 people',
    'Birthday playlist music',
    'Complimentary photo session',
    'Party favors for kids',
    'Special birthday chai blend'],

    expiryDate: '31/12/2026',
    promoCode: 'BDAY1799',
    terms: 'Minimum 48 hours advance booking required. Package for up to 10 people. Additional guests charged separately. Cake flavor and decorations to be confirmed 24 hours prior.',
    badge: 'Premium',
    categoryId: 'family'
  },
  {
    id: 7,
    category: 'Professional',
    targetAudience: 'Professionals',
    title: 'Corporate Bulk Order',
    description: 'Perfect for office meetings and events. Bulk chai and snacks delivery with professional service for your workplace gatherings.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1cf479453-1767278226960.png",
    imageAlt: 'Professional office meeting setup with multiple chai cups arranged on conference table, assorted snacks platters, and business people in background during corporate event',
    originalPrice: 3999,
    discountedPrice: 2999,
    discount: 25,
    features: [
    'Chai service for 20-30 people',
    'Assorted snacks variety pack',
    'Disposable cups and plates',
    'On-time delivery guarantee',
    'Professional serving staff (optional)',
    'Customizable menu options'],

    expiryDate: '31/07/2026',
    promoCode: 'CORP2999',
    terms: 'Minimum order for 20 people. Advance booking required (48 hours). Delivery within 5 km radius of Sitapura. Additional charges for serving staff and extended service.',
    categoryId: 'professional'
  },
  {
    id: 8,
    category: 'Seasonal',
    targetAudience: 'All',
    title: 'Winter Warmth Special',
    description: 'Cozy winter evenings with our special winter menu. Hot chai varieties paired with seasonal snacks in our heated garden area.',
    image: "https://images.unsplash.com/photo-1541624511060-3b097d8212ed",
    imageAlt: 'Steaming cup of spiced winter chai with cinnamon stick on rustic wooden table, warm blanket visible, and soft winter evening light creating cozy ambiance',
    originalPrice: 299,
    discountedPrice: 219,
    discount: 27,
    features: [
    'Special winter chai blend',
    'Hot soup of the day',
    'Grilled sandwich or toast',
    'Seasonal fruit dessert',
    'Heated seating area',
    'Complimentary ginger-honey shot'],

    expiryDate: '28/02/2026',
    promoCode: 'WINTER219',
    terms: 'Valid during winter months (November-February). Evening hours only (5 PM - 10 PM). Heated seating subject to availability. One offer per person per visit.',
    badge: 'Seasonal',
    categoryId: 'seasonal'
  }];


  const stats = [
  { icon: 'Tag', value: '8+', label: 'Active Offers' },
  { icon: 'Users', value: '500+', label: 'Happy Customers' },
  { icon: 'Percent', value: 'Up to 33%', label: 'Max Savings' },
  { icon: 'Clock', value: '24/7', label: 'WhatsApp Support' }];


  const filteredOffers = useMemo(() => {
    if (activeCategory === 'all') return offers;
    return offers?.filter((offer) => offer?.categoryId === activeCategory);
  }, [activeCategory]);

  const handleWhatsAppClick = (offer) => {
    const message = `Hi! I'm interested in the "${offer?.title}" offer (Code: ${offer?.promoCode}). Please provide more details.`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Special Offers & Deals - ChaiPal Garden Cafe | Save Up to 33%</title>
        <meta name="description" content="Exclusive deals and special offers at ChaiPal Garden Cafe Jaipur. Student discounts, family packages, and seasonal specials. Save up to 33% on chai and snacks." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-16">

              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <Icon name="Sparkles" size={20} color="var(--color-primary)" />
                <span className="text-primary text-sm font-semibold">Limited Time Offers</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Special Offers & Deals
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover exclusive deals crafted for students, families, and professionals. Save up to 33% on your favorite chai and snacks while enjoying our premium garden ambiance.
              </p>
            </motion.div>

            <StatsSection stats={stats} />

            <FilterTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory} />


            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

              {filteredOffers?.map((offer, index) =>
              <OfferCard
                key={offer?.id}
                offer={offer}
                index={index}
                onWhatsAppClick={handleWhatsAppClick} />

              )}
            </motion.div>

            {filteredOffers?.length === 0 &&
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16">

                <Icon name="Search" size={64} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                <p className="text-xl text-muted-foreground">No offers found in this category</p>
              </motion.div>
            }

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 bg-white/75 backdrop-blur-md rounded-[24px] p-8 md:p-12 shadow-lg text-center">

              <Icon name="Bell" size={48} color="var(--color-primary)" className="mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Never Miss an Offer
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get instant notifications about new deals, seasonal specials, and exclusive offers directly on WhatsApp. Join our community of smart savers today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.open('https://wa.me/919876543210?text=Hi! I want to receive offer notifications', '_blank')}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-[18px] font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

                  <Icon name="MessageCircle" size={20} />
                  Subscribe via WhatsApp
                </button>
                <button
                  onClick={() => window.location.href = 'tel:+919876543210'}
                  className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-[18px] font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300">

                  <Icon name="Phone" size={20} />
                  Call for Details
                </button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>);

};

export default SpecialOffersGallery;