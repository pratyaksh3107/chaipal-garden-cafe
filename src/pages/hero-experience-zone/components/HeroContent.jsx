import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroContent = ({ onWhatsAppOrder, onCallNow, onViewMenu }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1691939603549-e429558bf2a5"
          alt="Serene garden cafe setting with lush green plants, wooden furniture, and warm ambient lighting creating a peaceful outdoor dining atmosphere"
          className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-24 lg:py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 md:mb-8">
          <Icon name="Award" size={16} color="#D4AF37" className="md:w-5 md:h-5" />
          <span className="text-xs md:text-sm font-medium text-white">Jaipur's Premier Garden Cafe</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
          <span className="block">Garden Vibes Meet</span>
          <span className="block text-accent">Chai Perfection</span>
        </h1>

        {/* Subheading */}
        <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-8 md:mb-10 lg:mb-12 leading-relaxed">
          Your peaceful evening destination where tradition meets modern comfort. Experience authentic chai culture in Jaipur's most beautiful garden setting.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-10 lg:mb-12">
          {[
          { icon: 'Users', text: 'Student Friendly' },
          { icon: 'Heart', text: 'Family Welcoming' },
          { icon: 'Coffee', text: 'Premium Chai' },
          { icon: 'TreePine', text: 'Garden Ambiance' }]?.
          map((feature, index) =>
          <div
            key={index}
            className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">

              <Icon name={feature?.icon} size={16} color="#D4AF37" className="md:w-5 md:h-5" />
              <span className="text-xs md:text-sm text-white font-medium">{feature?.text}</span>
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 mb-12 md:mb-16">
          <Button
            variant="default"
            size="lg"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={onWhatsAppOrder}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300">

            Order via WhatsApp
          </Button>
          <Button
            variant="outline"
            size="lg"
            iconName="Phone"
            iconPosition="left"
            onClick={onCallNow}
            className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">

            Call Now
          </Button>
          <Button
            variant="ghost"
            size="lg"
            iconName="Menu"
            iconPosition="left"
            onClick={onViewMenu}
            className="w-full sm:w-auto text-white hover:bg-white/10">

            View Menu
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {[
          { number: '500+', label: 'Happy Customers', icon: 'Users' },
          { number: '50+', label: 'Menu Items', icon: 'Coffee' },
          { number: '4.8', label: 'Rating', icon: 'Star' },
          { number: '7+', label: 'Years Serving', icon: 'Award' }]?.
          map((stat, index) =>
          <div
            key={index}
            className="p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300">

              <div className="flex justify-center mb-2 md:mb-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Icon name={stat?.icon} size={20} color="#D4AF37" className="md:w-6 md:h-6" />
                </div>
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">{stat?.number}</div>
              <div className="text-xs md:text-sm text-white/70">{stat?.label}</div>
            </div>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs md:text-sm text-white/70">Scroll to explore</span>
            <Icon name="ChevronDown" size={24} color="rgba(255,255,255,0.7)" />
          </div>
        </div>
      </div>
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-4 md:left-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center animate-float">
        <Icon name="Coffee" size={24} color="#D4AF37" className="md:w-8 md:h-8" />
      </div>
      <div className="absolute top-1/3 right-4 md:right-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center animate-float delay-500">
        <Icon name="Leaf" size={24} color="#D4AF37" className="md:w-8 md:h-8" />
      </div>
    </div>);

};

export default HeroContent;