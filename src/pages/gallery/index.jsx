import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Filter } from 'lucide-react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../../components/animations/ScrollReveal';

const ALL_IMAGES = [
  { id: 1, src: '/assets/images/gallery/cafe_indoor_dining.jpg', tag: 'Ambience', alt: 'Cozy indoor dining area with warm lights' },
  { id: 2, src: '/assets/images/gallery/cafe_garden_dusk.jpg', tag: 'Ambience', alt: 'Beautiful garden seating at sunset' },
  { id: 3, src: '/assets/images/gallery/cafe_outdoor_day.jpg', tag: 'Ambience', alt: 'Lush outdoor porch and lawn seating' },
  { id: 4, src: '/assets/images/gallery/cafe_garden_day.jpg', tag: 'Ambience', alt: 'Garden tables and metal mesh chairs' },
  { id: 5, src: '/assets/images/gallery/cafe_garden_sunny.jpg', tag: 'Ambience', alt: 'Lawn seating with comfortable wicker chairs' },
  { id: 6, src: '/assets/images/gallery/cafe_entrance_night.png', tag: 'Ambience', alt: 'Main entrance gate lit up at night' },
  
  { id: 7, src: '/assets/images/food/food_chur_chur_naan_platter.jpg', tag: 'Food', alt: 'Clay-oven stuffed Chur Chur Naan platter' },
  { id: 8, src: '/assets/images/food/food_dahi_bhalla.png', tag: 'Food', alt: 'Delicious sweet-yogurt Dahi Bhalla' },
  { id: 9, src: '/assets/images/food/food_idli_plate.jpg', tag: 'Food', alt: 'Traditional South Indian steamed idlis' },
  { id: 10, src: '/assets/images/food/food_garlic_bread.jpg', tag: 'Food', alt: 'Cheesy toasted Garlic Bread slices' },
  { id: 11, src: '/assets/images/food/food_chole_bhature.jpg', tag: 'Food', alt: 'Crispy puffed Bhature with rich Punjabi chole' },
  { id: 12, src: '/assets/images/food/food_dabeli_sliders.png', tag: 'Food', alt: 'Garnished bite-size Mini Dabeli Sliders' },
  
  { id: 13, src: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80', tag: 'Drinks', alt: 'Traditional clay cup Kulhad Chai' },
  { id: 14, src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80', tag: 'Drinks', alt: 'Frothy Cold Brew coffee' },
  { id: 15, src: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80', tag: 'Drinks', alt: 'Rich chocolate milkshake' },
];

const TAGS = ['All', 'Ambience', 'Food', 'Drinks'];

const GalleryPage = () => {
  const [activeTag, setActiveTag] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeTag === 'All' ? ALL_IMAGES : ALL_IMAGES.filter(img => img.tag === activeTag);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section
        className="pt-32 pb-16 px-4 text-white text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F1A0D 0%, #2D4A27 100%)' }}
      >
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
          Visual Stories
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold mb-4"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Our Gallery
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-white/60">
          Moments of warmth, flavour, and life at Chaipal Garden Cafe.
        </motion.p>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Filter tabs */}
        <ScrollReveal className="flex items-center justify-center gap-3 mb-10 flex-wrap">
          {TAGS.map(tag => (
            <button
              key={tag}
              id={`gallery-filter-${tag.toLowerCase()}`}
              onClick={() => setActiveTag(tag)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeTag === tag
                  ? 'text-white border-transparent'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
              }`}
              style={activeTag === tag ? { background: 'linear-gradient(135deg, #2D4A27, #3d6235)' } : {}}
            >
              {tag}
              <span className="ml-2 text-xs opacity-60">
                ({tag === 'All' ? ALL_IMAGES.length : ALL_IMAGES.filter(i => i.tag === tag).length})
              </span>
            </button>
          ))}
        </ScrollReveal>

        {/* Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          >
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="break-inside-avoid relative overflow-hidden rounded-xl cursor-pointer group"
                onClick={() => setLightbox(img)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-white/80 bg-black/30 px-2 py-0.5 rounded-full">{img.tag}</span>
                  <p className="text-white/90 text-xs mt-1">{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.alt} className="w-full h-full object-contain max-h-[80vh]" />
              <button
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                onClick={() => setLightbox(null)}
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/50 text-white">{lightbox.tag}</span>
                <span className="text-white/80 text-xs">{lightbox.alt}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default GalleryPage;
