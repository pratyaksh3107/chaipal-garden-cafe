import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const MenuFilters = ({ 
  priceRange, 
  onPriceRangeChange, 
  dietaryFilters, 
  onDietaryFilterChange,
  mealType,
  onMealTypeChange 
}) => {
  const priceRangeOptions = [
    { value: 'all', label: 'All Prices' },
    { value: '0-100', label: 'Under ₹100' },
    { value: '100-200', label: '₹100 - ₹200' },
    { value: '200-300', label: '₹200 - ₹300' },
    { value: '300+', label: 'Above ₹300' }
  ];

  const mealTypeOptions = [
    { value: 'all', label: 'All Meals' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'snacks', label: 'Snacks' },
    { value: 'dinner', label: 'Dinner' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-6 md:mb-8 lg:mb-10">
      <div className="bg-white/75 backdrop-blur-md rounded-[18px] md:rounded-[20px] lg:rounded-[24px] shadow-lg p-4 md:p-6 lg:p-8">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-4 md:mb-5 lg:mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Filter Menu
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          <div>
            <Select
              label="Price Range"
              options={priceRangeOptions}
              value={priceRange}
              onChange={onPriceRangeChange}
            />
          </div>

          <div>
            <Select
              label="Meal Type"
              options={mealTypeOptions}
              value={mealType}
              onChange={onMealTypeChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2 md:mb-3">
              Dietary Preferences
            </label>
            <div className="space-y-2 md:space-y-3">
              <Checkbox
                label="Vegetarian"
                checked={dietaryFilters?.vegetarian}
                onChange={(e) => onDietaryFilterChange('vegetarian', e?.target?.checked)}
              />
              <Checkbox
                label="Vegan"
                checked={dietaryFilters?.vegan}
                onChange={(e) => onDietaryFilterChange('vegan', e?.target?.checked)}
              />
              <Checkbox
                label="Gluten-Free"
                checked={dietaryFilters?.glutenFree}
                onChange={(e) => onDietaryFilterChange('glutenFree', e?.target?.checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuFilters;
