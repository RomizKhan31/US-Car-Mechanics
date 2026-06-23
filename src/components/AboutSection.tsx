import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  ShieldCheck, 
  Award, 
  Clock, 
  Sparkles, 
  ArrowRight,
  Gauge,
  CheckCircle2,
  Users2,
  Mail,
  User,
  Car,
  ChevronRight,
  Sparkle
} from 'lucide-react';

// Use correct generated image name
import workshopImage from '../assets/images/workshop_mechanic_diagnostic_1781897273706.jpg';

interface AboutSectionProps {
  onBookService: (serviceId: string) => void;
}

export default function AboutSection({ onBookService }: AboutSectionProps) {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#060b13] to-[#09111e] border-t border-slate-900 overflow-hidden font-sans" id="about-us">
      {/* Dynamic lighting effects */}
      <div className="absolute top-12 left-1/3 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: PRECISE CAR WORKSHOP IMAGE & FLOATING BADGES (MADE LARGE & PREMIUM) */}
          <div className="lg:col-span-7 relative flex justify-center py-4 lg:py-0 w-full">
            {/* Glow backing */}
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/10 to-blue-500/10 rounded-3xl blur-2xl pointer-events-none opacity-80" />

            {/* Main Picture Frame (Large with modern high-aspect viewport) */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800/90 shadow-2xl w-full max-w-4xl aspect-[16/10] bg-slate-950">
              <img 
                src={workshopImage} 
                alt="Wefixx State-of-the-Art Workshop and Master Mechanic Diagnostic" 
                className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/10 to-transparent" />
            </div>

            {/* FLOATING EXPERIENCE BADGE 1 (Top Left) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -top-4 -left-3 sm:-left-5 p-3.5 rounded-xl bg-slate-900/95 border border-slate-700/50 backdrop-blur-md shadow-xl flex items-center gap-3 max-w-[200px] select-none scale-90 sm:scale-100"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#FFBC11] shrink-0">
                <Award className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="font-mono text-xs font-black text-white leading-none">12+ YEARS</p>
                <p className="text-[9px] text-slate-400 mt-1 font-bold leading-none tracking-wider">DETROIT INDEPENDENT</p>
              </div>
            </motion.div>

            {/* FLOATING EXPERIENCE BADGE 2 (Bottom Right) */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-4 -right-3 sm:-right-5 p-3.5 rounded-xl bg-slate-900/95 border border-slate-700/50 backdrop-blur-md shadow-xl flex items-center gap-3 max-w-[220px] select-none scale-90 sm:scale-100"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="font-mono text-xs font-black text-white leading-none">ASE CERTIFIED</p>
                <p className="text-[9px] text-slate-400 mt-1 font-bold leading-none tracking-wider">INDUSTRY-GRADE MECHANICS</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: WELL-STRUCTURED PREMIUM CONTENT & STATS Only (Short and clean) */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left flex flex-col justify-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-[10px] text-[#FFBC11] font-bold tracking-widest uppercase select-none mx-auto lg:mx-0">
                <Sparkles className="w-3 h-3" />
                <span>ABOUT WEFIXX GARAGES</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Engineered for Reliability.<br />
                <span className="text-[#FFBC11]">Executed with Integrity.</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
                We believe premium cars require sophisticated attention. Wefixx provides independent diagnostics, transparent itemized pricing, and dealership grade repairs. From performance engines to digital electric hybrid drivetrains, we keep your keys turning smoothly.
              </p>
            </div>

            {/* STATISTICS ROW SECTION DIV */}
            <div className="border-t border-b border-slate-800/80 py-5 my-1 bg-gradient-to-r from-slate-950/20 via-slate-900/10 to-transparent rounded-lg">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="space-y-1">
                  <div className="flex justify-center items-center gap-1 text-white">
                    <Wrench className="w-3.5 h-3.5 text-[#FFBC11] hidden sm:inline" />
                    <span className="font-mono text-xl sm:text-2xl font-black tracking-tight text-white">14K+</span>
                  </div>
                  <p className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-widest font-bold">Repairs Completed</p>
                </div>

                <div className="space-y-1 border-l border-r border-slate-800/80">
                  <div className="flex justify-center items-center gap-1 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 hidden sm:inline" />
                    <span className="font-mono text-xl sm:text-2xl font-black tracking-tight text-white">99.8%</span>
                  </div>
                  <p className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-widest font-bold">Warranty Secured</p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-center items-center gap-1 text-white">
                    <Clock className="w-3.5 h-3.5 text-sky-400 hidden sm:inline" />
                    <span className="font-mono text-xl sm:text-2xl font-black tracking-tight text-white">24/7</span>
                  </div>
                  <p className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-widest font-bold">Diagnostic Support</p>
                </div>
              </div>
            </div>

            {/* ONE CLEAR DEFINED CALL TO ACTION */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start pt-2">
              <button
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-slate-800 hover:border-amber-400/50 bg-[#09111e]/80 hover:bg-[#FFBC11]/5 text-slate-200 hover:text-white font-black uppercase text-[10px] tracking-widest transition-all duration-250 cursor-pointer flex items-center justify-center gap-2 group shadow-xl active:scale-95"
                id="about-cta-action"
              >
                <span>Read More</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform duration-250" />
              </button>
            </div>
          </div>

        </div>

        {/* HIGH-TECH SPECIFICATION GRID (MOVED BELOW AS A FULL-WIDTH BLOCK) */}
        <div className="bg-[#0b1424]/80 border border-slate-800/90 rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-2xl" id="about-facilities-display">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <h4 className="text-white font-display text-sm font-black uppercase tracking-wider">
                Our Specialized Diagnostic Facilities
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="facility-tech-grid">
              {/* Item 1 */}
              <div className="space-y-1.5 p-4 rounded-xl bg-slate-950/60 border border-slate-850 hover:border-amber-500/10 transition-colors duration-200">
                <p className="text-[9px] font-mono font-bold text-[#FFBC11] uppercase tracking-wider">01 / DIAGNOSTIC BAY</p>
                <h5 className="text-white font-display text-xs font-bold font-sans">Active CAN Bus Terminals</h5>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Continuous telemetry packet analysis, reading direct solenoid variances and transient micro-faults.
                </p>
              </div>

              {/* Item 2 */}
              <div className="space-y-1.5 p-4 rounded-xl bg-slate-950/60 border border-slate-850 hover:border-amber-500/10 transition-colors duration-200">
                <p className="text-[9px] font-mono font-bold text-[#FFBC11] uppercase tracking-wider">02 / CALIBRATION STAGE</p>
                <h5 className="text-white font-display text-xs font-bold font-sans">0.05° Laser Aligner</h5>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  High-precision optical sensors mapping camber, toe, and trailing arm dimensions to strict OEM charts.
                </p>
              </div>

              {/* Item 3 */}
              <div className="space-y-1.5 p-4 rounded-xl bg-slate-950/60 border border-slate-850 hover:border-amber-500/10 transition-colors duration-200">
                <p className="text-[9px] font-mono font-bold text-[#FFBC11] uppercase tracking-wider">03 / INSULATION LAB</p>
                <h5 className="text-white font-display text-xs font-bold font-sans">HV Power Harness Testers</h5>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Micro-current direct insulation resistance gauges for high-capacity battery systems on Tesla & Porsche drivetrains.
                </p>
              </div>

              {/* Item 4 */}
              <div className="space-y-1.5 p-4 rounded-xl bg-slate-950/60 border border-slate-850 hover:border-amber-500/10 transition-colors duration-200">
                <p className="text-[9px] font-mono font-bold text-[#FFBC11] uppercase tracking-wider">04 / CHROME REPAIR BAY</p>
                <h5 className="text-white font-display text-xs font-bold font-sans">Regenerative ABS Bleeders</h5>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Pneumatic hydro-electric brake flushes ensuring zero-bubble compliance inside electronic servo valves.
                </p>
              </div>
            </div>

            {/* Sub-nav row of valid non-loading anchor links */}
            <div className="pt-5 border-t border-slate-800/50 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px]">
              <div className="flex items-center gap-3">
                <a 
                  href="#services-grid" 
                  className="text-slate-400 hover:text-white transition duration-200 font-bold uppercase tracking-wider"
                >
                  ← Browse Services
                </a>
                <span className="text-slate-700">|</span>
                <a 
                  href="#testimonials" 
                  className="text-slate-400 hover:text-white transition duration-200 font-bold uppercase tracking-wider"
                >
                  Read Reviews
                </a>
              </div>
              
              <a 
                href="#contact" 
                className="px-4 py-2 rounded-lg bg-[#FFBC11]/10 hover:bg-[#FFBC11]/15 text-[#FFBC11] font-bold tracking-wider uppercase border border-amber-500/20 hover:border-amber-500/40 transition duration-200"
              >
                Contact Active Mechanics →
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
