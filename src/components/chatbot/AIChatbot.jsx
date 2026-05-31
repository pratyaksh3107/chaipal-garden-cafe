import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Leaf, ChevronDown } from 'lucide-react';
import { CAFE_INFO } from '../../data/offers';
import { MENU_ITEMS, MENU_CATEGORIES } from '../../data/menu';
import { db } from '../../lib/db';

const BOT_AVATAR = '🍵';

const QUICK_REPLIES = [
  '📋 Show menu', '⏰ Opening hours', '📍 Location', '📞 Contact', '📅 Reserve a table', '💰 Price range'
];

// Helper to get local rule-based response
const getLocalBotReply = (input, customRules = []) => {
  const q = input.toLowerCase().trim();

  // 1. Check custom rules set by Admin
  if (customRules && customRules.length > 0) {
    const matchedRule = customRules.find(r => r.keyword && q.includes(r.keyword.toLowerCase()));
    if (matchedRule) {
      return { text: matchedRule.reply };
    }
  }

  // 2. Standard FAQs
  if (q.includes('menu') || q.includes('food') || q.includes('eat') || q.includes('drink') || q.includes('dishes')) {
    return {
      text: `We have a wide range of organic chais, cold shakes, pizzas, pastas, and sizzlers! 🍽️\n\n☕ Chai: from ₹20 | 🍕 Pizza: from ₹150 | 🔥 Sizzlers: from ₹260\n\nOur top bestsellers are Kulhad Chai, Paneer Butter Masala, and Cold Coffee!`,
      link: { label: 'Explore Full Menu 🍽️', href: '/menu' }
    };
  }
  if (q.includes('hour') || q.includes('time') || q.includes('open') || q.includes('close') || q.includes('timings')) {
    return { text: `We're open every day! 🕐\n\n📅 ${CAFE_INFO.hours.days}\n⏰ ${CAFE_INFO.hours.open} – ${CAFE_INFO.hours.close}\n\n🔥 Happy Hour: 3:00 PM – 5:00 PM daily (any chai at just ₹20!)` };
  }
  if (q.includes('location') || q.includes('address') || q.includes('where') || q.includes('direction') || q.includes('jaipur')) {
    return {
      text: `We are located at:\n📍 ${CAFE_INFO.address.line1}\n${CAFE_INFO.address.line2}\n${CAFE_INFO.address.city} – ${CAFE_INFO.address.pin}\n\nLandmark: Opposite HP Petrol Pump, Goner Road.`,
      link: { label: 'Get Google Maps Directions 🗺️', href: 'https://maps.google.com/?q=Chaipal+Garden+Cafe+Jaipur', external: true }
    };
  }
  if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('number') || q.includes('whatsapp')) {
    return { text: `Reach us at:\n📞 Phone: ${CAFE_INFO.phone}\n💬 WhatsApp: wa.me/${CAFE_INFO.whatsapp}\n📧 Email: ${CAFE_INFO.email}\n\nYou can also click the WhatsApp button in the "Contact Us" section below!` };
  }
  if (q.includes('reserve') || q.includes('book') || q.includes('table') || q.includes('reservation') || q.includes('seat')) {
    return {
      text: `Sure! I can help you secure the best spot. 🌿\n\nWe offer: Garden Seating, Indoor AC, and a Romantic Private Corner.\n\nClick the button below to fill out the reservation form instantly!`,
      link: { label: 'Book a Table Now 📅', href: '/reserve' }
    };
  }
  if (q.includes('price') || q.includes('cost') || q.includes('budget') || q.includes('expensive') || q.includes('menu rates')) {
    return { text: `Our pricing is friendly! Average spend is ${CAFE_INFO.priceRange} per person.\n\n• Tea: ₹20 – ₹50\n• Snacks: ₹40 – ₹130\n• Sizzlers & Main: ₹110 – ₹290\n\nShow your student ID for a flat 15% discount!` };
  }
  if (q.includes('wifi') || q.includes('internet') || q.includes('work') || q.includes('laptop')) {
    return { text: `Yes! 📶 Free high-speed WiFi is available. Chaipal is the perfect workspace with power sockets, natural green surroundings, and fresh hot tea to keep you productive! 💻☕` };
  }
  if (q.includes('chai') || q.includes('tea') || q.includes('kulhad')) {
    return { text: `We are famous for our chais! ☕\n\n• Masala Chai – ₹30 (Bestseller)\n• Kulhad Chai – ₹40 (Earthy flavor)\n• Cutting Chai – ₹20\n• Adrak Chai – ₹25\n\nHappy Hour offer: all tea is just ₹20 between 3 PM and 5 PM!` };
  }
  if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('namaste')) {
    return { text: `Namaste! 🙏☕ Welcome to Chaipal Garden Cafe!\n\nI am Chai, your virtual assistant. Ask me about our menu, timings, active special offers, or how to reserve a table!` };
  }
  if (q.includes('offer') || q.includes('discount') || q.includes('deal') || q.includes('coupon')) {
    return { text: `We have hot deals running! ⚡\n\n• Happy Hour (3-5 PM): Tea at ₹20!\n• Student Discount: Flat 15% off total bill.\n• Combo: Chai + Samosa at just ₹70!\n\nCheck them out on the homepage!` };
  }
  
  return {
    text: `That sounds wonderful! 😊 I am still learning that topic.\n\nYou can chat with our staff directly via WhatsApp, or call us for instant assistance:\n📞 ${CAFE_INFO.phone}`,
    link: { label: 'Chat on WhatsApp 💬', href: `https://wa.me/${CAFE_INFO.whatsapp}`, external: true }
  };
};

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [aiRules, setAiRules] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: 0, type: 'bot',
      text: 'Namaste! 🍵 I\'m Chai, your Chaipal Garden Cafe helper. Ask me about our menu, timings, reservations, or today\'s special discounts!',
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchBotData = async () => {
      try {
        const rules = await db.ai.getAllRules();
        setAiRules(rules);
        const items = await db.menu.getAll();
        setMenuItems(items);
      } catch (err) {
        console.error('Failed to load bot rules:', err);
      }
    };
    if (open) {
      fetchBotData();
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');

    // Append user message
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: msg }]);
    setTyping(true);

    // Lightweight rule-based matching only (No paid APIs)
    setTimeout(() => {
      const reply = getLocalBotReply(msg, aiRules);
      setTyping(false);
      setMessages(prev => {
        let link = null;
        if (reply.link) {
          link = reply.link;
        } else {
          // Dynamic links based on matching text
          const lowerText = (reply.text || '').toLowerCase();
          if (lowerText.includes('reserve') || lowerText.includes('book') || lowerText.includes('table')) {
            link = { label: 'Book a Table 📅', href: '/reserve' };
          } else if (lowerText.includes('menu') || lowerText.includes('price') || lowerText.includes('order')) {
            link = { label: 'View Full Menu 🍽️', href: '/menu' };
          }
        }
        return [...prev, { id: Date.now() + 1, type: 'bot', text: reply.text, link }];
      });
    }, 500 + Math.random() * 300);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        id="chatbot-toggle"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-premium"
        style={{ background: 'linear-gradient(135deg, #2D4A27, #8B4513)' }}
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: open ? 0 : [0, -4, 0] }}
        transition={open ? {} : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-2xl">
              🍵
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center text-[8px] font-bold text-black border border-[#0F1A0D]">
            AI
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="chatbot-window"
            className="fixed bottom-24 right-6 z-40 w-85 max-w-[calc(100vw-2rem)] rounded-3xl overflow-hidden flex flex-col"
            style={{
              height: '490px',
              background: '#0F1A0D',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
            }}
            initial={{ opacity: 0, y: 25, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3.5 p-4 border-b border-white/8" style={{ background: 'linear-gradient(135deg, #2D4A27, #8B4513)' }}>
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-xl">☕</div>
              <div>
                <p className="text-white font-bold text-sm">Chai Assistant</p>
                <p className="text-white/60 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Context Aware AI
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="ml-auto text-white/50 hover:text-white transition-colors p-1">
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} gap-2.5`}
                >
                  {msg.type === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm flex-shrink-0 mt-0.5 border border-white/5">
                      {BOT_AVATAR}
                    </div>
                  )}
                  <div className={`max-w-[80%] flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className="rounded-2xl px-4 py-2.5 text-xs leading-relaxed whitespace-pre-line shadow"
                      style={
                        msg.type === 'user'
                          ? { background: 'linear-gradient(135deg, #2D4A27, #3d6235)', color: 'white', borderBottomRightRadius: '4px' }
                          : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.9)', borderBottomLeftRadius: '4px', border: '1px solid rgba(255,255,255,0.03)' }
                      }
                    >
                      {msg.text}
                    </div>
                    {msg.link && (
                      <a
                        href={msg.link.href}
                        target={msg.link.external ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-extrabold px-3 py-1.5 rounded-full transition-all hover:scale-105"
                        style={{ background: 'rgba(212,175,55,0.18)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)' }}
                      >
                        {msg.link.label}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {typing && (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm border border-white/5">{BOT_AVATAR}</div>
                  <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl border border-white/5" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-accent"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies Chips */}
            <div className="px-4 pb-2 pt-1 flex gap-2 overflow-x-auto scrollbar-hide border-t border-white/5">
              {QUICK_REPLIES.map(r => (
                <button
                  key={r}
                  onClick={() => sendMessage(r)}
                  className="flex-shrink-0 text-[10px] font-bold px-3 py-1.5 rounded-full transition-all hover:bg-white/10"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.08)', whiteSpace: 'nowrap' }}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="flex items-center gap-2 p-3 border-t border-white/6 bg-black/10">
              <input
                id="chatbot-input"
                type="text"
                placeholder="Ask Chai anything about our cafe..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                className="flex-1 text-xs px-4 py-2.5 rounded-full outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'white' }}
              />
              <button
                id="chatbot-send"
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F0C948)' }}
              >
                <Send className="w-4 h-4 text-black" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
