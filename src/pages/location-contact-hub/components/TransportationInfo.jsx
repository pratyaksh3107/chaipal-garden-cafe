import React from 'react';
import Icon from '../../../components/AppIcon';

const TransportationInfo = ({ transportation }) => {
  return (
    <div className="bg-white/75 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-md">
      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name="Navigation" size={20} color="var(--color-primary)" />
        </div>
        <h3 className="text-base md:text-lg font-semibold text-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
          How to Reach Us
        </h3>
      </div>
      <div className="space-y-4 md:space-y-6">
        {/* Public Transport */}
        <div>
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <Icon name="Bus" size={18} color="var(--color-primary)" />
            <h4 className="text-sm md:text-base font-semibold text-foreground">Public Transport</h4>
          </div>
          <ul className="space-y-1 md:space-y-2 ml-7 md:ml-8">
            {transportation?.publicTransport?.map((route, index) => (
              <li key={index} className="text-xs md:text-sm text-muted-foreground">
                • {route}
              </li>
            ))}
          </ul>
        </div>

        {/* Parking */}
        <div>
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <Icon name="ParkingCircle" size={18} color="var(--color-primary)" />
            <h4 className="text-sm md:text-base font-semibold text-foreground">Parking</h4>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground ml-7 md:ml-8">
            {transportation?.parking}
          </p>
        </div>

        {/* Landmarks */}
        <div>
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <Icon name="MapPin" size={18} color="var(--color-primary)" />
            <h4 className="text-sm md:text-base font-semibold text-foreground">Nearby Landmarks</h4>
          </div>
          <ul className="space-y-1 md:space-y-2 ml-7 md:ml-8">
            {transportation?.landmarks?.map((landmark, index) => (
              <li key={index} className="text-xs md:text-sm text-muted-foreground">
                • {landmark}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TransportationInfo;