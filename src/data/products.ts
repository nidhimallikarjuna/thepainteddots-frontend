import { Product, Review, Order } from '../types';

import heroImg from '../assets/images/hero_mandala_art_1786175191554.jpg';
import coasterImg from '../assets/images/coaster_mandala_1786175202823.jpg';
import keychainImg from '../assets/images/keychain_mandala_1786175214520.jpg';
import magnetImg from '../assets/images/magnet_mandala_1786175226855.jpg';
import decorImg from '../assets/images/decor_mandala_1786175238323.jpg';

export const HERO_BANNER_IMAGE = heroImg;

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'cst-001',
    name: 'Royal Sapphire Dot Mandala Coaster Set (Set of 4)',
    category: 'Coasters',
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviewsCount: 42,
    image: coasterImg,
    additionalImages: [coasterImg, heroImg, decorImg],
    description: 'Intricately hand-painted set of 4 wooden coasters featuring royal sapphire blue, antique metallic gold, and pearl dot art. Sealed with waterproof heat-resistant gloss varnish for daily use.',
    material: 'Engineered Teak Wood, Waterproof Acrylic Paint, Epoxy Varnish',
    dimensions: '4.0 inches diameter x 0.25 inches thickness',
    careInstructions: 'Wipe clean with a soft damp cloth. Do not soak in water or place in dishwasher.',
    color: 'Royal Blue & Gold',
    designStyle: 'Traditional',
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    tags: ['Best Seller', 'Handmade', 'Gift Box Included']
  },
  {
    id: 'cst-002',
    name: 'Terracotta Sunburst Mandala Coasters (Set of 4)',
    category: 'Coasters',
    price: 799,
    originalPrice: 999,
    rating: 4.8,
    reviewsCount: 29,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
    additionalImages: [coasterImg],
    description: 'Warm terracotta base featuring radiant sunburst dot mandala patterns in ivory, copper, and deep maroon. Perfect for adding earth-toned warmth to modern dining tables.',
    material: 'High-density MDF Board, Gloss Varnish',
    dimensions: '3.8 inches x 3.8 inches square',
    careInstructions: 'Clean gently with moist cloth.',
    color: 'Terracotta & Copper',
    designStyle: 'Celestial',
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    tags: ['New Arrival', 'Earthy Tone']
  },
  {
    id: 'key-001',
    name: 'Gilded Lotus Dot Mandala Keychain',
    category: 'Keychains',
    price: 299,
    originalPrice: 399,
    rating: 5.0,
    reviewsCount: 56,
    image: keychainImg,
    additionalImages: [keychainImg, heroImg],
    description: 'A charming pocket piece! Hand-painted wooden circle keychain with vibrant ruby red, emerald, and gold lotus dot mandala motif. Comes with a heavy-duty antique brass keyring.',
    material: 'Birch Wood, Brass Keyring, Waterproof Acrylics',
    dimensions: '2.0 inches circle diameter',
    careInstructions: 'Keep away from sharp metal keys scratching the varnished face.',
    color: 'Ruby Red & Emerald',
    designStyle: 'Floral',
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    tags: ['Pocket Delight', 'Trending Gift']
  },
  {
    id: 'key-002',
    name: 'Celestial Moon Phase Mandala Keychain',
    category: 'Keychains',
    price: 349,
    originalPrice: 449,
    rating: 4.7,
    reviewsCount: 18,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    additionalImages: [keychainImg],
    description: 'Dark midnight navy base detailed with shimmering silver, white, and pale gold dot art illustrating celestial moon phase geometries.',
    material: 'Solid Mango Wood, Stainless Steel Hook',
    dimensions: '2.2 inches diameter',
    careInstructions: 'Wipe with microfiber cloth.',
    color: 'Navy & Gold',
    designStyle: 'Celestial',
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    tags: ['Celestial', 'Unisex']
  },
  {
    id: 'mag-001',
    name: 'Maroon & Gold Sacred Geometry Magnet Pair',
    category: 'Fridge Magnets',
    price: 399,
    originalPrice: 499,
    rating: 4.9,
    reviewsCount: 38,
    image: magnetImg,
    additionalImages: [magnetImg, heroImg],
    description: 'Set of 2 ceramic base fridge magnets painted in rich Indian maroon and gold dot art patterns with heavy neodymium magnet backings that firmly hold recipe cards and notes.',
    material: 'Ceramic Tile, Neodymium Magnet, High-Gloss Varnish',
    dimensions: '2.5 inches x 2.5 inches each',
    careInstructions: 'Wipe clean. Handle ceramic with care.',
    color: 'Maroon & Gold',
    designStyle: 'Geometric',
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    tags: ['Best Seller', 'Strong Magnet']
  },
  {
    id: 'mag-002',
    name: 'Pastel Meadow Blossom Mandala Magnets (Set of 3)',
    category: 'Fridge Magnets',
    price: 499,
    originalPrice: 649,
    rating: 4.8,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800',
    additionalImages: [magnetImg],
    description: 'Trio of mini mandala magnets in soft pastel pink, mint green, and creamy lavender dots over warm ivory base.',
    material: 'Wooden Disc, Rare Earth Magnet',
    dimensions: '2.0 inches diameter each',
    careInstructions: 'Wipe dry with clean cloth.',
    color: 'Pastel Multi',
    designStyle: 'Floral',
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    tags: ['Set of 3', 'Pastel Vibe']
  },
  {
    id: 'dec-001',
    name: 'Grand Heritage Lotus Mandala Wall/Table Decor',
    category: 'Home Decor',
    price: 2499,
    originalPrice: 3299,
    rating: 5.0,
    reviewsCount: 64,
    image: decorImg,
    additionalImages: [decorImg, heroImg, coasterImg],
    description: 'A showstopping 12-inch centerpiece! Hand-painted on premium teak wood board with thousands of precision acrylic dots in royal maroon, metallic gold, and pearl ivory. Includes both table stand and wall hook.',
    material: 'Solid Teak Wood Plaque, Brass Accents, Resin Topcoat',
    dimensions: '12.0 inches diameter x 0.5 inches thickness',
    careInstructions: 'Keep indoors away from direct outdoor rain. Dust gently with dry cloth.',
    color: 'Maroon, Gold & White',
    designStyle: 'Traditional',
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
    tags: ['Masterpiece', 'Free Stand Included']
  },
  {
    id: 'dec-002',
    name: 'Forest Emerald Harmony Mandala Plate',
    category: 'Home Decor',
    price: 1899,
    originalPrice: 2299,
    rating: 4.9,
    reviewsCount: 19,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800',
    additionalImages: [decorImg],
    description: 'Deep forest green wood plate adorned with mesmerizing concentric dot mandala artwork in gold, copper, and mint green.',
    material: 'Sheesham Wood, Protective Varnish',
    dimensions: '10.0 inches diameter',
    careInstructions: 'Dust off with feather duster.',
    color: 'Forest Green & Gold',
    designStyle: 'Geometric',
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
    tags: ['New Arrival', 'Statement Piece']
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Ananya Sharma',
    location: 'Mumbai, MH',
    rating: 5,
    date: '2026-07-28',
    title: 'Breathtaking detail & quality!',
    comment: 'The Royal Sapphire coaster set arrived in exquisite eco-friendly packaging. The gold varnish shines beautifully in daylight and the dot work is unbelievably precise! 100% ordering custom gifts for Diwali.',
    verifiedPurchase: true
  },
  {
    id: 'rev-02',
    author: 'Rohan Deshmukh',
    location: 'Bengaluru, KA',
    rating: 5,
    date: '2026-08-02',
    title: 'The Custom Mandala builder was so fun!',
    comment: 'I customized a 12" table decor with my wife’s initials for our anniversary. The physical art matches the online live preview flawlessly. Truly authentic Indian craftsmanship.',
    verifiedPurchase: true
  },
  {
    id: 'rev-03',
    author: 'Priya Nair',
    location: 'Kochi, KL',
    rating: 5,
    date: '2026-08-04',
    title: 'Stunning magnets for my fridge',
    comment: 'Heavy duty magnets that don’t slip, and the dot art makes my kitchen feel like an art gallery. Fast delivery too!',
    verifiedPurchase: true
  }
];

export const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ord-8832',
    orderNumber: 'TPD-2026-8832',
    date: '2026-08-05',
    status: 'Shipped',
    items: [
      {
        id: 'item-1',
        product: INITIAL_PRODUCTS[0],
        quantity: 1
      },
      {
        id: 'item-2',
        product: INITIAL_PRODUCTS[2],
        quantity: 2
      }
    ],
    totalAmount: 1497,
    discountAmount: 150,
    shippingAmount: 0,
    shippingAddress: {
      fullName: 'Aarav Mehta',
      email: 'aarav.m@example.com',
      phone: '+91 98765 43210',
      addressLine: '402 Sunset Towers, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050'
    },
    paymentMethod: 'UPI',
    trackingNumber: 'DELHIERY-IN-9948201',
    courierName: 'Delhiery Express Air',
    estimatedDelivery: 'Aug 10, 2026',
    timeline: [
      { title: 'Order Placed', date: 'Aug 5, 2026 • 10:30 AM', completed: true, description: 'Order confirmed & sent to studio studio.' },
      { title: 'Hand-Painting & Varnish', date: 'Aug 6, 2026 • 02:15 PM', completed: true, description: 'Artisan dot painting & protective topcoat applied.' },
      { title: 'Shipped with Express Courier', date: 'Aug 7, 2026 • 09:00 AM', completed: true, current: true, description: 'Package handed to Delhiery courier hub.' },
      { title: 'Out for Delivery', date: 'Estimated Aug 10', completed: false, description: 'Arriving at your doorstep.' },
      { title: 'Delivered', date: 'Estimated Aug 10', completed: false, description: 'Handed to recipient.' }
    ]
  }
];

export const INSTAGRAM_GALLERY_PHOTOS = [
  {
    id: 'ig-1',
    image: heroImg,
    caption: 'Sunlit morning coffee with our Sapphire Dot Coaster ✨ #ThePaintedDots',
    likes: '482'
  },
  {
    id: 'ig-2',
    image: coasterImg,
    caption: 'Close up of 3,200 individual hand-painted dots on solid teak wood 🎨',
    likes: '891'
  },
  {
    id: 'ig-3',
    image: decorImg,
    caption: 'Grand Heritage Centerpiece sitting pretty in @priya_home_decor corner 🌿',
    likes: '624'
  },
  {
    id: 'ig-4',
    image: magnetImg,
    caption: 'Fridge makeover with our terracotta & maroon dot magnets! 💖',
    likes: '310'
  },
  {
    id: 'ig-5',
    image: keychainImg,
    caption: 'Gilded Lotus keychain making key fobs look royal 🔑',
    likes: '512'
  }
];

export const BEST_SELLERS = INITIAL_PRODUCTS.filter(p => p.isBestSeller);

