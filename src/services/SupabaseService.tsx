import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = localStorage.getItem('access_token') || import.meta.env.VITE_SUPABASE_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key in environment variables');
}
// console.log(supabaseUrl, supabaseKey);
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;