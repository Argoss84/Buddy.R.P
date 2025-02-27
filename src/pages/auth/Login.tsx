import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonLoading, IonAlert } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthenticationContect';

const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/Home');
    }
  }, [isAuthenticated, history]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      history.push('/Home'); // Redirection après connexion réussie
    } catch (e) {
      setError((e as any).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            required
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            required
          />
        </IonItem>
        <IonButton expand="full" onClick={handleLogin} disabled={loading}>
          Login
        </IonButton>
        <IonLoading isOpen={loading} message={'Please wait...'} />
        <IonAlert
          isOpen={!!error}
          onDidDismiss={() => setError(null)}
          header={'Error'}
          message={error || ''}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;