export const adminSections = [
  { id: "overview", label: "Vue d’ensemble", group: "Gestion" },
  { id: "projects", label: "Projets", group: "Gestion" },
  { id: "editor", label: "Créer un projet", group: "Gestion" },
  { id: "messages", label: "Messages", group: "Gestion" },
  { id: "settings", label: "Paramètres du site", group: "Gestion" },
  { id: "business-cards", label: "Cartes de visite", group: "Outils" },
  { id: "categories", label: "Catégories", group: "Consultation" },
  { id: "technologies", label: "Technologies", group: "Consultation" },
  { id: "skills", label: "Compétences", group: "Consultation" },
  { id: "experiences", label: "Expériences", group: "Consultation" },
  { id: "api", label: "Explorateur API", group: "Outils" },
] as const;

export type AdminSection = (typeof adminSections)[number]["id"];

export const adminApiEndpoints = [
  { path: "/projects", methods: ["GET"], label: "Projets publiés", section: "projects" },
  { path: "/projects/featured", methods: ["GET"], label: "Projets mis en avant", section: "projects" },
  { path: "/projects/{slug}", methods: ["GET"], label: "Détail d’un projet publié", section: "projects" },
  { path: "/categories", methods: ["GET"], label: "Catégories", section: "categories" },
  { path: "/technologies", methods: ["GET"], label: "Technologies", section: "technologies" },
  { path: "/skills", methods: ["GET"], label: "Compétences publiées", section: "skills" },
  { path: "/experiences", methods: ["GET"], label: "Expériences publiées", section: "experiences" },
  { path: "/site-settings/public", methods: ["GET"], label: "Paramètres publics", section: "settings" },
  { path: "/contact", methods: ["POST"], label: "Envoyer un message via le formulaire public", section: "messages" },
  { path: "/admin/auth/login", methods: ["POST"], label: "Connexion via le formulaire sécurisé", section: "overview" },
  { path: "/admin/auth/logout", methods: ["POST"], label: "Déconnexion via le menu latéral", section: "overview" },
  { path: "/admin/projects", methods: ["GET", "POST"], label: "Lister et créer les projets", section: "projects" },
  { path: "/admin/projects/{id}", methods: ["PATCH", "DELETE"], label: "Modifier et supprimer les projets", section: "projects" },
  { path: "/admin/messages", methods: ["GET"], label: "Lire les messages privés (100 derniers)", section: "messages" },
  { path: "/admin/messages/{id}", methods: ["PATCH", "DELETE"], label: "Changer le statut ou supprimer définitivement un message", section: "messages" },
  { path: "/admin/settings", methods: ["GET", "PATCH"], label: "Lire et modifier les paramètres", section: "settings" },
  { path: "/admin/business-cards", methods: ["GET", "POST"], label: "Lister et enregistrer mes cartes de visite", section: "business-cards" },
  { path: "/admin/business-cards/{id}", methods: ["GET", "PATCH", "DELETE"], label: "Charger, modifier et supprimer une carte de visite", section: "business-cards" },
  { path: "/openapi", methods: ["GET"], label: "Documentation OpenAPI", section: "api" },
] as const satisfies readonly {
  path: string;
  methods: readonly string[];
  label: string;
  section: AdminSection;
}[];
