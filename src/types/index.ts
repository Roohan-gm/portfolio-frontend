export type ContactStatus = "new" | "read" | "replied";

export type ProjectStatus = "Live" | "In Development" | "Completed";

export interface ContactFormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  id?: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface Stats {
  yearsExperience: number;
  productsShipped: number;
  activeUsers: number; // e.g., "100"
  averageRating: number; // e.g., "4.8"
}

export interface DeveloperInfo {
  _id: string;
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  social: SocialLink[];
  avatar: string;
  resumeUrl: string;
  stats: Stats;
  availability: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  long_description: string;
  tech_stack: string[];
  features: string[];
  images: string[];
  demo_url: string;
  github_repos: { name: string; url: string }[];
  status: ProjectStatus;
  category: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  _id: string;
  skills: { category: string; name: string; level?: number; years?: number }[];
  created_at: string;
  updated_at: string;
}

export interface Experience {
  _id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  title: string;
  company: string;
  content: string;
  avatar: string;
  order: number;
  created_at: string;
  updated_at: string;
}
