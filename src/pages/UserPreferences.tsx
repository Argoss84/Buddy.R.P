import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonItemDivider } from '@ionic/react';
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
          <IonTitle>Gestion des Préférences Utilisateur</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItemDivider>Liste des utilisateurs</IonItemDivider>
          {users.map(user => (
            <IonItem key={user.id}>
              <IonLabel position="fixed">Prénom</IonLabel>
              <IonInput
                value={user.first_name}
                onIonChange={(e) => handleUpdateUser(user.id, { ...user, first_name: e.detail.value! })}
              />
              <IonLabel position="fixed">Nom</IonLabel>
              <IonInput
                value={user.last_name}
                onIonChange={(e) => handleUpdateUser(user.id, { ...user, last_name: e.detail.value! })}
              />
              <IonLabel position="fixed">Téléphone</IonLabel>
              <IonInput
                value={user.phone}
                onIonChange={(e) => handleUpdateUser(user.id, { ...user, phone: e.detail.value! })}
              />
              <IonLabel position="fixed">Photo de profil</IonLabel>
              <IonInput
                value={user.profile_picture}
                onIonChange={(e) => handleUpdateUser(user.id, { ...user, profile_picture: e.detail.value! })}
              />
              <IonLabel position="fixed">Bio</IonLabel>
              <IonInput
                value={user.bio}
                onIonChange={(e) => handleUpdateUser(user.id, { ...user, bio: e.detail.value! })}
              />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default UserPreferences;