import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  ChevronDown, 
  ShieldCheck, 
  Sparkle,
  CheckCircle2,
  Clock
} from 'lucide-react';

// Autoplay video loop showcasing live performance tier operations
const VIDEO_URL = "https://www.barkleytire.com/res/video/banner1.mp4";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Do you offer warranties on replaced parts?",
    answer: "Yes, every service resolved under the Wefixx blueprint includes a standard 12-Month / 12,000-Mile comprehensive Independent Warranty on both original parts (OEM) and mechanical labor. Elite diagnostics packages are also covered by dynamic calibration guarantees."
  },
  {
    question: "What is your typical diagnostic and repair time?",
    answer: "A complete computer diagnostic OBD2 scan and itemized estimate is completed within 15 to 30 minutes of vehicle arrival. Routine maintenance procedures like oil refills, brake pad replacements, or air conditioning coolant recharges typically finish under 1 to 2 hours."
  },
  {
    question: "Are your technicians ASE Certified?",
    answer: "Absolutely. 100% of Wefixx specialists are fully credentialed ASE Master Mechanics with a minimum of 10+ years of high-performance and luxury vehicle experience. Your car will never be handled by uncertified apprentices."
  },
  {
    question: "How do you calculate your repair estimates?",
    answer: "Our systems calculate upfront estimates using OEM part catalog values and standard mechanics labor matrix charts. There are absolutely no hidden surprise surcharges. You receive the itemized invoice on your smartphone first, and you click to approve line-by-line."
  },
  {
    question: "Do you support electric or hybrid vehicles?",
    answer: "Yes! We possess specialized dynamic high-voltage battery insulation testers, drive motor adapters, and regenerative caliper bleeders. We service performance hybrids and fully electric vehicles (Tesla, Porsche E-Hybrid, BMW i-series) in compliance with factory insulation specifications."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#09111e] to-[#060b13] border-t border-slate-900 overflow-hidden font-sans" id="faq-section">
      {/* Decorative premium illumination */}
      <div className="absolute top-1/4 right-10 w-[300px] h-[300px] bg-amber-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* CENTERED HEADER ELEMENT (eyebrow, headline, subheadline) */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-xs text-[#FFBC11] font-bold tracking-widest uppercase select-none">
            <HelpCircle className="w-3.5 h-3.5 animate-pulse" />
            <span>FREQUENT QUESTIONS CHECKED</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Frequently Asked<br />
            <span className="text-[#FFBC11]">Help Solutions Catalog</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-semibold">
            We believe in 100% transparency. If you have an unresolved dashboard light or chassis knock, read our catalog rules or speak to an ASE specialist directly.
          </p>
        </div>

        {/* CONTAINER: LEFT IMAGE, RIGHT ACCORDION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: LARGE PREMIUM VIDEO LOOP */}
          <div className="lg:col-span-5 relative group">
            {/* Ambient behind glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/10 to-blue-500/10 rounded-3xl blur-2xl pointer-events-none opacity-85" />
            
            <div className="relative rounded-2xl overflow-hidden border border-slate-800/90 shadow-2xl aspect-[4/3] bg-slate-950">
              <video 
                src={VIDEO_URL}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-all duration-750 hover:scale-105"
              />
              {/* Premium overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent pointer-events-none" />
              
              {/* Dynamic Overlay badge inside the video container */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-slate-950/85 border border-slate-800/70 backdrop-blur-md flex items-center justify-between">
                <div>
                  <h4 className="text-white font-display text-[11px] font-black uppercase tracking-wider">Live Operations Feed</h4>
                  <p className="text-slate-400 text-[9px] uppercase font-mono mt-0.5">High-Tech Service Track Monitoring</p>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono font-bold shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>LIVE FEED READY</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ACCORDION */}
          <div className="lg:col-span-7 space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div 
                  key={idx}
                  className="bg-[#0b1424]/40 border border-slate-800/80 hover:border-amber-500/20 rounded-2xl overflow-hidden transition-all duration-355 shadow-md group"
                >
                  {/* Accordion Trigger */}
                  <button
                    onClick={() => toggleIndex(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left outline-none cursor-pointer select-none"
                  >
                    <span className="font-display font-black text-white text-sm sm:text-base group-hover:text-[#FFBC11] transition duration-200">
                      {item.question}
                    </span>
                    <span className={`w-8 h-8 rounded-lg bg-[#0b1424] border border-slate-800/80 group-hover:border-amber-200/25 flex items-center justify-center text-slate-400 group-hover:text-[#FFBC11] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-slate-950' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {/* Accordion Content with smooth height transition */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-1 text-slate-350 text-xs sm:text-sm leading-relaxed border-t border-slate-800/40 font-medium">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
