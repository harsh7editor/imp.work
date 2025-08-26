import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';

import Button from '../../../components/ui/Button';

const RelatedPlants = ({ currentPlantId = null, category = '' }) => {
  const navigate = useNavigate();

  // Mock related plants data
  const relatedPlants = [
    {
      id: 2,
      name: "Snake Plant",
      scientificName: "Sansevieria trifasciata",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop",
      categories: ["Indoor", "Air Purifying"],
      stockStatus: "in-stock",
      difficulty: "Easy"
    },
    {
      id: 3,
      name: "Fiddle Leaf Fig",
      scientificName: "Ficus lyrata",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1586093248292-4e6636b4e3b8?w=400&h=400&fit=crop",
      categories: ["Indoor", "Home Decor"],
      stockStatus: "low-stock",
      difficulty: "Medium"
    },
    {
      id: 4,
      name: "Peace Lily",
      scientificName: "Spathiphyllum",
      price: 32.99,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      categories: ["Indoor", "Air Purifying"],
      stockStatus: "in-stock",
      difficulty: "Easy"
    },
    {
      id: 5,
      name: "Rubber Plant",
      scientificName: "Ficus elastica",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1509423350716-97f2360af2e4?w=400&h=400&fit=crop",
      categories: ["Indoor", "Home Decor"],
      stockStatus: "in-stock",
      difficulty: "Easy"
    },
    {
      id: 6,
      name: "ZZ Plant",
      scientificName: "Zamioculcas zamiifolia",
      price: 28.99,
      image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400&h=400&fit=crop",
      categories: ["Indoor", "Air Purifying"],
      stockStatus: "in-stock",
      difficulty: "Easy"
    },
    {
      id: 7,
      name: "Aloe Vera",
      scientificName: "Aloe barbadensis",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1509423350716-97f2360af2e4?w=400&h=400&fit=crop",
      categories: ["Succulent", "Air Purifying"],
      stockStatus: "in-stock",
      difficulty: "Easy"
    }
  ]?.filter(plant => plant?.id !== currentPlantId);

  const handlePlantClick = (plantId) => {
    // In a real app, you would navigate to the specific plant detail
    // For now, we'll just reload the current page with new mock data
    navigate(`/plant-detail-view?id=${plantId}`);
  };

  const handleViewAllClick = () => {
    navigate('/plant-catalog-browse');
  };

  const getStockStatusInfo = (status) => {
    switch (status) {
      case 'in-stock':
        return { text: 'In Stock', className: 'text-success' };
      case 'low-stock':
        return { text: 'Low Stock', className: 'text-warning' };
      case 'out-of-stock':
        return { text: 'Out of Stock', className: 'text-destructive' };
      default:
        return { text: 'Unknown', className: 'text-muted-foreground' };
    }
  };

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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-semibold text-foreground">
          Related Plants
        </h2>
        <Button
          variant="outline"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={handleViewAllClick}
        >
          View All
        </Button>
      </div>
      {/* Horizontal Scrolling Cards */}
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-4 min-w-max">
          {relatedPlants?.slice(0, 6)?.map((plant) => {
            const stockInfo = getStockStatusInfo(plant?.stockStatus);
            
            return (
              <div
                key={plant?.id}
                className="flex-shrink-0 w-64 bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
                onClick={() => handlePlantClick(plant?.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={plant?.image}
                    alt={plant?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-body ${getDifficultyColor(plant?.difficulty)}`}>
                      {plant?.difficulty}
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-heading font-medium text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
                      {plant?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground italic line-clamp-1">
                      {plant?.scientificName}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {plant?.categories?.slice(0, 2)?.map((cat, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs font-body"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-heading font-bold text-primary">
                      ${plant?.price?.toFixed(2)}
                    </div>
                    <div className={`text-xs font-body ${stockInfo?.className}`}>
                      {stockInfo?.text}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="Eye"
                    iconPosition="left"
                    onClick={(e) => {
                      e?.stopPropagation();
                      handlePlantClick(plant?.id);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Mobile: Show fewer cards in a grid */}
      <div className="lg:hidden grid grid-cols-2 gap-4">
        {relatedPlants?.slice(0, 4)?.map((plant) => {
          const stockInfo = getStockStatusInfo(plant?.stockStatus);
          
          return (
            <div
              key={plant?.id}
              className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={() => handlePlantClick(plant?.id)}
            >
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={plant?.image}
                  alt={plant?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 space-y-2">
                <div>
                  <h3 className="font-heading font-medium text-foreground text-sm group-hover:text-primary transition-colors duration-200 line-clamp-1">
                    {plant?.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-heading font-bold text-primary">
                    ${plant?.price?.toFixed(2)}
                  </div>
                  <div className={`text-xs font-body ${stockInfo?.className}`}>
                    {stockInfo?.text}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPlants;