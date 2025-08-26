import React from 'react';

const LoadingSkeleton = ({ viewMode = 'grid' }) => {
  const skeletonCount = 12;

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: skeletonCount })?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 animate-pulse">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-32 h-32 bg-muted rounded-lg flex-shrink-0"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-muted rounded-full w-16"></div>
                  <div className="h-6 bg-muted rounded-full w-20"></div>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:items-end">
                <div className="h-6 bg-muted rounded w-20"></div>
                <div className="h-6 bg-muted rounded-full w-16"></div>
                <div className="h-8 bg-muted rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: skeletonCount })?.map((_, index) => (
        <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
          <div className="aspect-square bg-muted"></div>
          <div className="p-4 space-y-3">
            <div className="h-6 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-muted rounded-full w-16"></div>
              <div className="h-6 bg-muted rounded-full w-20"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-6 bg-muted rounded w-20"></div>
              <div className="h-8 bg-muted rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;