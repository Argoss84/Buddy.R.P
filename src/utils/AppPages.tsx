import { archiveOutline, archiveSharp, barbell, barbellOutline, barbellSharp, bookmarkOutline, brushOutline, brushSharp, businessOutline, businessSharp, calendarClearOutline, calendarClearSharp, calendarNumberOutline, calendarNumberSharp, calendarOutline, calendarSharp, callOutline, callSharp, cardOutline, cardSharp, carOutline, cashOutline, cashSharp, chatbubblesOutline, chatbubblesSharp, clipboardOutline, clipboardSharp, colorWandOutline, colorWandSharp, createOutline, createSharp, fileTrayStackedOutline, fileTrayStackedSharp, fitnessOutline, fitnessSharp, hammerOutline, hammerSharp, heartOutline, heartSharp, homeOutline, homeSharp, hourglassOutline, hourglassSharp, mailOutline, mailSharp, nutritionOutline, nutritionSharp, paperPlaneOutline, paperPlaneSharp, pencilOutline, pencilSharp, peopleCircleOutline, peopleCircleSharp, peopleOutline, peopleSharp, settingsOutline, settingsSharp, shieldCheckmarkOutline, shieldCheckmarkSharp, syncOutline, syncSharp, trashOutline, trashSharp, tvOutline, tvSharp, walletOutline, walletSharp, warningOutline, warningSharp, wifiOutline, wifiSharp } from 'ionicons/icons';
import Home from '../pages/Home';
import Budget from '../pages/Budget';
import Default from '../pages/Default';
import UserPreferences from '../pages/UserPreferences';

export interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  component: React.FC;
  visible: boolean;
  requiredAccessRight?: string; // Ajout du champ requiredAccessRight
  subPages?: AppPage[];
}

export const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/Home',
    iosIcon: homeOutline,
    mdIcon: homeSharp,
    component: Home,
    visible: false
  },
  {
    title: 'Maison & Gestion du Foyer',
    url: '/House',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
    component: Default,
    visible: true,
    subPages: [
      {
        title: 'Entretien & Travaux',
        url: '/House/Household',
        iosIcon: hammerOutline,
        mdIcon: hammerSharp,
        component: Default,
        visible: true,
        requiredAccessRight: 'House'
      },
      {
        title: 'Gestion des Équipements',
        url: '/House/Equipments',
        iosIcon: tvOutline,
        mdIcon: tvSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Domotique',
        url: '/House/IOT',
        iosIcon: wifiOutline,
        mdIcon: wifiSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Stock & Inventaire',
        url: '/House/Inventory',
        iosIcon: fileTrayStackedOutline,
        mdIcon: fileTrayStackedSharp,
        component: Default,
        visible: true
      }
    ]
  },
  {
    title: 'Tâches & Productivité',
    url: '/Tasks',
    iosIcon: calendarClearOutline,
    mdIcon: calendarClearSharp,
    component: Default,
    visible: true,
    subPages: [
      {
        title: 'To-Do List & Rappels',
        url: '/Tasks/ToDo',
        iosIcon: createOutline,
        mdIcon: createSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Projets personnels',
        url: '/Tasks/Projects',
        iosIcon: brushOutline,
        mdIcon: brushSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Prise de Notes & Idées',
        url: '/Tasks/Notes',
        iosIcon: pencilOutline,
        mdIcon: pencilSharp,
        component: Default,
        visible: true
      }
    ]
  },
  {
    title: 'Sport & Bien-être',
    url: '/Wellness',
    iosIcon: fitnessOutline,
    mdIcon: fitnessSharp,
    component: Default,
    visible: true,
    subPages: [
      {
        title: 'Suivi des Performances',
        url: '/Wellness/Performance',
        iosIcon: barbellOutline,
        mdIcon: barbellSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Santé & Forme',
        url: '/Wellness/Health',
        iosIcon: heartOutline,
        mdIcon: heartSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Nutrition & Recettes',
        url: '/Wellness/Nutrition',
        iosIcon: nutritionOutline,
        mdIcon: nutritionSharp,
        component: Default,
        visible: true
      }
    ]
  },
  {
    title: 'Social & Relationnel',
    url: '/Social',
    iosIcon: peopleCircleOutline,
    mdIcon: peopleCircleSharp,
    component: Default,
    visible: true,
    subPages: [
      {
        title: 'Annuaire & Contacts',
        url: '/Social/Contacts',
        iosIcon: callOutline,
        mdIcon: callSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Gestion des Événements',
        url: '/Social/Events',
        iosIcon: calendarOutline,
        mdIcon: calendarSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Communication',
        url: '/Social/Communication',
        iosIcon: chatbubblesOutline,
        mdIcon: chatbubblesSharp,
        component: Default,
        visible: true
      }
    ]
  },
  {
    title: 'Agenda & Planification',
    url: '/Agenda',
    iosIcon: calendarOutline,
    mdIcon: calendarSharp,
    component: Default,
    visible: true,
    subPages: [
      {
        title: 'Calendrier Global',
        url: '/Agenda/Calendar',
        iosIcon: calendarNumberOutline,
        mdIcon: calendarNumberSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Rendez-vous & Meetings',
        url: '/Agenda/Meetings',
        iosIcon: peopleOutline,
        mdIcon: peopleSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Gestion du Temps',
        url: '/Agenda/TimeManagement',
        iosIcon: hourglassOutline,
        mdIcon: hourglassSharp,
        component: Default,
        visible: true
      }
    ]
  },
  {
    title: 'Finance & Administration',
    url: '/Finance',
    iosIcon: businessOutline,
    mdIcon: businessSharp,
    component: Default,
    visible: true,
    subPages: [
      {
        title: 'Comptabilité personnelle',
        url: '/Finance/Accounting',
        iosIcon: walletOutline,
        mdIcon: walletSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Gestion des Abonnements',
        url: '/Finance/Subscriptions',
        iosIcon: cardOutline,
        mdIcon: cardSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Démarches Administratives',
        url: '/Finance/Admin',
        iosIcon: clipboardOutline,
        mdIcon: clipboardSharp,
        component: Default,
        visible: true
      }
    ]
  },
  {
    title: 'Paramètres & Personnalisation',
    url: '/Settings',
    iosIcon: settingsOutline,
    mdIcon: settingsSharp,
    component: Default,
    visible: true,
    subPages: [
      {
        title: 'Préférences utilisateur',
        url: '/Settings/Preferences',
        iosIcon: colorWandOutline,
        mdIcon: colorWandSharp,
        component: UserPreferences,
        visible: true
      },
      {
        title: 'Sécurité & Confidentialité',
        url: '/Settings/Security',
        iosIcon: shieldCheckmarkOutline,
        mdIcon: shieldCheckmarkSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Synchronisation & Intégrations',
        url: '/Settings/Sync',
        iosIcon: syncOutline,
        mdIcon: syncSharp,
        component: Default,
        visible: true
      }
    ]
  }
];