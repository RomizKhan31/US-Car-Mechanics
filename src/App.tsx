/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  User, 
  ArrowRight, 
  Play, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  Settings, 
  Menu, 
  X, 
  CheckCircle,
  HelpCircle,
  PhoneCall,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import BookingModal from './components/BookingModal';
import VideoModal from './components/VideoModal';
import ContentPanel from './components/ContentPanel';
import AboutSection from './components/AboutSection';
import ServicesGrid from './components/ServicesGrid';
import HowItWorks from './components/HowItWorks';
import RecentWorks from './components/RecentWorks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

// Import our beautiful generated studio car hero images
import carHeroImage from './assets/images/silver_sedan_studio_1781896025427.jpg';
import suvHeroImage from './assets/images/premium_suv_studio_1781896683171.jpg';
import evHeroImage from './assets/images/electric_sports_car_studio_1781896699918.jpg';

// Defining slides for our gorgeous interactive auto-slider
const SLIDES = [
  {
    id: 0,
    badge: 'Premium Car Repair & Service',
    title: 'Car Repair',
    accentText: 'Care You Can Trust',
    desc: 'Certified ASE Master mechanics. Professional multi-point diagnostic checks. Get your vehicle back on the road safely and quickly.',
    image: carHeroImage,
    alt: 'Premium Silver Sedan on Dark Studio Refined Concrete',
    initialServiceId: null
  },
  {
    id: 1,
    badge: 'Advanced Vehicle Diagnostics',
    title: 'Precision Scans',
    accentText: 'Live Sensor Analytics',
    desc: 'No guesswork. Our advanced vehicle inspection systems connect to live diagnostic ports to identify sensor errors with manufacturer grade accuracy.',
    image: suvHeroImage,
    alt: 'Luxury Blue SUV in sleek computerized diagnostic studio environment',
    initialServiceId: 'diagnostics'
  },
  {
    id: 2,
    badge: 'High-Voltage Hybrid & EV Ready',
    title: 'Eco-Engine',
    accentText: 'Future EV Tuning',
    desc: 'Certified EV drive motor software updates, high-voltage battery insulation safety assessments, and premium spark plug engine service.',
    image: evHeroImage,
    alt: 'Futuristic glossy electric sports car in neon highlighted studio environment',
    initialServiceId: 'spark-plugs'
  }
];

export default function App() {
  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedInitialService, setSelectedInitialService] = useState<string | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Auto-sliding Hero state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliderHovered, setIsSliderHovered] = useState(false);

  // Auto-slide effect (cycles every 6 seconds)
  React.useEffect(() => {
    if (activeTab || isSliderHovered) return; // Pause slider when in active category overlay or hovered
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeTab, isSliderHovered]);

  // Intersection Observer to highlight current active section
  React.useEffect(() => {
    if (activeTab !== null) return; // Ignore scroll tracking when on static modal tab overlay
    const sections = ['about-us', 'services-grid', 'recent-works', 'faq-section', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const handleIntersection = (entries: any[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection('home');
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab]);

  // Trigger Booking wizard prefilled with a service
  const handleBookService = (serviceId: string) => {
    setSelectedInitialService(serviceId);
    setIsBookingOpen(true);
  };

  // Trigger empty Booking
  const handleBookNowClick = () => {
    setSelectedInitialService(null);
    setIsBookingOpen(true);
  };

  const handleNavClick = (tabId: string) => {
    if (tabId === 'login') {
      setActiveTab('login');
      setMobileMenuOpen(false);
      return;
    }

    setActiveTab(null);
    setMobileMenuOpen(false);
    setActiveSection(tabId);

    setTimeout(() => {
      const element = document.getElementById(tabId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleHomeClick = () => {
    setActiveTab(null);
    setMobileMenuOpen(false);
    setActiveSection('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#060c18] bg-gradient-to-b from-[#0b1424] via-[#060c18] to-[#040810] text-slate-100 font-sans flex flex-col justify-between overflow-x-hidden relative selection:bg-[#FFBC11] selection:text-slate-900">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      {/* --- HEADER (NAV BAR) --- */}
      <header className="relative z-30 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center bg-[#0B1528]/10 backdrop-blur-sm sm:bg-transparent">
        {/* LOGO */}
        <div 
          onClick={handleHomeClick}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
          id="header-logo"
        >
          <div className="w-9 h-9 rounded-full bg-[#FFBC11] flex items-center justify-center text-slate-950 group-hover:rotate-45 transition duration-300 shadow-md shadow-amber-500/10">
            <Wrench className="w-5 h-5" />
          </div>
          <span className="font-display font-extrabold text-2xl tracking-wider text-white select-none">
            wefixx
          </span>
        </div>

        {/* DESKTOP NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          {[
            { id: 'home', name: 'Home', isHome: true },
            { id: 'about-us', name: 'About Us' },
            { id: 'services-grid', name: 'Services' },
            { id: 'recent-works', name: 'Our Work' },
            { id: 'faq-section', name: 'FAQ' },
            { id: 'contact', name: 'Contact' }
          ].map(link => {
            const isActive = activeTab === null && (link.isHome ? activeSection === 'home' : activeSection === link.id);
            return (
              <button
                key={link.id}
                onClick={() => link.isHome ? handleHomeClick() : handleNavClick(link.id)}
                className={`relative py-1 hover:text-[#FFBC11] transition duration-200 cursor-pointer ${
                  isActive ? 'text-[#FFBC11] font-semibold' : 'text-slate-350 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="activeNavLine"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#FFBC11] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* HEADER ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => handleNavClick('login')}
            className={`px-4 py-2 rounded-full border text-xs font-semibold hover:border-[#FFBC11] hover:bg-amber-500/5 hover:text-white transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'login' ? 'border-[#FFBC11] text-[#FFBC11] bg-amber-500/5' : 'border-slate-800 text-slate-300'
            }`}
            id="portal-login-button"
          >
            <User className="w-3.5 h-3.5" />
            <span>Log In</span>
          </button>

          <button
            onClick={handleBookNowClick}
            className="px-5 py-2.5 rounded-full bg-[#FFBC11] hover:bg-[#eab308] text-slate-950 text-xs font-extrabold uppercase tracking-wider transition duration-250 cursor-pointer shadow-lg shadow-amber-500/10 active:scale-95"
            id="header-book-now"
          >
            Book Now
          </button>
        </div>

        {/* MOBILE MENU TOGGLER */}
        <div className="md:hidden flex items-center gap-3">
          <button 
            onClick={() => handleNavClick('login')}
            className="p-1.5 rounded-lg border border-slate-800/80 bg-slate-900/60 text-slate-300"
          >
            <User className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border border-slate-800/80 bg-slate-900/60 text-slate-300"
            id="mobile-menu-toggler"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden relative z-20 border-b border-slate-800/80 bg-[#0a111f] shadow-inner"
          >
            <div className="px-4 py-3 space-y-2">
              {[
                { id: 'home', name: 'Home', isHome: true },
                { id: 'about-us', name: 'About Us' },
                { id: 'services-grid', name: 'Services' },
                { id: 'recent-works', name: 'Our Work' },
                { id: 'faq-section', name: 'FAQ' },
                { id: 'contact', name: 'Contact' }
              ].map(link => {
                const isActive = activeTab === null && (link.isHome ? activeSection === 'home' : activeSection === link.id);
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      if (link.isHome) {
                        handleHomeClick();
                      } else {
                        handleNavClick(link.id);
                      }
                    }}
                    className={`block w-full text-left py-2 px-3 rounded-lg text-sm transition ${
                      isActive ? 'bg-[#FFBC11]/10 text-[#FFBC11] font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}

              <div className="border-t border-slate-800/60 pt-3 flex gap-2">
                <button
                  onClick={handleBookNowClick}
                  className="flex-1 py-2.5 rounded-lg bg-[#FFBC11] hover:bg-[#eab308] text-slate-950 text-xs font-bold text-center"
                >
                  Book Instant Service
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* --- CONTENT WORKSPACE (HERO SECTION / ACTION PANELS) --- */}
      <main className="flex-1 flex flex-col justify-center relative">
        <AnimatePresence mode="wait">
          {activeTab ? (
            // Custom Navigation Content Overlay Panel
            <div className="w-full flex justify-center items-center py-6 min-h-[60vh]">
              <ContentPanel 
                activeTab={activeTab} 
                onClose={() => setActiveTab(null)} 
                onBookService={handleBookService}
              />
            </div>
          ) : (
            <>
              {/* --- MAIN HERO LAYOUT WITH PREMIUM INTUITIVE AUTO-SLIDER --- */}
              <div 
                onMouseEnter={() => setIsSliderHovered(true)}
                onMouseLeave={() => setIsSliderHovered(false)}
                className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex flex-col justify-center flex-1 relative min-h-[60vh]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.98, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -15 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full"
                  >
                    {/* LEFT SIDE: INFORMATIVE BADGE & POWERFUL HEADING & ACTIONS */}
                    <div className="lg:col-span-5 space-y-6 md:space-y-8 z-10 text-center lg:text-left">
                      {/* Premium Service badge */}
                      <div className="inline-flex items-center px-4 py-1 rounded-full border border-amber-500/40 bg-amber-500/5 text-xs text-[#FFBC11] font-semibold tracking-wider uppercase select-none mx-auto lg:mx-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFBC11] mr-2 animate-ping" />
                        {SLIDES[currentSlide].badge}
                      </div>

                      {/* Main Headline */}
                      <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05] drop-shadow-md">
                        {SLIDES[currentSlide].title}
                        <span className="block mt-1 text-[#FFBC11]">
                          {SLIDES[currentSlide].accentText}
                        </span>
                      </h1>

                      {/* Subtitle Details */}
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans max-w-lg mx-auto lg:mx-0 min-h-[72px]">
                        {SLIDES[currentSlide].desc}
                      </p>

                      {/* Action Row */}
                      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        {/* Book your service gold button */}
                        <button
                          onClick={() => {
                            if (SLIDES[currentSlide].initialServiceId) {
                              handleBookService(SLIDES[currentSlide].initialServiceId!);
                            } else {
                              handleBookNowClick();
                            }
                          }}
                          className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#FFBC11] hover:bg-[#eab308] text-slate-950 font-extrabold uppercase text-xs tracking-wider transition-all duration-250 cursor-pointer flex items-center justify-center gap-2 group shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-95"
                          id="hero-book-now-main"
                        >
                          <span>Book Your Service</span>
                          <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1.5 transition-transform duration-250" />
                        </button>

                        {/* Watch Video outlined button */}
                        <button
                          onClick={() => setIsVideoOpen(true)}
                          className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-slate-700/80 hover:border-amber-400 bg-slate-950/20 hover:bg-amber-400/5 text-slate-300 hover:text-white font-extrabold uppercase text-xs tracking-wider transition-all duration-250 cursor-pointer flex items-center justify-center gap-2"
                          id="hero-watch-video"
                        >
                          <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#FFBC11]">
                            <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                          </div>
                          <span>Watch Video</span>
                        </button>
                      </div>
                    </div>

                    {/* RIGHT SIDE: CAR HERO HEROIC PHOTO DISPLAY */}
                    <div className="lg:col-span-7 flex flex-col justify-center relative select-none pr-0 lg:pr-4">
                      {/* Studio floor reflection and warm illumination overlays */}
                      <div className="absolute inset-0 bg-radial-gradient from-blue-500/5 to-transparent blur-3xl pointer-events-none" />

                      <div className="relative max-w-2xl lg:max-w-none mx-auto w-full group overflow-hidden">
                        {/* Outer lighting flare glow */}
                        <div className="absolute top-[35%] left-[45%] w-[120px] h-[120px] rounded-full bg-blue-300/15 blur-2xl animate-pulse pointer-events-none" />

                        <img
                          src={SLIDES[currentSlide].image}
                          alt={SLIDES[currentSlide].alt}
                          referrerPolicy="no-referrer"
                          className="w-full h-auto object-contain filter drop-shadow-[0_20px_45px_rgba(59,130,246,0.15)] transition-all duration-700 hover:scale-[1.02]"
                          style={{
                            maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)',
                            WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)'
                          }}
                        />

                        {/* Ground floor shadow and grid outline to enrich visual studio authenticity */}
                        <div className="absolute bottom-[8%] left-[10%] right-[10%] h-[15px] bg-black/60 rounded-full filter blur-[10px]" />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* PREMIUM SLIDER NAVIGATION CONTROLS (Arrows with Custom Track/Page Indicators) */}
                <div className="flex items-center gap-3.5 mt-8 lg:mt-12 z-20 relative justify-center lg:justify-start">
                  {/* Previous Arrow Button */}
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
                    className="w-11 h-11 rounded-full border border-slate-800/85 hover:border-amber-400 bg-[#09111e]/80 hover:bg-[#FFBC11]/10 text-slate-300 hover:text-[#FFBC11] flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90 shadow-lg shadow-black/40 group overflow-hidden"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" />
                  </button>

                  {/* Elegant Slide Pagination Track */}
                  <div className="flex items-center gap-1.5 px-1">
                    {SLIDES.map((slide, index) => (
                      <button
                        key={slide.id}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          currentSlide === index ? 'w-6 bg-[#FFBC11]' : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Next Arrow Button */}
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
                    className="w-11 h-11 rounded-full border border-slate-800/85 hover:border-amber-400 bg-[#09111e]/80 hover:bg-[#FFBC11]/10 text-slate-300 hover:text-[#FFBC11] flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90 shadow-lg shadow-black/40 group overflow-hidden"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </button>
                </div>

                {/* TRUSTY BADGES (Glossy, Premium Bento-Style Cards) */}
                <div className="mt-16 pt-2 z-15 relative">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    
                    {/* Metric 1 - Certified */}
                    <div className="group relative bg-[#0b1424]/45 hover:bg-[#0f1b31]/55 border border-slate-800/80 hover:border-amber-500/30 rounded-2xl p-4.5 transition-all duration-300 hover:scale-[1.03] shadow-lg hover:shadow-amber-500/5 flex items-center gap-4.5 overflow-hidden">
                      {/* Golden background aura */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] to-transparent pointer-events-none" />
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#FFBC11] shrink-0 shadow-md group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div className="text-left font-sans">
                        <p className="font-display font-black text-white text-xs tracking-wider uppercase leading-tight group-hover:text-[#FFBC11] transition duration-200">Certified</p>
                        <p className="text-[11px] text-slate-400 mt-1 font-medium whitespace-nowrap">ASE Master Techs</p>
                      </div>
                    </div>

                    {/* Metric 2 - Quick Fix */}
                    <div className="group relative bg-[#0b1424]/45 hover:bg-[#0f1b31]/55 border border-slate-800/80 hover:border-amber-500/30 rounded-2xl p-4.5 transition-all duration-300 hover:scale-[1.03] shadow-lg hover:shadow-amber-500/5 flex items-center gap-4.5 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] to-transparent pointer-events-none" />
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#FFBC11] shrink-0 shadow-md group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div className="text-left font-sans">
                        <p className="font-display font-black text-white text-xs tracking-wider uppercase leading-tight group-hover:text-[#FFBC11] transition duration-200">Quick Service</p>
                        <p className="text-[11px] text-slate-400 mt-1 font-medium whitespace-nowrap">30-Min Rapid Scans</p>
                      </div>
                    </div>

                    {/* Metric 3 - Fair Rate */}
                    <div className="group relative bg-[#0b1424]/45 hover:bg-[#0f1b31]/55 border border-slate-800/80 hover:border-amber-500/30 rounded-2xl p-4.5 transition-all duration-300 hover:scale-[1.03] shadow-lg hover:shadow-amber-500/5 flex items-center gap-4.5 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] to-transparent pointer-events-none" />
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#FFBC11] shrink-0 shadow-md group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300">
                        <span className="font-extrabold text-[#FFBC11] font-mono text-lg">$</span>
                      </div>
                      <div className="text-left font-sans">
                        <p className="font-display font-black text-white text-xs tracking-wider uppercase leading-tight group-hover:text-[#FFBC11] transition duration-200">Fair Pricing</p>
                        <p className="text-[11px] text-slate-400 mt-1 font-medium whitespace-nowrap">Upfront Itemized Invoices</p>
                      </div>
                    </div>

                    {/* Metric 4 - Quality Parts */}
                    <div className="group relative bg-[#0b1424]/45 hover:bg-[#0f1b31]/55 border border-slate-800/80 hover:border-amber-500/30 rounded-2xl p-4.5 transition-all duration-300 hover:scale-[1.03] shadow-lg hover:shadow-amber-500/5 flex items-center gap-4.5 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] to-transparent pointer-events-none" />
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#FFBC11] shrink-0 shadow-md group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300">
                        <Settings className="w-6 h-6 animate-spin-slow text-[#FFBC11]" />
                      </div>
                      <div className="text-left font-sans">
                        <p className="font-display font-black text-white text-xs tracking-wider uppercase leading-tight group-hover:text-[#FFBC11] transition duration-200">OEM Parts</p>
                        <p className="text-[11px] text-slate-400 mt-1 font-medium whitespace-nowrap">Genuine Vehicle Spares</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* --- BRAND ABOUT US SECTIONS --- */}
              <AboutSection onBookService={handleBookService} />

              {/* --- 6 SERVICES 3x2 GRID (Real, functional, semantic) --- */}
              <ServicesGrid onBookService={handleBookService} />

              {/* --- HOW IT WORKS PRECISION TIMELINE TRACE --- */}
              <HowItWorks />

              {/* --- GALLERY OF RECENT WORKS (Interactive Premium Tabs) --- */}
              <RecentWorks onBookService={handleBookService} />

              {/* --- VERIFIED CLIENT TESTIMONIALS (Draggable Auto-Slide) --- */}
              <Testimonials onBookService={handleBookService} />

              {/* --- INTERACTIVE FAQ ACCORDION SECTION --- */}
              <FAQ />

              {/* --- PREMIUM DYNAMIC CONTACT SECTION --- */}
              <ContactSection />
            </>
          )}
        </AnimatePresence>
      </main>


      {/* --- DEDICATED PROFESSIONAL SYSTEM FOOTER --- */}
      <Footer />


      {/* --- ALL PREMIUM INTERACTIVE MODALS --- */}
      
      {/* 1. Schedule Booking Wizard Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <BookingModal 
            isOpen={isBookingOpen} 
            onClose={() => setIsBookingOpen(false)} 
            initialServiceId={selectedInitialService}
          />
        )}
      </AnimatePresence>

      {/* 2. Care Process Video Tour Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <VideoModal 
            isOpen={isVideoOpen} 
            onClose={() => setIsVideoOpen(false)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}

