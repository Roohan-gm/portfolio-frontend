import { useApi } from './useApi';
import type { Experience } from '../types';

export const useExperiences = () => useApi<Experience[]>('/experiences');