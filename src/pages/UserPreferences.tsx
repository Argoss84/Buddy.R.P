import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonItemDivider, IonGrid, IonRow, IonCol, IonButtons, IonMenuButton, IonButton } from '@ionic/react';
import { getUsers, updateUser } from '../services/UserServices';
import { useToast } from '../context/ToastContext';
import { insertLog } from '../services/AdminService'; // Importer la méthode insertLog

const UserPreferences: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [editedUsers, setEditedUsers] = useState<any>({});
  const { showToast } = useToast();
  const pageTitle = location.pathname.substring(1) || 'Page';
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await getUsers();
    if (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      showToast('Erreur lors de la récupération des utilisateurs');
    } else {
      if (data) {
        setUsers(data);
      }
    }
  };

  const handleInputChange = (id: any, field: string, value: any) => {
    setEditedUsers({
      ...editedUsers,
      [id]: {
        ...editedUsers[id],
        [field]: value
      }
    });
  };

  const handleSaveChanges = async () => {
    const updatedUsers = [...users];
    for (const id in editedUsers) {
      const updatedUser = editedUsers[id];
      const { data, error } = await updateUser(id, updatedUser);
      if (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        showToast('Erreur lors de la mise à jour de l\'utilisateur');
      } else {
        showToast('Utilisateur mis à jour avec succès');
        // Insérer un log après une mise à jour réussie
        await insertLog('info',`Utilisateur ${id} mis à jour avec succès`,
          { updatedUser },'UserPreferences',Number(id));
      }
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
        <IonList>
          <IonItemDivider>Utilisateur</IonItemDivider>
          {users.map(user => (
            <IonItem key={user.id}>
              <IonGrid>
                <IonRow>
                  <IonCol size="12" size-md="6">
                    <IonInput
                      label='Prénom'
                      value={editedUsers[user.id]?.first_name || user.first_name}
                      onIonInput={(e) => handleInputChange(user.id, 'first_name', e.detail.value!)}
                    />
                  </IonCol>
                  <IonCol size="12" size-md="6">
                    <IonInput
                      label='Nom'
                      value={editedUsers[user.id]?.last_name || user.last_name}
                      onIonInput={(e) => handleInputChange(user.id, 'last_name', e.detail.value!)}
                    />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12" size-md="6">
                    <IonInput
                      label='Téléphone'
                      value={editedUsers[user.id]?.phone || user.phone}
                      onIonInput={(e) => handleInputChange(user.id, 'phone', e.detail.value!)}
                    />
                  </IonCol>
                  <IonCol size="12" size-md="6">
                    <IonInput
                      label='Photo de profil'
                      value={editedUsers[user.id]?.profile_picture || user.profile_picture}
                      onIonInput={(e) => handleInputChange(user.id, 'profile_picture', e.detail.value!)}
                    />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12">
                    <IonInput
                      label='Bio'
                      value={editedUsers[user.id]?.bio || user.bio}
                      onIonInput={(e) => handleInputChange(user.id, 'bio', e.detail.value!)}
                    />
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          ))}
        </IonList>
        <IonButton expand="full" onClick={handleSaveChanges}>Enregistrer</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default UserPreferences;