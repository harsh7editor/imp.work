import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PlantForm from './components/PlantForm';
import PlantTable from './components/PlantTable';
import StatsCards from './components/StatsCards';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AdminPlantManagement = () => {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [editingPlant, setEditingPlant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileForm, setShowMobileForm] = useState(false);

  // Mock admin user - in real app this would come from auth context
  const mockAdmin = {
    id: 1,
    name: 'Admin User',
    email: 'admin@plantcatalog.com',
    role: 'admin'
  };

  // Mock plant data
  const mockPlants = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: 45.99,
      categories: ["indoor", "air-purifying"],
      inStock: true,
      image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=400",
      description: "Large, glossy leaves with natural splits make this a stunning indoor plant perfect for bright, indirect light.",
      lastModified: "2025-08-20T10:30:00Z"
    },
    {
      id: 2,
      name: "Snake Plant",
      price: 28.50,
      categories: ["indoor", "air-purifying", "home-decor"],
      inStock: true,
      image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400",
      description: "Low-maintenance succulent with upright, sword-like leaves that purify air and tolerate low light conditions.",
      lastModified: "2025-08-19T14:15:00Z"
    },
    {
      id: 3,
      name: "Fiddle Leaf Fig",
      price: 65.00,
      categories: ["indoor", "home-decor"],
      inStock: false,
      image: "https://images.unsplash.com/photo-1586093248292-4e6636b4d4b6?w=400",
      description: "Statement plant with large, violin-shaped leaves that adds dramatic height and elegance to any room.",
      lastModified: "2025-08-18T09:45:00Z"
    },
    {
      id: 4,
      name: "Lavender",
      price: 18.75,
      categories: ["outdoor", "air-purifying"],
      inStock: true,
      image: "https://images.unsplash.com/photo-1611909023032-2d4b3a2e78b1?w=400",
      description: "Fragrant purple flowers and silvery foliage make this Mediterranean herb perfect for gardens and containers.",
      lastModified: "2025-08-17T16:20:00Z"
    },
    {
      id: 5,
      name: "Echeveria Succulent",
      price: 12.99,
      categories: ["succulent", "indoor", "home-decor"],
      inStock: true,
      image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400",
      description: "Rosette-shaped succulent with thick, fleshy leaves in beautiful blue-green hues requiring minimal water.",
      lastModified: "2025-08-16T11:10:00Z"
    },
    {
      id: 6,
      name: "Peace Lily",
      price: 32.00,
      categories: ["indoor", "air-purifying"],
      inStock: true,
      image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400",
      description: "Elegant white blooms and glossy green leaves thrive in low to medium light while cleaning indoor air.",
      lastModified: "2025-08-15T13:30:00Z"
    },
    {
      id: 7,
      name: "Rosemary",
      price: 15.50,
      categories: ["outdoor", "home-decor"],
      inStock: false,
      image: "https://images.unsplash.com/photo-1586093248292-4e6636b4d4b6?w=400",
      description: "Aromatic evergreen herb with needle-like leaves perfect for cooking and adding fragrance to gardens.",
      lastModified: "2025-08-14T08:25:00Z"
    },
    {
      id: 8,
      name: "Jade Plant",
      price: 22.25,
      categories: ["succulent", "indoor"],
      inStock: true,
      image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=400",
      description: "Thick, oval leaves on sturdy stems create a tree-like appearance in this easy-care succulent.",
      lastModified: "2025-08-13T15:40:00Z"
    }
  ];

  useEffect(() => {
    // Simulate loading plants data
    const loadPlants = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPlants(mockPlants);
      setIsLoading(false);
    };

    loadPlants();
  }, []);

  const handleAddPlant = async (plantData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setPlants(prev => [...prev, plantData]);
    setShowMobileForm(false);
  };

  const handleEditPlant = async (plantData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setPlants(prev => prev?.map(plant => 
      plant?.id === plantData?.id ? plantData : plant
    ));
    setEditingPlant(null);
    setShowMobileForm(false);
  };

  const handleDeletePlant = async (plantId) => {
    if (window.confirm('Are you sure you want to delete this plant?')) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setPlants(prev => prev?.filter(plant => plant?.id !== plantId));
    }
  };

  const handleBulkDelete = async (plantIds) => {
    if (window.confirm(`Are you sure you want to delete ${plantIds?.length} plants?`)) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPlants(prev => prev?.filter(plant => !plantIds?.includes(plant?.id)));
    }
  };

  const handleEditClick = (plant) => {
    setEditingPlant(plant);
    setShowMobileForm(true);
  };

  const handleCancelEdit = () => {
    setEditingPlant(null);
    setShowMobileForm(false);
  };

  const breadcrumbItems = [
    { label: 'Plant Catalog', path: '/plant-catalog-browse', icon: 'Home' },
    { label: 'Admin Panel', path: '/admin-plant-management', icon: 'Settings' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={mockAdmin} />
        <div className="pt-16 lg:pt-20">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Icon name="Loader2" size={48} className="mx-auto text-primary animate-spin mb-4" />
              <p className="text-lg text-muted-foreground">Loading plant management...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={mockAdmin} />
      
      <div className="pt-16 lg:pt-20">
        <div className="px-4 lg:px-6 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <Breadcrumb customItems={breadcrumbItems} className="mb-4" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Plant Management</h1>
                <p className="text-muted-foreground mt-1">
                  Manage your plant inventory and catalog
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  size="sm"
                >
                  Export
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  size="sm"
                  onClick={() => setShowMobileForm(true)}
                  className="lg:hidden"
                >
                  Add Plant
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCards plants={plants} />

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
            {/* Form Panel */}
            <div className="lg:col-span-4">
              <PlantForm
                onSubmit={editingPlant ? handleEditPlant : handleAddPlant}
                editingPlant={editingPlant}
                onCancel={editingPlant ? handleCancelEdit : null}
              />
            </div>

            {/* Table Panel */}
            <div className="lg:col-span-8">
              <PlantTable
                plants={plants}
                onEdit={handleEditClick}
                onDelete={handleDeletePlant}
                onBulkDelete={handleBulkDelete}
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <PlantTable
              plants={plants}
              onEdit={handleEditClick}
              onDelete={handleDeletePlant}
              onBulkDelete={handleBulkDelete}
            />
          </div>

          {/* Mobile Form Modal */}
          {showMobileForm && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4">
              <div className="bg-card rounded-t-lg sm:rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">
                    {editingPlant ? 'Edit Plant' : 'Add New Plant'}
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={handleCancelEdit}
                  />
                </div>
                <div className="p-4">
                  <PlantForm
                    onSubmit={editingPlant ? handleEditPlant : handleAddPlant}
                    editingPlant={editingPlant}
                    onCancel={handleCancelEdit}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPlantManagement;