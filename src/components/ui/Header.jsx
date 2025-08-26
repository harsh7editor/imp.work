import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = ({ user = null, onAuthToggle = () => {}, onSearchChange = () => {}, searchQuery = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const adminMenuRef = useRef(null);

  const navigationItems = [
    { label: 'Plant Catalog', path: '/plant-catalog-browse', icon: 'Leaf' },
    { label: 'Search Results', path: '/search-results', icon: 'Search' },
    { label: 'Plant Details', path: '/plant-detail-view', icon: 'Eye' },
  ];

  const adminItems = [
    { label: 'Admin Login', path: '/authentication-portal', icon: 'LogIn', adminOnly: false },
    { label: 'Plant Management', path: '/admin-plant-management', icon: 'Settings', adminOnly: true },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setIsSearchExpanded(false);
      }
      if (adminMenuRef?.current && !adminMenuRef?.current?.contains(event?.target)) {
        setIsAdminMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsSearchExpanded(false);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate('/search-results');
      setIsSearchExpanded(false);
    }
  };

  const handleSearchChange = (e) => {
    onSearchChange(e?.target?.value);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const Logo = () => (
    <div 
      className="flex items-center cursor-pointer transition-opacity duration-200 hover:opacity-80"
      onClick={() => handleNavigation('/plant-catalog-browse')}
    >
      <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg mr-3">
        <Icon name="Leaf" size={24} color="white" />
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-heading font-semibold text-foreground">
          PlantCatalog Pro
        </h1>
        <p className="text-xs font-caption text-muted-foreground -mt-1">
          Botanical Excellence
        </p>
      </div>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-elevation-1">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                size="sm"
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                onClick={() => handleNavigation(item?.path)}
                className="font-body"
              >
                {item?.label}
              </Button>
            ))}
          </nav>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search plants..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-2 w-full"
                />
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
              </div>
            </form>
          </div>

          {/* Desktop Admin Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="relative" ref={adminMenuRef}>
              <Button
                variant="ghost"
                size="sm"
                iconName={user ? "User" : "LogIn"}
                iconPosition="left"
                iconSize={16}
                onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                className="font-body"
              >
                {user ? 'Admin' : 'Login'}
              </Button>
              
              {isAdminMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 animate-slide-down">
                  <div className="py-2">
                    {adminItems?.map((item) => {
                      if (item?.adminOnly && !user) return null;
                      return (
                        <button
                          key={item?.path}
                          onClick={() => {
                            handleNavigation(item?.path);
                            setIsAdminMenuOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm font-body text-popover-foreground hover:bg-muted transition-colors duration-200 flex items-center"
                        >
                          <Icon name={item?.icon} size={16} className="mr-3" />
                          {item?.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="sm"
              iconName="Search"
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            />
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {isSearchExpanded && (
          <div className="lg:hidden py-4 border-t border-border animate-slide-down" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search plants..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-3 w-full"
                  autoFocus
                />
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
              </div>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-slide-down">
            <nav className="space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full px-4 py-3 text-left font-body transition-colors duration-200 rounded-lg flex items-center ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} className="mr-3" />
                  {item?.label}
                </button>
              ))}
              
              <div className="border-t border-border pt-2 mt-4">
                {adminItems?.map((item) => {
                  if (item?.adminOnly && !user) return null;
                  return (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className="w-full px-4 py-3 text-left font-body text-foreground hover:bg-muted transition-colors duration-200 rounded-lg flex items-center"
                    >
                      <Icon name={item?.icon} size={18} className="mr-3" />
                      {item?.label}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;