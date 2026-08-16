import React, { useState } from 'react';
import { ShoppingBag, Trash2, Tag, ArrowRight, ShieldCheck, Sparkles, Plus } from 'lucide-react';
import { CartItem, ActivePage, Product } from '../types';
import { MandalaCanvas } from '../components/MandalaCanvas';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  setActivePage: (page: ActivePage) => void;
  allProducts: Product[];
  onAddToCart: (p: Product) => void;
  appliedDiscount: number;
  setAppliedDiscount: (discount: number) => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  setActivePage,
  allProducts,
  onAddToCart,
  appliedDiscount,
  setAppliedDiscount
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  // Calculations
  const rawSubtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.product ? item.product.price : item.customDesign ? item.customDesign.calculatedPrice : 0;
    return acc + itemPrice * item.quantity;
  }, 0);

  const discountAmount = Math.round((rawSubtotal * appliedDiscount) / 100);
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  const shippingFee = subtotalAfterDiscount > 999 || rawSubtotal === 0 ? 0 : 99;
  const grandTotal = subtotalAfterDiscount + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'MANDALA10') {
      setAppliedDiscount(10);
      setCouponMsg('✓ Coupon MANDALA10 Applied! 10% discount unlocked.');
    } else if (couponCode.trim().toUpperCase() === 'FIRST15') {
      setAppliedDiscount(15);
      setCouponMsg('✓ Coupon FIRST15 Applied! 15% discount unlocked.');
    } else {
      setCouponMsg('✕ Invalid Coupon Code. Try "MANDALA10" for 10% off.');
    }
  };

  // Add-on products (e.g. display stands)
  const addOns = allProducts.slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Banner */}
      <div className="bg-[#3E0A10] text-[#FDFBF7] p-8 rounded-3xl border border-[#D4AF37] shadow-xl text-center space-y-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-maroon-pattern opacity-30 pointer-events-none" />
        <span className="text-xs font-marcellus uppercase tracking-[0.25em] text-[#EED284] block font-semibold">
          Your Selection
        </span>
        <h1 className="font-marcellus text-3xl font-bold text-white">
          Shopping Cart ({cartItems.length} items)
        </h1>
        {rawSubtotal > 0 && rawSubtotal < 999 && (
          <p className="text-xs text-[#EED284]">
            Add ₹{999 - rawSubtotal} more for <strong>FREE Pan-India Shipping!</strong>
          </p>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-[#FDFBF7] rounded-3xl p-12 border border-[#EADCC9] text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F4ECE1] text-[#3E0A10] mx-auto flex items-center justify-center">
            <ShoppingBag size={28} />
          </div>
          <h3 className="font-marcellus text-xl font-bold text-[#3E0A10]">Your Shopping Cart is Empty</h3>
          <p className="text-xs text-stone-600">
            Browse our handmade dot mandala collections or create your own custom design to add items to your cart.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <button
              onClick={() => setActivePage('shop')}
              className="btn-gold px-6 py-2.5 rounded-full text-xs font-bold"
            >
              Shop Collection
            </button>
            <button
              onClick={() => setActivePage('customise')}
              className="btn-maroon px-6 py-2.5 rounded-full text-xs font-bold"
            >
              Custom Mandala Studio
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            {cartItems.map(item => {
              const isCustom = !!item.customDesign;
              const product = item.product;
              const custom = item.customDesign;
              const unitPrice = product ? product.price : custom ? custom.calculatedPrice : 0;
              const title = product ? product.name : custom ? custom.title : 'Mandala Art Item';

              return (
                <div
                  key={item.id}
                  className="bg-[#FDFBF7] p-4 sm:p-5 rounded-2xl border border-[#EADCC9] shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                >
                  <div className="flex gap-4 items-center flex-1">
                    {/* Thumbnail */}
                    {isCustom && custom ? (
                      <div className="w-20 h-20 rounded-xl bg-[#F4ECE1] border border-[#D4AF37] flex items-center justify-center shrink-0">
                        <MandalaCanvas design={custom} size={70} showShadow={false} />
                      </div>
                    ) : (
                      <img
                        src={product?.image}
                        alt={title}
                        className="w-20 h-20 rounded-xl object-cover border border-[#D4AF37]/30 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    <div className="space-y-1">
                      {isCustom ? (
                        <span className="text-[10px] font-bold text-[#EED284] bg-[#2A050A] px-2 py-0.5 rounded-full border border-[#D4AF37] inline-block">
                          ✨ Custom Mandala
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-[#9E4738] uppercase tracking-wider">
                          {product?.category}
                        </span>
                      )}

                      <h4 className="font-marcellus text-sm font-bold text-[#3E0A10]">{title}</h4>

                      {/* Custom Specs Details if applicable */}
                      {isCustom && custom && (
                        <p className="text-[11px] text-stone-600 font-sans leading-tight">
                          {custom.productType} ({custom.shape}) • {custom.baseColor.name} • {custom.patternStyle}
                          {custom.personalisationText && <span className="block text-[#9E4738] font-semibold">Text: "{custom.personalisationText}"</span>}
                        </p>
                      )}

                      <div className="font-marcellus text-sm font-bold text-[#3E0A10] pt-1">
                        ₹{unitPrice}
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Delete */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-[#EADCC9]">
                    <div className="flex items-center border border-[#D4AF37] rounded-full bg-[#F5EFE6] px-2 py-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-5 h-5 font-bold text-[#3E0A10] flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#3E0A10]">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-5 h-5 font-bold text-[#3E0A10] flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-marcellus text-sm font-bold text-[#3E0A10] block">
                        ₹{unitPrice * item.quantity}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors mt-1"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}

            {/* Recommended Add-ons */}
            <div className="bg-[#F4ECE1] p-5 rounded-2xl border border-[#D4AF37]/40 space-y-3">
              <h4 className="font-marcellus text-xs font-bold text-[#3E0A10] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#D4AF37]" /> Recommended Add-ons
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addOns.map(addon => (
                  <div key={addon.id} className="bg-[#FDFBF7] p-2.5 rounded-xl border border-[#EADCC9] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={addon.image} alt={addon.name} className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                      <div>
                        <h5 className="font-marcellus text-xs font-bold text-[#3E0A10] line-clamp-1">{addon.name}</h5>
                        <span className="text-xs text-stone-600">₹{addon.price}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onAddToCart(addon)}
                      className="p-1.5 bg-[#3E0A10] text-[#EED284] rounded-lg text-xs hover:bg-[#52121A]"
                      title="Add Addon"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Cart Summary (4 Cols) */}
          <div className="lg:col-span-4 bg-[#FDFBF7] p-6 rounded-3xl border border-[#EADCC9] shadow-md space-y-6 sticky top-28">
            <h3 className="font-marcellus text-base font-bold text-[#3E0A10] border-b border-[#EADCC9] pb-3">
              Order Summary
            </h3>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
                <Tag size={12} className="text-[#D4AF37]" /> Coupon / Discount Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. MANDALA10"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  className="flex-1 bg-[#F5EFE6] border border-[#EADCC9] rounded-xl px-3 py-2 text-xs focus:outline-none uppercase"
                />
                <button type="submit" className="btn-maroon px-4 py-2 rounded-xl text-xs font-bold">
                  Apply
                </button>
              </div>
              {couponMsg && (
                <p className={`text-[11px] font-semibold ${couponMsg.includes('✓') ? 'text-emerald-700' : 'text-red-600'}`}>
                  {couponMsg}
                </p>
              )}
            </form>

            {/* Line items */}
            <div className="space-y-2.5 text-xs text-stone-700 font-sans border-t border-b border-[#EADCC9] py-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{rawSubtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount ({appliedDiscount}%)</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="flex items-center justify-between text-sm">
              <span className="font-marcellus font-bold text-[#3E0A10]">Grand Total</span>
              <span className="font-marcellus text-xl font-bold text-[#3E0A10]">
                ₹{grandTotal}
              </span>
            </div>

            <button
              onClick={() => setActivePage('checkout')}
              className="w-full btn-gold py-3.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              Proceed to Checkout <ArrowRight size={16} />
            </button>

            <div className="text-[11px] text-stone-500 text-center flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck size={14} className="text-[#D4AF37]" /> Secure SSL Encrypted Checkout
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
