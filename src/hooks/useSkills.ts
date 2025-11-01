import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import type { Skill } from '../types';

export const useSkills = (enabled = true) =>
  useQuery<Skill[]>({
    queryKey: ['skills'],
    queryFn: () => api.get('/skills').then(res => res.data),
    enabled,
  });