import React, { useContext, useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonMenuButton,
  IonSelect,
  IonSelectOption,
  IonNote,
  IonSpinner,
} from '@ionic/react';
import { notifServices, Notification } from '../services/NotifServices';
import { AuthContext } from '../context/AuthenticationContect';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const NotificationHistory: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('all');
  const authContext = useContext(AuthContext);
  const user = authContext ? authContext.userInfo : null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await notifServices.getNotificationHistory(user?.[0]?.id || null, filter === 'all' ? undefined : filter);
      setNotifications(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Historique des notifications</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Historique des notifications</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonItem>
          <IonLabel>Type de notifications</IonLabel>
          <IonSelect value={filter} onIonChange={e => setFilter(e.detail.value)}>
            <IonSelectOption value="all">Toutes</IonSelectOption>
            <IonSelectOption value="user">Personnelles</IonSelectOption>
            <IonSelectOption value="global">Globales</IonSelectOption>
          </IonSelect>
        </IonItem>

        {loading ? (
          <div className="ion-text-center ion-padding">
            <DotLottieReact
              src="src\lotties\UnicornRainbow.json"
              loop
              autoplay
              width={50}
              height={50}
            />
          </div>
        ) : notifications.length === 0 ? (
          <div className="ion-text-center ion-padding">
            <IonNote>Aucune notification trouvée</IonNote>
          </div>
        ) : (
          <IonList>
            {notifications.map((notification) => (
              <IonItem key={notification.id}>
                <IonLabel>
                  <h2>{notification.content}</h2>
                  <p>{formatDate(notification.created_at)}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default NotificationHistory; 