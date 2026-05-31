import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../../../components/animations/ScrollReveal';
import { FEATURED_ITEMS } from '../../../data/menu';

const MenuCard = ({ item, index }) => (
  <StaggerItem>
    <motion.div
      className="relative bg-card rounded-2xl overflow-hidden cursor-pointer group flex-shrink-0"
      style={{
        width: '220px',
        boxShadow: '0 4px 20px rgba(45,74,39,0.08)',
      }}
      whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(45,74,39,0.18)' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image */}
      <div className="relative h-36 overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {item.bestseller && (
            <span className="badge-bestseller text-[10px]">⭐ Bestseller</span>
          )}
          {item.spicy > 1 && (
            <span className="badge-spicy text-[10px]">🌶️ Spicy</span>
          )}
        </div>
        {/* Veg indicator */}
        <div className="absolute top-2 right-2">
          <div
            className="w-5 h-5 rounded border-2 flex items-center justify-center"
            style={{
              borderColor: item.isVeg ? '#22C55E' : '#EF4444',
              background: 'white',
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: item.isVeg ? '#22C55E' : '#EF4444' }}
            />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3
          className="font-bold text-foreground text-sm mb-0.5 truncate"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          {item.name}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold text-sm">₹{item.price}</span>
          <Link
            to="/menu"
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ background: 'linear-gradient(135deg, #2D4A27, #3d6235)', color: 'white' }}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  </StaggerItem>
);

const FeaturedMenuSection = () => {
  return (
    <section id="featured-menu" className="section-pad bg-section-warm">
      <div className="container-max">
        <ScrollReveal className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="section-label">Trending Today</p>
            <h2 className="section-title">Most Loved Picks</h2>
            <p className="section-subtitle">
              Handpicked favourites by our regular customers — you can't go wrong with these.
            </p>
          </div>
          <Link
            to="/menu"
            id="featured-view-all"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200"
          >
            View Full Menu <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>

        {/* Horizontal scroll */}
        <StaggerContainer
          className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
          staggerDelay={0.08}
        >
          {FEATURED_ITEMS.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </StaggerContainer>

        {/* CTA */}
        <ScrollReveal className="text-center mt-12">
          <Link
            to="/menu"
            id="featured-full-menu-cta"
            className="btn-primary inline-flex"
          >
            <UtensilsCrossed className="w-4 h-4" /> Explore Full Menu
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FeaturedMenuSection;
