import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, homeOutline, homeSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';

export interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  subPages?: AppPage[];
}

export const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/Home',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Maison & Gestion du Foyer',
    url: '/House',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
    subPages: [
      {
        title: 'Budget & Finances',
        url: '/House/Budget',
        iosIcon: mailOutline,
        mdIcon: mailSharp
      },
      {
        title: 'Entretien & Travaux',
        url: '/House/Household',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      },
      {
        title: 'Gestion des Équipements',
        url: '/House/Equipments',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      },
      {
        title: 'Domotique',
        url: '/House/IOT',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      },
      {
        title: 'Stock & Inventaire',
        url: '/House/Inventory',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      }
    ]
  },
  {
    title: 'Tâches & Productivité',
    url: '/Tasks',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
    subPages: [
      {
        title: 'To-Do List & Rappels',
        url: '/Tasks/ToDo',
        iosIcon: mailOutline,
        mdIcon: mailSharp
      },
      {
        title: 'Projets personnels',
        url: '/Tasks/Projects',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      },
      {
        title: 'Suivi des Habitudes',
        url: '/Tasks/Habits',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      },
      {
        title: 'Prise de Notes & Idées',
        url: '/Tasks/Notes',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      }
    ]
  },
  {
    title: 'Sport & Bien-être',
    url: '/Wellness',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
    subPages: [
      {
        title: 'Programmes d’Entraînement',
        url: '/Wellness/Training',
        iosIcon: mailOutline,
        mdIcon: mailSharp
      },
      {
        title: 'Suivi des Performances',
        url: '/Wellness/Performance',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      },
      {
        title: 'Santé & Forme',
        url: '/Wellness/Health',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      },
      {
        title: 'Nutrition & Recettes',
        url: '/Wellness/Nutrition',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      }
    ]
  },
  {
    title: 'Social & Relationnel',
    url: '/Social',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
    subPages: [
      {
        title: 'Annuaire & Contacts',
        url: '/Social/Contacts',
        iosIcon: mailOutline,
        mdIcon: mailSharp
      },
      {
        title: 'Gestion des Événements',
        url: '/Social/Events',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      },
      {
        title: 'Communication',
        url: '/Social/Communication',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      }
    ]
  },
  {
    title: 'Agenda & Planification',
    url: '/Agenda',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
    subPages: [
      {
        title: 'Calendrier Global',
        url: '/Agenda/Calendar',
        iosIcon: mailOutline,
        mdIcon: mailSharp
      },
      {
        title: 'Rendez-vous & Meetings',
        url: '/Agenda/Meetings',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      },
      {
        title: 'Gestion du Temps',
        url: '/Agenda/TimeManagement',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      }
    ]
  },
  {
    title: 'Travail & Études',
    url: '/Work',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
    subPages: [
      {
        title: 'Gestion des Projets',
        url: '/Work/Projects',
        iosIcon: mailOutline,
        mdIcon: mailSharp
      },
      {
        title: 'Notes & Documents',
        url: '/Work/Notes',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      },
      {
        title: 'Échéances & Deadlines',
        url: '/Work/Deadlines',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      }
    ]
  },
  {
    title: 'Loisirs & Culture',
    url: '/Leisure',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
    subPages: [
      {
        title: 'Lecture & Médias',
        url: '/Leisure/Media',
        iosIcon: mailOutline,
        mdIcon: mailSharp
      },
      {
        title: 'Voyages & Sorties',
        url: '/Leisure/Travel',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      },
      {
        title: 'Activités Créatives',
        url: '/Leisure/Creative',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      }
    ]
  },
  {
    title: 'Finance & Administration',
    url: '/Finance',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
    subPages: [
      {
        title: 'Comptabilité personnelle',
        url: '/Finance/Accounting',
        iosIcon: mailOutline,
        mdIcon: mailSharp
      },
      {
        title: 'Gestion des Abonnements',
        url: '/Finance/Subscriptions',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      },
      {
        title: 'Démarches Administratives',
        url: '/Finance/Admin',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      }
    ]
  },
  {
    title: 'Paramètres & Personnalisation',
    url: '/Settings',
    iosIcon: warningOutline,
    mdIcon: warningSharp,
    subPages: [
      {
        title: 'Préférences utilisateur',
        url: '/Settings/Preferences',
        iosIcon: mailOutline,
        mdIcon: mailSharp
      },
      {
        title: 'Sécurité & Confidentialité',
        url: '/Settings/Security',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      },
      {
        title: 'Synchronisation & Intégrations',
        url: '/Settings/Sync',
        iosIcon: bookmarkOutline,
        mdIcon: bookmarkOutline
      }
    ]
  }
];