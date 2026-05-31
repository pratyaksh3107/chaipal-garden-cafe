import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, Users, CheckCircle, ChevronRight, ChevronLeft, Leaf, Phone } from 'lucide-react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { CAFE_INFO } from '../../data/offers';
import { db } from '../../lib/db';


const SEATING_TYPES = [
  { id: 'garden', label: 'Garden', emoji: '🌿', desc: 'Outdoor lush garden seating' },
  { id: 'indoor', label: 'Indoor AC', emoji: '❄️', desc: 'Air-conditioned comfort' },
  { id: 'romantic', label: 'Romantic Corner', emoji: '🕯️', desc: 'Private cosy nook for two' },
];

const OCCASIONS = [
  'Birthday', 'Anniversary', 'Date', 'Business Meeting', 'Friends Hangout', 'Family Gathering', 'Other'
];

const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
];

const STEPS = ['Date & Time', 'Your Details', 'Confirm'];

const StepIndicator = ({ step, current }) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
        step < current
          ? 'bg-green-500 text-white'
          : step === current
          ? 'text-white'
          : 'bg-muted text-muted-foreground'
      }`}
      style={step === current ? { background: 'linear-gradient(135deg, #2D4A27, #8B4513)' } : {}}
    >
      {step < current ? '✓' : step + 1}
    </div>
    <span
      className={`text-sm font-medium hidden sm:block ${
        step === current ? 'text-primary' : step < current ? 'text-green-600' : 'text-muted-foreground'
      }`}
    >
      {STEPS[step]}
    </span>
  </div>
);

const ReservationPage = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    date: '', time: '', guests: 2, seating: 'garden', occasion: '',
    name: '', phone: '', email: '', notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [checkingConflicts, setCheckingConflicts] = useState(false);

  const update = (field, value) => {
    setErrorMsg('');
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setErrorMsg('');
    setCheckingConflicts(true);
    const seatingLabel = SEATING_TYPES.find(s => s.id === formData.seating)?.label || formData.seating;

    try {
      // 1. Fetch current bookings
      const allRes = await db.reservations.getAll();
      
      // 2. Filter for matching slot
      const matches = allRes.filter(r => 
        r.reservation_date === formData.date && 
        r.reservation_time === formData.time && 
        r.seating_type === seatingLabel &&
        r.status !== 'cancelled'
      );

      // 3. Define capacity constraint
      const maxAllowed = formData.seating === 'romantic' ? 1 : formData.seating === 'indoor' ? 4 : 6;

      if (matches.length >= maxAllowed) {
        setErrorMsg(`We apologize! The ${seatingLabel} area is fully booked for ${formData.time} on ${formData.date}. Please select a different time slot or seating area.`);
        setCheckingConflicts(false);
        return;
      }

      // 4. Save to Database
      await db.reservations.create({
        customer_name: formData.name,
        phone: formData.phone,
        email: formData.email || '',
        guests: parseInt(formData.guests, 10),
        seating_type: seatingLabel,
        reservation_date: formData.date,
        reservation_time: formData.time,
        special_note: formData.notes || '',
        occasion: formData.occasion || ''
      });

      // 5. Log analytics event
      db.analytics.logEvent('booking_attempt', seatingLabel);

      setSubmitted(true);

      const msg = `Hi! I'd like to reserve a table at Chaipal Garden Cafe.\n\nDetails:\n📅 Date: ${formData.date}\n🕐 Time: ${formData.time}\n👥 Guests: ${formData.guests}\n💺 Seating: ${seatingLabel}\n🎉 Occasion: ${formData.occasion || 'N/A'}\n\nName: ${formData.name}\nPhone: ${formData.phone}\n\nNotes: ${formData.notes || 'None'}`;
      const whatsappUrl = `https://wa.me/${CAFE_INFO.whatsapp}?text=${encodeURIComponent(msg)}`;
      setTimeout(() => window.open(whatsappUrl, '_blank'), 1500);
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong while processing your reservation. Please try again.');
    } finally {
      setCheckingConflicts(false);
    }
  };


  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section
        className="pt-32 pb-16 px-4 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F1A0D 0%, #1A2B18 100%)' }}
      >
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
            Book a Table
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Reserve Your Spot
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-white/60">
            Secure your favourite corner in our garden. Confirmation sent via WhatsApp.
          </motion.p>
        </div>
      </section>

      <main className="max-w-2xl mx-auto px-4 py-12">
        {!submitted ? (
          <>
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-4 mb-10">
              {STEPS.map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <StepIndicator step={i} current={step} />
                  {i < STEPS.length - 1 && (
                    <div className={`w-8 h-px ${i < step ? 'bg-green-500' : 'bg-border'} transition-colors duration-300`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div
                    className="rounded-2xl p-6 border"
                    style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}
                  >
                    <h2 className="text-xl font-bold text-primary mb-5" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      When would you like to visit?
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Date *</label>
                        <input
                          id="reservation-date"
                          type="date"
                          min={today}
                          value={formData.date}
                          onChange={e => update('date', e.target.value)}
                          className="input-premium"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Number of Guests *</label>
                        <select
                          id="reservation-guests"
                          value={formData.guests}
                          onChange={e => update('guests', e.target.value)}
                          className="input-premium"
                        >
                          {[1,2,3,4,5,6,7,8,10,12].map(n => (
                            <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-foreground mb-2">Select Time *</label>
                      <div className="grid grid-cols-4 gap-2">
                        {TIME_SLOTS.map(t => (
                          <button
                            key={t}
                            id={`time-${t.replace(/[: ]/g, '-')}`}
                            onClick={() => update('time', t)}
                            className={`py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                              formData.time === t
                                ? 'text-white border-transparent'
                                : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                            }`}
                            style={formData.time === t ? { background: 'linear-gradient(135deg, #2D4A27, #3d6235)', borderColor: 'transparent' } : {}}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Seating */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-foreground mb-2">Preferred Seating</label>
                      <div className="grid grid-cols-3 gap-3">
                        {SEATING_TYPES.map(s => (
                          <button
                            key={s.id}
                            id={`seating-${s.id}`}
                            onClick={() => update('seating', s.id)}
                            className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                              formData.seating === s.id ? 'border-primary/50' : 'border-border hover:border-primary/30'
                            }`}
                            style={formData.seating === s.id ? { background: 'rgba(45,74,39,0.06)' } : {}}
                          >
                            <div className="text-2xl mb-1">{s.emoji}</div>
                            <p className="text-xs font-semibold text-foreground">{s.label}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{s.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Occasion */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Special Occasion?</label>
                      <div className="flex flex-wrap gap-2">
                        {OCCASIONS.map(o => (
                          <button
                            key={o}
                            onClick={() => update('occasion', formData.occasion === o ? '' : o)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                              formData.occasion === o
                                ? 'text-white border-transparent'
                                : 'border-border text-muted-foreground hover:border-accent'
                            }`}
                            style={formData.occasion === o ? { background: 'linear-gradient(135deg, #D4AF37, #F0C948)', color: '#1A1A1A' } : {}}
                          >
                            {o}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    id="step1-next"
                    onClick={() => formData.date && formData.time && setStep(1)}
                    disabled={!formData.date || !formData.time}
                    className="w-full py-3 rounded-full font-bold text-white text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #2D4A27, #3d6235)', boxShadow: '0 4px 20px rgba(45,74,39,0.3)' }}
                  >
                    Next: Your Details <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="rounded-2xl p-6 border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
                    <h2 className="text-xl font-bold text-primary mb-5" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      Tell us about yourself
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                        <input
                          id="reservation-name"
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={e => update('name', e.target.value)}
                          className="input-premium"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number *</label>
                        <input
                          id="reservation-phone"
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          value={formData.phone}
                          onChange={e => update('phone', e.target.value)}
                          className="input-premium"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Email (optional)</label>
                        <input
                          id="reservation-email"
                          type="email"
                          placeholder="you@email.com"
                          value={formData.email}
                          onChange={e => update('email', e.target.value)}
                          className="input-premium"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Special Requests</label>
                        <textarea
                          id="reservation-notes"
                          rows={3}
                          placeholder="Any dietary requirements, allergies, or special arrangements..."
                          value={formData.notes}
                          onChange={e => update('notes', e.target.value)}
                          className="input-premium resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      id="step2-back"
                      onClick={() => setStep(0)}
                      className="flex-1 py-3 rounded-full font-semibold text-sm border border-border text-foreground hover:bg-muted transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      id="step2-next"
                      onClick={() => formData.name && formData.phone && setStep(2)}
                      disabled={!formData.name || !formData.phone}
                      className="flex-[2] py-3 rounded-full font-bold text-white text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: 'linear-gradient(135deg, #2D4A27, #3d6235)' }}
                    >
                      Review Booking <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="rounded-2xl p-6 border" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
                    <h2 className="text-xl font-bold text-primary mb-5" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      Confirm Your Reservation
                    </h2>
                    <div className="space-y-3">
                      {[
                        ['📅 Date', formData.date],
                        ['🕐 Time', formData.time],
                        ['👥 Guests', `${formData.guests} people`],
                        ['💺 Seating', SEATING_TYPES.find(s => s.id === formData.seating)?.label],
                        ['🎉 Occasion', formData.occasion || 'No special occasion'],
                        ['👤 Name', formData.name],
                        ['📱 Phone', formData.phone],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                          <span className="text-sm text-muted-foreground">{label}</span>
                          <span className="text-sm font-semibold text-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                    {formData.notes && (
                      <div className="mt-4 p-3 rounded-xl bg-muted">
                        <p className="text-xs text-muted-foreground mb-1">Special Requests</p>
                        <p className="text-sm text-foreground">{formData.notes}</p>
                      </div>
                    )}
                  </div>

                  {errorMsg ? (
                    <div
                      className="rounded-xl p-4 flex items-start gap-3 bg-red-500/10 border border-red-500/20"
                    >
                      <span className="text-red-500 text-sm mt-0.5">⚠️</span>
                      <p className="text-xs text-red-400 leading-relaxed font-semibold">
                        {errorMsg}
                      </p>
                    </div>
                  ) : (
                    <div
                      className="rounded-xl p-4 flex items-start gap-3"
                      style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-green-700 leading-relaxed">
                        Your booking request will be sent via WhatsApp to Chaipal Garden Cafe for confirmation.
                        Please keep your phone handy!
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      id="step3-back"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 rounded-full font-semibold text-sm border border-border text-foreground hover:bg-muted transition-all"
                    >
                      <ChevronLeft className="w-4 h-4 inline mr-1" /> Back
                    </button>
                    <button
                      id="confirm-reservation-btn"
                      onClick={handleSubmit}
                      disabled={checkingConflicts || !!errorMsg}
                      className="flex-[2] py-3 rounded-full font-bold text-white text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}
                    >
                      {checkingConflicts ? 'Checking Spot...' : '📱 Confirm via WhatsApp'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          // Success State
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-7xl mb-6"
            >
              🎉
            </motion.div>
            <h2 className="text-3xl font-bold text-primary mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Booking Request Sent!
            </h2>
            <p className="text-muted-foreground mb-2">Opening WhatsApp to complete your reservation...</p>
            <p className="text-muted-foreground text-sm">
              We'll confirm within 30 minutes. See you at Chaipal! ☕
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <a href="/" className="btn-primary inline-flex">← Back to Home</a>
              <a href="/menu" className="text-sm text-primary hover:underline">Explore our menu while you wait →</a>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ReservationPage;
