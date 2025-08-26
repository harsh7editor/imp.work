import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SearchResults from './pages/search-results';
import AuthenticationPortal from './pages/authentication-portal';
import PlantDetailView from './pages/plant-detail-view';
import PlantCatalogBrowse from './pages/plant-catalog-browse';
import AdminPlantManagement from './pages/admin-plant-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminPlantManagement />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/authentication-portal" element={<AuthenticationPortal />} />
        <Route path="/plant-detail-view" element={<PlantDetailView />} />
        <Route path="/plant-catalog-browse" element={<PlantCatalogBrowse />} />
        <Route path="/admin-plant-management" element={<AdminPlantManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
