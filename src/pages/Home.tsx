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
          <IonButton onClick={handleClick}>Show Toast</IonButton>
          <IonButton onClick={handleClickWithOptions}>Show Custom Toast</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;