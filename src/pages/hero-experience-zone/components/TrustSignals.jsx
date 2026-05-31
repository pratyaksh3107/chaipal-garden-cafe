import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const trustBadges = [
  {
    icon: 'Shield',
    title: 'Hygiene Certified',
    description: 'FSSAI approved kitchen'
  },
  {
    icon: 'Leaf',
    title: 'Fresh Ingredients',
    description: 'Daily sourced produce'
  },
  {
    icon: 'Users',
    title: 'Family Friendly',
    description: 'Safe & welcoming space'
  },
  {
    icon: 'Wifi',
    title: 'Free WiFi',
    description: 'High-speed internet'
  }];


  const customerPhotos = [
  {
    image: "https://images.unsplash.com/photo-1677306897776-60c2a5f19fcd",
    imageAlt: 'Happy young couple enjoying chai and snacks at outdoor garden cafe table with green plants in background'
  },
  {
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_115123986-1767965016098.png",
    imageAlt: 'Group of college students laughing and studying together at cafe with laptops and coffee cups on wooden table'
  },
  {
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d4d31692-1768339399220.png",
    imageAlt: 'Indian family with children sitting at garden cafe enjoying traditional chai and snacks in peaceful outdoor setting'
  },
  {
    image: "https://images.unsplash.com/photo-1625473358385-4d6f0f1ca863",
    imageAlt: 'Young professional woman working on laptop at cafe with steaming cup of chai and notebook on rustic wooden table'
  }];


  return (
    <div className="bg-background py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Trust Badges */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Why Choose Chai Pal?
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the perfect blend of quality, comfort, and tradition
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16 lg:mb-20">
          {trustBadges?.map((badge, index) =>
          <div
            key={index}
            className="p-4 md:p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 text-center">

              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Icon name={badge?.icon} size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-2">{badge?.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{badge?.description}</p>
            </div>
          )}
        </div>

        {/* Customer Photos Section */}
        <div className="text-center mb-8 md:mb-10">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 md:mb-3">
            Real Moments, Real Experiences
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            See what makes Chai Pal special through our customers' eyes
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {customerPhotos?.map((photo, index) =>
          <div
            key={index}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer">

              <Image
              src={photo?.image}
              alt={photo?.imageAlt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2">
                  <Icon name="Heart" size={16} color="#FFFFFF" />
                  <span className="text-xs md:text-sm text-white font-medium">Customer Love</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Social Proof */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full bg-accent/10 border border-accent/20">
            <Icon name="Star" size={20} color="#D4AF37" className="md:w-6 md:h-6" />
            <span className="text-base md:text-lg font-semibold text-foreground">4.8/5.0</span>
            <span className="text-sm md:text-base text-muted-foreground">from 500+ reviews</span>
          </div>
        </div>
      </div>
    </div>);

};

export default TrustSignals;