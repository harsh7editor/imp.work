import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentSearches = ({ recentSearches, onSearchSelect, onClearRecent }) => {
  if (!recentSearches || recentSearches?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-foreground flex items-center gap-2">
            <Icon name="Clock" size={16} />
            Recent Searches
          </h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            iconSize={14}
            onClick={onClearRecent}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {recentSearches?.slice(0, 6)?.map((search, index) => (
            <button
              key={index}
              onClick={() => onSearchSelect(search?.query)}
              className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full text-sm transition-colors duration-200 group"
            >
              <Icon name="Search" size={12} />
              <span>{search?.query}</span>
              <span className="text-xs opacity-60">({search?.count})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentSearches;