import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;

export const validateCredentials = (url, key) => {
  return !!(
    url &&
    key &&
    url.trim() !== '' &&
    key.trim() !== '' &&
    !url.includes('dummy') &&
    !key.includes('dummykey') &&
    url.startsWith('https://')
  );
};

export const isSupabaseConfigured = validateCredentials(supabaseUrl, supabaseAnonKey);

export const initSupabaseClient = (url, key) => {
  if (!validateCredentials(url, key)) return null;
  try {
    return createClient(url, key, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      }
    });
  } catch (err) {
    console.error('🍵 [Supabase] Client instantiation failed:', err);
    return null;
  }
};

export let supabase = initSupabaseClient(supabaseUrl, supabaseAnonKey);

export const getSupabase = () => supabase;

export const updateSupabaseClient = (url, key) => {
  supabase = initSupabaseClient(url, key);
  return supabase;
};

