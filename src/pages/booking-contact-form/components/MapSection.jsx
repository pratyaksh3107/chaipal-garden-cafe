import React from 'react';
import Icon from '../../../components/AppIcon';

const MapSection = () => {
  const handleDirections = () => {
    window.open('https://www.google.com/maps/dir/?api=1&destination=26.7606,75.8472', '_blank');
  };

  return (
    <div className="w-full bg-white/75 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden">
      <div className="p-6 md:p-8 border-b border-[rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1B1B1B] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Find Us Here
            </h3>
            <p className="text-sm md:text-base text-[#4A5568]">
              Sitapura Industrial Area, Jaipur, Rajasthan
            </p>
          </div>
          <button
            onClick={handleDirections}
            className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#3E5B3A] hover:bg-[#2D4A27] flex items-center justify-center transition-all duration-300 hover:shadow-lg"
            aria-label="Get directions"
          >
            <Icon name="Navigation" size={24} color="white" />
          </button>
        </div>
      </div>

      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="ChaiPal Garden Cafe Location"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=26.7606,75.8472&z=14&output=embed"
          className="border-0"
        />
      </div>

      <div className="p-6 md:p-8 bg-gradient-to-r from-[#3E5B3A]/5 to-[#5A3E2B]/5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3E5B3A]/10 flex items-center justify-center">
              <Icon name="Car" size={20} color="#3E5B3A" />
            </div>
            <div>
              <p className="text-xs md:text-sm font-semibold text-[#1B1B1B]">Parking</p>
              <p className="text-xs text-[#4A5568]">Ample space</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3E5B3A]/10 flex items-center justify-center">
              <Icon name="Wifi" size={20} color="#3E5B3A" />
            </div>
            <div>
              <p className="text-xs md:text-sm font-semibold text-[#1B1B1B]">Free WiFi</p>
              <p className="text-xs text-[#4A5568]">High speed</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3E5B3A]/10 flex items-center justify-center">
              <Icon name="Accessibility" size={20} color="#3E5B3A" />
            </div>
            <div>
              <p className="text-xs md:text-sm font-semibold text-[#1B1B1B]">Accessible</p>
              <p className="text-xs text-[#4A5568]">Wheelchair friendly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection;