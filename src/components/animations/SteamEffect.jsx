import { motion } from 'framer-motion';

const SteamPath = ({ delay, x, duration = 3 }) => (
  <motion.path
    d={`M${x},80 C${x - 8},60 ${x + 8},45 ${x},25 C${x - 8},10 ${x + 6},0 ${x},0`}
    stroke="rgba(255,255,255,0.5)"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{
      pathLength: [0, 1, 1, 0],
      opacity: [0, 0.5, 0.3, 0],
      y: [0, -20, -40],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

const SteamEffect = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 80 80"
        className="w-20 h-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <SteamPath x={20} delay={0} duration={3} />
        <SteamPath x={40} delay={0.8} duration={3.5} />
        <SteamPath x={60} delay={1.6} duration={2.8} />
      </svg>
    </div>
  );
};

export default SteamEffect;
