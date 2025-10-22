import { useApi } from './useApi';
import type { Testimonial } from '../types';

export const useTestimonials = () => useApi<Testimonial[]>('/testimonials');