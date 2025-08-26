import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted'
    },
    {
      icon: 'Lock',
      text: 'Secure Login'
    },
    {
      icon: 'Eye',
      text: 'Privacy Protected'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="flex items-center justify-center space-x-6">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 text-muted-foreground">
            <Icon name={feature?.icon} size={16} />
            <span className="text-xs font-body">{feature?.text}</span>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <p className="text-xs text-muted-foreground font-body">
          By signing in, you agree to our{' '}
          <button className="text-primary hover:text-primary/80 transition-colors">
            Privacy Policy
          </button>
          {' '}and{' '}
          <button className="text-primary hover:text-primary/80 transition-colors">
            Terms of Service
          </button>
        </p>
      </div>
    </div>
  );
};

export default SecurityBadges;