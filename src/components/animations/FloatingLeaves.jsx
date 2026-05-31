import { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const LEAF_EMOJIS = ['🍃', '🌿', '🍀', '☘️'];

const Leaf = ({ delay, duration, startX, size }) => {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{
        left: `${startX}%`,
        bottom: '-5%',
        fontSize: `${size}px`,
        zIndex: 1,
      }}
      initial={{ y: 0, rotate: 0, opacity: 0.6 }}
      animate={{
        y: [0, -100, -200, -350, -500, -800],
        rotate: [0, 15, -10, 20, -5, 25],
        x: [0, 20, -15, 25, -10, 15],
        opacity: [0, 0.5, 0.6, 0.4, 0.3, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatDelay: Math.random() * 3,
      }}
    >
      {LEAF_EMOJIS[Math.floor(Math.random() * LEAF_EMOJIS.length)]}
    </motion.div>
  );
};

const FloatingLeaves = ({ count = 8, className = '' }) => {
  const leaves = Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: i * 1.2 + Math.random() * 2,
    duration: 8 + Math.random() * 6,
    startX: 5 + Math.random() * 90,
    size: 14 + Math.random() * 12,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {leaves.map((leaf) => (
        <Leaf key={leaf.id} {...leaf} />
      ))}
    </div>
  );
};

export default FloatingLeaves;
