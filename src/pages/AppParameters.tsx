import React, { useContext, useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonItemDivider, IonGrid, IonRow, IonCol, IonButtons, IonMenuButton, IonButton, IonSpinner } from '@ionic/react';
import { listParameters, updateParameters } from '../services/AdminService';
import { useToast } from '../context/ToastContext';
import { insertLog } from '../services/AdminService';
import { AuthContext } from '../context/AuthenticationContect'; // Importez le contexte d'authentification
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const AppParameters: React.FC = () => {
  const [parameters, setParameters] = useState<any[]>([]);
  const [editedParameters, setEditedParameters] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true); // Ajoutez l'état de chargement
  const { showToast } = useToast();
  const authContext = useContext(AuthContext); // Utilisez le contexte d'authentification
  const user = authContext ? authContext.userInfo : null;
  const pageTitle = location.pathname.substring(1) || 'Page';

  useEffect(() => {
    fetchParameters();
  }, []);

  const fetchParameters = async () => {
    try {
      const data = await listParameters();
      setParameters(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des paramètres :', error);
      showToast('Erreur lors de la récupération des paramètres');
    } finally {
      setLoading(false); // Arrêtez le chargement une fois les paramètres récupérés
    }
  };

  const handleInputChange = (name: string, value: any) => {
    setEditedParameters({
      ...editedParameters,
      [name]: value
    });
  };

  const handleSaveChanges = async () => {
    const updatedParameters = parameters.map(param => ({
      ...param,
      parameter_value: editedParameters[param.parameter_name] || param.parameter_value
    }));

    try {
      await updateParameters(updatedParameters);
      showToast('Paramètres mis à jour avec succès');
      await insertLog('info', 'Paramètres mis à jour avec succès', { updatedParameters }, 'AppParameters', user[0].id);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des paramètres :', error);
      showToast('Erreur lors de la mise à jour des paramètres');
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
        {loading ? (
          <DotLottieReact
          src="src\lotties\UnicornRainbow.json"
          loop
          autoplay
          width={50}
          height={50}
        />
        ) : (
          <IonList>
            <IonItemDivider>Paramètres de l'application</IonItemDivider>
            {parameters.map(param => (
              <IonItem key={param.parameter_name}>
                <IonGrid>
                  <IonRow>
                    <IonCol size="12" size-md="6">
                      <IonInput
                        label={param.parameter_name}
                        labelPlacement='fixed'
                        value={editedParameters[param.parameter_name] || param.parameter_value}
                        onIonInput={(e) => handleInputChange(param.parameter_name, e.detail.value!)}
                      />
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
            ))}
          </IonList>
        )}
        <IonButton expand="full" onClick={handleSaveChanges}>Enregistrer</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AppParameters;