import { supabaseClient } from '../context/AuthenticationContect';

export interface Notification {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
  type: string;
}

class NotifServices {
  private channel: any;
  private globalChannel: any;

  async insertNotification(userId: number | null, content: string, type: string = 'user'): Promise<Notification | null> {
    const { data, error } = await supabaseClient
      .from('notifications')
      .insert([
        { user_id: userId, content: content, type: type }
      ])
      .select();

    if (error) {
      console.error('Error inserting notification:', error);
      return null;
    }

    return data[0];
  }

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
          filter: `user_id=eq.${userId}` // Updated to only include notifications for the specific userId
        },
        (payload: any) => {
            console.log(payload);
            callback(payload);
        }
      )
      .subscribe();
  }

  subscribeToGlobalNotifications(callback: (payload: any) => void) {
    // Unsubscribe from existing global channel if any
    if (this.globalChannel) {
      this.globalChannel.unsubscribe();
    }

    // Create new channel subscription for global notifications
    this.globalChannel = supabaseClient.channel('global-notifications-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `type=eq.global`
        },
        (payload: any) => {
          console.log('Global notification:', payload);
          callback(payload);
        }
      )
      .subscribe();
  }

  unsubscribe() {
    if (this.channel) {
      this.channel.unsubscribe();
    }
    if (this.globalChannel) {
      this.globalChannel.unsubscribe();
    }
  }
}

export const notifServices = new NotifServices(); 