import React, { useState } from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { chevronDownOutline, chevronForwardOutline, homeOutline } from 'ionicons/icons';
import './Menu.css';
import { appPages, AppPage } from '../utils/AppPages';

const Menu: React.FC = () => {
  const location = useLocation();
  const connectedUser = localStorage.getItem('connectedUser');
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (title: string) => {
    setOpenMenus(prevState => ({
      ...prevState,
      [title]: !prevState[title]
    }));
  };

  return (
    <IonMenu contentId="main" type="reveal">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Buddy.R.P</IonListHeader>
          <IonNote>Bonjour {connectedUser ?? "ø"}</IonNote>
          <IonMenuToggle autoHide={false}>
            <IonItem
              className={location.pathname === '/Home' ? 'selected' : ''}
              routerLink="/Home"
              routerDirection="none"
              lines="none"
              detail={false}
            >
              <IonIcon aria-hidden="true" slot="start" ios={homeOutline} md={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonItem>
          </IonMenuToggle>
          {appPages.filter(appPage => appPage.visible).map((appPage, index) => (
            <div key={index}>
              <IonItem
                className={location.pathname === appPage.url ? 'selected' : ''}
                lines="none"
                detail={false}
                onClick={() => toggleMenu(appPage.title)}
                button
              >
                <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                <IonLabel>{appPage.title}</IonLabel>
                {appPage.subPages && (
                  <IonIcon
                    aria-hidden="true"
                    slot="end"
                    ios={openMenus[appPage.title] ? chevronDownOutline : chevronForwardOutline}
                    md={openMenus[appPage.title] ? chevronDownOutline : chevronForwardOutline}
                  />
                )}
              </IonItem>
              {appPage.subPages && openMenus[appPage.title] && appPage.subPages.filter(subPage => subPage.visible).map((subPage, subIndex) => (
                <IonMenuToggle key={subIndex} autoHide={false}>
                  <IonItem
                    className={location.pathname === subPage.url ? 'selected' : ''}
                    routerLink={subPage.url}
                    routerDirection="none"
                    lines="none"
                    detail={false}
                    style={{ paddingLeft: '30px' }}
                  >
                    <IonIcon aria-hidden="true" slot="start" ios={subPage.iosIcon} md={subPage.mdIcon} />
                    <IonLabel>{subPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              ))}
            </div>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;