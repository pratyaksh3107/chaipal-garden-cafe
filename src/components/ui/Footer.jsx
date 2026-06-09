import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, MapPin, Clock, Phone, Mail, Instagram, Facebook, Twitter, Heart } from 'lucide-react';
import { CAFE_INFO } from '../../data/offers';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0F1A0D 0%, #071007 100%)' }}
    >
      {/* Decorative top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(45,74,39,0.3) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #2D4A27, #8B4513)' }}
              >
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <span
                  className="text-xl font-bold text-white block leading-none"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Chaipal
                </span>
                <span className="text-[10px] text-white/50 block tracking-widest uppercase">
                  Garden Cafe
                </span>
              </div>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed mb-5">
              A garden oasis in the heart of Jaipur where every cup of chai tells a story.
              Come for the chai, stay for the vibe.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { href: CAFE_INFO.socialMedia.instagram, Icon: Instagram, label: 'Instagram' },
                { href: CAFE_INFO.socialMedia.facebook, Icon: Facebook, label: 'Facebook' },
                { href: CAFE_INFO.socialMedia.twitter, Icon: Twitter, label: 'Twitter' },
              ].map(({ href, Icon: SocialIcon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                  whileHover={{ scale: 1.15, borderColor: '#D4AF37' }}
                >
                  <SocialIcon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-white/90 font-semibold mb-5 text-sm tracking-wider uppercase"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '16px' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Our Menu', path: '/menu' },
                { label: 'Reserve a Table', path: '/reserve' },
                { label: 'Photo Gallery', path: '/gallery' },
                { label: 'Special Offers', path: '/#offers' },
                { label: 'Our Story', path: '/#story' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4
              className="text-white/90 font-semibold mb-5 tracking-wider uppercase"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '16px' }}
            >
              Hours & Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/80 text-sm font-medium">{CAFE_INFO.hours.days}</p>
                  <p className="text-white/50 text-sm">
                    {CAFE_INFO.hours.open} – {CAFE_INFO.hours.close}
                  </p>
                </div>
              </div>
              <a
                href={`tel:${CAFE_INFO.phone}`}
                className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors group"
              >
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="group-hover:text-accent transition-colors">{CAFE_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${CAFE_INFO.email}`}
                className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors group"
              >
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="group-hover:text-accent transition-colors">{CAFE_INFO.email}</span>
              </a>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4
              className="text-white/90 font-semibold mb-5 tracking-wider uppercase"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '16px' }}
            >
              Find Us
            </h4>
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <address className="text-white/50 text-sm not-italic leading-relaxed">
                {CAFE_INFO.address.line1}<br />
                {CAFE_INFO.address.line2}<br />
                {CAFE_INFO.address.city}<br />
                {CAFE_INFO.address.state} – {CAFE_INFO.address.pin}
              </address>
            </div>
            <a
              href={`https://maps.google.com/?q=Chaipal+Garden+Cafe+Jaipur`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full transition-all duration-200 hover:-translate-y-0.5"
              style={{
                border: '1px solid rgba(212,175,55,0.4)',
                color: '#D4AF37',
              }}
            >
              <MapPin className="w-3 h-3" /> Get Directions
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-6" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/35 text-xs text-center">
            © {year} Chaipal Garden Cafe, Jaipur. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-white/35 text-xs">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-400 fill-red-400" />
            <span>& ☕ in Jaipur, Rajasthan</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/35 text-xs">Rating:</span>
            <span className="text-accent text-xs font-semibold">★ {CAFE_INFO.rating} / 5.0</span>
            <span className="text-white/35 text-xs">({CAFE_INFO.reviewCount} reviews)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
