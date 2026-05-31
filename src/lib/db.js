import { supabase, isSupabaseConfigured, getSupabase } from './supabase';
import { MENU_ITEMS } from '../data/menu';
import { OFFERS } from '../data/offers';
import { TESTIMONIALS } from '../data/testimonials';

// Storage keys for LocalStorage mode
const KEYS = {
  MENU: 'chaipal_menu_items',
  RESERVATIONS: 'chaipal_reservations',
  CROWD: 'chaipal_crowd_level',
  OFFERS: 'chaipal_offers',
  REVIEWS: 'chaipal_reviews',
  QR_TABLES: 'chaipal_qr_tables',
  AI_RULES: 'chaipal_ai_faq_rules',
  ANALYTICS: 'chaipal_analytics'
};

// Helper: read/write local storage helper
const local = {
  get: (key, defaultValue) => {
    try {
      const val = localStorage.getItem(key);
      if (val === null || val === undefined || val === 'null' || val === 'undefined') {
        return defaultValue;
      }
      const parsed = JSON.parse(val);
      return parsed !== null && parsed !== undefined ? parsed : defaultValue;
    } catch (e) {
      console.error('Local storage get failed', e);
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Local storage set failed', e);
    }
  }
};

// Connection state tracking
let cloudModeActive = isSupabaseConfigured;
let connectionStatus = isSupabaseConfigured ? 'checking' : 'demo';

// Connection callback listeners (so that React components can subscribe to status updates!)
const statusListeners = new Set();

export const subscribeToConnectionStatus = (listener) => {
  statusListeners.add(listener);
  listener(connectionStatus); // Emit immediately on subscription
  return () => statusListeners.delete(listener);
};

const notifyStatusChange = () => {
  statusListeners.forEach(listener => {
    try {
      listener(connectionStatus);
    } catch (e) {
      console.error('Listener notification failed', e);
    }
  });
};

export const checkSupabaseConnection = async () => {
  const activeClient = getSupabase();
  if (!isSupabaseConfigured || !activeClient) {
    cloudModeActive = false;
    connectionStatus = 'demo';
    notifyStatusChange();
    console.log('🍵 [Supabase] Demo Mode: Environment credentials are not configured or invalid. Local fallback active.');
    return { status: 'demo', message: 'Demo Mode: Keys not configured' };
  }

  connectionStatus = 'checking';
  notifyStatusChange();
  
  try {
    // Perform lightweight ping query on the crowd_status table
    const { data, error } = await activeClient.from('crowd_status').select('id').eq('id', 1).maybeSingle();
    if (error) throw error;
    
    cloudModeActive = true;
    connectionStatus = 'connected';
    notifyStatusChange();
    console.log('🍵 [Supabase] Connected Successfully! Cloud database sync active.');
    return { status: 'connected', message: 'Supabase Connected Successfully!' };
  } catch (err) {
    cloudModeActive = false;
    connectionStatus = 'failed';
    notifyStatusChange();
    console.error('🍵 [Supabase] Connection test failed. Gracefully falling back to LocalStorage:', err.message || err);
    return { 
      status: 'failed', 
      message: err.message || 'Database connection timeout or project paused.' 
    };
  }
};

// Helper: Convert File to Base64 for local mode image persistence
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
};

// Initialize Local Storage defaults if not present
export const initializeLocalDB = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(KEYS.MENU)) local.set(KEYS.MENU, MENU_ITEMS);
  if (!localStorage.getItem(KEYS.OFFERS)) local.set(KEYS.OFFERS, OFFERS);
  if (!localStorage.getItem(KEYS.REVIEWS)) local.set(KEYS.REVIEWS, TESTIMONIALS);
  if (!localStorage.getItem(KEYS.CROWD)) {
    local.set(KEYS.CROWD, {
      id: 1,
      current_level: 0,
      message: 'Plenty of seating available. Perfect for studying or quiet work!',
      updated_at: new Date().toISOString()
    });
  }
  if (!localStorage.getItem(KEYS.RESERVATIONS)) {
    local.set(KEYS.RESERVATIONS, [
      { id: '1', customer_name: 'Priya Sharma', reservation_time: '7:00 PM', guests: 4, seating_type: 'Garden', status: 'confirmed', reservation_date: new Date().toISOString().split('T')[0], special_note: '' },
      { id: '2', customer_name: 'Arjun Mehra', reservation_time: '8:00 PM', guests: 2, seating_type: 'Romantic Corner', status: 'pending', reservation_date: new Date().toISOString().split('T')[0], special_note: '' },
      { id: '3', customer_name: 'Dev Agarwal', reservation_time: '7:30 PM', guests: 6, seating_type: 'Indoor AC', status: 'confirmed', reservation_date: new Date().toISOString().split('T')[0], special_note: '' }
    ]);
  }
  if (!localStorage.getItem(KEYS.QR_TABLES)) {
    const defaultTables = Array.from({ length: 12 }, (_, i) => ({
      id: `table-${i + 1}`,
      table_number: i + 1,
      created_at: new Date().toISOString()
    }));
    local.set(KEYS.QR_TABLES, defaultTables);
  }
  if (!localStorage.getItem(KEYS.AI_RULES)) {
    local.set(KEYS.AI_RULES, [
      { id: 'rule-1', keyword: 'wifi', response: 'Yes! We offer free high-speed WiFi. Just ask our staff for the password! 📶' },
      { id: 'rule-2', keyword: 'parking', response: 'Free two-wheeler parking is available right in front of the cafe. Car parking is available across the street. 🚗' },
      { id: 'rule-3', keyword: 'hours', response: 'We are open from 8:00 AM to 9:00 PM every single day of the week! ⏰' },
      { id: 'rule-4', keyword: 'location', response: 'We are located on Goner Road, opposite the HP Petrol Pump, Jaipur. 📍' },
      { id: 'rule-5', keyword: 'discount', response: 'Show your student ID to our staff for a flat 15% discount on the total bill! 🎓' }
    ]);
  }
  if (!localStorage.getItem(KEYS.ANALYTICS)) {
    local.set(KEYS.ANALYTICS, [
      { id: '1', event_type: 'qr_scan', event_value: 'table-1', created_at: new Date().toISOString() },
      { id: '2', event_type: 'qr_scan', event_value: 'table-3', created_at: new Date().toISOString() },
      { id: '3', event_type: 'page_view', event_value: 'menu', created_at: new Date().toISOString() }
    ]);
  }
};

initializeLocalDB();

// Run startup check asynchronously
checkSupabaseConnection();

// Image uploading helper
const uploadImageFile = async (bucketName, fileName, file) => {
  const client = getSupabase();
  if (cloudModeActive && client) {
    try {
      const { data, error } = await client.storage
        .from(bucketName)
        .upload(`${Date.now()}_${fileName}`, file, {
          cacheControl: '3600',
          upsert: true
        });
      if (error) throw error;
      const { data: publicUrlData } = client.storage
        .from(bucketName)
        .getPublicUrl(data.path);
      return publicUrlData.publicUrl;
    } catch (err) {
      console.error('🍵 [Supabase] Image upload failed, using fallback Base64:', err);
    }
  }
  return await fileToBase64(file);
};

export const db = {
  isCloudMode: () => cloudModeActive,
  getConnectionStatus: () => connectionStatus,

  // 1. MENU ITEMS
  menu: {
    getAll: async () => {
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { data, error } = await client
            .from('menu_items')
            .select('*')
            .order('created_at', { ascending: false });
          if (error) throw error;
          if (data) return data;
        } catch (err) {
          console.error('🍵 [Supabase] menu.getAll failed, using local storage fallback:', err.message || err);
        }
      }
      return local.get(KEYS.MENU, []);
    },
    create: async (item, imageFile) => {
      let imageUrl = item.image;
      if (imageFile) {
        imageUrl = await uploadImageFile('menu-images', imageFile.name, imageFile);
      }
      const newItem = {
        ...item,
        image: imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
        created_at: new Date().toISOString()
      };
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { data, error } = await client.from('menu_items').insert(newItem).select().single();
          if (error) throw error;
          if (data) return data;
        } catch (err) {
          console.error('🍵 [Supabase] menu.create failed, creating locally:', err.message || err);
        }
      }
      const current = local.get(KEYS.MENU, []);
      local.set(KEYS.MENU, [newItem, ...current]);
      return newItem;
    },
    update: async (id, updates) => {
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { data, error } = await client
            .from('menu_items')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
          if (error) throw error;
          if (data) return data;
        } catch (err) {
          console.error('🍵 [Supabase] menu.update failed, updating locally:', err.message || err);
        }
      }
      const current = local.get(KEYS.MENU, []);
      const updated = current.map(item => item.id === id ? { ...item, ...updates } : item);
      local.set(KEYS.MENU, updated);
      return updated.find(item => item.id === id);
    },
    delete: async (id) => {
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { error } = await client.from('menu_items').delete().eq('id', id);
          if (error) throw error;
        } catch (err) {
          console.error('🍵 [Supabase] menu.delete failed, deleting locally:', err.message || err);
        }
      }
      const current = local.get(KEYS.MENU, []);
      local.set(KEYS.MENU, current.filter(item => item.id !== id));
      return true;
    }
  },

  // 2. RESERVATIONS
  reservations: {
    getAll: async () => {
      let rawData = [];
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { data, error } = await client
            .from('reservations')
            .select('*')
            .order('created_at', { ascending: false });
          if (!error && data) {
            rawData = data;
          } else {
            if (error) throw error;
            rawData = local.get(KEYS.RESERVATIONS, []);
          }
        } catch (err) {
          console.error('🍵 [Supabase] fetch reservations failed, falling back:', err.message || err);
          rawData = local.get(KEYS.RESERVATIONS, []);
        }
      } else {
        rawData = local.get(KEYS.RESERVATIONS, []);
      }

      const arr = Array.isArray(rawData) ? rawData : [];
      return arr.map(r => {
        if (!r) return null;
        return {
          id: r.id || Date.now().toString() + Math.random().toString(),
          customer_name: r.customer_name || r.name || 'Guest',
          phone: r.phone || r.contact || '',
          email: r.email || '',
          guests: parseInt(r.guests || r.people || 2, 10),
          seating_type: r.seating_type || r.seating || 'Garden',
          reservation_date: r.reservation_date || r.date || '',
          reservation_time: r.reservation_time || r.time || '',
          special_note: r.special_note || r.notes || '',
          occasion: r.occasion || '',
          status: r.status || 'pending',
          created_at: r.created_at || new Date().toISOString()
        };
      }).filter(Boolean);
    },
    create: async (res) => {
      const newRes = {
        id: cloudModeActive && getSupabase() ? undefined : Date.now().toString(),
        customer_name: res.customer_name || res.name || 'Guest',
        phone: res.phone || '',
        email: res.email || '',
        guests: parseInt(res.guests || 2, 10),
        seating_type: res.seating_type || res.seating || 'Garden',
        reservation_date: res.reservation_date || res.date || '',
        reservation_time: res.reservation_time || res.time || '',
        special_note: res.special_note || res.notes || '',
        occasion: res.occasion || '',
        status: 'pending',
        created_at: new Date().toISOString()
      };
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { data, error } = await client.from('reservations').insert(newRes).select().single();
          if (error) throw error;
          if (data) return data;
        } catch (err) {
          console.error('🍵 [Supabase] create reservation failed, creating locally:', err.message || err);
        }
      }
      const current = local.get(KEYS.RESERVATIONS, []);
      const currentArray = Array.isArray(current) ? current : [];
      const updated = [newRes, ...currentArray];
      local.set(KEYS.RESERVATIONS, updated);
      return newRes;
    },
    updateStatus: async (id, status) => {
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { data, error } = await client
            .from('reservations')
            .update({ status })
            .eq('id', id)
            .select()
            .single();
          if (error) throw error;
          if (data) return data;
        } catch (err) {
          console.error('🍵 [Supabase] update reservation status failed, updating locally:', err.message || err);
        }
      }
      const current = local.get(KEYS.RESERVATIONS, []);
      const currentArray = Array.isArray(current) ? current : [];
      const updated = currentArray.map(r => r.id === id ? { ...r, status } : r);
      local.set(KEYS.RESERVATIONS, updated);
      return updated.find(r => r.id === id);
    },
    delete: async (id) => {
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { error } = await client.from('reservations').delete().eq('id', id);
          if (error) throw error;
        } catch (err) {
          console.error('🍵 [Supabase] delete reservation failed, deleting locally:', err.message || err);
        }
      }
      const current = local.get(KEYS.RESERVATIONS, []);
      const currentArray = Array.isArray(current) ? current : [];
      local.set(KEYS.RESERVATIONS, currentArray.filter(r => r.id !== id));
      return true;
    }
  },

  // 3. CROWD STATUS
  crowd: {
    get: async () => {
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { data, error } = await client
            .from('crowd_status')
            .select('*')
            .eq('id', 1)
            .maybeSingle();
          if (error) throw error;
          if (data) return data;
        } catch (err) {
          console.error('🍵 [Supabase] crowd.get failed, falling back to local:', err.message || err);
        }
      }
      return local.get(KEYS.CROWD, {
        id: 1,
        current_level: 0,
        message: 'Plenty of seating available. Perfect for studying or quiet work!',
        updated_at: new Date().toISOString()
      });
    },
    update: async (level, message = '') => {
      const updates = {
        current_level: level,
        message,
        updated_at: new Date().toISOString()
      };
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { data, error } = await client
            .from('crowd_status')
            .update(updates)
            .eq('id', 1)
            .select()
            .single();
          if (error) throw error;
          if (data) return data;
        } catch (err) {
          console.error('🍵 [Supabase] crowd.update failed, updating locally:', err.message || err);
        }
      }
      const current = local.get(KEYS.CROWD);
      const updated = { ...current, ...updates };
      local.set(KEYS.CROWD, updated);
      return updated;
    }
  },

  // 4. OFFERS
  offers: {
    getAll: async () => {
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { data, error } = await client
            .from('offers')
            .select('*')
            .order('created_at', { ascending: false });
          if (error) throw error;
          if (data) return data;
        } catch (err) {
          console.error('🍵 [Supabase] offers.getAll failed, using local fallback:', err.message || err);
        }
      }
      return local.get(KEYS.OFFERS, []);
    },
    create: async (offer, imageFile) => {
      let imageUrl = offer.image;
      if (imageFile) {
        imageUrl = await uploadImageFile('offer-banners', imageFile.name, imageFile);
      }
      const newOffer = {
        ...offer,
        image: imageUrl || 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&q=80',
        created_at: new Date().toISOString()
      };
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { data, error } = await client.from('offers').insert(newOffer).select().single();
          if (error) throw error;
          if (data) return data;
        } catch (err) {
          console.error('🍵 [Supabase] offers.create failed, creating locally:', err.message || err);
        }
      }
      const current = local.get(KEYS.OFFERS, []);
      local.set(KEYS.OFFERS, [newOffer, ...current]);
      return newOffer;
    },
    update: async (id, updates) => {
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { data, error } = await client
            .from('offers')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
          if (error) throw error;
          if (data) return data;
        } catch (err) {
          console.error('🍵 [Supabase] offers.update failed, updating locally:', err.message || err);
        }
      }
      const current = local.get(KEYS.OFFERS, []);
      const updated = current.map(o => o.id === id ? { ...o, ...updates } : o);
      local.set(KEYS.OFFERS, updated);
      return updated.find(o => o.id === id);
    },
    delete: async (id) => {
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { error } = await client.from('offers').delete().eq('id', id);
          if (error) throw error;
        } catch (err) {
          console.error('🍵 [Supabase] offers.delete failed, deleting locally:', err.message || err);
        }
      }
      const current = local.get(KEYS.OFFERS, []);
      local.set(KEYS.OFFERS, current.filter(o => o.id !== id));
      return true;
    }
  },

  // 5. REVIEWS
  reviews: {
    getAll: async (approvedOnly = false) => {
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          let query = client.from('reviews').select('*').order('created_at', { ascending: false });
          if (approvedOnly) {
            query = query.eq('approved', true);
          }
          const { data, error } = await query;
          if (error) throw error;
          if (data) return data;
        } catch (err) {
          console.error('🍵 [Supabase] reviews.getAll failed, using local fallback:', err.message || err);
        }
      }
      const all = local.get(KEYS.REVIEWS, []);
      return approvedOnly ? all.filter(r => r.approved === true) : all;
    },
    create: async (review) => {
      const avatarColors = ['#2D4A27', '#8B4513', '#D4AF37', '#A0522D', '#22C55E', '#3B82F6'];
      const newReview = {
        id: cloudModeActive && getSupabase() ? undefined : Date.now().toString(),
        ...review,
        approved: false,
        avatar: review.customer_name ? review.customer_name[0].toUpperCase() : 'C',
        avatar_color: avatarColors[Math.floor(Math.random() * avatarColors.length)],
        created_at: new Date().toISOString()
      };
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { data, error } = await client.from('reviews').insert(newReview).select().single();
          if (error) throw error;
          if (data) return data;
        } catch (err) {
          console.error('🍵 [Supabase] reviews.create failed, creating locally:', err.message || err);
        }
      }
      const current = local.get(KEYS.REVIEWS, []);
      local.set(KEYS.REVIEWS, [newReview, ...current]);
      return newReview;
    },
    updateApproval: async (id, approved) => {
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { data, error } = await client
            .from('reviews')
            .update({ approved })
            .eq('id', id)
            .select()
            .single();
          if (error) throw error;
          if (data) return data;
        } catch (err) {
          console.error('🍵 [Supabase] reviews.updateApproval failed, updating locally:', err.message || err);
        }
      }
      const current = local.get(KEYS.REVIEWS, []);
      const updated = current.map(r => r.id === id ? { ...r, approved } : r);
      local.set(KEYS.REVIEWS, updated);
      return updated.find(r => r.id === id);
    },
    delete: async (id) => {
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { error } = await client.from('reviews').delete().eq('id', id);
          if (error) throw error;
        } catch (err) {
          console.error('🍵 [Supabase] reviews.delete failed, deleting locally:', err.message || err);
        }
      }
      const current = local.get(KEYS.REVIEWS, []);
      local.set(KEYS.REVIEWS, current.filter(r => r.id !== id));
      return true;
    }
  },

  // 6. QR TABLES
  qr: {
    getAll: async () => {
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { data, error } = await client
            .from('qr_tables')
            .select('*')
            .order('table_number', { ascending: true });
          if (error) throw error;
          if (data) return data;
        } catch (err) {
          console.error('🍵 [Supabase] qr.getAll failed, using local fallback:', err.message || err);
        }
      }
      return local.get(KEYS.QR_TABLES, []);
    },
    create: async (tableNumber) => {
      const id = `table-${tableNumber}`;
      const newTable = {
        id,
        table_number: parseInt(tableNumber, 10),
        created_at: new Date().toISOString()
      };
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { data, error } = await client.from('qr_tables').insert(newTable).select().single();
          if (error) throw error;
          if (data) return data;
        } catch (err) {
          console.error('🍵 [Supabase] qr.create failed, creating locally:', err.message || err);
        }
      }
      const current = local.get(KEYS.QR_TABLES, []);
      if (current.some(t => t.table_number === newTable.table_number)) return null;
      const updated = [...current, newTable].sort((a,b) => a.table_number - b.table_number);
      local.set(KEYS.QR_TABLES, updated);
      return newTable;
    },
    delete: async (id) => {
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { error } = await client.from('qr_tables').delete().eq('id', id);
          if (error) throw error;
        } catch (err) {
          console.error('🍵 [Supabase] qr.delete failed, deleting locally:', err.message || err);
        }
      }
      const current = local.get(KEYS.QR_TABLES, []);
      local.set(KEYS.QR_TABLES, current.filter(t => t.id !== id));
      return true;
    }
  },

  // 7. AI FAQ RULES
  ai: {
    getAllRules: async () => {
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { data, error } = await client
            .from('ai_faq_rules')
            .select('*')
            .order('created_at', { ascending: false });
          if (error) throw error;
          if (data) return data;
        } catch (err) {
          console.error('🍵 [Supabase] ai.getAllRules failed, using local fallback:', err.message || err);
        }
      }
      return local.get(KEYS.AI_RULES, []);
    },
    createRule: async (rule) => {
      const newRule = {
        id: cloudModeActive && getSupabase() ? undefined : Date.now().toString(),
        keyword: rule.keyword.toLowerCase().trim(),
        response: rule.response,
        created_at: new Date().toISOString()
      };
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { data, error } = await client.from('ai_faq_rules').insert(newRule).select().single();
          if (error) throw error;
          if (data) return data;
        } catch (err) {
          console.error('🍵 [Supabase] ai.createRule failed, creating locally:', err.message || err);
        }
      }
      const current = local.get(KEYS.AI_RULES, []);
      if (current.some(r => r.keyword === newRule.keyword)) return null;
      local.set(KEYS.AI_RULES, [newRule, ...current]);
      return newRule;
    },
    deleteRule: async (id) => {
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { error } = await client.from('ai_faq_rules').delete().eq('id', id);
          if (error) throw error;
        } catch (err) {
          console.error('🍵 [Supabase] ai.deleteRule failed, deleting locally:', err.message || err);
        }
      }
      const current = local.get(KEYS.AI_RULES, []);
      local.set(KEYS.AI_RULES, current.filter(r => r.id !== id));
      return true;
    }
  },

  // 8. ANALYTICS
  analytics: {
    getAll: async () => {
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          const { data, error } = await client
            .from('analytics')
            .select('*')
            .order('created_at', { ascending: false });
          if (error) throw error;
          if (data) return data;
        } catch (err) {
          console.error('🍵 [Supabase] analytics.getAll failed, using local fallback:', err.message || err);
        }
      }
      return local.get(KEYS.ANALYTICS, []);
    },
    logEvent: async (eventType, eventValue = '') => {
      const newEvent = {
        id: cloudModeActive && getSupabase() ? undefined : Date.now().toString(),
        event_type: eventType,
        event_value: eventValue,
        created_at: new Date().toISOString()
      };
      const client = getSupabase();
      if (cloudModeActive && client) {
        try {
          client.from('analytics').insert(newEvent).then(({ error }) => {
            if (error) console.error('🍵 [Supabase] Log event background insert failed:', error);
          });
          return;
        } catch (err) {
          console.error('🍵 [Supabase] analytics.logEvent cloud attempt failed:', err.message || err);
        }
      }
      const current = local.get(KEYS.ANALYTICS, []);
      local.set(KEYS.ANALYTICS, [newEvent, ...current]);
    }
  }
};
