import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import HeroSection from './sections/HeroSection';
import LiveStatusSection from './sections/LiveStatusSection';
import FeaturedMenuSection from './sections/FeaturedMenuSection';
import TestimonialsSection from './sections/TestimonialsSection';
import OffersSection from './sections/OffersSection';
import GalleryPreviewSection from './sections/GalleryPreviewSection';
import StorySection from './sections/StorySection';
import LocationSection from './sections/LocationSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedMenuSection />
        <OffersSection />
        <TestimonialsSection />
        <GalleryPreviewSection />
        <StorySection />
        <LiveStatusSection />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
