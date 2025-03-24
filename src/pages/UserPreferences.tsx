import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonItemDivider, IonGrid, IonRow, IonCol, IonButtons, IonMenuButton, IonButton } from '@ionic/react';
import { getUserById, updateUser } from '../services/UserServices';
import { useToast } from '../context/ToastContext';
import { insertLog } from '../services/AdminService';
import { handleError } from '../utils/ErrorUtils';

const UserPreferences: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [editedUser, setEditedUser] = useState<any>({});
  const { showToast } = useToast();
  const pageTitle = location.pathname.substring(1) || 'Page';
  const userId = 1; // À remplacer par l'ID de l'utilisateur connecté
  
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data, error } = await getUserById(userId);
    if (error) {
      await handleError({
        error,
        message: 'Erreur lors de la récupération de l\'utilisateur',
        logToDatabase: true
      });
    } else {
      if (data) {
        setUser(data);
      }
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setEditedUser({
      ...editedUser,
      [field]: value
    });
  };

  const handleSaveChanges = async () => {
    const { data, error } = await updateUser(userId, editedUser);
    if (error) {
      await handleError({
        error,
        message: 'Erreur lors de la mise à jour de l\'utilisateur',
        logToDatabase: true,
        userId: userId
      });
    } else {
      showToast('Utilisateur mis à jour avec succès');
      await insertLog('info', `Utilisateur ${userId} mis à jour avec succès`,
        { updatedUser: editedUser }, 'UserPreferences', userId);
    }
  };

  if (!user) {
    return (
      <IonPage>
        <IonContent>
          <p>Chargement...</p>
        </IonContent>
      </IonPage>
    );
  }

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
        <IonList>
          <IonItemDivider>Utilisateur</IonItemDivider>
          <IonItem>
            <IonGrid>
              <IonRow>
                <IonCol size="12" size-md="6">
                  <IonInput
                    label='Prénom'
                    value={editedUser.first_name || user.first_name}
                    onIonInput={(e) => handleInputChange('first_name', e.detail.value!)}
                  />
                </IonCol>
                <IonCol size="12" size-md="6">
                  <IonInput
                    label='Nom'
                    value={editedUser.last_name || user.last_name}
                    onIonInput={(e) => handleInputChange('last_name', e.detail.value!)}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12" size-md="6">
                  <IonInput
                    label='Téléphone'
                    value={editedUser.phone || user.phone}
                    onIonInput={(e) => handleInputChange('phone', e.detail.value!)}
                  />
                </IonCol>
                <IonCol size="12" size-md="6">
                  <IonInput
                    label='Photo de profil'
                    value={editedUser.profile_picture || user.profile_picture}
                    onIonInput={(e) => handleInputChange('profile_picture', e.detail.value!)}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <IonInput
                    label='Bio'
                    value={editedUser.bio || user.bio}
                    onIonInput={(e) => handleInputChange('bio', e.detail.value!)}
                  />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
        </IonList>
        <IonButton expand="full" onClick={handleSaveChanges}>Enregistrer</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default UserPreferences;