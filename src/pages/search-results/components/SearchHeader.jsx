import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchHeader = ({ 
  searchQuery, 
  resultCount, 
  onClearSearch, 
  sortBy, 
  onSortChange,
  viewMode,
  onViewModeChange 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: 'Target' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'TrendingUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'TrendingDown' },
    { value: 'alphabetical', label: 'Alphabetical', icon: 'AlphabeticalSort' },
    { value: 'stock', label: 'In Stock First', icon: 'Package' }
  ];

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 lg:px-6 py-4">
        {/* Search Query Display */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Icon name="Search" size={20} className="text-muted-foreground" />
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                Search Results
                {searchQuery && (
                  <span className="text-primary ml-2">
                    for "{searchQuery}"
                  </span>
                )}
              </h1>
              <p className="text-sm text-muted-foreground">
                {resultCount} {resultCount === 1 ? 'plant' : 'plants'} found
              </p>
            </div>
          </div>
          
          {searchQuery && (
            <Button
              variant="outline"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={onClearSearch}
              className="self-start sm:self-auto"
            >
              Clear Search
            </Button>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Sort by:</span>
            <div className="flex flex-wrap gap-1">
              {sortOptions?.map((option) => (
                <Button
                  key={option?.value}
                  variant={sortBy === option?.value ? "default" : "ghost"}
                  size="sm"
                  iconName={option?.icon}
                  iconPosition="left"
                  iconSize={14}
                  onClick={() => onSortChange(option?.value)}
                  className="text-xs"
                >
                  {option?.label}
                </Button>
              ))}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? "default" : "ghost"}
              size="sm"
              iconName="Grid3X3"
              onClick={() => onViewModeChange('grid')}
              className="px-3"
            />
            <Button
              variant={viewMode === 'list' ? "default" : "ghost"}
              size="sm"
              iconName="List"
              onClick={() => onViewModeChange('list')}
              className="px-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;