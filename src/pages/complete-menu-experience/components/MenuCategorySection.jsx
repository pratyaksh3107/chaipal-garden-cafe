import React from 'react';
import MenuItemCard from './MenuItemCard';

const MenuCategorySection = ({ category, items, onWhatsAppOrder }) => {
  if (items?.length === 0) return null;

  return (
    <div className="mb-10 md:mb-12 lg:mb-16">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 md:mb-8 lg:mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
          {category}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {items?.map((item) => (
            <MenuItemCard key={item?.id} item={item} onWhatsAppOrder={onWhatsAppOrder} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuCategorySection;