import React, { useState, useMemo } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PlantTable = ({ plants, onEdit, onDelete, onBulkDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const filteredAndSortedPlants = useMemo(() => {
    let filtered = plants?.filter(plant =>
      plant?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      plant?.categories?.some(cat => cat?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
    );

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === 'price') {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        } else if (sortConfig?.key === 'lastModified') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else if (sortConfig?.key === 'categories') {
          aValue = aValue?.join(', ');
          bValue = bValue?.join(', ');
        }

        if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [plants, searchTerm, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedPlants(filteredAndSortedPlants?.map(plant => plant?.id));
    } else {
      setSelectedPlants([]);
    }
  };

  const handleSelectPlant = (plantId, checked) => {
    if (checked) {
      setSelectedPlants(prev => [...prev, plantId]);
    } else {
      setSelectedPlants(prev => prev?.filter(id => id !== plantId));
    }
  };

  const handleBulkDelete = () => {
    if (selectedPlants?.length > 0) {
      onBulkDelete(selectedPlants);
      setSelectedPlants([]);
      setShowBulkActions(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCategories = (categories) => {
    const categoryLabels = {
      'indoor': 'Indoor',
      'outdoor': 'Outdoor',
      'succulent': 'Succulent',
      'air-purifying': 'Air Purifying',
      'home-decor': 'Home Decor'
    };
    
    return categories?.map(cat => categoryLabels?.[cat] || cat)?.join(', ');
  };

  const SortButton = ({ column, children }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center space-x-1 text-left font-medium text-foreground hover:text-primary transition-colors duration-200"
    >
      <span>{children}</span>
      <Icon
        name={
          sortConfig?.key === column
            ? sortConfig?.direction === 'asc' ?'ChevronUp' :'ChevronDown' :'ChevronsUpDown'
        }
        size={14}
        className="opacity-60"
      />
    </button>
  );

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-xl font-semibold text-foreground">
            Plant Inventory ({filteredAndSortedPlants?.length})
          </h2>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative flex-1 sm:w-64">
              <Input
                type="search"
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="pl-10"
              />
              <Icon
                name="Search"
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
            </div>
            
            {selectedPlants?.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
                onClick={handleBulkDelete}
              >
                Delete ({selectedPlants?.length})
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="w-12 px-6 py-4">
                <Checkbox
                  checked={selectedPlants?.length === filteredAndSortedPlants?.length && filteredAndSortedPlants?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="px-6 py-4 text-left">
                <SortButton column="name">Plant</SortButton>
              </th>
              <th className="px-6 py-4 text-left">
                <SortButton column="price">Price</SortButton>
              </th>
              <th className="px-6 py-4 text-left">
                <SortButton column="categories">Categories</SortButton>
              </th>
              <th className="px-6 py-4 text-left">
                <SortButton column="inStock">Stock</SortButton>
              </th>
              <th className="px-6 py-4 text-left">
                <SortButton column="lastModified">Modified</SortButton>
              </th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredAndSortedPlants?.map((plant) => (
              <tr key={plant?.id} className="hover:bg-muted/50 transition-colors duration-200">
                <td className="px-6 py-4">
                  <Checkbox
                    checked={selectedPlants?.includes(plant?.id)}
                    onChange={(e) => handleSelectPlant(plant?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={plant?.image}
                        alt={plant?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{plant?.name}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-48">
                        {plant?.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-foreground">
                  {formatPrice(plant?.price)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {plant?.categories?.slice(0, 2)?.map((category) => (
                      <span
                        key={category}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary-foreground"
                      >
                        {formatCategories([category])}
                      </span>
                    ))}
                    {plant?.categories?.length > 2 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        +{plant?.categories?.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      plant?.inStock
                        ? 'bg-success/20 text-success-foreground'
                        : 'bg-destructive/20 text-destructive-foreground'
                    }`}
                  >
                    <Icon
                      name={plant?.inStock ? 'CheckCircle' : 'XCircle'}
                      size={12}
                      className="mr-1"
                    />
                    {plant?.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {formatDate(plant?.lastModified)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => onEdit(plant)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => onDelete(plant?.id)}
                      className="text-destructive hover:text-destructive"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {filteredAndSortedPlants?.map((plant) => (
          <div key={plant?.id} className="p-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={selectedPlants?.includes(plant?.id)}
                onChange={(e) => handleSelectPlant(plant?.id, e?.target?.checked)}
                className="mt-1"
              />
              
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={plant?.image}
                  alt={plant?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{plant?.name}</h3>
                    <p className="text-lg font-semibold text-foreground mt-1">
                      {formatPrice(plant?.price)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => onEdit(plant)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => onDelete(plant?.id)}
                      className="text-destructive hover:text-destructive"
                    />
                  </div>
                </div>
                
                <div className="mt-2 space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {plant?.categories?.map((category) => (
                      <span
                        key={category}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary-foreground"
                      >
                        {formatCategories([category])}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        plant?.inStock
                          ? 'bg-success/20 text-success-foreground'
                          : 'bg-destructive/20 text-destructive-foreground'
                      }`}
                    >
                      <Icon
                        name={plant?.inStock ? 'CheckCircle' : 'XCircle'}
                        size={12}
                        className="mr-1"
                      />
                      {plant?.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    
                    <span className="text-muted-foreground">
                      {formatDate(plant?.lastModified)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {filteredAndSortedPlants?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No plants found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first plant'}
          </p>
        </div>
      )}
    </div>
  );
};

export default PlantTable;