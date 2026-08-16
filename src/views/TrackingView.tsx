import React, { useState } from 'react';
import { Truck, CheckCircle2, Search, MapPin, Package, Clock, ShieldCheck, PhoneCall } from 'lucide-react';
import { Order } from '../types';

interface TrackingViewProps {
  currentOrder: Order | null;
  allOrders: Order[];
}

export const TrackingView: React.FC<TrackingViewProps> = ({
  currentOrder,
  allOrders
}) => {
  const [searchOrderNo, setSearchOrderNo] = useState(currentOrder?.orderNumber || 'TPD-2026-8832');
  const [activeOrder, setActiveOrder] = useState<Order | null>(
    currentOrder || allOrders[0] || null
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = allOrders.find(
      o => o.orderNumber.toLowerCase() === searchOrderNo.trim().toLowerCase() ||
           o.trackingNumber.toLowerCase() === searchOrderNo.trim().toLowerCase()
    );

    if (found) {
      setActiveOrder(found);
    } else {
      alert(`No order found matching "${searchOrderNo}". Please check your Order Number.`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="bg-[#3E0A10] text-[#FDFBF7] p-8 rounded-3xl border border-[#D4AF37] shadow-xl text-center space-y-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-maroon-pattern opacity-30 pointer-events-none" />
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2A050A] border border-[#D4AF37] text-[#EED284] text-xs font-bold uppercase tracking-widest">
          <Truck size={14} /> Express Courier Tracking
        </div>
        <h1 className="font-marcellus text-3xl font-bold text-white">
          Track Your Mandala Order
        </h1>
        <p className="text-xs sm:text-sm text-stone-200 max-w-md mx-auto">
          Enter your Order Number (e.g. TPD-2026-8832) or AWB Tracking Code to check live dispatch and delivery updates.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2 pt-2 relative z-10">
          <input
            type="text"
            value={searchOrderNo}
            onChange={e => setSearchOrderNo(e.target.value)}
            placeholder="Order # or Tracking ID"
            required
            className="flex-1 bg-[#FDFBF7] text-[#3E0A10] border border-[#D4AF37] rounded-full px-4 py-2.5 text-xs font-bold focus:outline-none"
          />
          <button type="submit" className="btn-gold px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5">
            <Search size={14} /> Track
          </button>
        </form>
      </div>

      {/* Tracking Details */}
      {activeOrder ? (
        <div className="bg-[#FDFBF7] p-6 sm:p-10 rounded-3xl border-2 border-[#D4AF37]/50 shadow-lg space-y-8">
          
          {/* Order Header Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pb-6 border-b border-[#EADCC9] text-xs">
            <div>
              <span className="text-stone-500 block uppercase tracking-wider font-bold">Order Number</span>
              <strong className="font-marcellus text-sm text-[#3E0A10]">{activeOrder.orderNumber}</strong>
            </div>

            <div>
              <span className="text-stone-500 block uppercase tracking-wider font-bold">Courier Carrier</span>
              <strong className="text-[#3E0A10]">{activeOrder.courierName}</strong>
            </div>

            <div>
              <span className="text-stone-500 block uppercase tracking-wider font-bold">Tracking AWB</span>
              <strong className="text-[#3E0A10]">{activeOrder.trackingNumber}</strong>
            </div>

            <div>
              <span className="text-stone-500 block uppercase tracking-wider font-bold">Est. Delivery Date</span>
              <strong className="text-emerald-700 font-bold">{activeOrder.estimatedDelivery}</strong>
            </div>
          </div>

          {/* Progress Timeline: Order Placed → Processing → Shipped → Delivered */}
          <div className="space-y-6">
            <h3 className="font-marcellus text-base font-bold text-[#3E0A10] flex items-center gap-2">
              <Clock size={18} className="text-[#D4AF37]" /> Shipment Progress Timeline
            </h3>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#D4AF37]/30">
              {activeOrder.timeline.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  
                  {/* Step Dot Icon */}
                  <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.completed
                      ? 'bg-[#3E0A10] text-[#EED284] border-2 border-[#D4AF37]'
                      : 'bg-[#F4ECE1] text-stone-400 border border-stone-300'
                  }`}>
                    {step.completed ? '✓' : idx + 1}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-marcellus text-xs sm:text-sm font-bold ${step.completed ? 'text-[#3E0A10]' : 'text-stone-400'}`}>
                        {step.title}
                      </h4>
                      {step.current && (
                        <span className="bg-[#D4AF37] text-[#2A050A] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase animate-pulse">
                          Current Status
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-stone-500 block">{step.date}</span>
                    <p className="text-xs text-stone-600 font-sans">{step.description}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address & Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-[#EADCC9] text-xs">
            <div className="bg-[#F5EFE6] p-4 rounded-2xl border border-[#EADCC9]">
              <span className="font-bold text-[#3E0A10] block mb-1 flex items-center gap-1.5 uppercase tracking-wider">
                <MapPin size={14} className="text-[#D4AF37]" /> Shipping Destination
              </span>
              <p className="text-stone-700">
                <strong>{activeOrder.shippingAddress.fullName}</strong> ({activeOrder.shippingAddress.phone})<br />
                {activeOrder.shippingAddress.addressLine}, {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state} - {activeOrder.shippingAddress.pincode}
              </p>
            </div>

            <div className="bg-[#F5EFE6] p-4 rounded-2xl border border-[#EADCC9] space-y-1">
              <span className="font-bold text-[#3E0A10] block uppercase tracking-wider flex items-center gap-1.5">
                <PhoneCall size={14} className="text-[#D4AF37]" /> Courier Helpdesk
              </span>
              <p className="text-stone-600">Need delivery changes or address redirection?</p>
              <a href="mailto:support@thepainteddots.com" className="text-[#9E4738] font-bold hover:underline block pt-1">
                Email Studio Support: support@thepainteddots.com
              </a>
            </div>
          </div>

        </div>
      ) : (
        <div className="bg-[#FDFBF7] p-12 rounded-3xl border border-[#EADCC9] text-center space-y-3">
          <p className="text-xs text-stone-500">No active tracking data loaded. Search above using your Order ID.</p>
        </div>
      )}

    </div>
  );
};
