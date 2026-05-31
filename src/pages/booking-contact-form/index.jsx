import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import BookingFormCard from './components/BookingFormCard';
import ContactInfoCard from './components/ContactInfoCard';
import MapSection from './components/MapSection';
import Icon from '../../components/AppIcon';

const BookingContactForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: 'Clock',
      title: 'Quick Response',
      description: 'Get confirmation within 15 minutes'
    },
    {
      icon: 'Shield',
      title: 'Secure Booking',
      description: 'Your information is safe with us'
    },
    {
      icon: 'Star',
      title: 'Best Experience',
      description: 'Premium service guaranteed'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <Header />
      <main className="pt-20 md:pt-24 pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3E5B3A]/10 text-[#3E5B3A] text-sm md:text-base font-medium mb-4 md:mb-6">
              <Icon name="Calendar" size={20} />
              <span>Book Your Table</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1B1B1B] mb-4 md:mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Reserve Your Garden Experience
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-[#4A5568] max-w-3xl mx-auto">
              Book a table, inquire about events, or simply reach out. We're here to make your visit memorable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 lg:mb-16">
            {features?.map((feature, index) => (
              <div
                key={index}
                className="bg-white/75 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#3E5B3A]/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name={feature?.icon} size={28} color="#3E5B3A" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#1B1B1B] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {feature?.title}
                </h3>
                <p className="text-sm md:text-base text-[#4A5568]">
                  {feature?.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-8 md:mb-12 lg:mb-16">
            <div className="lg:col-span-2">
              <BookingFormCard />
            </div>
            
            <div className="lg:col-span-1">
              <ContactInfoCard />
            </div>
          </div>

          <MapSection />

          <div className="mt-8 md:mt-12 lg:mt-16 bg-gradient-to-r from-[#3E5B3A] to-[#2D4A27] rounded-3xl shadow-xl p-6 md:p-8 lg:p-10 text-white text-center">
            <Icon name="Heart" size={48} color="white" className="mx-auto mb-4 md:mb-6" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              We Can't Wait to Serve You
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-6 md:mb-8">
              Whether it's a quiet chai moment, a family celebration, or a student study session, ChaiPal Garden Cafe is your perfect destination. Book now and experience the magic of our garden oasis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button
                onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                className="px-6 md:px-8 py-3 md:py-4 rounded-xl bg-white text-[#3E5B3A] font-semibold hover:bg-white/90 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Icon name="MessageCircle" size={20} />
                <span className="text-sm md:text-base">WhatsApp Us</span>
              </button>
              <button
                onClick={() => window.location.href = 'tel:+919876543210'}
                className="px-6 md:px-8 py-3 md:py-4 rounded-xl bg-white/20 text-white font-semibold hover:bg-white/30 transition-all duration-300 border-2 border-white/50 flex items-center justify-center gap-2"
              >
                <Icon name="Phone" size={20} />
                <span className="text-sm md:text-base">Call Now</span>
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-[#1B1B1B] text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#3E5B3A] flex items-center justify-center">
                  <Icon name="Coffee" size={24} color="white" />
                </div>
                <span className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  ChaiPal Garden Cafe
                </span>
              </div>
              <p className="text-sm text-white/70">
                Where tradition meets modern comfort in the heart of Jaipur.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="/hero-experience-zone" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="/complete-menu-experience" className="hover:text-white transition-colors">Menu</a></li>
                <li><a href="/special-offers-gallery" className="hover:text-white transition-colors">Offers</a></li>
                <li><a href="/location-contact-hub" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Opening Hours
              </h3>
              <p className="text-sm text-white/70 mb-2">Monday - Sunday</p>
              <p className="text-base font-semibold">9:00 AM - 10:00 PM</p>
            </div>
          </div>

          <div className="pt-6 md:pt-8 border-t border-white/10 text-center text-sm text-white/70">
            <p>&copy; {new Date()?.getFullYear()} ChaiPal Garden Cafe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BookingContactForm;