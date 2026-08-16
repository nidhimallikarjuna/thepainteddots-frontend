import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft,
  CheckCircle2,
  Share2,
  ChevronRight
} from 'lucide-react';
import { Product, ActivePage, Review } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailViewProps {
  product: Product | null;
  allProducts: Product[];
  reviews: Review[];
  setActivePage: (page: ActivePage) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onSelectProduct: (product: Product) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onAddReview: (newReview: Review) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  allProducts,
  reviews,
  setActivePage,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onSelectProduct,
  onBuyNow,
  onAddReview
}) => {
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-marcellus text-2xl font-bold text-[#3E0A10]">Product Not Selected</h2>
        <button onClick={() => setActivePage('shop')} className="btn-gold px-6 py-2.5 rounded-full text-xs font-bold">
          Back to Shop
        </button>
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'reviews'>('details');

  // Review Form State
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const imagesList = product.additionalImages && product.additionalImages.length > 0
    ? [product.image, ...product.additionalImages.filter(img => img !== product.image)]
    : [product.image];

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const productReviews = reviews.filter(r => !r.productId || r.productId === product.id);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      author: reviewAuthor,
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0],
      title: reviewTitle || 'Beautiful Handmade Art',
      comment: reviewComment,
      verifiedPurchase: true
    };

    onAddReview(newRev);
    setReviewSubmitted(true);
    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back Button */}
      <button
        onClick={() => setActivePage('shop')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3E0A10] hover:text-[#9E4738] transition-colors"
      >
        <ArrowLeft size={16} /> Back to Shop
      </button>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Gallery (7 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Main Selected Image */}
          <div className="w-full h-80 sm:h-[420px] rounded-3xl bg-[#F4ECE1] border-2 border-[#D4AF37] overflow-hidden shadow-xl relative group">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 bg-[#2A050A]/80 text-[#EED284] text-[11px] font-bold px-3 py-1 rounded-full border border-[#D4AF37]">
              100% Hand-Painted
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {imagesList.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                  selectedImage === img
                    ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50 scale-105'
                    : 'border-[#EADCC9] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>

        </div>

        {/* Right Info Details (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <span className="text-xs font-marcellus uppercase tracking-[0.2em] text-[#9E4738] font-bold block">
              {product.category} • {product.designStyle} Style
            </span>
            <h1 className="font-marcellus text-2xl sm:text-3xl font-bold text-[#3E0A10] mt-1">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#D4AF37]" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#3E0A10]">{product.rating}</span>
              <span className="text-xs text-stone-500">({product.reviewsCount} customer reviews)</span>
            </div>
          </div>

          {/* Price Box */}
          <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#D4AF37]/40 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-marcellus text-3xl font-bold text-[#3E0A10]">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>
              <span className="text-[11px] text-stone-500 block mt-0.5">Inclusive of all taxes & free pan-India shipping over ₹999</span>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 size={12} /> In Stock & Ready to Ship
              </span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
            {product.description}
          </p>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-[#F4ECE1] p-3.5 rounded-xl border border-[#EADCC9]">
            <div>
              <span className="text-stone-500 block">Material:</span>
              <strong className="text-[#3E0A10]">{product.material}</strong>
            </div>
            <div>
              <span className="text-stone-500 block">Dimensions:</span>
              <strong className="text-[#3E0A10]">{product.dimensions}</strong>
            </div>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-4 pt-2">
            
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">Quantity:</span>
              <div className="flex items-center border border-[#D4AF37] rounded-full bg-[#FDFBF7] px-3 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 text-lg font-bold text-[#3E0A10] flex items-center justify-center hover:text-[#9E4738]"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-[#3E0A10]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 text-lg font-bold text-[#3E0A10] flex items-center justify-center hover:text-[#9E4738]"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => onAddToCart(product, quantity)}
                className="sm:col-span-2 btn-gold py-3.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingBag size={16} /> Add To Cart • ₹{product.price * quantity}
              </button>

              <button
                onClick={() => onBuyNow(product, quantity)}
                className="btn-maroon py-3.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5"
              >
                Buy Now
              </button>
            </div>

            <button
              onClick={() => onToggleWishlist(product)}
              className="w-full py-2 border border-[#EADCC9] rounded-full text-xs font-semibold text-stone-700 hover:border-[#D4AF37] flex items-center justify-center gap-2 transition-colors bg-[#FDFBF7]"
            >
              <Heart size={16} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
              {isWishlisted ? 'Saved in Wishlist' : 'Add to Saved Wishlist'}
            </button>

          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#EADCC9] text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-[#D4AF37]" />
              <span>Ships within 24-48 hours with Delhiery</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#D4AF37]" />
              <span>Heat & Waterproof Gloss Protected</span>
            </div>
          </div>

        </div>

      </div>

      {/* Accordion Tabs for Product Details & Care Instructions */}
      <div className="bg-[#FDFBF7] rounded-3xl border border-[#EADCC9] p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-4 border-b border-[#EADCC9] pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-2 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'details'
                ? 'border-[#D4AF37] text-[#3E0A10]'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Product Specs & Material
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`pb-2 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'care'
                ? 'border-[#D4AF37] text-[#3E0A10]'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Artisan Care Instructions
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-2 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-[#D4AF37] text-[#3E0A10]'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Customer Reviews ({productReviews.length})
          </button>
        </div>

        {activeTab === 'details' && (
          <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <p><strong>Art Form:</strong> Precision Pointillism Dot Mandala Art.</p>
            <p><strong>Base Substrate:</strong> {product.material}.</p>
            <p><strong>Dimensions:</strong> {product.dimensions}.</p>
            <p><strong>Paints Used:</strong> Premium heavy-body lightfast acrylics seal-coated with non-yellowing high gloss resin varnish.</p>
          </div>
        )}

        {activeTab === 'care' && (
          <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <p><strong>Cleaning:</strong> Wipe gently with a soft microfiber damp cloth.</p>
            <p><strong>Do Not:</strong> Do not scrub with wire mesh, soak in sink water, or place inside dishwasher.</p>
            <p><strong>Heat Handling:</strong> Coasters are insulated for hot tea and coffee mugs up to 90°C.</p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productReviews.map(r => (
                <div key={r.id} className="p-4 rounded-xl bg-[#F5EFE6] border border-[#EADCC9] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#3E0A10]">{r.author}</span>
                    <span className="text-[10px] text-stone-400">{r.date}</span>
                  </div>
                  <div className="flex text-[#D4AF37]">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-[#D4AF37]" />
                    ))}
                  </div>
                  <h5 className="font-marcellus text-xs font-bold text-[#3E0A10]">{r.title}</h5>
                  <p className="text-xs text-stone-600 italic">"{r.comment}"</p>
                </div>
              ))}
            </div>

            {/* Add Review Form */}
            <div className="pt-6 border-t border-[#EADCC9]">
              <h4 className="font-marcellus text-sm font-bold text-[#3E0A10] mb-3">Write a Customer Review</h4>
              {reviewSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold">
                  ✓ Thank you! Your review has been published.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3 max-w-lg">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={reviewAuthor}
                      onChange={e => setReviewAuthor(e.target.value)}
                      required
                      className="bg-[#F5EFE6] border border-[#EADCC9] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    />
                    <select
                      value={reviewRating}
                      onChange={e => setReviewRating(Number(e.target.value))}
                      className="bg-[#F5EFE6] border border-[#EADCC9] rounded-xl px-3 py-2 text-xs focus:outline-none"
                    >
                      <option value={5}>5 Stars - Outstanding</option>
                      <option value={4}>4 Stars - Very Good</option>
                      <option value={3}>3 Stars - Good</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Review Title (e.g. Beautiful dot artwork!)"
                    value={reviewTitle}
                    onChange={e => setReviewTitle(e.target.value)}
                    className="w-full bg-[#F5EFE6] border border-[#EADCC9] rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                  <textarea
                    rows={3}
                    placeholder="Share your thoughts about the handmade finish and quality..."
                    value={reviewComment}
                    onChange={e => setReviewComment(e.target.value)}
                    required
                    className="w-full bg-[#F5EFE6] border border-[#EADCC9] rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                  <button type="submit" className="btn-gold px-6 py-2 rounded-full text-xs font-bold">
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h3 className="font-marcellus text-xl font-bold text-[#3E0A10]">You May Also Love</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
                onAddToCart={(p) => onAddToCart(p, 1)}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={isWishlisted}
                setActivePage={setActivePage}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
