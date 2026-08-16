import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  Sparkles, 
  MapPin, 
  Settings, 
  ChevronRight, 
  Truck, 
  Eye, 
  Trash2,
  Paintbrush
} from 'lucide-react';
import { Order, CustomMandalaDesign, Product, ActivePage } from '../types';
import { MandalaCanvas } from '../components/MandalaCanvas';

interface UserDashboardViewProps {
  orders: Order[];
  savedDesigns: CustomMandalaDesign[];
  wishlistProducts: Product[];
  setActivePage: (page: ActivePage) => void;
  onTrackOrder: (order: Order) => void;
  onAddCustomToCart: (design: CustomMandalaDesign) => void;
  onDeleteSavedDesign: (id: string) => void;
}

export const UserDashboardView: React.FC<UserDashboardViewProps> = ({
  orders,
  savedDesigns,
  wishlistProducts,
  setActivePage,
  onTrackOrder,
  onAddCustomToCart,
  onDeleteSavedDesign
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'wishlist' | 'designs' | 'addresses' | 'settings'>('overview');

  const recentOrder = orders[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-[#3E0A10] text-[#FDFBF7] p-8 rounded-3xl border border-[#D4AF37] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-maroon-pattern opacity-30 pointer-events-none" />
        <div className="space-y-1 text-center md:text-left relative z-10">
          <span className="text-xs font-marcellus uppercase tracking-[0.25em] text-[#EED284]">
            Customer Account Studio
          </span>
          <h1 className="font-marcellus text-2xl sm:text-3xl font-bold text-white">
            Welcome Back, Ananya Sharma!
          </h1>
          <p className="text-xs text-stone-200">
            Manage your mandala orders, track shipments, and access your custom design collection.
          </p>
        </div>

        <button
          onClick={() => setActivePage('customise')}
          className="btn-gold px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg relative z-10"
        >
          <Paintbrush size={14} /> Create New Custom Mandala
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Navigation (3 Cols) */}
        <aside className="lg:col-span-3 bg-[#FDFBF7] p-4 rounded-3xl border border-[#EADCC9] shadow-sm space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors ${
              activeTab === 'overview' ? 'bg-[#3E0A10] text-[#EED284]' : 'text-stone-700 hover:bg-[#F4ECE1]'
            }`}
          >
            <span className="flex items-center gap-2">
              <User size={16} /> Overview Dashboard
            </span>
            <ChevronRight size={14} />
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors ${
              activeTab === 'orders' ? 'bg-[#3E0A10] text-[#EED284]' : 'text-stone-700 hover:bg-[#F4ECE1]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Package size={16} /> My Orders ({orders.length})
            </span>
            <ChevronRight size={14} />
          </button>

          <button
            onClick={() => setActiveTab('designs')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors ${
              activeTab === 'designs' ? 'bg-[#3E0A10] text-[#EED284]' : 'text-stone-700 hover:bg-[#F4ECE1]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles size={16} /> Saved Designs ({savedDesigns.length})
            </span>
            <ChevronRight size={14} />
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors ${
              activeTab === 'wishlist' ? 'bg-[#3E0A10] text-[#EED284]' : 'text-stone-700 hover:bg-[#F4ECE1]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Heart size={16} /> Saved Wishlist ({wishlistProducts.length})
            </span>
            <ChevronRight size={14} />
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors ${
              activeTab === 'addresses' ? 'bg-[#3E0A10] text-[#EED284]' : 'text-stone-700 hover:bg-[#F4ECE1]'
            }`}
          >
            <span className="flex items-center gap-2">
              <MapPin size={16} /> Addresses
            </span>
            <ChevronRight size={14} />
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors ${
              activeTab === 'settings' ? 'bg-[#3E0A10] text-[#EED284]' : 'text-stone-700 hover:bg-[#F4ECE1]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Settings size={16} /> Account Settings
            </span>
            <ChevronRight size={14} />
          </button>
        </aside>

        {/* Main Content Area (9 Cols) */}
        <main className="lg:col-span-9 bg-[#FDFBF7] p-6 sm:p-8 rounded-3xl border border-[#EADCC9] shadow-sm space-y-8">
          
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* Recent Order Status Box */}
              {recentOrder ? (
                <div className="bg-[#F4ECE1] p-6 rounded-2xl border border-[#D4AF37]/50 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#EADCC9] pb-3">
                    <div>
                      <span className="text-[10px] font-bold text-[#9E4738] uppercase tracking-wider block">Recent Order</span>
                      <h4 className="font-marcellus text-sm font-bold text-[#3E0A10]">#{recentOrder.orderNumber}</h4>
                    </div>
                    <span className="text-xs font-bold bg-[#3E0A10] text-[#EED284] px-3 py-1 rounded-full border border-[#D4AF37]">
                      {recentOrder.status}
                    </span>
                  </div>

                  {/* Visual Tracker Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold text-[#3E0A10]">
                      <span>Placed</span>
                      <span>Hand-Painted</span>
                      <span>Shipped</span>
                      <span>Delivered</span>
                    </div>
                    <div className="w-full h-2 bg-stone-300 rounded-full overflow-hidden flex">
                      <div className="bg-[#D4AF37] h-full w-3/4 rounded-full" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-stone-600">Est. Delivery: <strong>{recentOrder.estimatedDelivery}</strong></span>
                    <button
                      onClick={() => {
                        onTrackOrder(recentOrder);
                        setActivePage('tracking');
                      }}
                      className="btn-gold px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
                    >
                      <Truck size={12} /> Track Package
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-[#F5EFE6] text-center text-xs text-stone-600">
                  You have not placed any orders yet.
                </div>
              )}

              {/* Saved Custom Designs Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#EADCC9] pb-2">
                  <h3 className="font-marcellus text-base font-bold text-[#3E0A10]">
                    My Saved Custom Designs
                  </h3>
                  <button onClick={() => setActiveTab('designs')} className="text-xs text-[#9E4738] font-bold hover:underline">
                    View All ({savedDesigns.length})
                  </button>
                </div>

                {savedDesigns.length === 0 ? (
                  <p className="text-xs text-stone-500 italic">No saved custom designs. Create your first custom mandala design in our studio!</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {savedDesigns.slice(0, 2).map(design => (
                      <div key={design.id} className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#EADCC9] flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-white border border-[#D4AF37] flex items-center justify-center shrink-0">
                          <MandalaCanvas design={design} size={56} showShadow={false} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-marcellus text-xs font-bold text-[#3E0A10]">{design.title}</h4>
                          <span className="text-[10px] text-stone-600 block">{design.productType} • ₹{design.calculatedPrice}</span>
                          <button
                            onClick={() => onAddCustomToCart(design)}
                            className="btn-gold px-3 py-1 rounded-full text-[10px] font-bold mt-2"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* 2. ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="font-marcellus text-lg font-bold text-[#3E0A10] border-b border-[#EADCC9] pb-3">
                Order History ({orders.length})
              </h3>

              {orders.map(ord => (
                <div key={ord.id} className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#EADCC9] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EADCC9] pb-2 text-xs">
                    <div>
                      <span className="font-marcellus font-bold text-[#3E0A10] text-sm">#{ord.orderNumber}</span>
                      <span className="text-stone-500 block">Placed on {ord.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold bg-[#3E0A10] text-[#EED284] px-3 py-1 rounded-full text-[11px] border border-[#D4AF37]">
                        {ord.status}
                      </span>
                      <span className="font-marcellus font-bold text-[#3E0A10]">₹{ord.totalAmount}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-stone-700">
                    {ord.items.map((item, idx) => {
                      const name = item.product ? item.product.name : item.customDesign ? item.customDesign.title : 'Mandala Art';
                      return (
                        <div key={idx} className="flex justify-between">
                          <span>{item.quantity}x {name}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        onTrackOrder(ord);
                        setActivePage('tracking');
                      }}
                      className="btn-gold px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
                    >
                      <Truck size={14} /> Track Order Status
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. SAVED DESIGNS TAB */}
          {activeTab === 'designs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#EADCC9] pb-3">
                <h3 className="font-marcellus text-lg font-bold text-[#3E0A10]">
                  Saved Custom Designs
                </h3>
                <button onClick={() => setActivePage('customise')} className="btn-gold px-4 py-1.5 rounded-full text-xs font-bold">
                  + Create New
                </button>
              </div>

              {savedDesigns.length === 0 ? (
                <p className="text-xs text-stone-500">No saved custom designs yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {savedDesigns.map(design => (
                    <div key={design.id} className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#EADCC9] flex flex-col items-center space-y-4 text-center">
                      <MandalaCanvas design={design} size={160} />
                      <div>
                        <h4 className="font-marcellus text-sm font-bold text-[#3E0A10]">{design.title}</h4>
                        <span className="text-xs text-stone-600 block">{design.productType} ({design.shape}) • ₹{design.calculatedPrice}</span>
                      </div>
                      <div className="flex items-center gap-2 w-full">
                        <button
                          onClick={() => onAddCustomToCart(design)}
                          className="flex-1 btn-gold py-2 rounded-full text-xs font-bold"
                        >
                          Add To Cart
                        </button>
                        <button
                          onClick={() => onDeleteSavedDesign(design.id)}
                          className="p-2 text-stone-400 hover:text-red-600"
                          title="Delete Design"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. WISHLIST TAB */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h3 className="font-marcellus text-lg font-bold text-[#3E0A10] border-b border-[#EADCC9] pb-3">
                Saved Wishlist Items ({wishlistProducts.length})
              </h3>
              {wishlistProducts.length === 0 ? (
                <p className="text-xs text-stone-500">Your wishlist is currently empty.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistProducts.map(p => (
                    <div key={p.id} className="p-3 bg-[#F5EFE6] rounded-xl border border-[#EADCC9] flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-16 h-16 rounded-lg object-cover" referrerPolicy="no-referrer" />
                      <div>
                        <h5 className="font-marcellus text-xs font-bold text-[#3E0A10] line-clamp-1">{p.name}</h5>
                        <span className="text-xs text-stone-600 font-bold block">₹{p.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <h3 className="font-marcellus text-lg font-bold text-[#3E0A10] border-b border-[#EADCC9] pb-3">
                Saved Shipping Addresses
              </h3>
              <div className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#D4AF37] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#3E0A10] uppercase tracking-wider">Default Home Address</span>
                  <span className="bg-[#3E0A10] text-[#EED284] px-2 py-0.5 rounded text-[10px] font-bold">Primary</span>
                </div>
                <p className="text-stone-800 font-semibold">Ananya Sharma (+91 98765 43210)</p>
                <p className="text-stone-600">Apt 402, Lotus Garden Apartments, MG Road, Jaipur, Rajasthan - 302001</p>
              </div>
            </div>
          )}

          {/* 6. SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="font-marcellus text-lg font-bold text-[#3E0A10] border-b border-[#EADCC9] pb-3">
                Account Settings
              </h3>
              <form onSubmit={e => { e.preventDefault(); alert('Profile settings updated successfully!'); }} className="space-y-4 max-w-md">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Full Name</label>
                  <input type="text" defaultValue="Ananya Sharma" className="w-full bg-[#F5EFE6] border border-[#EADCC9] rounded-xl px-3 py-2 text-xs" />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Email</label>
                  <input type="email" defaultValue="ananya.sharma@example.com" className="w-full bg-[#F5EFE6] border border-[#EADCC9] rounded-xl px-3 py-2 text-xs" />
                </div>
                <button type="submit" className="btn-gold px-6 py-2 rounded-full text-xs font-bold">
                  Save Changes
                </button>
              </form>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
