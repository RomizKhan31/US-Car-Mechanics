import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, X, RotateCcw, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHAPTERS = [
  { id: 1, name: '01. Laser Inspection', startSec: 0, duration: 25 },
  { id: 2, name: '02. Engine Diagnostic Scan', startSec: 25, duration: 35 },
  { id: 3, name: '03. Fluid Flush & Care', startSec: 60, duration: 40 },
  { id: 4, name: '04. Final Road Test & QC', startSec: 100, duration: 50 },
];

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressSec, setProgressSec] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const totalDuration = 150; // 2 minutes 30 seconds

  // Video playback progress simulation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setProgressSec((prev) => {
          if (prev >= totalDuration) {
            return 0; // Loop video
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, isPlaying]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgressSec(Number(e.target.value));
  };

  const handleChapterClick = (startSec: number) => {
    setProgressSec(startSec);
    setIsPlaying(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Find active chapter based on progressSec
  const activeChapter = CHAPTERS.find(
    (ch) => progressSec >= ch.startSec && progressSec < ch.startSec + ch.duration
  ) || CHAPTERS[0];

  if (!isOpen) return null;

  return (
    <div id="video-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl z-10"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/90 text-white">
          <div>
            <h3 className="font-display font-semibold text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Wefixx Care Process Video Tour
            </h3>
            <p className="text-xs text-slate-400 font-sans">See how our technicians diagnose and care for your vehicle.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            id="video-modal-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Stage Screen container */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {/* Animated background to resemble clean modern shop footage */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 opacity-90" />
          
          {/* Visual representations of active chapter */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 z-10 pointer-events-none">
            {/* Top Badge showing current chapter */}
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 text-xs rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800 text-amber-400 font-mono">
                {activeChapter.name}
              </span>
              <span className="px-2.5 py-0.5 text-[10px] rounded-sm bg-red-600 text-white font-mono flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                DEMO LOOP
              </span>
            </div>

            {/* Simulated camera focus frame */}
            <div className="absolute inset-10 border border-white/5 rounded-lg flex items-center justify-center">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20" />

              {/* Dynamic technical graphs mimicking engine inspection computer */}
              <div className="hidden sm:flex flex-col gap-1.5 absolute left-4 text-[10px] text-slate-400 font-mono">
                <p>SYS_STATUS: OPTIMAL</p>
                <p>RPM: {(800 + Math.sin(progressSec) * 50).toFixed(0)} RPM</p>
                <p>FLOW: 4.8 L/m</p>
                <p>E_TEMP: 82°C</p>
              </div>

              <div className="hidden sm:flex flex-col gap-1 absolute right-4 text-[10px] text-slate-500 font-mono text-right">
                <p>CAM_01 // SEC_R</p>
                <div className="flex gap-0.5 mt-1 justify-end items-end h-5">
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1 bg-[#FFBC11]" 
                      style={{ 
                        height: isPlaying ? `${Math.abs(Math.sin((progressSec + i) * 1.5)) * 100}%` : '20%',
                        transition: 'height 0.2s ease-out'
                      }} 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Large Play icon Overlay when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-slate-950/40">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 rounded-full bg-[#FFBC11] hover:bg-[#eab308] text-slate-950 flex items-center justify-center shadow-lg transform hover:scale-105 transition"
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </button>
              </div>
            )}

            {/* Displaying visual indicators corresponding to simulated videos */}
            <div className="w-full flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-xl font-display font-bold text-white tracking-wide">
                  {progressSec < 25 && 'Super Precision Laser Frame Alignment'}
                  {progressSec >= 25 && progressSec < 60 && 'Advanced Computerized Check Engine Diagnostics'}
                  {progressSec >= 60 && progressSec < 100 && 'Premium Synthetic Fluids Extraction & Refresh'}
                  {progressSec >= 100 && 'Full Dynamometer Road Testing & Certification'}
                </p>
                <p className="text-xs text-slate-300 max-w-lg leading-relaxed font-sans">
                  {progressSec < 25 && 'We scan chassis geometries down to 0.1mm increments with laser-guided arrays to restore factory safety profiles.'}
                  {progressSec >= 25 && progressSec < 60 && 'Connecting direct vehicle diagnostic ports to central computing servers to inspect real-time cylinders health.'}
                  {progressSec >= 60 && progressSec < 100 && 'Using air-assisted pneumatic extractors to ensure complete sludge disposal without standard pan scraping.'}
                  {progressSec >= 100 && 'Simulating standard city drag and highway load cycles on our in-ground dyno to certify complete repair performance.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Control Bar */}
        <div className="p-4 bg-slate-950 flex flex-col gap-3 font-sans text-sm text-slate-300 border-t border-slate-800">
          {/* Progress Timeline Track */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono select-none">{formatTime(progressSec)}</span>
            <input
              type="range"
              min="0"
              max={totalDuration}
              value={progressSec}
              onChange={handleSeek}
              className="flex-1 accent-amber-500 bg-slate-800 h-1 rounded-lg cursor-pointer transition focus:outline-none"
            />
            <span className="text-xs font-mono select-none text-slate-500">{formatTime(totalDuration)}</span>
          </div>

          {/* Quick Buttons row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* play, volume, chapter click */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setProgressSec(0)}
                className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(Number(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-16 h-1 accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Quick-Jump to Chapters */}
            <div className="flex flex-wrap gap-1.5 items-center justify-center">
              {CHAPTERS.map((ch) => {
                const isActive = progressSec >= ch.startSec && progressSec < ch.startSec + ch.duration;
                return (
                  <button
                    key={ch.id}
                    onClick={() => handleChapterClick(ch.startSec)}
                    className={`px-2 py-1 text-[11px] rounded transition font-mono border ${
                      isActive
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    {ch.name.split('. ')[1]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Benefits banner */}
        <div className="p-3 bg-[#0a101b] border-t border-slate-800/80 flex justify-center gap-6 text-xs text-slate-400">
          <p className="flex items-center gap-1.5 text-[#FFBC11] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Certified Mechanics
          </p>
          <p className="flex items-center gap-1.5 text-slate-300">
            <AlertCircle className="w-3.5 h-3.5 text-blue-400" /> Free multi-point check with every visit
          </p>
        </div>
      </motion.div>
    </div>
  );
}
