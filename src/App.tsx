import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ActivePage, Product, CartItem, Order, CustomMandalaDesign, Review } from './types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, SAMPLE_ORDERS } from './data/products';

// Import Views
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CustomiseView } from './views/CustomiseView';
import { WishlistView } from './views/WishlistView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';
import { UserDashboardView } from './views/UserDashboardView';
import { TrackingView } from './views/TrackingView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(INITIAL_PRODUCTS[0]);
  
  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['cst-001', 'mag-001']);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  // Orders & Custom Designs & Reviews State
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(SAMPLE_ORDERS[0]);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  
  const [savedDesigns, setSavedDesigns] = useState<CustomMandalaDesign[]>([
    {
      id: 'saved-01',
      title: 'Lotus Sunrise Coaster',
      productType: 'Coaster',
      shape: 'Circle',
      baseColor: { name: 'Midnight Maroon', hex: '#3E0A10', textHex: '#EED284' },
      patternStyle: 'Traditional',
      palette: { name: 'Regal Gold & White', dots: ['#D4AF37', '#FFFFFF', '#C59B27', '#EED284', '#3E0A10'] },
      personalisationText: 'ANANYA',
      calculatedPrice: 499,
      createdAt: '2026-08-01'
    }
  ]);

  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Wishlist Actions
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds(prev => 
      prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
  };

  // Cart Actions
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.product?.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { id: `cart-${Date.now()}`, product, quantity }];
    });
  };

  const handleAddCustomToCart = (design: CustomMandalaDesign) => {
    setCartItems(prev => [
      ...prev,
      { id: `cart-custom-${Date.now()}`, customDesign: design, quantity: 1 }
    ]);
  };

  const handleUpdateCartQuantity = (itemId: string, newQty: number) => {
    setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleBuyNow = (product: Product, quantity: number = 1) => {
    handleAddToCart(product, quantity);
    setActivePage('checkout');
  };

  // Saved Custom Designs Actions
  const handleSaveCustomDesign = (design: CustomMandalaDesign) => {
    setSavedDesigns(prev => [design, ...prev]);
  };

  const handleDeleteSavedDesign = (id: string) => {
    setSavedDesigns(prev => prev.filter(d => d.id !== id));
  };

  // Order Placement
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    setActiveTrackingOrder(newOrder);
  };

  const handleAddReview = (newReview: Review) => {
    setReviews(prev => [newReview, ...prev]);
  };

  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#2C1D18] selection:bg-[#3E0A10] selection:text-[#EED284]">
      
      {/* Main Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        cartCount={cartCount}
        wishlistCount={wishlistProducts.length}
        products={products}
        onSelectProduct={setSelectedProduct}
        selectedCategoryFilter={selectedCategoryFilter}
        setSelectedCategoryFilter={setSelectedCategoryFilter}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {activePage === 'home' && (
          <HomeView
            products={products}
            reviews={reviews}
            setActivePage={setActivePage}
            onSelectProduct={setSelectedProduct}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onSelectCategory={(cat) => setSelectedCategoryFilter(cat)}
          />
        )}

        {activePage === 'shop' && (
          <ShopView
            products={products}
            setActivePage={setActivePage}
            onSelectProduct={setSelectedProduct}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            initialCategoryFilter={selectedCategoryFilter}
          />
        )}

        {activePage === 'product-detail' && (
          <ProductDetailView
            product={selectedProduct}
            allProducts={products}
            reviews={reviews}
            setActivePage={setActivePage}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
            onSelectProduct={setSelectedProduct}
            onBuyNow={handleBuyNow}
            onAddReview={handleAddReview}
          />
        )}

        {activePage === 'customise' && (
          <CustomiseView
            onAddCustomToCart={handleAddCustomToCart}
            onSaveCustomDesign={handleSaveCustomDesign}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'wishlist' && (
          <WishlistView
            wishlistProducts={wishlistProducts}
            onRemoveFromWishlist={handleToggleWishlist}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            setActivePage={setActivePage}
            onSelectProduct={setSelectedProduct}
          />
        )}

        {activePage === 'cart' && (
          <CartView
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            setActivePage={setActivePage}
            allProducts={products}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            appliedDiscount={appliedDiscount}
            setAppliedDiscount={setAppliedDiscount}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutView
            cartItems={cartItems}
            appliedDiscount={appliedDiscount}
            setActivePage={setActivePage}
            onOrderPlaced={handleOrderPlaced}
            clearCart={() => setCartItems([])}
          />
        )}

        {activePage === 'order-success' && (
          <OrderSuccessView
            order={latestOrder}
            setActivePage={setActivePage}
            onTrackOrder={setActiveTrackingOrder}
          />
        )}

        {activePage === 'dashboard' && (
          <UserDashboardView
            orders={orders}
            savedDesigns={savedDesigns}
            wishlistProducts={wishlistProducts}
            setActivePage={setActivePage}
            onTrackOrder={setActiveTrackingOrder}
            onAddCustomToCart={handleAddCustomToCart}
            onDeleteSavedDesign={handleDeleteSavedDesign}
          />
        )}

        {activePage === 'tracking' && (
          <TrackingView
            currentOrder={activeTrackingOrder}
            allOrders={orders}
          />
        )}

        {activePage === 'about' && (
          <AboutView setActivePage={setActivePage} />
        )}

        {activePage === 'contact' && (
          <ContactView />
        )}
      </div>

      {/* Main Footer */}
      <Footer
        setActivePage={setActivePage}
        onSelectCategory={(cat) => setSelectedCategoryFilter(cat)}
      />

    </div>
  );
}
