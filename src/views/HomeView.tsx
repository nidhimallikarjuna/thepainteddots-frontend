import React from 'react';
import { Sparkles, ArrowRight, ShoppingBag, Paintbrush, Heart, Eye, Star, CheckCircle2 } from 'lucide-react';
import { Product, ProductCategory, ActivePage } from '../types';
import { HERO_BANNER_IMAGE, BEST_SELLERS } from '../data/products';
import { Logo } from '../components/Logo';
import coasterImg from '../assets/images/coaster_mandala_1786175202823.jpg';
import keychainImg from '../assets/images/keychain_mandala_1786175214520.jpg';
import magnetImg from '../assets/images/magnet_mandala_1786175226855.jpg';
import decorImg from '../assets/images/decor_mandala_1786175238323.jpg';

interface HomeViewProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onSelectCategory: (category: ProductCategory) => void;
  setActivePage: (page: ActivePage) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onSelectCategory,
  setActivePage
}) => {
  const categories: { name: string; catName: ProductCategory; image: string; count: string }[] = [
    {
      name: 'Coasters',
      catName: 'Coasters',
      image: coasterImg,
      count: 'Set of 3 & Set of 4'
    },
    {
      name: 'Keychains',
      catName: 'Keychains',
      image: keychainImg,
      count: 'Wooden & Acrylic'
    },
    {
      name: 'Fridge Magnets',
      catName: 'Fridge Magnets',
      image: magnetImg,
      count: 'Mini Mandala Badges'
    },
    {
      name: 'Table Decor',
      catName: 'Home Decor',
      image: decorImg,
      count: 'Plates & Wall Accents'
    }
  ];

  const customerReviews = [
    {
      id: 1,
      author: 'Ananya S., Bangalore',
      comment: 'The coaster set arrived beautifully packaged. Every dot is so sharp and clean! The gloss finish is truly waterproof.',
      rating: 5,
      date: '2 days ago',
      title: 'Exquisite Artisan Craftsmanship'
    },
    {
      id: 2,
      author: 'Pooja M., Mumbai',
      comment: 'Ordered custom fridge magnets for my coffee station. The burgundy and sand gold color palette matches my decor perfectly!',
      rating: 5,
      date: '1 week ago',
      title: 'Stunning Color Vibrancy'
    },
    {
      id: 3,
      author: 'Rohan K., Delhi',
      comment: 'Gifted a set of 4 mandala coasters for a housewarming. Everyone asked where I got them! So glad to support two local friends.',
      rating: 5,
      date: '2 weeks ago',
      title: 'Perfect Gifting Option'
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#560B18] text-[#F2E5C6] overflow-hidden border-b-2 border-[#75162D]">
        <div className="absolute inset-0 bg-maroon-pattern opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3B010B] border border-[#F2D9A0]/40 text-[#F2D9A0] text-xs font-semibold uppercase tracking-widest">
                <Sparkles size={14} className="text-[#F2D9A0]" />
                Handmade Mandala Art Studio • Bangalore
              </div>

              <h1 className="font-marcellus text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F2E5C6] leading-tight tracking-tight">
                Handmade Mandala Art for <span className="text-[#F2D9A0]">Everyday Spaces</span>
              </h1>

              <p className="text-sm sm:text-base text-[#F2E5C6]/90 leading-relaxed max-w-2xl font-sans font-normal">
                Welcome to <strong>The Painted Dot</strong>. Founded in Bangalore by Riya, we create handmade mandala coasters, keychains, fridge magnets, and home decor — each painted dot-by-dot to bring colour and character into your home.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => setActivePage('shop')}
                  className="w-full sm:w-auto btn-sand-gold px-8 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 shadow-lg group transition-all"
                >
                  <ShoppingBag size={18} />
                  Shop Collection
                </button>

                <button
                  onClick={() => setActivePage('customise')}
                  className="w-full sm:w-auto btn-burgundy px-8 py-3.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2 border-[#F2D9A0]/50"
                >
                  <Paintbrush size={18} className="text-[#F2D9A0]" />
                  Customise Your Own
                </button>
              </div>

              {/* Trust Badge Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-2 border-t border-[#75162D] text-xs text-[#F2E5C6]/80">
                <div>
                  <span className="block font-marcellus text-lg font-bold text-[#F2D9A0]">100%</span>
                  <span className="text-[11px] opacity-80">Hand-painted dots</span>
                </div>
                <div>
                  <span className="block font-marcellus text-lg font-bold text-[#F2D9A0]">4.9★</span>
                  <span className="text-[11px] opacity-80">Customer rating</span>
                </div>
                <div>
                  <span className="block font-marcellus text-lg font-bold text-[#F2D9A0]">Waterproof</span>
                  <span className="text-[11px] opacity-80">Gloss topcoat</span>
                </div>
              </div>

            </div>

            {/* Right Hero Logo / Image Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md p-4 rounded-3xl bg-[#3B010B] border-2 border-[#F2D9A0]/50 shadow-2xl text-center space-y-4">
                
                <div className="w-full rounded-2xl overflow-hidden bg-[#560B18] border border-[#75162D]">
                  <img
                    src={HERO_BANNER_IMAGE}
                    alt="Handmade Mandala Art Showcase"
                    className="w-full h-72 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Floating Brand Badge */}
                <div className="bg-[#75162D] border border-[#F2D9A0] rounded-2xl p-3 shadow-lg flex items-center justify-center gap-3">
                  <Logo />
                  <div className="text-left">
                    <span className="font-marcellus text-sm font-bold text-[#F2D9A0] block">
                      Every Dot Has A Story
                    </span>
                    <span className="text-[11px] text-[#F2E5C6]">
                      Handmade in Bangalore by Riya
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-marcellus uppercase tracking-[0.2em] text-[#75162D] font-bold block">
            Discover Our Studio
          </span>
          <h2 className="font-marcellus text-2xl sm:text-4xl font-bold text-[#3B010B]">
            Shop By Category
          </h2>
          <div className="w-16 h-1 bg-[#75162D] mx-auto rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(cat => (
            <div
              key={cat.name}
              onClick={() => {
                onSelectCategory(cat.catName);
                setActivePage('shop');
              }}
              className="group cursor-pointer flex flex-col items-center bg-[#FFFDF9] p-5 rounded-2xl border border-[#F2D9A0] hover:border-[#75162D] hover:shadow-lg transition-all duration-300"
            >
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-[#F2D9A0] border border-[#75162D]/30 shadow-xs group-hover:scale-105 transition-transform duration-300 overflow-hidden mb-4">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#560B18]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <h3 className="font-marcellus text-base font-bold text-[#3B010B] group-hover:text-[#75162D] transition-colors">
                {cat.name}
              </h3>
              <span className="text-xs text-[#75162D] mt-0.5 font-sans font-medium">
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CUSTOMISE YOUR OWN MANDALA FEATURE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#3B010B] text-[#F2E5C6] rounded-3xl p-8 sm:p-12 border-2 border-[#75162D] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#75162D] border border-[#F2D9A0]/50 text-[#F2D9A0] text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} className="text-[#F2D9A0]" /> Custom Orders
            </div>
            <h2 className="font-marcellus text-2xl sm:text-4xl font-bold text-[#F2E5C6]">
              Customise Your Own Mandala
            </h2>
            <p className="text-xs sm:text-sm text-[#F2E5C6]/90 leading-relaxed">
              Have a specific color scheme or motif in mind? Choose your product type, pick any colors you like for your palette, pattern styling (Floral, Geometric, Traditional), and custom initials. Hand-painted specially for you by Riya!
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActivePage('customise')}
                className="btn-sand-gold px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 mx-auto md:mx-0 shadow-md"
              >
                Customise Your Mandala <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full border-4 border-[#F2D9A0] p-3 bg-[#560B18] flex items-center justify-center shadow-inner group">
            <div className="w-full h-full rounded-full border border-dashed border-[#F2D9A0] flex flex-col items-center justify-center text-center p-4 bg-[#75162D]">
              <Paintbrush size={36} className="text-[#F2D9A0] mb-2 group-hover:rotate-12 transition-transform" />
              <span className="font-marcellus text-xs font-bold text-[#F2D9A0] tracking-wider uppercase">
                Pick Your Theme & Style
              </span>
              <span className="text-[10px] text-[#F2E5C6] mt-1">Starting from ₹299</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 border-b border-[#F2D9A0] pb-4">
          <div>
            <span className="text-xs font-marcellus uppercase tracking-[0.2em] text-[#75162D] font-bold block">
              Most Loved
            </span>
            <h2 className="font-marcellus text-2xl sm:text-3xl font-bold text-[#3B010B]">
              Best Sellers
            </h2>
          </div>
          <button
            onClick={() => setActivePage('shop')}
            className="text-xs font-bold text-[#75162D] hover:text-[#3B010B] flex items-center gap-1 uppercase tracking-wider transition-colors"
          >
            View All <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BEST_SELLERS.map(product => (
            <ProductCardKey
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
              setActivePage={setActivePage}
            />
          ))}
        </div>
      </section>

      {/* 5. ABOUT THE PAINTED DOT - Exact Requested Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-12 border-2 border-[#F2D9A0] shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-3xl overflow-hidden border-2 border-[#75162D] p-3 bg-[#560B18] shadow-lg text-center text-white">
              <img
                src={HERO_BANNER_IMAGE}
                alt="Riya's Art Studio"
                className="w-full h-64 object-cover rounded-2xl mb-4"
                referrerPolicy="no-referrer"
              />
              <div className="flex items-center justify-center gap-2">
                <Logo />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="text-xs font-marcellus uppercase tracking-widest text-[#75162D] font-bold block">
              Our Story
            </span>
            <h2 className="font-marcellus text-2xl sm:text-3xl font-bold text-[#3B010B]">
              About The Painted Dot
            </h2>
            
            <p className="text-sm text-[#3B010B] font-bold leading-relaxed">
              The Painted Dot started with one artist and a deep love for creativity.
            </p>

            <p className="text-xs sm:text-sm text-[#560B18] leading-relaxed">
              Based in Bangalore, Riya turned her love for mandala art into a full-time creative studio, hand-painting every single piece herself.
            </p>

            <p className="text-xs sm:text-sm text-[#560B18] leading-relaxed">
              What started as a simple idea became a little creative venture where art meets everyday life. Riya makes handmade mandala coasters, keychains, fridge magnets, and home decor, each created to bring a little colour and character into your space.
            </p>

            <div className="p-3.5 bg-[#F2E5C6] border-l-4 border-[#75162D] rounded-r-xl text-xs font-bold text-[#3B010B]">
              Every piece is handmade. Every dot has a story.
            </div>

            <p className="text-xs sm:text-sm text-[#75162D] font-semibold italic">
              Welcome to our little world of dots. 🎨
            </p>

            <div className="pt-2">
              <button
                onClick={() => setActivePage('about')}
                className="btn-burgundy px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
              >
                Read Full About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-marcellus uppercase tracking-[0.2em] text-[#75162D] font-bold block">
            Love From Collectors
          </span>
          <h2 className="font-marcellus text-2xl sm:text-4xl font-bold text-[#3B010B]">
            Customer Reviews
          </h2>
          <div className="w-16 h-1 bg-[#75162D] mx-auto rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {customerReviews.map(review => (
            <div
              key={review.id}
              className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#F2D9A0] shadow-xs space-y-3 relative"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#75162D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#75162D]" />
                  ))}
                </div>
                <span className="text-[10px] text-[#560B18]/70">{review.date}</span>
              </div>
              <h4 className="font-marcellus text-sm font-bold text-[#3B010B]">{review.title}</h4>
              <p className="text-xs text-[#560B18] leading-relaxed italic">"{review.comment}"</p>
              <div className="pt-3 border-t border-[#F2D9A0] flex items-center justify-between text-xs">
                <span className="font-bold text-[#3B010B]">{review.author}</span>
                <span className="text-[10px] text-[#75162D] bg-[#F2D9A0]/40 px-2 py-0.5 rounded-full font-medium">
                  Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

/* Product Card Helper */
const ProductCardKey: React.FC<{
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  setActivePage: (page: ActivePage) => void;
}> = ({
  product,
  onSelect,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  setActivePage
}) => {
  return (
    <div className="bg-[#FFFDF9] rounded-2xl border border-[#F2D9A0] hover:border-[#75162D] shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group relative">
      
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.isBestSeller && (
          <span className="bg-[#3B010B] text-[#F2D9A0] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
            Best Seller
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product);
        }}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs border border-[#F2D9A0] flex items-center justify-center text-[#3B010B] hover:text-[#75162D] hover:scale-110 transition-all shadow-xs"
        title="Save to Wishlist"
      >
        <Heart size={16} className={isWishlisted ? 'fill-[#75162D] text-[#75162D]' : ''} />
      </button>

      {/* Image Container */}
      <div
        onClick={() => {
          onSelect(product);
          setActivePage('product-detail');
        }}
        className="w-full h-56 bg-[#560B18] overflow-hidden cursor-pointer relative"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-[#3B010B] text-[#F2D9A0] text-xs font-bold px-4 py-2 rounded-full border border-[#F2D9A0] flex items-center gap-1.5 shadow-md">
            <Eye size={14} /> View Item
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#75162D]">
            {product.category}
          </span>
          <h3
            onClick={() => {
              onSelect(product);
              setActivePage('product-detail');
            }}
            className="font-marcellus text-sm font-bold text-[#3B010B] hover:text-[#75162D] cursor-pointer line-clamp-1 mt-0.5"
          >
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mt-1 text-xs text-[#560B18]">
            <div className="flex items-center text-[#75162D]">
              <Star size={12} className="fill-[#75162D]" />
              <span className="font-bold ml-1 text-[#3B010B]">{product.rating}</span>
            </div>
            <span>({product.reviewsCount})</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#F2D9A0]">
          <div>
            <span className="font-marcellus text-base font-bold text-[#3B010B]">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#560B18]/60 line-through ml-1.5">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="btn-burgundy px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-xs"
          >
            <ShoppingBag size={12} /> Add
          </button>
        </div>
      </div>

    </div>
  );
};
