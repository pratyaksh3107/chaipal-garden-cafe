import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ZoomIn } from 'lucide-react';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../../../components/animations/ScrollReveal';

const GALLERY_IMAGES = [
  {
    id: 1, src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
    alt: 'Chai garden ambience', tag: 'Ambience', span: 'col-span-2 row-span-2',
  },
  {
    id: 2, src: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
    alt: 'Masala chai in kulhad', tag: 'Drinks', span: '',
  },
  {
    id: 3, src: 'https://images.unsplash.com/photo-1517701604599-bb29b565090b?w=600&q=80',
    alt: 'Cosy garden seating', tag: 'Ambience', span: '',
  },
  {
    id: 4, src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    alt: 'Cold coffee', tag: 'Drinks', span: '',
  },
  {
    id: 5, src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
    alt: 'Paneer tikka pizza', tag: 'Food', span: '',
  },
  {
    id: 6, src: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80',
    alt: 'Street food platter', tag: 'Food', span: '',
  },
  {
    id: 7, src: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80',
    alt: 'Premium milkshake', tag: 'Drinks', span: '',
  },
  {
    id: 8, src: 'https://images.unsplash.com/photo-1517701604599-bb29b565090b?w=600&q=80',
    alt: 'Evening garden lights', tag: 'Ambience', span: '',
  },
  {
    id: 9, src: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80',
    alt: 'Sizzler platter', tag: 'Food', span: '',
  },
];

const GalleryPreviewSection = () => {
  const [lightboxImg, setLightboxImg] = useState(null);

  return (
    <section id="gallery-preview" className="section-pad" style={{ background: '#FAF7F0' }}>
      <div className="container-max">
        <ScrollReveal className="text-center mb-12">
          <p className="section-label">Visual Stories</p>
          <h2 className="section-title">A Glimpse of Our World</h2>
          <p className="section-subtitle mx-auto">
            Every corner of Chaipal tells a story. Come see it for yourself.
          </p>
        </ScrollReveal>

        {/* Masonry Grid */}
        <StaggerContainer
          className="grid grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[160px]"
          staggerDelay={0.06}
        >
          {GALLERY_IMAGES.map((img, i) => (
            <StaggerItem
              key={img.id}
              className={`${img.span || ''} relative overflow-hidden rounded-xl cursor-pointer group`}
              onClick={() => setLightboxImg(img)}
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ZoomIn className="w-5 h-5 text-white" />
                </motion.div>
              </div>
              {/* Tag */}
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/50 text-white backdrop-blur-sm">
                  {img.tag}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal className="text-center mt-10">
          <Link
            to="/gallery"
            id="gallery-view-all-btn"
            className="btn-primary inline-flex"
          >
            View Full Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative max-w-3xl w-full max-h-[80vh] rounded-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightboxImg.src}
                alt={lightboxImg.alt}
                className="w-full h-full object-contain"
              />
              <button
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                onClick={() => setLightboxImg(null)}
                aria-label="Close lightbox"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm">
                  {lightboxImg.tag} · {lightboxImg.alt}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryPreviewSection;
