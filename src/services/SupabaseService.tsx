import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "";
const supabaseKey = "";
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;