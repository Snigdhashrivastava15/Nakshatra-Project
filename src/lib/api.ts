// API configuration and utilities

// API base URL - includes /api prefix
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

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
  public readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/+$/, ''); // Remove trailing slashes
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ 
          message: `HTTP ${response.status}: ${response.statusText}` 
        }));
        const errorMessage = error.message || error.error || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error: any) {
      // Handle network errors (CORS, connection refused, etc.)
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error(`Unable to connect to server at ${this.baseUrl}. Please check if the backend is running.`);
      }
      throw error;
    }
  }

  // Services
  async getServices(): Promise<Service[]> {
    return this.request<Service[]>('/services');
  }

  async getService(id: string): Promise<Service> {
    return this.request<Service>(`/services/${id}`);
  }

  // Bookings
  async createBooking(booking: CreateBookingDto): Promise<Booking> {
    return this.request<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
    });
  }

  async getAvailability(date?: string, serviceId?: string): Promise<AvailabilityResponse> {
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (serviceId) params.append('serviceId', serviceId);
    const query = params.toString();
    return this.request<AvailabilityResponse>(`/bookings/availability${query ? `?${query}` : ''}`);
  }

  // Contact
  async submitContact(inquiry: ContactInquiry): Promise<void> {
    return this.request<void>('/contact', {
      method: 'POST',
      body: JSON.stringify(inquiry),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
