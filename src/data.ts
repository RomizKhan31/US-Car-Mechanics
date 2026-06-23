import { Service, Article } from './types';

export const SERVICES: Service[] = [
  {
    id: 'oil-change',
    name: 'Synthetic Oil & Filter Service',
    category: 'maintenance',
    price: 89,
    estimatedTime: '30-45 Mins',
    description: 'Full synthetic oil change up to 5 quarts, replace oil filter with OEM quality, check and top off vital fluids, and perform a multi-point inspection.',
    benefits: ['Extends engine life', 'Improves fuel efficiency', 'Maintains manufacturer warranty']
  },
  {
    id: 'diagnostics',
    name: 'Advanced Engine Diagnostics',
    category: 'diagnostics',
    price: 120,
    estimatedTime: '1 Hour',
    description: 'Solve check-engine light issues with our advanced OBD-II scanning equipment, live sensor data analysis, electrical circuit testing, and certified technician report.',
    benefits: ['Pinpoint exact issues quickly', 'Prevent major engine damage', 'Clear dashboard warning lights']
  },
  {
    id: 'brakes',
    name: 'Ceramic Brake Pad & Rotor Service',
    category: 'repair',
    price: 249,
    estimatedTime: '1.5-2 Hours',
    description: 'Replace front or rear brake pads with premium low-dust ceramic pads, install new matching rotors, clean and lubricate caliper sliders, and inspect hydraulic lines.',
    benefits: ['Maximum stopping power', 'Silent brake operation', 'Resistant to brake fade']
  },
  {
    id: 'ac-repair',
    name: 'AC System Recharge & Service',
    category: 'repair',
    price: 159,
    estimatedTime: '1 Hour',
    description: 'Evacuate old refrigerant, perform vacuum leak test on lines, refill refrigerant to exact specifications, replace cabin filter, and test compressor head pressures.',
    benefits: ['Ice-cold air conditioning', 'Improved cabin air quality', 'Better fuel efficiency under load']
  },
  {
    id: 'alignment',
    name: 'Laser Wheel Alignment (4-Wheel)',
    category: 'maintenance',
    price: 110,
    estimatedTime: '1 Hour',
    description: 'Precisely check and adjust camber, toe, and caster angles using laser alignment equipment, inspect suspension components, and adjust steering wheel center.',
    benefits: ['Eliminate steering pull', 'Prevent premature tire wear', 'Smoother highway cruising']
  },
  {
    id: 'spark-plugs',
    name: 'Engine Tune-Up & Spark Plugs',
    category: 'maintenance',
    price: 220,
    estimatedTime: '2 Hours',
    description: 'Remove and replace aging spark plugs with premium titanium or iridium plugs, inspect coil packs, clean throttle body assembly, and reset adaptive trim modules.',
    benefits: ['Smooth engine idle', 'Restored acceleration performance', 'Improved cold weather starts']
  },
  {
    id: 'battery',
    name: 'Premium AGM Battery Service',
    category: 'maintenance',
    price: 185,
    estimatedTime: '30 Mins',
    description: 'Test battery cranking amps, remove old battery safely, clean battery tray terminal clamps, coat terminals with oxidation corrosion protection, and program new AGM battery to vehicle computer.',
    benefits: ['Reliable starting power', 'Optimized electrical performance', 'Up to 5 years warranty coverage']
  },
  {
    id: 'suspension',
    name: 'Shocks, Struts & Suspension Fix',
    category: 'repair',
    price: 395,
    estimatedTime: '2-3 Hours',
    description: 'Replace worn front or rear shocks/struts, replace stabilizer links, inspect ball joints and control arm bushings to eliminate knocking noises and restore handling.',
    benefits: ['Restores factory ride comfort', 'Improves high-speed handling', 'Safer panic-braking control']
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'post-1',
    title: '5 Crucial Signs Your Vehicle Needs Brake Replacement ASAP',
    excerpt: 'Squeaking noises, steering wheel vibrations, or spongy feelings? Do not risk your safety. Here are the symptoms you should never ignore.',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    category: 'Safety & Repair',
    readTime: '4 min read',
    date: 'Jun 15, 2026',
    content: 'Brakes are the single most critical safety component on your vehicle. Over time, friction material degrades, leading to reduced stopping power and potential rotor damage. Learn how to diagnose brake pads, understand rotor wear patterns, and why ceramic versus organic pads matters for your vehicle.'
  },
  {
    id: 'post-2',
    title: 'The Ultimate Driver’s Guide to Battery Care in Extreme Summer Weather',
    excerpt: 'Summer heat is actually far more damaging to your battery than winter cold. Follow these 3 easy steps to prevent being stranded.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    category: 'Maintenance Tips',
    readTime: '6 min read',
    date: 'May 28, 2026',
    content: 'Most drivers associate flat batteries with freezing winter mornings, but heat is the true catalyst of battery failure. Intense engine bay temperatures accelerate fluid evaporation and grid corrosion. We cover proper cleaning of terminal corrosion, testing state-of-health, and choosing the right battery specifications.'
  },
  {
    id: 'post-3',
    title: 'Understanding the Check Engine Light: What Those OBD-II Codes Mean',
    excerpt: 'A blinking warning light triggers instant dread. We demystify the most common diagnostic trouble codes and tell you exactly what to do next.',
    image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=800&q=80',
    category: 'Diagnostics',
    readTime: '8 min read',
    date: 'Apr 11, 2026',
    content: 'The On-Board Diagnostics indicator monitors everything from a loose fuel cap to engine misfires. Clicking on this article will teach you how to read OBD codes, identify the differences between critical blinking alerts versus solid warnings, and save hundreds in unnecessary parts swap diagnoses.'
  }
];

export const CAR_MAKES = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Audi', 'Hyundai', 'Kia', 'Nissan', 'Lexus', 'Subaru', 'Volkswagen', 'Tesla', 'Volvo'
];

export const TIME_SLOTS = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];
