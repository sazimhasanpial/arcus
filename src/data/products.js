export const PRODUCTS = [
  {
    id: 'arc-01',
    name: 'Aether Pro Spatial ANC Headphones',
    category: 'Electronics',
    price: 349,
    originalPrice: 429,
    rating: 4.9,
    reviewsCount: 312,
    badge: 'Bestseller',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#18181b', bgClass: 'bg-zinc-900' },
      { name: 'Titanium Silver', hex: '#94a3b8', bgClass: 'bg-slate-400' },
      { name: 'Deep Navy', hex: '#1e3a8a', bgClass: 'bg-blue-900' }
    ],
    sizes: ['Standard Pro'],
    shortDescription: 'Studio-grade spatial acoustic drivers with active 45dB noise cancellation & 60-hr battery.',
    description: 'Engineered for audio purists and mobile creators, the Aether Pro features custom beryllium 40mm transducers, ultra-low latency aptX lossless streaming, and adaptive soundstage mapping that dynamically positions instruments in 3D acoustic space.',
    specs: {
      'Battery Life': '60 Hours (ANC Off) / 42 Hours (ANC On)',
      'Connectivity': 'Bluetooth 5.4 + USB-C Hi-Res DAC',
      'Weight': '248g ultra-light aluminum chassis',
      'Driver Size': '40mm Beryllium Custom Drivers',
      'Warranty': '2 Years Global Replacement'
    },
    features: [
      'Hybrid Adaptive ANC with 6 beamforming microphones',
      'Lossless 24-bit/96kHz wired or wireless playback',
      'Quick charge: 10 minutes gives 5 hours playback',
      'Plush memory foam ear cups with cooling gel infusion'
    ]
  },
  {
    id: 'arc-02',
    name: 'Chrono Vanguard Titanium Smartwatch',
    category: 'Electronics',
    price: 499,
    originalPrice: 599,
    rating: 4.8,
    reviewsCount: 189,
    badge: 'Staff Pick',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Space Gray', hex: '#334155', bgClass: 'bg-slate-700' },
      { name: 'Pure Platinum', hex: '#e2e8f0', bgClass: 'bg-slate-200' },
      { name: 'Solar Amber', hex: '#d97706', bgClass: 'bg-amber-600' }
    ],
    sizes: ['42mm', '46mm'],
    shortDescription: 'Grade 5 aerospace titanium housing, sapphire crystal AMOLED, ECG & biometric suite.',
    description: 'Precision-machined from solid grade 5 aerospace titanium, the Chrono Vanguard pairs classical horology aesthetics with cutting-edge biosensors including arterial stiffness, continuous VO2 Max, ECG, and dual-band GPS navigation.',
    specs: {
      'Battery Life': '14 Days standard / 38 Hours GPS',
      'Connectivity': 'Bluetooth 5.3, Wi-Fi 6, NFC Pay, GPS L1+L5',
      'Weight': '52g without strap',
      'Display': '1.43" AMOLED 1000 nits Peak Brightness',
      'Water Resistance': '10 ATM (100 meters dive-rated)'
    },
    features: [
      'Grade 5 titanium unibody with sapphire crystal glass',
      'Comprehensive cardiac ECG and SpO2 health tracking',
      'Offline topological mapping with turn-by-turn guidance',
      'Quick-release Italian calfskin and fluoroelastomer straps included'
    ]
  },
  {
    id: 'arc-03',
    name: 'Apex Cyberpunk Mechanical Keyboard',
    category: 'Electronics',
    price: 189,
    originalPrice: 229,
    rating: 4.9,
    reviewsCount: 420,
    badge: 'Hot',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Cyber Neon', hex: '#6366f1', bgClass: 'bg-indigo-600' },
      { name: 'Stealth Black', hex: '#18181b', bgClass: 'bg-zinc-900' },
      { name: 'Retro White', hex: '#f8fafc', bgClass: 'bg-slate-100' }
    ],
    sizes: ['75% Compact', '100% Full'],
    shortDescription: 'Gasket-mounted hot-swappable tactile switches, CNC aluminum frame, programmable rotary dial.',
    description: 'Designed for effortless typing marathons and tournament gaming, the Apex features 5-layer sound-dampening PORON gaskets, pre-lubed mechanical linear switches, South-facing RGB, and programmable firmware via QMK/VIA.',
    specs: {
      'Battery Life': '300 Hours RGB Off / 50 Hours RGB On',
      'Connectivity': 'Tri-mode: 2.4GHz Wireless, Bluetooth 5.2, Type-C',
      'Weight': '1,120g solid CNC alloy',
      'Switches': 'Gateron Oil King Hot-Swappable',
      'Warranty': '3 Years Manufacturer Warranty'
    },
    features: [
      'Fully customizable CNC brass volume knob & OLED display',
      'PBT double-shot keycaps resistant to shine and friction',
      '1000Hz polling rate in wired and 2.4GHz wireless modes',
      'Sound profile tuned for deep "thocky" acoustic feedback'
    ]
  },
  {
    id: 'arc-04',
    name: 'NeoTech Hybrid Trench Overcoat',
    category: 'Apparel',
    price: 289,
    originalPrice: 350,
    rating: 4.7,
    reviewsCount: 142,
    badge: 'New',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Charcoal Stealth', hex: '#374151', bgClass: 'bg-slate-700' },
      { name: 'Desert Dune', hex: '#d97706', bgClass: 'bg-amber-600' },
      { name: 'Olive Drab', hex: '#3f6212', bgClass: 'bg-lime-900' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    shortDescription: 'Waterproof DWR membrane, magnetic storm flap, breathable thermal fleece lining.',
    description: 'A seamless bridge between high-performance mountaineering gear and tailored streetwear silhouette. Features hidden fidlock magnetic closures, articulated raglan sleeves, and interior passport security compartments.',
    specs: {
      'Waterproof Rating': '20,000mm hydrostatic head',
      'Breathability': '15,000 g/m²/24h',
      'Material': '3-Layer Cordura Recycled Ripstop',
      'Closure': 'Fidlock V-Buckles + YKK Aquaguard Zippers',
      'Care': 'Machine Wash Cold / Air Dry'
    },
    features: [
      'Stormproof hood with integrated dual-drawcord tensioners',
      'Packable into its own hidden interior lumbar pocket',
      'Discreet RFID-blocking travel pocket for phone and passport',
      'Thermal microfleece lining for comfort down to -5°C'
    ]
  },
  {
    id: 'arc-05',
    name: 'Quantum Minimalist Aerogel Hoodie',
    category: 'Apparel',
    price: 139,
    originalPrice: 169,
    rating: 4.9,
    reviewsCount: 510,
    badge: 'Bestseller',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111827', bgClass: 'bg-gray-900' },
      { name: 'Heather Mist', hex: '#cbd5e1', bgClass: 'bg-slate-300' },
      { name: 'Forest Green', hex: '#166534', bgClass: 'bg-green-800' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    shortDescription: 'NASA-inspired aerogel insulation yarn, 4-way stretch, wrinkle and odor resistant.',
    description: 'Experience weightless warmth. The Quantum Hoodie utilizes aerogel composite fibers woven directly into combed organic Egyptian cotton to offer the warmth of a heavy winter coat at one-third the bulk.',
    specs: {
      'Material': '80% Supima Cotton, 20% Aerogel Poly Composite',
      'Fabric Weight': '450 GSM Heavyweight Fleece',
      'Fit': 'Modern Relaxed Boxy Fit',
      'Origin': 'Ethically woven in Portugal',
      'Warranty': 'Lifetime Seam Guarantee'
    },
    features: [
      'Double-lined structured hood that maintains architectural shape',
      'Hidden kangaroo zipper compartment keeps phone and keys secure',
      'Thumb-loop cuffs for extra warmth during chilly commutes',
      'Pre-shrunk fabric that retains true fit wash after wash'
    ]
  },
  {
    id: 'arc-06',
    name: 'Kevlar Modular Crossbody Bag',
    category: 'Accessories',
    price: 119,
    originalPrice: 149,
    rating: 4.8,
    reviewsCount: 275,
    badge: 'Hot',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#1f2937', bgClass: 'bg-gray-800' },
      { name: 'Alpine Camo', hex: '#4b5563', bgClass: 'bg-slate-600' }
    ],
    sizes: ['4 Liter', '7 Liter Expandable'],
    shortDescription: 'Ballistic Kevlar reinforcement, Fidlock quick-release strap, modular MOLLE anchors.',
    description: 'Engineered for high-mobility city explorers. Weatherproof YKK zippers and cut-resistant ballistic composite fabric protect your tablet, camera gear, and essentials in any crowded environment.',
    specs: {
      'Capacity': '4L compressed / 7L expanded',
      'Material': '1000D Kevlar Ballistic Nylon + Hypalon',
      'Strap': 'Fidlock V-Buckle quick-release cross strap',
      'Weight': '390g empty',
      'Tablet Pocket': 'Fits up to 11" iPad Pro'
    },
    features: [
      'Slash-proof wire reinforced core mesh prevents theft',
      'Hidden key leash with magnetic return anchor',
      'Waterproof expandable compartment for 750ml water bottle or umbrella',
      'Ergonomic 3D air-mesh breathable back panel'
    ]
  },
  {
    id: 'arc-07',
    name: 'Luminary Polarized Titanium Sunglasses',
    category: 'Accessories',
    price: 165,
    originalPrice: 210,
    rating: 4.9,
    reviewsCount: 164,
    badge: 'Limited',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Midnight Matte', hex: '#18181b', bgClass: 'bg-zinc-900' },
      { name: 'Champagne Gold', hex: '#f59e0b', bgClass: 'bg-amber-500' }
    ],
    sizes: ['Standard 52mm', 'Wide 55mm'],
    shortDescription: 'Beta-titanium ultra-flexible frame, category 3 polarized lenses with anti-reflective back coating.',
    description: 'Weighing just 18 grams, the Luminary sunglasses combine featherlight Japanese beta-titanium flexibility with scratch-resistant nylon polarized lenses for 100% UV400 clarity.',
    specs: {
      'Frame Material': 'Japanese Beta-Titanium Memory Wire',
      'Lens': 'Ultra-thin Polarized Hydrophobic Nylon',
      'Weight': '18 Grams',
      'UV Protection': 'UV400 Category 3 100% Protection',
      'Case': 'Magnetic collapsible vegan leather case'
    },
    features: [
      'Screwless spring hinges rated for over 100,000 flex cycles',
      'Hydrophobic and oleophobic coatings repel water, sweat, and fingerprints',
      'Hypoallergenic medical-grade silicone nose pads',
      'Lifetime hinge warranty'
    ]
  },
  {
    id: 'arc-08',
    name: 'Aura Ambient Levitating Smart Lamp',
    category: 'Home',
    price: 249,
    originalPrice: 299,
    rating: 4.8,
    reviewsCount: 198,
    badge: 'Hot',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Walnut Dark Wood', hex: '#78350f', bgClass: 'bg-amber-900' },
      { name: 'Nordic Light Birch', hex: '#fde68a', bgClass: 'bg-amber-200' },
      { name: 'Monolith Black', hex: '#18181b', bgClass: 'bg-zinc-900' }
    ],
    sizes: ['Medium 20cm', 'Grand 28cm'],
    shortDescription: 'Magnetic levitation sphere, 16-million color RGBW circadian rhythm sync, 15W wireless charger.',
    description: 'Transform your work desk or sanctuary. The Aura sphere floats effortlessly on an electromagnetic field while receiving induction power, syncing seamlessly with your sunset circadian cycle and smart home ecosystems.',
    specs: {
      'Light Output': '800 Lumens Warm-to-Cool White + RGBW',
      'Base Features': '15W Fast Qi Wireless Phone Charging Pad',
      'Power': 'USB-C GaN 35W Power Adapter Included',
      'Levitation Gap': '15mm continuous magnetic suspension',
      'Control': 'Capacitive touch + App + HomeKit/Google Home'
    },
    features: [
      'Zero-contact wireless induction lighting with no batteries needed in sphere',
      'Integrated 15W Qi wireless fast-charging pad in base',
      'Circadian rhythm mode shifts light temperature throughout the day',
      'Fail-safe: orb safely connects to magnetic base during power outage'
    ]
  },
  {
    id: 'arc-09',
    name: 'Horizon Ultrasonic Espresso & Cold Brew Maker',
    category: 'Home',
    price: 379,
    originalPrice: 450,
    rating: 4.9,
    reviewsCount: 388,
    badge: 'Bestseller',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Brushed Steel', hex: '#94a3b8', bgClass: 'bg-slate-400' },
      { name: 'Matte Jet Black', hex: '#0f172a', bgClass: 'bg-slate-900' }
    ],
    sizes: ['Countertop Edition'],
    shortDescription: 'Cold extraction in 3 minutes via ultrasonic agitation or 20-bar hot cafe espresso with steam wand.',
    description: 'Revolutionizing morning routines. The Horizon uses precision 40kHz ultrasonic vibration to extract deep, sweet cold brew coffee in only 3 minutes, or turns on its dual thermoblock to pull 20-bar cafe crema espresso instantly.',
    specs: {
      'Pump Pressure': '20 Bar Italian Ulka Pump',
      'Water Tank': '1.8L BPA-Free Removable Reservoir',
      'Extraction Modes': '3-Minute Ultrasonic Cold Brew & 93°C Espresso',
      'Steam Wand': 'Commercial 3-hole microfoam wand',
      'Weight': '6.4kg Cast Aluminum'
    },
    features: [
      'Patented Ultrasonic Cold Brew cycle produces silky smooth coffee in 180 seconds',
      'PID temperature regulation within ±0.5°C consistency',
      'Integrated shot timer and pressure gauge on front panel',
      'Includes tamper, milk pitcher, double basket, and blind cleaning disc'
    ]
  },
  {
    id: 'arc-10',
    name: 'Vortex GaN 140W Multi-Port Travel Hub',
    category: 'Electronics',
    price: 89,
    originalPrice: 115,
    rating: 4.9,
    reviewsCount: 650,
    badge: 'Staff Pick',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Graphite', hex: '#334155', bgClass: 'bg-slate-700' },
      { name: 'Glacier White', hex: '#f8fafc', bgClass: 'bg-white' }
    ],
    sizes: ['US/EU/UK Universal Prongs'],
    shortDescription: 'Gallium Nitride 5th Gen architecture, 3x USB-C PD 3.1 + 1x USB-A, charges laptops at full speed.',
    description: 'The only charger you will ever pack. Supplies up to 140W on a single USB-C port to fast-charge a 16" MacBook Pro from 0 to 50% in 28 minutes, while powering your phone, watch, and earbuds simultaneously.',
    specs: {
      'Total Output': '140W Max Fast PD 3.1 & QC 4.0+',
      'Ports': '3x USB-C (140W/100W/65W) + 1x USB-A (30W)',
      'Dimensions': '75 x 65 x 30 mm pocket-sized',
      'Protection': 'Over-voltage, short circuit, and dynamic thermal monitoring'
    },
    features: [
      'Next-gen GaNFast semiconductor minimizes heat dissipation by 45%',
      'Worldwide voltage compatibility (100V - 240V) with folding pin adapter',
      'Dynamic power distribution automatically optimizes wattage per device',
      'Braided 240W 2-meter 40Gbps USB-C cable included'
    ]
  },
  {
    id: 'arc-11',
    name: 'Strata Carbon Fiber RFID Minimalist Wallet',
    category: 'Accessories',
    price: 65,
    originalPrice: 85,
    rating: 4.8,
    reviewsCount: 440,
    badge: 'Bestseller',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: '3K Carbon Weave', hex: '#18181b', bgClass: 'bg-zinc-900' },
      { name: 'Forged Ember Carbon', hex: '#991b1b', bgClass: 'bg-red-800' }
    ],
    sizes: ['Slim (1-12 Cards)'],
    shortDescription: 'Real aerospace carbon fiber, integrated cash strap, RFID blocking card protection.',
    description: 'Ditch bulky leather. The Strata holds 1 to 12 credit cards without stretching and features an integrated cash strap, military RFID-blocking plates, and an optional hidden Apple AirTag tracker mount.',
    specs: {
      'Capacity': '1 to 12 Cards + 10 Folded Cash Bills',
      'Material': 'Military-Spec 3K Carbon Fiber & Grade 5 Titanium',
      'Weight': '45 Grams ultra slim profile',
      'Thickness': 'Just 6mm empty'
    },
    features: [
      'Dual-plate RFID shielding prevents wireless electronic pickpocketing',
      'Replaceable elastic cash strap with scratch-proof silicone grip dots',
      'Beveled card thumb-slot for fast single-handed card selection',
      'Lifetime replacement warranty on elastic and plates'
    ]
  },
  {
    id: 'arc-12',
    name: 'Zenith Kinetic Sand Art Desk Frame',
    category: 'Home',
    price: 159,
    originalPrice: 199,
    rating: 4.9,
    reviewsCount: 310,
    badge: 'Staff Pick',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Natural Oak Frame', hex: '#b45309', bgClass: 'bg-amber-700' },
      { name: 'Anodized Black', hex: '#09090b', bgClass: 'bg-zinc-950' }
    ],
    sizes: ['Desk 30cm Diameter', 'Wall 45cm Diameter'],
    shortDescription: 'Autonomous motorized magnetic ball carves infinite meditative geometric sand patterns.',
    description: 'A mesmerizing centerpiece for deep work and mindfulness. Underneath a bed of fine silica sand, a silent motorized magnetic ball glides in algorithmic patterns, producing intricate mandalas and landscape designs controllable via your smartphone.',
    specs: {
      'Sand Type': 'Non-toxic ultra-fine quartz silica',
      'Lighting': 'Edge-lit 60-LED perimeter ring with warm dimming',
      'Noise Level': 'Under 18dB ultra-quiet magnetic motor',
      'App Control': 'Over 200 downloadable community patterns'
    },
    features: [
      'Continuously carves mesmerizing geometric mandalas and zen gardens',
      'Adjustable internal LED perimeter glow creates serene desk shadows',
      'Create and upload your own sand art tracks with free mobile companion app',
      'Tempered glass top protects sand from dust and pets'
    ]
  }
];

export const CATEGORIES = ['All', 'Electronics', 'Apparel', 'Accessories', 'Home'];

export const THEMES = [
  { id: 'indigo', name: 'Cyber Indigo', color: '#6366f1', badge: 'Default' },
  { id: 'emerald', name: 'Neo Emerald', color: '#10b981', badge: 'Fresh' },
  { id: 'crimson', name: 'Crimson Pulse', color: '#f43f5e', badge: 'Vibrant' },
  { id: 'gold', name: 'Solar Gold', color: '#f59e0b', badge: 'Warm' },
  { id: 'cyan', name: 'Quantum Cyan', color: '#06b6d4', badge: 'Electric' }
];

export const CURRENCIES = {
  USD: { symbol: '$', rate: 1, label: 'USD ($)', country: 'US' },
  BDT: { symbol: '৳', rate: 121.5, label: 'BDT (৳)', country: 'BD' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)', country: 'EU' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)', country: 'GB' }
};

export const PROMO_CODES = {
  ARCUS20: { discountPercent: 20, description: '20% Off Storewide' },
  VIP50: { discountPercent: 25, description: '25% VIP Elite Discount' }
};

export const INITIAL_USER_PROFILE = {
  name: 'Sazim Hasan Pial',
  email: 'sajimhasan12@gmail.com',
  tier: 'Platinum VIP',
  points: 2450,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  phone: '+880 1712-345678',
  address: {
    street: 'House 42, Road 11, Block D',
    area: 'Banani',
    city: 'Dhaka',
    district: 'Dhaka',
    country: 'Bangladesh',
    zip: '1213'
  },
  savedCards: [
    { id: 'c1', type: 'City Bank AMEX Platinum', last4: '8824', exp: '08/28' },
    { id: 'c2', type: 'BRAC Bank Visa Signature', last4: '4190', exp: '11/27' }
  ],
  savedMfs: [
    { type: 'bKash', number: '01712-345678', verified: true },
    { type: 'Nagad', number: '01712-345678', verified: true }
  ],
  pastTransactions: [
    {
      trxId: 'BKS-9281740921',
      date: '02 Nov 2026, 04:15 PM',
      method: 'bKash Merchant Pay',
      amountBDT: '৳ 22,960',
      status: 'Secured & Completed',
      merchantTrx: 'ARC-MFS-8491',
      securityCheck: '100% Passed · 2FA SMS Verified'
    },
    {
      trxId: 'EBL-4820194821',
      date: '28 Oct 2026, 01:22 PM',
      method: 'EBL Visa 3D Secure',
      amountBDT: '৳ 60,620',
      status: 'Settled & Verified',
      merchantTrx: 'ARC-CARD-9912',
      securityCheck: 'Verified by Visa 3DS 2.0'
    }
  ],
  currentOrder: {
    id: 'ARC-98241',
    date: 'Today, 09:45 AM',
    itemsCount: 2,
    total: 488,
    statusStep: 2, // 0: Placed, 1: Processed, 2: Shipped, 3: Out for Delivery, 4: Delivered
    carrier: 'Pathao Express Priority / Banani Hub',
    rider: 'Tanvir Hossain (Rider ID: #PTH-4821, Contact: +880 1819-284910)',
    trackingNumber: 'PTH-BD-90182740-DH',
    steps: [
      { title: 'Order Verified & Security Cleared', desc: 'bKash / 3DS payment token validated via SSLCommerz gateway', time: '09:45 AM', done: true },
      { title: 'Barcoded & Quality Sealed', desc: 'Tamper-evident DBID packaging sealed at Banani Fulfillment Center', time: '10:15 AM', done: true },
      { title: 'Dispatched with Pathao Courier', desc: 'Handed over to Pathao Express Priority Van (Rider assigned)', time: '10:40 AM', done: true },
      { title: 'Out for Doorstep Handover', desc: 'Rider approaching Banani Road 11 with mobile POS terminal', time: 'Expected 02:30 PM', done: false },
      { title: 'Delivered & OTP Signed', desc: 'Customer digital signature & OTP handover completion', time: 'Expected 03:15 PM', done: false }
    ]
  }
};
