import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCards = ({ plants }) => {
  const totalPlants = plants?.length;
  const inStockPlants = plants?.filter(plant => plant?.inStock)?.length;
  const outOfStockPlants = totalPlants - inStockPlants;
  const totalValue = plants?.reduce((sum, plant) => sum + parseFloat(plant?.price), 0);

  const stats = [
    {
      title: 'Total Plants',
      value: totalPlants,
      icon: 'Leaf',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'In Stock',
      value: inStockPlants,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Out of Stock',
      value: outOfStockPlants,
      icon: 'XCircle',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    },
    {
      title: 'Total Value',
      value: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })?.format(totalValue),
      icon: 'DollarSign',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {stat?.title}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {stat?.value}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${stat?.bgColor}`}>
              <Icon
                name={stat?.icon}
                size={24}
                className={stat?.color}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;