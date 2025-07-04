import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      appName: "Lootopia",
      appDescription: "Discover Hidden Treasures Around You",
      appDescriptionShort: "Explore the World",
      appSubtitle:
        "Create exciting treasure hunts, explore mysterious locations, and embark on epic adventures with friends and family.",
      appCta: "Your next adventure awaits!",

      resumeExploring: "Resume Exploring",
      joinAdventure: "Join the Adventure",
      bothOptionsText:
        "Both options will take you to the treasure hunting dashboard",

      interactiveMaps: "Interactive Maps",
      teamAdventures: "Team Adventures",
      epicRewards: "Epic Rewards",

      welcomeHome: "Welcome to Lootopia",
      contentComingSoon: "Main content area - Coming soon!",
      backToLogin: "Back to Login",

      home: "Home",
      explore: "Explore",
      profile: "Profile",
      settings: "Settings",

      exploreComingSoon: "Explore new adventures - Coming soon!",
      profileComingSoon: "Your adventure profile - Coming soon!",

      darkMode: "Dark Mode",
      language: "Language",
      about: "About",

      notifications: "Notifications",
      privacy: "Privacy",
      helpSupport: "Help & Support",
      logout: "Logout",

      selectTheme: "Select Theme",
      lightTheme: "Light",
      darkTheme: "Dark",
      themeDescription: "Customize your app appearance and theme preferences",

      settingsSubtitle: "Manage your app preferences",
      languageDescription: "Change your preferred language",
      notificationsDescription: "Manage notification preferences",
      privacyDescription: "Privacy and security settings",
      aboutDescription: "App information and details",
      helpDescription: "Get help and support",
      lightThemeDescription: "Clean and bright interface",
      darkThemeDescription: "Easy on the eyes in low light",

      selectLanguage: "Select Language",

      pushNotifications: "Push Notifications",
      pushNotificationsDescription: "Receive notifications on your device",
      emailNotifications: "Email Notifications",
      emailNotificationsDescription: "Receive notifications via email",
      inAppNotifications: "In-App Notifications",
      inAppNotificationsDescription: "Show notifications within the app",
      notificationSounds: "Notification Sounds",
      notificationSoundsDescription: "Play sounds for notifications",
      additionalOptions: "Additional Options",
      quietHours: "Quiet Hours",

      dataCollection: "Data Collection",
      dataCollectionDescription: "Allow anonymous usage data collection",
      analytics: "Analytics",
      analyticsDescription: "Help improve the app with usage analytics",
      crashReporting: "Crash Reporting",
      crashReportingDescription: "Send crash reports to improve stability",
      locationSharing: "Location Sharing",
      locationSharingDescription: "Share location data for features",
      dataPrivacy: "Data Privacy",
      dataManagement: "Data Management",
      exportData: "Export Data",
      exportDataDescription: "Download your data",
      deleteData: "Delete Data",
      deleteDataDescription: "Permanently delete your data",

      getHelp: "Get Help",
      faq: "FAQ",
      faqDescription: "Frequently asked questions",
      contactSupport: "Contact Support",
      contactSupportDescription: "Get help from our support team",
      reportBug: "Report Bug",
      reportBugDescription: "Report issues or bugs",
      featureRequest: "Feature Request",
      featureRequestDescription: "Request new features",
      quickLinks: "Quick Links",
      userGuide: "User Guide",
      videoTutorials: "Video Tutorials",
      community: "Community",
      appInformation: "App Information",
      version: "Version",
      buildNumber: "Build Number",
      lastUpdate: "Last Update",

      contactUs: "Contact Us",
      termsConditions: "Terms & Conditions",
      privacyPolicy: "Privacy Policy",
      copyright: "© 2025 Lootopia. All rights reserved.",
    },
  },
  fr: {
    translation: {
      appName: "Lootopia",
      appDescription: "Découvrez des Trésors Cachés Autour de Vous",
      appDescriptionShort: "Explorez le Monde",
      appSubtitle:
        "Créez des chasses au trésor passionnantes, explorez des lieux mystérieux et lancez-vous dans des aventures épiques avec vos amis et votre famille.",
      appCta: "Votre prochaine aventure vous attend !",

      resumeExploring: "Reprendre l'Exploration",
      joinAdventure: "Rejoindre l'Aventure",
      bothOptionsText:
        "Les deux options vous mèneront au tableau de bord de chasse au trésor",

      interactiveMaps: "Cartes Interactives",
      teamAdventures: "Aventures d'Équipe",
      epicRewards: "Récompenses Épiques",

      welcomeHome: "Bienvenue à Lootopia",
      contentComingSoon: "Zone de contenu principal - Bientôt disponible !",
      backToLogin: "Retour à la Connexion",

      home: "Accueil",
      explore: "Explorer",
      profile: "Profil",
      settings: "Paramètres",

      exploreComingSoon:
        "Explorez de nouvelles aventures - Bientôt disponible !",
      profileComingSoon: "Votre profil d'aventure - Bientôt disponible !",

      darkMode: "Mode Sombre",
      language: "Langue",
      about: "À Propos",

      notifications: "Notifications",
      privacy: "Confidentialité",
      helpSupport: "Aide et Support",
      logout: "Déconnexion",

      selectTheme: "Sélectionner le Thème",
      lightTheme: "Clair",
      darkTheme: "Sombre",
      themeDescription:
        "Personnalisez l'apparence et les préférences de thème de votre application",

      settingsSubtitle: "Gérer vos préférences d'application",
      languageDescription: "Changez votre langue préférée",
      notificationsDescription: "Gérer les préférences de notification",
      privacyDescription: "Paramètres de confidentialité et de sécurité",
      aboutDescription: "Informations et détails de l'application",
      helpDescription: "Obtenez de l'aide et du support",
      lightThemeDescription: "Interface claire et lumineuse",
      darkThemeDescription: "Doux pour les yeux en faible luminosité",

      selectLanguage: "Sélectionner la Langue",

      pushNotifications: "Notifications Push",
      pushNotificationsDescription:
        "Recevoir des notifications sur votre appareil",
      emailNotifications: "Notifications par Email",
      emailNotificationsDescription: "Recevoir des notifications par email",
      inAppNotifications: "Notifications dans l'App",
      inAppNotificationsDescription: "Afficher les notifications dans l'app",
      notificationSounds: "Sons de Notification",
      notificationSoundsDescription: "Jouer des sons pour les notifications",
      additionalOptions: "Options Supplémentaires",
      quietHours: "Heures Silencieuses",

      dataCollection: "Collecte de Données",
      dataCollectionDescription:
        "Autoriser la collecte de données d'utilisation anonymes",
      analytics: "Analytiques",
      analyticsDescription:
        "Aidez à améliorer l'app avec les analyses d'utilisation",
      crashReporting: "Rapport de Plantage",
      crashReportingDescription:
        "Envoyer des rapports de plantage pour améliorer la stabilité",
      locationSharing: "Partage de Localisation",
      locationSharingDescription:
        "Partager les données de localisation pour les fonctionnalités",
      dataPrivacy: "Confidentialité des Données",
      dataManagement: "Gestion des Données",
      exportData: "Exporter les Données",
      exportDataDescription: "Télécharger vos données",
      deleteData: "Supprimer les Données",
      deleteDataDescription: "Supprimer définitivement vos données",

      getHelp: "Obtenir de l'Aide",
      faq: "FAQ",
      faqDescription: "Questions fréquemment posées",
      contactSupport: "Contacter le Support",
      contactSupportDescription: "Obtenez de l'aide de notre équipe de support",
      reportBug: "Signaler un Bug",
      reportBugDescription: "Signaler des problèmes ou des bugs",
      featureRequest: "Demande de Fonctionnalité",
      featureRequestDescription: "Demander de nouvelles fonctionnalités",
      quickLinks: "Liens Rapides",
      userGuide: "Guide Utilisateur",
      videoTutorials: "Tutoriels Vidéo",
      community: "Communauté",
      appInformation: "Informations de l'App",
      version: "Version",
      buildNumber: "Numéro de Build",
      lastUpdate: "Dernière Mise à Jour",

      contactUs: "Nous Contacter",
      termsConditions: "Termes et Conditions",
      privacyPolicy: "Politique de Confidentialité",
      copyright: "© 2025 Lootopia. Tous droits réservés.",
    },
  },
}

void i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
})

export default i18n
