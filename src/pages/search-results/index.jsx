import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SearchHeader from './components/SearchHeader';
import FilterPanel from './components/FilterPanel';
import PlantCard from './components/PlantCard';
import EmptyState from './components/EmptyState';
import LoadingState from './components/LoadingState';
import RecentSearches from './components/RecentSearches';
import Pagination from './components/Pagination';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [appliedFilters, setAppliedFilters] = useState({
    categories: [],
    availability: [],
    priceRange: null
  });
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recentSearches, setRecentSearches] = useState([]);
  const itemsPerPage = 12;

  // Mock plant data
  const mockPlants = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      description: "Large, glossy leaves with natural splits make this tropical plant a stunning centerpiece for any room.",
      price: 45.99,
      originalPrice: 55.99,
      image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&h=400&fit=crop",
      categories: ["Indoor", "Air Purifying", "Home Decor"],
      stock: 12,
      rating: 4.8,
      isPopular: true
    },
    {
      id: 2,
      name: "Snake Plant (Sansevieria)",
      description: "Low-maintenance succulent with striking upright leaves, perfect for beginners and low-light spaces.",
      price: 28.99,
      image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop",
      categories: ["Indoor", "Succulent", "Air Purifying"],
      stock: 8,
      rating: 4.9,
      isPopular: true
    },
    {
      id: 3,
      name: "Fiddle Leaf Fig",
      description: "Dramatic large leaves and tree-like structure make this plant a favorite among interior designers.",
      price: 89.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1586093248292-4e6636b4e3b8?w=400&h=400&fit=crop",
      categories: ["Indoor", "Home Decor"],
      stock: 5,
      rating: 4.6,
      isPopular: false
    },
    {
      id: 4,
      name: "Peace Lily",
      description: "Elegant white blooms and dark green foliage, excellent for removing indoor air pollutants.",
      price: 32.99,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      categories: ["Indoor", "Flowering", "Air Purifying"],
      stock: 15,
      rating: 4.7,
      isPopular: true
    },
    {
      id: 5,
      name: "Rubber Plant",
      description: "Glossy, thick leaves and easy care requirements make this plant perfect for modern homes.",
      price: 38.99,
      image: "https://images.unsplash.com/photo-1509423350716-97f2360af2e4?w=400&h=400&fit=crop",
      categories: ["Indoor", "Air Purifying", "Home Decor"],
      stock: 10,
      rating: 4.5,
      isPopular: false
    },
    {
      id: 6,
      name: "Aloe Vera",
      description: "Medicinal succulent with healing properties, perfect for sunny windowsills and easy care.",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1509423350716-97f2360af2e4?w=400&h=400&fit=crop",
      categories: ["Succulent", "Herbs", "Indoor"],
      stock: 20,
      rating: 4.8,
      isPopular: true
    },
    {
      id: 7,
      name: "Boston Fern",
      description: "Lush, feathery fronds create a beautiful cascading effect, perfect for hanging baskets.",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      categories: ["Indoor", "Air Purifying"],
      stock: 7,
      rating: 4.4,
      isPopular: false
    },
    {
      id: 8,
      name: "Pothos Golden",
      description: "Trailing vine with heart-shaped leaves, extremely easy to care for and propagate.",
      price: 22.99,
      image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&h=400&fit=crop",
      categories: ["Indoor", "Air Purifying", "Home Decor"],
      stock: 18,
      rating: 4.9,
      isPopular: true
    },
    {
      id: 9,
      name: "ZZ Plant",
      description: "Extremely drought-tolerant with glossy leaves, perfect for offices and low-light conditions.",
      price: 35.99,
      image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop",
      categories: ["Indoor", "Succulent", "Air Purifying"],
      stock: 0,
      rating: 4.7,
      isPopular: false
    },
    {
      id: 10,
      name: "Spider Plant",
      description: "Easy-to-grow plant with long, arching leaves and baby plantlets, great for beginners.",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1586093248292-4e6636b4e3b8?w=400&h=400&fit=crop",
      categories: ["Indoor", "Air Purifying"],
      stock: 25,
      rating: 4.6,
      isPopular: true
    },
    {
      id: 11,
      name: "Lavender",
      description: "Fragrant purple flowers and silvery foliage, perfect for outdoor gardens and aromatherapy.",
      price: 26.99,
      image: "https://images.pexels.com/photos/207518/pexels-photo-207518.jpeg?w=400&h=400&fit=crop",
      categories: ["Outdoor", "Flowering", "Herbs"],
      stock: 14,
      rating: 4.8,
      isPopular: true
    },
    {
      id: 12,
      name: "Jade Plant",
      description: "Thick, fleshy leaves and tree-like structure, symbol of good luck and prosperity.",
      price: 29.99,
      image: "https://images.pixabay.com/photo/2018/07/14/15/27/cactus-3537409_1280.jpg?w=400&h=400&fit=crop",
      categories: ["Succulent", "Indoor", "Home Decor"],
      stock: 11,
      rating: 4.5,
      isPopular: false
    }
  ];

  // Initialize search from URL params or global state
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams?.get('q') || '';
    setSearchQuery(query);
    
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, [location?.search]);

  // Save search to recent searches
  const saveToRecentSearches = (query) => {
    if (!query?.trim()) return;
    
    const newSearch = { query: query?.trim(), timestamp: Date.now(), count: 1 };
    const updated = [newSearch, ...recentSearches?.filter(s => s?.query !== query?.trim())]?.slice(0, 10);
    
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Filter and sort plants
  const filteredAndSortedPlants = useMemo(() => {
    let filtered = [...mockPlants];

    // Apply search query
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(plant => 
        plant?.name?.toLowerCase()?.includes(query) ||
        plant?.description?.toLowerCase()?.includes(query) ||
        plant?.categories?.some(cat => cat?.toLowerCase()?.includes(query))
      );
    }

    // Apply category filters
    if (appliedFilters?.categories?.length > 0) {
      filtered = filtered?.filter(plant =>
        plant?.categories?.some(cat => 
          appliedFilters?.categories?.includes(cat?.toLowerCase()?.replace(/\s+/g, '-'))
        )
      );
    }

    // Apply availability filters
    if (appliedFilters?.availability?.length > 0) {
      filtered = filtered?.filter(plant => {
        if (appliedFilters?.availability?.includes('in-stock')) return plant?.stock > 5;
        if (appliedFilters?.availability?.includes('low-stock')) return plant?.stock > 0 && plant?.stock <= 5;
        if (appliedFilters?.availability?.includes('pre-order')) return plant?.stock === 0;
        return true;
      });
    }

    // Apply price range filter
    if (appliedFilters?.priceRange) {
      const { min, max } = appliedFilters?.priceRange;
      filtered = filtered?.filter(plant => plant?.price >= min && plant?.price <= max);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'alphabetical':
        filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      case 'stock':
        filtered?.sort((a, b) => b?.stock - a?.stock);
        break;
      case 'relevance':
      default:
        // Sort by relevance (popularity, rating, stock)
        filtered?.sort((a, b) => {
          if (a?.isPopular !== b?.isPopular) return b?.isPopular - a?.isPopular;
          if (a?.rating !== b?.rating) return b?.rating - a?.rating;
          return b?.stock - a?.stock;
        });
        break;
    }

    return filtered;
  }, [searchQuery, appliedFilters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPlants?.length / itemsPerPage);
  const paginatedPlants = filteredAndSortedPlants?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    if (query?.trim()) {
      saveToRecentSearches(query);
    }
    // Update URL
    const params = new URLSearchParams();
    if (query?.trim()) params?.set('q', query);
    navigate(`/search-results?${params?.toString()}`, { replace: true });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
    navigate('/search-results', { replace: true });
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleFilterChange = (newFilters) => {
    setAppliedFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    setAppliedFilters({
      categories: [],
      availability: [],
      priceRange: null
    });
    setCurrentPage(1);
  };

  const handleCategorySelect = (categoryId) => {
    const newCategories = [categoryId];
    setAppliedFilters(prev => ({ ...prev, categories: newCategories }));
    setCurrentPage(1);
  };

  const handleRecentSearchSelect = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    const params = new URLSearchParams();
    params?.set('q', query);
    navigate(`/search-results?${params?.toString()}`, { replace: true });
  };

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <main className="pt-14 lg:pt-16">
        {/* Breadcrumb */}
        <div className="bg-card border-b border-border">
          <div className="px-4 lg:px-6 py-3">
            <Breadcrumb />
          </div>
        </div>

        {/* Search Header */}
        <SearchHeader
          searchQuery={searchQuery}
          resultCount={filteredAndSortedPlants?.length}
          onClearSearch={handleClearSearch}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
        />

        {/* Recent Searches */}
        {!searchQuery && recentSearches?.length > 0 && (
          <RecentSearches
            recentSearches={recentSearches}
            onSearchSelect={handleRecentSearchSelect}
            onClearRecent={handleClearRecentSearches}
          />
        )}

        {/* Filter Panel */}
        <FilterPanel
          appliedFilters={appliedFilters}
          onFilterChange={handleFilterChange}
          onClearAllFilters={handleClearAllFilters}
          isExpanded={isFilterExpanded}
          onToggleExpanded={setIsFilterExpanded}
        />

        {/* Content */}
        <div className="px-4 lg:px-6 py-6">
          {isLoading ? (
            <LoadingState viewMode={viewMode} />
          ) : filteredAndSortedPlants?.length === 0 ? (
            <EmptyState
              searchQuery={searchQuery}
              onClearSearch={handleClearSearch}
              onCategorySelect={handleCategorySelect}
            />
          ) : (
            <>
              {/* Results Grid/List */}
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8" :"space-y-4 mb-8"
              }>
                {paginatedPlants?.map((plant) => (
                  <PlantCard
                    key={plant?.id}
                    plant={plant}
                    viewMode={viewMode}
                    searchQuery={searchQuery}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredAndSortedPlants?.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  className="border-t border-border pt-6"
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchResults;