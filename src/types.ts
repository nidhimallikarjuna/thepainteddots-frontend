export type ProductCategory = 'Coasters' | 'Keychains' | 'Fridge Magnets' | 'Home Decor';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  additionalImages?: string[];
  description: string;
  material: string;
  dimensions: string;
  careInstructions: string;
  color: string;
  designStyle: 'Floral' | 'Geometric' | 'Traditional' | 'Celestial' | 'Abstract';
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  inStock: boolean;
  tags?: string[];
}

export type ProductShape = 'Circle' | 'Square' | 'Hexagon';
export type CustomProductType = 'Coaster' | 'Keychain' | 'Fridge Magnet' | 'Table Decor';

export interface CustomMandalaDesign {
  id: string;
  title: string;
  productType: CustomProductType;
  shape: ProductShape;
  baseColor: { name: string; hex: string; textHex: string };
  patternStyle: 'Floral' | 'Geometric' | 'Sun' | 'Moon' | 'Abstract' | 'Traditional';
  palette: { name: string; dots: string[] };
  personalisationText?: string;
  variantOption?: string;
  calculatedPrice: number;
  createdAt: string;
}

export interface CartItem {
  id: string; // unique item id
  product?: Product;
  customDesign?: CustomMandalaDesign;
  quantity: number;
  selectedOption?: string;
}

export interface Review {
  id: string;
  productId?: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  location?: string;
}

export type OrderStatus = 'Order Placed' | 'Processing' | 'Shipped' | 'Delivered';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  shippingAmount: number;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: 'UPI' | 'Card' | 'Net Banking' | 'COD';
  trackingNumber: string;
  courierName: string;
  estimatedDelivery: string;
  timeline: {
    title: string;
    date: string;
    completed: boolean;
    current?: boolean;
    description: string;
  }[];
}

export type ActivePage = 
  | 'home' 
  | 'shop' 
  | 'product-detail' 
  | 'customise' 
  | 'about' 
  | 'contact' 
  | 'wishlist' 
  | 'cart' 
  | 'checkout' 
  | 'order-success' 
  | 'dashboard' 
  | 'tracking';
