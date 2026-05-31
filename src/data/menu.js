// ─── Chaipal Garden Cafe — Full Menu Data ───────────────────────────────────
// Real data: ₹200-400/person | Jaipur, Rajasthan

export const MENU_CATEGORIES = [
  { id: 'chai', label: '☕ Home Brew Chai', icon: '☕' },
  { id: 'beverages', label: '🥤 Hot Beverages', icon: '🥤' },
  { id: 'coolers', label: '🧊 Coolers & Lassis', icon: '🧊' },
  { id: 'shakes', label: '🧃 Milk Shakes', icon: '🧃' },
  { id: 'specials', label: '⭐ Chaipal Specials', icon: '⭐' },
  { id: 'healthy', label: '🥗 Healthy Eatables', icon: '🥗' },
  { id: 'sandwiches', label: '🥪 Sandos', icon: '🥪' },
  { id: 'naashta', label: '🥞 Naashta', icon: '🥞' },
  { id: 'street-bites', label: '🌮 Street Bites', icon: '🌮' },
  { id: 'south-indian', label: '🥘 South Indian', icon: '🥘' },
  { id: 'desi-chinese', label: '🥡 Desi Chinese', icon: '🥡' },
  { id: 'maggi', label: '🍜 Maggi', icon: '🍜' },
  { id: 'conti', label: '🍕 Conti & Pizza', icon: '🍕' },
  { id: 'north-indian', label: '🍛 North Indian', icon: '🍛' }
];

export const MENU_ITEMS = [
  // ─── HOME BREW CHAI ────────────────────────────────────────────────────────
  {
    id: 'chaipal-special-chai', category: 'chai', name: 'Chaipal Special Chai', price: 70,
    description: 'Strong, kadak chai slow-brewed to perfection', isVeg: true,
    spicy: 0, bestseller: true, recommended: true, available: true,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80'
  },
  {
    id: 'masala-chai', category: 'chai', name: 'Masala Chai', price: 80,
    description: 'Spiced tea with fresh ginger, elaichi & premium saffron', isVeg: true,
    spicy: 1, bestseller: false, recommended: true, available: true,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80'
  },
  {
    id: 'jyada-doodh-kam-paani', category: 'chai', name: 'Jyada Doodh Kam Paani', price: 90,
    description: 'Creamy, slow-brewed milk-rich chai', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80'
  },
  {
    id: 'rajasthani-gulab-chai', category: 'chai', name: 'Rajasthani Gulab Chai', price: 80,
    description: 'Aromatic rose-flavored milk tea', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&q=80'
  },
  {
    id: 'mysore-chai', category: 'chai', name: 'Mysore Chai', price: 80,
    description: 'Filtered chai brewed with natural jaggery & cardamom', isVeg: true,
    spicy: 0, bestseller: true, recommended: true, available: true,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80'
  },

  // ─── HOT BEVERAGES ──────────────────────────────────────────────────────────
  {
    id: 'filter-coffee', category: 'beverages', name: 'Filter Coffee', price: 90,
    description: 'Classic South Indian style filter coffee', isVeg: true,
    spicy: 0, bestseller: true, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80'
  },
  {
    id: 'hand-beaten-coffee', category: 'beverages', name: 'Hand Beaten Coffee', price: 80,
    description: 'Creamy and frothy home-style beaten coffee', isVeg: true,
    spicy: 0, bestseller: false, recommended: true, available: true,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80'
  },
  {
    id: 'hot-milk', category: 'beverages', name: 'Hot Milk', price: 80,
    description: 'Fresh warm steamed milk', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80'
  },
  {
    id: 'hot-chocolate', category: 'beverages', name: 'Hot Chocolate', price: 100,
    description: 'Rich dark chocolate beverage topped with premium cocoa powder', isVeg: true,
    spicy: 0, bestseller: false, recommended: true, available: true,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80'
  },

  // ─── COOLERS & LASSIS ───────────────────────────────────────────────────────
  {
    id: 'fresh-lime-soda', category: 'coolers', name: 'Fresh Lime Soda/Water', price: 100,
    description: 'Freshly squeezed lime served sweet or salted with mint leaves', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80'
  },
  {
    id: 'classic-mojito', category: 'coolers', name: 'Classic Mojito', price: 130,
    description: 'Refreshing blend of mint, lime, sugar, and fizzy soda', isVeg: true,
    spicy: 0, bestseller: true, recommended: true, available: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80'
  },
  {
    id: 'jamun-kala-khatta-cooler', category: 'coolers', name: 'Jamun Kala Khatta Cooler', price: 140,
    description: 'Tangy black plum cooler with rock salt and mint', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80'
  },
  {
    id: 'aam-panna', category: 'coolers', name: 'Aam Panna', price: 130,
    description: 'Traditional raw mango cooler seasoned with black salt', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80'
  },
  {
    id: 'tamarind-cooler', category: 'coolers', name: 'Tamarind Cooler', price: 120,
    description: 'Tangy tamarind & black salt-based sweet and sour drink', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80'
  },
  {
    id: 'iced-tea', category: 'coolers', name: 'Iced Tea', price: 150,
    description: 'Chilled iced tea in lemon, watermelon, or peach flavor', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80'
  },
  {
    id: 'masala-chaach', category: 'coolers', name: 'Masala Chaach', price: 90,
    description: 'Spiced Rajasthani buttermilk garnished with roasted cumin seeds', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?w=400&q=80'
  },
  {
    id: 'lassi-sweet-salt', category: 'coolers', name: 'Lassi Sweet / Salt', price: 120,
    description: 'Thick Rajasthani yogurt-based creamy smoothie', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400&q=80'
  },
  {
    id: 'mango-lassi', category: 'coolers', name: 'Mango Lassi', price: 140,
    description: 'Classic Punjabi yogurt-based mango smoothie', isVeg: true,
    spicy: 0, bestseller: true, recommended: true, available: true,
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400&q=80'
  },
  {
    id: 'gulkand-rose-lassi', category: 'coolers', name: 'Gulkand Rose Lassi', price: 150,
    description: 'Creamy sweet lassi blended with cool, aromatic gulkand', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400&q=80'
  },
  {
    id: 'kesar-badam-thandai', category: 'coolers', name: 'Kesar Badam Thandai', price: 160,
    description: 'Traditional saffron & almond-infused chilled milk', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400&q=80'
  },
  {
    id: 'rose-sherbat', category: 'coolers', name: 'Rose Sherbat', price: 150,
    description: 'Mohabat ka sherbat infused with aromatic rose water and cardamoms', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400&q=80'
  },

  // ─── MILK SHAKES ───────────────────────────────────────────────────────────
  {
    id: 'classic-vanilla-shake', category: 'shakes', name: 'Classic Vanilla Shake', price: 120,
    description: 'Creamy shake blended with premium vanilla beans and cream', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80'
  },
  {
    id: 'brownie-shake', category: 'shakes', name: 'Brownie Shake', price: 170,
    description: 'Rich chocolate brownie blended with vanilla ice cream and hot fudge', isVeg: true,
    spicy: 0, bestseller: true, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80'
  },
  {
    id: 'dark-chocolate-indulgence', category: 'shakes', name: 'Dark Chocolate Indulgence', price: 140,
    description: 'Decadent shake loaded with rich Belgian dark chocolate', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80'
  },
  {
    id: 'magical-mango-shake', category: 'shakes', name: 'Magical Mango Shake', price: 140,
    description: 'Thick shake made with fresh pulpy sweet mangoes', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80'
  },
  {
    id: 'kitkat-shake', category: 'shakes', name: 'Kitkat Shake', price: 150,
    description: 'Oreo-style crunch shake loaded with KitKat chunks and chocolate sauce', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80'
  },
  {
    id: 'sugaree-strawberry-shake', category: 'shakes', name: 'Sugaree Strawberry Shake', price: 130,
    description: 'Blended shake made with fresh strawberries and milk', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80'
  },
  {
    id: 'cold-filter-coffee', category: 'shakes', name: 'Cold Filter Coffee', price: 140,
    description: 'Strong, aromatic South Indian filter coffee blended cold with milk', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80'
  },
  {
    id: 'cold-filter-coffee-icecream', category: 'shakes', name: 'Cold Filter Coffee with Ice Cream', price: 160,
    description: 'Chilled filter coffee shake topped with a scoop of vanilla ice cream', isVeg: true,
    spicy: 0, bestseller: false, recommended: true, available: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80'
  },
  {
    id: 'biscoff-shake', category: 'shakes', name: 'Biscoff Shake', price: 170,
    description: 'Decadent shake blended with original Lotus Biscoff paste and crumbs', isVeg: true,
    spicy: 0, bestseller: true, recommended: true, available: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80'
  },

  // ─── CHAIPAL SPECIALS ───────────────────────────────────────────────────────
  {
    id: 'mini-dabeli-sliders', category: 'specials', name: 'Mini Dabeli Sliders', price: 149,
    description: 'Bite size mini buns filled with sweet spicy tangy potato masala, sev, and pomegranate seeds', isVeg: true,
    spicy: 1, bestseller: true, recommended: true, available: true,
    image: '/assets/images/food/food_dabeli_sliders.png'
  },
  {
    id: 'korean-maggi', category: 'specials', name: 'Korean Maggi', price: 129,
    description: 'Maggi noodles prepared in a fiery, hot-garlic Korean style sauce', isVeg: true,
    spicy: 2, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80'
  },
  {
    id: 'nutri-keema-open-kulcha', category: 'specials', name: 'Nutri Keema Open Kulcha', price: 199,
    description: 'Spiced soya keema topped over butter-toasted open kulcha bread and pickled onions', isVeg: true,
    spicy: 1, bestseller: false, recommended: true, available: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'
  },
  {
    id: 'tandoori-platter-sizzler', category: 'specials', name: 'Tandoori Platter Sizzler', price: 389,
    description: 'Sizzling hot tandoor platter: Paneer Tikka, Tandoori Soya Chaap, Hara Bhara Kebab, Dahi ke Kebab & Aloochur', isVeg: true,
    spicy: 2, bestseller: true, recommended: true, available: true,
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&q=80'
  },
  {
    id: 'mini-vada-pav-bites', category: 'specials', name: 'Mini Vada Pav Bites', price: 149,
    description: 'Bite size mini slider buns stuffed with aromatic tempered potato patties and dry garlic chutney', isVeg: true,
    spicy: 2, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'
  },
  {
    id: 'conti-sizzler', category: 'specials', name: 'Conti Sizzler', price: 349,
    description: 'Sizzling platter of grilled paneer cutlet, BBQ pineapple, stuffed tomato, herb rice, and veggies', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&q=80'
  },
  {
    id: 'chinese-sizzler', category: 'specials', name: 'Chinese Sizzler', price: 349,
    description: 'Hot sizzling platter with choice of fried rice/noodles, chilly paneer, fries, and fried momos', isVeg: true,
    spicy: 2, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&q=80'
  },
  {
    id: 'chur-chur-naan-platter', category: 'specials', name: 'Chur Chur Naan Platter', price: 199,
    description: 'Amritsari clay oven baked stuffed chur chur naan served with smoky dhaba dal, paneer makhani, and curd', isVeg: true,
    spicy: 1, bestseller: true, recommended: true, available: true,
    image: '/assets/images/food/food_chur_chur_naan_platter.jpg'
  },

  // ─── HEALTHY EATABLES ───────────────────────────────────────────────────────
  {
    id: 'sprouts-chaat', category: 'healthy', name: 'Sprouts Chaat', price: 199,
    description: 'Protein-rich and crunchy mix of sprouted lentils, fresh cucumber, tomatoes, and lime juice', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80'
  },
  {
    id: 'dal-khichdi', category: 'healthy', name: 'Dal Khichdi', price: 199,
    description: 'Light and comforting home-style cooked quinoa, lentils, and mixed garden vegetables', isVeg: true,
    spicy: 0, bestseller: false, recommended: true, available: true,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'
  },
  {
    id: 'oats-upma', category: 'healthy', name: 'Oats Upma', price: 249,
    description: 'Healthy and fiber-rich breakfast upma cooked with oats, carrots, peas, and mustard tempering', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'
  },
  {
    id: 'curd-rice', category: 'healthy', name: 'Curd Rice', price: 129,
    description: 'Probiotic-rich South Indian curd rice tempered with curry leaves, mustard, and green chilies', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'
  },
  {
    id: 'corn-bhel', category: 'healthy', name: 'Corn Bhel', price: 129,
    description: 'Sweet corn kernels tossed with chopped onions, tomatoes, coriander, and tangy chaat masala', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'
  },
  {
    id: 'raagi-idli', category: 'healthy', name: 'Raagi Idli', price: 199,
    description: 'Superfood finger-millet steamed idli cakes served with fresh coconut chutney', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'
  },

  // ─── SANDOS ─────────────────────────────────────────────────────────────────
  {
    id: 'classic-coleslaw-sandwich', category: 'sandwiches', name: 'Classic Coleslaw Sandwich', price: 129,
    description: 'Soft sandwich stuffed with creamy, crunchy vegetable coleslaw salad', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80'
  },
  {
    id: 'cucumber-creamcheese-sandwich', category: 'sandwiches', name: 'Cucumber & Tomato Cream Cheese Sandwich', price: 129,
    description: 'Cool cucumber and tomato slices layered with thick, smooth whipped herb cream cheese', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80'
  },
  {
    id: 'classic-veg-club-sandwich', category: 'sandwiches', name: 'Classic Veg Club Grill Sandwich', price: 199,
    description: 'Triple-decker layered toasted sandwich with fresh paneer, veggies, cheese, and herb spread', isVeg: true,
    spicy: 1, bestseller: true, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80'
  },
  {
    id: 'mumbai-aloo-toastie', category: 'sandwiches', name: 'Mumbai Aloo Toastie', price: 129,
    description: 'Indian street style toasted sandwich filled with spiced potato mash and green chutney', isVeg: true,
    spicy: 2, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80'
  },
  {
    id: 'paneer-tikka-toastie', category: 'sandwiches', name: 'Paneer Tikka Toastie', price: 199,
    description: 'Tandoori paneer tikka pieces and mozzarella melted inside a golden toasted sandwich', isVeg: true,
    spicy: 2, bestseller: true, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80'
  },
  {
    id: 'dahi-toast', category: 'sandwiches', name: 'Dahi Toast', price: 129,
    description: 'Hung curd, crunchy veggies, and mild spices stuffed in bread, butter-grilled till crispy golden', isVeg: true,
    spicy: 1, bestseller: false, recommended: true, available: true,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80'
  },

  // ─── NAASHTA ────────────────────────────────────────────────────────────────
  {
    id: 'stuffed-paratha', category: 'naashta', name: 'Stuffed Paratha with Curd', price: 149,
    description: 'Hot stuffed flatbread (Choice of Aloo / Gobhi / Pyaaz / Mix) served with curd and pickle', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80'
  },
  {
    id: 'chole-bhature', category: 'naashta', name: 'Chole Bhature', price: 149,
    description: 'Two fluffy, puffed golden bhatures served with rich Punjabi chole chickpea curry and onions', isVeg: true,
    spicy: 2, bestseller: true, recommended: true, available: true,
    image: '/assets/images/food/food_chole_bhature.jpg'
  },
  {
    id: 'bedmi-aloo-puri', category: 'naashta', name: 'Bedmi Aloo Puri', price: 109,
    description: 'Traditional flaky, spiced urad dal puris paired with hot, spicy potato gravy', isVeg: true,
    spicy: 2, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80'
  },
  {
    id: 'matar-kulcha', category: 'naashta', name: 'Matar Kulcha', price: 149,
    description: 'Soft street-style kulcha bread paired with spiced white peas curry, lemon and green chilies', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80'
  },
  {
    id: 'indori-poha', category: 'naashta', name: 'Indori Poha', price: 129,
    description: 'Lemony steamed flattened rice tempered with fennel seeds, topped with Indori sev and pomegranate', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80'
  },
  {
    id: 'rawa-upma', category: 'naashta', name: 'Rawa Upma', price: 139,
    description: 'Comforting and soft semolina porridge cooked with fresh carrots, beans, and tempered spices', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80'
  },

  // ─── STREET BITES ───────────────────────────────────────────────────────────
  {
    id: 'vegetable-chilla', category: 'street-bites', name: 'Vegetable Chilla', price: 199,
    description: 'Savory gram flour pancake loaded with grated carrots, onions, coriander, and mild spices', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'
  },
  {
    id: 'pav-bhaji', category: 'street-bites', name: 'Plain/ Masala Pav Bhaji', price: 199,
    description: 'Mouthwatering spiced mashed mixed vegetable curry topped with butter, served with soft toasted pav buns', isVeg: true,
    spicy: 2, bestseller: true, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'
  },
  {
    id: 'papri-chaat', category: 'street-bites', name: 'Papri Chaat', price: 99,
    description: 'Crisp flour crackers topped with potato bits, sweet yogurt, green & tamarind chutneys, and sev', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'
  },
  {
    id: 'dahi-bhalla', category: 'street-bites', name: 'Dahi Bhalla', price: 129,
    description: 'Soft lentil dumplings soaked in sweet yogurt, garnished with red chilli powder, roasted cumin, and chutneys', isVeg: true,
    spicy: 0, bestseller: true, recommended: true, available: true,
    image: '/assets/images/food/food_dahi_bhalla.png'
  },
  {
    id: 'aloo-sev-puri', category: 'street-bites', name: 'Aloo Sev Puri', price: 99,
    description: 'Mini flat puris topped with potatoes, chickpeas, whipped yogurt, sweet-spicy chutneys, and fine sev', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'
  },
  {
    id: 'nacho-bhel', category: 'street-bites', name: 'Nacho Bhel', price: 149,
    description: 'Crispy corn tortilla nachos crushed and tossed with chopped veggies, bhel chutney, cheese, and sev', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'
  },
  {
    id: 'mix-pakore', category: 'street-bites', name: 'Mix Pakore', price: 99,
    description: 'Hot and crunchy deep-fried vegetable fritters served with green coriander chutney', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'
  },
  {
    id: 'paneer-pakore', category: 'street-bites', name: 'Paneer Pakore', price: 149,
    description: 'Cottage cheese pieces dipped in spiced gram flour batter and deep-fried till golden', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'
  },
  {
    id: 'onion-bhajia', category: 'street-bites', name: 'Onion Bhajia', price: 129,
    description: 'Golden, crispy shredded onion fritters seasoned with carom seeds and green chilies', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'
  },

  // ─── SOUTH INDIAN ───────────────────────────────────────────────────────────
  {
    id: 'rice-idli', category: 'south-indian', name: 'Rice Idli', price: 99,
    description: 'Steamed fluffy rice and white lentil cakes served with piping hot vegetable sambar and coconut chutney', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: '/assets/images/food/food_idli_plate.jpg'
  },
  {
    id: 'thathe-idli', category: 'south-indian', name: 'Thathe Idli', price: 129,
    description: 'Plate-sized soft steamed idli cake generously coated with spicy gunpowder podi masala and hot ghee', isVeg: true,
    spicy: 2, bestseller: true, recommended: false, available: true,
    image: '/assets/images/food/food_idli_plate.jpg'
  },
  {
    id: 'schezwan-idli', category: 'south-indian', name: 'Schezwan Idli', price: 129,
    description: 'Spiced steamed idli cubes wok-tossed in sharp garlic Schezwan sauce and bell peppers', isVeg: true,
    spicy: 2, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80'
  },
  {
    id: 'medu-vada', category: 'south-indian', name: 'Medu Vada', price: 129,
    description: 'Deep fried crispy, savory black lentil doughnuts served with sambar and white coconut chutney', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80'
  },
  {
    id: 'dahi-vada', category: 'south-indian', name: 'Dahi Vada', price: 129,
    description: 'Deep-fried lentil dumplings soaked in sweet yogurt, tempered with curry leaves and mustard seeds', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80'
  },
  {
    id: 'plain-dosa', category: 'south-indian', name: 'Plain Dosa', price: 149,
    description: 'Large, paper-thin crispy crepe made of fermented rice and lentil batter', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80'
  },
  {
    id: 'butter-dosa', category: 'south-indian', name: 'Butter Dosa', price: 179,
    description: 'Crisp golden rice crepe prepared with a rich coating of fresh butter', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80'
  },
  {
    id: 'masala-dosa', category: 'south-indian', name: 'Masala Dosa', price: 199,
    description: 'Crispy rice and lentil crepe stuffed with a spiced potato-mustard filling', isVeg: true,
    spicy: 1, bestseller: true, recommended: true, available: true,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80'
  },
  {
    id: 'mysore-masala-dosa', category: 'south-indian', name: 'Mysore Masala Dosa', price: 219,
    description: 'Crispy dosa coated internally with hot garlic-red chilli chutney and potato mash stuffing', isVeg: true,
    spicy: 2, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80'
  },
  {
    id: 'rava-dosa', category: 'south-indian', name: 'Rava Dosa', price: 199,
    description: 'Thin lacy crispy crepe made of semolina and rice flour, spiced with ginger and green chilies', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80'
  },
  {
    id: 'rava-masala-dosa', category: 'south-indian', name: 'Rava Masala Dosa', price: 219,
    description: 'Lacy, crispy rava dosa filled with delicious seasoned potato-onion masala', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80'
  },
  {
    id: 'masala-uthapam', category: 'south-indian', name: 'Masala Uthapam', price: 179,
    description: 'Thick savory rice pancake topped with chopped red onions, tomatoes, green chilies, and coriander', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80'
  },

  // ─── DESI CHINESE ───────────────────────────────────────────────────────────
  {
    id: 'veg-steamed-momos', category: 'desi-chinese', name: 'Veg Steamed Momos (6 Pcs)', price: 139,
    description: 'Hand-folded steamed dumplings filled with finely chopped cabbage, carrots, onion, and spices', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80'
  },
  {
    id: 'corn-spinach-cheese-momos', category: 'desi-chinese', name: 'Corn Spinach Cheese Momos (6 Pcs)', price: 169,
    description: 'Steamed dumplings packed with sweet corn kernels, tender spinach, and melted cheese', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80'
  },
  {
    id: 'veg-fried-momos', category: 'desi-chinese', name: 'Veg Fried Momos (6 Pcs)', price: 159,
    description: 'Crispy, deep-fried golden momos stuffed with seasoned garden vegetables', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80'
  },
  {
    id: 'nepali-jhol-momos', category: 'desi-chinese', name: 'Nepali Jhol Momos', price: 199,
    description: 'Hot steamed vegetable momos served floating in a spicy, sesame-infused cold Nepali style gravy', isVeg: true,
    spicy: 2, bestseller: true, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80'
  },
  {
    id: 'veg-manchurian', category: 'desi-chinese', name: 'Veg Manchurian (Dry/Gravy)', price: 199,
    description: 'Crispy fried vegetable balls tossed in a thick, garlic, soy, and spring onion Manchurian sauce', isVeg: true,
    spicy: 2, bestseller: true, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80'
  },
  {
    id: 'chilli-paneer', category: 'desi-chinese', name: 'Chilli Paneer (Dry/Gravy)', price: 249,
    description: 'Golden fried paneer cubes wok-tossed with fresh onions, capsicum, soy sauce, and green chilies', isVeg: true,
    spicy: 2, bestseller: true, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80'
  },
  {
    id: 'honey-chilli-potato', category: 'desi-chinese', name: 'Honey Chilli Potato', price: 229,
    description: 'Crispy potato fingers tossed with capsicum and toasted sesame in a sweet-spicy honey glaze', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80'
  },
  {
    id: 'veg-spring-roll', category: 'desi-chinese', name: 'Veg Spring Roll', price: 199,
    description: 'Crispy fried sheets stuffed with wok-tossed julienne vegetables, served with hot sweet chilli dip', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80'
  },
  {
    id: 'kolkata-style-chowmein', category: 'desi-chinese', name: 'Kolkata-Style Chowmein', price: 189,
    description: 'Stir-fried noodles cooked with crunchy cabbage, carrots, onion, and tangy street-style dark soy sauce', isVeg: true,
    spicy: 1, bestseller: true, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80'
  },
  {
    id: 'hakka-noodles', category: 'desi-chinese', name: 'Hakka Noodles', price: 159,
    description: 'Classic wok-tossed thin noodles cooked with aromatic garlic, celery, and fresh green onions', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80'
  },
  {
    id: 'chilli-garlic-noodles', category: 'desi-chinese', name: 'Chilli Garlic Noodles', price: 179,
    description: 'Spicy wok-tossed noodles loaded with chopped garlic, green chilies, and red chilli flakes', isVeg: true,
    spicy: 2, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80'
  },
  {
    id: 'veg-fried-rice', category: 'desi-chinese', name: 'Fried Rice', price: 169,
    description: 'Wok-fried long grain basmati rice tossed with fresh chopped vegetables and light soy sauce', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80'
  },
  {
    id: 'schezwan-fried-rice', category: 'desi-chinese', name: 'Schezwan Fried Rice', price: 179,
    description: 'Fiery wok-fried rice prepared in a bold, spicy Schezwan pepper sauce with fresh vegetables', isVeg: true,
    spicy: 2, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80'
  },

  // ─── MAGGI ──────────────────────────────────────────────────────────────────
  {
    id: 'plain-maggi', category: 'maggi', name: 'Plain Maggi', price: 89,
    description: 'Simple and comforting classic Maggi prepared with its traditional masala seasoning', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80'
  },
  {
    id: 'masala-maggi', category: 'maggi', name: 'Masala Maggi', price: 99,
    description: 'Spicy Maggi noodles tossed with chopped red onions, tomatoes, and extra Indian masalas', isVeg: true,
    spicy: 2, bestseller: true, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80'
  },
  {
    id: 'tadka-maggi', category: 'maggi', name: 'Tadka Maggi', price: 109,
    description: 'Spicy Maggi noodles finished with a double tempering of mustard seeds, red chilies, and garlic', isVeg: true,
    spicy: 2, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80'
  },
  {
    id: 'cheese-maggi', category: 'maggi', name: 'Cheese Maggi', price: 129,
    description: 'Creamy Maggi noodles loaded and melted with a double portion of processed Cheddar cheese', isVeg: true,
    spicy: 1, bestseller: true, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80'
  },
  {
    id: 'peri-peri-maggi', category: 'maggi', name: 'Peri Peri Maggi', price: 129,
    description: 'Spicy, zesty Maggi noodles infused with hot African peri-peri seasoning and herbs', isVeg: true,
    spicy: 2, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80'
  },

  // ─── CONTI & PIZZA ──────────────────────────────────────────────────────────
  {
    id: 'cheese-chilli-garlic-bread', category: 'conti', name: 'Cheese Chilli Garlic Bread', price: 149,
    description: 'Toasted artisan baguette slices loaded with garlic butter, green chilies, and melted mozzarella', isVeg: true,
    spicy: 1, bestseller: true, recommended: true, available: true,
    image: '/assets/images/food/food_garlic_bread.jpg'
  },
  {
    id: 'plain-peri-peri-fries', category: 'conti', name: 'Plain/ Peri Peri Fries', price: 99,
    description: 'Golden skin-on potato fries served salted or tossed in hot peri-peri seasoning', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80'
  },
  {
    id: 'loaded-fries', category: 'conti', name: 'Loaded Fries', price: 149,
    description: 'Crispy potato fries loaded with warm cheese sauce, eggless mayo, jalapeños, and herbs', isVeg: true,
    spicy: 1, bestseller: true, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80'
  },
  {
    id: 'alfredo-sauce-pasta', category: 'conti', name: 'Alfredo Sauce Pasta', price: 249,
    description: 'Penne pasta tossed in rich, creamy white béchamel sauce with mushrooms, sweet corn, and garlic', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&q=80'
  },
  {
    id: 'arrabiata-sauce-pasta', category: 'conti', name: 'Arrabiata Sauce Pasta', price: 249,
    description: 'Penne pasta tossed in a fiery, tangy Italian tomato sauce with olives and red pepper flakes', isVeg: true,
    spicy: 2, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&q=80'
  },
  {
    id: 'pink-sauce-pasta', category: 'conti', name: 'Pink Sauce Pasta', price: 279,
    description: 'Penne pasta cooked in a perfect blend of rich white sauce and tangy tomato marinara', isVeg: true,
    spicy: 1, bestseller: true, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&q=80'
  },
  {
    id: 'margherita-pizza', category: 'conti', name: 'Margherita Pizza', price: 319,
    description: 'Classic thin crust pizza with house marinara, fresh basil, and fresh mozzarella cheese', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80'
  },
  {
    id: 'farm-fresh-pizza', category: 'conti', name: 'Farm Fresh Pizza', price: 329,
    description: 'Cheese pizza loaded with sweet corn, crisp capsicum, red onions, and ripe tomatoes', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80'
  },
  {
    id: 'tandoori-paneer-pizza', category: 'conti', name: 'Tandoori Paneer Pizza', price: 369,
    description: 'Smoked tandoori-marinated paneer chunks, red onions, capsicum, and coriander on a cheesy base', isVeg: true,
    spicy: 2, bestseller: true, recommended: true, available: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80'
  },

  // ─── NORTH INDIAN STARTERS & MAINS ──────────────────────────────────────────
  {
    id: 'paneer-tikka', category: 'north-indian', name: 'Paneer Tikka', price: 249,
    description: 'Fresh cottage cheese blocks marinated in tandoori spices and yogurt, skewered and clay oven grilled', isVeg: true,
    spicy: 2, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80'
  },
  {
    id: 'paneer-malai-tikka', category: 'north-indian', name: 'Paneer Malai Tikka', price: 269,
    description: 'Melt-in-mouth cottage cheese blocks marinated in cream, cashew paste, and white pepper, grilled in tandoor', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80'
  },
  {
    id: 'tandoori-aloo', category: 'north-indian', name: 'Tandoori Aloo', price: 199,
    description: 'Baby potatoes marinated in a spiced red yogurt paste, roasted crisp in the clay oven', isVeg: true,
    spicy: 2, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'
  },
  {
    id: 'tandoori-chaap', category: 'north-indian', name: 'Tandoori Chaap', price: 199,
    description: 'Soya chaap chunks marinated in thick Punjabi tandoori masalas, roasted on skewers', isVeg: true,
    spicy: 2, bestseller: true, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'
  },
  {
    id: 'tandoori-malai-chaap', category: 'north-indian', name: 'Tandoori Malai Chaap', price: 229,
    description: 'Soya chaap chunks marinated in cardamom-spiced cream and cashew nut paste, roasted in tandoor', isVeg: true,
    spicy: 0, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'
  },
  {
    id: 'hara-bhara-kebab', category: 'north-indian', name: 'Hara Bhara Kebab', price: 189,
    description: 'Healthy and shallow-fried patties made of spiced potato, mashed green peas, and fresh spinach', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'
  },
  {
    id: 'dahi-ke-kebab', category: 'north-indian', name: 'Dahi Ke Kebab', price: 249,
    description: 'Crispy-coated melt-in-mouth patties stuffed with hung yogurt, fresh paneer, and crushed black pepper', isVeg: true,
    spicy: 1, bestseller: false, recommended: true, available: true,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'
  },
  {
    id: 'dilli-style-paneer-makhni', category: 'north-indian', name: 'Dilli Style Paneer Makhni', price: 289,
    description: 'Soft cottage cheese cubes cooked in a sweet, velvety-smooth buttery tomato and cream gravy', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'
  },
  {
    id: 'masaledar-paneer-butter-masala', category: 'north-indian', name: 'Masaledar Paneer Butter Masala', price: 299,
    description: 'Rich cottage cheese cubes prepared in a spicy, thick onion-tomato gravy with butter and fresh cream', isVeg: true,
    spicy: 2, bestseller: true, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'
  },
  {
    id: 'kadai-paneer', category: 'north-indian', name: 'Kadai Paneer', price: 319,
    description: 'Cottage cheese pieces cooked with thick diced onions and bell peppers in a freshly ground kadai spice masala', isVeg: true,
    spicy: 2, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'
  },
  {
    id: 'mix-veg', category: 'north-indian', name: 'Mix Veg', price: 249,
    description: 'Stir fried seasonal vegetables (beans, carrot, peas, cauliflower, potato) in a dry onion-tomato gravy', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'
  },
  {
    id: 'veg-jalfrezi', category: 'north-indian', name: 'Veg Jalfrezi', price: 279,
    description: 'Crispy stir-fried julienne vegetables cooked with tomatoes and bell peppers in a tangy, spicy dry gravy', isVeg: true,
    spicy: 2, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'
  },
  {
    id: 'makhani-malai-kofta', category: 'north-indian', name: 'Makhani Malai Kofta', price: 299,
    description: 'Crispy paneer and potato dumplings (koftas) served in a rich, mild, sweet cream and tomato gravy', isVeg: true,
    spicy: 1, bestseller: true, recommended: true, available: true,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'
  },
  {
    id: 'aloo-dhahi-wala', category: 'north-indian', name: 'Aloo Dhahi Wala', price: 199,
    description: 'Soft potato cubes cooked in a spiced, smooth, and tangy yogurt-based North Indian style curry', isVeg: true,
    spicy: 1, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'
  },
  {
    id: 'chaap-butter-masala', category: 'north-indian', name: 'Chaap Butter Masala', price: 249,
    description: 'Soya chaap chunks cooked in a rich, buttery, spiced onion-tomato cream gravy', isVeg: true,
    spicy: 2, bestseller: false, recommended: false, available: true,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'
  }
];

// Featured / trending items for home page
export const FEATURED_ITEMS = MENU_ITEMS.filter(i => i.recommended && i.bestseller).slice(0, 8);

// Bestseller items
export const BESTSELLERS = MENU_ITEMS.filter(i => i.bestseller).slice(0, 6);
