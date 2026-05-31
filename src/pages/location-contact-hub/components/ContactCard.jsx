import React from 'react';
import Icon from '../../../components/AppIcon';

const ContactCard = ({ icon, title, content, action, actionLabel }) => {
  return (
    <div className="bg-white/75 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-3 md:gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon name={icon} size={20} color="var(--color-primary)" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            {title}
          </h3>
          <div className="text-sm md:text-base text-muted-foreground space-y-1">
            {Array.isArray(content) ? (
              content?.map((item, index) => (
                <p key={index} className="break-words">{item}</p>
              ))
            ) : (
              <p className="break-words">{content}</p>
            )}
          </div>
          {action && actionLabel && (
            <button
              onClick={action}
              className="mt-3 md:mt-4 inline-flex items-center gap-2 text-sm md:text-base font-medium text-primary hover:text-primary/80 transition-colors duration-200"
            >
              {actionLabel}
              <Icon name="ExternalLink" size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;