import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product, ActivePage } from '../types';

interface WishlistViewProps {
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  setActivePage: (page: ActivePage) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  setActivePage,
  onSelectProduct
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Banner */}
      <div className="bg-[#3E0A10] text-[#FDFBF7] p-8 rounded-3xl border border-[#D4AF37] shadow-xl text-center space-y-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-maroon-pattern opacity-30 pointer-events-none" />
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2A050A] border border-[#D4AF37] text-[#EED284] text-xs font-bold uppercase tracking-widest">
          <Heart size={14} className="fill-[#D4AF37]" /> Saved Favorites
        </div>
        <h1 className="font-marcellus text-3xl font-bold text-white">
          My Saved Wishlist
        </h1>
        <p className="text-xs sm:text-sm text-stone-200">
          Your saved handmade dot mandala products. Move them directly to your cart whenever you're ready!
        </p>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="bg-[#FDFBF7] rounded-3xl p-12 border border-[#EADCC9] text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F4ECE1] text-[#9E4738] mx-auto flex items-center justify-center">
            <Heart size={28} />
          </div>
          <h3 className="font-marcellus text-xl font-bold text-[#3E0A10]">Your Wishlist is Empty</h3>
          <p className="text-xs text-stone-600">
            Explore our handmade mandala coasters, magnets, keychains, and home decor to save your favorite designs!
          </p>
          <button
            onClick={() => setActivePage('shop')}
            className="btn-gold px-8 py-3 rounded-full text-xs font-bold inline-flex items-center gap-2"
          >
            Explore Shop <ArrowRight size={14} />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map(product => (
            <div
              key={product.id}
              className="bg-[#FDFBF7] rounded-2xl border border-[#EADCC9] hover:border-[#D4AF37] shadow-sm hover:shadow-lg transition-all p-4 flex gap-4 items-center relative"
            >
              <img
                src={product.image}
                alt={product.name}
                onClick={() => {
                  onSelectProduct(product);
                  setActivePage('product-detail');
                }}
                className="w-24 h-24 rounded-xl object-cover border border-[#D4AF37]/30 cursor-pointer"
                referrerPolicy="no-referrer"
              />

              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-bold text-[#9E4738] uppercase tracking-wider">{product.category}</span>
                <h4
                  onClick={() => {
                    onSelectProduct(product);
                    setActivePage('product-detail');
                  }}
                  className="font-marcellus text-sm font-bold text-[#3E0A10] line-clamp-1 cursor-pointer hover:text-[#9E4738]"
                >
                  {product.name}
                </h4>
                <div className="font-marcellus text-sm font-bold text-[#3E0A10]">
                  ₹{product.price}
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="btn-gold px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1"
                  >
                    <ShoppingBag size={12} /> Add to Cart
                  </button>

                  <button
                    onClick={() => onRemoveFromWishlist(product)}
                    className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
