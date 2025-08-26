import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

import Image from '../../../components/AppImage';

const PlantForm = ({ onSubmit, editingPlant = null, onCancel = null }) => {
  const [formData, setFormData] = useState({
    name: editingPlant?.name || '',
    price: editingPlant?.price || '',
    categories: editingPlant?.categories || [],
    inStock: editingPlant?.inStock !== undefined ? editingPlant?.inStock : true,
    image: editingPlant?.image || '',
    description: editingPlant?.description || ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(editingPlant?.image || '');
  const fileInputRef = useRef(null);

  const categories = [
    { id: 'indoor', label: 'Indoor' },
    { id: 'outdoor', label: 'Outdoor' },
    { id: 'succulent', label: 'Succulent' },
    { id: 'air-purifying', label: 'Air Purifying' },
    { id: 'home-decor', label: 'Home Decor' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Plant name is required';
    }

    if (!formData?.price || parseFloat(formData?.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (formData?.categories?.length === 0) {
      newErrors.categories = 'At least one category must be selected';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Plant description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleCategoryChange = (categoryId, checked) => {
    const updatedCategories = checked
      ? [...formData?.categories, categoryId]
      : formData?.categories?.filter(cat => cat !== categoryId);
    
    handleInputChange('categories', updatedCategories);
  };

  const handleImageUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e?.target?.result;
        setImagePreview(imageUrl);
        handleInputChange('image', imageUrl);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const plantData = {
        ...formData,
        price: parseFloat(formData?.price),
        id: editingPlant?.id || Date.now(),
        lastModified: new Date()?.toISOString()
      };
      
      await onSubmit(plantData);
      
      if (!editingPlant) {
        setFormData({
          name: '',
          price: '',
          categories: [],
          inStock: true,
          image: '',
          description: ''
        });
        setImagePreview('');
        if (fileInputRef?.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (value) => {
    const numericValue = value?.replace(/[^0-9.]/g, '');
    return numericValue;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          {editingPlant ? 'Edit Plant' : 'Add New Plant'}
        </h2>
        {editingPlant && onCancel && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Plant Name */}
        <Input
          label="Plant Name"
          type="text"
          placeholder="Enter plant name"
          value={formData?.name}
          onChange={(e) => handleInputChange('name', e?.target?.value)}
          error={errors?.name}
          required
        />

        {/* Price */}
        <Input
          label="Price (USD)"
          type="text"
          placeholder="0.00"
          value={formData?.price}
          onChange={(e) => handleInputChange('price', formatPrice(e?.target?.value))}
          error={errors?.price}
          required
          description="Enter price in USD format"
        />

        {/* Categories */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Categories <span className="text-destructive">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories?.map((category) => (
              <Checkbox
                key={category?.id}
                label={category?.label}
                checked={formData?.categories?.includes(category?.id)}
                onChange={(e) => handleCategoryChange(category?.id, e?.target?.checked)}
              />
            ))}
          </div>
          {errors?.categories && (
            <p className="text-sm text-destructive">{errors?.categories}</p>
          )}
        </div>

        {/* Stock Availability */}
        <div className="flex items-center space-x-3">
          <Checkbox
            label="In Stock"
            checked={formData?.inStock}
            onChange={(e) => handleInputChange('inStock', e?.target?.checked)}
            description="Toggle plant availability status"
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Plant Image
          </label>
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Button
                type="button"
                variant="outline"
                iconName="Upload"
                iconPosition="left"
                onClick={() => fileInputRef?.current?.click()}
                className="w-full sm:w-auto"
              >
                Choose Image
              </Button>
            </div>
            {imagePreview && (
              <div className="w-20 h-20 border border-border rounded-lg overflow-hidden">
                <Image
                  src={imagePreview}
                  alt="Plant preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Description <span className="text-destructive">*</span>
          </label>
          <textarea
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            placeholder="Enter plant description..."
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          />
          {errors?.description && (
            <p className="text-sm text-destructive">{errors?.description}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="submit"
            loading={isSubmitting}
            iconName={editingPlant ? "Save" : "Plus"}
            iconPosition="left"
            className="min-w-32"
          >
            {editingPlant ? 'Update Plant' : 'Add Plant'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PlantForm;