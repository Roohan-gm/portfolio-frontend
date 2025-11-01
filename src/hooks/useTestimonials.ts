import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import type { Testimonial } from '../types';

export const useTestimonials = (enabled = true) =>
  useQuery<Testimonial[]>({
    queryKey: ['testimonials'],
    queryFn: () => api.get('/testimonials').then(res => res.data),
    enabled,
  });