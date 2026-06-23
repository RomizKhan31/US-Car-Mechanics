import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  MessageSquare,
  ArrowRight,
  User,
  AlertCircle
} from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1500);
  };

  // Safe checks for office hours
  const currentHour = new Date().getHours();
  const isOpenNow = currentHour >= 8 && currentHour < 18; // 8:00 AM - 6:00 PM

  return (
    <section className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#060b13] to-[#09111e] border-t border-slate-900 overflow-hidden font-sans" id="contact">
      {/* Visual background atmospheric lights */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-[350px] h-[350px] bg-amber-500/[0.015] rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-blue-500/[0.02] rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/5 text-xs text-[#FFBC11] font-bold tracking-widest uppercase select-none">
            <MessageSquare className="w-3.5 h-3.5 animate-pulse" />
            <span>CONNECT WITH MECHANICS DIRECTLY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Contact Our Diagnostics Bay<br />
            <span className="text-[#FFBC11]">Get Immediate Expert Guidance</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
            Send us a message, schedule a dynamic computer diagnostics scan, or drop by our high-performance facility today.
          </p>
        </div>

        {/* CONTAINER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch" id="contact-details-grid">
          
          {/* LEFT COLUMN: CONTACT CARDS & CONVENIENT DEALS */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Core Info Capsule */}
            <div className="bg-[#0b1424]/55 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden flex-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${isOpenNow ? 'bg-emerald-500' : 'bg-amber-550'} animate-pulse`} />
                  <span className="text-slate-400 font-mono text-xs font-bold uppercase tracking-wider">
                    {isOpenNow ? 'Diagnostics Bay: Open Now' : 'Bay Closed • Call Scheduled line'}
                  </span>
                </div>
                <h3 className="text-white font-display text-xl sm:text-2xl font-black">
                  Workshop Locations
                </h3>
              </div>

              <div className="space-y-6 pt-4">
                {/* Physical Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#FFBC11] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase font-mono tracking-wider text-slate-400">Headquarters Facility</h4>
                    <p className="text-slate-200 text-sm sm:text-base font-semibold mt-1">
                      1200 Performance Way, Suite B
                    </p>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Detroit, MI 48201
                    </p>
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-[#FFBC11] hover:underline font-bold inline-flex items-center gap-1 mt-2 cursor-pointer"
                    >
                      <span>Get Driving Directions</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Secure Helplines */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#FFBC11] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase font-mono tracking-wider text-slate-400">ASE Mechanic Line</h4>
                    <p className="text-slate-200 text-sm sm:text-base font-bold mt-1">
                      1 (800) 555-3942
                    </p>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Direct connection to active duty foremen
                    </p>
                  </div>
                </div>

                {/* Support Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#FFBC11] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase font-mono tracking-wider text-slate-400">Direct Inquiries</h4>
                    <p className="text-[#FFBC11] text-sm sm:text-base font-mono font-bold mt-1">
                      support@wefixx.com
                    </p>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Monitored 24/7 by service catalog agents
                    </p>
                  </div>
                </div>

                {/* Operating hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#FFBC11] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase font-mono tracking-wider text-slate-400">Operating Timeline</h4>
                    <p className="text-slate-200 text-sm font-semibold mt-1">
                      Monday – Friday: 8:00 AM – 6:00 PM
                    </p>
                    <p className="text-slate-200 text-sm font-semibold mt-0.5">
                      Saturday: 9:00 AM – 3:00 PM
                    </p>
                    <p className="text-slate-400 text-xs mt-1">
                      Sunday: Closed (Emergencies only)
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Premium Guarantee Pill */}
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <p className="text-[11px] text-slate-350 leading-relaxed font-sans font-medium">
                🛡️ <strong className="text-white">Privacy Secured:</strong> We do not share your private numbers or diagnostic records with third party listing sites.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: HIGH-CONTRAST FORM CARD */}
          <div className="lg:col-span-7 bg-[#0b1424]/45 border border-slate-800/85 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                  id="workshop-contact-form"
                >
                  <div className="space-y-1 mb-4">
                    <h3 className="text-white font-display text-lg sm:text-xl font-black">
                      Send a Message
                    </h3>
                    <p className="text-xs text-slate-400 font-medium font-sans">
                      Fill out the form below. An ASE certified technician will review your vehicle context and reach out directly.
                    </p>
                  </div>

                  {/* Name and email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase text-slate-400 mb-1.5">
                        Full Name <span className="text-[#FFBC11]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Arthur Pendelton"
                        className="w-full bg-slate-950/60 border border-slate-800 focus:border-[#FFBC11] focus:ring-1 focus:ring-[#FFBC11] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 transition outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase text-slate-400 mb-1.5">
                        Email Address <span className="text-[#FFBC11]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="arthur@example.com"
                        className="w-full bg-slate-950/60 border border-slate-800 focus:border-[#FFBC11] focus:ring-1 focus:ring-[#FFBC11] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 transition outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone & Subject Select */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase text-slate-400 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-slate-950/60 border border-slate-800 focus:border-[#FFBC11] focus:ring-1 focus:ring-[#FFBC11] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 transition outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase text-slate-400 mb-1.5">
                        Inquiry Topic
                      </label>
                      <div className="relative">
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full bg-slate-950/60 border border-slate-800 focus:border-[#FFBC11] focus:ring-1 focus:ring-[#FFBC11] rounded-xl px-4 py-3 text-xs text-slate-300 transition outline-none cursor-pointer appearance-none"
                          style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`, backgroundPosition: 'right 10px center', backgroundRepeat: 'no-repeat', backgroundSize: '16px' }}
                        >
                          <option value="general">General Diagnostics / Inspection</option>
                          <option value="estimate">Get Urgent Fault Estimate</option>
                          <option value="ev-hybrid">EV/Hybrid System Diagnostics</option>
                          <option value="business">Corporate Fleet & Performance Tuning</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Message details */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-slate-400 mb-1.5">
                      Describe Diagnostics / Issues <span className="text-[#FFBC11]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please details any dashboard warning codes, alignment pull angles, or spongy braking events here..."
                      className="w-full bg-slate-950/60 border border-slate-800 focus:border-[#FFBC11] focus:ring-1 focus:ring-[#FFBC11] rounded-xl p-4 text-xs text-white placeholder-slate-600 transition outline-none resize-none"
                    />
                  </div>

                  {/* Action button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 rounded-xl bg-[#FFBC11] hover:bg-[#eab308] disabled:bg-slate-800 text-slate-950 font-black uppercase text-xs tracking-widest transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group shadow-lg shadow-amber-500/10 active:scale-[0.99] select-none"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Delivering System Payload...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Secure Message</span>
                          <Send className="w-4 h-4 text-slate-950 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-6 sm:p-10 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-4 text-center sm:text-left"
                >
                  <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 mx-auto sm:mx-0">
                    <CheckCircle2 className="w-6 h-6 animate-pulse" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-white font-display text-lg sm:text-xl font-black uppercase tracking-wide">
                      Message Successfully Routed!
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Your query has been logged securely into our diagnostic triage network. A certified ASE Specialist has been notified and will call or email you shortly.
                    </p>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-lg border border-slate-800 hover:border-amber-400 bg-slate-950/40 text-[#FFBC11] font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    ← Transmit New Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
