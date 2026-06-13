import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, Plus, X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  email: string;
  rating: number;
  comment: string;
  created_at: string;
}

const defaultReviews: Review[] = [
  {
    id: 1,
    name: "Aman Sharma",
    email: "aman.sharma@example.com",
    rating: 5,
    comment: "Pankaj is an incredibly skilled Python and Django developer. He designed a complex Student Management System that works flawlessly. Very dedicated and highly professional!",
    created_at: "2026-06-10T12:00:00Z"
  },
  {
    id: 2,
    name: "Rohan Gupta",
    email: "rohan@example.com",
    rating: 5,
    comment: "The Smart Queue Management System developed by Pankaj solved a huge problem at our campus. The database queries are fast, and the web UI is fully responsive. Brilliant developer!",
    created_at: "2026-06-08T09:30:00Z"
  },
  {
    id: 3,
    name: "Pooja Verma",
    email: "pooja.v@example.com",
    rating: 5,
    comment: "Pankaj's understanding of Django and REST APIs is solid. He is a quick learner, communicates clearly, and completes his tasks ahead of schedule. Highly recommended for any dev role.",
    created_at: "2026-06-05T15:45:00Z"
  },
  {
    id: 4,
    name: "Dr. S. K. Nair",
    email: "nair@academic.edu",
    rating: 5,
    comment: "I have mentored Pankaj during his database project work. His attention to normalization, efficiency in writing Django models, and query optimization skills are truly commendable.",
    created_at: "2026-06-02T10:15:00Z"
  }
];

export const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', rating: 5, comment: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/contact/reviews/`);
      if (response.status === 200 && response.data && response.data.length > 0) {
        // Prepend our default reviews if database has only a few, or show database reviews
        const dbReviews = response.data as Review[];
        // Merge db reviews with defaults to ensure we always have a premium list
        const combined = [...dbReviews, ...defaultReviews.filter(dr => !dbReviews.some((db) => db.name === dr.name))];
        setReviews(combined);
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchReviews();
  }, [fetchReviews]);

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.name.trim()) tempErrors.name = 'Your name is required.';
    if (!formData.email.trim()) tempErrors.email = 'Email address is required.';
    else if (!emailRegex.test(formData.email)) tempErrors.email = 'Please enter a valid email address.';
    if (!formData.comment.trim()) tempErrors.comment = 'Please write a review comment.';
    else if (formData.comment.length < 10) tempErrors.comment = 'Review must be at least 10 characters.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setToast(null);

    try {
      const response = await axios.post(`${apiBaseUrl}/api/contact/reviews/`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.status === 201) {
        setToast({ type: 'success', message: 'Thank you! Your review was submitted successfully.' });
        setFormData({ name: '', email: '', rating: 5, comment: '' });
        // Immediately fetch updated list
        await fetchReviews();
        setTimeout(() => {
          setIsModalOpen(false);
          setToast(null);
        }, 1500);
      }
    } catch (err: unknown) {
      console.error(err);
      let errMsg = 'Failed to submit review. Please try again.';
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data) {
          const data = err.response.data as Record<string, unknown>;
          const messages = Object.entries(data)
            .map(([field, msg]) => `${field}: ${Array.isArray(msg) ? msg.join(', ') : msg}`)
            .join(' | ');
          if (messages) errMsg = messages;
        }
      }
      setToast({ type: 'error', message: errMsg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="reviews" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-themeBg border-t border-themeBorder select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-12 md:gap-16">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-accent-gradient" />
              <span className="text-xs font-bold uppercase tracking-widest text-primaryBlue">Testimonials</span>
            </div>
            <h2 className="text-[9vw] sm:text-[7vw] md:text-[5.5vw] lg:text-[5vw] font-kanit font-black uppercase tracking-tighter text-gradient leading-none">
              User Reviews
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-light text-base leading-relaxed max-w-2xl">
              Honest feedback from mentors, class fellows, and project team members on database and web development collaborations.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="self-start md:self-auto px-5 py-3.5 rounded-xl bg-accent-gradient text-white font-semibold text-xs flex items-center gap-2 transition-all duration-200 shadow-md shadow-blue-600/10 active:scale-95 cursor-pointer"
          >
            <Plus size={16} />
            <span>Write a Review</span>
          </motion.button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {reviews.slice(0, 4).map((review, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={review.id || i}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-themeBorder bg-themePanel/80 hover:border-primaryBlue/30 hover:bg-themePanel transition-all duration-300 flex flex-col justify-between gap-4 sm:gap-5 group"
            >
              <div className="flex flex-col gap-4">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      size={14}
                      className={starIdx < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-700"}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-slate-700 dark:text-slate-300 font-light text-xs leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center gap-3 pt-4 border-t border-themeBorder">
                <div className="w-9 h-9 rounded-full bg-blue-950/60 border border-themeBorderHeavy flex items-center justify-center shrink-0">
                  <MessageSquare size={14} className="text-primaryBlue" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primaryBlue transition-colors truncate">
                    {review.name}
                  </span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider truncate">
                    Collaborator
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Review Dialog Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-xs p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-xl sm:rounded-2xl border border-themeBorderHeavy bg-themePanel shadow-xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setErrors({});
                  setToast(null);
                }}
                className="absolute top-4 right-4 text-slate-600 dark:text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Title */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-950/40 border border-themeBorderHeavy text-primaryBlue flex items-center justify-center shrink-0">
                  <Star size={18} className="fill-primaryBlue" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Submit Your Review
                  </h3>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">
                    Dynamic Guestbook
                  </p>
                </div>
              </div>

              {/* Toast messages inside modal */}
              {toast && (
                <div className={`p-3 rounded-lg border text-xs font-semibold flex items-start gap-2.5 ${
                  toast.type === 'success'
                    ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-200'
                    : 'bg-rose-950/80 border-rose-500/30 text-rose-200'
                }`}>
                  {toast.type === 'success' ? (
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={15} className="text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span className="leading-snug">{toast.message}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* Stars Picker */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Rating Star
                  </label>
                  <div className="flex items-center gap-1.5 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 cursor-pointer transition-transform active:scale-90"
                      >
                        <Star
                          size={24}
                          className={`${
                            star <= (hoverRating ?? formData.rating)
                              ? "text-amber-400 fill-amber-400"
                              : "text-slate-600"
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email inputs */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="rev-name" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Your Name</label>
                    <input
                      type="text"
                      id="rev-name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-themeBg border text-xs text-slate-900 dark:text-white placeholder-slate-600 focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500' : 'border-themeBorder focus:border-primaryBlue/50'
                      }`}
                      placeholder="Jane Doe"
                      disabled={isLoading}
                    />
                    {errors.name && <span className="text-[10px] text-red-500 font-bold">{errors.name}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="rev-email" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                    <input
                      type="email"
                      id="rev-email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-themeBg border text-xs text-slate-900 dark:text-white placeholder-slate-600 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-themeBorder focus:border-primaryBlue/50'
                      }`}
                      placeholder="jane@example.com"
                      disabled={isLoading}
                    />
                    {errors.email && <span className="text-[10px] text-red-500 font-bold">{errors.email}</span>}
                  </div>
                </div>

                {/* Comment Textarea */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="rev-comment" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Your Feedback</label>
                  <textarea
                    id="rev-comment"
                    rows={4}
                    value={formData.comment}
                    onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-themeBg border text-xs text-slate-900 dark:text-white placeholder-slate-600 focus:outline-none resize-none transition-colors ${
                      errors.comment ? 'border-red-500' : 'border-themeBorder focus:border-primaryBlue/50'
                    }`}
                    placeholder="Describe your collaborative experience..."
                    disabled={isLoading}
                  />
                  {errors.comment && <span className="text-[10px] text-red-500 font-bold">{errors.comment}</span>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 mt-2 rounded-xl bg-accent-gradient text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-blue-600/10 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <><Loader2 size={14} className="animate-spin" />Submitting...</>
                  ) : (
                    <>Submit Review</>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
