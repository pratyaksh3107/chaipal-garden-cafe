import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingBag, Star, Info, LayoutGrid, List, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../../components/animations/ScrollReveal';
import { MENU_ITEMS, MENU_CATEGORIES } from '../../data/menu';
import { db } from '../../lib/db';
import { CAFE_INFO } from '../../data/offers';

const getCourseType = (category) => {
  if (['chai', 'beverages', 'shakes', 'coolers'].includes(category)) return 'drinks';
  if (['naashta', 'sandwiches', 'street-bites', 'maggi', 'pasta', 'pizza', 'healthy', 'conti'].includes(category)) return 'snacks';
  if (['north-indian', 'south-indian', 'desi-chinese', 'sizzlers', 'specials'].includes(category)) return 'main-course';
  return 'snacks';
};

const MenuCard = ({ item, cartQuantity, onAdd, onRemove, viewMode }) => {
  const isAvailable = item.available !== false;

  if (viewMode === 'list') {
    return (
      <StaggerItem>
        <motion.div
          className={`relative p-4 rounded-2xl flex gap-4 transition-all duration-300 ${
            !isAvailable ? 'opacity-65' : ''
          }`}
          style={{
            background: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 12px rgba(45, 74, 39, 0.02)'
          }}
          whileHover={isAvailable ? { y: -2, boxShadow: '0 8px 24px rgba(45, 74, 39, 0.06)' } : {}}
        >
          {/* Left Details */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              {/* Veg Indicator & Bestseller */}
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className="w-4 h-4 rounded border flex items-center justify-center bg-white flex-shrink-0"
                  style={{ borderColor: item.isVeg ? '#22C55E' : '#EF4444' }}
                  title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: item.isVeg ? '#22C55E' : '#EF4444' }}
                  />
                </div>
                {item.bestseller && (
                  <span className="text-[10px] font-bold text-[#D4AF37] flex items-center gap-0.5">
                    ★ Bestseller
                  </span>
                )}
                {item.recommended && (
                  <span className="text-[10px] font-bold text-[#2D4A27] dark:text-green-400 flex items-center gap-0.5">
                    👍 Recommended
                  </span>
                )}
              </div>

              {/* Title & Price */}
              <h3
                className="font-bold text-foreground mb-1 leading-tight flex items-baseline gap-2"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '19px' }}
              >
                <span>{item.name}</span>
                {item.spicy >= 2 && <span className="text-xs" title="Spicy">🌶️</span>}
              </h3>
              
              <p className="text-primary font-black text-lg mb-1">₹{item.price}</p>
              
              <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 pr-2">
                {item.description}
              </p>
            </div>
          </div>

          {/* Right Image & Action Button */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-2xl overflow-hidden bg-muted">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* Out of Stock Overlay */}
            {!isAvailable && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                <span className="text-white font-extrabold text-[10px] tracking-wider uppercase bg-red-600/90 px-2 py-1 rounded">
                  Sold Out
                </span>
              </div>
            )}

            {/* Floating ADD/Quantity control */}
            {isAvailable && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-10 w-[85%] max-w-[90px]">
                {cartQuantity > 0 ? (
                  <div className="flex items-center justify-between bg-primary text-white rounded-lg px-1.5 py-1 shadow-md text-xs font-bold border border-white/10">
                    <button onClick={onRemove} className="w-5 h-5 flex items-center justify-center hover:bg-white/15 rounded">
                      -
                    </button>
                    <span className="w-3 text-center">{cartQuantity}</span>
                    <button onClick={onAdd} className="w-5 h-5 flex items-center justify-center hover:bg-white/15 rounded">
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={onAdd}
                    className="w-full py-1 bg-white text-primary border border-primary/20 hover:border-primary rounded-lg text-xs font-black shadow-md hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-1"
                  >
                    ADD
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </StaggerItem>
    );
  }

  // Grid view
  return (
    <StaggerItem>
      <motion.div
        className={`card-premium group cursor-pointer relative h-full flex flex-col justify-between ${
          !isAvailable ? 'opacity-65' : ''
        }`}
        whileHover={isAvailable ? { y: -4 } : {}}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden bg-muted flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isAvailable ? 'group-hover:scale-105' : ''
            }`}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Out of Stock Overlay */}
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-1">
              <span className="text-white font-extrabold text-xs tracking-wider uppercase bg-red-600/90 px-3.5 py-1.5 rounded-full border border-red-500/20">
                Sold Out
              </span>
              <span className="text-[10px] text-white/70">Back shortly!</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {item.bestseller && (
              <span className="badge-bestseller text-[9px] px-2 py-0.5">⭐ Bestseller</span>
            )}
            {item.spicy >= 2 && (
              <span className="badge-spicy text-[9px] px-2 py-0.5">🌶️ Spicy</span>
            )}
          </div>
          
          {/* Veg/Non-Veg indicator */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <div
              className="w-5 h-5 rounded border-2 bg-white flex items-center justify-center shadow"
              style={{ borderColor: item.isVeg ? '#22C55E' : '#EF4444' }}
              title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: item.isVeg ? '#22C55E' : '#EF4444' }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div className="mb-4">
            <h3
              className="font-bold text-foreground mb-1 leading-tight flex items-center justify-between"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px' }}
            >
              <span>{item.name}</span>
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/10">
            <span className="text-primary font-black text-xl">₹{item.price}</span>
            {isAvailable && (
              <div className="w-24">
                {cartQuantity > 0 ? (
                  <div className="flex items-center justify-between bg-primary text-white rounded-full px-2 py-1 shadow-md text-xs font-bold">
                    <button onClick={onRemove} className="w-5 h-5 flex items-center justify-center hover:bg-white/15 rounded-full">
                      -
                    </button>
                    <span>{cartQuantity}</span>
                    <button onClick={onAdd} className="w-5 h-5 flex items-center justify-center hover:bg-white/15 rounded-full">
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={onAdd}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white hover:-translate-y-0.5 shadow-soft hover:shadow-elevated transition-all"
                    style={{ background: 'linear-gradient(135deg, #2D4A27, #3d6235)' }}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Add
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </StaggerItem>
  );
};

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await db.menu.getAll();
        setMenuItems(data);
      } catch (err) {
        console.error('Failed to load menu:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
    db.analytics.logEvent('page_view', 'menu');
  }, []);

  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [nonVegOnly, setNonVegOnly] = useState(false);
  const [courseFilter, setCourseFilter] = useState('all'); // all, drinks, snacks, main-course
  const [bestsellersOnly, setBestsellersOnly] = useState(false);
  const [recommendedOnly, setRecommendedOnly] = useState(false);
  
  // Custom states for view toggle & shopping cart
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [cart, setCart] = useState({}); // { itemId: quantity }
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [orderType, setOrderType] = useState('dine-in'); // dine-in, takeaway
  const [tableNumber, setTableNumber] = useState('1');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [activeScrollCategory, setActiveScrollCategory] = useState('');

  // Cart operations
  const addToCart = (itemId) => {
    setCart(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCart(prev => {
      const copy = { ...prev };
      if (!copy[itemId]) return prev;
      if (copy[itemId] <= 1) {
        delete copy[itemId];
      } else {
        copy[itemId]--;
      }
      return copy;
    });
  };

  // Cart math
  const cartItemsCount = useMemo(() => {
    return Object.values(cart).reduce((sum, q) => sum + q, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return Object.entries(cart).reduce((sum, [id, q]) => {
      const item = menuItems.find(i => i.id === id);
      return sum + (item ? item.price * q : 0);
    }, 0);
  }, [cart, menuItems]);

  const handlePlaceOrder = () => {
    const itemsList = Object.entries(cart)
      .map(([id, qty]) => {
        const item = menuItems.find(i => i.id === id);
        if (!item) return '';
        return `• ${qty}x ${item.name} (₹${item.price * qty})`;
      })
      .filter(Boolean)
      .join('\n');

    const modeText = orderType === 'dine-in' ? `Dine-In (Table ${tableNumber})` : 'Takeaway / Delivery';
    const notesText = specialInstructions.trim() ? `\n\nNotes: ${specialInstructions.trim()}` : '';

    const msg = `Hi! I'd like to place an order from Chaipal Garden Cafe.\n\nOrder Details:\n${itemsList}\n\nTotal Bill: ₹${cartTotal}\nOrder Type: ${modeText}${notesText}\n\nPlease confirm! ☕`;
    
    const whatsappUrl = `https://wa.me/${CAFE_INFO.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Scrollspy logic
  useEffect(() => {
    if (activeCategory !== 'all') return;
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveScrollCategory('');
        return;
      }
      
      const sections = MENU_CATEGORIES.map(c => document.getElementById(`section-${c.id}`)).filter(Boolean);
      let currentSectionId = '';
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 280) {
          currentSectionId = section.id.replace('section-', '');
        }
      }
      if (currentSectionId) {
        setActiveScrollCategory(currentSectionId);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategory]);

  const scrollToSection = (catId) => {
    if (activeCategory !== 'all') {
      setActiveCategory('all');
      setTimeout(() => {
        const element = document.getElementById(`section-${catId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(`section-${catId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const filtered = useMemo(() => {
    return menuItems.filter(item => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;
      
      // Course filter
      const course = getCourseType(item.category);
      if (courseFilter !== 'all' && course !== courseFilter) return false;
      
      // Veg/Non-veg filter
      if (vegOnly && !item.isVeg) return false;
      if (nonVegOnly && item.isVeg) return false;
      
      // Bestsellers / Recommended
      if (bestsellersOnly && !item.bestseller) return false;
      if (recommendedOnly && !item.recommended) return false;
      
      // Search
      if (search) {
        const q = search.toLowerCase();
        return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
      }
      return true;
    });
  }, [menuItems, activeCategory, courseFilter, vegOnly, nonVegOnly, bestsellersOnly, recommendedOnly, search]);

  const grouped = useMemo(() => {
    if (activeCategory !== 'all') {
      return { [activeCategory]: filtered };
    }
    const map = {};
    filtered.forEach(item => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    });
    return map;
  }, [filtered, activeCategory]);

  const courseCounts = useMemo(() => {
    const counts = { drinks: 0, snacks: 0, 'main-course': 0 };
    menuItems.forEach(item => {
      const course = getCourseType(item.category);
      counts[course]++;
    });
    return counts;
  }, [menuItems]);

  // Dynamic category counts based on current filters (excluding category filter itself)
  const categoryCounts = useMemo(() => {
    const counts = {};
    MENU_CATEGORIES.forEach(cat => {
      counts[cat.id] = 0;
    });

    menuItems.forEach(item => {
      const course = getCourseType(item.category);
      if (courseFilter !== 'all' && course !== courseFilter) return;
      if (vegOnly && !item.isVeg) return;
      if (nonVegOnly && item.isVeg) return;
      if (bestsellersOnly && !item.bestseller) return;
      if (recommendedOnly && !item.recommended) return;
      if (search) {
        const q = search.toLowerCase();
        const matches = item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
        if (!matches) return;
      }
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [menuItems, courseFilter, vegOnly, nonVegOnly, bestsellersOnly, recommendedOnly, search]);

  const currentActiveTab = activeCategory === 'all'
    ? (activeScrollCategory || '')
    : activeCategory;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section
        className="relative pt-36 pb-20 px-4 text-white overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F1A0D 0%, #2D4A27 60%, #8B4513 100%)' }}
      >
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold tracking-widest uppercase text-accent mb-3"
          >
            Our Menu
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            What's Brewing Today?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-xl mx-auto"
          >
            Browse our full selection of artisanal chais, cold shakes, fusion street bites, and sizzlers.
          </motion.p>
        </div>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      </section>

      {/* Control Bar */}
      <div className="sticky top-20 md:top-24 z-40 bg-background/95 backdrop-blur-xl border-b border-border shadow-soft">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
          
          {/* Main Controls: Search & Super filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Box & View Mode Toggle */}
            <div className="flex items-center gap-3 w-full md:max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="menu-search"
                  type="text"
                  placeholder="Search for chai, pizza, maggi, coffee..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="input-premium pl-10 pr-10 h-11 text-sm rounded-xl"
                />
                {search && (
                  <button
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setSearch('')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center gap-0.5 bg-muted p-1 rounded-xl flex-shrink-0">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-card text-primary shadow'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-card text-primary shadow'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Course Filters */}
            <div className="flex items-center gap-1.5 bg-muted p-1 rounded-xl overflow-x-auto scrollbar-hide flex-shrink-0">
              {[
                { id: 'all', label: '🍽️ All Courses', count: menuItems.length },
                { id: 'drinks', label: '🥤 Drinks', count: courseCounts.drinks },
                { id: 'snacks', label: '🥪 Snacks', count: courseCounts.snacks },
                { id: 'main-course', label: '🍛 Main Course', count: courseCounts['main-course'] }
              ].map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    setCourseFilter(c.id);
                    setActiveCategory('all');
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    courseFilter === c.id
                      ? 'bg-primary text-white shadow'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>{c.label}</span>
                  <span className="opacity-50 text-[10px]">({c.count})</span>
                </button>
              ))}
            </div>

          </div>

          {/* Quick-Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1 border-t border-border/30">
            <button
              onClick={() => {
                setVegOnly(!vegOnly);
                if (nonVegOnly) setNonVegOnly(false);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                vegOnly
                  ? 'bg-green-500/10 border-green-500/40 text-green-700 dark:text-green-400 font-bold'
                  : 'border-border text-muted-foreground hover:border-green-300'
              }`}
            >
              <span className="w-3.5 h-3.5 rounded border border-green-500 flex items-center justify-center bg-white flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </span>
              Veg Only
            </button>

            <button
              onClick={() => {
                setNonVegOnly(!nonVegOnly);
                if (vegOnly) setVegOnly(false);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                nonVegOnly
                  ? 'bg-red-500/10 border-red-500/40 text-red-700 dark:text-red-400 font-bold'
                  : 'border-border text-muted-foreground hover:border-red-300'
              }`}
            >
              <span className="w-3.5 h-3.5 rounded border border-red-500 flex items-center justify-center bg-white flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              </span>
              Non-Veg Only
            </button>

            <button
              onClick={() => setBestsellersOnly(!bestsellersOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                bestsellersOnly
                  ? 'bg-yellow-500/10 border-yellow-500/40 text-yellow-600 dark:text-yellow-400 font-bold'
                  : 'border-border text-muted-foreground hover:border-yellow-400'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              Bestseller
            </button>

            <button
              onClick={() => setRecommendedOnly(!recommendedOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                recommendedOnly
                  ? 'bg-primary/10 border-primary/40 text-primary dark:text-green-400 font-bold'
                  : 'border-border text-muted-foreground hover:border-primary'
              }`}
            >
              👍 Recommended
            </button>

            {(search || vegOnly || nonVegOnly || bestsellersOnly || recommendedOnly || courseFilter !== 'all' || activeCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearch('');
                  setVegOnly(false);
                  setNonVegOnly(false);
                  setBestsellersOnly(false);
                  setRecommendedOnly(false);
                  setCourseFilter('all');
                  setActiveCategory('all');
                }}
                className="inline-flex items-center gap-1 text-xs text-red-500 hover:underline ml-2"
              >
                Reset Filters
              </button>
            )}

            <div className="ml-auto text-xs text-muted-foreground font-medium flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-muted-foreground/60" />
              Showing {filtered.length} of {menuItems.length} dishes
            </div>
          </div>

          {/* Sub-Category Tabs (Mobile Only) */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-1 pt-1.5 scrollbar-hide border-t border-border/20">
            <button
              onClick={() => {
                setActiveCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeCategory === 'all' && !activeScrollCategory
                  ? 'text-white'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
              style={activeCategory === 'all' && !activeScrollCategory ? { background: 'linear-gradient(135deg, #2D4A27, #3d6235)' } : {}}
            >
              All Categories
            </button>
            {MENU_CATEGORIES.filter(cat => {
              if (courseFilter === 'all') return true;
              return getCourseType(cat.id) === courseFilter;
            }).map(cat => {
              const count = categoryCounts[cat.id] || 0;
              const isActive = currentActiveTab === cat.id;
              return (
                <button
                  key={cat.id}
                  disabled={count === 0}
                  onClick={() => scrollToSection(cat.id)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    count === 0
                      ? 'opacity-40 cursor-not-allowed'
                      : isActive
                      ? 'text-white'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                  style={isActive && count > 0 ? { background: 'linear-gradient(135deg, #2D4A27, #3d6235)' } : {}}
                >
                  {cat.label.replace(/^.+ /, '')} {count > 0 ? `(${count})` : ''}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Main Layout Area */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex gap-8 items-start">
          
          {/* Desktop Left Category Sidebar */}
          <aside className="hidden lg:block w-64 sticky top-48 flex-shrink-0 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border">
            <div className="bg-card rounded-2xl border border-border p-4 space-y-1.5 shadow-soft">
              <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-3 mb-2">Menu Sections</h3>
              
              <button
                onClick={() => {
                  setActiveCategory('all');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all duration-200 ${
                  activeCategory === 'all' && !activeScrollCategory
                    ? 'text-primary font-black'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                style={activeCategory === 'all' && !activeScrollCategory ? { background: 'rgba(45, 74, 39, 0.08)', borderLeft: '3px solid var(--color-primary)' } : {}}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">🍽️</span>
                  <span>All Sections</span>
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeCategory === 'all' && !activeScrollCategory ? 'bg-primary text-white font-extrabold' : 'bg-muted text-muted-foreground'}`}>
                  {filtered.length}
                </span>
              </button>
              
              <div className="h-px bg-border my-2" />
              
              {MENU_CATEGORIES.filter(cat => {
                if (courseFilter === 'all') return true;
                return getCourseType(cat.id) === courseFilter;
              }).map(cat => {
                const count = categoryCounts[cat.id] || 0;
                const isActive = currentActiveTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => scrollToSection(cat.id)}
                    disabled={count === 0}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all duration-200 ${
                      count === 0
                        ? 'opacity-40 cursor-not-allowed'
                        : isActive
                        ? 'text-primary font-black'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                    style={isActive && count > 0 ? { background: 'rgba(45, 74, 39, 0.08)', borderLeft: '3px solid var(--color-primary)' } : {}}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span className="text-sm">{cat.icon}</span>
                      <span className="truncate">{cat.label.replace(/^.+ /, '')}</span>
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-primary text-white font-extrabold' : 'bg-muted text-muted-foreground'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Dishes Area */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-24 bg-card rounded-3xl p-8 border border-border/50 shadow-soft max-w-lg mx-auto">
                <div className="text-6xl mb-4">🍽️</div>
                <p className="text-foreground font-black text-xl mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>No dishes found</p>
                <p className="text-muted-foreground text-sm">We couldn't find anything matching your filters. Try clearing some selections or search queries!</p>
                <button
                  onClick={() => {
                    setSearch('');
                    setVegOnly(false);
                    setNonVegOnly(false);
                    setBestsellersOnly(false);
                    setRecommendedOnly(false);
                    setCourseFilter('all');
                    setActiveCategory('all');
                  }}
                  className="mt-6 px-5 py-2.5 rounded-full text-xs font-bold text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #2D4A27, #3d6235)' }}
                >
                  Show Full Menu
                </button>
              </div>
            ) : (
              Object.entries(grouped).map(([catId, items]) => {
                const catInfo = MENU_CATEGORIES.find(c => c.id === catId);
                return (
                  <div key={catId} id={`section-${catId}`} className="scroll-mt-36 md:scroll-mt-44 mb-14">
                    {activeCategory === 'all' && (
                      <ScrollReveal className="flex items-center gap-3 mb-6">
                        <span className="text-2xl">{catInfo?.icon || '🍽️'}</span>
                        <h2
                          className="text-2xl font-bold text-primary"
                          style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                          {catInfo?.label?.replace(/^.+ /, '') || catId}
                        </h2>
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-xs text-muted-foreground font-semibold bg-muted px-2.5 py-1 rounded-full">{items.length} dishes</span>
                      </ScrollReveal>
                    )}
                    <StaggerContainer
                      className={
                        viewMode === 'list'
                          ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
                          : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                      }
                      staggerDelay={0.05}
                    >
                      {items.map(item => (
                        <MenuCard
                          key={item.id}
                          item={item}
                          cartQuantity={cart[item.id] || 0}
                          onAdd={() => addToCart(item.id)}
                          onRemove={() => removeFromCart(item.id)}
                          viewMode={viewMode}
                        />
                      ))}
                    </StaggerContainer>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </main>

      {/* Floating Bottom Cart Bar */}
      {cartItemsCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md bg-primary text-white rounded-2xl px-6 py-4 shadow-xl flex items-center justify-between border border-white/10 animate-fade-up">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-lg">
              🛒
            </div>
            <div>
              <p className="text-sm font-bold">{cartItemsCount} Item{cartItemsCount > 1 ? 's' : ''} added</p>
              <p className="text-xs text-white/70">Total: ₹{cartTotal}</p>
            </div>
          </div>
          <button
            onClick={() => setShowCartDrawer(true)}
            className="px-5 py-2.5 bg-accent text-accent-foreground font-black text-xs uppercase tracking-wider rounded-xl hover:scale-105 transition-transform"
          >
            View Order
          </button>
        </div>
      )}

      {/* WhatsApp Cart Drawer */}
      <AnimatePresence>
        {showCartDrawer && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCartDrawer(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-card shadow-2xl flex flex-col justify-between"
              style={{ background: 'var(--color-card)', borderLeft: '1px solid var(--color-border)' }}
            >
              {/* Header */}
              <div className="p-5 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Your Order
                  </h2>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                    {cartItemsCount} item{cartItemsCount > 1 ? 's' : ''}
                  </span>
                </div>
                <button
                  onClick={() => setShowCartDrawer(false)}
                  className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items & Options Container */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {Object.entries(cart).length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <span className="text-5xl mb-4">🛒</span>
                    <p className="text-base font-bold text-foreground">Your cart is empty</p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-[250px]">
                      Browse our delicious menu categories and add items to your plate!
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      {Object.entries(cart).map(([id, qty]) => {
                        const item = menuItems.find(i => i.id === id);
                        if (!item) return null;
                        return (
                          <div
                            key={id}
                            className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/40"
                          >
                            <div className="min-w-0 flex-1 pr-2">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="w-3 h-3 rounded-full border flex-shrink-0 flex items-center justify-center"
                                  style={{ borderColor: item.isVeg ? '#22C55E' : '#EF4444' }}
                                >
                                  <span
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ background: item.isVeg ? '#22C55E' : '#EF4444' }}
                                  />
                                </span>
                                <span className="text-xs font-bold text-foreground truncate">{item.name}</span>
                              </div>
                              <span className="text-xs text-muted-foreground mt-0.5 block">
                                ₹{item.price} each · Subtotal: ₹{item.price * qty}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2.5 bg-white border border-border dark:bg-primary/20 dark:border-white/10 rounded-lg px-2 py-1 flex-shrink-0">
                              <button
                                onClick={() => removeFromCart(id)}
                                className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground text-xs hover:bg-muted rounded"
                              >
                                -
                              </button>
                              <span className="text-xs font-extrabold w-4 text-center">{qty}</span>
                              <button
                                onClick={() => addToCart(id)}
                                className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground text-xs hover:bg-muted rounded"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-4 border-t border-border space-y-4">
                      <h3 className="text-sm font-bold text-foreground">Order Preferences</h3>
                      
                      <div className="grid grid-cols-2 gap-2 bg-muted p-1 rounded-xl">
                        <button
                          onClick={() => setOrderType('dine-in')}
                          className={`py-2 text-xs font-bold rounded-lg transition-all ${
                            orderType === 'dine-in'
                              ? 'bg-card text-primary shadow'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          🍽️ Dine-In (Table)
                        </button>
                        <button
                          onClick={() => setOrderType('takeaway')}
                          className={`py-2 text-xs font-bold rounded-lg transition-all ${
                            orderType === 'takeaway'
                              ? 'bg-card text-primary shadow'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          📦 Takeaway / Delivery
                        </button>
                      </div>

                      {orderType === 'dine-in' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-1.5"
                        >
                          <label className="block text-xs font-bold text-muted-foreground uppercase">
                            Select Table Number *
                          </label>
                          <select
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            className="input-premium py-2 rounded-xl text-xs bg-card border-border text-foreground"
                          >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                              <option key={n} value={n}>
                                Table {n}
                              </option>
                            ))}
                          </select>
                        </motion.div>
                      )}

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-muted-foreground uppercase">
                          Special Notes / Instructions
                        </label>
                        <textarea
                          value={specialInstructions}
                          onChange={(e) => setSpecialInstructions(e.target.value)}
                          rows={2}
                          placeholder="E.g., Make it extra spicy, less sugar, keep ginger minimal..."
                          className="input-premium resize-none text-xs rounded-xl"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Checkout Footer */}
              {Object.entries(cart).length > 0 && (
                <div className="p-5 border-t border-border bg-muted/20 space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold text-foreground">
                    <span>Total Price</span>
                    <span className="text-xl text-primary font-black">₹{cartTotal}</span>
                  </div>
                  
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full py-3.5 rounded-full font-bold text-white text-sm flex items-center justify-center gap-2 shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #25D366, #128C7E)',
                      boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)'
                    }}
                  >
                    Send Order via WhatsApp
                  </button>
                  
                  <p className="text-[10px] text-center text-muted-foreground leading-relaxed">
                    Order request will compile a WhatsApp message list and redirect you to chat. 
                    Confirm order over WhatsApp with cafe staff!
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default MenuPage;
