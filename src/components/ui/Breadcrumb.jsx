import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Breadcrumb = ({ customItems = null, className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getDefaultBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [
      { label: 'Plant Catalog', path: '/plant-catalog-browse', icon: 'Home' }
    ];

    if (pathSegments?.length === 0 || location?.pathname === '/plant-catalog-browse') {
      return breadcrumbs;
    }

    const routeMap = {
      'search-results': { label: 'Search Results', icon: 'Search' },
      'plant-detail-view': { label: 'Plant Details', icon: 'Eye' },
      'admin-plant-management': { label: 'Plant Management', icon: 'Settings' },
      'authentication-portal': { label: 'Admin Login', icon: 'LogIn' }
    };

    pathSegments?.forEach((segment, index) => {
      const route = routeMap?.[segment];
      if (route) {
        const path = '/' + pathSegments?.slice(0, index + 1)?.join('/');
        breadcrumbs?.push({
          label: route?.label,
          path: path,
          icon: route?.icon
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = customItems || getDefaultBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav 
      className={`flex items-center space-x-1 text-sm font-body ${className}`}
      aria-label="Breadcrumb"
    >
      {breadcrumbs?.map((item, index) => {
        const isLast = index === breadcrumbs?.length - 1;
        const isFirst = index === 0;

        return (
          <React.Fragment key={item?.path || index}>
            {!isFirst && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-muted-foreground mx-1" 
              />
            )}
            {isLast ? (
              <span 
                className="text-foreground font-medium flex items-center truncate"
                aria-current="page"
              >
                {item?.icon && (
                  <Icon 
                    name={item?.icon} 
                    size={14} 
                    className="mr-1.5 flex-shrink-0" 
                  />
                )}
                <span className="truncate">{item?.label}</span>
              </span>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                className="h-auto p-1 text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center min-w-0"
              >
                {item?.icon && (
                  <Icon 
                    name={item?.icon} 
                    size={14} 
                    className="mr-1.5 flex-shrink-0" 
                  />
                )}
                <span className="truncate">{item?.label}</span>
              </Button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;