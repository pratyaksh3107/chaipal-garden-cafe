import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MenuItemCard = ({ item, onWhatsAppOrder }) => {
  const handleOrder = () => {
    const message = `Hi! I would like to order:\n\n${item?.name}\nPrice: ₹${item?.price}\n\nPlease confirm availability.`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onWhatsAppOrder(item);
  };

  return (
    <div className="bg-white/75 backdrop-blur-md rounded-[18px] md:rounded-[20px] lg:rounded-[24px] shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
        <Image
          src={item?.image}
          alt={item?.imageAlt}
          className="w-full h-full object-cover"
        />
        {item?.isPopular && (
          <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-accent text-accent-foreground px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-semibold flex items-center gap-1 md:gap-1.5 shadow-md">
            <Icon name="TrendingUp" size={14} />
            Popular
          </div>
        )}
        {item?.isVeg !== undefined && (
          <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-white/90 backdrop-blur-sm p-1 md:p-1.5 rounded">
            <div className={`w-3 h-3 md:w-4 md:h-4 border-2 ${item?.isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center`}>
              <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${item?.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 md:p-5 lg:p-6">
        <div className="mb-2 md:mb-3">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-1 md:mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {item?.name}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
            {item?.description}
          </p>
        </div>

        {item?.dietaryInfo && item?.dietaryInfo?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
            {item?.dietaryInfo?.map((info, index) => (
              <span
                key={index}
                className="px-2 md:px-2.5 py-0.5 md:py-1 bg-muted text-muted-foreground text-xs md:text-sm rounded-full"
              >
                {info}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="flex items-baseline gap-1 md:gap-2">
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
              ₹{item?.price}
            </span>
            {item?.originalPrice && (
              <span className="text-sm md:text-base text-muted-foreground line-through">
                ₹{item?.originalPrice}
              </span>
            )}
          </div>
          {item?.rating && (
            <div className="flex items-center gap-1">
              <Icon name="Star" size={16} color="#D4AF37" fill="#D4AF37" />
              <span className="text-sm md:text-base font-semibold text-foreground">{item?.rating}</span>
            </div>
          )}
        </div>

        <Button
          variant="default"
          size="default"
          iconName="MessageCircle"
          iconPosition="left"
          onClick={handleOrder}
          fullWidth
        >
          Order via WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default MenuItemCard;