import { supabaseClient } from '../context/AuthenticationContect';

export interface Notification {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
}

class NotifServices {
  private channel: any;

  subscribeToNotifications(userId: number, callback: (payload: any) => void) {
    // Unsubscribe from existing channel if any
    if (this.channel) {
      this.channel.unsubscribe();
    }
    console.log("userId: " + userId);
    // Create new channel subscription
    this.channel = supabaseClient.channel('notifications-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId} OR user_id IS NULL`
        },
        (payload: any) => {
            console.log(payload);
            callback(payload);
        }
      )
      .subscribe();
  }

  unsubscribe() {
    if (this.channel) {
      this.channel.unsubscribe();
    }
  }
}

export const notifServices = new NotifServices(); 