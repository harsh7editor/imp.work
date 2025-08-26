import React from 'react';
import Icon from '../../../components/AppIcon';


const PlantInfo = ({ plant = {} }) => {
  const {
    name = 'Unknown Plant',
    price = 0,
    categories = [],
    stockStatus = 'out-of-stock',
    stockCount = 0,
    description = '',
    scientificName = '',
    difficulty = 'Medium',
    size = 'Medium',
    lightRequirement = 'Bright indirect light',
    wateringFrequency = 'Weekly',
    humidity = 'Medium',
    temperature = '65-75°F',
    petSafe = false,
    airPurifying = false
  } = plant;

  const getStockStatusInfo = () => {
    switch (stockStatus) {
      case 'in-stock':
        return {
          text: `In Stock (${stockCount} available)`,
          icon: 'CheckCircle',
          className: 'text-success bg-success/10'
        };
      case 'low-stock':
        return {
          text: `Low Stock (${stockCount} remaining)`,
          icon: 'AlertTriangle',
          className: 'text-warning bg-warning/10'
        };
      case 'out-of-stock':
        return {
          text: 'Out of Stock',
          icon: 'XCircle',
          className: 'text-destructive bg-destructive/10'
        };
      default:
        return {
          text: 'Stock Unknown',
          icon: 'HelpCircle',
          className: 'text-muted-foreground bg-muted'
        };
    }
  };

  const stockInfo = getStockStatusInfo();

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy':
        return 'text-success bg-success/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'hard':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
            {name}
          </h1>
          {scientificName && (
            <p className="text-lg font-body italic text-muted-foreground">
              {scientificName}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="text-3xl font-heading font-bold text-primary">
            ${price?.toFixed(2)}
          </div>
          
          <div className={`flex items-center px-3 py-2 rounded-full text-sm font-body ${stockInfo?.className}`}>
            <Icon name={stockInfo?.icon} size={16} className="mr-2" />
            {stockInfo?.text}
          </div>
        </div>
      </div>
      {/* Categories */}
      {categories?.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-body font-medium text-muted-foreground uppercase tracking-wide">
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories?.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-body"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Special Features */}
      <div className="flex flex-wrap gap-3">
        {petSafe && (
          <div className="flex items-center px-3 py-2 bg-success/10 text-success rounded-lg text-sm font-body">
            <Icon name="Heart" size={16} className="mr-2" />
            Pet Safe
          </div>
        )}
        {airPurifying && (
          <div className="flex items-center px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-body">
            <Icon name="Wind" size={16} className="mr-2" />
            Air Purifying
          </div>
        )}
        <div className={`flex items-center px-3 py-2 rounded-lg text-sm font-body ${getDifficultyColor(difficulty)}`}>
          <Icon name="Target" size={16} className="mr-2" />
          {difficulty} Care
        </div>
      </div>
      {/* Description */}
      {description && (
        <div className="space-y-2">
          <h3 className="text-lg font-heading font-medium text-foreground">
            Description
          </h3>
          <p className="text-foreground font-body leading-relaxed">
            {description}
          </p>
        </div>
      )}
      {/* Care Information Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-medium text-foreground">
          Care Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
            <Icon name="Sun" size={20} className="text-warning mt-0.5" />
            <div>
              <h4 className="font-body font-medium text-foreground">Light</h4>
              <p className="text-sm text-muted-foreground">{lightRequirement}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
            <Icon name="Droplets" size={20} className="text-primary mt-0.5" />
            <div>
              <h4 className="font-body font-medium text-foreground">Watering</h4>
              <p className="text-sm text-muted-foreground">{wateringFrequency}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
            <Icon name="Thermometer" size={20} className="text-destructive mt-0.5" />
            <div>
              <h4 className="font-body font-medium text-foreground">Temperature</h4>
              <p className="text-sm text-muted-foreground">{temperature}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
            <Icon name="Cloud" size={20} className="text-secondary mt-0.5" />
            <div>
              <h4 className="font-body font-medium text-foreground">Humidity</h4>
              <p className="text-sm text-muted-foreground">{humidity}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
            <Icon name="Ruler" size={20} className="text-accent mt-0.5" />
            <div>
              <h4 className="font-body font-medium text-foreground">Size</h4>
              <p className="text-sm text-muted-foreground">{size}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantInfo;