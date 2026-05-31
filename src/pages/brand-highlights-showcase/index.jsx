import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SectionHeader from './components/SectionHeader';
import FeatureCard from './components/FeatureCard';

const BrandHighlightsShowcase = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
  {
    id: 1,
    icon: "Users",
    title: "Student-Friendly Haven",
    description: "Budget-conscious pricing meets premium ambiance. Perfect evening hangout spot with free WiFi, comfortable seating, and group-friendly spaces. Your study sessions and friend gatherings deserve this peaceful garden setting.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_115123986-1767965016098.png",
    imageAlt: "Group of diverse college students sitting together at outdoor cafe table laughing and studying with laptops and books in garden setting with string lights overhead",
    badge: "Popular"
  },
  {
    id: 2,
    icon: "Heart",
    title: "Family Weekend Destination",
    description: "Child-friendly garden spaces with safe play areas and family seating zones. Quality time in peaceful surroundings with authentic chai and homemade snacks. Weekend outings made memorable with our warm hospitality.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_179df4e81-1767704872896.png",
    imageAlt: "Happy Indian family with parents and two children sitting at outdoor garden cafe table enjoying snacks and drinks together with lush green plants in background",
    badge: "Family Favorite"
  },
  {
    id: 3,
    icon: "Briefcase",
    title: "Professional Meeting Space",
    description: "Premium ambiance for business discussions and client meetings. Efficient service, quiet corners, and quality beverages. Where professional conversations flow as smoothly as our signature chai.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1105ad726-1768390356633.png",
    imageAlt: "Two business professionals in formal attire having meeting at modern outdoor cafe table with laptops and coffee cups surrounded by green garden plants",
    badge: "Business Ready"
  },
  {
    id: 4,
    icon: "Coffee",
    title: "Traditional Chai Mastery",
    description: "Authentic Indian chai culture meets modern brewing techniques. Every cup crafted with premium tea leaves, traditional spices, and generations of expertise. Experience chai the way it was meant to be savored.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1edae3c66-1765129892610.png",
    imageAlt: "Close-up of traditional Indian masala chai in transparent glass cup with steam rising showing golden brown color with cinnamon stick and cardamom pods on wooden table",
    badge: "Signature"
  },
  {
    id: 5,
    icon: "Leaf",
    title: "Garden Vibes & Serenity",
    description: "Lush green surroundings with carefully curated garden spaces. Natural ambiance with comfortable seating under open skies. Escape the city chaos and find your peaceful moment in our garden oasis.",
    image: "https://images.unsplash.com/photo-1598234459897-a782daade3eb",
    imageAlt: "Beautiful outdoor garden cafe seating area with wooden furniture surrounded by hanging plants potted flowers and green vines with warm string lights creating cozy atmosphere",
    badge: "Peaceful"
  },
  {
    id: 6,
    icon: "Clock",
    title: "Evening to Late Night",
    description: "Open until late for your evening cravings and night-time conversations. Consistent quality from sunset to midnight. Your go-to destination when the city sleeps but your appetite awakens.",
    image: "https://images.unsplash.com/photo-1726499639626-ebc548d000cf",
    imageAlt: "Cozy outdoor cafe at evening time with warm yellow lighting from string lights and lanterns illuminating wooden tables and chairs with people dining in background",
    badge: "Extended Hours"
  }];


  return (
    <>
      <Helmet>
        <title>Brand Highlights - ChaiPal Garden Cafe | Premium Features & Experience</title>
        <meta name="description" content="Discover what makes ChaiPal Garden Cafe Jaipur's premier destination. Student-friendly pricing, family spaces, professional ambiance, traditional chai mastery, and peaceful garden vibes." />
        <meta name="keywords" content="garden cafe jaipur, student cafe, family restaurant, chai cafe, outdoor seating, sitapura cafe" />
      </Helmet>
      <Header />
      <main className="min-h-screen bg-[#FAF7F0] pt-24 pb-16 md:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <SectionHeader
            subtitle="Why Choose ChaiPal"
            title="Where Tradition Meets Modern Comfort"
            description="Experience the perfect blend of authentic chai culture and contemporary cafe sophistication. From students to families to professionals, we've crafted spaces and experiences that welcome everyone." />


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {features?.map((feature) =>
            <FeatureCard
              key={feature?.id}
              icon={feature?.icon}
              title={feature?.title}
              description={feature?.description}
              image={feature?.image}
              imageAlt={feature?.imageAlt}
              badge={feature?.badge} />

            )}
          </div>

          <div className="mt-16 md:mt-20 lg:mt-24 text-center">
            <div className="inline-block bg-white/75 backdrop-blur-md rounded-[24px] p-8 md:p-10 lg:p-12 shadow-xl border border-black/5">
              <h3 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to Experience ChaiPal?
              </h3>
              <p className="text-base md:text-lg text-[#4A5568] mb-6 max-w-2xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                Visit us at Sitapura, Jaipur and discover why we're the city's favorite garden cafe destination.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center justify-center gap-2 bg-[#2D4A27] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#3E5B3A] transition-colors duration-300">

                  <span>Call Now</span>
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#2D4A27] px-6 py-3 rounded-full font-semibold border-2 border-[#2D4A27] hover:bg-[#2D4A27] hover:text-white transition-colors duration-300">

                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-[#2D4A27] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="text-sm md:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            © {new Date()?.getFullYear()} ChaiPal Garden Cafe. All rights reserved.
          </p>
        </div>
      </footer>
    </>);

};

export default BrandHighlightsShowcase;