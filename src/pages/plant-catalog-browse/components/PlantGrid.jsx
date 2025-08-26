import React from 'react';
import PlantCard from './PlantCard';
import LoadingSkeleton from './LoadingSkeleton';
import EmptyState from './EmptyState';

const PlantGrid = ({ plants, viewMode, isLoading, searchQuery, selectedCategory }) => {
  if (isLoading) {
    return <LoadingSkeleton viewMode={viewMode} />;
  }

  if (plants?.length === 0) {
    return <EmptyState searchQuery={searchQuery} selectedCategory={selectedCategory} onClearFilters={() => {}} />;
  }

  const gridClasses = viewMode === 'grid' ?'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' :'space-y-4';

  return (
    <div className={gridClasses}>
      {plants?.map((plant) => (
        <PlantCard
          key={plant?.id}
          plant={plant}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default PlantGrid;