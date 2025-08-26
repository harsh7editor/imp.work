import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  appliedFilters, 
  onFilterChange, 
  onClearAllFilters,
  isExpanded,
  onToggleExpanded 
}) => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const categories = [
    { id: 'indoor', label: 'Indoor Plants', count: 24 },
    { id: 'outdoor', label: 'Outdoor Plants', count: 18 },
    { id: 'succulent', label: 'Succulents', count: 15 },
    { id: 'air-purifying', label: 'Air Purifying', count: 12 },
    { id: 'home-decor', label: 'Home Decor', count: 20 },
    { id: 'flowering', label: 'Flowering Plants', count: 16 },
    { id: 'herbs', label: 'Herbs & Edibles', count: 8 }
  ];

  const availability = [
    { id: 'in-stock', label: 'In Stock', count: 45 },
    { id: 'low-stock', label: 'Low Stock', count: 8 },
    { id: 'pre-order', label: 'Pre-order', count: 3 }
  ];

  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = checked 
      ? [...(appliedFilters?.categories || []), categoryId]
      : (appliedFilters?.categories || [])?.filter(id => id !== categoryId);
    
    onFilterChange({ ...appliedFilters, categories: newCategories });
  };

  const handleAvailabilityChange = (availabilityId, checked) => {
    const newAvailability = checked 
      ? [...(appliedFilters?.availability || []), availabilityId]
      : (appliedFilters?.availability || [])?.filter(id => id !== availabilityId);
    
    onFilterChange({ ...appliedFilters, availability: newAvailability });
  };

  const handlePriceRangeApply = () => {
    if (priceRange?.min || priceRange?.max) {
      onFilterChange({ 
        ...appliedFilters, 
        priceRange: { 
          min: parseFloat(priceRange?.min) || 0, 
          max: parseFloat(priceRange?.max) || 1000 
        } 
      });
    }
  };

  const removeFilter = (filterType, value) => {
    if (filterType === 'categories') {
      const newCategories = appliedFilters?.categories?.filter(cat => cat !== value);
      onFilterChange({ ...appliedFilters, categories: newCategories });
    } else if (filterType === 'availability') {
      const newAvailability = appliedFilters?.availability?.filter(avail => avail !== value);
      onFilterChange({ ...appliedFilters, availability: newAvailability });
    } else if (filterType === 'priceRange') {
      const newFilters = { ...appliedFilters };
      delete newFilters?.priceRange;
      onFilterChange(newFilters);
      setPriceRange({ min: '', max: '' });
    }
  };

  const hasActiveFilters = (appliedFilters?.categories?.length > 0) || 
                          (appliedFilters?.availability?.length > 0) || 
                          appliedFilters?.priceRange;

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 lg:px-6 py-4">
        {/* Applied Filters */}
        {hasActiveFilters && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Active Filters:</span>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                iconPosition="left"
                iconSize={14}
                onClick={onClearAllFilters}
                className="text-xs text-destructive hover:text-destructive"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {appliedFilters?.categories?.map(categoryId => {
                const category = categories?.find(cat => cat?.id === categoryId);
                return (
                  <div key={categoryId} className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                    <span>{category?.label}</span>
                    <button
                      onClick={() => removeFilter('categories', categoryId)}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </div>
                );
              })}
              {appliedFilters?.availability?.map(availId => {
                const avail = availability?.find(av => av?.id === availId);
                return (
                  <div key={availId} className="flex items-center gap-1 bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs">
                    <span>{avail?.label}</span>
                    <button
                      onClick={() => removeFilter('availability', availId)}
                      className="hover:bg-secondary/20 rounded-full p-0.5"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </div>
                );
              })}
              {appliedFilters?.priceRange && (
                <div className="flex items-center gap-1 bg-accent/10 text-accent px-2 py-1 rounded-full text-xs">
                  <span>${appliedFilters?.priceRange?.min} - ${appliedFilters?.priceRange?.max}</span>
                  <button
                    onClick={() => removeFilter('priceRange')}
                    className="hover:bg-accent/20 rounded-full p-0.5"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="left"
            onClick={onToggleExpanded}
            className="font-medium"
          >
            {isExpanded ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <span className="text-xs text-muted-foreground">
            {hasActiveFilters ? `${(appliedFilters?.categories?.length || 0) + (appliedFilters?.availability?.length || 0) + (appliedFilters?.priceRange ? 1 : 0)} active` : 'No filters applied'}
          </span>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border animate-slide-down">
            {/* Categories */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Categories</h3>
              <div className="space-y-2">
                {categories?.map(category => (
                  <Checkbox
                    key={category?.id}
                    label={
                      <div className="flex items-center justify-between w-full">
                        <span>{category?.label}</span>
                        <span className="text-xs text-muted-foreground">({category?.count})</span>
                      </div>
                    }
                    checked={appliedFilters?.categories?.includes(category?.id) || false}
                    onChange={(e) => handleCategoryChange(category?.id, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Availability</h3>
              <div className="space-y-2">
                {availability?.map(avail => (
                  <Checkbox
                    key={avail?.id}
                    label={
                      <div className="flex items-center justify-between w-full">
                        <span>{avail?.label}</span>
                        <span className="text-xs text-muted-foreground">({avail?.count})</span>
                      </div>
                    }
                    checked={appliedFilters?.availability?.includes(avail?.id) || false}
                    onChange={(e) => handleAvailabilityChange(avail?.id, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Price Range</h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange?.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e?.target?.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange?.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e?.target?.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePriceRangeApply}
                  disabled={!priceRange?.min && !priceRange?.max}
                  className="w-full"
                >
                  Apply Price Filter
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;