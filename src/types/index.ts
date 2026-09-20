export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  price?: number;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  image: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sets?: string;
  duration?: string;
  targetMuscles: string[];
  tips: string[];
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
  social: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  experience: string;
  certifications: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  features: string[];
  notIncluded?: string[];
  highlighted?: boolean;
  ctaText: string;
  popular?: boolean;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  date: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SubscriptionFormData {
  name: string;
  email: string;
  phone: string;
  plan: string;
  paymentMethod: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
    instagram: string;
    facebook: string;
    youtube: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'FlexFits',
  description: 'Transform your body and mind with expert fitness training',
  url: 'https://flexfits.com',
  ogImage: '/assets/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/flexfits',
    github: 'https://github.com/flexfits',
    instagram: 'https://instagram.com/flexfits',
    facebook: 'https://facebook.com/flexfits',
    youtube: 'https://youtube.com/flexfits',
  },
};