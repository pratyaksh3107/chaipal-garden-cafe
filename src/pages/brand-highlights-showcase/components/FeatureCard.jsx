import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeatureCard = ({ icon, title, description, image, imageAlt, badge }) => {
  return (
    <div className="group relative bg-white/75 backdrop-blur-md rounded-[24px] p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-black/5">
      {badge && (
        <div className="absolute top-4 right-4 bg-[#D4AF37] text-[#1A1A1A] px-3 py-1 rounded-full text-xs font-semibold">
          {badge}
        </div>
      )}
      
      <div className="relative h-48 md:h-56 lg:h-64 rounded-[18px] overflow-hidden mb-6">
        <Image
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D4A27]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#2D4A27]/10 flex items-center justify-center group-hover:bg-[#2D4A27] transition-colors duration-300">
          <Icon 
            name={icon} 
            size={24} 
            color="var(--color-primary)" 
            className="group-hover:text-white transition-colors duration-300"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#2D4A27] transition-colors duration-300" style={{ fontFamily: "'Playfair Display', serif" }}>
            {title}
          </h3>
        </div>
      </div>

      <p className="text-sm md:text-base text-[#4A5568] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
        {description}
      </p>

      <div className="mt-6 pt-6 border-t border-black/5">
        <div className="flex items-center gap-2 text-[#2D4A27] font-medium text-sm group-hover:gap-3 transition-all duration-300">
          <span>Discover More</span>
          <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;