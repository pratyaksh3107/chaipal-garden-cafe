import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Leaf, Phone, Sun, Moon } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Reserve', path: '/reserve' },
  { label: 'About', path: '/#story' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isTransparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparent
            ? 'bg-transparent py-4'
            : 'bg-background/95 backdrop-blur-xl shadow-elevated border-b border-border py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20 md:h-24 transition-all duration-500">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3.5 group">
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #2D4A27, #8B4513)' }}
                whileHover={{ rotate: 15, scale: 1.08 }}
                transition={{ duration: 0.3 }}
              >
                <Leaf className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </motion.div>
              <div>
                <span
                  className={`text-2xl md:text-3xl font-extrabold leading-none block transition-colors duration-300 ${
                    isTransparent ? 'text-white' : 'text-primary'
                  }`}
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Chaipal
                </span>
                <span
                  className={`text-xs md:text-sm leading-none block tracking-widest uppercase transition-colors duration-300 mt-0.5 ${
                    isTransparent ? 'text-white/80' : 'text-muted-foreground'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Garden Cafe
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-5 py-2.5 text-base font-semibold rounded-full transition-all duration-300 ${
                      isTransparent
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : isActive
                        ? 'text-primary bg-primary/5'
                        : 'text-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {link.label}
                    {isActive && !isTransparent && (
                      <motion.div
                        className="absolute -bottom-0.5 left-5 right-5 h-0.5 rounded-full bg-primary"
                        layoutId="nav-underline"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                id="dark-mode-toggle"
                onClick={() => setDarkMode(!darkMode)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isTransparent ? 'text-white/80 hover:bg-white/15' : 'text-foreground hover:bg-muted'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <Link
                to="/reserve"
                id="header-reserve-btn"
                className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-base font-bold transition-all duration-300 hover:-translate-y-0.5 shadow-gold hover:shadow-gold-xl"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #F0C948)',
                  color: '#1A1A1A',
                }}
              >
                Reserve Table
              </Link>

              <button
                id="mobile-menu-btn"
                className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isTransparent ? 'text-white/80 hover:bg-white/15' : 'text-foreground hover:bg-muted'
                }`}
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-72 z-[51] lg:hidden flex flex-col"
              style={{ background: '#0F1A0D' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #2D4A27, #8B4513)' }}
                  >
                    <Leaf className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Chaipal
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex flex-col gap-1 p-5 flex-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                        location.pathname === link.path
                          ? 'text-white bg-white/12'
                          : 'text-white/65 hover:text-white hover:bg-white/8'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-5 border-t border-white/10 space-y-3">
                <a
                  href="tel:+918000971969"
                  className="flex items-center gap-2 text-white/55 hover:text-white text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" /> +91 80009 71969
                </a>
                <Link
                  to="/reserve"
                  className="block w-full text-center py-3 rounded-full text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, #D4AF37, #F0C948)', color: '#1A1A1A' }}
                >
                  Reserve a Table
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;