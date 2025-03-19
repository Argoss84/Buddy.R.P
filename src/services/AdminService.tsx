import { supabaseClient } from '../context/AuthenticationContect';

export const insertLog = async (
    log_level: string,
    message: string,
    context: object,
    source: string,
    user_id: number
  ) => {
    const { data, error } = await supabaseClient
      .from('logs')
      .insert([
        {
          log_level,
          message,
          context,
          source,
          user_id
        }
      ]);
  
    if (error) {
      console.error('Error inserting log:', error);
      throw error;
    }
  
    return data;
  };
