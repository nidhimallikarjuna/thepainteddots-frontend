import React from 'react';
import { Heart, Eye, Star, ShoppingBag } from 'lucide-react';
import { Product, ActivePage } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  setActivePage: (page: ActivePage) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
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
        type="button"
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
            <Eye size={14} /> View Details
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
            type="button"
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
