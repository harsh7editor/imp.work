import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AuthCard from './components/AuthCard';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import BackToCatalog from './components/BackToCatalog';

const AuthenticationPortal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Mock admin credentials
  const mockCredentials = {
    email: 'admin@plantcatalog.com',
    password: 'admin123'
  };

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('plantCatalogUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      navigate('/admin-plant-management');
    }
  }, [navigate]);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Validate credentials
      if (
        formData?.email === mockCredentials?.email &&
        formData?.password === mockCredentials?.password
      ) {
        const userData = {
          id: 1,
          email: formData?.email,
          name: 'Admin User',
          role: 'admin',
          loginTime: new Date()?.toISOString()
        };

        // Save user data
        if (formData?.rememberMe) {
          localStorage.setItem('plantCatalogUser', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('plantCatalogUser', JSON.stringify(userData));
        }

        setUser(userData);
        navigate('/admin-plant-management');
      } else {
        setError('Invalid email or password. Please use admin@plantcatalog.com with password admin123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - PlantCatalog Pro</title>
        <meta name="description" content="Secure admin access to plant catalog management system" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header user={user} />
        
        <main className="pt-16 lg:pt-20 pb-12">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center">
              <BackToCatalog />
              
              <AuthCard>
                <LoginForm
                  onSubmit={handleLogin}
                  isLoading={isLoading}
                  error={error}
                />
                <SecurityBadges />
              </AuthCard>

              {/* Demo Credentials Info */}
              <div className="mt-8 max-w-md mx-auto">
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-foreground mb-2">Demo Credentials</h3>
                  <div className="space-y-1 text-xs text-muted-foreground font-mono">
                    <p>Email: admin@plantcatalog.com</p>
                    <p>Password: admin123</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AuthenticationPortal;