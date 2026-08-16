import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, User, Menu, X, Sparkles, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { ActivePage, ProductCategory } from '../types';
import { Logo } from './Logo';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  cartCount: number;
  wishlistCount: number;
  onCategorySelect?: (cat: ProductCategory) => void;
  setSearchModalOpen?: (open: boolean) => void;
  products?: any[];
  onSelectProduct?: any;
  selectedCategoryFilter?: any;
  setSelectedCategoryFilter?: any;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  cartCount,
  wishlistCount,
  onCategorySelect,
  setSearchModalOpen
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: ActivePage; isHighlight?: boolean }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop Collections', page: 'shop' },
    { label: 'Customise Mandala', page: 'customise', isHighlight: true },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar - Deep Wine with Sand Gold Text */}
      <div className="bg-[#3B010B] text-[#F2D9A0] text-xs py-2 px-4 text-center font-medium tracking-wide border-b border-[#560B18]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:block text-[11px] font-serif opacity-90">
            ✨ 100% Hand-Painted Artisan Mandala Art • Bangalore
          </div>
          <div className="mx-auto sm:mx-0 flex items-center gap-2">
            <span className="font-semibold text-[#F2E5C6]">CODE: MANDALA10 FOR 10% OFF</span>
            <span className="hidden md:inline text-[#F2D9A0]">• FREE PAN-INDIA SHIPPING OVER ₹999</span>
          </div>
          <div className="hidden sm:block text-[11px]">
            <a
              href="https://www.instagram.com/thepainteddots/"
              target="_blank"
              rel="noreferrer"
              className="hover:underline text-[#F2D9A0] font-semibold flex items-center gap-1"
            >
              Instagram @thepainteddots
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#560B18]/95 backdrop-blur-md border-b border-[#75162D] shadow-md text-[#F2E5C6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Mobile Menu Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#F2D9A0] hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Brand Logo with New Logo Component */}
            <div className="flex items-center cursor-pointer group" onClick={() => handleNavClick('home')}>
              <Logo showText={true} />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navLinks.map(link => {
                const isActive = activePage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`text-xs font-semibold tracking-widest uppercase transition-all duration-200 py-1.5 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-[#F2D9A0] border-b-2 border-[#F2D9A0] font-bold'
                        : link.isHighlight
                        ? 'text-[#F2D9A0] hover:text-white bg-[#75162D] px-3.5 py-1 rounded-full border border-[#F2D9A0]/40'
                        : 'text-[#F2E5C6]/90 hover:text-[#F2D9A0]'
                    }`}
                  >
                    {link.isHighlight && <Sparkles size={12} className="text-[#F2D9A0]" />}
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Header Utilities: Search, Wishlist, Cart, Profile */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Button */}
              <button
                onClick={() => setSearchModalOpen ? setSearchModalOpen(true) : setActivePage('shop')}
                className="p-2 text-[#F2D9A0] hover:text-white hover:bg-[#75162D] rounded-full transition-colors relative"
                title="Search Products"
              >
                <Search size={20} />
              </button>

              {/* Wishlist Icon */}
              <button
                onClick={() => handleNavClick('wishlist')}
                className="p-2 text-[#F2D9A0] hover:text-white hover:bg-[#75162D] rounded-full transition-colors relative"
                title="Wishlist"
              >
                <Heart size={20} className={wishlistCount > 0 ? 'fill-[#F2D9A0] text-[#F2D9A0]' : ''} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#F2D9A0] text-[#3B010B] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Icon */}
              <button
                onClick={() => handleNavClick('cart')}
                className="p-2 text-[#F2D9A0] hover:text-white hover:bg-[#75162D] rounded-full transition-colors relative"
                title="Shopping Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#F2D9A0] text-[#3B010B] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Dashboard Profile Icon */}
              <button
                onClick={() => handleNavClick('dashboard')}
                className="p-1.5 text-[#F2D9A0] hover:text-white bg-[#75162D] border border-[#F2D9A0]/30 rounded-full transition-colors hidden sm:flex items-center justify-center"
                title="Customer Dashboard"
              >
                <User size={18} />
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#3B010B] border-b border-[#75162D] px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold tracking-widest uppercase flex items-center justify-between ${
                  activePage === link.page
                    ? 'bg-[#75162D] text-[#F2D9A0] font-bold'
                    : 'text-[#F2E5C6] hover:bg-[#560B18]'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.isHighlight && <Sparkles size={14} className="text-[#F2D9A0]" />}
                  {link.label}
                </span>
                <ChevronRight size={16} />
              </button>
            ))}
            <div className="pt-2 border-t border-[#75162D] flex items-center justify-around text-xs text-[#F2D9A0]">
              <button onClick={() => handleNavClick('dashboard')} className="flex items-center gap-1.5 py-2 hover:text-white">
                <User size={16} /> My Account
              </button>
              <button onClick={() => handleNavClick('tracking')} className="flex items-center gap-1.5 py-2 hover:text-white">
                <SlidersHorizontal size={16} /> Track Order
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
