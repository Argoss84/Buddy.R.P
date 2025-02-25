import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import './Page.css';

const Page: React.FC = () => {
  const location = useLocation();
  
  // Récupérer le chemin sans le slash initial
  const pageTitle = location.pathname.substring(1) || 'Page';

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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page;
