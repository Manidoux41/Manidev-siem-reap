import type { PortfolioProject } from "./portfolio-data";

export const locales = ["en", "fr", "de", "es"] as const;
export type SiteLocale = (typeof locales)[number];

export const localeLabels: Record<SiteLocale, string> = {
  en: "EN",
  fr: "FR",
  de: "DE",
  es: "ES",
};

export function isSiteLocale(value: string): value is SiteLocale {
  return locales.includes(value as SiteLocale);
}

export function getSiteLocale(value: string): SiteLocale {
  return isSiteLocale(value) ? value : "en";
}

export function localizedPath(pathname: string, locale: SiteLocale): string {
  const [path, suffix = ""] = pathname.split(/(?=[?#])/u, 2);
  const segments = path.split("/").filter(Boolean);
  const remainder = isSiteLocale(segments[0] ?? "")
    ? segments.slice(1)
    : segments;
  const localized = `/${locale}${remainder.length ? `/${remainder.join("/")}` : ""}`;
  return `${localized}${suffix}`;
}

const english = {
  metadata: {
    title: "Manfred Parbatia — Full-Stack Developer",
    description:
      "Portfolio of Manfred Parbatia, a full-stack developer building practical digital products for web and mobile.",
  },
  header: {
    projects: "Projects",
    about: "About",
    contact: "Contact",
    github: "GitHub",
    telegram: "Telegram",
    language: "Language",
    menu: "Menu",
    close: "Close",
    navigation: "Main navigation",
    home: "Manfred Parbatia, home",
  },
  location: "Based in Siem Reap, Cambodia.",
  hero: {
    eyebrow: "Portfolio / 2026",
    lineOne: "I shape",
    lineTwo: "useful",
    lineThree: "ideas",
    intro: "Manfred Parbatia — full-stack developer.",
    introSecond: "From a real need to a digital product.",
    explore: "Explore projects",
    position: "Positioning",
    strip:
      "Curious by nature, developer by choice. An idea becomes real when you build it.",
  },
  projects: {
    eyebrow: "01 — Selected work",
    title: "Projects",
    titleAccent: "with purpose.",
    aside:
      "Digital tools shaped around real needs. Each project explores a different way to solve a problem.",
    note:
      "Project details and links are based on public repositories and verified websites. Unknown lifecycle details remain unconfirmed.",
    all: "All",
    filters: "Filter projects",
    discover: "Discover the {title} project",
    statusUnknown: "Status to be confirmed",
    statusProduction: "In production",
    statusTest: "In testing",
    statusDevelopment: "In development",
    empty: "No projects in this category yet.",
    artAlt: "Original graphic illustration, not a screenshot",
    sceneRoute: "ROUTE",
    sceneGreeting: "Hello,",
    sceneDriver: "driver.",
    sceneNext: "NEXT TRIP",
    sceneAssociation: "Every voice",
    sceneAssociationSecond: "deserves to be heard.",
    sceneAssociationFooter: "PROTECTION · LISTENING · CONNECTION",
    sceneAirport: "SIEM REAP AIRPORT",
    sceneTransfer: "PRIVATE TRANSFER",
    sceneKhmera: "SIEM REAP",
    sceneKhmeraFooter: "MOVE · BUILD · EXPLORE",
  },
  about: {
    eyebrow: "02 — About",
    mantra: "Learn. Build. Begin again.",
    first: "I am a developer",
    second: "by curiosity,",
    third: "a builder by conviction.",
    description:
      "Self-taught and solution-oriented, I enjoy understanding a need, exploring the right approach, and seeing it through. From web to mobile, I build accessible, useful experiences designed to last.",
    motto: "“If someone else has done it, you can too.”",
    skills: "Technologies found in these projects",
    skillsNote:
      "No arbitrary skill bars — just tools used in identifiable work.",
  },
  contact: {
    eyebrow: "03 — Let’s talk about your idea",
    title: "What if we",
    titleAccent: "built it?",
    description:
      "A collaboration, a question, or a project to grow? Send me a message.",
    github: "Or find me on GitHub",
    telegram: "Message me on Telegram",
    yourName: "Your name",
    yourEmail: "Your email",
    subject: "Subject",
    yourMessage: "Your message",
    privacy: "Your details are used only to reply to you.",
    send: "Send message",
    sending: "Sending…",
    sent: "Thanks — your message has been recorded.",
    errors: {
      rejected: "The message could not be accepted. Please check the form.",
      rateLimit: "Too many attempts. Please try again later.",
      unavailable: "The contact form is temporarily unavailable.",
      failed: "The message could not be saved right now.",
      network: "Connection failed. Please try again in a little while.",
    },
  },
  footer: {
    home: "Back to home",
    made: "Made with intention.",
    admin: "Admin",
    contact: "Get in touch",
  },
  detail: {
    allProjects: "All projects",
    selected: "Selected project / 2026",
    status: "Status to be confirmed",
    production: "In production",
    testing: "In testing",
    development: "In development",
    project: "The project",
    need: "The need",
    approach: "The approach",
    explore: "Explore",
    repository: "GitHub repository",
    website: "Website",
    application: "Application",
    next: "More projects",
    notFoundTitle: "This page doesn’t exist.",
    notFoundDescription:
      "The link may have changed, or the project may not be published.",
    associationCaveat:
      "The association’s content and contact details must be validated by the organization before republication.",
    khmeraCaveat:
      "Khmera’s offers are informational. Online booking, availability checks, and payments are not active on the public site.",
  },
  categories: {
    mobile: "Mobile app",
    web: "Website",
    transfers: "Airport transfers",
    travel: "Relocation & travel",
  },
};

export type SiteMessages = typeof english;

const translations: Record<SiteLocale, SiteMessages> = {
  en: english,
  fr: {
    metadata: {
      title: "Manfred Parbatia — Développeur Full-Stack",
      description:
        "Portfolio de Manfred Parbatia, développeur full-stack qui conçoit des produits numériques concrets pour le web et le mobile.",
    },
    header: {
      projects: "Projets",
      about: "À propos",
      contact: "Contact",
      github: "GitHub",
      telegram: "Telegram",
      language: "Langue",
      menu: "Menu",
      close: "Fermer",
      navigation: "Navigation principale",
      home: "Manfred Parbatia, accueil",
    },
    location: "Basé à Siem Reap, au Cambodge.",
    hero: {
      eyebrow: "Portfolio / 2026",
      lineOne: "Je donne",
      lineTwo: "forme aux",
      lineThree: "idées utiles",
      intro: "Manfred Parbatia — développeur full-stack.",
      introSecond: "Du besoin concret au produit numérique.",
      explore: "Explorer les projets",
      position: "Positionnement",
      strip:
        "Curieux par nature, développeur par passion. Une idée devient réelle quand on la construit.",
    },
    projects: {
      eyebrow: "01 — Sélection",
      title: "Des projets",
      titleAccent: "qui ont du sens.",
      aside:
        "Des outils numériques pensés autour de besoins réels. Chaque projet propose une autre façon de résoudre un problème.",
      note:
        "Les informations et liens proviennent des dépôts publics et des sites vérifiés. Les détails encore inconnus restent à confirmer.",
      all: "Tous",
      filters: "Filtrer les projets",
      discover: "Découvrir le projet {title}",
      statusUnknown: "Statut à confirmer",
      statusProduction: "En production",
      statusTest: "En test",
      statusDevelopment: "En développement",
      empty: "Aucun projet dans cette catégorie pour le moment.",
      artAlt: "Illustration graphique originale, pas une capture d’écran",
      sceneRoute: "ITINÉRAIRE",
      sceneGreeting: "Bonjour,",
      sceneDriver: "conducteur.",
      sceneNext: "PROCHAIN TRAJET",
      sceneAssociation: "Chaque voix",
      sceneAssociationSecond: "mérite d’être entendue.",
      sceneAssociationFooter: "PROTECTION · ÉCOUTE · LIEN",
      sceneAirport: "AÉROPORT DE SIEM REAP",
      sceneTransfer: "TRANSFERT PRIVÉ",
      sceneKhmera: "SIEM REAP",
      sceneKhmeraFooter: "S’INSTALLER · CRÉER · EXPLORER",
    },
    about: {
      eyebrow: "02 — À propos",
      mantra: "Apprendre. Construire. Recommencer.",
      first: "Je suis développeur",
      second: "par curiosité,",
      third: "bâtisseur par conviction.",
      description:
        "Autodidacte et orienté solutions, j’aime comprendre un besoin, explorer les bonnes pistes et aller jusqu’à une réalisation concrète. Du web au mobile, je construis des expériences accessibles, utiles et faites pour durer.",
      motto: "« Si d’autres l’ont fait, tu le peux. »",
      skills: "Technologies repérées dans les projets",
      skillsNote:
        "Pas de jauges arbitraires — seulement des outils utilisés dans des réalisations identifiables.",
    },
    contact: {
      eyebrow: "03 — Parlons de votre idée",
      title: "Et si on",
      titleAccent: "construisait ?",
      description:
        "Une collaboration, une question ou un projet à faire grandir ? Écrivez-moi.",
      github: "Ou retrouvons-nous sur GitHub",
      telegram: "M’écrire sur Telegram",
      yourName: "Votre nom",
      yourEmail: "Votre e-mail",
      subject: "Sujet",
      yourMessage: "Votre message",
      privacy: "Vos coordonnées sont utilisées uniquement pour vous répondre.",
      send: "Envoyer le message",
      sending: "Envoi…",
      sent: "Merci, votre message a bien été enregistré.",
      errors: {
        rejected: "Le message n’a pas pu être accepté. Vérifiez le formulaire.",
        rateLimit: "Trop de tentatives. Réessayez plus tard.",
        unavailable: "Le formulaire est momentanément indisponible.",
        failed: "Impossible d’enregistrer le message pour le moment.",
        network: "Connexion impossible. Réessayez un peu plus tard.",
      },
    },
    footer: {
      home: "Retour à l’accueil",
      made: "Conçu avec intention.",
      admin: "Administration",
      contact: "Me contacter",
    },
    detail: {
      allProjects: "Tous les projets",
      selected: "Projet sélectionné / 2026",
      status: "État du projet à confirmer",
      production: "En production",
      testing: "En test",
      development: "En développement",
      project: "Le projet",
      need: "Le besoin",
      approach: "L’approche",
      explore: "Explorer",
      repository: "Dépôt GitHub",
      website: "Site web",
      application: "Application",
      next: "À découvrir ensuite",
      notFoundTitle: "Cette page n’existe pas.",
      notFoundDescription:
        "Le lien a peut-être changé ou le projet n’est pas publié.",
      associationCaveat:
        "Les contenus et coordonnées de l’association doivent être validés par celle-ci avant toute republication.",
      khmeraCaveat:
        "Les offres de KHMERA sont informatives. La réservation en ligne, la vérification des disponibilités et le paiement ne sont pas actifs sur le site public.",
    },
    categories: {
      mobile: "Application mobile",
      web: "Site web",
      transfers: "Transferts aéroport",
      travel: "Installation et voyage",
    },
  },
  de: {
    metadata: {
      title: "Manfred Parbatia — Full-Stack-Entwickler",
      description:
        "Portfolio von Manfred Parbatia, einem Full-Stack-Entwickler für praktische digitale Produkte im Web und auf Mobilgeräten.",
    },
    header: {
      projects: "Projekte",
      about: "Über mich",
      contact: "Kontakt",
      github: "GitHub",
      telegram: "Telegram",
      language: "Sprache",
      menu: "Menü",
      close: "Schließen",
      navigation: "Hauptnavigation",
      home: "Manfred Parbatia, Startseite",
    },
    location: "Ansässig in Siem Reap, Kambodscha.",
    hero: {
      eyebrow: "Portfolio / 2026",
      lineOne: "Ich forme",
      lineTwo: "nützliche",
      lineThree: "Ideen",
      intro: "Manfred Parbatia — Full-Stack-Entwickler.",
      introSecond: "Vom konkreten Bedarf zum digitalen Produkt.",
      explore: "Projekte entdecken",
      position: "Profil",
      strip:
        "Von Natur aus neugierig, aus Leidenschaft Entwickler. Eine Idee wird wirklich, wenn man sie umsetzt.",
    },
    projects: {
      eyebrow: "01 — Ausgewählte Projekte",
      title: "Projekte",
      titleAccent: "mit Sinn.",
      aside:
        "Digitale Werkzeuge, die auf echten Bedürfnissen beruhen. Jedes Projekt zeigt einen anderen Lösungsansatz.",
      note:
        "Projektangaben und Links basieren auf öffentlichen Repositories und geprüften Websites. Nicht bestätigte Details bleiben ausdrücklich offen.",
      all: "Alle",
      filters: "Projekte filtern",
      discover: "Projekt {title} entdecken",
      statusUnknown: "Status noch zu bestätigen",
      statusProduction: "Im Produktivbetrieb",
      statusTest: "Im Test",
      statusDevelopment: "In Entwicklung",
      empty: "In dieser Kategorie gibt es derzeit keine Projekte.",
      artAlt: "Originale grafische Illustration, kein Screenshot",
      sceneRoute: "ROUTE",
      sceneGreeting: "Hallo,",
      sceneDriver: "Fahrer.",
      sceneNext: "NÄCHSTE FAHRT",
      sceneAssociation: "Jede Stimme",
      sceneAssociationSecond: "verdient Gehör.",
      sceneAssociationFooter: "SCHUTZ · ZUHÖREN · VERBINDUNG",
      sceneAirport: "FLUGHAFEN SIEM REAP",
      sceneTransfer: "PRIVATTRANSFER",
      sceneKhmera: "SIEM REAP",
      sceneKhmeraFooter: "ANKOMMEN · AUFBAUEN · ENTDECKEN",
    },
    about: {
      eyebrow: "02 — Über mich",
      mantra: "Lernen. Bauen. Neu beginnen.",
      first: "Ich bin Entwickler",
      second: "aus Neugier,",
      third: "und Überzeugung.",
      description:
        "Als Autodidakt mit Lösungsfokus möchte ich Bedürfnisse verstehen, passende Wege erkunden und konkrete Ergebnisse schaffen. Von Web bis Mobile entwickle ich zugängliche, nützliche und nachhaltige Erlebnisse.",
      motto: "„Wenn andere es geschafft haben, kannst du es auch.“",
      skills: "In den Projekten verwendete Technologien",
      skillsNote:
        "Keine willkürlichen Balken — nur Werkzeuge aus nachvollziehbaren Projekten.",
    },
    contact: {
      eyebrow: "03 — Lass uns über deine Idee sprechen",
      title: "Was wäre, wenn wir",
      titleAccent: "es bauen?",
      description:
        "Eine Zusammenarbeit, eine Frage oder ein Projekt mit Potenzial? Schreib mir.",
      github: "Oder besuch mich auf GitHub",
      telegram: "Schreib mir auf Telegram",
      yourName: "Dein Name",
      yourEmail: "Deine E-Mail-Adresse",
      subject: "Betreff",
      yourMessage: "Deine Nachricht",
      privacy: "Deine Angaben werden nur verwendet, um dir zu antworten.",
      send: "Nachricht senden",
      sending: "Wird gesendet…",
      sent: "Danke — deine Nachricht wurde gespeichert.",
      errors: {
        rejected: "Die Nachricht wurde nicht angenommen. Bitte prüfe das Formular.",
        rateLimit: "Zu viele Versuche. Bitte versuche es später erneut.",
        unavailable: "Das Kontaktformular ist vorübergehend nicht verfügbar.",
        failed: "Die Nachricht konnte momentan nicht gespeichert werden.",
        network: "Verbindung fehlgeschlagen. Bitte versuche es später erneut.",
      },
    },
    footer: {
      home: "Zurück zur Startseite",
      made: "Mit Bedacht gestaltet.",
      admin: "Administration",
      contact: "Kontakt aufnehmen",
    },
    detail: {
      allProjects: "Alle Projekte",
      selected: "Ausgewähltes Projekt / 2026",
      status: "Status noch zu bestätigen",
      production: "Im Produktivbetrieb",
      testing: "Im Test",
      development: "In Entwicklung",
      project: "Das Projekt",
      need: "Der Bedarf",
      approach: "Der Ansatz",
      explore: "Mehr erfahren",
      repository: "GitHub-Repository",
      website: "Website",
      application: "Anwendung",
      next: "Weitere Projekte",
      notFoundTitle: "Diese Seite existiert nicht.",
      notFoundDescription:
        "Der Link wurde möglicherweise geändert oder das Projekt ist nicht veröffentlicht.",
      associationCaveat:
        "Inhalte und Kontaktdaten des Vereins müssen vor einer erneuten Veröffentlichung vom Verein geprüft werden.",
      khmeraCaveat:
        "Die Angebote von KHMERA dienen der Information. Online-Buchung, Verfügbarkeitsprüfung und Zahlungen sind auf der öffentlichen Website nicht aktiv.",
    },
    categories: {
      mobile: "Mobile App",
      web: "Website",
      transfers: "Flughafentransfers",
      travel: "Umzug & Reisen",
    },
  },
  es: {
    metadata: {
      title: "Manfred Parbatia — Desarrollador Full-Stack",
      description:
        "Portafolio de Manfred Parbatia, desarrollador full-stack que crea productos digitales prácticos para web y móvil.",
    },
    header: {
      projects: "Proyectos",
      about: "Sobre mí",
      contact: "Contacto",
      github: "GitHub",
      telegram: "Telegram",
      language: "Idioma",
      menu: "Menú",
      close: "Cerrar",
      navigation: "Navegación principal",
      home: "Manfred Parbatia, inicio",
    },
    location: "Con sede en Siem Reap, Camboya.",
    hero: {
      eyebrow: "Portafolio / 2026",
      lineOne: "Doy forma",
      lineTwo: "a ideas",
      lineThree: "útiles",
      intro: "Manfred Parbatia — desarrollador full-stack.",
      introSecond: "De una necesidad concreta a un producto digital.",
      explore: "Explorar proyectos",
      position: "Presentación",
      strip:
        "Curioso por naturaleza, desarrollador por pasión. Una idea se hace realidad cuando la construyes.",
    },
    projects: {
      eyebrow: "01 — Proyectos destacados",
      title: "Proyectos",
      titleAccent: "con propósito.",
      aside:
        "Herramientas digitales pensadas para necesidades reales. Cada proyecto plantea una forma distinta de resolver un problema.",
      note:
        "La información y los enlaces se basan en repositorios públicos y sitios verificados. Los detalles no confirmados se indican como tales.",
      all: "Todos",
      filters: "Filtrar proyectos",
      discover: "Descubrir el proyecto {title}",
      statusUnknown: "Estado por confirmar",
      statusProduction: "En producción",
      statusTest: "En pruebas",
      statusDevelopment: "En desarrollo",
      empty: "Todavía no hay proyectos en esta categoría.",
      artAlt: "Ilustración gráfica original, no es una captura de pantalla",
      sceneRoute: "RUTA",
      sceneGreeting: "Hola,",
      sceneDriver: "conductor.",
      sceneNext: "PRÓXIMO VIAJE",
      sceneAssociation: "Cada voz",
      sceneAssociationSecond: "merece ser escuchada.",
      sceneAssociationFooter: "PROTECCIÓN · ESCUCHA · VÍNCULO",
      sceneAirport: "AEROPUERTO DE SIEM REAP",
      sceneTransfer: "TRASLADO PRIVADO",
      sceneKhmera: "SIEM REAP",
      sceneKhmeraFooter: "LLEGAR · CREAR · EXPLORAR",
    },
    about: {
      eyebrow: "02 — Sobre mí",
      mantra: "Aprender. Construir. Volver a empezar.",
      first: "Soy desarrollador",
      second: "por curiosidad,",
      third: "constructor por convicción.",
      description:
        "Autodidacta y orientado a soluciones, disfruto entendiendo una necesidad, explorando el enfoque adecuado y convirtiéndolo en algo concreto. De la web al móvil, creo experiencias accesibles, útiles y duraderas.",
      motto: "«Si otros lo han hecho, tú también puedes.»",
      skills: "Tecnologías presentes en estos proyectos",
      skillsNote:
        "Sin barras arbitrarias: solo herramientas utilizadas en proyectos identificables.",
    },
    contact: {
      eyebrow: "03 — Hablemos de tu idea",
      title: "¿Y si lo",
      titleAccent: "construimos?",
      description:
        "¿Una colaboración, una pregunta o un proyecto que hacer crecer? Escríbeme.",
      github: "O búscame en GitHub",
      telegram: "Escríbeme por Telegram",
      yourName: "Tu nombre",
      yourEmail: "Tu correo electrónico",
      subject: "Asunto",
      yourMessage: "Tu mensaje",
      privacy: "Tus datos se usan únicamente para responderte.",
      send: "Enviar mensaje",
      sending: "Enviando…",
      sent: "Gracias: tu mensaje se ha guardado.",
      errors: {
        rejected: "No se pudo aceptar el mensaje. Revisa el formulario.",
        rateLimit: "Demasiados intentos. Inténtalo más tarde.",
        unavailable: "El formulario de contacto no está disponible temporalmente.",
        failed: "No se pudo guardar el mensaje en este momento.",
        network: "No se pudo conectar. Inténtalo de nuevo más tarde.",
      },
    },
    footer: {
      home: "Volver al inicio",
      made: "Creado con intención.",
      admin: "Administración",
      contact: "Contactar",
    },
    detail: {
      allProjects: "Todos los proyectos",
      selected: "Proyecto destacado / 2026",
      status: "Estado por confirmar",
      production: "En producción",
      testing: "En pruebas",
      development: "En desarrollo",
      project: "El proyecto",
      need: "La necesidad",
      approach: "El enfoque",
      explore: "Explorar",
      repository: "Repositorio de GitHub",
      website: "Sitio web",
      application: "Aplicación",
      next: "Más proyectos",
      notFoundTitle: "Esta página no existe.",
      notFoundDescription:
        "Puede que el enlace haya cambiado o que el proyecto no esté publicado.",
      associationCaveat:
        "La asociación debe validar sus contenidos y datos de contacto antes de volver a publicarlos.",
      khmeraCaveat:
        "Las ofertas de KHMERA son informativas. La reserva en línea, la consulta de disponibilidad y los pagos no están activos en el sitio público.",
    },
    categories: {
      mobile: "Aplicación móvil",
      web: "Sitio web",
      transfers: "Traslados al aeropuerto",
      travel: "Instalación y viajes",
    },
  },
};

export function getMessages(locale: SiteLocale): SiteMessages {
  return translations[locale];
}

export function getCategoryName(locale: SiteLocale, slug: string, name: string) {
  const translated =
    translations[locale].categories[slug as keyof SiteMessages["categories"]];
  return translated ?? name;
}

type ProjectCopy = Pick<
  PortfolioProject,
  "title" | "shortDescription" | "description" | "problem" | "solution"
>;

const projectCopies: Partial<
  Record<Exclude<SiteLocale, "en">, Record<string, ProjectCopy>>
> = {
  fr: {
    "mmc-go-drivers": {
      title: "MMC Go Drivers",
      shortDescription:
        "Une application mobile consacrée à la navigation, aux trajets et à la gestion de flotte.",
      description:
        "MMC Go Drivers réunit des outils de navigation adaptés aux véhicules, la gestion des trajets et des plannings, ainsi qu’un espace de gestion de flotte. La présentation s’appuie sur le README public du dépôt.",
      problem:
        "Les conducteurs et les petites entreprises de transport ont besoin d’outils de navigation, de planning et de documents réunis dans un même espace.",
      solution:
        "L’application propose des fonctions dédiées aux conducteurs de bus, de taxi et de poids lourds, avec des outils de gestion pour les entreprises.",
    },
    "la-voix-des-enfants-places": {
      title: "La Voix des Enfants Placés — Vienne",
      shortDescription:
        "Une refonte éditoriale responsive pour un site associatif consacré à la protection de l’enfance.",
      description:
        "Le dépôt présente un site public avec des pages d’information et des actualités gérées avec Prisma et PostgreSQL. Il comprend également un espace privé pour gérer les articles. Les contenus et coordonnées sont à valider par l’association avant publication.",
      problem:
        "Rendre les informations de l’association accessibles et permettre à son équipe de publier des actualités sans modifier le code.",
      solution:
        "Une interface éditoriale responsive reliée à une base de données, avec une gestion privée des articles et un formulaire de contact.",
    },
    saiway: {
      title: "Saiway — Transferts aéroport à Siem Reap",
      shortDescription:
        "Une plateforme de réservation et de gestion de transferts privés depuis l’aéroport international de Siem Reap.",
      description:
        "Saiway est un service de transferts aéroport articulé autour de la réservation et d’outils opérationnels pour les clients, les chauffeurs et les administrateurs. Le README documente la gestion des réservations et des trajets par rôle, avec PostgreSQL.",
      problem:
        "Coordonner les trajets aéroport et les opérations quotidiennes entre clients, chauffeurs et administrateurs.",
      solution:
        "Une plateforme regroupe le parcours de réservation, l’affectation des trajets et des outils adaptés à chaque rôle.",
    },
    khmera: {
      title: "KHMERA — Installation et voyages à Siem Reap",
      shortDescription:
        "Un accompagnement personnalisé pour les nouveaux arrivants, les entrepreneurs et les voyageurs à Siem Reap.",
      description:
        "KHMERA présente des informations locales et des services sur devis pour préparer une installation, un projet professionnel ou un séjour découverte à Siem Reap. Le site public est disponible en anglais, français, espagnol et allemand.",
      problem:
        "Les personnes qui préparent une installation, une activité ou un voyage à Siem Reap ont besoin de repères locaux clairs.",
      solution:
        "Un site multilingue présente les services et permet de préparer une demande ; les offres sont informatives et la réservation et le paiement en ligne ne sont pas actifs.",
    },
  },
  de: {
    "mmc-go-drivers": {
      title: "MMC Go Drivers",
      shortDescription:
        "Eine mobile App für Navigation, Fahrtplanung und Flottenverwaltung.",
      description:
        "MMC Go Drivers bündelt fahrzeuggerechte Navigation, Touren- und Terminplanung sowie Funktionen zur Flottenverwaltung. Die Beschreibung basiert auf dem öffentlichen Repository-README.",
      problem:
        "Fahrer und kleine Transportunternehmen benötigen Navigation, Planung und Dokumente an einem zentralen Ort.",
      solution:
        "Die App bietet Funktionen für Bus-, Taxi- und Lkw-Fahrer sowie Verwaltungswerkzeuge für Unternehmen.",
    },
    "la-voix-des-enfants-places": {
      title: "La Voix des Enfants Placés — Vienne",
      shortDescription:
        "Ein responsiver Website-Relaunch für einen Verein zum Schutz von Kindern.",
      description:
        "Das Repository beschreibt eine öffentliche Website mit Informationsseiten und Nachrichten, verwaltet mit Prisma und PostgreSQL. Ein privater Bereich dient der Artikelverwaltung. Inhalte und Kontaktdaten müssen vor einer Veröffentlichung vom Verein bestätigt werden.",
      problem:
        "Vereinsinformationen sollen leicht zugänglich sein und das Team soll Nachrichten ohne Codeänderungen veröffentlichen können.",
      solution:
        "Eine responsive redaktionelle Oberfläche mit Datenbank, privater Artikelverwaltung und Kontaktformular.",
    },
    saiway: {
      title: "Saiway — Flughafentransfers in Siem Reap",
      shortDescription:
        "Eine Buchungs- und Verwaltungsplattform für private Transfers vom internationalen Flughafen Siem Reap.",
      description:
        "Saiway ist ein Flughafentransferdienst mit Buchungsabläufen und operativen Werkzeugen für Kunden, Fahrer und Administratoren. Das README beschreibt rollenbasierte Buchungs- und Fahrtverwaltung mit PostgreSQL.",
      problem:
        "Flughafenfahrten und tägliche Abläufe müssen zwischen Kunden, Fahrern und Administratoren koordiniert werden.",
      solution:
        "Eine Plattform bündelt Buchungen, Fahrtzuweisungen und rollenbezogene Werkzeuge.",
    },
    khmera: {
      title: "KHMERA — Ankommen und Reisen in Siem Reap",
      shortDescription:
        "Persönliche Beratung für Neuankömmlinge, Unternehmer und Reisende in Siem Reap.",
      description:
        "KHMERA stellt lokale Informationen und Angebote auf Anfrage bereit, um Umzug, Geschäftsvorhaben oder Entdeckungsreisen in Siem Reap vorzubereiten. Die öffentliche Website ist auf Englisch, Französisch, Spanisch und Deutsch verfügbar.",
      problem:
        "Wer nach Siem Reap zieht, ein Unternehmen gründet oder die Region erkundet, benötigt klare lokale Orientierung.",
      solution:
        "Eine mehrsprachige Informationsseite stellt Leistungen vor und bereitet Anfragen vor. Die Angebote sind informativ; Online-Buchung und Zahlung sind nicht aktiv.",
    },
  },
  es: {
    "mmc-go-drivers": {
      title: "MMC Go Drivers",
      shortDescription:
        "Una aplicación móvil para navegación, planificación de viajes y gestión de flotas.",
      description:
        "MMC Go Drivers reúne navegación adaptada a vehículos, gestión de trayectos y horarios, y herramientas para flotas. La descripción se basa en el README público del repositorio.",
      problem:
        "Los conductores y las pequeñas empresas de transporte necesitan navegación, planificación y documentos en un mismo lugar.",
      solution:
        "La aplicación ofrece funciones para conductores de autobús, taxi y camión, además de herramientas de gestión para empresas.",
    },
    "la-voix-des-enfants-places": {
      title: "La Voix des Enfants Placés — Vienne",
      shortDescription:
        "Una renovación editorial adaptable para una asociación dedicada a la protección infantil.",
      description:
        "El repositorio describe un sitio público con páginas informativas y noticias gestionadas con Prisma y PostgreSQL. También incluye un espacio privado para administrar artículos. La asociación debe validar los contenidos y datos de contacto antes de publicarlos.",
      problem:
        "Facilitar el acceso a la información de la asociación y permitir que su equipo publique noticias sin modificar el código.",
      solution:
        "Una interfaz editorial adaptable conectada a una base de datos, con gestión privada de artículos y un formulario de contacto.",
    },
    saiway: {
      title: "Saiway — Traslados al aeropuerto en Siem Reap",
      shortDescription:
        "Una plataforma de reservas y gestión de traslados privados desde el aeropuerto internacional de Siem Reap.",
      description:
        "Saiway es un servicio de traslados al aeropuerto con flujos de reserva y herramientas operativas para clientes, conductores y administradores. El README documenta la gestión de reservas y viajes por roles con PostgreSQL.",
      problem:
        "Coordinar los traslados al aeropuerto y las operaciones diarias entre clientes, conductores y administradores.",
      solution:
        "Una plataforma reúne el proceso de reserva, la asignación de viajes y las herramientas específicas para cada rol.",
    },
    khmera: {
      title: "KHMERA — Instalación y viajes en Siem Reap",
      shortDescription:
        "Orientación personalizada para recién llegados, emprendedores y viajeros que planean su estancia en Siem Reap.",
      description:
        "KHMERA presenta información local y servicios con presupuesto para preparar una mudanza, un proyecto empresarial o un viaje de descubrimiento en Siem Reap. El sitio público está disponible en inglés, francés, español y alemán.",
      problem:
        "Quienes planean mudarse, iniciar un negocio o conocer Siem Reap necesitan orientación local clara.",
      solution:
        "Un sitio informativo multilingüe presenta los servicios y ayuda a preparar una solicitud; las ofertas son informativas y no hay reservas ni pagos en línea activos.",
    },
  },
};

export function localizeProject(
  project: PortfolioProject,
  locale: SiteLocale,
): PortfolioProject {
  const copy =
    locale === "en" ? undefined : projectCopies[locale]?.[project.slug];
  return {
    ...project,
    ...(copy ?? {}),
    category: {
      ...project.category,
      name: getCategoryName(locale, project.category.slug, project.category.name),
    },
  };
}
