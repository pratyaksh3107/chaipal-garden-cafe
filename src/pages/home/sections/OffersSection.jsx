import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Tag } from 'lucide-react';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../../../components/animations/ScrollReveal';
import { OFFERS } from '../../../data/offers';
import { db } from '../../../lib/db';

const CountdownTimer = ({ targetHour = 17 }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(targetHour, 0, 0, 0);
      if (now > target) target.setDate(target.getDate() + 1);
      const diff = Math.max(0, target - now);
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetHour]);

  const pad = n => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-1.5 text-xs font-mono">
      {[pad(timeLeft.hours), pad(timeLeft.minutes), pad(timeLeft.seconds)].map((t, i, arr) => (
        <span key={i} className="flex items-center gap-1.5">
          <span
            className="px-2.5 py-1 rounded-lg font-extrabold text-[11px]"
            style={{ background: 'rgba(0,0,0,0.25)', color: 'inherit' }}
          >
            {t}
          </span>
          {i < arr.length - 1 && <span className="opacity-70">:</span>}
        </span>
      ))}
    </div>
  );
};

const OfferCard = ({ offer }) => {
  const isGold = offer.id === 'chai-combo';

  return (
    <StaggerItem>
      <motion.div
        className="relative rounded-3xl p-7 overflow-hidden cursor-pointer group flex flex-col justify-between h-full border border-white/5"
        style={{
          background: isGold
            ? 'linear-gradient(135deg, #D4AF37 0%, #F0C948 100%)'
            : 'linear-gradient(135deg, #182C15 0%, #0B1309 100%)',
          boxShadow: isGold
            ? '0 10px 30px rgba(212,175,55,0.25)'
            : '0 10px 30px rgba(45,74,39,0.15)',
        }}
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Background emoji decoration */}
        <div className="absolute -right-4 -top-4 text-8xl opacity-10 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none select-none">
          {offer.emoji}
        </div>

        {/* Shine highlight on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)',
          }}
        />

        <div className="relative flex-1 flex flex-col justify-between">
          <div>
            {/* Badge */}
            <span
              className="inline-flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-bold px-3 py-1 rounded-full mb-5"
              style={{
                background: isGold ? 'rgba(0,0,0,0.1)' : 'rgba(212,175,55,0.15)',
                color: isGold ? '#1A1A1A' : '#D4AF37',
                border: isGold ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(212,175,55,0.2)'
              }}
            >
              {offer.badge}
            </span>

            {/* Discount Percentage */}
            <div
              className="text-4xl md:text-5xl font-black mb-3 leading-none"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                color: isGold ? '#1A1A1A' : '#D4AF37',
              }}
            >
              {offer.discount_percentage || offer.discount}
            </div>

            <h3
              className="text-xl font-bold mb-1.5"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                color: isGold ? '#1A1A1A' : 'white',
              }}
            >
              {offer.title}
            </h3>

            <p
              className="text-sm mb-3 font-semibold"
              style={{ color: isGold ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.7)' }}
            >
              {offer.subtitle}
            </p>

            <p
              className="text-xs leading-relaxed mb-6 font-medium"
              style={{ color: isGold ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.55)' }}
            >
              {offer.description}
            </p>
          </div>

          <div className="mt-auto">
            {/* Timer for Happy Hour */}
            {offer.id === 'happy-hour' && (
              <div
                className="flex items-center gap-2 mb-5 py-2.5 px-3.5 rounded-xl border border-white/5 bg-black/10"
                style={{ color: 'rgba(255,255,255,0.75)' }}
              >
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-xs font-semibold">Ends in:</span>
                <CountdownTimer targetHour={17} />
              </div>
            )}

            <div
              className="inline-flex items-center gap-1.5 text-xs font-extrabold"
              style={{ color: isGold ? '#1A1A1A' : '#D4AF37' }}
            >
              Claim Offer <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        </div>
      </motion.div>
    </StaggerItem>
  );
};

const OffersSection = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const data = await db.offers.getAll();
      setOffers(data);
    };
    fetchOffers();
  }, []);

  const activeOffers = offers.filter(o => {
    if (o.active === false) return false;
    if (o.expiry_date) {
      const expiry = new Date(o.expiry_date);
      if (expiry < new Date()) return false;
    }
    return true;
  });

  if (activeOffers.length === 0) return null;

  return (
    <section id="offers" className="section-pad bg-section-warm border-t border-b border-border/10">
      <div className="container-max">
        <ScrollReveal className="text-center mb-12">
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <Tag className="w-4 h-4 text-accent" />
            <p className="section-label mb-0">Exclusive Deals</p>
          </div>
          <h2 className="section-title">Special Offers Just for You</h2>
          <p className="section-subtitle mx-auto">
            Great conversations start with great chai, and they taste even better with our handpicked daily deals.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
          {activeOffers.map(offer => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default OffersSection;
