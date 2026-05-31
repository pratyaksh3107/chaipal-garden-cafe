import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, QrCode, Phone } from 'lucide-react';
import MenuPage from '../menu/index';
import { db } from '../../lib/db';

// QR Menu page — detects table number from URL, shows welcome + full menu
const QRMenuPage = () => {
  const { tableId } = useParams();
  const tableNum = tableId ? tableId.replace('table-', '') : '?';

  useEffect(() => {
    if (tableId) {
      db.analytics.logEvent('qr_scan', tableId);
    }
  }, [tableId]);

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome banner */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 py-3 px-4 text-center text-white text-sm font-semibold"
        style={{ background: 'linear-gradient(90deg, #2D4A27 0%, #8B4513 100%)' }}
      >
        <span className="mr-2">🍵</span>
        Welcome to Chaipal Garden Cafe! You're at{' '}
        <span className="font-bold text-accent">Table {tableNum}</span>
        {' '} — Browse the menu below & call us to order!
        <a
          href="tel:+919876543210"
          className="ml-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-xs hover:bg-white/30 transition-colors"
        >
          <Phone className="w-3 h-3" /> Call
        </a>
      </motion.div>

      {/* Offset for banner */}
      <div className="pt-10">
        <MenuPage />
      </div>
    </div>
  );
};

export default QRMenuPage;
