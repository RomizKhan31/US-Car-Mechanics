import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { Service } from '../types';
import { 
  Wrench, 
  Sparkles, 
  ArrowRight,
  Clock,
  CheckCircle2,
  DollarSign,
  HelpCircle,
  Activity,
  ChevronDown
} from 'lucide-react';

// Semantic premium images for each of the 6 core services (3x2 layout)
const SERVICE_IMAGES: Record<string, string> = {
  'oil-change': 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=600&q=80', // Mechanic working on direct engine cylinders
  'diagnostics': 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80', // Cyber diagnostics board / console
  'brakes': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FyfGVufDB8fDB8fHww', // Ceramic Brake Pad & Rotor Service
  'ac-repair': 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80', // Custom tubing recharge gauges
  'alignment': 'https://plus.unsplash.com/premium_photo-1737218589271-81af9ff9bdbf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8NCUyMHdoZWVsJTIwY2FyfGVufDB8fDB8fHww', // Laser Wheel Alignment (4-Wheel)
  'spark-plugs': 'https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=600&q=80' // High details engine spark ignition servicing
};

interface ServicesGridProps {
  onBookService: (serviceId: string) => void;
}

export default function ServicesGrid({ onBookService }: ServicesGridProps) {
  // We only show the 6 core services inside a 3x2 grid as requested
  const coreServiceIds = ['oil-change', 'diagnostics', 'brakes', 'ac-repair', 'alignment', 'spark-plugs'];
  const displayServices = SERVICES.filter(s => coreServiceIds.includes(s.id));

  // State to track expanded service description/benefits
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#09111e] to-[#060b13] border-t border-slate-900 overflow-hidden font-sans" id="services-grid">
      {/* Visual background lights */}
      <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-xs text-[#FFBC11] font-bold tracking-widest uppercase select-none">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>EXPERT AUTOMOTIVE SOLUTIONS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Our Elite Repair & Maintenance<br />
            <span className="text-[#FFBC11]">6 Core Services Catalog</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Get instant transparent pricing, precise durations, and book fully certified ASE Master mechanics. Connect your car keys to reliable Detroit engineering.
          </p>
        </div>

        {/* 3x2 GRID OF SERVICES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, idx) => {
            const isExpanded = expandedId === service.id;
            const imageUrl = SERVICE_IMAGES[service.id] || 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=600&q=80';

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-[#0b1424]/60 border border-slate-800/80 hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all duration-350 flex flex-col justify-between shadow-xl hover:shadow-amber-500/5 hover:scale-[1.01]"
              >
                {/* Micro border glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent group-hover:via-[#FFBC11]/40 transition-all duration-300" />
                
                <div>
                  {/* Semantic Image Block */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <img 
                      src={imageUrl} 
                      alt={service.name}
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1424] via-[#0b1424]/20 to-transparent" />
                    
                    {/* Category Overlay Pill */}
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] font-mono font-bold tracking-wider text-[#FFBC11] uppercase">
                      {service.category}
                    </span>

                    {/* Pricing Overlay Pill */}
                    <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-[#FFBC11] text-slate-950 font-mono font-black text-sm flex items-center">
                      <span className="text-xs mr-0.5">$</span>{service.price}
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-[#FFBC11] transition duration-200">
                        {service.name}
                      </h3>
                    </div>

                    <p className="text-slate-350 text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {service.description}
                    </p>

                    {/* Metadata indicators */}
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400 py-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        Est. {service.estimatedTime}
                      </span>
                      <span className="text-slate-800">|</span>
                      <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[10px]">
                        Fully Warranted
                      </span>
                    </div>

                    {/* Read Benefits Collapsible */}
                    <div className="pt-2">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : service.id)}
                        className="text-xs text-[#FFBC11] hover:text-amber-400 font-bold flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide Premium Benefits' : 'View Premium Benefits'}</span>
                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden mt-3 pt-3 border-t border-slate-800/85 space-y-2"
                          >
                            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-semibold">Service Benefits:</p>
                            {service.benefits.map((b, bIdx) => (
                              <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>{b}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Card CTA Action - Fully functional! */}
                <div className="p-6 pt-0 mt-auto">
                  <button
                    onClick={() => onBookService(service.id)}
                    className="w-full py-2.5 rounded-xl border border-slate-800 hover:border-amber-400/50 hover:bg-[#FFBC11]/5 text-slate-200 hover:text-white text-xs font-extrabold uppercase tracking-widest transition-all duration-250 cursor-pointer flex items-center justify-center gap-1.5 group/btn"
                  >
                    <span>Instant Booking</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-[#FFBC11] group-hover/btn:translate-x-1 transition duration-200" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
