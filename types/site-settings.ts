export interface SiteSettings {
    companyName?: string;
    tagline?: string;
  
    email?: string;
    phone?: string;
    whatsapp?: string;
  
    website?: string;
    address?: string;
    googleMapsLink?: string;
  
    logo?: any;
    favicon?: any;
  
    socialLinks?: {
      platform: string;
      url: string;
    }[];
  }