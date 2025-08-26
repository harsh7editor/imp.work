import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FilterBar from './components/FilterBar';
import StatsBar from './components/StatsBar';
import PlantGrid from './components/PlantGrid';

const PlantCatalogBrowse = () => {
  const location = useLocation();
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock plant data
  const mockPlants = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      description: "A stunning tropical plant with large, glossy leaves featuring natural splits and holes. Perfect for adding a dramatic touch to any indoor space.",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1545239705-1564e58b9e4a?w=400&h=400&fit=crop",
      categories: ["Indoor", "Air Purifying", "Home Decor"],
      stock: 15,
      featured: true
    },
    {
      id: 2,
      name: "Snake Plant",
      description: "Low-maintenance succulent with tall, upright leaves. Excellent for beginners and known for its air-purifying qualities.",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop",
      categories: ["Indoor", "Succulent", "Air Purifying"],
      stock: 8,
      featured: false
    },
    {
      id: 3,
      name: "Fiddle Leaf Fig",
      description: "A popular indoor tree with large, violin-shaped leaves. Makes a bold statement in modern home decor.",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1586093248292-4e6252b8faa8?w=400&h=400&fit=crop",
      categories: ["Indoor", "Home Decor"],
      stock: 0,
      featured: true
    },
    {
      id: 4,
      name: "Peace Lily",
      description: "Elegant flowering plant with dark green leaves and white blooms. Thrives in low light conditions.",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      categories: ["Indoor", "Air Purifying"],
      stock: 12,
      featured: false
    },
    {
      id: 5,
      name: "Rubber Plant",
      description: "Glossy, dark green leaves make this plant a favorite for modern interiors. Easy to care for and fast-growing.",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1509423350716-97f2360af7e4?w=400&h=400&fit=crop",
      categories: ["Indoor", "Home Decor"],
      stock: 20,
      featured: false
    },
    {
      id: 6,
      name: "Aloe Vera",
      description: "Medicinal succulent with thick, fleshy leaves. Perfect for sunny windowsills and known for its healing properties.",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1509423350716-97f2360af7e4?w=400&h=400&fit=crop",
      categories: ["Succulent", "Indoor"],
      stock: 25,
      featured: false
    },
    {
      id: 7,
      name: "Boston Fern",
      description: "Lush, feathery fronds create a beautiful cascading effect. Perfect for hanging baskets or plant stands.",
      price: 27.99,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      categories: ["Indoor", "Air Purifying"],
      stock: 18,
      featured: false
    },
    {
      id: 8,
      name: "Jade Plant",
      description: "Classic succulent with thick, oval leaves. Symbol of good luck and prosperity in many cultures.",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop",
      categories: ["Succulent", "Indoor", "Home Decor"],
      stock: 30,
      featured: false
    },
    {
      id: 9,
      name: "Bird of Paradise",
      description: "Tropical plant with large, paddle-shaped leaves. Creates a stunning focal point in any room.",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1545239705-1564e58b9e4a?w=400&h=400&fit=crop",
      categories: ["Indoor", "Home Decor"],
      stock: 5,
      featured: true
    },
    {
      id: 10,
      name: "Spider Plant",
      description: "Easy-to-grow plant with long, arching leaves and small plantlets. Great for beginners and air purification.",
      price: 22.99,
      image: "https://images.unsplash.com/photo-1586093248292-4e6252b8faa8?w=400&h=400&fit=crop",
      categories: ["Indoor", "Air Purifying"],
      stock: 40,
      featured: false
    },
    {
      id: 11,
      name: "Lavender",
      description: "Fragrant herb with purple flowers. Perfect for outdoor gardens and known for its calming properties.",
      price: 16.99,
      image: "https://images.pexels.com/photos/207518/pexels-photo-207518.jpeg?w=400&h=400&fit=crop",
      categories: ["Outdoor", "Home Decor"],
      stock: 35,
      featured: false
    },
    {
      id: 12,
      name: "Rosemary",
      description: "Aromatic herb with needle-like leaves. Great for cooking and adds a Mediterranean touch to gardens.",
      price: 14.99,
      image: "https://images.pexels.com/photos/4750270/pexels-photo-4750270.jpeg?w=400&h=400&fit=crop",
      categories: ["Outdoor"],
      stock: 28,
      featured: false
    },
    {
      id: 13,
      name: "Echeveria",
      description: "Beautiful rosette-shaped succulent with colorful leaves. Perfect for rock gardens and containers.",
      price: 12.99,
      image: "https://images.pixabay.com/photo/2017/09/04/18/39/succulent-2715715_1280.jpg?w=400&h=400&fit=crop",
      categories: ["Succulent", "Outdoor"],
      stock: 50,
      featured: false
    },
    {
      id: 14,
      name: "Pothos",
      description: "Trailing vine with heart-shaped leaves. Extremely easy to care for and perfect for hanging baskets.",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1509423350716-97f2360af7e4?w=400&h=400&fit=crop",
      categories: ["Indoor", "Air Purifying"],
      stock: 45,
      featured: false
    },
    {
      id: 15,
      name: "ZZ Plant",
      description: "Glossy, dark green leaves on upright stems. Extremely drought-tolerant and perfect for low-light areas.",
      price: 42.99,
      image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop",
      categories: ["Indoor", "Air Purifying"],
      stock: 22,
      featured: false
    },
    {
      id: 16,
      name: "Marigold",
      description: "Bright, cheerful flowers in orange and yellow. Perfect for outdoor beds and natural pest control.",
      price: 8.99,
      image: "https://images.pexels.com/photos/56866/garden-flower-orange-yellow-56866.jpeg?w=400&h=400&fit=crop",
      categories: ["Outdoor", "Home Decor"],
      stock: 60,
      featured: false
    },
    {
      id: 17,
      name: "Philodendron",
      description: "Heart-shaped leaves on trailing vines. Easy to propagate and perfect for beginners.",
      price: 26.99,
      image: "https://images.unsplash.com/photo-1545239705-1564e58b9e4a?w=400&h=400&fit=crop",
      categories: ["Indoor", "Air Purifying"],
      stock: 33,
      featured: false
    },
    {
      id: 18,
      name: "Cactus Mix",
      description: "Assorted small cacti in decorative pots. Perfect for sunny windowsills and minimal care requirements.",
      price: 21.99,
      image: "https://images.pixabay.com/photo/2016/11/21/16/05/cactus-1846147_1280.jpg?w=400&h=400&fit=crop",
      categories: ["Succulent", "Indoor", "Home Decor"],
      stock: 15,
      featured: false
    },
    {
      id: 19,
      name: "Bamboo Palm",
      description: "Elegant palm with slender stems and feathery fronds. Great for adding tropical vibes indoors.",
      price: 65.99,
      image: "https://images.unsplash.com/photo-1586093248292-4e6252b8faa8?w=400&h=400&fit=crop",
      categories: ["Indoor", "Air Purifying", "Home Decor"],
      stock: 10,
      featured: true
    },
    {
      id: 20,
      name: "Basil",
      description: "Aromatic herb with bright green leaves. Essential for cooking and easy to grow indoors or outdoors.",
      price: 9.99,
      image: "https://images.pexels.com/photos/4750270/pexels-photo-4750270.jpeg?w=400&h=400&fit=crop",
      categories: ["Outdoor", "Indoor"],
      stock: 55,
      featured: false
    }
  ];

  // Simulate API loading
  useEffect(() => {
    const loadPlants = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPlants(mockPlants);
      setIsLoading(false);
    };

    loadPlants();
  }, []);

  // Filter plants based on search query and category
  const filteredPlantsData = useMemo(() => {
    let filtered = plants;

    // Filter by search query
    if (searchQuery?.trim()) {
      filtered = filtered?.filter(plant =>
        plant?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        plant?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        plant?.categories?.some(category => 
          category?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        )
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered?.filter(plant =>
        plant?.categories?.some(category =>
          category?.toLowerCase()?.replace(/\s+/g, '-') === selectedCategory ||
          category?.toLowerCase() === selectedCategory?.replace('-', ' ')
        )
      );
    }

    return filtered;
  }, [plants, searchQuery, selectedCategory]);

  useEffect(() => {
    setFilteredPlants(filteredPlantsData);
  }, [filteredPlantsData]);

  // Calculate stats
  const stats = useMemo(() => {
    const inStockPlants = plants?.filter(plant => plant?.stock > 0)?.length;
    const uniqueCategories = new Set();
    plants?.forEach(plant => {
      plant?.categories?.forEach(category => uniqueCategories?.add(category));
    });

    return {
      totalPlants: plants?.length,
      inStockPlants,
      categories: uniqueCategories?.size
    };
  }, [plants]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <main className="pt-16 lg:pt-20">
        <div className="container mx-auto px-4 lg:px-6 py-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb />
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
              Plant Catalog
            </h1>
            <p className="text-lg font-body text-muted-foreground">
              Discover our extensive collection of beautiful plants for your home and garden
            </p>
          </div>

          {/* Stats Bar */}
          <StatsBar
            totalPlants={stats?.totalPlants}
            inStockPlants={stats?.inStockPlants}
            categories={stats?.categories}
            isLoading={isLoading}
          />

          {/* Filter Bar */}
          <FilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            totalResults={filteredPlants?.length}
            isLoading={isLoading}
          />

          {/* Plant Grid */}
          <PlantGrid
            plants={filteredPlants}
            viewMode={viewMode}
            isLoading={isLoading}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onClearFilters={handleClearFilters}
          />
        </div>
      </main>
    </div>
  );
};

export default PlantCatalogBrowse;