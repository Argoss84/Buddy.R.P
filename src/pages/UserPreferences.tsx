import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonItemDivider, IonGrid, IonRow, IonCol, IonButtons, IonMenuButton } from '@ionic/react';
import { getUsers, updateUser } from '../services/UserServices';

const UserPreferences: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await getUsers();
    if (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
    } else {
      if (data) {
        setUsers(data);
      }
    }
  };

  const handleUpdateUser = async (id: any, updatedUser: any) => {
    const { data, error } = await updateUser(id, updatedUser);
    if (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
    } else {
      if (data) {
        setUsers(users.map(user => (user.id === id ? data[0] : user)));
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
          <IonTitle>Informations Utilisateur</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Informations Utilisateur</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItemDivider>Liste des utilisateurs</IonItemDivider>
          {users.map(user => (
            <IonItem key={user.id}>
              <IonGrid>
                <IonRow>
                  <IonCol size="12" size-md="6">
                    <IonInput
                      label='Prénom'
                      value={user.first_name}
                      onIonChange={(e) => handleUpdateUser(user.id, { ...user, first_name: e.detail.value! })}
                    />
                  </IonCol>
                  <IonCol size="12" size-md="6">
                    <IonInput
                      label='Nom'
                      value={user.last_name}
                      onIonChange={(e) => handleUpdateUser(user.id, { ...user, last_name: e.detail.value! })}
                    />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12" size-md="6">
                    <IonInput
                      label='Téléphone'
                      value={user.phone}
                      onIonChange={(e) => handleUpdateUser(user.id, { ...user, phone: e.detail.value! })}
                    />
                  </IonCol>
                  <IonCol size="12" size-md="6">
                    <IonInput
                      label='Photo de profil'
                      value={user.profile_picture}
                      onIonChange={(e) => handleUpdateUser(user.id, { ...user, profile_picture: e.detail.value! })}
                    />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12">
                    <IonInput
                      label='Bio'
                      value={user.bio}
                      onIonChange={(e) => handleUpdateUser(user.id, { ...user, bio: e.detail.value! })}
                    />
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default UserPreferences;