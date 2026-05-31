import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import ScrollReveal from '../../../components/animations/ScrollReveal';

const MILESTONES = [
  { year: '2021', event: 'Chaipal opens its doors', emoji: '🌱' },
  { year: '2022', event: 'Garden expansion & outdoor seating added', emoji: '🌿' },
  { year: '2023', event: 'Reached 1000+ happy customers', emoji: '🎉' },
  { year: '2024', event: 'Introduced sizzlers & premium menu', emoji: '🔥' },
  { year: '2025', event: '4.7★ Google rating · 85+ reviews', emoji: '⭐' },
];

const StorySection = () => {
  return (
    <section
      id="story"
      className="section-pad relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FAF7F0 0%, #F0EAD8 100%)' }}
    >
      {/* Background leaf */}
      <div className="absolute -right-20 top-10 text-[300px] opacity-[0.03] pointer-events-none select-none">
        🍃
      </div>

      <div className="container-max relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Story */}
          <div>
            <ScrollReveal>
              <p className="section-label">Our Story</p>
              <h2 className="section-title">A Cup of Chai, A World of Stories</h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div
                className="w-12 h-1 rounded-full mb-6"
                style={{ background: 'linear-gradient(90deg, #D4AF37, #F0C948)' }}
              />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Chaipal was born from a simple dream — to create a space where people could slow
                down, reconnect, and enjoy a really good cup of chai without rushing. In Jaipur's
                fast-growing Sitapura neighbourhood, we built a garden oasis where conversations flow
                as freely as the tea.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Today, Chaipal is more than a cafe — it's a community. Whether you're a student
                cramming for exams, a professional working remotely, friends catching up, or a couple
                on a quiet date, there's a corner here that feels like it was made just for you.
              </p>
            </ScrollReveal>

            {/* Features */}
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: '🌿', label: 'Garden Seating', desc: 'Lush outdoor space' },
                  { emoji: '☕', label: 'Premium Chai', desc: '6+ varieties brewed fresh' },
                  { emoji: '📶', label: 'Free WiFi', desc: 'Work from our garden' },
                  { emoji: '🐾', label: 'Pet Friendly', desc: 'Bring your furry friends' },
                ].map(({ emoji, label, desc }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-white/60"
                  >
                    <span className="text-2xl flex-shrink-0">{emoji}</span>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{label}</p>
                      <p className="text-muted-foreground text-xs">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Timeline */}
          <ScrollReveal variant="slideRight" delay={0.15}>
            <div className="relative pl-6">
              {/* Vertical line */}
              <div
                className="absolute left-2 top-4 bottom-4 w-0.5"
                style={{ background: 'linear-gradient(180deg, #D4AF37, #2D4A27)' }}
              />

              <div className="space-y-8">
                {MILESTONES.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-4"
                  >
                    {/* Dot */}
                    <div
                      className="absolute left-0 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'white',
                        border: '2px solid #D4AF37',
                        marginTop: '3px',
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    </div>

                    <div className="ml-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{m.emoji}</span>
                        <span
                          className="text-xs font-bold text-accent tracking-wider"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {m.year}
                        </span>
                      </div>
                      <p className="text-foreground font-medium text-sm">{m.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
