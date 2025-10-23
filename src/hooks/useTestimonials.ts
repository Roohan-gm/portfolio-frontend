import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import type { Testimonial } from '../types';

export const useTestimonials = () =>
  useQuery<Testimonial[]>({
    queryKey: ['testimonials'],
    queryFn: () => api.get('/testimonials').then(res => res.data),
  });