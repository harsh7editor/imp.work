import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlantCard = ({ plant, viewMode = 'grid' }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/plant-detail-view', { state: { plantId: plant?.id } });
  };

  const getStockStatus = (stock) => {
    if (stock > 10) return { label: 'In Stock', color: 'text-success', bgColor: 'bg-success/10' };
    if (stock > 0) return { label: 'Low Stock', color: 'text-warning', bgColor: 'bg-warning/10' };
    return { label: 'Out of Stock', color: 'text-destructive', bgColor: 'bg-destructive/10' };
  };

  const stockStatus = getStockStatus(plant?.stock);

  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-all duration-200 animate-fade-in">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={plant?.image}
              alt={plant?.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-heading font-semibold text-foreground truncate">
                  {plant?.name}
                </h3>
                <p className="text-sm font-body text-muted-foreground mt-1 line-clamp-2">
                  {plant?.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {plant?.categories?.map((category, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-caption bg-secondary/10 text-secondary border border-secondary/20"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:items-end gap-2">
                <div className="text-right">
                  <p className="text-xl font-heading font-bold text-primary">
                    ${plant?.price?.toFixed(2)}
                  </p>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption ${stockStatus?.bgColor} ${stockStatus?.color}`}>
                    <Icon name="Package" size={12} className="mr-1" />
                    {stockStatus?.label}
                  </div>
                </div>
                
                <Button
                  variant="default"
                  size="sm"
                  iconName="Eye"
                  iconPosition="left"
                  iconSize={16}
                  onClick={handleViewDetails}
                  disabled={plant?.stock === 0}
                  className="w-full sm:w-auto"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-all duration-200 animate-fade-in group">
      <div className="relative overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <Image
            src={plant?.image}
            alt={plant?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className={`absolute top-2 right-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-caption ${stockStatus?.bgColor} ${stockStatus?.color} backdrop-blur-sm`}>
          <Icon name="Package" size={12} className="mr-1" />
          {stockStatus?.label}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-heading font-semibold text-foreground truncate mb-2">
          {plant?.name}
        </h3>
        
        <p className="text-sm font-body text-muted-foreground mb-3 line-clamp-2">
          {plant?.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {plant?.categories?.slice(0, 2)?.map((category, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-caption bg-secondary/10 text-secondary border border-secondary/20"
            >
              {category}
            </span>
          ))}
          {plant?.categories?.length > 2 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-caption bg-muted text-muted-foreground">
              +{plant?.categories?.length - 2}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-xl font-heading font-bold text-primary">
            ${plant?.price?.toFixed(2)}
          </p>
          
          <Button
            variant="default"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            iconSize={16}
            onClick={handleViewDetails}
            disabled={plant?.stock === 0}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;