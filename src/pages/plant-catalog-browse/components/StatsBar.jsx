import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsBar = ({ totalPlants, inStockPlants, categories, isLoading }) => {
  const stats = [
    {
      icon: 'Leaf',
      label: 'Total Plants',
      value: totalPlants,
      color: 'text-primary'
    },
    {
      icon: 'Package',
      label: 'In Stock',
      value: inStockPlants,
      color: 'text-success'
    },
    {
      icon: 'Grid3X3',
      label: 'Categories',
      value: categories,
      color: 'text-secondary'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats?.map((stat, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${stat?.color}`}>
              <Icon name={stat?.icon} size={20} />
            </div>
            <div>
              <p className="text-sm font-caption text-muted-foreground">
                {stat?.label}
              </p>
              <p className="text-lg font-heading font-semibold text-foreground">
                {isLoading ? (
                  <span className="inline-block w-8 h-5 bg-muted rounded animate-pulse"></span>
                ) : (
                  stat?.value
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;