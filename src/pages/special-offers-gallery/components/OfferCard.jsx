import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OfferCard = ({ offer, index, onWhatsAppClick }) => {
  const isExpiringSoon = () => {
    const expiryDate = new Date(offer.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 3 && daysUntilExpiry > 0;
  };

  const isExpired = () => {
    const expiryDate = new Date(offer.expiryDate);
    const today = new Date();
    return expiryDate < today;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className={`relative bg-white/75 backdrop-blur-md rounded-[24px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${isExpired() ? 'opacity-60' : 'hover:-translate-y-2'}`}>
        {offer?.badge && !isExpired() && (
          <div className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground px-4 py-2 rounded-full text-xs font-semibold shadow-md">
            {offer?.badge}
          </div>
        )}

        {isExpired() && (
          <div className="absolute top-4 right-4 z-10 bg-error text-error-foreground px-4 py-2 rounded-full text-xs font-semibold shadow-md">
            EXPIRED
          </div>
        )}

        {isExpiringSoon() && !isExpired() && (
          <div className="absolute top-4 left-4 z-10 bg-warning text-warning-foreground px-4 py-2 rounded-full text-xs font-semibold shadow-md flex items-center gap-2">
            <Icon name="Clock" size={14} />
            Ending Soon
          </div>
        )}

        <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
          <Image
            src={offer?.image}
            alt={offer?.imageAlt}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-primary-foreground text-xs font-medium">{offer?.category}</span>
              </div>
              {offer?.targetAudience && (
                <div className="bg-secondary/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-secondary-foreground text-xs font-medium">{offer?.targetAudience}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            {offer?.title}
          </h3>

          <p className="text-muted-foreground text-sm md:text-base mb-4 line-clamp-2">
            {offer?.description}
          </p>

          <div className="flex items-baseline gap-3 mb-4">
            {offer?.originalPrice && (
              <span className="text-muted-foreground text-lg line-through">
                ₹{offer?.originalPrice}
              </span>
            )}
            <span className="text-primary text-3xl md:text-4xl font-bold">
              ₹{offer?.discountedPrice}
            </span>
            {offer?.discount && (
              <span className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-semibold">
                {offer?.discount}% OFF
              </span>
            )}
          </div>

          {offer?.features && offer?.features?.length > 0 && (
            <div className="space-y-2 mb-6">
              {offer?.features?.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Icon name="Check" size={18} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-border pt-4 mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Valid Until:</span>
              <span className="text-foreground font-medium">{offer?.expiryDate}</span>
            </div>
            {offer?.promoCode && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Promo Code:</span>
                <div className="flex items-center gap-2">
                  <code className="bg-muted px-3 py-1 rounded-lg font-mono text-primary font-semibold">
                    {offer?.promoCode}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(offer?.promoCode);
                    }}
                    className="p-1 hover:bg-muted rounded transition-colors"
                    aria-label="Copy promo code"
                  >
                    <Icon name="Copy" size={16} color="var(--color-muted-foreground)" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {offer?.terms && (
            <div className="bg-muted/50 rounded-lg p-3 mb-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold">Terms:</span> {offer?.terms}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant={isExpired() ? "outline" : "default"}
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
              onClick={() => onWhatsAppClick(offer)}
              fullWidth
              disabled={isExpired()}
              className="flex-1"
            >
              {isExpired() ? 'Offer Expired' : 'Claim via WhatsApp'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Share2"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: offer?.title,
                    text: offer?.description,
                    url: window.location?.href
                  });
                }
              }}
              className="sm:w-auto"
            >
              Share
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OfferCard;