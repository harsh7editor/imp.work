import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = ({ viewMode = 'grid' }) => {
  const SkeletonCard = ({ isListView = false }) => (
    <div className={`bg-card border border-border rounded-lg overflow-hidden animate-pulse ${
      isListView ? 'p-4' : ''
    }`}>
      {isListView ? (
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-muted rounded-lg"></div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="h-6 bg-muted rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-muted rounded mb-2 w-full"></div>
                <div className="h-4 bg-muted rounded mb-3 w-2/3"></div>
                <div className="flex gap-2 mb-3">
                  <div className="h-6 bg-muted rounded-full w-16"></div>
                  <div className="h-6 bg-muted rounded-full w-20"></div>
                </div>
                <div className="h-4 bg-muted rounded w-24"></div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="h-6 bg-muted rounded w-16"></div>
                <div className="h-8 bg-muted rounded w-24"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="aspect-square bg-muted"></div>
          <div className="p-4">
            <div className="h-5 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded mb-3 w-3/4"></div>
            <div className="flex gap-2 mb-3">
              <div className="h-5 bg-muted rounded-full w-12"></div>
              <div className="h-5 bg-muted rounded-full w-16"></div>
            </div>
            <div className="flex justify-between items-center mb-3">
              <div className="h-6 bg-muted rounded w-16"></div>
              <div className="h-4 bg-muted rounded w-12"></div>
            </div>
            <div className="h-8 bg-muted rounded"></div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="px-4 lg:px-6 py-8">
      {/* Loading Header */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-3">
          <div className="animate-spin">
            <Icon name="Loader2" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Searching plants...</h2>
            <p className="text-sm text-muted-foreground">Finding the best matches for you</p>
          </div>
        </div>
      </div>
      {/* Loading Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" :"space-y-4"
      }>
        {Array.from({ length: viewMode === 'grid' ? 8 : 6 })?.map((_, index) => (
          <SkeletonCard key={index} isListView={viewMode === 'list'} />
        ))}
      </div>
      {/* Loading Progress Indicator */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span>Loading results...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;