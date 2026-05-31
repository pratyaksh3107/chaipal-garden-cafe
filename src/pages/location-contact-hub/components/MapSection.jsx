import React from 'react';

const MapSection = ({ location }) => {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] rounded-2xl overflow-hidden shadow-lg">
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title={location?.name}
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${location?.lat},${location?.lng}&z=15&output=embed`}
        className="border-0"
      />
    </div>
  );
};

export default MapSection;