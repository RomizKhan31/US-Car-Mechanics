import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Layers,
  Activity,
  Calendar,
  Sparkles,
  Search,
  Gauge,
  Terminal,
  ShieldCheck,
  ChevronDown,
  Info
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  vehicle: string;
  solve: string;
  duration: string;
  image: string;
  diagnosticReport: string;
  warranty: string;
  
  // Interactive Telemetry details
  faultCode: string;
  beforeSpecs: string;
  afterSpecs: string;
  partsSwapped: string;
  sensorWave: string; // Dynamic signal label
}

const PROJECTS: Project[] = [
  {
    id: 0,
    title: "Aston Martin DB11 V12 Turbo Overhaul",
    category: "performance",
    vehicle: "Aston Martin DB11 (V12 Biturbo)",
    solve: "Replaced faulty wastegate actuators with genuine parts and calibrated ECU maps. Fully restored original 600HP acceleration torque.",
    duration: "4.5 Hours",
    image: "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&w=800&q=80",
    diagnosticReport: "Error P0234: Manifold Overboost Solenoid Blocked",
    warranty: "24-Month Parts & Labor Guarantee",
    faultCode: "DTC P0234",
    beforeSpecs: "1.8 bar pressure spike (Overboost limit exceeded)",
    afterSpecs: "1.25 bar steady curve baseline achieved on dyno-test",
    partsSwapped: "BorgWarner dual wastegate actuators + new gaskets",
    sensorWave: "MANIFOLD_S1_BUSYS [1.80 bar → 1.25 bar]"
  },
  {
    id: 1,
    title: "Tesla Model S Plaid HV Insulation Fix",
    category: "ev-hybrid",
    vehicle: "Tesla Model S Plaid",
    solve: "Identified terminal insulation resistance drop. Cleaned contact corrosion and applied high-voltage sealant to guarantee battery pack protection.",
    duration: "2 Hours",
    image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=800&q=80",
    diagnosticReport: "Error BMS_w123: High Voltage Isolation Failure",
    warranty: "12-Month Comprehensive Hybrid Shield",
    faultCode: "BMS_w123 Fault",
    beforeSpecs: "Resistance drop down to 45 kΩ (Safety limit: < 100 kΩ)",
    afterSpecs: "Insulation restored to a safe 1.8 MΩ certified dry baseline",
    partsSwapped: "Harness heat-shrink sleeves + contact deoxidizer",
    sensorWave: "HV_ISOL_METRIC [45kΩ → 1.8MΩ]"
  },
  {
    id: 2,
    title: "Audi Q8 Laser 4-Wheel Alignment",
    category: "suspension",
    vehicle: "Audi Q8 Quattro Sport",
    solve: "Installed premium lower trailing control arms and laser-aligned chassis to strict 0.05-degree factory specs. Eliminated pulling perfectly.",
    duration: "1.5 Hours",
    image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=800&q=80",
    diagnosticReport: "Mechanical Pull: Rear camber out of alignment (-1.2°)",
    warranty: "12-Month Alignment Precision Warranty",
    faultCode: "CAMBER_WARN_Q8",
    beforeSpecs: "Chassis pulling 4° left per 50m under freeway speeds",
    afterSpecs: "Perfect camber balanced at steady -0.05° ±0.01° laser baseline",
    partsSwapped: "Left-rear OEM control arm + polyurethane shims",
    sensorWave: "LASER_ALIGN_DELT [-1.20° → -0.05°]"
  },
  {
    id: 3,
    title: "Porsche Cayenne Hydraulic Brake Bleed",
    category: "ev-hybrid",
    vehicle: "Porsche Cayenne E-Hybrid",
    solve: "Flushed hydro-electric lines using DOT4 synthetic fluid to eradicate soft pedal feel. Programmed electric regen brakes for ultimate bite.",
    duration: "1 Hour",
    image: "https://media.istockphoto.com/id/1193247877/photo/handsome-mechanic-in-uniform.jpg?s=612x612&w=0&k=20&c=ZDIuniZcHY0McW4Zc654glUrtTGa8A7U2X2enGM7_60=",
    diagnosticReport: "Soft Pedal: Air micro-bubbles in hydraulic ABS valve block",
    warranty: "12-Month Regenerative Calibration Shield",
    faultCode: "HYD_SPONGE_E_PORT",
    beforeSpecs: "Braking response delayed by 180ms; soft sponge factors",
    afterSpecs: "Immediate, firm hydraulic pressure locked at steady 1450 PSI",
    partsSwapped: "DOT4 high-temp synthetic fluid + ABS block cleaning",
    sensorWave: "BRAKE_HYD_COMPL [82% → 100%]"
  },
  {
    id: 4,
    title: "BMW M4 Active CAN Bus Debugging",
    category: "diagnostics",
    vehicle: "BMW M4 Competition Coupé",
    solve: "Resolved intermittent engine safety limp mode by swapping out the failing comfort gateway module stalling the main high-speed digital bus line.",
    duration: "3 Hours",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    diagnosticReport: "Error U0100: Intermittent ECU Communication Node Lost",
    warranty: "24-Month Master Electronic Circuit Shield",
    faultCode: "DTC U0100",
    beforeSpecs: "Safety power cut trigger due to line voltage drop down to 1.15V",
    afterSpecs: "High-speed line voltage restored to steady 2.50V, zero dropouts",
    partsSwapped: "Active Cabin Comfort Module + Bus connection termination block",
    sensorWave: "CAN_BUS_REF_VOLT [1.15V → 2.50V]"
  },
  {
    id: 5,
    title: "Range Rover Active Air Suspension sealing",
    category: "suspension",
    vehicle: "Range Rover Sport HSE",
    solve: "Pinpointed compressor dryer leaks. Installed heavy-duty continental bellows and calibrated digital ride height sensors for auto-leveling.",
    duration: "3.5 Hours",
    image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=800&q=80",
    diagnosticReport: "Error C1A20: Air Compressor Venting Air Pressure Leak",
    warranty: "18-Month Heavy Duty Pneumatic Guarantee",
    faultCode: "DTC C1A20",
    beforeSpecs: "Sagging chassis: rear-left corner dipping 3.2 inches overnight",
    afterSpecs: "Static leveling sealed. Continuous pressure locked at 220 PSI",
    partsSwapped: "Continental heavy-duty air bellows + new air dryer tube",
    sensorWave: "AIR_SUS_LEVEL [dipping → static]"
  }
];

const TABS = [
  { id: 'all', label: 'All Repairs' },
  { id: 'diagnostics', label: 'Diagnostics' },
  { id: 'ev-hybrid', label: 'EV & Hybrid Ready' },
  { id: 'performance', label: 'Sports & Performance' },
  { id: 'suspension', label: 'Alignment & Chassis' }
];

interface RecentWorksProps {
  onBookService: (serviceId: string) => void;
}

export default function RecentWorks({ onBookService }: RecentWorksProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredProjects = activeTab === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeTab);

  return (
    <section className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#09111e] to-[#060b13] border-t border-slate-900 overflow-hidden font-sans" id="recent-works">
      {/* Decorative premium illumination */}
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-amber-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-xs text-[#FFBC11] font-bold tracking-widest uppercase select-none">
            <Camera className="w-3.5 h-3.5 animate-pulse" />
            <span>REAL INTERACTIVE WORKSHOP DIAGNOSTICS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Our Recent Workshop Achievements<br />
            <span className="text-[#FFBC11]">High-Octane Precision Gallery</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Browse through actual computer-scanned diagnostic logs solved by our ASE Master mechanics. Click <strong className="text-white">"Inspect Telemetry Log"</strong> on any card to see real technical details.
          </p>
        </div>

        {/* INTERACTIVE PREMIUM TABS SELECTOR */}
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-[#0b1424]/80 border border-slate-800/80 rounded-2xl max-w-3xl backdrop-blur-md">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setExpandedId(null); // Reset detail expansion on tab change
                  }}
                  className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer select-none whitespace-nowrap outline-none ${
                    isActive 
                      ? 'text-slate-950 font-black' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {/* Sliding active bg */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBackground"
                      className="absolute inset-0 bg-[#FFBC11] rounded-xl z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PROJECTS CARD GRID WITH TRANSITIONS */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((proj) => {
              const isDetailExpanded = expandedId === proj.id;
              
              return (
                <motion.div
                  key={proj.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-[#0b1424]/60 border border-slate-800/85 hover:border-amber-500/35 rounded-2xl overflow-hidden shadow-xl hover:shadow-amber-500/5 hover:scale-[1.01] transition-all duration-350 flex flex-col justify-between"
                  id={`project-card-${proj.id}`}
                >
                  {/* Micro premium border glare */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent group-hover:via-[#FFBC11]/60 transition-all duration-300" />

                  <div>
                    {/* Photo container */}
                    <div className="relative h-52 bg-slate-950 overflow-hidden">
                      <img 
                        src={proj.image} 
                        alt={proj.vehicle} 
                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1424] via-transparent to-slate-950/20" />
                      
                      {/* Floating top pills */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-slate-900/95 border border-slate-800/80 text-[10px] font-mono font-bold text-[#FFBC11]">
                          {proj.vehicle}
                        </span>
                      </div>

                      <div className="absolute bottom-4 right-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-black px-2.5 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        <span>VERIFIED RESOLVED</span>
                      </div>
                    </div>

                    {/* Text details */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-1">
                        <p className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">
                          Logged Incident:
                        </p>
                        <h3 className="font-display font-black text-base text-white leading-tight group-hover:text-[#FFBC11] transition duration-200">
                          {proj.title}
                        </h3>
                      </div>

                      {/* Code and Diagnostic Alert Pill */}
                      <div className="p-3 bg-slate-950/75 border border-slate-800/60 rounded-xl flex items-start gap-2.5 text-xs font-mono text-[#00E5FF]">
                        <Cpu className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5 animate-pulse" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="px-1.5 py-0.2 bg-[#00E5FF]/10 text-[#00E5FF] text-[9px] font-black rounded border border-[#00E5FF]/20 font-mono">{proj.faultCode}</span>
                            <p className="font-semibold text-slate-400">Diagnosis Code</p>
                          </div>
                          <p className="mt-1 text-slate-300 text-[11px] leading-relaxed select-none">{proj.diagnosticReport}</p>
                        </div>
                      </div>

                      {/* Action description */}
                      <div className="space-y-1">
                        <p className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">Surgical Resolution:</p>
                        <p className="text-slate-350 text-xs sm:text-sm leading-relaxed font-sans font-medium line-clamp-3">
                          {proj.solve}
                        </p>
                      </div>

                      {/* INTERACTIVE COMPONENT: LIVE TELEMETRY terminal toggle */}
                      <div className="pt-2">
                        <button
                          onClick={() => setExpandedId(isDetailExpanded ? null : proj.id)}
                          className="w-full py-1.5 rounded-lg border border-slate-800/80 hover:border-amber-500/20 bg-slate-950/40 hover:bg-slate-900/60 text-slate-300 hover:text-[#FFBC11] text-[11px] font-mono font-bold flex items-center justify-center gap-2 transition duration-200 select-none cursor-pointer"
                        >
                          <Terminal className="w-3.5 h-3.5 text-amber-500" />
                          <span>{isDetailExpanded ? 'Hide Telemetry Log' : 'Inspect Telemetry Log'}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isDetailExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence initial={false}>
                          {isDetailExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden bg-[#070d16] border border-slate-900 rounded-xl p-4 mt-3 space-y-3 font-mono text-[11px]"
                            >
                              <div className="flex items-center justify-between text-[9px] text-slate-500 pb-2 border-b border-slate-900 select-none">
                                <span>TERMINAL ACTIVE // {proj.sensorWave}</span>
                                <span className="text-emerald-500 animate-pulse">● LOGGED</span>
                              </div>

                              <div className="space-y-2">
                                <div>
                                  <span className="text-red-400 font-bold block">[-] BEFORE SPECS (FAULT):</span>
                                  <p className="text-slate-400 text-[10px] mt-0.5 leading-normal">{proj.beforeSpecs}</p>
                                </div>
                                <div className="border-t border-slate-900/60 pt-2" />
                                <div>
                                  <span className="text-emerald-400 font-bold block">[+] AFTER SPECS (RESOLVED):</span>
                                  <p className="text-slate-400 text-[10px] mt-0.5 leading-normal">{proj.afterSpecs}</p>
                                </div>
                                <div className="border-t border-slate-900/60 pt-2" />
                                <div>
                                  <span className="text-slate-400 block uppercase font-bold text-[9px]">Swapped Hardware:</span>
                                  <p className="text-[#FFBC11] text-[10px] mt-0.5 leading-normal font-sans font-bold">{proj.partsSwapped}</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                    </div>
                  </div>

                  {/* Bottom Stats Row & CTA */}
                  <div className="p-6 pt-0 mt-auto space-y-3">
                    <div className="border-t border-slate-800/70 pt-4 flex justify-between items-center text-[10px] font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        Duration: {proj.duration}
                      </span>
                      <span className="text-emerald-400 font-bold tracking-wider">
                        {proj.warranty}
                      </span>
                    </div>

                    <a
                      href="#contact"
                      className="w-full py-2.5 rounded-xl border border-slate-850 hover:border-amber-400 bg-slate-950/20 hover:bg-[#FFBC11]/5 text-slate-200 hover:text-white text-xs font-black uppercase tracking-widest transition-all duration-250 cursor-pointer flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Obtain Similar Case Scope</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-[#FFBC11] group-hover/btn:translate-x-1 transition duration-200" />
                    </a>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ELEGANT SYSTEM ROUTING ACTION (REPLACED LEAD GENERATION FORM BANNER) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 bg-[#0b1424]/40 border border-slate-800/80 rounded-2xl relative overflow-hidden mt-10">
          <div className="absolute top-0 right-1/4 w-32 h-32 bg-blue-500/[0.01] rounded-full blur-2xl pointer-events-none" />
          <div className="text-left space-y-1 max-w-xl">
            <span className="text-[10px] font-mono text-[#FFBC11] uppercase tracking-wider font-extrabold block">AUTOMATED SYSTEMS PATHWAY</span>
            <h4 className="text-white font-display text-sm sm:text-base font-bold">Unresolved Dashboard Indicator or Suspicious Chassis Knock?</h4>
            <p className="text-slate-400 text-xs font-medium">Read our solution catalogs or directly connect with our shop foreman bypass.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0 font-mono text-xs">
            <a 
              href="#contact" 
              className="px-5 py-3 rounded-xl border border-amber-500/30 bg-[#FFBC11]/10 hover:bg-[#FFBC11]/25 text-[#FFBC11] font-black tracking-widest uppercase transition-all duration-300"
            >
              Consult Foreman Active
            </a>
            <a 
              href="#faq-section" 
              className="text-slate-500 hover:text-white transition duration-200 hover:underline text-[11px] font-bold"
            >
              Read Repair FAQs
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
