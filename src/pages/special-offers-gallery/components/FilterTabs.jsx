import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FilterTabs = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex items-center justify-center mb-8 md:mb-12">
      <div className="inline-flex bg-white/75 backdrop-blur-md rounded-[18px] p-2 shadow-lg overflow-x-auto">
        <div className="flex gap-2">
          {categories?.map((category) => (
            <motion.button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`relative px-4 md:px-6 py-3 rounded-[14px] text-sm md:text-base font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                activeCategory === category?.id
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeCategory === category?.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-[14px] shadow-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon name={category?.icon} size={18} />
                {category?.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterTabs;