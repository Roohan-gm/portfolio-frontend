import { useApi } from './useApi';
import type { DeveloperInfo } from '../types';

export const useDeveloperInfo = () => useApi<DeveloperInfo>('/developer');