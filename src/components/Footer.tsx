import React, { useState } from 'react';
import { 
  Wrench, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Cpu,
  ShieldCheck,
  ChevronRight,
  Send,
  CheckCircle2,
  Car,
  Clock,
  Sparkle,
  Sparkles,
  HelpCircle,
  ShieldCheck as Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import workshopImage from '../assets/images/workshop_mechanic_diagnostic_1781897273706.jpg';

const PremiumFooterDivider = () => {
  return (
    <div className="relative flex items-center justify-center my-8 select-none overflow-hidden max-w-4xl mx-auto w-full px-4">
      {/* Left tapered golden line - Starts narrow (transparent, height 0px) on the outside, becomes larger in the middle */}
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/15 to-[#FFBC11] origin-right"
        style={{
          clipPath: 'polygon(0 50%, 100% 0, 100% 100%)'
        }}
      />
      
      {/* Center Diamond with golden outer ring & inner glow */}
      <motion.div 
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 135 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.2 }}
        className="relative mx-3 shrink-0 flex items-center justify-center animate-pulse"
      >
        {/* Glow halo */}
        <div className="absolute w-6 h-6 bg-[#FFBC11]/20 rounded-full blur-[6px] pointer-events-none" />
        
        {/* Outer rotating diamond border */}
        <div className="w-4 h-4 border border-amber-400 bg-[#060c18] flex items-center justify-center shadow-[0_0_8px_rgba(255,188,17,0.5)]">
          {/* Inner mini diamond */}
          <div className="w-1 h-1 bg-gradient-to-br from-[#FFBC11] to-amber-700 font-bold" />
        </div>
      </motion.div>
      
      {/* Right tapered golden line - Starts larger in the middle, becomes narrow on the right */}
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full h-[1.5px] bg-gradient-to-l from-transparent via-amber-500/15 to-[#FFBC11] origin-left"
        style={{
          clipPath: 'polygon(100% 50%, 0 0, 0 100%)'
        }}
      />
    </div>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Lead Gen form state
  const [vehicle, setVehicle] = useState('');
  const [contact, setContact] = useState('');
  const [issueType, setIssueType] = useState('diagnostics');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle lead submission
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicle || !contact) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Optional: Reset inputs
      setVehicle('');
      setContact('');
    }, 1500);
  };

  return (
    <footer 
      className="relative w-full border-t border-slate-900 overflow-hidden font-sans pt-12 sm:pt-16 pb-8"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(6, 11, 19, 0.99) 50%, rgba(6, 12, 23, 0.94) 100%), url(${workshopImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dynamic golden ambient light flares */}
      <div className="absolute top-0 left-1/4 w-[450px] h-[150px] bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================
            TOP OF FOOTER: STYLISH LEAD GENERATION BLOCK 
            ======================================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-gradient-to-r from-slate-950/90 via-[#0B1528]/95 to-slate-950/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden"
        >
          {/* Subtle gold line tracer on card edge */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFBC11] to-transparent" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left informational space */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-[10px] text-[#FFBC11] font-bold tracking-widest uppercase select-none">
                <Sparkles className="w-3 h-3 animate-pulse" />
                <span>INSTANT TELEMETRY TRIAGE</span>
              </div>
              
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                Get a Free Transparent<br />
                <span className="text-[#FFBC11]">Repair Estimate Inquiry</span>
              </h3>
              
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md">
                Tell us about your vehicle model and active dashboard warnings. Our ASE Master mechanics will analyze the symptoms and deliver an itemized labor quote directly to your inbox.
              </p>

              {/* Verified Trust points */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 text-[11px] font-mono text-slate-450 text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>No obligation, 100% confidential</span>
                </div>
                <div className="hidden sm:block text-slate-700">|</div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#FFBC11]" />
                  <span>Callback within 30 minutes</span>
                </div>
              </div>
            </div>

            {/* Right form sector */}
            <div className="lg:col-span-7 bg-slate-950/60 rounded-2xl p-5 sm:p-7 border border-slate-900 relative">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form 
                    key="lead-form"
                    onSubmit={handleLeadSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Vehicle model input */}
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-slate-400 mb-1.5 select-none tracking-wider">
                          Vehicle Make / Model <span className="text-[#FFBC11]">*</span>
                        </label>
                        <div className="relative group/input">
                          <Car className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-[#FFBC11] transition-colors" />
                          <input 
                            type="text" 
                            required
                            value={vehicle}
                            onChange={(e) => setVehicle(e.target.value)}
                            placeholder="e.g. Porsche Cayenne 2021" 
                            className="w-full bg-[#0a0f1d] border border-slate-800/80 focus:border-[#FFBC11] focus:ring-2 focus:ring-[#FFBC11]/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-650 outline-none transition-all duration-200"
                          />
                        </div>
                      </div>

                      {/* Phone/Email input */}
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-slate-400 mb-1.5 select-none tracking-wider">
                          Contact (Phone or Email) <span className="text-[#FFBC11]">*</span>
                        </label>
                        <div className="relative group/input">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-[#FFBC11] transition-colors" />
                          <input 
                            type="text" 
                            required
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="e.g. bailey@healthcare.org" 
                            className="w-full bg-[#0a0f1d] border border-slate-800/80 focus:border-[#FFBC11] focus:ring-2 focus:ring-[#FFBC11]/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-650 outline-none transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                      {/* Trouble select */}
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-slate-400 mb-1.5 select-none tracking-wider">
                          Primary Symptom / Fault Area
                        </label>
                        <div className="relative">
                          <select 
                            value={issueType}
                            onChange={(e) => setIssueType(e.target.value)}
                            className="w-full bg-[#0a0f1d] border border-slate-800/80 focus:border-[#FFBC11] focus:ring-2 focus:ring-[#FFBC11]/10 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none transition-all cursor-pointer appearance-none duration-250"
                            style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%23FFBC11' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`, backgroundPosition: 'right 14px center', backgroundRepeat: 'no-repeat', backgroundSize: '16px' }}
                          >
                            <option value="diagnostics">Computer Code Diagnostic</option>
                            <option value="cylinder-leak">Engine / Spark Plug Service</option>
                            <option value="regenerative-brakes">Regenerative Brake Sponge</option>
                            <option value="laser-alignment">Laser Wheel Alignment</option>
                            <option value="exhaust-turbo">Turbocharger Overhaul</option>
                          </select>
                        </div>
                      </div>

                      {/* Submit button aligned perfectly with the select dropdown baseline height */}
                      <div>
                        <div className="hidden sm:block text-[10px] font-mono font-bold uppercase text-transparent mb-1.5 select-none pointer-events-none">
                          Action Submit
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full px-6 py-3 rounded-xl bg-[#FFBC11] hover:bg-amber-400 text-slate-950 font-black uppercase text-xs tracking-widest transition-all duration-250 cursor-pointer flex items-center justify-center gap-2 group/sub shadow-lg shadow-amber-500/15 active:scale-[0.982]"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                              <span>Analyzing symptoms...</span>
                            </>
                          ) : (
                            <>
                              <span>Calculate Estimate</span>
                              <Send className="w-3.5 h-3.5 text-slate-950 group-hover/sub:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="lead-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center sm:text-left py-4 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-6 h-6 animate-bounce" />
                      </div>
                      <div>
                        <h4 className="text-white font-display text-base font-black uppercase tracking-wide">
                          Triage Estimate Logged!
                        </h4>
                        <p className="text-slate-400 text-xs mt-1">
                          Your simulation index has dispatched certified vehicle signals directly to our team.
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Thank you! An independent ASE Master Technician will inspect the details of your system report immediately. We expect to contact you at <strong className="text-[#FFBC11]">{contact}</strong> within 30 minutes.
                    </p>

                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-4 py-2 rounded-lg border border-slate-800 hover:border-amber-400 bg-slate-900 text-slate-300 hover:text-white font-mono text-[10px] font-bold uppercase transition"
                    >
                      ← Back to Form Terminal
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* First Premium Tapered Diamond Divider below Lead Gen Block */}
        <PremiumFooterDivider />

        {/* ========================================================
            STYLISH MIDDLE LAYOUT: BRAND META & MULTI-GRID MAPS
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-2">
          
          {/* Logo & description column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2.5 group cursor-pointer select-none">
              <div className="w-9 h-9 rounded-full bg-[#FFBC11] flex items-center justify-center text-slate-950 group-hover:rotate-45 transition duration-300 shadow-md shadow-amber-500/10">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-wider text-white uppercase">
                WE<span className="text-[#FFBC11]">FIXX</span>
              </span>
            </div>
            
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Certified independent computer diagnostics and master-grade vehicle repairs. Detroit-guided engineering designed for sports cars, luxury SUVs, and high-voltage electric hybrids.
            </p>

            {/* Quick trust metrics */}
            <div className="space-y-2.5 font-mono text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                <span>12-Month / 12,000-Mile Nationwide Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                <span>OEM Diagnostics & Live Calibration Certified</span>
              </div>
            </div>
          </div>

          {/* Links block columns (3 columns) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Catalog list */}
            <div className="space-y-4">
              <h4 className="text-white text-xs font-mono font-bold uppercase tracking-widest text-[#FFBC11]">
                Services Catalog
              </h4>
              <ul className="space-y-2.5 text-xs">
                {[
                  { label: "Computer Diagnostics", href: "#services-grid" },
                  { label: "Cylinder Overhauls", href: "#services-grid" },
                  { label: "Regenerative Brakes", href: "#services-grid" },
                  { label: "Laser Alignment", href: "#services-grid" }
                ].map((l, lid) => (
                  <li key={lid}>
                    <a 
                      href={l.href} 
                      className="text-slate-400 hover:text-white transition duration-200 flex items-center gap-1 group/link"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-slate-700 group-hover/link:text-[#FFBC11] group-hover/link:translate-x-0.5 transition duration-200 shrink-0" />
                      <span>{l.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Labs list */}
            <div className="space-y-4">
              <h4 className="text-white text-xs font-mono font-bold uppercase tracking-widest text-[#FFBC11]">
                Diagnostics Labs
              </h4>
              <ul className="space-y-2.5 text-xs">
                {[
                  { label: "ASE Master Technicians", href: "#about-us" },
                  { label: "Live Telemetry Logs", href: "#recent-works" },
                  { label: "High-Tech Facilities", href: "#about-us" },
                  { label: "Timeline Blueprints", href: "#how-it-works" }
                ].map((l, lid) => (
                  <li key={lid}>
                    <a 
                      href={l.href} 
                      className="text-slate-400 hover:text-white transition duration-200 flex items-center gap-1 group/link"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-slate-700 group-hover/link:text-[#FFBC11] group-hover/link:translate-x-0.5 transition duration-200 shrink-0" />
                      <span>{l.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct contact summary docks (Saves screen space & is super stylish) */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h4 className="text-white text-xs font-mono font-bold uppercase tracking-widest text-[#FFBC11]">
                Repair Dock Support
              </h4>
              <div className="space-y-4 text-xs">
                
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4.5 h-4.5 text-[#FFBC11]" />
                  <div>
                    <p className="text-[9px] font-mono font-black text-slate-500 uppercase">Master Line</p>
                    <p className="text-white font-bold font-sans">1 (800) 555-3942</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4.5 h-4.5 text-[#FFBC11]" />
                  <div>
                    <p className="text-[9px] font-mono font-black text-slate-500 uppercase">Detroit Dock</p>
                    <p className="text-white font-bold font-sans">Performance Way, MI US</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4.5 h-4.5 text-[#FFBC11]" />
                  <div>
                    <p className="text-[9px] font-mono font-black text-slate-500 uppercase">Telemetry Mail</p>
                    <p className="text-[#FFBC11] font-mono font-bold">support@wefixx.com</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Second Premium Tapered Diamond Divider preceding Copyright Row */}
        <PremiumFooterDivider />

        {/* ========================================================
            STYLISH BOTTOM ROW: COMPLIANCE, COPYRIGHT & SOCIALS
            ======================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-1 select-none">
            <p className="text-[11px] text-slate-500">
              © {currentYear} Wefixx Independent Automotive Service. Detroit, MI. All rights reserved. ASE-Certified Repairs.
            </p>
            <p className="text-[9px] text-slate-600 font-mono tracking-wider">
              REGISTRATION ACTIVE // CAN OBD2 VERIFIED CLEARANCE GUARANTEE 
            </p>
          </div>

          {/* Social icons supporting elegant gradient halos */}
          <div className="flex items-center gap-4 text-slate-500">
            <a 
              href="https://facebook.com" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Profile"
              className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-900 hover:border-amber-500/40 flex items-center justify-center text-slate-400 hover:text-[#FFBC11] hover:bg-amber-500/5 transition duration-200"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-900 hover:border-amber-500/40 flex items-center justify-center text-slate-400 hover:text-[#FFBC11] hover:bg-amber-500/5 transition duration-200"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-900 hover:border-amber-500/40 flex items-center justify-center text-slate-400 hover:text-[#FFBC11] hover:bg-amber-500/5 transition duration-200"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
