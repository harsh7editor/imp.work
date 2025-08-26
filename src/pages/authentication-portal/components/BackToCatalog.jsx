import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const BackToCatalog = () => {
  const navigate = useNavigate();

  const handleBackToCatalog = () => {
    navigate('/plant-catalog-browse');
  };

  return (
    <div className="text-center mb-8">
      <Button
        variant="ghost"
        size="sm"
        iconName="ArrowLeft"
        iconPosition="left"
        onClick={handleBackToCatalog}
        className="text-muted-foreground hover:text-foreground"
      >
        Back to Plant Catalog
      </Button>
    </div>
  );
};

export default BackToCatalog;