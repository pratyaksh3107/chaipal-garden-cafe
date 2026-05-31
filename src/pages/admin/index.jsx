import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, UtensilsCrossed, Calendar, Users, Tag,
  BarChart2, QrCode, Star, Settings, LogOut, Menu, X,
  TrendingUp, Eye, Clock, CheckCircle, XCircle, Edit2,
  PlusCircle, Trash2, RefreshCw, MessageSquare, Sparkles,
  Download, Printer, Plus, Search, HelpCircle, FileText
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend, PieChart, Pie, Cell
} from 'recharts';
import { QRCodeCanvas } from 'qrcode.react';
import { db, subscribeToConnectionStatus, checkSupabaseConnection } from '../../lib/db';
import { useAuth } from '../../contexts/AuthContext';
import { MENU_CATEGORIES } from '../../data/menu';

const SIDEBAR_LINKS = [
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { id: 'menu', label: 'Menu Manager', Icon: UtensilsCrossed },
  { id: 'reservations', label: 'Reservations', Icon: Calendar },
  { id: 'crowd', label: 'Crowd Control', Icon: Users },
  { id: 'offers', label: 'Offers Manager', Icon: Tag },
  { id: 'ai', label: 'AI Manager', Icon: Sparkles },
  { id: 'analytics', label: 'Analytics', Icon: BarChart2 },
  { id: 'qr', label: 'QR Generator', Icon: QrCode },
  { id: 'reviews', label: 'Reviews', Icon: Star },
];

const SEATING_TYPES = [
  { id: 'garden', label: 'Garden', emoji: '🌿' },
  { id: 'indoor', label: 'Indoor AC', emoji: '❄️' },
  { id: 'romantic', label: 'Romantic Corner', emoji: '🕯️' },
];

// Helper: Connection Banner component
const ConnectionBanner = () => {
  const [status, setStatus] = useState(db.getConnectionStatus());

  useEffect(() => {
    const unsubscribe = subscribeToConnectionStatus((newStatus) => {
      setStatus(newStatus);
    });
    return unsubscribe;
  }, []);

  if (status === 'connected') return null;

  if (status === 'failed') {
    return (
      <div className="bg-red-500/10 border border-red-500/25 text-red-400 text-xs px-4 py-3 rounded-xl flex items-center justify-between mb-6 shadow-sm">
        <span className="flex items-center gap-2">
          <span className="text-sm">❌</span>
          <span><strong>Supabase Sync Failed:</strong> Env keys are configured, but the database project is unreachable or paused. Operating in Local fallback mode.</span>
        </span>
      </div>
    );
  }

  return (
    <div className="bg-yellow-500/10 border border-yellow-500/25 text-yellow-500 text-xs px-4 py-3 rounded-xl flex items-center justify-between mb-6 shadow-sm">
      <span className="flex items-center gap-2">
        <span className="text-sm">⚠️</span>
        <span><strong>Demo Mode Active:</strong> Operating on local fallback storage. Configure <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in <code>.env</code> for cloud database sync.</span>
      </span>
    </div>
  );
};

// ─── Sub-panels ────────────────────────────────────────────────────────────

// 1. DASHBOARD PANEL
const DashboardPanel = ({ setPanel, dbStatus }) => {
  const [res, setRes] = useState([]);
  const [crowd, setCrowd] = useState({ current_level: 0 });
  const [menuItems, setMenuItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [scansCount, setScansCount] = useState(0);

  useEffect(() => {
    const loadDashboardData = async () => {
      const bookings = await db.reservations.getAll();
      setRes(bookings || []);
      const crowdLevel = await db.crowd.get();
      setCrowd(crowdLevel || { current_level: 0 });
      const menu = await db.menu.getAll();
      setMenuItems(menu || []);
      const revs = await db.reviews.getAll();
      setReviews(revs || []);

      const events = await db.analytics.getAll();
      const scans = (events || []).filter(e => e && e.event_type === 'qr_scan').length;
      setScansCount(scans);
    };
    loadDashboardData();
  }, [dbStatus]);

  const bookingsArray = Array.isArray(res) ? res : [];
  const pendingCount = bookingsArray.filter(r => r && r.status === 'pending').length;
  const activeCount = bookingsArray.filter(r => r && r.status === 'confirmed').length;

  const getCrowdText = (lvl) => {
    if (lvl === 0) return 'Peaceful (30%)';
    if (lvl === 1) return 'Moderate (65%)';
    return 'Busy (90%)';
  };

  const getCrowdColor = (lvl) => {
    if (lvl === 0) return '#22C55E';
    if (lvl === 1) return '#F59E0B';
    return '#EF4444';
  };

  // Prepare simple daily chart data from real reservations
  const getReservationChartData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const counts = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
    
    bookingsArray.forEach(r => {
      if (r && r.reservation_date) {
        try {
          const date = new Date(r.reservation_date);
          const dayName = days[date.getDay()];
          if (dayName) {
            counts[dayName] = (counts[dayName] || 0) + 1;
          }
        } catch (e) {
          console.error(e);
        }
      }
    });

    return Object.entries(counts).map(([day, bookings]) => ({ day, bookings }));
  };

  return (
    <div className="space-y-6">
      <ConnectionBanner />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Bookings", value: `${bookingsArray.filter(r => r && r.reservation_date === new Date().toISOString().split('T')[0]).length} Booked`, icon: '📅', delta: 'Live scheduling', color: '#22C55E' },
          { label: 'Active Reservations', value: `${activeCount} Confirmed`, icon: '✉️', delta: `${pendingCount} pending`, color: '#3B82F6' },
          { label: 'Crowd Level', value: getCrowdText(crowd.current_level), icon: '👥', delta: 'Live status', color: getCrowdColor(crowd.current_level) },
          { label: 'Table QR Scans', value: `${scansCount} Scans`, icon: '📱', delta: 'Total customer scans', color: '#D4AF37' },
        ].map(card => (
          <div key={card.label} className="rounded-xl p-4" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{card.icon}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${card.color}20`, color: card.color }}>
                {card.delta}
              </span>
            </div>
            <p className="text-2xl font-bold text-white mb-0.5" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{card.value}</p>
            <p className="text-white/40 text-xs">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl p-5" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" /> Reservation Volume (Weekly)
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={getReservationChartData()} barCategoryGap="30%">
              <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: '#0F1A0D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              <Bar dataKey="bookings" radius={[4,4,0,0]} fill="#D4AF37" fillOpacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="rounded-xl p-5" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" /> Crowd Insights (Capacity)
          </h3>
          <div className="flex flex-col justify-center items-center h-40">
            <div className="relative w-28 h-28 rounded-full border-4 flex flex-col justify-center items-center" style={{ borderColor: getCrowdColor(crowd.current_level) + '30', borderTopColor: getCrowdColor(crowd.current_level) }}>
              <span className="text-3xl">{crowd.current_level === 0 ? '😌' : crowd.current_level === 1 ? '😊' : '🔥'}</span>
              <span className="text-sm font-bold text-white mt-1">{getCrowdText(crowd.current_level).split(' ')[0]}</span>
            </div>
            <p className="text-white/40 text-xs mt-3 text-center italic">"{crowd.message || 'No notification set.'}"</p>
          </div>
        </div>
      </div>

      {/* Recent Reservations */}
      <div className="rounded-xl p-5" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent" /> Recent Bookings
          </h3>
          <button onClick={() => setPanel('reservations')} className="text-xs text-accent hover:underline">View All →</button>
        </div>
        <div className="space-y-3">
          {bookingsArray.slice(0, 4).map(r => (
            <div key={r.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-white text-xs font-bold border border-white/10">
                  {(r.customer_name || 'C')[0]}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{r.customer_name || 'Guest'}</p>
                  <p className="text-white/40 text-xs">{r.reservation_date} · {r.reservation_time} · {r.guests} guests · {r.seating_type}</p>
                </div>
              </div>
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize"
                style={{
                  background: r.status === 'confirmed' ? 'rgba(34,197,94,0.15)' : r.status === 'pending' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.12)',
                  color: r.status === 'confirmed' ? '#22C55E' : r.status === 'pending' ? '#F59E0B' : '#EF4444',
                }}
              >
                {r.status}
              </span>
            </div>
          ))}
          {bookingsArray.length === 0 && (
            <p className="text-white/40 text-center text-xs py-4">No reservations logged yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// 2. MENU MANAGER PANEL
const MenuManagerPanel = ({ dbStatus }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Form States
  const [editItem, setEditItem] = useState(null); // holds item being edited
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('chai');
  const [isVeg, setIsVeg] = useState(true);
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [spicy, setSpicy] = useState(0);

  const fetchMenu = async () => {
    setLoading(true);
    const data = await db.menu.getAll();
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMenu();
  }, [dbStatus]);

  const handleToggleAvailable = async (id, currentVal) => {
    await db.menu.update(id, { isAvailable: !currentVal });
    fetchMenu();
  };

  const handleToggleBestseller = async (id, currentVal) => {
    await db.menu.update(id, { isBestSeller: !currentVal });
    fetchMenu();
  };

  const handleDeleteItem = async (id) => {
    if (confirm('Are you sure you want to delete this dish?')) {
      await db.menu.delete(id);
      fetchMenu();
    }
  };

  const handleOpenAdd = () => {
    setEditItem(null);
    setName('');
    setPrice('');
    setCategory('chai');
    setIsVeg(true);
    setDescription('');
    setImageFile(null);
    setImageUrl('');
    setSpicy(0);
    setShowForm(true);
  };

  const handleOpenEdit = (item) => {
    setEditItem(item);
    setName(item.name);
    setPrice(item.price);
    setCategory(item.category);
    setIsVeg(item.isVeg);
    setDescription(item.description);
    setImageFile(null);
    setImageUrl(item.image || '');
    setSpicy(item.spicy || 0);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) return;

    const payload = {
      name,
      price: parseFloat(price),
      category,
      isVeg,
      description,
      spicy: parseInt(spicy, 10),
      image: imageUrl
    };

    if (editItem) {
      // Update
      let uploadUrl = imageUrl;
      if (imageFile) {
        uploadUrl = await db.menu.create(payload, imageFile).then(res => res.image);
      }
      await db.menu.update(editItem.id, { ...payload, image: uploadUrl });
    } else {
      // Create
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      await db.menu.create({
        id: slug || Date.now().toString(),
        ...payload,
        isAvailable: true,
        isBestSeller: false,
        recommended: false
      }, imageFile);
    }

    setShowForm(false);
    fetchMenu();
  };

  const filteredItems = items.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) || 
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <ConnectionBanner />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search menu..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-accent"
          />
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-black"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #F0C948)' }}
        >
          ➕ Add New Dish
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-xl p-5 space-y-4" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h4 className="text-accent text-sm font-semibold">{editItem ? 'Edit Dish details' : 'Add New Dish'}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Dish Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-accent"
              required
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-accent"
              required
            />
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="px-3 py-2 rounded-lg text-xs bg-[#1A2B18] border border-white/10 text-white outline-none focus:border-accent"
            >
              {MENU_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
            <div className="flex items-center gap-4">
              <label className="text-white/60 text-xs font-semibold">Food Type:</label>
              <button
                type="button"
                onClick={() => setIsVeg(true)}
                className={`px-3 py-1 rounded text-[10px] uppercase font-bold border ${isVeg ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'border-white/10 text-white/40'}`}
              >
                Veg
              </button>
              <button
                type="button"
                onClick={() => setIsVeg(false)}
                className={`px-3 py-1 rounded text-[10px] uppercase font-bold border ${!isVeg ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'border-white/10 text-white/40'}`}
              >
                Non-Veg
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-white/60 text-xs font-semibold">Spicy Level:</label>
              <select
                value={spicy}
                onChange={e => setSpicy(e.target.value)}
                className="px-2 py-1 rounded text-[10px] bg-[#1A2B18] border border-white/10 text-white outline-none"
              >
                <option value="0">Mild 🍃</option>
                <option value="1">Medium 🌶️</option>
                <option value="2">Spicy 🌶️🌶️</option>
              </select>
            </div>

            <div>
              <label className="text-white/60 text-[10px] block mb-0.5">Dish Image (File)</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => setImageFile(e.target.files[0])}
                className="text-[10px] text-white/60 file:bg-white/10 file:border-0 file:rounded-md file:text-white file:px-2 file:py-1 file:cursor-pointer"
              />
            </div>
            
            <input
              type="text"
              placeholder="Or enter Image URL directly"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              className="px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-accent"
            />

            <input
              type="text"
              placeholder="Short Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="col-span-1 sm:col-span-2 px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-accent"
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 rounded-full text-xs font-bold bg-[#D4AF37] text-black hover:bg-[#F0C948] transition-colors">
              {editItem ? 'Save Updates' : 'Add to Menu'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-full text-xs font-bold bg-white/10 text-white hover:bg-white/20 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-white/50 text-center py-10 text-sm">Loading Menu items...</p>
      ) : (
        <div className="space-y-2">
          {filteredItems.map(item => (
            <div key={item.id} className="flex items-center justify-between p-3.5 rounded-xl" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                  <p className="text-white/40 text-xs">₹{item.price} · <span className="uppercase text-[10px] tracking-wide">{item.category}</span></p>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-3 flex-shrink-0">
                <button
                  onClick={() => handleToggleBestseller(item.id, item.isBestSeller)}
                  className={`text-xs font-bold px-2 py-0.5 rounded transition-all ${item.isBestSeller ? 'bg-yellow-500/10 text-yellow-400' : 'text-white/30 hover:text-white'}`}
                >
                  ⭐ Best
                </button>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.isVeg ? 'text-green-400' : 'text-red-400'}`} style={{ background: item.isVeg ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)' }}>
                  {item.isVeg ? 'VEG' : 'NON'}
                </span>
                <button onClick={() => handleToggleAvailable(item.id, item.isAvailable)} className="text-white/60 hover:text-white transition-colors" title="Toggle active status">
                  {item.isAvailable !== false ? <ToggleRight className="w-6 h-6 text-green-400" /> : <ToggleLeft className="w-6 h-6 text-red-400" />}
                </button>
                <button onClick={() => handleOpenEdit(item)} className="text-accent hover:text-yellow-300 p-1" title="Edit Dish">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDeleteItem(item.id)} className="text-red-400 hover:text-red-300 transition-colors p-1" title="Delete Dish">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <p className="text-white/40 text-center py-6 text-xs">No matching dishes found.</p>
          )}
        </div>
      )}
    </div>
  );
};

const ToggleLeft = ({ className }) => <XCircle className={className} />;
const ToggleRight = ({ className }) => <CheckCircle className={className} />;

// 3. RESERVATIONS PANEL
const ReservationsPanel = ({ dbStatus }) => {
  const [res, setRes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    setLoading(true);
    const data = await db.reservations.getAll();
    setRes(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchReservations();
  }, [dbStatus]);

  const updateStatus = async (id, status) => {
    await db.reservations.updateStatus(id, status);
    fetchReservations();
  };

  const deleteRes = async (id) => {
    if (confirm('Delete this reservation?')) {
      await db.reservations.delete(id);
      fetchReservations();
    }
  };

  const reservationsArray = Array.isArray(res) ? res : [];

  // Export Bookings CSV
  const handleExportCSV = () => {
    if (reservationsArray.length === 0) return;
    const headers = ['ID', 'Customer Name', 'Phone', 'Email', 'Guests', 'Seating', 'Date', 'Time', 'Notes', 'Occasion', 'Status', 'Created At'];
    const rows = reservationsArray.map(r => [
      r.id || '',
      r.customer_name || '',
      r.phone || '',
      r.email || '',
      r.guests || 2,
      r.seating_type || '',
      r.reservation_date || '',
      r.reservation_time || '',
      (r.special_note || '').replace(/"/g, '""'),
      r.occasion || '',
      r.status || 'pending',
      r.created_at || ''
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(row => row.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `chaipal_reservations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = reservationsArray.filter(r => {
    if (!r) return false;
    const nameMatch = (r.customer_name || '').toLowerCase().includes((search || '').toLowerCase());
    const phoneMatch = (r.phone || '').includes(search || '');
    return nameMatch || phoneMatch;
  });

  return (
    <div className="space-y-6">
      <ConnectionBanner />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-accent"
          />
        </div>
        <button
          onClick={handleExportCSV}
          disabled={reservationsArray.length === 0}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-black disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #F0C948)' }}
        >
          <FileText className="w-3.5 h-3.5" /> Export Bookings CSV
        </button>
      </div>

      {loading ? (
        <p className="text-white/50 text-center py-10 text-sm">Loading Bookings...</p>
      ) : (
        <div className="space-y-3">
          {filtered.map(r => (
            <div key={r.id} className="p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <div className="flex items-center gap-2.5">
                  <p className="text-white text-sm font-bold">{r.customer_name || 'Guest'}</p>
                  <span className="text-[9px] uppercase font-black px-2 py-0.5 rounded" style={{ background: r.status === 'confirmed' ? 'rgba(34,197,94,0.15)' : r.status === 'pending' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)', color: r.status === 'confirmed' ? '#22C55E' : r.status === 'pending' ? '#F59E0B' : '#EF4444' }}>
                    {r.status}
                  </span>
                </div>
                <p className="text-white/40 text-xs mt-1">📅 Date: {r.reservation_date} · 🕐 Time: {r.reservation_time} · 👥 {r.guests} guests · 💺 Seating: {r.seating_type}</p>
                <p className="text-[10px] text-white/50">📞 Contact: {r.phone || 'N/A'} {r.email ? `· 📧 ${r.email}` : ''}</p>
                {r.occasion && <p className="text-[10px] text-accent mt-0.5">🎉 Occasion: {r.occasion}</p>}
                {r.special_note && <p className="text-[10px] text-white/40 italic mt-0.5">🗒️ Notes: {r.special_note}</p>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                <button onClick={() => updateStatus(r.id, 'confirmed')} className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold hover:bg-green-500/20 transition-all">Confirm</button>
                <button onClick={() => updateStatus(r.id, 'cancelled')} className="px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all">Cancel</button>
                <button onClick={() => deleteRes(r.id)} className="text-white/35 hover:text-white p-1.5 ml-1"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-white/40 text-center py-6 text-xs">No reservations logged.</p>
          )}
        </div>
      )}
    </div>
  );
};

// 4. CROWD PANEL
const CrowdPanel = ({ dbStatus }) => {
  const [level, setLevel] = useState(0);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchCrowd = async () => {
    setLoading(true);
    const data = await db.crowd.get();
    setLevel(data.current_level);
    setMsg(data.message || '');
    setLoading(false);
  };

  useEffect(() => {
    fetchCrowd();
  }, [dbStatus]);

  const handleUpdate = async (selectedLevel) => {
    setSaving(true);
    let defaultMsg = 'Plenty of seating available. Perfect for studying or quiet work!';
    if (selectedLevel === 1) defaultMsg = 'Cafe is moderately busy. A few cozy spots still open!';
    if (selectedLevel === 2) defaultMsg = 'Cafe is busy. Expected waiting time around 20-30 mins!';
    
    const finalMsg = msg && msg !== defaultMsg ? msg : defaultMsg;
    await db.crowd.update(selectedLevel, finalMsg);
    setLevel(selectedLevel);
    setMsg(finalMsg);
    setSaving(false);
  };

  const handleCustomMessageSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await db.crowd.update(level, msg);
    setSaving(false);
    alert('Crowd message updated successfully!');
  };

  if (loading) return <p className="text-white/50 text-center py-10 text-sm">Loading crowd status...</p>;

  return (
    <div className="space-y-6">
      <ConnectionBanner />

      <h3 className="text-white font-semibold text-sm">Select Cafe Crowd Status</h3>
      
      <div className="space-y-3">
        {[{ id: 0, label: 'Peaceful', color: '#22C55E', desc: 'Plenty of seating available' },
          { id: 1, label: 'Moderate', color: '#F59E0B', desc: 'About half full' },
          { id: 2, label: 'Busy', color: '#EF4444', desc: 'Almost full, short wait expected' }].map(s => (
          <button key={s.id} onClick={() => handleUpdate(s.id)}
            disabled={saving}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${level === s.id ? 'border-white/20' : 'border-transparent'}`}
            style={{ background: level === s.id ? `${s.color}15` : '#1A2B18' }}
          >
            <span className="w-3 h-3 rounded-full" style={{ background: s.color }} />
            <div className="text-left flex-1">
              <p className="text-white font-semibold text-sm">{s.label}</p>
              <p className="text-white/40 text-xs">{s.desc}</p>
            </div>
            {level === s.id && <CheckCircle className="w-4 h-4 ml-auto" style={{ color: s.color }} />}
          </button>
        ))}
      </div>

      <form onSubmit={handleCustomMessageSave} className="rounded-xl p-5 space-y-4" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.06)' }}>
        <h4 className="text-accent text-xs font-bold uppercase tracking-wider">Broadcast Crowd Alert Message</h4>
        <textarea
          rows={3}
          value={msg}
          onChange={e => setMsg(e.target.value)}
          placeholder="Enter crowd update warning to display on the public website..."
          className="w-full p-3 rounded-xl text-xs bg-white/5 border border-white/10 text-white outline-none resize-none focus:border-accent"
          required
        />
        <button type="submit" disabled={saving} className="px-4 py-2 rounded-full text-xs font-bold bg-[#D4AF37] text-black hover:bg-[#F0C948] transition-colors">
          {saving ? 'Saving...' : 'Update Custom Broadcast'}
        </button>
      </form>
    </div>
  );
};

// 5. OFFERS PANEL (Fixing broken editing / creation)
const OffersPanel = ({ dbStatus }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form/Modal States
  const [showForm, setShowForm] = useState(false);
  const [editOffer, setEditOffer] = useState(null);
  
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [emoji, setEmoji] = useState('⚡');
  const [description, setDescription] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const fetchOffers = async () => {
    setLoading(true);
    const data = await db.offers.getAll();
    setOffers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOffers();
  }, [dbStatus]);

  const handleOpenAdd = () => {
    setEditOffer(null);
    setTitle('');
    setSubtitle('');
    setDiscountPercent('');
    setEmoji('⚡');
    setDescription('');
    setExpiryDate('');
    setImageFile(null);
    setImageUrl('');
    setShowForm(true);
  };

  const handleOpenEdit = (o) => {
    setEditOffer(o);
    setTitle(o.title);
    setSubtitle(o.subtitle || '');
    setDiscountPercent(o.discount_percentage || o.discount || '');
    setEmoji(o.emoji || '⚡');
    setDescription(o.description || '');
    setExpiryDate(o.expiry_date ? new Date(o.expiry_date).toISOString().split('T')[0] : '');
    setImageFile(null);
    setImageUrl(o.image || '');
    setShowForm(true);
  };

  const handleToggleOfferActive = async (id, currentVal) => {
    await db.offers.update(id, { active: !currentVal });
    fetchOffers();
  };

  const handleDeleteOffer = async (id) => {
    if (confirm('Delete this special offer?')) {
      await db.offers.delete(id);
      fetchOffers();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !discountPercent) return;

    const payload = {
      title,
      subtitle,
      discount_percentage: discountPercent,
      emoji,
      description,
      image: imageUrl,
      expiry_date: expiryDate ? new Date(expiryDate).toISOString() : null
    };

    if (editOffer) {
      // Edit
      let uploadUrl = imageUrl;
      if (imageFile) {
        uploadUrl = await db.offers.create(payload, imageFile).then(res => res.image);
      }
      await db.offers.update(editOffer.id, { ...payload, image: uploadUrl });
    } else {
      // Add
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      await db.offers.create({
        id: id || Date.now().toString(),
        ...payload,
        badge: 'Special Deal',
        active: true
      }, imageFile);
    }

    setShowForm(false);
    fetchOffers();
  };

  return (
    <div className="space-y-6">
      <ConnectionBanner />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Special Offers ({offers.length})</h3>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-black"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #F0C948)' }}
        >
          ➕ Create New Offer
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-xl p-5 space-y-4" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h4 className="text-accent text-sm font-semibold">{editOffer ? 'Edit Special Offer' : 'Create Special Offer'}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <input type="text" placeholder="Title (e.g. Happy Hour Chai)" value={title} onChange={e => setTitle(e.target.value)} className="px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-accent" required />
            <input type="text" placeholder="Subtitle (e.g. Every day, 3-5 PM)" value={subtitle} onChange={e => setSubtitle(e.target.value)} className="px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-accent" />
            <input type="text" placeholder="Discount (e.g. 33% OFF / COMBO @ ₹70)" value={discountPercent} onChange={e => setDiscountPercent(e.target.value)} className="px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-accent" required />
            <input type="text" placeholder="Emoji (e.g. ☕)" value={emoji} onChange={e => setEmoji(e.target.value)} className="px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-accent" />
            
            <div>
              <label className="text-white/60 text-[10px] block mb-0.5">Expiry Date</label>
              <input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} className="w-full px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-accent" />
            </div>

            <div>
              <label className="text-white/60 text-[10px] block mb-0.5">Banner Image (File)</label>
              <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="text-[10px] text-white/60 file:bg-white/10 file:border-0 file:rounded-md file:text-white file:px-2 file:py-1 file:cursor-pointer" />
            </div>

            <input type="text" placeholder="Or enter banner Image URL directly" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-accent" />

            <input type="text" placeholder="Brief Description" value={description} onChange={e => setDescription(e.target.value)} className="col-span-1 sm:col-span-2 px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-accent" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 rounded-full text-xs font-bold bg-[#D4AF37] text-black hover:bg-[#F0C948] transition-colors">{editOffer ? 'Save Updates' : 'Add Offer'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-full text-xs font-bold bg-white/10 text-white hover:bg-white/20 transition-colors">Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-white/50 text-center py-10 text-sm">Loading offers...</p>
      ) : (
        <div className="space-y-3">
          {offers.map(o => (
            <div key={o.id} className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{o.emoji || '⚡'}</span>
                  <p className="text-white text-sm font-semibold">{o.title}</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/25">{o.discount_percentage || o.discount}</span>
                </div>
                <p className="text-white/40 text-xs mt-1">{o.subtitle} · {o.description}</p>
                {o.expiry_date && (
                  <p className="text-[9px] text-red-400 mt-1">⏳ Expires: {new Date(o.expiry_date).toLocaleDateString()}</p>
                )}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button onClick={() => handleToggleOfferActive(o.id, o.active)} className="text-xs font-bold px-3 py-1.5 rounded-full border transition-all" style={{ background: o.active ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)', borderColor: o.active ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)', color: o.active ? '#22C55E' : '#EF4444' }}>
                  {o.active !== false ? 'Active' : 'Disabled'}
                </button>
                <button onClick={() => handleOpenEdit(o)} className="text-accent hover:text-yellow-300 p-1">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDeleteOffer(o.id)} className="text-red-400 hover:text-red-300 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {offers.length === 0 && (
            <p className="text-white/40 text-center py-6 text-xs">No special offers set.</p>
          )}
        </div>
      )}
    </div>
  );
};

// 6. AI FAQ RULES PANEL
const AISettingsPanel = ({ dbStatus }) => {
  const [rules, setRules] = useState([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [newResponse, setNewResponse] = useState('');
  
  const [testInput, setTestInput] = useState('');
  const [testResponse, setTestResponse] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchRules = async () => {
    setLoading(true);
    const data = await db.ai.getAllRules();
    setRules(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRules();
  }, [dbStatus]);

  const handleAddRule = async () => {
    if (!newKeyword.trim() || !newResponse.trim()) return;
    const rule = {
      keyword: newKeyword.toLowerCase().trim(),
      response: newResponse.trim()
    };
    const res = await db.ai.createRule(rule);
    if (!res) {
      alert('This keyword trigger is already registered!');
    } else {
      setNewKeyword('');
      setNewResponse('');
      fetchRules();
    }
  };

  const handleDeleteRule = async (id) => {
    await db.ai.deleteRule(id);
    fetchRules();
  };

  const runTest = () => {
    if (!testInput.trim()) return;
    const q = testInput.toLowerCase().trim();
    const matchedRule = rules.find(r => q.includes(r.keyword.toLowerCase()));
    
    if (matchedRule) {
      setTestResponse(`🍵 [Rule Match]: "${matchedRule.response}"`);
    } else {
      // standard FAQs
      if (q.includes('menu') || q.includes('food') || q.includes('drink')) {
        setTestResponse(`🍵 [FAQ Match]: We have a full range of chais and sizzlers! Check out /menu.`);
      } else if (q.includes('reserve') || q.includes('book')) {
        setTestResponse(`🍵 [FAQ Match]: Reserve your spot on /reserve!`);
      } else {
        setTestResponse(`🍵 [No Match]: "Thank you for asking! Please WhatsApp us for instant help."`);
      }
    }
  };

  return (
    <div className="space-y-6">
      <ConnectionBanner />

      <h3 className="text-white font-semibold">AI Assistant Settings</h3>

      {/* Add Q&A Rule */}
      <div className="rounded-xl p-5 space-y-4" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.06)' }}>
        <h4 className="text-accent text-xs font-bold uppercase tracking-wider">Train AI (Add Custom FAQ Rules)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Keyword triggers (e.g. toilet, parking, music)"
            value={newKeyword}
            onChange={e => setNewKeyword(e.target.value)}
            className="px-3 py-2.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-accent"
          />
          <input
            type="text"
            placeholder="AI's specific response text..."
            value={newResponse}
            onChange={e => setNewResponse(e.target.value)}
            className="px-3 py-2.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-accent"
          />
        </div>
        <button onClick={handleAddRule} className="px-4 py-2 rounded-full text-xs font-bold bg-[#D4AF37] text-black hover:bg-[#F0C948] transition-colors">
          Add Custom Rule
        </button>
      </div>

      {/* FAQ Rules List */}
      <div className="space-y-2">
        <h4 className="text-white/60 text-xs font-bold uppercase tracking-wider">Active Custom FAQ Rules ({rules.length})</h4>
        {loading ? (
          <p className="text-white/40 text-xs">Loading FAQ triggers...</p>
        ) : (
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {rules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-3 rounded-xl text-xs" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div>
                  <p className="font-extrabold text-accent">Keyword trigger: "{rule.keyword}"</p>
                  <p className="text-white/60 mt-0.5">Response: {rule.response}</p>
                </div>
                <button onClick={() => handleDeleteRule(rule.id)} className="text-red-400 p-1 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            {rules.length === 0 && (
              <p className="text-white/40 text-xs py-4 text-center">No FAQ rules created yet.</p>
            )}
          </div>
        )}
      </div>

      {/* Chat Tester */}
      <div className="rounded-xl p-5 space-y-3" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.06)' }}>
        <h4 className="text-accent text-xs font-bold uppercase tracking-wider">Live Chatbot Tester</h4>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask AI chatbot a test question..."
            value={testInput}
            onChange={e => setTestInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && runTest()}
            className="flex-1 px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-accent"
          />
          <button onClick={runTest} className="px-4 py-2 rounded-full text-xs font-bold bg-white/10 text-white hover:bg-white/20 transition-all">Test</button>
        </div>
        {testResponse && (
          <div className="p-3 rounded-lg bg-black/25 border border-white/5 text-xs text-white/95 leading-relaxed font-semibold">
            {testResponse}
          </div>
        )}
      </div>
    </div>
  );
};

// 7. QR GENERATOR PANEL (Generating QRs locally and supporting printing/downloads)
const QRPanel = ({ dbStatus }) => {
  const [tables, setTables] = useState([]);
  const [newTableNum, setNewTableNum] = useState('');
  const [loading, setLoading] = useState(true);
  const printRefs = useRef({});

  const fetchTables = async () => {
    setLoading(true);
    const data = await db.qr.getAll();
    setTables(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTables();
  }, [dbStatus]);

  const handleAddTable = async (e) => {
    e.preventDefault();
    if (!newTableNum) return;
    const added = await db.qr.create(newTableNum);
    if (!added) {
      alert('This table number is already registered!');
    } else {
      setNewTableNum('');
      fetchTables();
    }
  };

  const handleDeleteTable = async (id) => {
    if (confirm('Are you sure you want to delete this table QR?')) {
      await db.qr.delete(id);
      fetchTables();
    }
  };

  // Download QR Code PNG
  const handleDownloadQR = (tableNum) => {
    const canvas = document.getElementById(`qr-canvas-${tableNum}`);
    if (!canvas) return;
    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `chaipal_table_${tableNum}_qr.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Print Table QR Card
  const handlePrintQR = (tableNum) => {
    const canvas = document.getElementById(`qr-canvas-${tableNum}`);
    if (!canvas) return;
    const qrImage = canvas.toDataURL("image/png");

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR - Table ${tableNum}</title>
          <style>
            body {
              font-family: 'Inter', sans-serif;
              text-align: center;
              padding: 40px;
              background-color: #FAF7F0;
              color: #1A1A1A;
            }
            .card {
              border: 3px solid #2D4A27;
              border-radius: 20px;
              padding: 30px;
              max-width: 350px;
              margin: 0 auto;
              background: #FFFFFF;
              box-shadow: 0 8px 30px rgba(0,0,0,0.1);
            }
            .header {
              font-size: 26px;
              font-family: 'Cormorant Garamond', serif;
              color: #2D4A27;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .subheader {
              font-size: 11px;
              color: #6B7280;
              text-transform: uppercase;
              letter-spacing: 2px;
              margin-bottom: 25px;
            }
            .qr-wrapper {
              margin: 20px 0;
            }
            .table-num {
              font-size: 22px;
              font-weight: bold;
              background: #2D4A27;
              color: #FFFFFF;
              display: inline-block;
              padding: 8px 24px;
              border-radius: 50px;
              margin-top: 15px;
            }
            .footer-text {
              font-size: 11px;
              color: #8B4513;
              margin-top: 20px;
              font-weight: 600;
            }
          </style>
        </head>
        <body onload="window.print();window.close();">
          <div class="card">
            <div class="header">Chaipal Garden Cafe</div>
            <div class="subheader">Scan to View Menu</div>
            <div class="qr-wrapper">
              <img src="${qrImage}" width="200" height="200" />
            </div>
            <div class="table-num">TABLE ${tableNum}</div>
            <div class="footer-text">🍃 Organic Chais & fusion bites 🍃</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
      <ConnectionBanner />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-white font-semibold">Registered Tables ({tables.length})</h3>
        <form onSubmit={handleAddTable} className="flex gap-2">
          <input
            type="number"
            placeholder="Table number..."
            value={newTableNum}
            onChange={e => setNewTableNum(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white outline-none w-32 focus:border-accent"
            required
          />
          <button type="submit" className="px-4 py-2 rounded-xl text-xs font-bold text-black" style={{ background: 'linear-gradient(135deg, #D4AF37, #F0C948)' }}>
            Add Table
          </button>
        </form>
      </div>

      {loading ? (
        <p className="text-white/50 text-center py-10 text-sm">Loading QR Tables...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {tables.map(t => {
            const tableUrl = `${window.location.origin}/qr/table-${t.table_number}`;
            return (
              <div key={t.id} className="rounded-xl p-4 text-center flex flex-col justify-between" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div>
                  <div className="bg-white p-2 rounded-lg display-inline-block mx-auto mb-3 w-max">
                    {/* Render Canvas locally with package */}
                    <QRCodeCanvas
                      id={`qr-canvas-${t.table_number}`}
                      value={tableUrl}
                      size={110}
                      level="H"
                    />
                  </div>
                  <p className="text-white text-sm font-semibold">Table {t.table_number}</p>
                  <p className="text-[9px] text-white/40 truncate select-all">{tableUrl}</p>
                </div>
                
                <div className="flex items-center gap-1 mt-4">
                  <button onClick={() => handleDownloadQR(t.table_number)} className="flex-1 py-1 rounded bg-white/5 hover:bg-white/15 text-[10px] text-white font-medium flex items-center justify-center gap-1" title="Download QR PNG">
                    <Download className="w-3 h-3" /> Save
                  </button>
                  <button onClick={() => handlePrintQR(t.table_number)} className="flex-1 py-1 rounded bg-accent/20 hover:bg-accent/30 text-[10px] text-accent font-medium flex items-center justify-center gap-1" title="Print QR card">
                    <Printer className="w-3 h-3" /> Print
                  </button>
                  <button onClick={() => handleDeleteTable(t.id)} className="p-1 text-red-400 hover:text-red-300" title="Delete Table">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
          {tables.length === 0 && (
            <p className="col-span-full text-white/40 text-center py-6 text-xs">No tables registered yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

// 8. REVIEWS PANEL
const ReviewsPanel = ({ dbStatus }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    const data = await db.reviews.getAll();
    setReviews(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, [dbStatus]);

  const handleToggleApproval = async (id, currentVal) => {
    await db.reviews.updateApproval(id, !currentVal);
    fetchReviews();
  };

  const handleDeleteReview = async (id) => {
    if (confirm('Delete this customer review?')) {
      await db.reviews.delete(id);
      fetchReviews();
    }
  };

  return (
    <div className="space-y-6">
      <ConnectionBanner />

      <h3 className="text-white font-semibold">Incoming Customer Reviews</h3>

      {loading ? (
        <p className="text-white/50 text-center py-10 text-sm">Loading reviews...</p>
      ) : (
        <div className="space-y-3">
          {reviews.map(r => (
            <div key={r.id} className="rounded-xl p-4 flex flex-col sm:flex-row justify-between gap-4" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center" style={{ background: r.avatar_color || r.avatarColor || '#2D4A27' }}>
                      {r.avatar || (r.customer_name ? r.customer_name[0] : 'C')}
                    </div>
                    <p className="text-white text-sm font-medium">{r.customer_name || r.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent text-xs">{'★'.repeat(r.rating)}</span>
                    <span className="text-white/30 text-xs">
                      {r.created_at ? new Date(r.created_at).toLocaleDateString() : r.date}
                    </span>
                  </div>
                </div>
                <p className="text-white/70 text-xs leading-relaxed">"{r.review_text || r.text}"</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${r.approved ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {r.approved ? 'APPROVED & PUBLIC' : 'PENDING APPROVAL'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                <button
                  onClick={() => handleToggleApproval(r.id, r.approved)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                    r.approved
                      ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                      : 'bg-green-500/10 border-green-500/30 text-green-400'
                  }`}
                >
                  {r.approved ? 'Hide/Reject' : '✓ Approve Review'}
                </button>
                <button onClick={() => handleDeleteReview(r.id)} className="text-red-400 hover:text-red-300 p-1.5">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {reviews.length === 0 && (
            <p className="text-white/40 text-center py-6 text-xs">No customer reviews submitted.</p>
          )}
        </div>
      )}
    </div>
  );
};

// 9. ANALYTICS PANEL (Overhauled to display custom reservation, occupancy, and scan charts)
const AnalyticsPanel = ({ dbStatus }) => {
  const [res, setRes] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      const bookings = await db.reservations.getAll();
      setRes(bookings || []);
      const events = await db.analytics.getAll();
      setAnalytics(events || []);
      const revs = await db.reviews.getAll();
      setReviews(revs || []);
      setLoading(false);
    };
    fetchAnalyticsData();
  }, [dbStatus]);

  if (loading) return <p className="text-white/50 text-center py-10 text-sm">Loading Analytics...</p>;

  const bookingsArray = Array.isArray(res) ? res : [];
  const analyticsArray = Array.isArray(analytics) ? analytics : [];
  const reviewsArray = Array.isArray(reviews) ? reviews : [];

  // A. Reservations by Seating Area (Pie Chart)
  const getSeatingData = () => {
    const counts = {};
    bookingsArray.forEach(r => {
      if (r && r.seating_type) {
        counts[r.seating_type] = (counts[r.seating_type] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  // B. QR scans per Table (Bar Chart)
  const getScanData = () => {
    const counts = {};
    analyticsArray
      .filter(e => e && e.event_type === 'qr_scan')
      .forEach(e => {
        const table = e.event_value ? e.event_value.replace('table-', 'T') : 'T?';
        counts[table] = (counts[table] || 0) + 1;
      });
    
    // Sort tables chronologically
    return Object.entries(counts)
      .map(([table, scans]) => ({ table, scans }))
      .sort((a,b) => a.table.localeCompare(b.table, undefined, {numeric: true}));
  };

  // C. Peak Booking Times (Line Chart)
  const getPeakBookingTimes = () => {
    const counts = {};
    bookingsArray.forEach(r => {
      if (r && r.reservation_time) {
        counts[r.reservation_time] = (counts[r.reservation_time] || 0) + 1;
      }
    });

    // Custom sort slots
    const order = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];
    return order.map(time => ({
      time,
      bookings: counts[time] || 0
    }));
  };

  // D. Ratings Breakdown (Pie Chart)
  const getRatingData = () => {
    const counts = { '5 Star': 0, '4 Star': 0, '3 Star': 0, '2 Star': 0, '1 Star': 0 };
    reviewsArray.forEach(r => {
      if (r && r.rating) {
        const key = `${r.rating} Star`;
        if (counts[key] !== undefined) counts[key]++;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const seatingData = getSeatingData();
  const scanData = getScanData();
  const peakTimeData = getPeakBookingTimes();
  const ratingData = getRatingData();

  const PIE_COLORS = ['#2D4A27', '#8B4513', '#D4AF37', '#A0522D', '#22C55E', '#3B82F6'];

  return (
    <div className="space-y-6">
      <ConnectionBanner />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reservation seating preferences */}
        <div className="rounded-xl p-5" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" /> Seating Occupancy Shares
          </h3>
          {seatingData.length > 0 ? (
            <div className="flex items-center justify-around h-44">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie data={seatingData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={55}>
                    {seatingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 text-xs text-white/60">
                {seatingData.map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[idx % PIE_COLORS.length] }} />
                    <span>{item.name}: <strong>{item.value}</strong></span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-white/40 text-xs text-center py-16">No bookings to calculate seating preferences.</p>
          )}
        </div>

        {/* Local QR Scans per Table */}
        <div className="rounded-xl p-5" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <QrCode className="w-4 h-4 text-accent" /> Customer QR Scan Hits
          </h3>
          {scanData.length > 0 ? (
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={scanData}>
                <XAxis dataKey="table" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: '#0F1A0D', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                <Bar dataKey="scans" fill="#D4AF37" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-white/40 text-xs text-center py-16">No customer QR scans recorded yet.</p>
          )}
        </div>

        {/* Peak Reservation Hours */}
        <div className="rounded-xl p-5 md:col-span-2" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent" /> Hourly Reservation Demands
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={peakTimeData}>
              <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: '#0F1A0D', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
              <Line type="monotone" dataKey="bookings" stroke="#2D4A27" strokeWidth={3} dot={{ fill: '#D4AF37' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Star Rating distributions */}
        <div className="rounded-xl p-5" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-accent" /> Review Score Distributives
          </h3>
          {reviews.length > 0 ? (
            <div className="flex items-center justify-around h-44">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie data={ratingData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={55}>
                    {ratingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1 text-[11px] text-white/60">
                {ratingData.map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[idx % PIE_COLORS.length] }} />
                    <span>{item.name}: <strong>{item.value}</strong></span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-white/40 text-xs text-center py-16">No customer ratings to analyze.</p>
          )}
        </div>

        {/* Customer Engagement Stats */}
        <div className="rounded-xl p-5" style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" /> Customer Engagements
          </h3>
          <div className="space-y-3.5 text-xs text-white/80">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span>Total Bookings Logged</span>
              <strong className="text-accent">{bookingsArray.length}</strong>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span>Total Scans Logged</span>
              <strong className="text-accent">{analyticsArray.filter(e => e && e.event_type === 'qr_scan').length}</strong>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span>Feedback Forms Filled</span>
              <strong className="text-accent">{reviewsArray.length}</strong>
            </div>
            <div className="flex justify-between pb-1">
              <span>Menu Views Tracked</span>
              <strong className="text-accent">{analyticsArray.filter(e => e && e.event_value === 'menu').length}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Admin Shell ──────────────────────────────────────────────────────────

const AdminPage = () => {
  const [activePanel, setActivePanel] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Database connection status state
  const [dbStatus, setDbStatus] = useState('checking');
  const [testingConnection, setTestingConnection] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    // Subscribe to database connection status changes
    const unsubscribe = subscribeToConnectionStatus((status) => {
      setDbStatus(status);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setToastMessage({ type: 'info', text: 'Testing connection to Supabase Cloud...' });
    const result = await checkSupabaseConnection();
    setTestingConnection(false);
    if (result.status === 'connected') {
      setToastMessage({ type: 'success', text: 'Connected successfully to Supabase Cloud database! 🍵' });
    } else if (result.status === 'demo') {
      setToastMessage({ type: 'warning', text: 'Keys not configured. Operating in local fallback demo mode. ⚠️' });
    } else {
      setToastMessage({ type: 'error', text: `Connection failed: ${result.message}` });
    }
  };

  // Auth contexts and dual-mode login
  const { user, signIn, signOut, loading, isAuthenticated } = useAuth();
  const [localAuthed, setLocalAuthed] = useState(false);
  
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!db.isCloudMode()) {
      // Local fallback mode authentication
      if (pwd === 'admin') {
        setLocalAuthed(true);
      } else {
        setLoginError('Wrong password (hint: admin)');
      }
      return;
    }

    setLoggingIn(true);
    const { error } = await signIn(email, pwd);
    if (error) {
      setLoginError(error.message || 'Incorrect credentials');
    }
    setLoggingIn(false);
  };

  const handleLogout = async () => {
    if (!db.isCloudMode()) {
      setLocalAuthed(false);
      return;
    }
    await signOut();
  };

  const isUserAuthenticated = localAuthed || isAuthenticated;

  if (!isUserAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#071007' }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-sm rounded-2xl p-8"
          style={{ background: '#0F1A0D', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2D4A27, #8B4513)' }}>
              <Settings className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-white text-2xl font-bold mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Admin Access</h1>
            <p className="text-white/40 text-sm">Chaipal Garden Cafe Dashboard</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginError && (
              <div className="p-2.5 rounded-lg text-xs font-semibold bg-red-500/15 border border-red-500/25 text-red-400 text-center">
                {loginError}
              </div>
            )}
            
            {!db.isCloudMode() ? (
              <div className="p-2.5 rounded-lg text-[10px] bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-center font-medium">
                Operating in Demo Mode. Type "admin" to log in.
              </div>
            ) : (
              <div>
                <label className="block text-[10px] text-white/50 mb-1 font-semibold">Admin Email</label>
                <input
                  type="email"
                  placeholder="admin@chaipal.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs outline-none bg-white/5 border border-white/10 text-white focus:border-accent"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] text-white/50 mb-1 font-semibold">Password</label>
              <input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-xs outline-none bg-white/5 border border-white/10 text-white focus:border-accent"
                required
              />
            </div>
            
            <button
              id="admin-login-btn"
              type="submit"
              disabled={loggingIn}
              className="w-full py-3 rounded-full font-bold text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #2D4A27, #3d6235)' }}
            >
              {loggingIn ? 'Authenticating...' : 'Login'}
            </button>
          </form>
          <p className="text-center text-white/20 text-xs mt-4">Demo password: admin</p>
        </motion.div>
      </div>
    );
  }

  const renderPanel = () => {
    switch (activePanel) {
      case 'dashboard': return <DashboardPanel setPanel={setActivePanel} dbStatus={dbStatus} />;
      case 'menu': return <MenuManagerPanel dbStatus={dbStatus} />;
      case 'reservations': return <ReservationsPanel dbStatus={dbStatus} />;
      case 'crowd': return <CrowdPanel dbStatus={dbStatus} />;
      case 'offers': return <OffersPanel dbStatus={dbStatus} />;
      case 'ai': return <AISettingsPanel dbStatus={dbStatus} />;
      case 'qr': return <QRPanel dbStatus={dbStatus} />;
      case 'reviews': return <ReviewsPanel dbStatus={dbStatus} />;
      case 'analytics': return <AnalyticsPanel dbStatus={dbStatus} />;
      default: return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="text-5xl mb-4">🚧</div>
          <p className="text-white/50">This panel is coming soon</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#071007' }}>
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            className="fixed top-0 left-0 bottom-0 w-60 z-40 flex flex-col"
            style={{ background: '#0F1A0D', borderRight: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Logo */}
            <div className="p-5 border-b border-white/6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2D4A27, #8B4513)' }}>
                  <span className="text-white text-sm">🍃</span>
                </div>
                <div>
                  <p className="text-white text-sm font-bold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Chaipal Admin</p>
                  <p className="text-white/30 text-[10px]">{dbStatus === 'connected' ? 'Cloud database sync' : dbStatus === 'failed' ? 'Connection Failed (local)' : 'Demo Local database'}</p>
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {SIDEBAR_LINKS.map(link => {
                const isActive = activePanel === link.id;
                return (
                  <button
                    key={link.id}
                    id={`admin-nav-${link.id}`}
                    onClick={() => setActivePanel(link.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'text-white' : 'text-white/45 hover:text-white hover:bg-white/5'}`}
                    style={isActive ? { background: 'rgba(45,74,39,0.35)', color: '#D4AF37' } : {}}
                  >
                    <link.Icon className="w-4 h-4 flex-shrink-0" />
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-white/6 space-y-1">
              <a href="/" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all">
                <Eye className="w-4 h-4" /> View Site
              </a>
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-60' : 'ml-0'}`}>
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-3" style={{ background: 'rgba(7,16,7,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/50 hover:text-white transition-colors p-1">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="text-white font-semibold capitalize animate-fade-in">
              {SIDEBAR_LINKS.find(l => l.id === activePanel)?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {/* Connection Status indicator */}
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold transition-all"
              style={{
                background: dbStatus === 'connected' ? 'rgba(34,197,94,0.1)' : dbStatus === 'demo' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                borderColor: dbStatus === 'connected' ? 'rgba(34,197,94,0.3)' : dbStatus === 'demo' ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.3)',
                color: dbStatus === 'connected' ? '#22C55E' : dbStatus === 'demo' ? '#F59E0B' : '#EF4444'
              }}
              title={dbStatus === 'connected' ? 'Connected to Supabase Cloud' : dbStatus === 'demo' ? 'Local Demo Mode Active' : 'Supabase Connection Failed'}
            >
              <span 
                className="w-1.5 h-1.5 rounded-full animate-pulse" 
                style={{
                  background: dbStatus === 'connected' ? '#22C55E' : dbStatus === 'demo' ? '#F59E0B' : '#EF4444'
                }}
              />
              <span className="hidden sm:inline">
                {dbStatus === 'connected' ? 'Supabase Sync' : dbStatus === 'demo' ? 'Demo Mode' : 'Unreachable'}
              </span>
            </div>

            {/* Test Ping Button */}
            <button
              onClick={handleTestConnection}
              disabled={testingConnection}
              className="px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all text-[10px] font-bold flex items-center gap-1.5 disabled:opacity-50"
              title="Test Supabase Cloud Connection"
            >
              <RefreshCw className={`w-3 h-3 ${testingConnection ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Test Ping</span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-black transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F0C948)' }}
            >
              <Eye className="w-3.5 h-3.5" /> View Live Site
            </a>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #2D4A27, #8B4513)' }}>A</div>
          </div>
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePanel}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            {renderPanel()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dynamic Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            className="fixed top-20 right-6 z-50 p-4 rounded-xl shadow-lg border text-xs font-semibold flex items-center gap-3 animate-fade-in"
            style={{
              background: toastMessage.type === 'success' ? 'rgba(34,197,94,0.95)' : toastMessage.type === 'error' ? 'rgba(239,68,68,0.95)' : toastMessage.type === 'warning' ? 'rgba(245,158,11,0.95)' : 'rgba(59,130,246,0.95)',
              borderColor: 'rgba(255,255,255,0.15)',
              color: toastMessage.type === 'warning' ? '#1A1A1A' : 'white',
              backdropFilter: 'blur(8px)'
            }}
          >
            <span>{toastMessage.type === 'success' ? '✅' : toastMessage.type === 'error' ? '❌' : toastMessage.type === 'warning' ? '⚠️' : 'ℹ️'}</span>
            <span>{toastMessage.text}</span>
            <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-80 text-sm font-bold">×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;
