// API configuration and utilities

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  fullDescription?: string;
  category: string;
  iconName?: string;
  duration: number;
  price?: number;
  active: boolean;
}

export interface Booking {
  id: string;
  serviceId: string;
  userEmail: string;
  userName: string;
  userPhone?: string;
  bookingDate: string;
  bookingTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  notes?: string;
  service?: Service;
}

export interface AvailabilityResponse {
  date: string;
  availableSlots: string[];
  bookedSlots: string[];
}

export interface CreateBookingDto {
  serviceId: string;
  userEmail: string;
  userName: string;
  userPhone?: string;
  bookingDate: string;
  bookingTime: string;
  notes?: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// API Client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Services
  async getServices(): Promise<Service[]> {
    return this.request<Service[]>('/api/services');
  }

  async getService(id: string): Promise<Service> {
    return this.request<Service>(`/api/services/${id}`);
  }

  // Bookings
  async createBooking(booking: CreateBookingDto): Promise<Booking> {
    return this.request<Booking>('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
    });
  }

  async getAvailability(date?: string, serviceId?: string): Promise<AvailabilityResponse> {
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (serviceId) params.append('serviceId', serviceId);
    const query = params.toString();
    return this.request<AvailabilityResponse>(`/api/bookings/availability${query ? `?${query}` : ''}`);
  }

  // Contact
  async submitContact(inquiry: ContactInquiry): Promise<void> {
    return this.request<void>('/api/contact', {
      method: 'POST',
      body: JSON.stringify(inquiry),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
