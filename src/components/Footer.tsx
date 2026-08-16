import React from 'react';
import { Instagram, Mail, Sparkles, Send, Heart, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { ActivePage, ProductCategory } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
  onCategorySelect?: (cat: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onCategorySelect }) => {
  const handleCategoryClick = (cat: ProductCategory) => {
    if (onCategorySelect) {
      onCategorySelect(cat);
    }
    setActivePage('shop');
  };

  return (
    <footer className="bg-[#3B010B] text-[#F2E5C6] border-t-2 border-[#75162D] relative overflow-hidden">
      {/* Decorative Top Accent Line */}
      <div className="h-1.5 bg-gradient-to-r from-[#560B18] via-[#F2D9A0] to-[#560B18]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        {/* Value Proposition Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-[#75162D] text-center">
          <div className="p-5 rounded-2xl bg-[#560B18]/70 border border-[#75162D] shadow-xs flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#75162D] border border-[#F2D9A0]/30 flex items-center justify-center text-[#F2D9A0] mb-3">
              <Sparkles size={22} />
            </div>
            <h4 className="font-marcellus text-sm font-bold text-[#F2D9A0]">100% Hand-Painted</h4>
            <p className="text-xs text-[#F2E5C6]/80 mt-1">Every dot painstakingly painted by founder Riya.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#560B18]/70 border border-[#75162D] shadow-xs flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#75162D] border border-[#F2D9A0]/30 flex items-center justify-center text-[#F2D9A0] mb-3">
              <Truck size={22} />
            </div>
            <h4 className="font-marcellus text-sm font-bold text-[#F2D9A0]">Free Pan-India Shipping</h4>
            <p className="text-xs text-[#F2E5C6]/80 mt-1">On all orders above ₹999. Carefully bubble-wrapped from Bangalore.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#560B18]/70 border border-[#75162D] shadow-xs flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#75162D] border border-[#F2D9A0]/30 flex items-center justify-center text-[#F2D9A0] mb-3">
              <ShieldCheck size={22} />
            </div>
            <h4 className="font-marcellus text-sm font-bold text-[#F2D9A0]">Waterproof Varnish</h4>
            <p className="text-xs text-[#F2E5C6]/80 mt-1">Double protective topcoat on all coasters, magnets & decor.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#560B18]/70 border border-[#75162D] shadow-xs flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#75162D] border border-[#F2D9A0]/30 flex items-center justify-center text-[#F2D9A0] mb-3">
              <RefreshCw size={22} />
            </div>
            <h4 className="font-marcellus text-sm font-bold text-[#F2D9A0]">Custom Gifting</h4>
            <p className="text-xs text-[#F2E5C6]/80 mt-1">Pick your color themes, motifs & initials for personalized pieces.</p>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo showText={true} />
            <p className="text-xs leading-relaxed text-[#F2E5C6]/90 pr-4">
              The Painted Dot began in Bangalore with a simple idea from one artist, Riya. She hand-makes mandala coasters, keychains, fridge magnets, and home decor, created to bring colour and character into your everyday space.
            </p>
            
            {/* Social Link - Instagram Only */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/thepainteddots/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#75162D] border border-[#F2D9A0]/40 text-[#F2D9A0] hover:bg-[#F2D9A0] hover:text-[#3B010B] transition-colors text-xs font-bold"
              >
                <Instagram size={16} /> @thepainteddots
              </a>
              <a
                href="mailto:thepainteddots@gmail.com"
                className="w-9 h-9 rounded-full bg-[#75162D] border border-[#F2D9A0]/40 flex items-center justify-center text-[#F2D9A0] hover:bg-[#F2D9A0] hover:text-[#3B010B] transition-colors"
                title="Email Us"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="font-marcellus text-sm font-bold text-[#F2D9A0] uppercase tracking-wider mb-4 border-b border-[#75162D] pb-2 inline-block">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F2E5C6]/80">
              <li>
                <button onClick={() => handleCategoryClick('Coasters')} className="hover:text-[#F2D9A0] transition-colors">
                  Handmade Coasters
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Keychains')} className="hover:text-[#F2D9A0] transition-colors">
                  Mandala Keychains
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Fridge Magnets')} className="hover:text-[#F2D9A0] transition-colors">
                  Fridge Magnets
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Home Decor')} className="hover:text-[#F2D9A0] transition-colors">
                  Table & Home Decor
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('customise')} className="text-[#F2D9A0] font-semibold hover:underline flex items-center gap-1">
                  <Sparkles size={12} /> Customise Your Mandala
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Support Links */}
          <div>
            <h4 className="font-marcellus text-sm font-bold text-[#F2D9A0] uppercase tracking-wider mb-4 border-b border-[#75162D] pb-2 inline-block">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F2E5C6]/80">
              <li>
                <button onClick={() => setActivePage('tracking')} className="hover:text-[#F2D9A0] transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('dashboard')} className="hover:text-[#F2D9A0] transition-colors">
                  My Account
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-[#F2D9A0] transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('contact')} className="hover:text-[#F2D9A0] transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-marcellus text-sm font-bold text-[#F2D9A0] uppercase tracking-wider mb-4 border-b border-[#75162D] pb-2 inline-block">
              Newsletter
            </h4>
            <p className="text-xs text-[#F2E5C6]/80 mb-3">
              Subscribe to get secret shop drops and 10% off your first handmade order.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing! Use code MANDALA10 for 10% off.'); }} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="w-full bg-[#560B18] border border-[#75162D] rounded-xl px-3 py-2 text-xs text-white placeholder-[#F2E5C6]/50 focus:outline-none focus:border-[#F2D9A0]"
              />
              <button
                type="submit"
                className="w-full btn-sand-gold py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Send size={12} /> Subscribe Now
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div className="mt-12 pt-6 border-t border-[#75162D] flex flex-col md:flex-row items-center justify-between text-[11px] text-[#F2E5C6]/70 gap-4">
          <div>
            © 2026 The Painted Dot. Handcrafted in Bangalore with <Heart size={10} className="inline text-[#F2D9A0] fill-[#F2D9A0] mx-0.5" /> All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-[#F2D9A0]/80">
            <span>UPI Accept</span>
            <span>•</span>
            <span>Credit/Debit Card</span>
            <span>•</span>
            <span>COD Available</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
