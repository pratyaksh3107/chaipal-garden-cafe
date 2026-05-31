import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import AIChatbot from "components/chatbot/AIChatbot";
import NotFound from "pages/NotFound";

// Pages
import HomePage from "pages/home";
import MenuPage from "pages/menu";
import ReservationPage from "pages/reservation";
import GalleryPage from "pages/gallery";
import AdminPage from "pages/admin";
import QRMenuPage from "pages/qr-menu";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Main Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reserve" element={<ReservationPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/qr/:tableId" element={<QRMenuPage />} />

          {/* Legacy route aliases (from previous stub pages) */}
          <Route path="/hero-experience-zone" element={<HomePage />} />
          <Route path="/complete-menu-experience" element={<MenuPage />} />
          <Route path="/booking-contact-form" element={<ReservationPage />} />
          <Route path="/special-offers-gallery" element={<HomePage />} />
          <Route path="/location-contact-hub" element={<HomePage />} />
          <Route path="/brand-highlights-showcase" element={<HomePage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>

        {/* Global: AI Chatbot (shown on all pages except admin) */}
        <AIChatbot />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
