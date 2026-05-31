import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import ScrollReveal from '../../../components/animations/ScrollReveal';
import { db } from '../../../lib/db';

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className="w-3.5 h-3.5"
        fill={i < rating ? '#D4AF37' : 'transparent'}
        stroke={i < rating ? '#D4AF37' : '#9CA3AF'}
      />
    ))}
  </div>
);

const TestimonialCard = ({ review }) => (
  <motion.div
    layout
    className="relative rounded-2xl p-6 flex flex-col h-full"
    style={{
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(12px)',
    }}
  >
    <Quote
      className="w-8 h-8 mb-4 opacity-30"
      style={{ color: '#D4AF37' }}
    />
    <p className="text-white/80 text-sm leading-relaxed flex-1 mb-5 italic">
      "{review.review_text || review.text}"
    </p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ background: review.avatar_color || review.avatarColor || '#2D4A27' }}
        >
          {review.avatar || (review.customer_name ? review.customer_name[0] : 'C')}
        </div>
        <div>
          <p className="text-white text-sm font-semibold">{review.customer_name || review.name}</p>
          <p className="text-white/40 text-xs">
            {review.created_at ? new Date(review.created_at).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'}) : review.date}
          </p>
        </div>
      </div>
      <div className="text-right">
        <StarRating rating={review.rating} />
        {(review.verified || review.approved) && (
          <p className="text-white/30 text-[10px] mt-1">✓ Verified</p>
        )}
      </div>
    </div>
  </motion.div>
);

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const timerRef = useRef(null);
  const VISIBLE = 3;

  // Review Form States
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchReviews = async () => {
    const data = await db.reviews.getAll(true);
    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (!autoPlay || reviews.length === 0) return;
    timerRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, [autoPlay, reviews.length]);

  const visibleReviews = reviews.length > 0
    ? Array.from({ length: Math.min(VISIBLE, reviews.length) }, (_, i) =>
        reviews[(activeIdx + i) % reviews.length]
      )
    : [];

  const prev = () => {
    setAutoPlay(false);
    setActiveIdx(prev => (prev - 1 + reviews.length) % reviews.length);
  };
  const next = () => {
    setAutoPlay(false);
    setActiveIdx(prev => (prev + 1) % reviews.length);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setSubmitting(true);
    try {
      await db.reviews.create({
        customer_name: name.trim(),
        review_text: text.trim(),
        rating: rating
      });
      setSubmitSuccess(true);
      setName('');
      setText('');
      setRating(5);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      console.error('Review submit failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '4.8';

  return (
    <section
      id="reviews"
      className="section-pad relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0F1A0D 0%, #1A2B18 100%)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)' }}
      />

      <div className="container-max relative">
        {/* Header */}
        <ScrollReveal className="text-center mb-14">
          {/* Google rating badge */}
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full mb-6"
            style={{
              background: 'rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.25)',
            }}
          >
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4" fill="#D4AF37" stroke="#D4AF37" />
              ))}
            </div>
            <span className="text-white font-bold text-lg">{averageRating}</span>
            <span className="text-white/50 text-sm">/ 5</span>
            <span className="text-white/30 text-sm">·</span>
            <span className="text-white/50 text-sm">{reviews.length} reviews</span>
          </div>

          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-2">
            What Guests Say
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Stories of Warmth & Chai
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Real words from the people who make Chaipal their second home.
          </p>
        </ScrollReveal>

        {/* Cards */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <AnimatePresence mode="popLayout">
              {visibleReviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="h-full"
                >
                  <TestimonialCard review={review} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <p className="text-white/40 text-center py-6 text-sm">No reviews approved yet. Be the first to write one!</p>
        )}

        {/* Controls */}
        {reviews.length > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              id="reviews-prev"
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all duration-200 hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.15)' }}
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveIdx(i); setAutoPlay(false); }}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === activeIdx ? '20px' : '6px',
                    height: '6px',
                    background: i === activeIdx ? '#D4AF37' : 'rgba(255,255,255,0.2)',
                  }}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button
              id="reviews-next"
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all duration-200 hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.15)' }}
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Write a Review Form */}
        <div className="mt-16 max-w-xl mx-auto rounded-3xl p-6 md:p-8 border glass-dark shadow-premium relative z-10">
          <h3 className="text-2xl font-bold text-white mb-2 text-center" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Share Your Experience
          </h3>
          <p className="text-white/50 text-xs text-center mb-6">
            Loved our Kulhad Chai or peaceful garden? Submit your review below. It will show up on our homepage once approved by our team!
          </p>

          {submitSuccess ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6 text-green-400 font-semibold text-sm">
              ✨ Review submitted successfully! Thank you for your warm words.
            </motion.div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border text-xs outline-none bg-white/5 border-white/10 text-white focus:border-[#D4AF37]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1.5">Your Rating *</label>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className="w-5 h-5"
                          fill={(hoverRating || rating) >= star ? '#D4AF37' : 'transparent'}
                          stroke={(hoverRating || rating) >= star ? '#D4AF37' : 'rgba(255,255,255,0.3)'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1.5">Review Message *</label>
                <textarea
                  rows={3}
                  placeholder="Tell us what you liked about Chaipal..."
                  value={text}
                  onChange={e => setText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-xs outline-none bg-white/5 border-white/10 text-white resize-none focus:border-[#D4AF37]"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-full font-bold text-black text-xs flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F0C948)' }}
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
