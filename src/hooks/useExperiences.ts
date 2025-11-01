import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import type { Experience } from '../types';

export const useExperiences = (enabled = true) =>
  useQuery<Experience[]>({
    queryKey: ['experiences'],
    queryFn: () => api.get('/experiences').then(res => res.data),
    enabled,
  });