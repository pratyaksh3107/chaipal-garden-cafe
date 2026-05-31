import React from 'react';
import Icon from '../../../components/AppIcon';

const CertificationsCard = ({ certifications }) => {
  return (
    <div className="bg-white/75 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-md">
      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name="ShieldCheck" size={20} color="var(--color-primary)" />
        </div>
        <h3 className="text-base md:text-lg font-semibold text-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
          Certifications & Safety
        </h3>
      </div>
      <div className="space-y-3 md:space-y-4">
        {certifications?.map((cert, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
              <Icon name="CheckCircle2" size={16} color="var(--color-success)" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm md:text-base font-semibold text-foreground mb-1">
                {cert?.name}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground">
                {cert?.description}
              </p>
              {cert?.number && (
                <p className="text-xs text-muted-foreground mt-1">
                  License: {cert?.number}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsCard;