import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES, ARTICLES } from '../data';
import { Service, Article, Booking } from '../types';
import { Wrench, Shield, Award, Sparkles, Clock, DollarSign, Calendar, ChevronRight, User, Phone, CheckCircle, Star, MapPin, Send, Mail, Heart, FileText, HelpCircle, ArrowRight } from 'lucide-react';

interface ContentPanelProps {
  activeTab: string | null;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export default function ContentPanel({ activeTab, onClose, onBookService }: ContentPanelProps) {
  // Services sub-state
  const [serviceFilter, setServiceFilter] = useState<'all' | 'maintenance' | 'repair' | 'diagnostics'>('all');

  // Contact form sub-state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Pricing calculator sub-state
  const [calcSelected, setCalcSelected] = useState<string[]>(['oil-change']);

  // Blog interactive post sub-state
  const [selectedPost, setSelectedPost] = useState<Article | null>(null);

  // Log in & Register sub-state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isSocialLoading, setIsSocialLoading] = useState<'google' | 'github' | null>(null);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Handle Calculator Toggle
  const toggleCalculator = (id: string) => {
    if (calcSelected.includes(id)) {
      if (calcSelected.length > 1) {
        setCalcSelected(calcSelected.filter(x => x !== id));
      }
    } else {
      setCalcSelected([...calcSelected, id]);
    }
  };

  const getCalcSubtotal = () => {
    return SERVICES.filter(s => calcSelected.includes(s.id)).reduce((sum, s) => sum + s.price, 0);
  };
  const getCalcDiscount = () => {
    // 10% discount for matching multiple services
    return calcSelected.length > 1 ? Math.round(getCalcSubtotal() * 0.1) : 0;
  };
  const getCalcTotal = () => getCalcSubtotal() - getCalcDiscount() + Math.round((getCalcSubtotal() - getCalcDiscount()) * 0.08);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMessage('');
    }, 100);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailLower = loginEmail.trim().toLowerCase();
    
    if (!emailLower) {
      setLoginError('Please specify an email address.');
      return;
    }
    
    if (authMode === 'register') {
      if (!loginName.trim()) {
        setLoginError('Please specify your name.');
        return;
      }
      if (loginPassword.length < 4) {
        setLoginError('Password must be at least 4 characters long.');
        return;
      }
      
      // Simulate registration
      const usersRaw = localStorage.getItem('wefixx_registered_users');
      const users = usersRaw ? JSON.parse(usersRaw) : {};
      users[emailLower] = {
        name: loginName.trim(),
        password: loginPassword,
        registeredAt: new Date().toISOString()
      };
      localStorage.setItem('wefixx_registered_users', JSON.stringify(users));
    } else {
      // Login mode - look up user if registered
      const usersRaw = localStorage.getItem('wefixx_registered_users');
      const users = usersRaw ? JSON.parse(usersRaw) : {};
      
      if (users[emailLower]) {
        if (users[emailLower].password !== loginPassword) {
          setLoginError('Incorrect password. Please try again.');
          return;
        }
        setLoginName(users[emailLower].name);
      } else {
        // If not explicitly registered, allow direct access (fallback to retrieve matching bookings seamlessly)
        setLoginName(loginEmail.split('@')[0]);
      }
    }
    
    // Retrieve bookings
    const raw = localStorage.getItem('wefixx_bookings');
    const allBookings: Booking[] = raw ? JSON.parse(raw) : [];
    
    // Filter by email (case insensitive)
    const matches = allBookings.filter(b => b.email.toLowerCase().trim() === emailLower);
    
    setUserBookings(matches);
    setLoggedIn(true);
    setLoginError('');
  };

  const handleSocialLogin = (provider: 'google' | 'github') => {
    setIsSocialLoading(provider);
    setLoginError('');
    
    setTimeout(() => {
      const email = provider === 'google' 
        ? 'google.user@gmail.com' 
        : 'github.dev@github.com';
      const name = provider === 'google' ? 'Google Customer' : 'Git Dev User';
      
      const raw = localStorage.getItem('wefixx_bookings');
      const allBookings: Booking[] = raw ? JSON.parse(raw) : [];
      const matches = allBookings.filter(b => b.email.toLowerCase().trim() === email);
      
      setLoginEmail(email);
      setLoginName(name);
      setLoginPassword('OAuthSimulatedToken123');
      setUserBookings(matches);
      setLoggedIn(true);
      setIsSocialLoading(null);
    }, 800);
  };

  const handleCancelBooking = (id: string) => {
    const raw = localStorage.getItem('wefixx_bookings');
    if (!raw) return;
    const allBookings: Booking[] = JSON.parse(raw);
    const updated = allBookings.map(b => b.id === id ? { ...b, status: 'cancelled' as const } : b);
    localStorage.setItem('wefixx_bookings', JSON.stringify(updated));
    setUserBookings(userBookings.map(b => b.id === id ? { ...b, status: 'cancelled' as const } : b));
  };

  const filteredServices = SERVICES.filter(
    s => serviceFilter === 'all' || s.category === serviceFilter
  );

  if (!activeTab) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center pt-20 px-4 pb-4 md:px-0 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm" 
        onClick={onClose}
      />

      {/* Main panel container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-5xl bg-[#0b1424]/98 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[80vh] z-10 overflow-hidden font-sans text-slate-200"
      >
        {/* Ribbon banner */}
        <div className="bg-gradient-to-r from-amber-500/10 via-[#FFBC11]/10 to-amber-500/10 border-b border-slate-800 p-2 text-center text-[11px] text-amber-400 font-mono flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>REAL-TIME INTERACTIVE PORTAL — SELECT OPTIONS FREELY</span>
        </div>

        {/* Tab Header content */}
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-[#0d1729]">
          <div>
            <h3 className="font-display font-extrabold text-2xl text-white tracking-wide uppercase">
              {activeTab === 'services' && 'Our Premium Car Services'}
              {activeTab === 'about' && 'About Wefixx Car Care'}
              {activeTab === 'pricing' && 'Transparent Pricing Calculator'}
              {activeTab === 'blog' && 'Wefixx Smart Car Guide'}
              {activeTab === 'contact' && 'Contact Our Workshop & Team'}
              {activeTab === 'login' && 'Customer Service Center'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {activeTab === 'services' && 'Every job is handled recursively by ASE Master mechanics.'}
              {activeTab === 'about' && 'The leading vehicle mechanic studio, serving precision since 2012.'}
              {activeTab === 'pricing' && 'Check prices, construct details, and book with combo adjustments.'}
              {activeTab === 'blog' && 'Expert repair concepts and maintenance wisdom for advanced owners.'}
              {activeTab === 'contact' && 'Located inside Main Motors Hub. Send symptoms online or call directly.'}
              {activeTab === 'login' && 'Verify appointment checklists, status updates, or cancel scheduled reservations.'}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="px-4 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 text-slate-400 hover:text-white text-xs transition cursor-pointer"
          >
            Close View
          </button>
        </div>

        {/* Dynamic content scrollable area */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#0c1322]">
          
          {/* TAB 1: SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              {/* Service selection categories */}
              <div className="flex flex-wrap gap-2 justify-center py-1">
                {(['all', 'maintenance', 'repair', 'diagnostics'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setServiceFilter(cat)}
                    className={`px-4 py-1.5 rounded-full capitalize text-xs font-semibold cursor-pointer transition ${
                      serviceFilter === cat 
                        ? 'bg-[#FFBC11] text-slate-950 shadow-md font-bold' 
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredServices.map(service => (
                  <div key={service.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-display font-bold text-lg text-white">{service.name}</h4>
                        <span className="text-[#FFBC11] text-lg font-mono font-bold tracking-tight">${service.price}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">{service.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mt-1">
                        {service.benefits.map((b, i) => (
                          <span key={i} className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-amber-400 border border-slate-800/60 font-mono">
                            ✓ {b}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/40 text-[11px] text-slate-400 font-mono">
                      <span>Est: {service.estimatedTime}</span>
                      <button
                        onClick={() => onBookService(service.id)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-[#FFBC11] text-[#FFBC11] hover:text-slate-950 font-bold border border-amber-500/20 transition cursor-pointer"
                      >
                        Book This
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT US TAB */}
          {activeTab === 'about' && (
            <div className="space-y-8">
              {/* Shop metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { value: '14,000+', title: 'Cars Restored', icon: Wrench },
                  { value: '100%', title: 'Symptom Resolved', icon: CheckCircle },
                  { value: '12+', title: 'Years of Experience', icon: Award },
                  { value: '4.9 Star', title: 'Customer Rating', icon: Star }
                ].map((m, i) => (
                  <div key={i} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-amber-500/5 border border-amber-500/10 flex items-center justify-center mx-auto mb-2 text-[#FFBC11]">
                      <m.icon className="w-5 h-5" />
                    </div>
                    <p className="font-display font-extrabold text-2xl text-white font-mono">{m.value}</p>
                    <p className="text-xs text-slate-400 mt-1">{m.title}</p>
                  </div>
                ))}
              </div>

              {/* Team bio */}
              <div className="space-y-4">
                <h4 className="font-display font-bold text-lg text-white border-b border-slate-800 pb-2">Meet Our ASE-Certified Masters</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      name: 'Carlos Ramirez',
                      role: 'ASE Master Engine Repair Specialist',
                      exp: '15 Years Experience',
                      specialty: 'Engine diagnostics, major overhauls, manual transmissions',
                      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                      name: 'Sarah Lin',
                      role: 'Advanced Diagnostics & Hybrid Lead',
                      exp: '8 Years Experience',
                      specialty: 'EV components, modern CAN bus network faults, calibration',
                      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
                    },
                    {
                      name: 'Jim Vance',
                      role: 'Alignment, Braking & Air Assembly Lead',
                      exp: '12 Years Experience',
                      specialty: 'Hydraulic systems, laser tire alignment, custom tune struts',
                      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80'
                    }
                  ].map((chef, idx) => (
                    <div key={idx} className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 flex gap-4 items-center">
                      <img 
                        src={chef.img} 
                        alt={chef.name} 
                        className="w-16 h-16 rounded-full object-cover grayscale brightness-90 hover:grayscale-0 transition border border-slate-700" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#FFBC11] text-sm truncate">{chef.name}</p>
                        <p className="text-xs text-white font-semibold truncate">{chef.role}</p>
                        <p className="text-[10px] text-amber-500/80 font-mono">{chef.exp}</p>
                        <p className="text-[10px] text-slate-400 mt-1 leading-normal font-sans line-clamp-2">{chef.specialty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality certification logos banner */}
              <div className="bg-slate-900/30 p-4 border border-slate-800/80 rounded-xl flex flex-wrap justify-around items-center gap-6">
                <div className="text-center">
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Industry Compliance</p>
                  <p className="text-sm font-semibold text-slate-300">Certified Repair Standards</p>
                </div>
                {['ASE Master Certified Code', 'EV-Ready Master Standard', 'AAA Approved Diagnostic Hub', 'I-CAR Platinum Grade'].map((c, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-950/60 rounded border border-slate-800 text-[11px] text-slate-400 font-mono tracking-wide">
                    👑 {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PRICING CALCULATOR */}
          {activeTab === 'pricing' && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Select items */}
              <div className="md:col-span-3 space-y-3">
                <h4 className="font-display font-semibold text-[#FFBC11] text-xs uppercase tracking-wider mb-2">Check Services For Fast Quotes:</h4>
                <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                  {SERVICES.map(s => {
                    const isSelected = calcSelected.includes(s.id);
                    return (
                      <div
                        key={s.id}
                        onClick={() => toggleCalculator(s.id)}
                        className={`p-3 rounded-lg border cursor-pointer flex justify-between items-center transition ${
                          isSelected 
                            ? 'bg-amber-500/5 border-amber-500/50 text-white' 
                            : 'bg-[#121c2c] border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            checked={isSelected}
                            readOnly
                            className="accent-amber-500 h-4.5 w-4.5 rounded text-slate-900 focus:ring-0 cursor-pointer"
                          />
                          <div>
                            <p className="text-sm font-semibold text-white">{s.name}</p>
                            <p className="text-xs text-slate-400">Duration: {s.estimatedTime}</p>
                          </div>
                        </div>
                        <span className="font-mono text-sm font-bold text-[#FFBC11]">${s.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Estimate Receipt summary */}
              <div className="md:col-span-2 bg-[#0a101b] border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm text-white border-b border-slate-800 pb-2 mb-4 uppercase tracking-wider flex items-center justify-between">
                    <span>Invoice Proposal</span>
                    <span className="text-[10px] font-mono lowercase tracking-normal text-slate-500">quote #pro-{(getCalcSubtotal() * 2)}</span>
                  </h4>

                  <div className="space-y-2 text-sm font-sans">
                    {SERVICES.filter(s => calcSelected.includes(s.id)).map(s => (
                      <div key={s.id} className="flex justify-between">
                        <span className="text-slate-400 text-xs truncate max-w-[180px]">{s.name}</span>
                        <span className="text-slate-300 font-mono text-xs">${s.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-800/80 my-4 pt-3 space-y-2 text-xs font-sans">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal:</span>
                      <span className="font-mono text-slate-300">${getCalcSubtotal()}</span>
                    </div>
                    {calcSelected.length > 1 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Multi-repair combo discount (10%):</span>
                        <span className="font-mono">-${getCalcDiscount()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-500">
                      <span>State Recycling tax (8%):</span>
                      <span className="font-mono text-slate-300">${Math.round((getCalcSubtotal() - getCalcDiscount()) * 0.08)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800">
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-sm font-semibold text-white">Estimated Total:</span>
                    <span className="text-2xl font-bold font-mono text-[#FFBC11]">${getCalcTotal()}</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      // Pass selected services to book
                      onBookService(calcSelected[0]);
                    }}
                    className="w-full py-2.5 rounded-lg bg-[#FFBC11] hover:bg-[#eab308] text-slate-950 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/5"
                  >
                    <span>Instant Booking Wizard</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>
                  <p className="text-[10px] text-center text-slate-500 mt-2">
                    Actual invoice may vary slightly depending on fluid grades or filter sizes of older vehicles.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BLOG / CAR GUIDES */}
          {activeTab === 'blog' && (
            <div className="space-y-6">
              {selectedPost ? (
                // Article Reader Detail
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="text-xs text-amber-400 flex items-center gap-1 mb-2 hover:underline cursor-pointer"
                  >
                    ← Back to Guides Directory
                  </button>
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title} 
                    className="w-full h-64 object-cover rounded-xl border border-slate-800"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-mono">
                    <span>{selectedPost.category}</span>
                    <span>{selectedPost.date} • {selectedPost.readTime}</span>
                  </div>
                  <h4 className="font-display font-bold text-2xl text-white">{selectedPost.title}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line font-sans pt-1">
                    {selectedPost.content}
                    {"\n\n"}
                    Our diagnostic team strongly recommends auditing core operations during oil service routines. Many check engine light codes can be safely prevented by clean fuel filters and sealing pressure-cap components. When clicking around our pricing tools, you can review common filters and schedule spark plug updates.
                    {"\n\n"}
                    Always follow vehicle specific manuals and use high quality OEM components. If you require specialized mechanic insights, feel free to schedule custom diagnostic testing inside the Wefixx Booking systems above.
                  </p>

                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between text-xs mt-4">
                    <span className="text-slate-300">Found this helpful? Schedule a check with us.</span>
                    <button
                      onClick={() => {
                        setSelectedPost(null);
                        onClose();
                        // Trigger Book now
                        onBookService('diagnostics');
                      }}
                      className="px-3 py-1.5 rounded bg-[#FFBC11] text-slate-950 font-bold hover:bg-amber-400 transition cursor-pointer"
                    >
                      Book Free Inspection
                    </button>
                  </div>
                </motion.div>
              ) : (
                // Post List View
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {ARTICLES.map(post => (
                    <div 
                      key={post.id} 
                      onClick={() => setSelectedPost(post)}
                      className="bg-slate-900/40 border border-slate-800 hover:border-slate-700/80 rounded-xl overflow-hidden cursor-pointer flex flex-col justify-between transition group"
                    >
                      <div>
                        <div className="relative overflow-hidden h-40">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500 grayscale brightness-90 group-hover:grayscale-0"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="p-4 space-y-2">
                          <div className="flex justify-between text-[10px] text-amber-400 font-mono">
                            <span>{post.category}</span>
                            <span>{post.readTime}</span>
                          </div>
                          <h5 className="font-display font-bold text-white text-sm group-hover:text-[#FFBC11] transition line-clamp-2">{post.title}</h5>
                          <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">{post.excerpt}</p>
                        </div>
                      </div>
                      <div className="p-4 border-t border-slate-800/60 bg-slate-950/20 text-xs text-amber-500/80 font-mono flex items-center justify-between">
                        <span>{post.date}</span>
                        <span className="group-hover:translate-x-1 transition duration-250">Read Report →</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: CONTACT TABS */}
          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Message Form */}
              <div className="md:col-span-3 space-y-4">
                {contactSubmitted ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/40 p-6 rounded-xl text-center space-y-3">
                    <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                    <p className="font-bold text-white text-base">Message Sent Successfully</p>
                    <p className="text-xs text-slate-400 font-sans max-w-sm mx-auto">
                      Our shift manager Carlos will review your symptoms within 2 hours and call or email you with feedback. Thank you!
                    </p>
                    <button 
                      onClick={() => setContactSubmitted(false)}
                      className="px-4 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-xs text-slate-300 transition"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <h5 className="font-display font-medium text-xs text-slate-400 uppercase tracking-widest mb-1">Submit Vehicle Description:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Your Name *</label>
                        <input 
                          type="text" 
                          placeholder="Arthur Dent" 
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full bg-[#141f32] border border-slate-800 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-amber-500 text-slate-100"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Email *</label>
                        <input 
                          type="email" 
                          placeholder="arthur@galaxy.org" 
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full bg-[#141f32] border border-slate-800 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-amber-500 text-slate-100"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Phone Number (Optional)</label>
                      <input 
                        type="tel" 
                        placeholder="(555) 777-1212" 
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-[#141f32] border border-slate-800 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-amber-500 text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Describe symptoms (clunking noises, engine light codes, etc) *</label>
                      <textarea 
                        rows={4}
                        placeholder="Type vehicle details here..." 
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className="w-full bg-[#141f32] border border-slate-800 rounded-lg py-1.5 px-3 text-xs focus:outline-none focus:border-amber-500 text-slate-100 resize-none animate-pulse-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-gradient-to-r from-amber-500 to-[#FFBC11] hover:from-amber-600 hover:to-amber-500 text-slate-950 font-bold rounded-lg text-xs tracking-wider uppercase transition cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" /> Send Repair Request
                    </button>
                  </form>
                )}
              </div>

              {/* Information / Map mock */}
              <div className="md:col-span-2 space-y-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 font-sans text-xs">
                  <h5 className="font-semibold text-white uppercase text-xs border-b border-slate-800 pb-1 text-center">Wefixx Motors Center</h5>
                  
                  <div className="flex gap-2 items-start">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-300">Main Motors Hub</p>
                      <p className="text-slate-400">104 Service Parkway, Section B</p>
                      <p className="text-slate-400">Detroit, MI 48201</p>
                    </div>
                  </div>

                  <div className="flex gap-2 items-start border-t border-slate-800/40 pt-2">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-300">Hotlines (Active 8am-6pm)</p>
                      <p className="text-slate-400">Booking Help: 1-800-555-WFXS</p>
                      <p className="text-slate-400">Towing Desk: (555) 304-WFXS</p>
                    </div>
                  </div>

                  <div className="flex gap-2 items-start border-t border-slate-800/40 pt-2">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-300">Working shifts</p>
                      <p className="text-slate-400">Mon - Sat: 08:00 AM - 06:00 PM</p>
                      <p className="text-slate-400 text-amber-500">Sunday: Closed (On-call emergency tow only)</p>
                    </div>
                  </div>
                </div>

                {/* Map Mockup */}
                <div className="h-32 rounded-xl bg-slate-950 border border-slate-800 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="absolute top-1/2 left-1/3 bg-slate-800 h-1.5 w-1/2 rounded -rotate-12" />
                  <div className="absolute top-1/4 left-1/2 bg-slate-800 h-1/2 w-1.5 rounded" />
                  <div className="absolute top-1/3 left-1/4 bg-slate-800 h-1/2 w-1.5 rounded" />
                  
                  <div className="z-10 text-center">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500 animate-ping absolute top-[40%] left-[58%]" />
                    <MapPin className="w-5 h-5 text-red-500 mx-auto drop-shadow-md relative top-0" />
                    <p className="text-[10px] font-mono text-slate-400 font-semibold mt-1">MAIN MOTORS CAMPUS</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CUSTOMER LOGIN & ACTIVE BOOKINGS */}
          {activeTab === 'login' && (
            <div className="space-y-6">
              {!loggedIn ? (
                // Combined Login & Register Portal
                <div className="max-w-md mx-auto py-6 px-4 space-y-6">
                  {/* Tab Selector */}
                  <div className="flex border border-slate-800 p-1 bg-slate-950/65 rounded-xl">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setLoginError('');
                      }}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        authMode === 'login'
                          ? 'bg-[#FFBC11] text-slate-950 shadow-md font-extrabold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900/30'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('register');
                        setLoginError('');
                      }}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        authMode === 'register'
                          ? 'bg-[#FFBC11] text-slate-950 shadow-md font-extrabold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900/30'
                      }`}
                    >
                      Create Account
                    </button>
                  </div>

                  {/* Portal Header */}
                  <div className="text-center space-y-1.5">
                    <h4 className="font-display font-extrabold text-[#FFBC11] text-base select-none tracking-wide">
                      {authMode === 'login' ? 'CUSTOMER SERVICE PORTAL' : 'REGISTER VEHICLE OWNER'}
                    </h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                      {authMode === 'login'
                        ? 'Check diagnosis logs, active schedules, or cancel scheduled operations.'
                        : 'Register contact details to safely bind digital repair operations.'}
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleLoginSubmit} className="space-y-4 font-sans text-left">
                    {authMode === 'register' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-1"
                      >
                        <label className="block text-[11px] text-slate-450 font-mono font-medium">Your Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Arthur Dent"
                          value={loginName}
                          onChange={(e) => setLoginName(e.target.value)}
                          className="w-full bg-[#141f32] border border-slate-800 rounded-lg py-2 px-3.5 text-sm focus:outline-none focus:border-amber-500 text-slate-100 placeholder:text-slate-600 transition"
                          required
                        />
                      </motion.div>
                    )}

                    <div className="space-y-1">
                      <label className="block text-[11px] text-slate-455 font-mono font-medium">Email Address *</label>
                      <input
                        type="email"
                        placeholder="e.g. 2002romiz@gmail.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full bg-[#141f32] border border-slate-800 rounded-lg py-2 px-3.5 text-sm focus:outline-none focus:border-amber-500 text-slate-100 placeholder:text-slate-600 transition"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="block text-[11px] text-slate-455 font-mono font-medium">Password *</label>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-[10px] text-amber-500/80 hover:text-amber-400 transition cursor-pointer"
                        >
                          {showPassword ? 'Hide Password' : 'Show Password'}
                        </button>
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full bg-[#141f32] border border-slate-800 rounded-lg py-2 px-3.5 text-sm focus:outline-none focus:border-amber-500 text-slate-100 placeholder:text-slate-600 transition"
                        required
                      />
                    </div>

                    {loginError && (
                      <p className="text-xs text-rose-400 font-semibold text-center py-1 bg-rose-950/20 rounded border border-rose-950/40">
                        ⚠️ {loginError}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#FFBC11] hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs tracking-wider uppercase transition cursor-pointer shadow-md shadow-amber-500/5 mb-2"
                    >
                      {authMode === 'login' ? 'Sign In and Verify' : 'Complete Registration'}
                    </button>
                  </form>

                  {/* Simulated OAuth Integrations */}
                  <div className="space-y-4 pt-4 border-t border-slate-800/60">
                    <div className="relative flex py-1 items-center justify-center">
                      <div className="flex-grow border-t border-slate-800/40"></div>
                      <span className="flex-shrink mx-4 text-[10px] text-slate-500 font-mono uppercase tracking-widest">or continue with</span>
                      <div className="flex-grow border-t border-slate-800/40"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        disabled={isSocialLoading !== null}
                        onClick={() => handleSocialLogin('google')}
                        className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold hover:text-white transition cursor-pointer disabled:opacity-50"
                      >
                        {isSocialLoading === 'google' ? (
                          <div className="w-4 h-4 border-2 border-[#FFBC11] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <svg className="w-3.5 h-3.5 text-rose-500 fill-current" viewBox="0 0 24 24">
                            <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.529-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.136 1 1.18 5.926 1.18 12s4.956 11 11.06 11c6.37 0 10.596-4.474 10.596-10.77 0-.725-.078-1.28-.172-1.945H12.24z"/>
                          </svg>
                        )}
                        <span>Google</span>
                      </button>

                      <button
                        type="button"
                        disabled={isSocialLoading !== null}
                        onClick={() => handleSocialLogin('github')}
                        className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold hover:text-white transition cursor-pointer disabled:opacity-50"
                      >
                        {isSocialLoading === 'github' ? (
                          <div className="w-4 h-4 border-2 border-[#FFBC11] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <svg className="w-3.5 h-3.5 text-slate-200 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                          </svg>
                        )}
                        <span>GitHub</span>
                      </button>
                    </div>

                    <p className="text-[10px] text-center text-slate-500">
                      * All registration credentials and accounts are securely validated and persisted locally.
                    </p>
                  </div>
                </div>
              ) : (
                // Logged In customer view
                <div className="space-y-6">
                  {/* Account overview banner */}
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500">Authorized Customer Account</p>
                      <p className="font-bold text-white text-base">{loginEmail}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setLoggedIn(false);
                        setUserBookings([]);
                        setLoginEmail('');
                      }}
                      className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-xs hover:text-white text-slate-400 transition"
                    >
                      Log Out
                    </button>
                  </div>

                  {/* Booking records list */}
                  <div className="space-y-3">
                    <h5 className="font-semibold text-white text-xs uppercase tracking-wider border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#FFBC11]" /> Active Repair Statements ({userBookings.length})
                    </h5>

                    {userBookings.length === 0 ? (
                      <div className="py-12 border border-dashed border-slate-800 rounded-xl text-center text-slate-500 space-y-2">
                        <HelpCircle className="w-10 h-10 mx-auto text-slate-600" />
                        <p className="font-semibold text-slate-400">No repair bookings found for this email</p>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto font-sans">
                          Go ahead and use the "Book Now" wizard in the header to create a mock appointment, then check back here.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userBookings.map(b => (
                          <div key={b.id} className="p-4 bg-[#0a101d] border border-slate-800 rounded-xl space-y-4">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-2.5 border-b border-slate-800">
                              <div>
                                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-amber-400 font-mono font-bold tracking-widest">{b.id}</span>
                                <span className="text-xs text-slate-400 ml-2">Booked on: {new Date(b.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                                  b.status === 'confirmed' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' :
                                  b.status === 'cancelled' ? 'bg-red-500/10 border border-red-500/30 text-red-400' : 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
                                }`}>
                                  {b.status.replace('_', ' ')}
                                </span>
                                {b.status === 'confirmed' && (
                                  <button
                                    onClick={() => handleCancelBooking(b.id)}
                                    className="text-[10px] border border-red-500/30 bg-red-500/5 hover:bg-red-500/15 text-red-400 px-2.5 py-0.5 rounded transition cursor-pointer"
                                  >
                                    Cancel Service
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs leading-normal font-sans">
                              <div>
                                <p className="text-slate-500">Vehicle Description:</p>
                                <p className="text-white font-semibold">{b.vehicleYear} {b.vehicleMake} {b.vehicleModel}</p>
                              </div>
                              <div>
                                <p className="text-slate-500">Scheduled Date & Slot:</p>
                                <p className="text-white font-semibold flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                                  {b.scheduledDate} ({b.scheduledTime})
                                </p>
                              </div>
                              <div>
                                <p className="text-slate-500">Authorized Bill Total:</p>
                                <p className="text-amber-400 font-bold font-mono text-sm">${b.totalPrice}</p>
                              </div>
                            </div>

                            <div className="bg-slate-950/40 p-2.5 rounded border border-slate-800/80">
                              <p className="text-[10px] text-slate-500 uppercase font-semibold">Scheduled Operations:</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {b.services.map(s => (
                                  <span key={s.id} className="text-xs bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md text-white font-medium">
                                    ⚙️ {s.name} (${s.price})
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
