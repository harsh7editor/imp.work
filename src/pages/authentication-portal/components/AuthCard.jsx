import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthCard = ({ children }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-xl shadow-elevation-2 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-xl mx-auto mb-4">
            <Icon name="Shield" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
            Admin Portal
          </h1>
          <p className="text-muted-foreground font-body">
            Sign in to manage your plant catalog
          </p>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default AuthCard;