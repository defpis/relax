import path from 'path';
import { PROJECT_ROOT } from './configs/constants';

export const resolveRoot = (...paths: string[]): string => path.resolve(PROJECT_ROOT, ...paths);
