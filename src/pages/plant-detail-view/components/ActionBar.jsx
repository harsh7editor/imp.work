import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionBar = ({ plant = {}, onWishlistToggle = () => {}, isInWishlist = false }) => {
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist);
  const [showContactForm, setShowContactForm] = useState(false);

  const { stockStatus = 'out-of-stock', price = 0 } = plant;

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    onWishlistToggle(!isWishlisted);
  };

  const handleContactSeller = () => {
    setShowContactForm(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: plant?.name || 'Plant Details',
          text: `Check out this ${plant?.name || 'plant'} for $${price?.toFixed(2)}`,
          url: window.location?.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard?.writeText(window.location?.href);
      // You could show a toast notification here
    }
  };

  const isAvailable = stockStatus === 'in-stock' || stockStatus === 'low-stock';

  return (
    <>
      {/* Desktop Sidebar Action Bar */}
      <div className="hidden lg:block sticky top-24 space-y-4">
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-primary mb-2">
                ${price?.toFixed(2)}
              </div>
              <div className={`text-sm font-body ${
                isAvailable ? 'text-success' : 'text-destructive'
              }`}>
                {isAvailable ? 'Available' : 'Out of Stock'}
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant={isAvailable ? "default" : "outline"}
                fullWidth
                disabled={!isAvailable}
                iconName="MessageCircle"
                iconPosition="left"
                onClick={handleContactSeller}
              >
                Contact Seller
              </Button>

              <Button
                variant={isWishlisted ? "default" : "outline"}
                fullWidth
                iconName={isWishlisted ? "Heart" : "Heart"}
                iconPosition="left"
                onClick={handleWishlistToggle}
                className={isWishlisted ? "bg-destructive hover:bg-destructive/90" : ""}
              >
                {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>

              <Button
                variant="ghost"
                fullWidth
                iconName="Share"
                iconPosition="left"
                onClick={handleShare}
              >
                Share Plant
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Care Tips */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-body font-medium text-foreground mb-3 flex items-center">
            <Icon name="Lightbulb" size={16} className="mr-2 text-warning" />
            Quick Care Tips
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <Icon name="Droplets" size={14} className="mr-2 mt-0.5 text-primary" />
              Water when soil feels dry
            </li>
            <li className="flex items-start">
              <Icon name="Sun" size={14} className="mr-2 mt-0.5 text-warning" />
              Provide adequate lighting
            </li>
            <li className="flex items-start">
              <Icon name="Scissors" size={14} className="mr-2 mt-0.5 text-secondary" />
              Prune dead leaves regularly
            </li>
          </ul>
        </div>
      </div>
      {/* Mobile Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg z-40">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleWishlistToggle}
            className={`flex-shrink-0 ${isWishlisted ? "text-destructive" : ""}`}
          >
            <Icon name="Heart" size={20} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="flex-shrink-0"
          >
            <Icon name="Share" size={20} />
          </Button>

          <Button
            variant={isAvailable ? "default" : "outline"}
            fullWidth
            disabled={!isAvailable}
            iconName="MessageCircle"
            iconPosition="left"
            onClick={handleContactSeller}
          >
            {isAvailable ? `Contact Seller - $${price?.toFixed(2)}` : 'Out of Stock'}
          </Button>
        </div>
      </div>
      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Contact Seller
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowContactForm(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Interested in <strong>{plant?.name}</strong>? Send a message to the seller.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-medium text-foreground">${price?.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Availability:</span>
                  <span className={`font-medium ${isAvailable ? 'text-success' : 'text-destructive'}`}>
                    {isAvailable ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowContactForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  iconName="Mail"
                  iconPosition="left"
                  onClick={() => {
                    // Simulate sending message
                    setShowContactForm(false);
                    // You could show a success toast here
                  }}
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionBar;