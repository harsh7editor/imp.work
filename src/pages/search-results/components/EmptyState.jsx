import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ searchQuery, onClearSearch, onCategorySelect }) => {
  const navigate = useNavigate();

  const popularCategories = [
    { id: 'indoor', label: 'Indoor Plants', icon: 'Home' },
    { id: 'succulent', label: 'Succulents', icon: 'Flower' },
    { id: 'air-purifying', label: 'Air Purifying', icon: 'Wind' },
    { id: 'flowering', label: 'Flowering Plants', icon: 'Flower2' },
    { id: 'herbs', label: 'Herbs & Edibles', icon: 'Leaf' },
    { id: 'home-decor', label: 'Home Decor', icon: 'Palette' }
  ];

  const searchSuggestions = [
    "Try searching for \'snake plant\' or \'monstera'",
    "Check your spelling and try again",
    "Use more general terms like 'indoor' or 'flowering'",
    "Browse our popular categories below"
  ];

  const handleBrowseAll = () => {
    navigate('/plant-catalog-browse');
  };

  const handleCategoryClick = (categoryId) => {
    onCategorySelect(categoryId);
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="max-w-md text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
            <Icon name="Search" size={32} className="text-muted-foreground" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          {searchQuery ? 'No plants found' : 'Start your search'}
        </h2>

        {/* Description */}
        <p className="text-muted-foreground mb-6">
          {searchQuery 
            ? `We couldn't find any plants matching "${searchQuery}". Try adjusting your search or browse our categories.`
            : 'Enter a plant name or browse our categories to discover your perfect green companion.'
          }
        </p>

        {/* Search Suggestions */}
        {searchQuery && (
          <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-medium text-foreground mb-2">Search Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              {searchSuggestions?.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Icon name="Lightbulb" size={14} className="mt-0.5 flex-shrink-0" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {searchQuery && (
            <Button
              variant="outline"
              iconName="X"
              iconPosition="left"
              onClick={onClearSearch}
            >
              Clear Search
            </Button>
          )}
          <Button
            variant="default"
            iconName="Grid3X3"
            iconPosition="left"
            onClick={handleBrowseAll}
          >
            Browse All Plants
          </Button>
        </div>

        {/* Popular Categories */}
        <div>
          <h3 className="font-medium text-foreground mb-4">Popular Categories</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {popularCategories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => handleCategoryClick(category?.id)}
                className="flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-200 hover:border-primary/50 group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                  <Icon name={category?.icon} size={20} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                  {category?.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon name="HelpCircle" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <h4 className="font-medium text-foreground mb-1">Need Help?</h4>
              <p className="text-sm text-muted-foreground">
                Can't find what you're looking for? Our plant experts are here to help you find the perfect plants for your space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;