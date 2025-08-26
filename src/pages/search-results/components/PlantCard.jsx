import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PlantCard = ({ plant, viewMode = 'grid', searchQuery = '' }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/plant-detail-view', { state: { plant } });
  };

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text?.split(regex);
    
    return parts?.map((part, index) => 
      regex?.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'text-destructive', icon: 'XCircle' };
    if (stock <= 5) return { label: 'Low Stock', color: 'text-warning', icon: 'AlertTriangle' };
    return { label: 'In Stock', color: 'text-success', icon: 'CheckCircle' };
  };

  const stockStatus = getStockStatus(plant?.stock);

  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
        <div className="flex gap-4">
          {/* Image */}
          <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-lg">
            <Image
              src={plant?.image}
              alt={plant?.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-lg mb-1 truncate">
                  {highlightSearchTerm(plant?.name, searchQuery)}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {plant?.description}
                </p>
                
                {/* Categories */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {plant?.categories?.slice(0, 3)?.map((category, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                  {plant?.categories?.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      +{plant?.categories?.length - 3} more
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-1 mb-2">
                  <Icon name={stockStatus?.icon} size={14} className={stockStatus?.color} />
                  <span className={`text-xs font-medium ${stockStatus?.color}`}>
                    {stockStatus?.label}
                  </span>
                  {plant?.stock > 0 && (
                    <span className="text-xs text-muted-foreground ml-1">
                      ({plant?.stock} available)
                    </span>
                  )}
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex flex-col items-end gap-2">
                <div className="text-right">
                  <div className="text-xl font-bold text-foreground">
                    ${plant?.price?.toFixed(2)}
                  </div>
                  {plant?.originalPrice && plant?.originalPrice > plant?.price && (
                    <div className="text-sm text-muted-foreground line-through">
                      ${plant?.originalPrice?.toFixed(2)}
                    </div>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  iconPosition="left"
                  onClick={handleViewDetails}
                  className="whitespace-nowrap"
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

  // Grid view
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 group">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={plant?.image}
          alt={plant?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Stock Badge */}
        <div className="absolute top-2 right-2">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-card/90 backdrop-blur-sm ${stockStatus?.color}`}>
            <Icon name={stockStatus?.icon} size={12} />
            <span>{stockStatus?.label}</span>
          </div>
        </div>

        {/* Sale Badge */}
        {plant?.originalPrice && plant?.originalPrice > plant?.price && (
          <div className="absolute top-2 left-2">
            <div className="bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-medium">
              Sale
            </div>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1 truncate">
          {highlightSearchTerm(plant?.name, searchQuery)}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {plant?.description}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-1 mb-3">
          {plant?.categories?.slice(0, 2)?.map((category, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
            >
              {category}
            </span>
          ))}
          {plant?.categories?.length > 2 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              +{plant?.categories?.length - 2}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-lg font-bold text-foreground">
              ${plant?.price?.toFixed(2)}
            </div>
            {plant?.originalPrice && plant?.originalPrice > plant?.price && (
              <div className="text-sm text-muted-foreground line-through">
                ${plant?.originalPrice?.toFixed(2)}
              </div>
            )}
          </div>
          {plant?.stock > 0 && (
            <span className="text-xs text-muted-foreground">
              {plant?.stock} available
            </span>
          )}
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={handleViewDetails}
          fullWidth
          disabled={plant?.stock === 0}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default PlantCard;