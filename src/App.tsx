// src/App.tsx
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Menu } from './components/Menu';
import { AppPage, appPages } from './utils/AppPages';
import E404 from './pages/E404';
import { useAuth } from './context/AuthenticationContect';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

import '@ionic/react/css/palettes/dark.always.css'; 
// import '@ionic/react/css/palettes/dark.class.css'; 
// import '@ionic/react/css/palettes/dark.system.css';

setupIonicReact();

const generateRoutes = (pages: AppPage[], accessRights: string[]): JSX.Element[] => {
  return pages.map((page) => {
    if (page.requiredAccessRight && (!accessRights || !accessRights.includes(page.requiredAccessRight))) {
      return <Route key={page.url} path={page.url} render={() => <Redirect to="/Home" />} />;
    }
    return <Route key={page.url} path={page.url} exact component={page.component} />;
  }).concat(
    pages.filter(page => page.subPages).flatMap(page => generateRoutes(page.subPages || [], accessRights))
  );
};

const App: React.FC = () => {
  const { session, loading, userInfo } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Vous pouvez remplacer cela par un indicateur de chargement personnalisé
  }

  // Extraire les noms des droits d'accès de l'utilisateur
  const userAccessRights = userInfo && userInfo[0] ? userInfo[0].user_access_rights.map((uar: { access_rights: { name: any; }; }) => uar.access_rights.name) : [];

  return (
    <IonApp>
      <IonReactRouter>
        {session ? (
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Switch>
                <Route path="/" exact>
                  <Redirect to="/Home" />
                </Route>
                {userAccessRights.length > 0 ? generateRoutes(appPages, userAccessRights) : null}
                <Route path="*" component={E404} />
              </Switch>
            </IonRouterOutlet>
          </IonSplitPane>
        ) : (
          <IonRouterOutlet id="main">
            <Switch>
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </IonRouterOutlet>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;