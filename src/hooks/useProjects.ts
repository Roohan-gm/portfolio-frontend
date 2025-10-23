import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import type { Project } from '../types';

export const useProjects = () =>
  useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: () => api.get('/projects').then(res => res.data),
  });