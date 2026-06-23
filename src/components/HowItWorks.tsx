import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  FileSpreadsheet, 
  Wrench, 
  KeyRound, 
  ArrowRight, 
  Clock, 
  Sparkle, 
  ShieldCheck, 
  ArrowLeftRight
} from 'lucide-react';

interface StepDetails {
  title: string;
  shortDesc: string;
  detailedDesc: string;
  duration: string;
  icon: React.ComponentType<any>;
  metric: string;
}

const STEPS: StepDetails[] = [
  {
    title: "Dynamic OBD2 Diagnostics",
    shortDesc: "Plug-in direct OBD2 telemetry scanner & record real-time system cylinder logs.",
    detailedDesc: "Our ASE Master mechanics hook up dealer-grade diagnostic terminals directly into your car's controller area network (CAN). We examine engine cylinder misfires, live vacuum pressures, catalytic performance ratios, and stored code arrays to locate exact mechanical errors.",
    duration: "15 - 30 Minutes",
    icon: Cpu,
    metric: "100% Diagnostic Accuracy"
  },
  {
    title: "Upfront Itemized Estimates",
    shortDesc: "Receive transparent live estimates with exact OEM part numbers listed.",
    detailedDesc: "Never guess what your invoice will say. We prepare an interactive digital quotation detailing required genuine parts, exact labor ratios, and estimated release times. You approve/reject separate entries directly via SMS or online dashboard before any tools touch your car.",
    duration: "Immediate Delivery",
    icon: FileSpreadsheet,
    metric: "0% Surprise Surcharges"
  },
  {
    title: "ASE Precision Tuning",
    shortDesc: "Master mechanics complete dealership-grade calibration & service.",
    detailedDesc: "Your car is wheeled into our diagnostic bay where our 12+ year experienced specialists execute surgical disassembly and part replacement. We torque all fasteners to official factory service specifications and flush fluids with premium synthetic compounds.",
    duration: "1 - 3 Hours Avg",
    icon: Wrench,
    metric: "12-Month/12k Mi Warranty"
  },
  {
    title: "Sanitized Quality Handover",
    shortDesc: "Execute electronic calibration, final road testing, and return your premium keys.",
    detailedDesc: "We perform a thorough road evaluation on high-speed and dynamic terrain to verify zero vibration and smooth shift curves. Your cabin touches are fully sanitized and your keys are presented back to you alongside digital telemetry reports.",
    duration: "10 Minutes Departure",
    icon: KeyRound,
    metric: "Premium Road Inspected"
  }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#060b13] to-[#09111e] border-t border-slate-900 overflow-hidden font-sans" id="how-it-works">
      {/* Background glow flares */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[250px] h-[250px] bg-amber-500/[0.03] rounded-full blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 md:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-xs text-[#FFBC11] font-bold tracking-widest uppercase select-none">
            <ArrowLeftRight className="w-3.5 h-3.5 animate-pulse" />
            <span>TRANSPARENT REPAIR TIMELINE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            How The Wefixx Blueprint Works<br />
            <span className="text-[#FFBC11]">Dynamic 4-Step Road Readiness</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Click on any of the steps below to trace the dynamic diagnostic, approvals, execution, and departure sequence live.
          </p>
        </div>

        {/* HORIZONTAL LIVE TRACE TRACK */}
        <div className="relative mb-12 sm:mb-16 max-w-5xl mx-auto px-4">
          
          {/* Base Track Line */}
          <div className="absolute top-7 left-8 right-8 h-1 bg-slate-800 rounded-full pointer-events-none hidden md:block" />

          {/* Active Progress Highlight Line */}
          <div 
            className="absolute top-7 left-8 h-1 bg-[#FFBC11] rounded-full pointer-events-none transition-all duration-500 ease-out hidden md:block"
            style={{ 
              width: `${(activeStep / (STEPS.length - 1)) * 90}%` 
            }}
          />

          {/* Track Nodes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const isPassed = idx <= activeStep;
              const isActive = idx === activeStep;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className="group flex flex-col items-center text-center cursor-pointer outline-none select-none transition-all duration-300"
                >
                  {/* Step Cycle Ring */}
                  <div className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-500 shadow-md ${
                    isActive 
                      ? 'bg-amber-500 border-[#FFBC11] text-slate-950 scale-110 ring-4 ring-amber-500/20' 
                      : isPassed
                        ? 'bg-[#0b1424] border-amber-500 text-[#FFBC11] scale-100'
                        : 'bg-[#09111e] border-slate-800 text-slate-500 group-hover:border-slate-600 group-hover:text-slate-300'
                  }`}>
                    <StepIcon className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'rotate-[10deg]' : ''}`} />
                  </div>

                  {/* Step Code label */}
                  <div className="mt-3.5 space-y-1">
                    <p className={`font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                      isActive ? 'text-[#FFBC11]' : 'text-slate-500'
                    }`}>
                      STEP 0{idx + 1}
                    </p>
                    <p className={`font-display text-xs sm:text-sm font-bold tracking-tight transition duration-200 mt-1 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* LIVE TRACE DETAILS CONTAINER CARD */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.4 }}
              className="relative bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 md:p-10 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Gold decorative accent bar */}
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#FFBC11]" />

              {/* left content */}
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{STEPS[activeStep].metric}</span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-black text-white">
                  {STEPS[activeStep].title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                  {STEPS[activeStep].shortDesc}
                </p>

                <p className="text-slate-420 text-xs sm:text-sm leading-relaxed font-sans text-slate-400">
                  {STEPS[activeStep].detailedDesc}
                </p>
              </div>

              {/* right meta cards */}
              <div className="lg:col-span-4 bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 space-y-3.5 text-center lg:text-left shadow-lg">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Typical Phase Duration</span>
                  <div className="flex items-center justify-center lg:justify-start gap-1.5 text-white">
                    <Clock className="w-4 h-4 text-[#FFBC11]" />
                    <span className="font-mono text-sm font-black text-slate-100">{STEPS[activeStep].duration}</span>
                  </div>
                </div>

                <div className="h-px bg-slate-800/80 w-full" />

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Next Milestone Action</span>
                  <p className="text-xs text-slate-300 leading-normal">
                    {activeStep < 3 
                      ? `Slide right or click step ${activeStep + 2} to review approvals.` 
                      : "Ready to go! Book diagnostic inspection to save your slot."}
                  </p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Stepper controls */}
          <div className="flex items-center justify-between mt-6 max-w-4xl mx-auto px-1">
            <button
              disabled={activeStep === 0}
              onClick={() => setActiveStep(prev => prev - 1)}
              className="px-4 py-2 border border-slate-800/80 rounded-xl text-xs font-bold uppercase text-slate-400 hover:text-white hover:border-slate-600 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer select-none"
            >
              ← Back Phase
            </button>
            
            <button
              disabled={activeStep === 3}
              onClick={() => setActiveStep(prev => prev + 1)}
              className="px-4 py-2 bg-[#FFBC11]/10 border border-amber-500/20 hover:bg-[#FFBC11]/20 rounded-xl text-xs font-black uppercase text-[#FFBC11] disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer select-none flex items-center gap-1"
            >
              <span>Next Phase</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
