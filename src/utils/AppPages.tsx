import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, homeOutline, homeSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import Home from '../pages/Home';
import Budget from '../pages/Budget';
import Default from '../pages/Default';

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
        title: 'Budget & Finances',
        url: '/House/Budget',
        iosIcon: mailOutline,
        mdIcon: mailSharp,
        component: Budget,
        visible: true,
        requiredAccessRight: 'House_Budget'
      },
      {
        title: 'Entretien & Travaux',
        url: '/House/Household',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true,
        requiredAccessRight: 'House'
      },
      {
        title: 'Gestion des Équipements',
        url: '/House/Equipments',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      },
      {
        title: 'Domotique',
        url: '/House/IOT',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      },
      {
        title: 'Stock & Inventaire',
        url: '/House/Inventory',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      }
    ]
  },
  {
    title: 'Tâches & Productivité',
    url: '/Tasks',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
    component: Default,
    visible: true,
    subPages: [
      {
        title: 'To-Do List & Rappels',
        url: '/Tasks/ToDo',
        iosIcon: mailOutline,
        mdIcon: mailSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Projets personnels',
        url: '/Tasks/Projects',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      },
      {
        title: 'Suivi des Habitudes',
        url: '/Tasks/Habits',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      },
      {
        title: 'Prise de Notes & Idées',
        url: '/Tasks/Notes',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      }
    ]
  },
  {
    title: 'Sport & Bien-être',
    url: '/Wellness',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
    component: Default,
    visible: true,
    subPages: [
      {
        title: 'Programmes d’Entraînement',
        url: '/Wellness/Training',
        iosIcon: mailOutline,
        mdIcon: mailSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Suivi des Performances',
        url: '/Wellness/Performance',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      },
      {
        title: 'Santé & Forme',
        url: '/Wellness/Health',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      },
      {
        title: 'Nutrition & Recettes',
        url: '/Wellness/Nutrition',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      }
    ]
  },
  {
    title: 'Social & Relationnel',
    url: '/Social',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
    component: Default,
    visible: true,
    subPages: [
      {
        title: 'Annuaire & Contacts',
        url: '/Social/Contacts',
        iosIcon: mailOutline,
        mdIcon: mailSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Gestion des Événements',
        url: '/Social/Events',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      },
      {
        title: 'Communication',
        url: '/Social/Communication',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      }
    ]
  },
  {
    title: 'Agenda & Planification',
    url: '/Agenda',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
    component: Default,
    visible: true,
    subPages: [
      {
        title: 'Calendrier Global',
        url: '/Agenda/Calendar',
        iosIcon: mailOutline,
        mdIcon: mailSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Rendez-vous & Meetings',
        url: '/Agenda/Meetings',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      },
      {
        title: 'Gestion du Temps',
        url: '/Agenda/TimeManagement',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      }
    ]
  },
  {
    title: 'Travail & Études',
    url: '/Work',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
    component: Default,
    visible: true,
    subPages: [
      {
        title: 'Gestion des Projets',
        url: '/Work/Projects',
        iosIcon: mailOutline,
        mdIcon: mailSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Notes & Documents',
        url: '/Work/Notes',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      },
      {
        title: 'Échéances & Deadlines',
        url: '/Work/Deadlines',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      }
    ]
  },
  {
    title: 'Loisirs & Culture',
    url: '/Leisure',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
    component: Default,
    visible: true,
    subPages: [
      {
        title: 'Lecture & Médias',
        url: '/Leisure/Media',
        iosIcon: mailOutline,
        mdIcon: mailSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Voyages & Sorties',
        url: '/Leisure/Travel',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      },
      {
        title: 'Activités Créatives',
        url: '/Leisure/Creative',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      }
    ]
  },
  {
    title: 'Finance & Administration',
    url: '/Finance',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
    component: Default,
    visible: true,
    subPages: [
      {
        title: 'Comptabilité personnelle',
        url: '/Finance/Accounting',
        iosIcon: mailOutline,
        mdIcon: mailSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Gestion des Abonnements',
        url: '/Finance/Subscriptions',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      },
      {
        title: 'Démarches Administratives',
        url: '/Finance/Admin',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      }
    ]
  },
  {
    title: 'Paramètres & Personnalisation',
    url: '/Settings',
    iosIcon: warningOutline,
    mdIcon: warningSharp,
    component: Default,
    visible: true,
    subPages: [
      {
        title: 'Préférences utilisateur',
        url: '/Settings/Preferences',
        iosIcon: mailOutline,
        mdIcon: mailSharp,
        component: Default,
        visible: true
      },
      {
        title: 'Sécurité & Confidentialité',
        url: '/Settings/Security',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      },
      {
        title: 'Synchronisation & Intégrations',
        url: '/Settings/Sync',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline,
        component: Default,
        visible: true
      }
    ]
  }
];