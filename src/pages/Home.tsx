import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Page.css';
import { useToast } from '../context/ToastContext';

const Home: React.FC = () => {
  const { showToast } = useToast();

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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;