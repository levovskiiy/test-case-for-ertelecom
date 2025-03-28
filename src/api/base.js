import { createClient } from '@supabase/supabase-js';
import { API_CONFIG } from '@/common/config/api.js';

export const server = createClient(API_CONFIG.url, API_CONFIG.key);

