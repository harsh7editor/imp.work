import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ImageGallery from './components/ImageGallery';
import PlantInfo from './components/PlantInfo';
import ActionBar from './components/ActionBar';
import RelatedPlants from './components/RelatedPlants';

const PlantDetailView = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [plant, setPlant] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Get plant ID from URL params
  const plantId = searchParams?.get('id') || '1';

  // Mock plant data - in a real app, this would come from an API
  const mockPlants = {
    '1': {
      id: 1,
      name: "Monstera Deliciosa",
      scientificName: "Monstera deliciosa",
      price: 45.99,
      categories: ["Indoor", "Home Decor", "Air Purifying"],
      stockStatus: "in-stock",
      stockCount: 15,
      description: `The Monstera Deliciosa, also known as the Swiss Cheese Plant, is a stunning tropical houseplant beloved for its dramatic, split leaves and easy-going nature. Native to Central America, this climbing plant can grow quite large indoors, making it a perfect statement piece for any room.\n\nThis plant is perfect for beginners and experienced plant parents alike. Its unique fenestrated leaves develop as the plant matures, creating beautiful natural patterns that make each plant unique. The Monstera is also known for its air-purifying qualities, helping to clean your indoor air naturally.`,
      difficulty: "Easy",
      size: "Medium (2-3 feet tall)",
      lightRequirement: "Bright, indirect light",
      wateringFrequency: "Weekly or when soil is dry",
      humidity: "Medium to high (50-60%)",
      temperature: "65-80°F (18-27°C)",
      petSafe: false,
      airPurifying: true,
      images: [
        "https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1586093248292-4e6636b4e3b8?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1509423350716-97f2360af2e4?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=800&fit=crop"
      ]
    },
    '2': {
      id: 2,
      name: "Snake Plant",
      scientificName: "Sansevieria trifasciata",
      price: 24.99,
      categories: ["Indoor", "Air Purifying", "Succulent"],
      stockStatus: "in-stock",
      stockCount: 28,
      description: `The Snake Plant, also known as Mother-in-Law's Tongue, is one of the most popular and resilient houseplants available. With its striking upright leaves featuring green and yellow variegation, this plant adds architectural interest to any space while requiring minimal care.\n\nPerfect for beginners, the Snake Plant is incredibly forgiving and can tolerate neglect, low light, and infrequent watering. It's also one of the few plants that releases oxygen at night, making it an excellent choice for bedrooms.`,
      difficulty: "Easy",
      size: "Medium (1-3 feet tall)",
      lightRequirement: "Low to bright, indirect light",
      wateringFrequency: "Every 2-3 weeks",
      humidity: "Low to medium (30-50%)",
      temperature: "60-80°F (15-27°C)",
      petSafe: false,
      airPurifying: true,
      images: [
        "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=800&h=800&fit=crop"
      ]
    }
  };

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    setTimeout(() => {
      const selectedPlant = mockPlants?.[plantId] || mockPlants?.['1'];
      setPlant(selectedPlant);
      setIsLoading(false);
    }, 500);
  }, [plantId]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleWishlistToggle = (inWishlist) => {
    setIsInWishlist(inWishlist);
    // In a real app, you would save this to localStorage or send to API
  };

  const breadcrumbItems = plant ? [
    { label: 'Plant Catalog', path: '/plant-catalog-browse', icon: 'Home' },
    { label: plant?.categories?.[0] || 'Category', path: '/plant-catalog-browse', icon: 'Tag' },
    { label: plant?.name, path: `/plant-detail-view?id=${plant?.id}`, icon: 'Eye' }
  ] : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <main className="pt-16 lg:pt-20">
          <div className="container mx-auto px-4 lg:px-6 py-8">
            <div className="animate-pulse space-y-8">
              {/* Breadcrumb skeleton */}
              <div className="h-4 bg-muted rounded w-64"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Image gallery skeleton */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="h-96 lg:h-[500px] bg-muted rounded-lg"></div>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4]?.map((i) => (
                      <div key={i} className="w-16 h-16 bg-muted rounded-lg"></div>
                    ))}
                  </div>
                </div>
                
                {/* Info skeleton */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="h-8 bg-muted rounded w-3/4"></div>
                    <div className="h-6 bg-muted rounded w-1/2"></div>
                    <div className="h-8 bg-muted rounded w-1/3"></div>
                  </div>
                  
                  <div className="space-y-3">
                    {[1, 2, 3]?.map((i) => (
                      <div key={i} className="h-4 bg-muted rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        
        <main className="pt-16 lg:pt-20">
          <div className="container mx-auto px-4 lg:px-6 py-8">
            <div className="text-center py-16">
              <h1 className="text-2xl font-heading font-semibold text-foreground mb-4">
                Plant Not Found
              </h1>
              <p className="text-muted-foreground mb-8">
                The plant you're looking for doesn't exist or has been removed.
              </p>
              <button
                onClick={() => navigate('/plant-catalog-browse')}
                className="text-primary hover:underline"
              >
                Return to Plant Catalog
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <main className="pt-16 lg:pt-20 pb-20 lg:pb-8">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Breadcrumb customItems={breadcrumbItems} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {/* Image Gallery - Takes 2 columns on desktop */}
            <div className="lg:col-span-2">
              <ImageGallery 
                images={plant?.images} 
                plantName={plant?.name}
              />
            </div>

            {/* Plant Information - Takes 1 column on desktop */}
            <div className="lg:col-span-1">
              <PlantInfo plant={plant} />
            </div>

            {/* Action Bar - Takes 1 column on desktop, fixed bottom on mobile */}
            <div className="lg:col-span-1">
              <ActionBar 
                plant={plant}
                isInWishlist={isInWishlist}
                onWishlistToggle={handleWishlistToggle}
              />
            </div>
          </div>

          {/* Related Plants Section */}
          <div className="border-t border-border pt-12">
            <RelatedPlants 
              currentPlantId={plant?.id}
              category={plant?.categories?.[0]}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlantDetailView;