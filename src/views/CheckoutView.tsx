import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, QrCode, Building, Banknote, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { CartItem, ActivePage, Order } from '../types';

interface CheckoutViewProps {
  cartItems: CartItem[];
  appliedDiscount: number;
  setActivePage: (page: ActivePage) => void;
  onOrderPlaced: (order: Order) => void;
  clearCart: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cartItems,
  appliedDiscount,
  setActivePage,
  onOrderPlaced,
  clearCart
}) => {
  // Form State
  const [fullName, setFullName] = useState('Ananya Sharma');
  const [email, setEmail] = useState('ananya.sharma@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [addressLine, setAddressLine] = useState('Apt 402, Lotus Garden Apartments, MG Road');
  const [city, setCity] = useState('Jaipur');
  const [state, setState] = useState('Rajasthan');
  const [pincode, setPincode] = useState('302001');

  // Payment Options: UPI | Card | Net Banking | COD
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Net Banking' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('ananya@okaxis');

  // Calculations
  const rawSubtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.product ? item.product.price : item.customDesign ? item.customDesign.calculatedPrice : 0;
    return acc + itemPrice * item.quantity;
  }, 0);

  const discountAmount = Math.round((rawSubtotal * appliedDiscount) / 100);
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  const shippingFee = subtotalAfterDiscount > 999 ? 0 : 99;
  const grandTotal = subtotalAfterDiscount + shippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !addressLine || !pincode) return;

    const orderNum = `TPD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      date: new Date().toISOString().split('T')[0],
      status: 'Order Placed',
      items: [...cartItems],
      totalAmount: grandTotal,
      discountAmount,
      shippingAmount: shippingFee,
      shippingAddress: {
        fullName,
        email,
        phone,
        addressLine,
        city,
        state,
        pincode
      },
      paymentMethod,
      trackingNumber: `DELHIERY-IN-${Math.floor(1000000 + Math.random() * 9000000)}`,
      courierName: 'Delhiery Express Air',
      estimatedDelivery: '3-5 Business Days',
      timeline: [
        { title: 'Order Placed', date: `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • Just now`, completed: true, current: true, description: 'Order confirmed & sent to artisan studio.' },
        { title: 'Hand-Painting & Varnish', date: 'Expected tomorrow', completed: false, description: 'Precision dot painting & waterproof topcoat.' },
        { title: 'Shipped with Express Courier', date: 'Expected in 2 days', completed: false, description: 'Package dispatched with Delhiery Air.' },
        { title: 'Delivered', date: 'Expected in 3-5 days', completed: false, description: 'Handed safely to recipient.' }
      ]
    };

    onOrderPlaced(newOrder);
    clearCart();
    setActivePage('order-success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EADCC9] pb-4">
        <button
          onClick={() => setActivePage('cart')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3E0A10] hover:text-[#9E4738]"
        >
          <ArrowLeft size={16} /> Return to Cart
        </button>
        <span className="font-marcellus text-xl font-bold text-[#3E0A10]">Secure Checkout</span>
        <div className="flex items-center gap-1 text-xs text-stone-500">
          <ShieldCheck size={16} className="text-[#D4AF37]" /> 256-Bit SSL
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Controls (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Customer Info */}
          <div className="bg-[#FDFBF7] p-6 rounded-3xl border border-[#EADCC9] shadow-sm space-y-4">
            <h3 className="font-marcellus text-base font-bold text-[#3E0A10] border-b border-[#EADCC9] pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#3E0A10] text-[#EED284] text-xs flex items-center justify-center font-bold">1</span>
              Customer Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full bg-[#F5EFE6] border border-[#EADCC9] rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#F5EFE6] border border-[#EADCC9] rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-stone-700 block mb-1">Phone Number (for Courier SMS updates)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-[#F5EFE6] border border-[#EADCC9] rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Address */}
          <div className="bg-[#FDFBF7] p-6 rounded-3xl border border-[#EADCC9] shadow-sm space-y-4">
            <h3 className="font-marcellus text-base font-bold text-[#3E0A10] border-b border-[#EADCC9] pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#3E0A10] text-[#EED284] text-xs flex items-center justify-center font-bold">2</span>
              Shipping Address
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Flat / House No. / Street Address</label>
                <input
                  type="text"
                  required
                  value={addressLine}
                  onChange={e => setAddressLine(e.target.value)}
                  className="w-full bg-[#F5EFE6] border border-[#EADCC9] rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full bg-[#F5EFE6] border border-[#EADCC9] rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="w-full bg-[#F5EFE6] border border-[#EADCC9] rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">PIN Code</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={e => setPincode(e.target.value)}
                    className="w-full bg-[#F5EFE6] border border-[#EADCC9] rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-[#FDFBF7] p-6 rounded-3xl border border-[#EADCC9] shadow-sm space-y-4">
            <h3 className="font-marcellus text-base font-bold text-[#3E0A10] border-b border-[#EADCC9] pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#3E0A10] text-[#EED284] text-xs flex items-center justify-center font-bold">3</span>
              Select Payment Method
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'UPI'
                    ? 'bg-[#3E0A10] text-[#EED284] border-[#D4AF37] shadow-md'
                    : 'bg-[#F5EFE6] text-stone-700 border-[#EADCC9]'
                }`}
              >
                <QrCode size={20} />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Card')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'Card'
                    ? 'bg-[#3E0A10] text-[#EED284] border-[#D4AF37] shadow-md'
                    : 'bg-[#F5EFE6] text-stone-700 border-[#EADCC9]'
                }`}
              >
                <CreditCard size={20} />
                <span>Credit/Debit</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Net Banking')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'Net Banking'
                    ? 'bg-[#3E0A10] text-[#EED284] border-[#D4AF37] shadow-md'
                    : 'bg-[#F5EFE6] text-stone-700 border-[#EADCC9]'
                }`}
              >
                <Building size={20} />
                <span>Net Banking</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('COD')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'COD'
                    ? 'bg-[#3E0A10] text-[#EED284] border-[#D4AF37] shadow-md'
                    : 'bg-[#F5EFE6] text-stone-700 border-[#EADCC9]'
                }`}
              >
                <Banknote size={20} />
                <span>Cash on Delivery</span>
              </button>
            </div>

            {/* Payment Sub-details */}
            <div className="bg-[#F5EFE6] p-4 rounded-xl border border-[#EADCC9] text-xs space-y-2">
              {paymentMethod === 'UPI' && (
                <div className="space-y-2">
                  <label className="font-bold text-[#3E0A10] block">Enter Virtual Payment Address (UPI ID)</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="e.g. mobile@upi"
                    className="w-full bg-[#FDFBF7] border border-[#EADCC9] rounded-xl px-3 py-2 text-xs"
                  />
                  <span className="text-[11px] text-stone-500 block">Supports Google Pay, PhonePe, Paytm, BHIM.</span>
                </div>
              )}

              {paymentMethod === 'Card' && (
                <div className="space-y-2">
                  <span className="font-bold text-[#3E0A10] block">Credit / Debit Card Details</span>
                  <input type="text" placeholder="Card Number (16 digits)" className="w-full bg-[#FDFBF7] border border-[#EADCC9] rounded-xl px-3 py-2 text-xs" />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="MM/YY" className="bg-[#FDFBF7] border border-[#EADCC9] rounded-xl px-3 py-2 text-xs" />
                    <input type="password" placeholder="CVV" className="bg-[#FDFBF7] border border-[#EADCC9] rounded-xl px-3 py-2 text-xs" />
                  </div>
                </div>
              )}

              {paymentMethod === 'Net Banking' && (
                <div className="space-y-2">
                  <span className="font-bold text-[#3E0A10] block">Select Your Bank</span>
                  <select className="w-full bg-[#FDFBF7] border border-[#EADCC9] rounded-xl px-3 py-2 text-xs">
                    <option>HDFC Bank</option>
                    <option>State Bank of India (SBI)</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                  </select>
                </div>
              )}

              {paymentMethod === 'COD' && (
                <p className="text-stone-700">
                  Pay cash to the Delhiery courier executive upon delivery. Please ensure exact change if possible.
                </p>
              )}
            </div>

          </div>

        </div>

        {/* Right Summary (4 Cols) */}
        <div className="lg:col-span-4 bg-[#FDFBF7] p-6 rounded-3xl border border-[#EADCC9] shadow-md space-y-6 sticky top-28">
          <h3 className="font-marcellus text-base font-bold text-[#3E0A10] border-b border-[#EADCC9] pb-3">
            Order Breakdown
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cartItems.map(item => {
              const unitPrice = item.product ? item.product.price : item.customDesign ? item.customDesign.calculatedPrice : 0;
              const name = item.product ? item.product.name : item.customDesign ? item.customDesign.title : 'Mandala Art';

              return (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <span className="text-stone-700 line-clamp-1 flex-1 pr-2">
                    {item.quantity}x {name}
                  </span>
                  <strong className="text-[#3E0A10]">₹{unitPrice * item.quantity}</strong>
                </div>
              );
            })}
          </div>

          <div className="space-y-2 text-xs border-t border-b border-[#EADCC9] py-3 text-stone-700 font-sans">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{rawSubtotal}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discount</span>
                <span>-₹{discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-base font-bold text-[#3E0A10]">
            <span>Total Payable</span>
            <span className="font-marcellus text-xl">₹{grandTotal}</span>
          </div>

          <button
            type="submit"
            className="w-full btn-gold py-4 rounded-full text-xs font-bold uppercase tracking-wider shadow-xl flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={16} /> Complete Order
          </button>
        </div>

      </form>

    </div>
  );
};
