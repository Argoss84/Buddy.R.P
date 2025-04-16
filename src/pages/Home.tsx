import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Page.css';
import { useToast } from '../context/ToastContext';
import { notifServices } from '../services/NotifServices';
import { useAuth } from '../context/AuthenticationContect';

const Home: React.FC = () => {
  const { showToast } = useToast();
  const { userInfo: user } = useAuth();

  const pageTitle = location.pathname.substring(1) || 'Page';
  const handleClick = () => {
    showToast('🦄 Hello, this is a toast message!');
  };

  const handleClickWithOptions = () => {
    showToast('🦄 Hello, this is a custom toast message!', {
      position: "bottom-left",
      autoClose: 3000,
    });
  };

  const handleAddNotification = async () => {
    if (!user) {
      showToast('Please login to add notifications');
      return;
    }

    const notification = await notifServices.insertNotification(user[0].id, 'New notification from ' + user[0].email);
    if (notification) {
      showToast('Notification added successfully!');
    } else {
      showToast('Failed to add notification');
    }
  };

  const handleAddGlobalNotification = async () => {
    if (!user) {
      showToast('Please login to add notifications');
      return;
    }

    const notification = await notifServices.insertNotification(
      null, 
      '🔔 Global notification from ' + user[0].email,
      'global'
    );
    if (notification) {
      showToast('Global notification added successfully!');
    } else {
      showToast('Failed to add global notification');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{pageTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{pageTitle}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="ion-padding">
          <h1>{pageTitle}</h1>
          <IonButton 
            onClick={handleClick}
            color="secondary"
            shape="round"
            style={{
              '--background': 'linear-gradient(45deg, #FF69B4, #9370DB)',
              '--border-radius': '20px',
              '--box-shadow': '0 4px 15px rgba(147, 112, 219, 0.4)',
              margin: '8px'
            }}
          >
            🦄 Show Magical Toast
          </IonButton>
          <IonButton
            onClick={handleClickWithOptions}
            color="tertiary" 
            shape="round"
            style={{
              '--background': 'linear-gradient(45deg, #FF1493, #4B0082)',
              '--border-radius': '20px', 
              '--box-shadow': '0 4px 15px rgba(255, 20, 147, 0.4)',
              margin: '8px'
            }}
          >
            ✨ Show Rainbow Toast
          </IonButton>
          <IonButton
            onClick={handleAddNotification}
            color="primary"
            shape="round"
            style={{
              '--background': 'linear-gradient(45deg, #4CAF50, #2196F3)',
              '--border-radius': '20px',
              '--box-shadow': '0 4px 15px rgba(33, 150, 243, 0.4)',
              margin: '8px'
            }}
          >
            🔔 Add User Notification
          </IonButton>
          <IonButton
            onClick={handleAddGlobalNotification}
            color="warning"
            shape="round"
            style={{
              '--background': 'linear-gradient(45deg, #FF9800, #F44336)',
              '--border-radius': '20px',
              '--box-shadow': '0 4px 15px rgba(244, 67, 54, 0.4)',
              margin: '8px'
            }}
          >
            🌍 Add Global Notification
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;