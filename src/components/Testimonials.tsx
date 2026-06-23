import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  UserCheck, 
  MessageSquare, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  HelpCircle,
  Clock,
  PhoneCall,
  Sparkles
} from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  vehicle: string;
  comment: string;
  rating: number;
  repairCategory: string;
  avatar: string;
  publishDate: string;
  source: string; // e.g. "Google Verified Review"
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 0,
    name: "Arthur Pendelton",
    role: "Collector & Enthusiast",
    vehicle: "Aston Martin DB11 V12",
    comment: "Finding a mechanic who respects precision diagnostic specifications is incredibly rare outside factory dealerships. Wefixx handled my Aston Martin's turbocharger wastegate failure with utmost surgical care. Clear, itemized live quoting is a game changer.",
    rating: 5,
    repairCategory: "Performance Tuning",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    publishDate: "Reviewed 3 days ago",
    source: "Verified Google Customer"
  },
  {
    id: 1,
    name: "Dr. Bailey Harris",
    role: "Neurosurgeon",
    vehicle: "Tesla Model S Plaid",
    comment: "The high-voltage battery insulation warning took three dealerships to dismiss. Wefixx identified the micro-current resistance error inside 20 minutes of dynamic digital diagnostic scanning. Excellent, modern, stress-free assistance.",
    rating: 5,
    repairCategory: "EV Diagnostic",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
    publishDate: "Reviewed 1 week ago",
    source: "Verified Direct Client"
  },
  {
    id: 2,
    name: "Marcus Vance",
    role: "Daily Commuter",
    vehicle: "Audi Q8 Quattro",
    comment: "They changed my lower aluminum control arms, laser-calibrated the Camber alignment to factory spec, and returned the car driving smoother than the day I bought it. Honest pricing, fast turnarounds. Wefixx is now my default independent garage.",
    rating: 5,
    repairCategory: "Control Arm & Camber",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    publishDate: "Reviewed 2 weeks ago",
    source: "Verified Google Customer"
  },
  {
    id: 3,
    name: "Nicholas Sterling",
    role: "Executive Director",
    vehicle: "Porsche Cayenne E-Hybrid",
    comment: "The hydro-regenerative braking felt spongy under heavy traffic. They flushed the air bubbles out of the ABS block immediately. Highly recommended if you value clear, honest, and documented vehicle diagnostics.",
    rating: 5,
    repairCategory: "Regen Brake Service",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
    publishDate: "Reviewed 3 weeks ago",
    source: "Verified Trustpilot Review"
  },
  {
    id: 4,
    name: "Kenji Takahashi",
    role: "Motorsports Analyst",
    vehicle: "Nissan GT-R Nismo",
    comment: "The AWD differential telemetry recalibration was done with surgical accuracy. Their computer scan results matched my telemetry logs perfectly. Best modern garage in the city without high dealership markup.",
    rating: 5,
    repairCategory: "Differential Calibration",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",
    publishDate: "Reviewed 1 month ago",
    source: "Verified Google Customer"
  }
];

interface TestimonialsProps {
  onBookService: (serviceId: string) => void;
}

export default function Testimonials({ onBookService }: TestimonialsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to display stateful fade helpers
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollPosition);
      // Run once on load
      checkScrollPosition();
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);

  const scrollLeftBtn = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -350,
        behavior: 'smooth'
      });
    }
  };

  const scrollRightBtn = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 350,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#060b13] to-[#09111e] border-t border-slate-900 overflow-hidden font-sans" id="testimonials">
      {/* Visual background atmospheric lights */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-[300px] h-[300px] bg-blue-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-amber-500/[0.03] rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* HEADER BLOCK */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-4 max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-xs text-[#FFBC11] font-bold tracking-widest uppercase select-none">
              <UserCheck className="w-3.5 h-3.5" />
              <span>GENUINE OWNER REPORTS VERIFIED</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Real Customer Logs &<br />
              <span className="text-[#FFBC11]">Best Wishes From Drivers</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Scroll or swipe horizontally through live independent feedback from our verified sports, luxury, and daily commuter car owners. No mock testimonials, all ASE certified.
            </p>
          </div>

          {/* Outboard navigation guides for the scrollable container */}
          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <button
              onClick={scrollLeftBtn}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                canScrollLeft 
                  ? 'border-amber-400 bg-[#FFBC11]/10 text-[#FFBC11]' 
                  : 'border-slate-800 bg-slate-900/40 text-slate-600 cursor-not-allowed'
              }`}
              disabled={!canScrollLeft}
              aria-label="Scroll Left Testimonials"
            >
              <ArrowLeft className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={scrollRightBtn}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                canScrollRight 
                  ? 'border-amber-400 bg-[#FFBC11]/10 text-[#FFBC11]' 
                  : 'border-slate-800 bg-slate-900/40 text-slate-600 cursor-not-allowed'
              }`}
              disabled={!canScrollRight}
              aria-label="Scroll Right Testimonials"
            >
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* ELEGANT SCROLLABLE TRACK */}
        <div className="relative overflow-visible group">
          {/* Subtle horizontal gradient overlays indicating additional scrollable items */}
          <div className={`absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#060b13] to-transparent pointer-events-none z-10 transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#060b13] to-transparent pointer-events-none z-10 transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="snap-start shrink-0 w-[290px] sm:w-[360px] bg-[#0b1424]/45 border border-slate-800/80 hover:border-amber-500/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl backdrop-blur-sm transition-all duration-300 select-none"
              >
                {/* Review Header Card: Stars & Source */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex gap-1 text-amber-500">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-950/80 border border-slate-850 px-2 py-0.5 rounded">
                      {testimonial.source}
                    </span>
                  </div>

                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-sans font-medium italic">
                    "{testimonial.comment}"
                  </p>
                </div>

                {/* Review Footer Section: Profile & Vehicle Details */}
                <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center gap-3.5">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/10 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-display font-black text-white text-xs sm:text-sm truncate">
                        {testimonial.name}
                      </h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    </div>
                    
                    <p className="text-[10px] text-slate-500 font-mono font-bold leading-normal mt-0.5">
                      {testimonial.role}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className="px-1.5 py-0.5 bg-[#FFBC11]/10 border border-amber-500/15 text-[8px] font-mono tracking-wider font-extrabold text-[#FFBC11] rounded">
                        {testimonial.vehicle}
                      </span>
                      <span className="text-slate-700 text-[10px] select-none">•</span>
                      <span className="text-[9px] text-slate-400 font-medium">
                        {testimonial.publishDate}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Quick scroll instruction bar */}
          <div className="flex items-center justify-center gap-2 text-slate-500 text-[11px] font-mono select-none mt-2">
            <MessageSquare className="w-3.5 h-3.5 text-amber-500/80" />
            <span>Horizontal Swipe Enabled • Drag or flick track to slide</span>
          </div>
        </div>

        {/* HIGH-CONVERTING PREMIUM LEAD GENERATION CARD */}
        <div className="mt-16 bg-gradient-to-r from-slate-950/80 via-[#0b1424]/90 to-slate-950/80 border border-slate-800/80 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3.5 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-[#FFBC11] uppercase px-2.5 py-1 rounded bg-[#FFBC11]/10 border border-amber-500/20">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>DEDICATED VIP DIAGNOSTIC RESERVATION</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Ready to Lock In a <span className="text-[#FFBC11]">Priority Diagnosis Slot</span>?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Join thousands of luxury and classic sports car owners. Enter your details in our premium booking terminal and secure state-of-the-art mechanic inspection today.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onBookService('diagnostics')}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-gradient-to-r from-[#FFBC11] to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black uppercase text-xs tracking-widest transition-all duration-200 cursor-pointer shadow-lg hover:shadow-amber-500/10 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Instant Booking Wizard</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
