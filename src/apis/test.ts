import { http } from '@/server';

export const ping = (): Promise<{ msg: string }> => http.get('/api/ping').then((response) => response.data);
