import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MapPin, Clock, Star, Users, ChevronDown,
  UtensilsCrossed, Calendar, ArrowRight, Wifi
} from 'lucide-react';
import FloatingLeaves from '../../../components/animations/FloatingLeaves';
import SteamEffect from '../../../components/animations/SteamEffect';
import { CAFE_INFO } from '../../../data/offers';
import { db } from '../../../lib/db';
import { supabase } from '../../../lib/supabase';

const HERO_BG = '/assets/images/gallery/cafe_indoor_dining.jpg';

const STATUS_STATES = [
  { label: 'Peaceful', color: '#22C55E', bg: 'rgba(34,197,94,0.15)', dot: '#22C55E', wait: '5 min' },
  { label: 'Moderate', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)', dot: '#F59E0B', wait: '15 min' },
  { label: 'Busy', color: '#EF4444', bg: 'rgba(239,68,68,0.12)', dot: '#EF4444', wait: '25 min' },
];

const HeroSection = () => {
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    const fetchCrowd = async () => {
      const data = await db.crowd.get();
      setStatusIdx(data.current_level);
    };
    fetchCrowd();

    if (db.isCloudMode() && supabase) {
      const channel = supabase
        .channel('hero-crowd-sync')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'crowd_status' }, (payload) => {
          if (payload.new && typeof payload.new.current_level === 'number') {
            setStatusIdx(payload.new.current_level);
          }
        })
        .subscribe();
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  const status = STATUS_STATES[statusIdx] || STATUS_STATES[0];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt="Chaipal Garden Cafe ambience"
          className="w-full h-full object-cover scale-105"
          loading="eager"
          style={{ filter: 'brightness(0.9)' }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(8,16,6,0.95) 0%, rgba(20,40,18,0.85) 45%, rgba(60,30,8,0.68) 100%)',
          }}
        />
      </div>

      {/* Floating Leaves */}
      <FloatingLeaves count={12} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 max-w-3xl">
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-bold mb-8 border backdrop-blur-md"
              style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E', borderColor: 'rgba(34,197,94,0.2)' }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ background: '#22C55E' }}
              />
              Now {status.label} · Est. wait: {status.wait}
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.05] drop-shadow-lg"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Where Conversations{' '}
              <span
                className="italic text-gradient-gold block sm:inline"
              >
                Brew
              </span>{' '}
              with Chai
            </motion.h1>

            {/* Sub text */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/80 text-xl md:text-2xl mb-10 max-w-2xl leading-relaxed font-medium drop-shadow"
            >
              A lush garden cafe in the heart of Jaipur — premium chai, soul food, and the perfect
              atmosphere for work, dates, and everything in between.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center gap-6 mb-12"
            >
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-xl">★</span>
                <span className="text-white font-extrabold text-xl">{CAFE_INFO.rating}</span>
                <span className="text-white/60 text-sm">({CAFE_INFO.reviewCount} reviews)</span>
              </div>
              <div className="w-px h-5 bg-white/20" />
              <div className="flex items-center gap-2.5 text-white/85 text-sm font-medium">
                <Clock className="w-4 h-4 text-accent" />
                <span>{CAFE_INFO.hours.open} – {CAFE_INFO.hours.close}</span>
              </div>
              <div className="w-px h-5 bg-white/20" />
              <div className="flex items-center gap-2.5 text-white/85 text-sm font-medium">
                <UtensilsCrossed className="w-4 h-4 text-accent" />
                <span>{CAFE_INFO.priceRange} / person</span>
              </div>
              <div className="w-px h-5 bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-2.5 text-white/85 text-sm font-medium">
                <Wifi className="w-4 h-4 text-accent" />
                <span>Free WiFi</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/menu"
                id="hero-explore-menu"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-extrabold transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #F0C948)',
                  color: '#1A1A1A',
                  boxShadow: '0 6px 24px rgba(212,175,55,0.45)',
                }}
              >
                <UtensilsCrossed className="w-5 h-5" /> Explore Menu
              </Link>
              <Link
                to="/reserve"
                id="hero-reserve-table"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-bold border-2 border-white/40 text-white transition-all duration-300 hover:bg-white/15 hover:-translate-y-1 backdrop-blur-sm"
              >
                <Calendar className="w-5 h-5" /> Reserve Table
              </Link>
              <a
                href="#live-status"
                id="hero-live-crowd"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold border border-white/20 text-white/90 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 backdrop-blur-sm"
              >
                <Users className="w-5 h-5" /> Live Crowd
              </a>
              <a
                href={`https://maps.google.com/?q=Chaipal+Garden+Cafe+Jaipur`}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-directions"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold border border-white/20 text-white/90 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 backdrop-blur-sm"
              >
                <MapPin className="w-5 h-5" /> Get Directions
              </a>
            </motion.div>
          </div>

          {/* Right side: Animated Tea Cup */}
          <div className="lg:col-span-4 hidden lg:flex justify-center items-center relative h-96">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="relative"
            >
              {/* Steam rising */}
              <SteamEffect className="absolute -top-20 left-1/2 -translate-x-1/2 w-28 h-28 z-10" />
              
              {/* Glowing aura under the cup */}
              <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full scale-125 animate-pulse-slow" />
              
              {/* SVG Premium Tea Cup */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-20 filter drop-shadow-[0_15px_30px_rgba(212,175,55,0.35)]"
              >
                <svg width="220" height="160" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Saucer */}
                  <ellipse cx="60" cy="80" rx="45" ry="8" fill="url(#saucerGrad)" />
                  <ellipse cx="60" cy="79" rx="35" ry="5" fill="#1A2E17" opacity="0.8" />
                  
                  {/* Cup Shadow */}
                  <ellipse cx="60" cy="74" rx="28" ry="4" fill="rgba(0,0,0,0.35)" />
                  
                  {/* Cup Handle */}
                  <path d="M78 30 C95 30 95 60 78 60" stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round" />
                  <path d="M78 35 C90 35 90 55 78 55" stroke="#101F0E" strokeWidth="3" />

                  {/* Cup Body */}
                  <path d="M30 25 C30 65 38 75 60 75 C82 75 90 65 90 25 Z" fill="url(#cupGrad)" stroke="url(#goldGrad)" strokeWidth="2.5" />
                  
                  {/* Cup Leaf Decoration */}
                  <path d="M50 50 C55 45 65 45 70 50 C65 55 55 55 50 50 Z" fill="#D4AF37" opacity="0.85" />
                  <path d="M60 42 C61 48 61 54 60 60" stroke="#1A2B18" strokeWidth="1.5" />
                  
                  {/* Rim Highlight */}
                  <ellipse cx="60" cy="25" rx="30" ry="4" fill="url(#rimGrad)" stroke="url(#goldGrad)" strokeWidth="1.5" />
                  
                  {/* Tea Surface */}
                  <ellipse cx="60" cy="25" rx="27" ry="2.5" fill="#8B4513" />
                  <ellipse cx="58" cy="25" rx="22" ry="1.8" fill="url(#teaGrad)" />
                  
                  {/* Gradients */}
                  <defs>
                    <linearGradient id="cupGrad" x1="30" y1="25" x2="90" y2="75" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#1E3719" />
                      <stop offset="100%" stopColor="#0B1309" />
                    </linearGradient>
                    <linearGradient id="goldGrad" x1="30" y1="25" x2="90" y2="75" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#F0C948" />
                      <stop offset="50%" stopColor="#D4AF37" />
                      <stop offset="100%" stopColor="#8B6508" />
                    </linearGradient>
                    <linearGradient id="saucerGrad" x1="15" y1="80" x2="105" y2="80" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#8B4513" />
                      <stop offset="50%" stopColor="#D4AF37" />
                      <stop offset="100%" stopColor="#8B4513" />
                    </linearGradient>
                    <linearGradient id="rimGrad" x1="30" y1="25" x2="90" y2="25" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#2D4A27" />
                      <stop offset="50%" stopColor="#D4AF37" />
                      <stop offset="100%" stopColor="#2D4A27" />
                    </linearGradient>
                    <linearGradient id="teaGrad" x1="36" y1="25" x2="80" y2="25" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#A0522D" />
                      <stop offset="100%" stopColor="#D2691E" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
