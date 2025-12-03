export type UserRole = 'superadmin' | 'admin' | 'user';

export type WeatherSuitability = 'panas' | 'dingin' | 'sejuk' | 'semua';

export type ProductType = 'makanan' | 'minuman';

export type AdminRequestStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  address?: string;
  createdAt: string;
}

export interface Shop {
  id: string;
  ownerId: string;
  shopName: string;
  openTime: string;
  closeTime: string;
  latitude: number;
  longitude: number;
  createdAt: string;
}

export interface Product {
  id: string;
  shopId: string;
  name: string;
  type: ProductType;
  price: number;
  description: string;
  weatherSuitability: WeatherSuitability;
  createdAt: string;
}

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
}

export interface DeliveryLink {
  id: string;
  productId: string;
  gofoodUrl?: string;
  grabfoodUrl?: string;
  shopeefoodUrl?: string;
}

export interface ProductWithDetails extends Product {
  shop: Shop;
  images: ProductImage[];
  deliveryLinks: DeliveryLink;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  conditionId: string;
}

export interface Province {
  id: string;
  name: string;
}

export interface AdminRequest {
  id: string;
  userId: string;
  userEmail: string;
  shopName: string;
  locationLat: number;
  locationLng: number;
  manualLocationUrl?: string;
  status: AdminRequestStatus;
  createdAt: string;
}
