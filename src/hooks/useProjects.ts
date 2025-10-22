import { useApi } from './useApi';
import type { Project } from '../types';

export const useProjects = () => useApi<Project[]>('/projects');