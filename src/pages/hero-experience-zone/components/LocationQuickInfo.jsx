import React from 'react';
import Icon from '../../../components/AppIcon';

const LocationQuickInfo = () => {
  const locationInfo = [
    {
      icon: 'MapPin',
      title: 'Location',
      value: 'Sitapura, Jaipur',
      action: 'Get Directions',
      link: 'https://maps.google.com/?q=26.7606,75.8472'
    },
    {
      icon: 'Clock',
      title: 'Hours',
      value: '10:00 AM - 11:00 PM',
      action: 'View Schedule',
      link: null
    },
    {
      icon: 'Phone',
      title: 'Contact',
      value: '+91 98765 43210',
      action: 'Call Now',
      link: 'tel:+919876543210'
    }
  ];

  const handleAction = (link) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <div className="bg-card py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {locationInfo?.map((info, index) => (
            <div
              key={index}
              className="group relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white to-muted border border-border hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300">
                <Icon name={info?.icon} size={24} color="var(--color-primary)" className="md:w-7 md:h-7" />
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="text-sm md:text-base font-medium text-muted-foreground mb-2">{info?.title}</h3>
                <p className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">{info?.value}</p>
              </div>

              {/* Action Button */}
              {info?.link && (
                <button
                  onClick={() => handleAction(info?.link)}
                  className="inline-flex items-center gap-2 text-sm md:text-base font-medium text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  <span>{info?.action}</span>
                  <Icon name="ArrowRight" size={16} color="var(--color-primary)" className="group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              )}

              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationQuickInfo;