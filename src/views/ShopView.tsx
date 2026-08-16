import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, RotateCcw, Search } from 'lucide-react';
import { Product, ActivePage } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ShopViewProps {
  products: Product[];
  setActivePage: (page: ActivePage) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  initialCategoryFilter?: string;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  setActivePage,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  initialCategoryFilter = 'All'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter);
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(3500);
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-low' | 'price-high'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Coasters', 'Keychains', 'Fridge Magnets', 'Home Decor'];
  const styles = ['All', 'Traditional', 'Floral', 'Geometric', 'Celestial'];
  const colors = ['All', 'Royal Blue', 'Terracotta', 'Ruby Red', 'Maroon', 'Navy', 'Forest Green'];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedStyle !== 'All' && p.designStyle !== selectedStyle) return false;
      if (selectedColor !== 'All' && !p.color.toLowerCase().includes(selectedColor.toLowerCase())) return false;
      if (p.price > priceRange) return false;
      if (searchQuery.trim() !== '' && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [products, selectedCategory, selectedStyle, selectedColor, priceRange, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedStyle('All');
    setSelectedColor('All');
    setPriceRange(3500);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Banner Heading */}
      <div className="bg-[#3B010B] text-[#F2E5C6] p-8 rounded-3xl border-2 border-[#75162D] shadow-xl text-center space-y-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-maroon-pattern opacity-30 pointer-events-none" />
        <span className="text-xs font-marcellus uppercase tracking-[0.25em] text-[#F2D9A0] block font-semibold">
          Handmade Studio Collection
        </span>
        <h1 className="font-marcellus text-3xl sm:text-4xl font-bold text-white">
          Shop Mandala Art Products
        </h1>
        <p className="text-xs sm:text-sm text-[#F2E5C6]/90 max-w-xl mx-auto">
          Explore our complete collection of hand-painted coasters, keychains, magnets, and home decor pieces.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 bg-[#FDFBF7] p-6 rounded-2xl border border-[#EADCC9] space-y-6 sticky top-28 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#EADCC9] pb-3">
            <h3 className="font-marcellus text-base font-bold text-[#3E0A10] flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-[#D4AF37]" />
              Filters
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-[#9E4738] hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          {/* Search inside shop */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700">Search Product</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-[#F5EFE6] border border-[#EADCC9] rounded-xl pl-8 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              />
              <Search size={14} className="absolute left-2.5 top-2.5 text-stone-400" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700">Category</label>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === cat
                      ? 'bg-[#3E0A10] text-[#EED284] font-bold'
                      : 'text-stone-700 hover:bg-[#F4ECE1]'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Filter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold uppercase tracking-wider text-stone-700">Max Price</label>
              <span className="font-bold text-[#3E0A10]">₹{priceRange}</span>
            </div>
            <input
              type="range"
              min="200"
              max="3500"
              step="100"
              value={priceRange}
              onChange={e => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#3E0A10] cursor-pointer"
            />
          </div>

          {/* Design Style Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700">Design Style</label>
            <div className="space-y-1">
              {styles.map(style => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedStyle === style
                      ? 'bg-[#9E4738] text-white font-bold'
                      : 'text-stone-700 hover:bg-[#F4ECE1]'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Base Color Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700">Color Palette</label>
            <div className="space-y-1">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedColor === color
                      ? 'bg-[#2A050A] text-[#EED284] font-bold'
                      : 'text-stone-700 hover:bg-[#F4ECE1]'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* Main Product Grid */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Top Bar: Results Count & Sort Dropdown */}
          <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#EADCC9] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden btn-maroon px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Filter size={14} /> Filters
              </button>

              <span className="text-xs text-stone-600 font-medium">
                Showing <strong className="text-[#3E0A10]">{filteredProducts.length}</strong> products
              </span>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label className="text-xs font-bold text-stone-600 whitespace-nowrap">Sort By:</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-[#F5EFE6] border border-[#EADCC9] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#3E0A10] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              >
                <option value="featured">Featured / Best Selling</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-[#FDFBF7] p-12 rounded-3xl border border-[#EADCC9] text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F4ECE1] text-[#3E0A10] mx-auto flex items-center justify-center">
                <Search size={28} />
              </div>
              <h3 className="font-marcellus text-lg font-bold text-[#3E0A10]">No Products Found</h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                No items match your active filter criteria. Try clearing filters or picking another category.
              </p>
              <button
                onClick={resetFilters}
                className="btn-gold px-6 py-2.5 rounded-full text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlistIds.includes(product.id)}
                  setActivePage={setActivePage}
                />
              ))}
            </div>
          )}

        </main>

      </div>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-[#FDFBF7] w-full max-w-xs h-full p-6 overflow-y-auto space-y-6 border-l border-[#D4AF37] animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#EADCC9] pb-3">
              <h3 className="font-marcellus text-base font-bold text-[#3E0A10]">Filter Products</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="text-stone-500 font-bold">✕</button>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700">Category</label>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setMobileFilterOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs ${selectedCategory === cat ? 'bg-[#3E0A10] text-[#EED284] font-bold' : 'text-stone-700'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold">Max Price</label>
                <span>₹{priceRange}</span>
              </div>
              <input
                type="range"
                min="200"
                max="3500"
                step="100"
                value={priceRange}
                onChange={e => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#3E0A10]"
              />
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full btn-gold py-3 rounded-full text-xs font-bold"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
