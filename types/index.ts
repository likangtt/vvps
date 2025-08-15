// 定义Deal接口
export interface Deal {
  id: string;
  title: string;
  description: string;
  price: string | number;
  originalPrice?: string | number | null;
  currency: string;
  location: string;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    bandwidth: string;
  };
  providerId?: string;
  provider?: {
    id: string;
    name: string;
    logo?: string;
  };
  tags: string[];
  features: string[];
  link: string;
  couponCode?: string;
  expiryDate?: string;
  featured?: boolean;
  discount?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 定义Provider接口
export interface Provider {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  locations?: string[];
  features?: string[];
  tags?: string[];
}

// 定义User接口
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

// 定义Content接口
export interface Content {
  id: string;
  title: string;
  content: string;
  slug: string;
  author?: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

// 定义Stats接口
export interface Stats {
  totalDeals: number;
  totalProviders: number;
  totalUsers: number;
  totalViews: number;
  popularDeals: {
    id: string;
    title: string;
    views: number;
  }[];
  popularProviders: {
    id: string;
    name: string;
    deals: number;
  }[];
}