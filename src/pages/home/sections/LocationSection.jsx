import { motion } from 'framer-motion';
import { MapPin, Phone, MessageSquare, Clock, Navigation } from 'lucide-react';
import ScrollReveal from '../../../components/animations/ScrollReveal';
import { CAFE_INFO } from '../../../data/offers';

const LocationSection = () => {
  const googleMapsUrl = `https://maps.google.com/?q=Chaipal+Garden+Cafe+Sitapura+Jaipur`;
  const whatsappUrl = `https://wa.me/${CAFE_INFO.whatsapp}?text=Hi!%20I'd%20like%20to%20know%20more%20about%20Chaipal%20Garden%20Cafe.`;

  return (
    <section id="location" className="section-pad bg-earthy text-white relative overflow-hidden">
      {/* Decorative */}
      <div
        className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container-max relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div>
            <ScrollReveal>
              <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-2">
                Find Us
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                Come Visit Us in Jaipur
              </h2>
              <p className="text-white/55 mb-8 leading-relaxed">
                We're located in the Sitapura area, easily accessible from the main Goner Road.
                Look for the HP Petrol Pump — we're right opposite it.
              </p>
            </ScrollReveal>

            {/* Address card */}
            <ScrollReveal delay={0.1}>
              <div
                className="rounded-2xl p-5 mb-4"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,175,55,0.15)' }}
                  >
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">Address</p>
                    <address className="text-white/55 text-sm not-italic leading-relaxed">
                      {CAFE_INFO.address.line1}<br />
                      {CAFE_INFO.address.line2}<br />
                      {CAFE_INFO.address.city}<br />
                      {CAFE_INFO.address.state} – {CAFE_INFO.address.pin}
                    </address>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Hours card */}
            <ScrollReveal delay={0.15}>
              <div
                className="rounded-2xl p-5 mb-6"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,175,55,0.15)' }}
                  >
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-2">Opening Hours</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/80 text-sm font-medium">{CAFE_INFO.hours.days}</p>
                        <p className="text-white/50 text-sm">
                          {CAFE_INFO.hours.open} – {CAFE_INFO.hours.close}
                        </p>
                      </div>
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.3)' }}
                      >
                        ● Open Now
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Action Buttons */}
            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="location-directions-btn"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #F0C948)',
                    color: '#1A1A1A',
                    boxShadow: '0 4px 16px rgba(212,175,55,0.3)',
                  }}
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  <Navigation className="w-4 h-4" /> Get Directions
                </motion.a>
                <motion.a
                  href={`tel:${CAFE_INFO.phone}`}
                  id="location-call-btn"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-white/20 text-white transition-all duration-200"
                  whileHover={{ y: -2, background: 'rgba(255,255,255,0.1)' }}
                >
                  <Phone className="w-4 h-4" /> Call Now
                </motion.a>
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="location-whatsapp-btn"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-white/20 text-white transition-all duration-200"
                  whileHover={{ y: -2, background: 'rgba(255,255,255,0.1)' }}
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp
                </motion.a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Map */}
          <ScrollReveal variant="slideRight" delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden" style={{ height: '420px' }}>
              <iframe
                title="Chaipal Garden Cafe location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3562.6!2d75.8665!3d26.7924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQ2hhaXBhbCBHYXJkZW4gQ2FmZQ!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'hue-rotate(130deg) saturate(0.8) brightness(0.85)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Map pin overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-4xl drop-shadow-2xl"
                >
                  📍
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
