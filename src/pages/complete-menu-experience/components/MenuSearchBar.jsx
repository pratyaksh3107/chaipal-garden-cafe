import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const MenuSearchBar = ({ searchQuery, onSearchChange, activeCategory, onCategoryChange, categories }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-8 md:mb-10 lg:mb-12">
      <div className="bg-white/75 backdrop-blur-md rounded-[18px] md:rounded-[20px] lg:rounded-[24px] shadow-lg p-4 md:p-6 lg:p-8">
        <div className="mb-4 md:mb-5 lg:mb-6">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search for chai, snacks, meals..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="w-full"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon name="Search" size={20} color="var(--color-muted-foreground)" />
            </div>
          </div>
        </div>

        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => onCategoryChange('all')}
            className={`flex-shrink-0 px-4 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-200 ${
              activeCategory === 'all' ?'bg-primary text-primary-foreground shadow-md' :'bg-muted text-muted-foreground hover:bg-primary/10'
            }`}
          >
            All Items
          </button>
          {categories?.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`flex-shrink-0 px-4 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-primary/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSearchBar;