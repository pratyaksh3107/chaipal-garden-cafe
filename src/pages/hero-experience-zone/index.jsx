import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HeroContent from './components/HeroContent';
import LocationQuickInfo from './components/LocationQuickInfo';
import TrustSignals from './components/TrustSignals';

const HeroExperienceZone = () => {
  const navigate = useNavigate();

  const handleWhatsAppOrder = () => {
    window.open('https://wa.me/919876543210?text=Hi! I would like to place an order from Chai Pal Garden Cafe', '_blank');
  };

  const handleCallNow = () => {
    window.location.href = 'tel:+919876543210';
  };

  const handleViewMenu = () => {
    navigate('/complete-menu-experience');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <HeroContent 
          onWhatsAppOrder={handleWhatsAppOrder}
          onCallNow={handleCallNow}
          onViewMenu={handleViewMenu}
        />
        
        <LocationQuickInfo />
        
        <TrustSignals />
      </main>
    </div>
  );
};

export default HeroExperienceZone;