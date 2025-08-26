import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ searchQuery, selectedCategory, onClearFilters }) => {
  const hasFilters = searchQuery || (selectedCategory && selectedCategory !== 'all');

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="Search" size={48} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
        {hasFilters ? 'No plants found' : 'No plants available'}
      </h3>
      <p className="text-muted-foreground font-body mb-6 max-w-md">
        {hasFilters ? (
          <>
            We couldn't find any plants matching your current filters.
            {searchQuery && (
              <span className="block mt-1">
                Search term: <span className="font-medium">"{searchQuery}"</span>
              </span>
            )}
            {selectedCategory && selectedCategory !== 'all' && (
              <span className="block mt-1">
                Category: <span className="font-medium">{selectedCategory}</span>
              </span>
            )}
          </>
        ) : (
          'It looks like there are no plants in the catalog at the moment. Please check back later.'
        )}
      </p>
      {hasFilters && (
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
            onClick={onClearFilters}
          >
            Clear All Filters
          </Button>
          
          <Button
            variant="default"
            iconName="Search"
            iconPosition="left"
            iconSize={16}
            onClick={() => window.location?.reload()}
          >
            Browse All Plants
          </Button>
        </div>
      )}
      {!hasFilters && (
        <Button
          variant="default"
          iconName="RefreshCw"
          iconPosition="left"
          iconSize={16}
          onClick={() => window.location?.reload()}
        >
          Refresh Page
        </Button>
      )}
    </div>
  );
};

export default EmptyState;