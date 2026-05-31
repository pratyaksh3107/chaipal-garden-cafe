import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../../../components/animations/ScrollReveal';
import { PEAK_HOURS } from '../../../data/offers';
import { db } from '../../../lib/db';
import { supabase } from '../../../lib/supabase';

const CROWD_LEVELS = [
  { id: 'peaceful', label: 'Peaceful', emoji: '😌', color: '#22C55E', bg: 'rgba(34,197,94,0.1)', desc: 'Grab your favourite spot' },
  { id: 'moderate', label: 'Moderate', emoji: '😊', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', desc: 'A few tables available' },
  { id: 'busy', label: 'Busy', emoji: '🔥', color: '#EF4444', bg: 'rgba(239,68,68,0.1)', desc: 'Short wait expected' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-3 py-2 rounded-xl text-xs shadow-lg"
        style={{ background: '#1A2B18', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
      >
        <p className="font-semibold">{label}</p>
        <p style={{ color: '#D4AF37' }}>{payload[0].value}% crowd</p>
      </div>
    );
  }
  return null;
};

const LiveStatusSection = () => {
  const [currentLevel, setCurrentLevel] = useState(0);

  useEffect(() => {
    const fetchCrowd = async () => {
      const data = await db.crowd.get();
      setCurrentLevel(data.current_level);
    };
    fetchCrowd();

    if (db.isCloudMode() && supabase) {
      const channel = supabase
        .channel('live-crowd-sync')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'crowd_status' }, (payload) => {
          if (payload.new && typeof payload.new.current_level === 'number') {
            setCurrentLevel(payload.new.current_level);
          }
        })
        .subscribe();
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  const waitTime = currentLevel === 0 ? 5 : currentLevel === 1 ? 15 : 25;
  const reservations = currentLevel === 0 ? 2 : currentLevel === 1 ? 6 : 10;
  const crowd = CROWD_LEVELS[currentLevel] || CROWD_LEVELS[0];

  return (
    <section id="live-status" className="section-pad bg-earthy text-white relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="container-max relative">
        <ScrollReveal className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-2">Live Updates</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Real-Time Cafe Status
          </h2>
          <p className="text-white/55 max-w-xl mx-auto">
            Plan your visit — know exactly how busy we are before you arrive.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Status Cards */}
          <StaggerContainer>
            {/* Crowd Level */}
            <StaggerItem className="mb-5">
              <div
                className="rounded-2xl p-6 border"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-accent" />
                    <span className="text-white/70 text-sm font-medium">Current Crowd Level</span>
                  </div>
                  <span className="text-xs text-white/40 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Live
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                    style={{ background: crowd.bg }}
                  >
                    {crowd.emoji}
                  </div>
                  <div>
                    <p className="text-white text-2xl font-bold" style={{ color: crowd.color }}>
                      {crowd.label}
                    </p>
                    <p className="text-white/50 text-sm">{crowd.desc}</p>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-white/40 mb-1.5">
                    <span>Capacity</span>
                    <span>{currentLevel === 0 ? '30' : currentLevel === 1 ? '65' : '90'}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: crowd.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${currentLevel === 0 ? 30 : currentLevel === 1 ? 65 : 90}%` }}
                      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Stats Row */}
            <StaggerItem className="grid grid-cols-2 gap-4 mb-5">
              <div
                className="rounded-2xl p-5 border"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <Clock className="w-5 h-5 text-accent mb-3" />
                <p className="text-white/50 text-xs mb-1">Est. Wait Time</p>
                <p className="text-white text-2xl font-bold">{waitTime} min</p>
              </div>
              <div
                className="rounded-2xl p-5 border"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <TrendingUp className="w-5 h-5 text-accent mb-3" />
                <p className="text-white/50 text-xs mb-1">Active Reservations</p>
                <p className="text-white text-2xl font-bold">{reservations}</p>
              </div>
            </StaggerItem>

            {/* Tip */}
            <StaggerItem>
              <div
                className="rounded-xl px-4 py-3 flex items-start gap-3"
                style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)' }}
              >
                <AlertCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-white/60 text-xs leading-relaxed">
                  <span className="text-accent font-semibold">Pro tip:</span> Best time to visit is 8–11 AM or 3–5 PM for a peaceful experience. Evenings (6–9 PM) are most popular.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Right: Peak Hours Chart */}
          <ScrollReveal variant="slideRight">
            <div
              className="rounded-2xl p-6 border"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-5 h-5 text-accent" />
                <h3 className="text-white font-semibold">Peak Hours Today</h3>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={PEAK_HOURS} barCategoryGap="30%">
                  <XAxis
                    dataKey="hour"
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="level" radius={[4, 4, 0, 0]}>
                    {PEAK_HOURS.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          entry.level >= 75
                            ? '#EF4444'
                            : entry.level >= 50
                            ? '#F59E0B'
                            : '#22C55E'
                        }
                        fillOpacity={0.8}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-4 mt-3 justify-center">
                {[['#22C55E', 'Peaceful'], ['#F59E0B', 'Moderate'], ['#EF4444', 'Busy']].map(([color, label]) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                    <span className="text-white/45 text-xs">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default LiveStatusSection;
