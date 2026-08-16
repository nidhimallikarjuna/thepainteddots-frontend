import React from 'react';
import { Sparkles, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { ActivePage } from '../types';
import { HERO_BANNER_IMAGE } from '../data/products';
import { Logo } from '../components/Logo';

export const AboutView: React.FC<{ setActivePage: (page: ActivePage) => void }> = ({ setActivePage }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Banner */}
      <div className="bg-[#3B010B] text-[#F2E5C6] p-8 sm:p-12 rounded-3xl border-2 border-[#75162D] shadow-xl text-center space-y-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-maroon-pattern opacity-30 pointer-events-none" />
        <span className="text-xs font-marcellus uppercase tracking-[0.25em] text-[#F2D9A0] block font-semibold">
          Handcrafted in Bangalore
        </span>
        <h1 className="font-marcellus text-3xl sm:text-5xl font-bold text-white">
          About The Painted Dot
        </h1>
        <p className="text-sm sm:text-base text-[#F2D9A0] font-semibold max-w-2xl mx-auto font-sans">
          One artist. One creative idea. A whole lot of dots.
        </p>
      </div>

      {/* Main Story Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5 text-[#3B010B] text-xs sm:text-sm leading-relaxed">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#75162D] text-[#F2D9A0] text-xs font-bold uppercase tracking-wider">
            <Heart size={14} className="fill-[#F2D9A0]" /> Our Story
          </div>

          <h2 className="font-marcellus text-2xl sm:text-4xl font-bold text-[#3B010B]">
            One Artist. One Creative Idea. A Whole Lot Of Dots.
          </h2>

          <p>
            The Painted Dot began in Bangalore with a simple idea from one artist, Riya.
          </p>

          <p>
            Riya has always been drawn to the patience, detail, and creativity behind mandala art. One day, she wondered: <em>what if I could turn something I love creating into something people could bring into their own homes?</em>
          </p>

          <p className="font-bold text-[#75162D]">
            And that’s how The Painted Dot came to life.
          </p>

          <p>
            I create handmade mandala-inspired pieces designed to add a little colour, personality, and creativity to everyday spaces. From coasters and keychains to fridge magnets and little pieces of table decor, every product starts with an idea and is finished by hand — my hand.
          </p>

          <p>
            I believe handmade art doesn’t have to sit inside a frame. It can be part of your morning coffee, your work desk, your fridge, or that little corner of your home that deserves some love.
          </p>

          <div className="p-4 bg-[#FFFDF9] border-l-4 border-[#75162D] rounded-r-2xl shadow-xs text-xs sm:text-sm font-bold text-[#3B010B] space-y-1">
            <p>Made with patience. Designed with purpose. Painted one dot at a time.</p>
            <p className="text-[#75162D] font-serif italic text-xs">Welcome to The Painted Dot. 🎨</p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setActivePage('shop')}
              className="btn-burgundy px-8 py-3.5 rounded-full text-xs font-bold inline-flex items-center gap-2 shadow"
            >
              Explore Our Collection <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-md rounded-3xl overflow-hidden border-2 border-[#75162D] p-3 bg-[#3B010B] shadow-2xl space-y-4">
            <img
              src={HERO_BANNER_IMAGE}
              alt="Riya's Art Studio"
              className="w-full h-80 object-cover rounded-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 bg-[#560B18] rounded-xl border border-[#75162D] text-center space-y-2">
              <Logo showText={true} />
              <p className="text-xs text-[#F2E5C6]">Riya • Artisan Studio in Bangalore</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Offerings Grid */}
      <div className="bg-[#FFFDF9] p-8 sm:p-12 rounded-3xl border border-[#F2D9A0] shadow-xs space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-marcellus text-2xl font-bold text-[#3B010B]">What We Handcraft</h2>
          <p className="text-xs text-[#560B18]">Utility art designed for everyday moments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-xs">
          <div className="p-5 bg-[#F2E5C6] rounded-2xl border border-[#F2D9A0] space-y-2">
            <h4 className="font-marcellus font-bold text-[#3B010B] text-sm">Coasters</h4>
            <p className="text-[#560B18]">Handmade wooden & ceramic coasters with high-gloss heatproof varnish for your morning tea or coffee.</p>
          </div>

          <div className="p-5 bg-[#F2E5C6] rounded-2xl border border-[#F2D9A0] space-y-2">
            <h4 className="font-marcellus font-bold text-[#3B010B] text-sm">Keychains</h4>
            <p className="text-[#560B18]">Compact, vibrant mandala keychains carrying handcrafted detail wherever you go.</p>
          </div>

          <div className="p-5 bg-[#F2E5C6] rounded-2xl border border-[#F2D9A0] space-y-2">
            <h4 className="font-marcellus font-bold text-[#3B010B] text-sm">Fridge Magnets</h4>
            <p className="text-[#560B18]">Miniature dot mandala badges to brighten up your kitchen and fridge space.</p>
          </div>

          <div className="p-5 bg-[#F2E5C6] rounded-2xl border border-[#F2D9A0] space-y-2">
            <h4 className="font-marcellus font-bold text-[#3B010B] text-sm">Home & Table Decor</h4>
            <p className="text-[#560B18]">Decorative mandala plates and wall accents painted to add warmth to your living corner.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
