import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterBar = ({ 
  selectedCategory, 
  onCategoryChange, 
  viewMode, 
  onViewModeChange, 
  totalResults,
  isLoading 
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'indoor', label: 'Indoor Plants' },
    { value: 'outdoor', label: 'Outdoor Plants' },
    { value: 'succulent', label: 'Succulents' },
    { value: 'air-purifying', label: 'Air Purifying' },
    { value: 'home-decor', label: 'Home Decor' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="w-full sm:w-64">
            <Select
              label="Filter by Category"
              options={categoryOptions}
              value={selectedCategory}
              onChange={onCategoryChange}
              placeholder="Select category..."
              className="w-full"
            />
          </div>
          
          <div className="flex items-end">
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={16}
              onClick={() => onCategoryChange('all')}
              disabled={selectedCategory === 'all' || isLoading}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results Count and View Toggle */}
        <div className="flex items-center justify-between lg:justify-end gap-4">
          <div className="text-sm font-body text-muted-foreground">
            {isLoading ? (
              <div className="flex items-center">
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Loading...
              </div>
            ) : (
              <span>
                {totalResults} {totalResults === 1 ? 'plant' : 'plants'} found
              </span>
            )}
          </div>
          
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              iconName="Grid3X3"
              onClick={() => onViewModeChange('grid')}
              className="px-3"
              disabled={isLoading}
            />
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              iconName="List"
              onClick={() => onViewModeChange('list')}
              className="px-3"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;