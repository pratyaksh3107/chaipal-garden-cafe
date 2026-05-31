import React from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import MapSection from './components/MapSection';
import ContactCard from './components/ContactCard';
import BusinessHoursCard from './components/BusinessHoursCard';
import TransportationInfo from './components/TransportationInfo';
import CertificationsCard from './components/CertificationsCard';

const LocationContactHub = () => {
  const locationData = {
    name: "ChaiPal Garden Cafe",
    lat: 26.7606,
    lng: 75.8472,
    address: [
      "Plot No. 42, Sitapura Industrial Area",
      "Near Apex Circle, Sitapura",
      "Jaipur, Rajasthan 302022"
    ],
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "hello@chaipalgarden.com"
  };

  const businessHours = [
    { day: "Monday", open: "10:00", close: "23:00", closed: false },
    { day: "Tuesday", open: "10:00", close: "23:00", closed: false },
    { day: "Wednesday", open: "10:00", close: "23:00", closed: false },
    { day: "Thursday", open: "10:00", close: "23:00", closed: false },
    { day: "Friday", open: "10:00", close: "23:00", closed: false },
    { day: "Saturday", open: "09:00", close: "00:00", closed: false },
    { day: "Sunday", open: "09:00", close: "00:00", closed: false }
  ];

  const transportationInfo = {
    publicTransport: [
      "Bus Route 52 - Stops at Apex Circle (5 min walk)",
      "Bus Route 78 - Stops at Sitapura Main Gate (8 min walk)",
      "Auto-rickshaws available from Sitapura Metro Station (2 km)"
    ],
    parking: "Ample free parking available for 50+ vehicles including two-wheelers and four-wheelers. Covered parking for bikes available.",
    landmarks: [
      "200m from Apex Circle",
      "Opposite Sitapura Police Station",
      "Next to Rajasthan State Industrial Development Corporation",
      "5 minutes from Sitapura Metro Station"
    ]
  };

  const certifications = [
    {
      name: "FSSAI License",
      description: "Food Safety and Standards Authority of India certified establishment ensuring highest food safety standards",
      number: "12345678901234"
    },
    {
      name: "Fire Safety Certificate",
      description: "Compliant with all fire safety norms and equipped with modern fire fighting equipment",
      number: "FS/JR/2025/0042"
    },
    {
      name: "Trade License",
      description: "Valid trade license from Jaipur Municipal Corporation for restaurant operations",
      number: "TL/JMC/2025/1234"
    },
    {
      name: "Health & Hygiene",
      description: "Regular health inspections passed with A+ grade. Staff trained in food handling and hygiene protocols",
      number: null
    }
  ];

  const handlePhoneClick = () => {
    window.location.href = `tel:${locationData?.phone}`;
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${locationData?.whatsapp?.replace(/\s/g, '')}`, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${locationData?.email}`;
  };

  const handleDirectionsClick = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${locationData?.lat},${locationData?.lng}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24 lg:pt-28 pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Visit Us Today
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the perfect blend of garden ambiance and chai culture at our Sitapura location
            </p>
          </div>

          {/* Main Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12 lg:mb-16">
            {/* Left - Map Section */}
            <div className="order-2 lg:order-1">
              <MapSection location={locationData} />
            </div>

            {/* Right - Contact Information */}
            <div className="order-1 lg:order-2 space-y-4 md:space-y-6">
              <ContactCard
                icon="MapPin"
                title="Our Location"
                content={locationData?.address}
                action={handleDirectionsClick}
                actionLabel="Get Directions"
              />

              <ContactCard
                icon="Phone"
                title="Call Us"
                content={locationData?.phone}
                action={handlePhoneClick}
                actionLabel="Call Now"
              />

              <ContactCard
                icon="MessageCircle"
                title="WhatsApp"
                content="Chat with us for reservations and inquiries"
                action={handleWhatsAppClick}
                actionLabel="Open WhatsApp"
              />

              <ContactCard
                icon="Mail"
                title="Email"
                content={locationData?.email}
                action={handleEmailClick}
                actionLabel="Send Email"
              />
            </div>
          </div>

          {/* Business Hours */}
          <div className="mb-8 md:mb-12 lg:mb-16">
            <BusinessHoursCard hours={businessHours} />
          </div>

          {/* Transportation & Certifications Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            <TransportationInfo transportation={transportationInfo} />
            <CertificationsCard certifications={certifications} />
          </div>

          {/* Quick Actions Footer */}
          <div className="mt-8 md:mt-12 lg:mt-16 bg-white/75 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-md">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 md:mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Ready to Visit?
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Choose your preferred way to connect with us
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <button
                onClick={handleDirectionsClick}
                className="flex items-center justify-center gap-3 bg-primary text-primary-foreground rounded-xl px-6 py-4 md:py-5 font-semibold text-sm md:text-base hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Icon name="Navigation" size={20} />
                Get Directions
              </button>

              <button
                onClick={handlePhoneClick}
                className="flex items-center justify-center gap-3 bg-secondary text-secondary-foreground rounded-xl px-6 py-4 md:py-5 font-semibold text-sm md:text-base hover:bg-secondary/90 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Icon name="Phone" size={20} />
                Call Now
              </button>

              <button
                onClick={handleWhatsAppClick}
                className="flex items-center justify-center gap-3 bg-accent text-accent-foreground rounded-xl px-6 py-4 md:py-5 font-semibold text-sm md:text-base hover:bg-accent/90 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Icon name="MessageCircle" size={20} />
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Coffee" size={24} color="var(--color-primary)" />
              <span className="text-base md:text-lg font-semibold text-primary" style={{ fontFamily: 'Playfair Display, serif' }}>
                ChaiPal Garden Cafe
              </span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
              © {new Date()?.getFullYear()} ChaiPal Garden Cafe. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LocationContactHub;