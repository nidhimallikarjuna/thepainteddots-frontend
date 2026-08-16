import React from 'react';
import { CheckCircle2, Package, Truck, ArrowRight, Home, Sparkles } from 'lucide-react';
import { Order, ActivePage } from '../types';

interface OrderSuccessViewProps {
  order: Order | null;
  setActivePage: (page: ActivePage) => void;
  onTrackOrder: (order: Order) => void;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({
  order,
  setActivePage,
  onTrackOrder
}) => {
  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-marcellus text-2xl font-bold text-[#3E0A10]">No Recent Order Found</h2>
        <button onClick={() => setActivePage('home')} className="btn-gold px-6 py-2.5 rounded-full text-xs font-bold">
          Go To Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 text-center">
      
      {/* Animated Checkmark Badge */}
      <div className="w-20 h-20 rounded-full bg-[#3E0A10] border-4 border-[#D4AF37] text-[#EED284] mx-auto flex items-center justify-center shadow-xl animate-bounce">
        <CheckCircle2 size={42} />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles size={14} /> Order Confirmed
        </div>
        <h1 className="font-marcellus text-3xl sm:text-4xl font-bold text-[#3E0A10]">
          Thank You For Your Order!
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          We have received your order <strong>#{order.orderNumber}</strong>. Our Jaipur studio artisans are preparing your hand-painted mandala art pieces.
        </p>
      </div>

      {/* Order Summary Details Box */}
      <div className="bg-[#FDFBF7] p-6 rounded-3xl border-2 border-[#D4AF37]/50 shadow-md text-left space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#EADCC9] pb-3 text-xs gap-2">
          <div>
            <span className="text-stone-500 block">Order Number:</span>
            <strong className="font-marcellus text-sm font-bold text-[#3E0A10]">{order.orderNumber}</strong>
          </div>
          <div>
            <span className="text-stone-500 block">Est. Delivery:</span>
            <strong className="text-emerald-700 font-bold">{order.estimatedDelivery}</strong>
          </div>
          <div>
            <span className="text-stone-500 block">Tracking Number:</span>
            <strong className="text-[#3E0A10]">{order.trackingNumber}</strong>
          </div>
        </div>

        {/* Address */}
        <div className="text-xs space-y-1">
          <span className="text-stone-500 block font-bold uppercase tracking-wider">Shipping To:</span>
          <p className="text-stone-800">
            <strong>{order.shippingAddress.fullName}</strong> • {order.shippingAddress.addressLine}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
          </p>
        </div>

        {/* Items */}
        <div className="space-y-2 border-t border-[#EADCC9] pt-3">
          <span className="text-stone-500 block font-bold uppercase tracking-wider text-xs">Ordered Items:</span>
          {order.items.map((item, i) => {
            const unitPrice = item.product ? item.product.price : item.customDesign ? item.customDesign.calculatedPrice : 0;
            const name = item.product ? item.product.name : item.customDesign ? item.customDesign.title : 'Custom Mandala';

            return (
              <div key={i} className="flex justify-between text-xs text-stone-800">
                <span>{item.quantity}x {name}</span>
                <strong>₹{unitPrice * item.quantity}</strong>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between text-sm font-bold text-[#3E0A10] border-t border-[#EADCC9] pt-3">
          <span>Total Paid ({order.paymentMethod}):</span>
          <span className="font-marcellus text-base">₹{order.totalAmount}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          onClick={() => {
            onTrackOrder(order);
            setActivePage('tracking');
          }}
          className="w-full sm:w-auto btn-gold px-8 py-3.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
        >
          <Truck size={16} /> Track Order Progress
        </button>

        <button
          onClick={() => setActivePage('home')}
          className="w-full sm:w-auto btn-maroon px-8 py-3.5 rounded-full text-xs font-bold flex items-center justify-center gap-2"
        >
          <Home size={16} /> Continue Shopping
        </button>
      </div>

    </div>
  );
};
