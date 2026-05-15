// Status International UK - Product Catalogue
// This is placeholder data for 24 products demonstrating the data model
// Final implementation will support 700+ SKUs from backend API

export interface Product {
    id: string;
    sku: string;
    slug: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    category: string;
    subcategory: string;
    price: number;
    compareAtPrice?: number;
    rating: number;
    reviewCount: number;
    badges: string[];
    images: string[];
    specifications: Record<string, string>;
    features: string[];
    stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
    recommended: boolean;
    bestSeller: boolean;
    amazonFavourite: boolean;
  }
  
  export const products: Product[] = [
    {
      id: '1',
      sku: 'STS-LED-A60-9W',
      slug: 'led-bulb-9w-warm-white',
      title: 'LED Bulb 9W Warm White E27',
      shortDescription: 'Energy-efficient 9W LED bulb with warm white light',
      longDescription: 'Premium LED bulb delivering warm, natural light while saving energy. Perfect for living rooms, bedrooms, and dining areas. Lasts up to 25,000 hours.',
      category: 'Lighting',
      subcategory: 'LED Bulbs',
      price: 4.99,
      compareAtPrice: 7.99,
      rating: 4.5,
      reviewCount: 234,
      badges: ['Best Seller', 'Amazon Favourite'],
      images: ['led-bulb-1.jpg', 'led-bulb-2.jpg', 'led-bulb-3.jpg'],
      specifications: {
        'Wattage': '9W',
        'Cap Type': 'E27',
        'Colour Temperature': '2700K (Warm White)',
        'Lumens': '806lm',
        'Lifespan': '25,000 hours',
        'Dimmable': 'No',
        'Energy Rating': 'A+'
      },
      features: [
        'Energy saving LED technology',
        'Instant on - no warm-up time',
        'Long 25,000 hour lifespan',
        'Warm white 2700K colour temperature',
        'Standard E27 fitting'
      ],
      stockStatus: 'in-stock',
      recommended: true,
      bestSeller: true,
      amazonFavourite: true
    },
    {
      id: '2',
      sku: 'STS-LED-GU10-5W',
      slug: 'led-spotlight-gu10-5w',
      title: 'LED Spotlight GU10 5W Cool White',
      shortDescription: 'Bright spotlight bulb for kitchens and bathrooms',
      longDescription: 'High-quality GU10 LED spotlight delivering crisp, cool white light. Ideal for kitchens, bathrooms, and task lighting. Energy efficient and long-lasting.',
      category: 'Lighting',
      subcategory: 'LED Bulbs',
      price: 3.99,
      rating: 4.6,
      reviewCount: 189,
      badges: ['Best Seller'],
      images: ['gu10-bulb-1.jpg', 'gu10-bulb-2.jpg'],
      specifications: {
        'Wattage': '5W',
        'Cap Type': 'GU10',
        'Colour Temperature': '4000K (Cool White)',
        'Lumens': '400lm',
        'Lifespan': '25,000 hours',
        'Dimmable': 'No',
        'Energy Rating': 'A+'
      },
      features: [
        'Cool white 4000K for clear visibility',
        'Perfect for task lighting',
        'Energy efficient 5W LED',
        'Standard GU10 fitting',
        'Long lifespan'
      ],
      stockStatus: 'in-stock',
      recommended: true,
      bestSeller: true,
      amazonFavourite: false
    },
    {
      id: '3',
      sku: 'STS-EXT-4WAY-2M',
      slug: 'extension-lead-4-way-2m',
      title: '4-Way Extension Lead 2m with Surge Protection',
      shortDescription: 'Versatile 4-socket extension lead with surge protection',
      longDescription: 'Reliable 4-way extension lead with built-in surge protection to keep your devices safe. Features individual switches and a 2-meter cable for flexibility.',
      category: 'Electrical Accessories',
      subcategory: 'Extension Leads',
      price: 12.99,
      compareAtPrice: 16.99,
      rating: 4.7,
      reviewCount: 456,
      badges: ['Recommended', 'Amazon Favourite'],
      images: ['extension-4way-1.jpg', 'extension-4way-2.jpg', 'extension-4way-3.jpg'],
      specifications: {
        'Sockets': '4',
        'Cable Length': '2m',
        'Surge Protection': 'Yes',
        'Individual Switches': 'Yes',
        'Max Load': '13A / 3120W',
        'Cable Type': '3x1.5mm²',
        'Safety Certified': 'BS 1363'
      },
      features: [
        'Built-in surge protection',
        'Individual socket switches',
        '2-meter heavy-duty cable',
        'Supports up to 3120W total load',
        'UK safety certified'
      ],
      stockStatus: 'in-stock',
      recommended: true,
      bestSeller: false,
      amazonFavourite: true
    },
    {
      id: '4',
      sku: 'STS-BAT-AA-8PK',
      slug: 'alkaline-batteries-aa-8-pack',
      title: 'AA Alkaline Batteries - 8 Pack',
      shortDescription: 'Long-lasting AA batteries for everyday devices',
      longDescription: 'Premium alkaline AA batteries delivering reliable power for all your devices. Long shelf life and consistent performance for toys, remotes, torches, and more.',
      category: 'Batteries',
      subcategory: 'Alkaline Batteries',
      price: 5.99,
      rating: 4.4,
      reviewCount: 312,
      badges: ['Amazon Favourite'],
      images: ['batteries-aa-1.jpg', 'batteries-aa-2.jpg'],
      specifications: {
        'Battery Type': 'Alkaline',
        'Size': 'AA',
        'Pack Size': '8',
        'Voltage': '1.5V',
        'Shelf Life': '10 years',
        'Mercury Free': 'Yes'
      },
      features: [
        'Long-lasting alkaline technology',
        '10-year shelf life',
        'Mercury-free formula',
        'Suitable for high-drain devices',
        'Value 8-pack'
      ],
      stockStatus: 'in-stock',
      recommended: false,
      bestSeller: false,
      amazonFavourite: true
    },
    {
      id: '5',
      sku: 'STS-TORCH-LED-TACTICAL',
      slug: 'led-tactical-torch-rechargeable',
      title: 'LED Tactical Torch - Rechargeable',
      shortDescription: 'Powerful rechargeable LED torch with multiple modes',
      longDescription: 'Professional-grade LED torch with ultra-bright output and multiple lighting modes. Rechargeable via USB, water-resistant, and built for durability.',
      category: 'Torches',
      subcategory: 'Rechargeable Torches',
      price: 19.99,
      compareAtPrice: 29.99,
      rating: 4.8,
      reviewCount: 523,
      badges: ['Best Seller', 'Recommended'],
      images: ['torch-tactical-1.jpg', 'torch-tactical-2.jpg', 'torch-tactical-3.jpg'],
      specifications: {
        'Lumens': '1200lm',
        'Battery': 'Rechargeable Li-ion',
        'Charging': 'USB-C',
        'Water Resistance': 'IPX6',
        'Modes': '5 (High, Medium, Low, Strobe, SOS)',
        'Material': 'Aircraft-grade aluminium',
        'Length': '15cm'
      },
      features: [
        'Ultra-bright 1200 lumens output',
        'USB-C rechargeable',
        'Water-resistant IPX6 rating',
        '5 lighting modes including strobe',
        'Durable aluminium construction'
      ],
      stockStatus: 'in-stock',
      recommended: true,
      bestSeller: true,
      amazonFavourite: false
    },
    {
      id: '6',
      sku: 'STS-SMART-BULB-RGB',
      slug: 'smart-led-bulb-rgb-wifi',
      title: 'Smart LED Bulb RGB WiFi Enabled',
      shortDescription: 'Colour-changing smart bulb with app control',
      longDescription: 'Transform your home with millions of colours. Control via smartphone app, voice assistants, or set schedules. Perfect for creating ambience in any room.',
      category: 'Lighting',
      subcategory: 'Smart Lighting',
      price: 14.99,
      rating: 4.5,
      reviewCount: 278,
      badges: ['New'],
      images: ['smart-bulb-1.jpg', 'smart-bulb-2.jpg', 'smart-bulb-3.jpg'],
      specifications: {
        'Wattage': '9W',
        'Cap Type': 'E27',
        'Colours': '16 million',
        'Connectivity': 'WiFi 2.4GHz',
        'Voice Control': 'Alexa, Google Assistant',
        'Brightness': 'Dimmable 1%-100%',
        'Lifespan': '25,000 hours'
      },
      features: [
        '16 million colour options',
        'App control from anywhere',
        'Voice control compatible',
        'Set schedules and timers',
        'Energy-efficient LED'
      ],
      stockStatus: 'in-stock',
      recommended: true,
      bestSeller: false,
      amazonFavourite: false
    },
    {
      id: '7',
      sku: 'STS-EXT-6WAY-5M',
      slug: 'extension-lead-6-way-5m',
      title: '6-Way Extension Lead 5m Heavy Duty',
      shortDescription: 'Professional extension lead for home and office',
      longDescription: 'Heavy-duty 6-way extension lead perfect for offices, workshops, and entertainment setups. 5-meter cable provides maximum flexibility with surge protection.',
      category: 'Electrical Accessories',
      subcategory: 'Extension Leads',
      price: 18.99,
      rating: 4.6,
      reviewCount: 201,
      badges: ['Recommended'],
      images: ['extension-6way-1.jpg', 'extension-6way-2.jpg'],
      specifications: {
        'Sockets': '6',
        'Cable Length': '5m',
        'Surge Protection': 'Yes',
        'Individual Switches': 'Yes',
        'Max Load': '13A / 3120W',
        'Master Switch': 'Yes',
        'Cable Type': '3x1.5mm²'
      },
      features: [
        '6 individually switched sockets',
        'Extra-long 5m cable',
        'Surge and overload protection',
        'Master on/off switch',
        'Heavy-duty construction'
      ],
      stockStatus: 'in-stock',
      recommended: true,
      bestSeller: false,
      amazonFavourite: false
    },
    {
      id: '8',
      sku: 'STS-PLUG-USB-DUAL',
      slug: 'usb-wall-charger-dual-port',
      title: 'USB Wall Charger - Dual Port 3.4A',
      shortDescription: 'Fast-charging dual USB wall plug',
      longDescription: 'Compact dual-port USB charger for phones, tablets, and devices. Smart charging technology delivers optimal power to each device simultaneously.',
      category: 'Electrical Accessories',
      subcategory: 'Plugs & Adaptors',
      price: 9.99,
      rating: 4.5,
      reviewCount: 167,
      badges: ['Amazon Favourite'],
      images: ['usb-charger-1.jpg', 'usb-charger-2.jpg'],
      specifications: {
        'USB Ports': '2',
        'Total Output': '3.4A',
        'Input': '100-240V',
        'Smart Charging': 'Yes',
        'Compact Design': 'Yes',
        'Safety Features': 'Overcharge, overcurrent, short-circuit protection'
      },
      features: [
        'Dual USB ports charge 2 devices',
        'Smart charging technology',
        'Compact, space-saving design',
        'Multiple safety protections',
        'Universal voltage compatibility'
      ],
      stockStatus: 'in-stock',
      recommended: false,
      bestSeller: false,
      amazonFavourite: true
    },
    {
      id: '9',
      sku: 'STS-LED-STRIP-5M',
      slug: 'led-strip-lights-5m-rgb',
      title: 'LED Strip Lights 5m RGB with Remote',
      shortDescription: 'Colour-changing LED strip for ambient lighting',
      longDescription: 'Create stunning lighting effects with this 5-meter RGB LED strip. Self-adhesive backing, remote control, and multiple colour modes make installation and use simple.',
      category: 'Lighting',
      subcategory: 'Decorative Lighting',
      price: 16.99,
      compareAtPrice: 24.99,
      rating: 4.4,
      reviewCount: 398,
      badges: ['Best Seller', 'Amazon Favourite'],
      images: ['led-strip-1.jpg', 'led-strip-2.jpg', 'led-strip-3.jpg'],
      specifications: {
        'Length': '5m',
        'LEDs': '150 (5050 SMD)',
        'Colours': 'RGB - 16 colours',
        'Control': 'IR Remote',
        'Modes': '8 dynamic modes',
        'Power': '12V DC adapter included',
        'Adhesive': 'Self-adhesive backing'
      },
      features: [
        '5 meters of flexible LED strip',
        '16 colour options + white',
        '8 dynamic lighting modes',
        'Remote control included',
        'Easy peel-and-stick installation'
      ],
      stockStatus: 'in-stock',
      recommended: true,
      bestSeller: true,
      amazonFavourite: true
    },
    {
      id: '10',
      sku: 'STS-WORKLITE-LED-30W',
      slug: 'led-work-light-30w-rechargeable',
      title: 'LED Work Light 30W Rechargeable',
      shortDescription: 'Portable LED work light for DIY and professional use',
      longDescription: 'Powerful 30W LED work light perfect for workshops, garages, and outdoor work. Rechargeable battery, adjustable stand, and rugged construction.',
      category: 'Work Lights',
      subcategory: 'Rechargeable Work Lights',
      price: 34.99,
      rating: 4.7,
      reviewCount: 145,
      badges: ['Recommended'],
      images: ['worklight-1.jpg', 'worklight-2.jpg', 'worklight-3.jpg'],
      specifications: {
        'Power': '30W',
        'Lumens': '2400lm',
        'Battery': 'Rechargeable Li-ion',
        'Runtime': 'Up to 4 hours',
        'Charging Time': '3-4 hours',
        'Stand': 'Adjustable + hanging hook',
        'IP Rating': 'IP65'
      },
      features: [
        'Bright 2400 lumen output',
        'Rechargeable for portability',
        'Adjustable stand and hook',
        'IP65 water and dust resistant',
        'Up to 4 hours runtime'
      ],
      stockStatus: 'in-stock',
      recommended: true,
      bestSeller: false,
      amazonFavourite: false
    },
    {
      id: '11',
      sku: 'STS-HEAT-FAN-2KW',
      slug: 'fan-heater-2kw-portable',
      title: 'Portable Fan Heater 2kW',
      shortDescription: 'Compact fan heater for instant warmth',
      longDescription: 'Efficient 2kW fan heater with adjustable thermostat and two heat settings. Safety cut-off and tip-over protection make it safe for home use.',
      category: 'Heating',
      subcategory: 'Fan Heaters',
      price: 24.99,
      rating: 4.3,
      reviewCount: 223,
      badges: [],
      images: ['heater-1.jpg', 'heater-2.jpg'],
      specifications: {
        'Power': '2000W',
        'Heat Settings': '2 (1000W / 2000W)',
        'Thermostat': 'Adjustable',
        'Safety Features': 'Overheat cut-off, tip-over switch',
        'Size': 'Compact portable',
        'Weight': '1.2kg'
      },
      features: [
        'Two heat settings for flexibility',
        'Adjustable thermostat',
        'Safety tip-over protection',
        'Overheat cut-off',
        'Lightweight and portable'
      ],
      stockStatus: 'in-stock',
      recommended: false,
      bestSeller: false,
      amazonFavourite: false
    },
    {
      id: '12',
      sku: 'STS-BAT-AAA-8PK',
      slug: 'alkaline-batteries-aaa-8-pack',
      title: 'AAA Alkaline Batteries - 8 Pack',
      shortDescription: 'Reliable AAA batteries for everyday use',
      longDescription: 'High-quality alkaline AAA batteries perfect for remotes, clocks, toys, and small devices. Long shelf life ensures they are ready when you need them.',
      category: 'Batteries',
      subcategory: 'Alkaline Batteries',
      price: 5.49,
      rating: 4.4,
      reviewCount: 267,
      badges: ['Amazon Favourite'],
      images: ['batteries-aaa-1.jpg', 'batteries-aaa-2.jpg'],
      specifications: {
        'Battery Type': 'Alkaline',
        'Size': 'AAA',
        'Pack Size': '8',
        'Voltage': '1.5V',
        'Shelf Life': '10 years',
        'Mercury Free': 'Yes'
      },
      features: [
        'Long-lasting alkaline power',
        '10-year shelf life',
        'Mercury-free',
        'Ideal for remotes and small devices',
        'Pack of 8'
      ],
      stockStatus: 'in-stock',
      recommended: false,
      bestSeller: false,
      amazonFavourite: true
    },
    {
      id: '13',
      sku: 'STS-OUTDOOR-SENSOR-LED',
      slug: 'outdoor-security-light-sensor',
      title: 'Outdoor LED Security Light with PIR Sensor',
      shortDescription: 'Motion-activated LED security light',
      longDescription: 'Keep your property secure with this powerful motion-sensing LED light. Weatherproof construction and adjustable settings make it perfect for gardens, driveways, and entrances.',
      category: 'Outdoor & Garden',
      subcategory: 'Security Lighting',
      price: 29.99,
      rating: 4.6,
      reviewCount: 189,
      badges: ['Recommended'],
      images: ['outdoor-sensor-1.jpg', 'outdoor-sensor-2.jpg', 'outdoor-sensor-3.jpg'],
      specifications: {
        'Power': '20W LED',
        'Lumens': '1600lm',
        'Sensor Range': '8-12m',
        'Detection Angle': '180°',
        'Timer': 'Adjustable 10s-5min',
        'IP Rating': 'IP65',
        'Colour Temperature': '6000K (Daylight)'
      },
      features: [
        'PIR motion sensor activation',
        'Bright 1600 lumen output',
        'Weatherproof IP65 rating',
        'Adjustable detection and timer',
        'Energy-efficient LED'
      ],
      stockStatus: 'in-stock',
      recommended: true,
      bestSeller: false,
      amazonFavourite: false
    },
    {
      id: '14',
      sku: 'STS-CABLE-REEL-25M',
      slug: 'cable-reel-25m-4-socket',
      title: 'Cable Reel 25m with 4 Sockets',
      shortDescription: 'Heavy-duty cable reel for workshop and outdoor use',
      longDescription: 'Professional 25-meter cable reel with 4 weatherproof sockets. Thermal cut-out protection and robust construction make it ideal for demanding environments.',
      category: 'Electrical Accessories',
      subcategory: 'Cable Reels',
      price: 44.99,
      rating: 4.7,
      reviewCount: 134,
      badges: ['Recommended'],
      images: ['cable-reel-1.jpg', 'cable-reel-2.jpg', 'cable-reel-3.jpg'],
      specifications: {
        'Cable Length': '25m',
        'Sockets': '4 (weatherproof)',
        'Cable Type': '3x1.5mm² H05VV-F',
        'Max Load': '13A',
        'Thermal Cut-out': 'Yes',
        'Reel Diameter': '290mm',
        'Stand': 'Adjustable'
      },
      features: [
        '25 meters of heavy-duty cable',
        '4 weatherproof sockets',
        'Thermal overload protection',
        'Adjustable stand',
        'Professional-grade construction'
      ],
      stockStatus: 'in-stock',
      recommended: true,
      bestSeller: false,
      amazonFavourite: false
    },
    {
      id: '15',
      sku: 'STS-NIGHT-LIGHT-PLUG',
      slug: 'led-night-light-plug-in',
      title: 'LED Night Light Plug-In with Sensor',
      shortDescription: 'Automatic dusk-to-dawn night light',
      longDescription: 'Energy-efficient LED night light with built-in sensor automatically turns on in darkness. Perfect for hallways, bedrooms, and bathrooms.',
      category: 'Lighting',
      subcategory: 'Night Lights',
      price: 6.99,
      rating: 4.5,
      reviewCount: 312,
      badges: ['Amazon Favourite'],
      images: ['night-light-1.jpg', 'night-light-2.jpg'],
      specifications: {
        'Type': 'LED',
        'Power': '0.5W',
        'Sensor': 'Dusk-to-dawn',
        'Colour Temperature': '2700K (Warm White)',
        'Lifespan': '50,000 hours',
        'Plug Type': 'UK 3-pin'
      },
      features: [
        'Automatic light sensor',
        'Ultra-low energy consumption',
        'Warm white gentle glow',
        'Long 50,000 hour lifespan',
        'Simple plug-in design'
      ],
      stockStatus: 'in-stock',
      recommended: false,
      bestSeller: false,
      amazonFavourite: true
    },
    {
      id: '16',
      sku: 'STS-TRAVEL-ADAPTOR',
      slug: 'universal-travel-adaptor-usb',
      title: 'Universal Travel Adaptor with USB Ports',
      shortDescription: 'All-in-one travel adaptor for worldwide use',
      longDescription: 'Essential travel companion covering 150+ countries. Built-in USB ports charge your devices anywhere in the world. Compact design with safety shutters.',
      category: 'Electrical Accessories',
      subcategory: 'Plugs & Adaptors',
      price: 16.99,
      rating: 4.6,
      reviewCount: 445,
      badges: ['Best Seller', 'Amazon Favourite'],
      images: ['travel-adaptor-1.jpg', 'travel-adaptor-2.jpg', 'travel-adaptor-3.jpg'],
      specifications: {
        'Coverage': '150+ countries',
        'USB Ports': '2 (2.4A total)',
        'Max Load': '10A',
        'Plug Types': 'UK, EU, US, AU',
        'Safety Features': 'Fuse, safety shutters',
        'Compact': 'Yes'
      },
      features: [
        'Works in 150+ countries',
        '2 USB charging ports',
        'All major plug types included',
        'Built-in safety fuse',
        'Compact travel-friendly design'
      ],
      stockStatus: 'in-stock',
      recommended: true,
      bestSeller: true,
      amazonFavourite: true
    },
    {
      id: '17',
      sku: 'STS-DESK-LAMP-LED',
      slug: 'led-desk-lamp-adjustable',
      title: 'LED Desk Lamp with USB Charging Port',
      shortDescription: 'Modern desk lamp with flexible arm and touch control',
      longDescription: 'Stylish LED desk lamp perfect for work and study. Multiple brightness levels, colour temperatures, and built-in USB port for device charging.',
      category: 'Lighting',
      subcategory: 'Desk Lamps',
      price: 27.99,
      rating: 4.6,
      reviewCount: 178,
      badges: ['Recommended'],
      images: ['desk-lamp-1.jpg', 'desk-lamp-2.jpg', 'desk-lamp-3.jpg'],
      specifications: {
        'Power': '10W LED',
        'Brightness Levels': '5',
        'Colour Temperatures': '3 (Warm/Natural/Cool)',
        'USB Port': 'Yes (5V 1A)',
        'Arm': 'Flexible gooseneck',
        'Control': 'Touch',
        'Base': 'Weighted non-slip'
      },
      features: [
        '5 brightness levels',
        '3 colour temperature modes',
        'USB device charging port',
        'Flexible adjustable arm',
        'Touch-sensitive controls'
      ],
      stockStatus: 'in-stock',
      recommended: true,
      bestSeller: false,
      amazonFavourite: false
    },
    {
      id: '18',
      sku: 'STS-GARDEN-STAKE-SOLAR',
      slug: 'solar-garden-stake-lights-pack',
      title: 'Solar Garden Stake Lights - 6 Pack',
      shortDescription: 'Colour-changing solar lights for gardens and paths',
      longDescription: 'Beautiful solar-powered stake lights create ambient garden lighting. No wiring required - simply stake into the ground and enjoy automatic illumination.',
      category: 'Outdoor & Garden',
      subcategory: 'Garden Lighting',
      price: 21.99,
      rating: 4.3,
      reviewCount: 267,
      badges: [],
      images: ['solar-stakes-1.jpg', 'solar-stakes-2.jpg'],
      specifications: {
        'Pack Size': '6',
        'Power': 'Solar',
        'Battery': 'Rechargeable NiMH',
        'Runtime': 'Up to 8 hours',
        'Colours': 'Colour-changing RGB',
        'Height': '38cm',
        'Waterproof': 'IP44'
      },
      features: [
        'Solar-powered - no wiring',
        'Automatic dusk-to-dawn operation',
        'Colour-changing LEDs',
        'Weatherproof construction',
        'Easy stake installation'
      ],
      stockStatus: 'in-stock',
      recommended: false,
      bestSeller: false,
      amazonFavourite: false
    },
    {
      id: '19',
      sku: 'STS-TIMER-DIGITAL-7DAY',
      slug: 'digital-timer-switch-7-day',
      title: 'Digital Timer Switch - 7 Day Programmable',
      shortDescription: 'Programmable timer socket for automated control',
      longDescription: 'Control your appliances with precision using this 7-day programmable timer. Perfect for lamps, heaters, and any electrical device requiring scheduled operation.',
      category: 'Electrical Accessories',
      subcategory: 'Timers & Controls',
      price: 13.99,
      rating: 4.5,
      reviewCount: 156,
      badges: [],
      images: ['timer-digital-1.jpg', 'timer-digital-2.jpg'],
      specifications: {
        'Type': '7-day digital',
        'Programs': 'Up to 20',
        'Display': 'LCD',
        'Random Function': 'Yes (security)',
        'Countdown Timer': 'Yes',
        'Battery Backup': 'Yes',
        'Max Load': '13A / 3120W'
      },
      features: [
        '7-day programmable schedule',
        'Up to 20 programs',
        'Random mode for security',
        'Battery backup retains settings',
        'Easy-to-read LCD display'
      ],
      stockStatus: 'in-stock',
      recommended: false,
      bestSeller: false,
      amazonFavourite: false
    },
    {
      id: '20',
      sku: 'STS-FAN-DESK-USB',
      slug: 'usb-desk-fan-portable',
      title: 'USB Desk Fan - Portable & Quiet',
      shortDescription: 'Compact USB-powered fan for desk cooling',
      longDescription: 'Stay cool at your desk with this quiet USB fan. Adjustable angle, multiple speed settings, and powered via USB make it perfect for office or home.',
      category: 'Cooling',
      subcategory: 'Desk Fans',
      price: 11.99,
      rating: 4.4,
      reviewCount: 198,
      badges: [],
      images: ['usb-fan-1.jpg', 'usb-fan-2.jpg'],
      specifications: {
        'Power': 'USB 5V',
        'Speeds': '2',
        'Blade Size': '6 inch',
        'Noise Level': 'Ultra-quiet',
        'Adjustable': 'Yes (angle)',
        'Cable Length': '1.5m'
      },
      features: [
        'USB-powered for desk use',
        'Whisper-quiet operation',
        'Adjustable angle',
        '2 speed settings',
        'Compact and portable'
      ],
      stockStatus: 'in-stock',
      recommended: false,
      bestSeller: false,
      amazonFavourite: false
    },
    {
      id: '21',
      sku: 'STS-FAIRY-WARM-10M',
      slug: 'fairy-lights-warm-white-10m',
      title: 'Fairy Lights Warm White - 10m 100 LEDs',
      shortDescription: 'Decorative string lights for indoor use',
      longDescription: 'Create a warm, inviting atmosphere with these delicate fairy lights. Perfect for bedrooms, events, and seasonal decoration. 8 lighting modes via remote.',
      category: 'Lighting',
      subcategory: 'Decorative Lighting',
      price: 12.99,
      rating: 4.6,
      reviewCount: 423,
      badges: ['Best Seller', 'Amazon Favourite'],
      images: ['fairy-lights-1.jpg', 'fairy-lights-2.jpg'],
      specifications: {
        'Length': '10m',
        'LEDs': '100',
        'Colour': 'Warm White',
        'Wire': 'Silver copper',
        'Modes': '8',
        'Control': 'Remote',
        'Power': 'USB or battery',
        'Indoor Use': 'Yes'
      },
      features: [
        '10 meters with 100 LEDs',
        'Warm white glow',
        '8 lighting modes',
        'Remote control included',
        'Flexible copper wire'
      ],
      stockStatus: 'in-stock',
      recommended: true,
      bestSeller: true,
      amazonFavourite: true
    },
    {
      id: '22',
      sku: 'STS-SOCKET-DOUBLE-USB',
      slug: 'wall-socket-double-usb',
      title: 'Double Wall Socket with Twin USB Ports',
      shortDescription: 'Modern socket with integrated USB charging',
      longDescription: 'Upgrade your home with this twin USB wall socket. Charge devices without using plug adaptors. Easy replacement for standard UK sockets.',
      category: 'Electrical Accessories',
      subcategory: 'Sockets',
      price: 15.99,
      rating: 4.7,
      reviewCount: 145,
      badges: ['Recommended'],
      images: ['socket-usb-1.jpg', 'socket-usb-2.jpg', 'socket-usb-3.jpg'],
      specifications: {
        'Sockets': '2 x UK 3-pin',
        'USB Ports': '2 (3.1A total)',
        'Finish': 'White',
        'Standard': 'BS 1363',
        'Smart Charging': 'Yes',
        'Installation': 'Standard UK back box'
      },
      features: [
        'Twin UK sockets',
        '2 USB charging ports',
        'Smart charging technology',
        'Clean white finish',
        'Easy installation'
      ],
      stockStatus: 'in-stock',
      recommended: true,
      bestSeller: false,
      amazonFavourite: false
    },
    {
      id: '23',
      sku: 'STS-HEADLAMP-RECHARGEABLE',
      slug: 'led-headlamp-rechargeable',
      title: 'LED Headlamp - Rechargeable with Motion Sensor',
      shortDescription: 'Hands-free LED headlamp for work and outdoor activities',
      longDescription: 'Powerful rechargeable headlamp with motion sensor for hands-free control. Perfect for camping, hiking, DIY, and emergency use. Adjustable beam and comfortable fit.',
      category: 'Torches',
      subcategory: 'Headlamps',
      price: 17.99,
      rating: 4.5,
      reviewCount: 234,
      badges: ['Amazon Favourite'],
      images: ['headlamp-1.jpg', 'headlamp-2.jpg', 'headlamp-3.jpg'],
      specifications: {
        'Lumens': '800lm',
        'Battery': 'Rechargeable Li-ion',
        'Charging': 'USB',
        'Runtime': 'Up to 8 hours',
        'Modes': '5 (High, Med, Low, Strobe, Red)',
        'Motion Sensor': 'Yes',
        'Water Resistance': 'IPX4',
        'Adjustable': 'Yes (90° tilt)'
      },
      features: [
        '800 lumen bright output',
        'Motion sensor hands-free control',
        'USB rechargeable',
        '5 lighting modes',
        'Comfortable adjustable headband'
      ],
      stockStatus: 'in-stock',
      recommended: false,
      bestSeller: false,
      amazonFavourite: true
    },
    {
      id: '24',
      sku: 'STS-SURGE-PROTECTOR',
      slug: 'surge-protector-8-socket',
      title: 'Surge Protector 8 Socket with Master Switch',
      shortDescription: 'Professional surge protection for home office',
      longDescription: 'Protect your valuable electronics with this 8-socket surge protector. Individual switches, LED indicators, and master switch provide complete control and safety.',
      category: 'Electrical Accessories',
      subcategory: 'Surge Protectors',
      price: 22.99,
      rating: 4.8,
      reviewCount: 312,
      badges: ['Best Seller', 'Recommended'],
      images: ['surge-protector-1.jpg', 'surge-protector-2.jpg', 'surge-protector-3.jpg'],
      specifications: {
        'Sockets': '8',
        'Cable Length': '2m',
        'Surge Protection': 'Up to 2500 Joules',
        'Individual Switches': 'Yes with LEDs',
        'Master Switch': 'Yes',
        'Max Load': '13A / 3120W',
        'Safety Certified': 'BS 1363'
      },
      features: [
        '8 surge-protected sockets',
        'Individual LED-lit switches',
        'Master on/off control',
        'Protection up to 2500 Joules',
        'Heavy-duty 2m cable'
      ],
      stockStatus: 'in-stock',
      recommended: true,
      bestSeller: true,
      amazonFavourite: false
    }
  ];
  
  // Helper function to get products by category
  export function getProductsByCategory(category: string): Product[] {
    return products.filter(p => p.category === category);
  }
  
  // Helper function to get products by subcategory
  export function getProductsBySubcategory(subcategory: string): Product[] {
    return products.filter(p => p.subcategory === subcategory);
  }
  
  // Helper function to get product by slug
  export function getProductBySlug(slug: string): Product | undefined {
    return products.find(p => p.slug === slug);
  }
  
  // Helper function to get featured/recommended products
  export function getRecommendedProducts(limit: number = 8): Product[] {
    return products.filter(p => p.recommended).slice(0, limit);
  }
  
  // Helper function to get best sellers
  export function getBestSellers(limit: number = 8): Product[] {
    return products.filter(p => p.bestSeller).slice(0, limit);
  }
  
  // Helper function to get Amazon favourites
  export function getAmazonFavourites(limit: number = 8): Product[] {
    return products.filter(p => p.amazonFavourite).slice(0, limit);
  }
  
  // Get all unique categories
  export function getAllCategories(): string[] {
    const categories = new Set(products.map(p => p.category));
    return Array.from(categories);
  }
  
  // Get all unique subcategories
  export function getAllSubcategories(): string[] {
    const subcategories = new Set(products.map(p => p.subcategory));
    return Array.from(subcategories);
  }