export interface Service {
  id: string;
  name: string;
  category: 'maintenance' | 'repair' | 'diagnostics' | 'performance';
  description: string;
  price: number;
  estimatedTime: string;
  benefits: string[];
}

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  services: Service[];
  scheduledDate: string;
  scheduledTime: string;
  status: 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  totalPrice: number;
  notes?: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
  content: string;
}
