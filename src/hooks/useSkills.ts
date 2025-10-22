import { useApi } from './useApi';
import type { Skill } from '../types';

export const useSkills = () => useApi<Skill>('/skills');