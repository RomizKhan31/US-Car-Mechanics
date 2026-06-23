import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Calendar, Clock, User, Phone, Mail, Car, CheckCircle2, Wrench, Shield, FileText } from 'lucide-react';
import { Service, Booking } from '../types';
import { SERVICES, CAR_MAKES, TIME_SLOTS } from '../data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string | null;
}

export default function BookingModal({ isOpen, onClose, initialServiceId }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [vehicleYear, setVehicleYear] = useState('2022');
  const [vehicleMake, setVehicleMake] = useState('Toyota');
  const [vehicleModel, setVehicleModel] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Set initial service if passed from outside
  useEffect(() => {
    if (initialServiceId && isOpen) {
      const found = SERVICES.find(s => s.id === initialServiceId);
      if (found) {
        setSelectedServices([found]);
      }
    }
  }, [initialServiceId, isOpen]);

  // Handle service selection toggle
  const toggleService = (service: Service) => {
    if (selectedServices.some(s => s.id === service.id)) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const getSubtotal = () => selectedServices.reduce((sum, s) => sum + s.price, 0);
  const getTax = () => Math.round(getSubtotal() * 0.08); // 8% tax
  const getTotalPrice = () => getSubtotal() + getTax();

  const handleNext = () => {
    if (step === 1) {
      if (selectedServices.length === 0) {
        alert('Please select at least one service to proceed.');
        return;
      }
      if (!vehicleModel.trim()) {
        alert('Please specify your vehicle model.');
        return;
      }
    } else if (step === 2) {
      if (!customerName.trim() || !email.trim() || !phone.trim()) {
        alert('Please fill out all required contact details.');
        return;
      }
    } else if (step === 3) {
      if (!scheduledDate || !scheduledTime) {
        alert('Please select a date and time slot.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleConfirmBooking = () => {
    const bookingId = `WFX-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      id: bookingId,
      customerName,
      email,
      phone,
      vehicleYear,
      vehicleMake,
      vehicleModel,
      services: selectedServices,
      scheduledDate,
      scheduledTime,
      status: 'confirmed',
      totalPrice: getTotalPrice(),
      notes,
      createdAt: new Date().toISOString()
    };

    // Save to local storage
    const existing = localStorage.getItem('wefixx_bookings');
    const bookingsList = existing ? JSON.parse(existing) : [];
    bookingsList.push(newBooking);
    localStorage.setItem('wefixx_bookings', JSON.stringify(bookingsList));

    // Update state to trigger confirmation screen
    setConfirmedBooking(newBooking);
  };

  const handleExit = () => {
    // Reset wizard
    setStep(1);
    setSelectedServices([]);
    setVehicleYear('2022');
    setVehicleMake('Toyota');
    setVehicleModel('');
    setCustomerName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setScheduledDate('');
    setScheduledTime('');
    setConfirmedBooking(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={handleExit}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-[#0e1726] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 text-slate-100 max-h-[90vh]"
      >
        {/* Progress sidebar - Hidden on mobile */}
        <div className="hidden md:flex flex-col justify-between w-64 bg-[#0a101c] p-6 border-r border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-full bg-[#FFBC11] flex items-center justify-center text-slate-950 font-bold">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg tracking-wider">wefixx</span>
            </div>

            <nav className="space-y-6">
              {[
                { s: 1, title: 'Vehicle & Service', desc: 'Select model & issues' },
                { s: 2, title: 'Contact Info', desc: 'Your details' },
                { s: 3, title: 'Date & Time', desc: 'Schedule appointment' },
                { s: 4, title: 'Review & Confirm', desc: 'Verify and submit' }
              ].map(item => (
                <div key={item.s} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-semibold text-xs transition ${
                    confirmedBooking 
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : step === item.s
                      ? 'bg-[#FFBC11] border-[#FFBC11] text-slate-900 shadow-md'
                      : step > item.s
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                      : 'border-slate-800 text-slate-500'
                  }`}>
                    {step > item.s || confirmedBooking ? '✓' : item.s}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${step === item.s ? 'text-[#FFBC11]' : 'text-slate-300'}`}>{item.title}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </nav>
          </div>

          <div className="text-xs text-slate-500 pt-6 border-t border-slate-800/40">
            <p>Need immediate support?</p>
            <p className="text-[#FFBC11] font-semibold mt-1">1-800-555-WFXS</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Header */}
          <div className="p-4 md:p-6 border-b border-slate-800 flex justify-between items-center bg-[#0d1624]">
            <div>
              <h3 className="font-display font-semibold text-lg text-white">
                {confirmedBooking ? 'Appointment Confirmed!' : `Book Your Service - Step ${step} of 4`}
              </h3>
              <p className="text-xs text-slate-400">
                {!confirmedBooking && (
                  step === 1 ? 'Configure your vehicle details and select required repairs' :
                  step === 2 ? 'Provide customer contact details for work updates' :
                  step === 3 ? 'Select an appointment timing from available slots' :
                  'Check details matches before submitting request'
                )}
              </p>
            </div>
            <button 
              onClick={handleExit} 
              className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition"
              id="booking-modal-close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form screen panel */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-[#0c1421] min-h-[40vh]">
            <AnimatePresence mode="wait">
              {confirmedBooking ? (
                // Success Screen
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-6 text-center"
                  key="success"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-display font-bold text-2xl text-white mb-2">We Are Booked!</h4>
                  <p className="text-slate-300 text-sm max-w-md mb-6 leading-relaxed">
                    Hello <span className="text-white font-semibold">{confirmedBooking.customerName}</span>, your vehicle diagnostic or service scheduling is authorized successfully.
                  </p>

                  <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-left space-y-3 font-sans text-sm mb-6">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Booking ID:</span>
                      <span className="text-amber-400 font-mono font-bold tracking-wider">{confirmedBooking.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Vehicle:</span>
                      <span className="text-white font-semibold">
                        {confirmedBooking.vehicleYear} {confirmedBooking.vehicleMake} {confirmedBooking.vehicleModel}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Appointment:</span>
                      <span className="text-white font-semibold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {confirmedBooking.scheduledDate} @ {confirmedBooking.scheduledTime}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-slate-800 pt-2 font-semibold">
                      <span className="text-slate-400">Total Price (incl. tax):</span>
                      <span className="text-[#FFBC11]">${confirmedBooking.totalPrice}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 max-w-sm mb-6">
                    A text notification and appointment email confirmation has been dispatched to {confirmedBooking.email}. Our team will review and alert you if additional parts lead-time is necessary.
                  </p>

                  <button
                    onClick={handleExit}
                    className="px-6 py-2.5 rounded-lg bg-[#FFBC11] hover:bg-[#eab308] text-slate-950 font-semibold transition shadow-md shadow-amber-500/10 text-sm"
                  >
                    Return to Homepage
                  </button>
                </motion.div>
              ) : step === 1 ? (
                // Step 1: Vehicle & Service Select
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                  key="step1"
                >
                  {/* Vehicle selectors */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-1.5">
                      <Car className="w-4 h-4 text-[#FFBC11]" /> Vehicle Information
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Year</label>
                        <select 
                          value={vehicleYear}
                          onChange={(e) => setVehicleYear(e.target.value)}
                          className="w-full bg-[#141f32] border border-slate-800 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-amber-500 text-slate-200"
                        >
                          {['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012'].map(y => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Make</label>
                        <select 
                          value={vehicleMake}
                          onChange={(e) => setVehicleMake(e.target.value)}
                          className="w-full bg-[#141f32] border border-slate-800 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-amber-500 text-slate-200"
                        >
                          {CAR_MAKES.map(m => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Model (e.g. Camry)</label>
                        <input 
                          type="text" 
                          placeholder="Camry, Civic..."
                          value={vehicleModel}
                          onChange={(e) => setVehicleModel(e.target.value)}
                          className="w-full bg-[#141f32] border border-slate-800 rounded-lg py-1.5 px-3 text-sm focus:outline-none focus:border-amber-500 text-slate-100 placeholder:text-slate-600"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Services Multi-selector */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-1.5">
                      <Wrench className="w-4 h-4 text-[#FFBC11]" /> Select Repairs or Maintenance
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1">
                      {SERVICES.map(service => {
                        const isSelected = selectedServices.some(s => s.id === service.id);
                        return (
                          <div 
                            key={service.id}
                            onClick={() => toggleService(service)}
                            className={`p-3 rounded-xl border transition cursor-pointer flex justify-between items-start ${
                              isSelected 
                                ? 'bg-amber-500/10 border-amber-400 text-white shadow-sm'
                                : 'bg-[#121c2d] border-slate-800/80 hover:bg-[#15233a] hover:border-slate-700 text-slate-300'
                            }`}
                          >
                            <div className="pr-2 flex-1">
                              <p className="text-sm font-medium font-sans flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${
                                  service.category === 'maintenance' ? 'bg-emerald-400' :
                                  service.category === 'diagnostics' ? 'bg-blue-400' : 'bg-red-400'
                                }`} />
                                {service.name}
                              </p>
                              <p className="text-xs text-slate-400 mt-1 line-clamp-1">{service.description}</p>
                              <p className="text-[10px] text-slate-500 mt-1 font-mono">Est: {service.estimatedTime}</p>
                            </div>
                            <p className="text-sm font-bold text-amber-400 shrink-0 font-mono">${service.price}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ) : step === 2 ? (
                // Step 2: Contact Info
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                  key="step2"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-amber-400" /> Full Name *
                      </label>
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-[#141f32] border border-slate-800 rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-amber-500 text-slate-100 placeholder:text-slate-600 shadow-inner"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-amber-400" /> Phone Number *
                      </label>
                      <input 
                        type="tel" 
                        placeholder="(555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#141f32] border border-slate-800 rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-amber-500 text-slate-100 placeholder:text-slate-600 shadow-inner"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-amber-400" /> Email Address *
                    </label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#141f32] border border-slate-800 rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-amber-500 text-slate-100 placeholder:text-slate-600 shadow-inner"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-1 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-400" /> Special Requests or Symptoms (Optional)
                    </label>
                    <textarea 
                      rows={3}
                      placeholder="Please share any noises, symptoms, or custom details (e.g. 'I hear grinding from front passenger wheel when braking')"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#141f32] border border-slate-800 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-amber-500 text-slate-100 placeholder:text-slate-600 resize-none"
                    />
                  </div>
                </motion.div>
              ) : step === 3 ? (
                // Step 3: Date & Calendar Picker
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  key="step3"
                >
                  <div>
                    <label className="block text-sm text-slate-400 mb-2 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-amber-400" /> Choose Date *
                    </label>
                    <input 
                      type="date" 
                      min={new Date().toISOString().split('T')[0]}
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full bg-[#141f32] border border-slate-800 rounded-lg py-2.5 px-3.5 text-sm focus:outline-none focus:border-amber-500 text-slate-100"
                      required
                    />
                    <div className="mt-4 bg-[#0a101c]/60 border border-slate-800/65 rounded-lg p-3 text-xs text-slate-400 space-y-1.5">
                      <p className="font-semibold text-slate-300">Shop Working Hours:</p>
                      <p>• Mon - Sat: 8:00 AM - 6:00 PM</p>
                      <p>• Sunday: Closed for family</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-400" /> Select Time Slot *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map(slot => {
                        const isSelected = scheduledTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setScheduledTime(slot)}
                            className={`py-2 px-1 text-xs rounded-lg border font-mono tracking-tight transition ${
                              isSelected 
                                ? 'bg-[#FFBC11] border-[#FFBC11] text-slate-950 font-bold'
                                : 'bg-[#141f32] border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ) : (
                // Step 4: Summary & Review
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                  key="step4"
                >
                  <div className="bg-[#121c2c] border border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="text-[#FFBC11] font-semibold text-xs uppercase tracking-wider mb-2">Customer & Vehicle</h5>
                      <p className="text-slate-300 text-sm"><span className="text-slate-500">Owner:</span> {customerName}</p>
                      <p className="text-slate-300 text-sm"><span className="text-slate-500">Contact:</span> {phone} | {email}</p>
                      <p className="text-slate-300 text-sm">
                        <span className="text-slate-500">Vehicle:</span> {vehicleYear} {vehicleMake} {vehicleModel}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-[#FFBC11] font-semibold text-xs uppercase tracking-wider mb-2">Appointment Schedule</h5>
                      <p className="text-slate-300 text-sm leading-6 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        Date: <span className="text-white font-medium">{scheduledDate}</span>
                      </p>
                      <p className="text-slate-300 text-sm leading-6 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-slate-500" />
                        Time Slot: <span className="text-white font-medium">{scheduledTime}</span>
                      </p>
                    </div>
                  </div>

                  {notes && (
                    <div className="bg-[#121c2c]/50 border border-slate-800/80 rounded-xl p-3.5">
                      <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Symptoms reported:</p>
                      <p className="text-slate-300 text-sm italic">"{notes}"</p>
                    </div>
                  )}

                  <div className="space-y-2 border border-slate-800/80 rounded-xl overflow-hidden">
                    <div className="bg-[#121c2d] p-3 border-b border-slate-800">
                      <h5 className="text-white font-semibold text-xs">Selected Services Breakdown</h5>
                    </div>
                    <div className="p-3 bg-[#0a101b] space-y-2">
                      {selectedServices.map(s => (
                        <div key={s.id} className="flex justify-between text-sm">
                          <span className="text-slate-300">{s.name}</span>
                          <span className="text-amber-300 font-mono">${s.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pricing Summary & Buttons footer - Only displays if not confirmed */}
          {!confirmedBooking && (
            <div className="p-4 md:p-6 border-t border-slate-800 bg-[#0a101c] flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Live Cost calculation */}
              <div className="text-center sm:text-left">
                <p className="text-xs text-slate-500">Live Estimated Price:</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-white font-mono">
                    ${selectedServices.length > 0 ? getTotalPrice() : '0'}
                  </span>
                  <span className="text-xs text-slate-400">
                    (${getSubtotal()} subtotal + ${getTax()} tax & shop disposal fees)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                {step > 1 && (
                  <button
                    onClick={handleBack}
                    className="px-4 py-2 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 text-sm font-medium transition flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                )}

                {step < 4 ? (
                  <button
                    onClick={handleNext}
                    className="px-5 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-[#FFBC11] border border-amber-500/40 text-sm font-semibold transition flex items-center gap-1 cursor-pointer"
                  >
                    Next Step <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleConfirmBooking}
                    className="px-6 py-2 rounded-lg bg-[#FFBC11] hover:bg-[#eab308] text-slate-950 text-sm font-bold transition shadow-lg shadow-amber-500/10 flex items-center gap-1.5 cursor-pointer"
                    id="submit-booking-action"
                  >
                    <Shield className="w-4 h-4" /> Confirm & Book Appointment
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
