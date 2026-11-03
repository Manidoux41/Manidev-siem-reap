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
    slideshow: "Project slideshow",
    previous: "Previous project",
    next: "Next project",
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
      "A qualified, experienced and solution-oriented developer, I enjoy understanding a need, exploring the right approach, and seeing it through. From web to mobile, I build accessible, useful experiences designed to last.",
    educationLabel: "Training & qualification",
    education: "Web Developer diploma, level IV — obtained in 2023 through OpenClassrooms. Formal training complements my hands-on experience and commitment to continuous learning.",
    motto: "“If someone else has done it, you can too.”",
    skills: "Technologies found in these projects",
    aiLabel: "Artificial intelligence specialization",
    aiDescription: "I specialize in using AI tools to support development, automate workflows and integrate practical AI-assisted solutions.",
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
    notificationPending: "Your message is saved, but the email notification is pending. Please do not submit it again.",
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
    civic: "Civic platforms",
    tools: "Digital tools",
    professional: "Professional profiles",
    transport: "Transport",
    learning: "Experiments & tutorials",
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
      slideshow: "Diaporama des projets",
      previous: "Projet précédent",
      next: "Projet suivant",
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
        "Développeur diplômé, confirmé et orienté solutions, j’aime comprendre un besoin, explorer les bonnes pistes et aller jusqu’à une réalisation concrète. Du web au mobile, je construis des expériences accessibles, utiles et faites pour durer.",
      educationLabel: "Formation et diplôme",
      education: "Diplôme de développeur web de niveau IV, obtenu en 2023 via OpenClassrooms. Une formation diplômante qui complète mon expérience pratique et mon apprentissage continu.",
      motto: "« Si d’autres l’ont fait, tu le peux. »",
      skills: "Technologies repérées dans les projets",
      aiLabel: "Spécialisation en intelligence artificielle",
      aiDescription: "Je suis également spécialisé dans l’utilisation de l’IA pour accompagner le développement, automatiser les workflows et intégrer des solutions concrètes assistées par l’intelligence artificielle.",
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
      notificationPending: "Votre message est enregistré, mais la notification par e-mail est en attente. Il n’est pas nécessaire de le renvoyer.",
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
      civic: "Plateformes citoyennes",
      tools: "Outils numériques",
      professional: "CV et profils professionnels",
      transport: "Transport",
      learning: "Expériences et tutoriels",
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
      slideshow: "Projekt-Diashow",
      previous: "Vorheriges Projekt",
      next: "Nächstes Projekt",
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
        "Als ausgebildeter, erfahrener Entwickler mit Lösungsfokus möchte ich Bedürfnisse verstehen, passende Wege erkunden und konkrete Ergebnisse schaffen. Von Web bis Mobile entwickle ich zugängliche, nützliche und nachhaltige Erlebnisse.",
      educationLabel: "Ausbildung und Abschluss",
      education: "Abschluss als Webentwickler, französisches Niveau IV — 2023 über OpenClassrooms erworben. Diese Ausbildung ergänzt meine praktische Erfahrung und mein kontinuierliches Lernen.",
      motto: "„Wenn andere es geschafft haben, kannst du es auch.“",
      skills: "In den Projekten verwendete Technologien",
      aiLabel: "Spezialisierung auf künstliche Intelligenz",
      aiDescription: "Ich bin auch auf den Einsatz von KI spezialisiert, um die Entwicklung zu unterstützen, Arbeitsabläufe zu automatisieren und praktische KI-gestützte Lösungen zu integrieren.",
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
      notificationPending: "Deine Nachricht ist gespeichert, aber die E-Mail-Benachrichtigung steht noch aus. Bitte sende sie nicht erneut.",
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
      civic: "Zivilgesellschaftliche Plattformen",
      tools: "Digitale Werkzeuge",
      professional: "Berufliche Profile",
      transport: "Mobilität & Transport",
      learning: "Experimente & Tutorials",
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
      slideshow: "Presentación de proyectos",
      previous: "Proyecto anterior",
      next: "Proyecto siguiente",
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
        "Desarrollador titulado, experimentado y orientado a soluciones, disfruto entendiendo una necesidad, explorando el enfoque adecuado y convirtiéndolo en algo concreto. De la web al móvil, creo experiencias accesibles, útiles y duraderas.",
      educationLabel: "Formación y diploma",
      education: "Diploma de desarrollador web, nivel IV francés — obtenido en 2023 a través de OpenClassrooms. Una formación que complementa mi experiencia práctica y mi aprendizaje continuo.",
      motto: "«Si otros lo han hecho, tú también puedes.»",
      skills: "Tecnologías presentes en estos proyectos",
      aiLabel: "Especialización en inteligencia artificial",
      aiDescription: "También me especializo en el uso de la IA para apoyar el desarrollo, automatizar flujos de trabajo e integrar soluciones prácticas asistidas por inteligencia artificial.",
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
      notificationPending: "Tu mensaje está guardado, pero la notificación por correo está pendiente. No es necesario enviarlo otra vez.",
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
      civic: "Plataformas ciudadanas",
      tools: "Herramientas digitales",
      professional: "Perfiles profesionales",
      transport: "Transporte",
      learning: "Experimentos y tutoriales",
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
    "voix-et-enfance": {
      title: "Voix & Enfance — Initiative citoyenne",
      shortDescription:
        "Un site d’information avec une proposition et des moyens de soutenir une initiative.",
      description:
        "L’application Next.js présente une initiative, renvoie vers sa proposition et propose un parcours de signature. Le résumé s’appuie sur la structure des pages et le manifeste ; le texte et les modalités de publication doivent être validés avant réutilisation.",
      problem:
        "Rendre une proposition et les moyens de soutenir une initiative accessibles en ligne.",
      solution:
        "Un site public présente des informations et oriente vers la proposition et la signature, sans laisser entendre qu’une institution l’approuve.",
    },
    "cv-builder-app": {
      title: "CV Studio — Créateur de CV",
      shortDescription:
        "Un éditeur de CV avec aperçu en direct, mises en page personnalisables et export PDF depuis le navigateur.",
      description:
        "CV Studio est un créateur de CV Next.js avec des sections modifiables pour le profil, l’expérience, la formation, les projets et les compétences. Le README décrit un aperçu en direct et une impression au format A4 ; SQLite via Prisma peut servir aux brouillons locaux. Aucun stockage de production ni accès multi-utilisateur n’est revendiqué.",
      problem:
        "Créer et améliorer un CV sans mettre en page chaque rubrique manuellement.",
      solution:
        "Un formulaire et son aperçu proposent deux mises en page, des choix de style et l’impression A4 ou l’export PDF depuis le navigateur.",
    },
    "association-declaration": {
      title: "Aide à la déclaration de manifestation",
      shortDescription:
        "Un outil dans le navigateur pour préparer et exporter des documents de déclaration de manifestation.",
      description:
        "Cet outil web autonome guide la préparation d’une déclaration de manifestation, génère un aperçu et permet d’exporter en TXT/JSON ou d’imprimer en PDF. Les brouillons restent dans le navigateur : aucun document n’est transmis à une mairie ou à une préfecture.",
      problem:
        "Organiser les informations nécessaires à la préparation d’une déclaration de manifestation.",
      solution:
        "Un formulaire guidé, des brouillons locaux et plusieurs formats d’export aident à préparer le document pour vérification et envoi manuel.",
    },
    "gestion-planning": {
      title: "Maison douce — Prototype de planning quotidien",
      shortDescription:
        "Un tableau de bord mobile-first pour les routines familiales, les horaires et les tâches à venir.",
      description:
        "Le README décrit un premier tableau de bord responsive pour suivre une journée de garde, les heures mensuelles et les tâches prévues. Les données sont explicitement présentées comme des exemples locaux ; les flux métier persistants sont envisagés pour plus tard.",
      problem:
        "Réunir les routines quotidiennes, les heures et les tâches à venir dans une même vue.",
      solution:
        "Un tableau de bord mobile-first présente les informations du jour et du mois avec des données de démonstration.",
    },
    "nos-liens-nos-enfants-contre-l-ase": {
      title: "Nos liens, nos enfants — Plateforme citoyenne",
      shortDescription:
        "Un site d’information et de participation avec ressources sourcées, sondage modéré et préparation d’une pétition.",
      description:
        "Le README décrit un récit familial anonymisé, des ressources sourcées, un sondage public modéré, des statistiques agrégées et un parcours de préparation de pétition. Le projet utilise Next.js, React, PostgreSQL et Prisma. Ce résumé ne reprend pas les détails personnels ou sensibles du contenu source.",
      problem:
        "Présenter des informations sourcées et proposer aux visiteurs des moyens structurés de participer.",
      solution:
        "Un site public associe ressources éditoriales, participation à un sondage, statistiques modérées et préparation d’une pétition.",
    },
    "cv-international-manfred": {
      title: "Collection de CV internationaux",
      shortDescription:
        "Une collection de CV adaptés à différents postes, en documents et en pages HTML statiques.",
      description:
        "Ce dépôt rassemble des CV internationaux et ciblés, au format HTML et PDF. Il est présenté comme une collection de documents professionnels, et non comme une application web ; aucun déploiement ni actualité des documents n’est sous-entendu.",
      problem:
        "Organiser plusieurs versions et formats de CV dans un dépôt public.",
      solution:
        "Des pages HTML statiques et des documents PDF proposent différents formats selon le contexte professionnel.",
    },
    "mmcgodrivers-website": {
      title: "MMC Go Drivers — Site public",
      shortDescription:
        "Le site d’information associé au service mobile MMC Go Drivers.",
      description:
        "Le site public présente les fonctionnalités, les tarifs, les avis et les informations du service MMC Go Drivers. Le code Next.js inclut du contenu lié à Supabase et une dépendance Resend ; ce dépôt web est distingué de l’application mobile Flutter.",
      problem:
        "Présenter le service mobile et ses offres sur le web.",
      solution:
        "Un site dédié rassemble les informations produit et les pages publiques, dans un dépôt distinct de l’application mobile.",
    },
    tuktukgo: {
      title: "Angkor Move (TukTukGo) — Prototype de mobilité",
      shortDescription:
        "Un prototype mobile de service de mobilité pour chauffeurs, passagers, hôtels et entreprises de transport.",
      description:
        "Le README décrit un prototype Expo/React Native avec une base d’accueil et de tableaux de bord par rôle. Il présente la réservation et les opérations comme une direction produit ; ce portfolio ne prétend pas qu’un service de réservation est en production.",
      problem:
        "Explorer une base mobile pour coordonner les différents rôles et services de mobilité locale.",
      solution:
        "Un prototype organise des points d’entrée et des tableaux de bord selon les rôles ; le README place les réservations principales sur la feuille de route.",
    },
    "test-vs-2": {
      title: "TechBoutik — Démonstration e-commerce (fork)",
      shortDescription:
        "Un fork clairement identifié d’une application de démonstration e-commerce.",
      description:
        "Ce dépôt est un fork de michaelbaze1987-cloud/test-vs-2. Son README décrit une boutique de démonstration avec catalogue, panier, commandes et paiement simulé ; les données sont en mémoire ou en fichiers locaux et aucun paiement réel n’est activé. Il n’est pas présenté comme une plateforme e-commerce originale en production.",
      problem:
        "Explorer des parcours de boutique et d’administration dans une application e-commerce de démonstration.",
      solution:
        "Le fork propose un catalogue, un panier, un paiement simulé et des écrans d’administration à des fins d’expérimentation.",
    },
    testapprn: {
      title: "Outils de trajet et planning — Application de test",
      shortDescription:
        "Une application expérimentale pour les conducteurs, avec des écrans d’itinéraire et de planning.",
      description:
        "Le code Expo comprend un écran de calcul d’itinéraire GPS avec des utilitaires KML/GPX et un écran de planning qui extrait des informations de fichiers PDF. Le dépôt ne contient pas de README : il est donc signalé comme application de test, sans revendiquer de mise en production ni de backend.",
      problem:
        "Expérimenter des parcours de navigation et de planning dans une application mobile.",
      solution:
        "Le code comporte des écrans séparés pour la préparation d’itinéraires et le traitement de plannings PDF.",
    },
    "flutter-first-app": {
      title: "Première application Flutter — Modèle de tutoriel",
      shortDescription:
        "Le projet de démarrage Flutter par défaut, conservé comme exercice d’apprentissage.",
      description:
        "Le README identifie un nouveau projet Flutter et renvoie au tutoriel officiel « première application ». Le fichier pubspec contient Flutter et la dépendance standard Cupertino Icons ; il s’agit volontairement d’un modèle pédagogique, pas d’un produit publié.",
      problem: null,
      solution: null,
    },
    "frontend2-simplon-best": {
      title: "Cars Simplon — Client mobile des missions",
      shortDescription:
        "Un client mobile pour consulter les missions, les véhicules et l’activité de l’équipe.",
      description:
        "Le README décrit une application de gestion des missions de chauffeurs, et le code Expo consulté affiche des requêtes de tableau de bord pour les missions, les véhicules et les conducteurs via un service API. Le projet est traité comme un prototype mobile ; le README et le manifeste diffèrent légèrement sur la version d’Expo.",
      problem:
        "Donner aux chauffeurs et aux administrateurs une vue mobile des missions et de la flotte.",
      solution:
        "Un client mobile adapté aux rôles organise les vues du tableau de bord, des missions, des véhicules et des chauffeurs.",
    },
    "backend-for-frontend2-simplon-best": {
      title: "Simplon Drivers — Prototype d’API backend",
      shortDescription:
        "Un prototype d’API pour l’authentification et la gestion des chauffeurs, véhicules, clients et missions.",
      description:
        "Le manifeste décrit un backend Node.js/Express pour la gestion de chauffeurs, et le code expose des routes d’authentification, d’utilisateurs, de véhicules, de clients et de missions avec Mongoose. Le README n’était pas disponible dans la révision publique consultée : le résumé se fonde sur le manifeste et le code, sans allégation de déploiement.",
      problem:
        "Fournir au client mobile des endpoints pour les chauffeurs, véhicules, clients et missions.",
      solution:
        "Un serveur Express regroupe les routes d’authentification et de gestion, avec des modèles MongoDB/Mongoose.",
    },
    "simplon-drivers-app": {
      title: "Cars Simplon Drivers — Prototype SQLite local",
      shortDescription:
        "Un prototype de tableau de bord mobile pour les missions, véhicules et historiques de chauffeurs.",
      description:
        "Le README présente une application mobile de missions pour chauffeurs et administrateurs. Les hooks d’authentification et le tableau de bord consultés utilisent actuellement SQLite local ; bien que le README mentionne Supabase, ce portfolio ne prétend pas qu’une authentification ou une persistance Supabase distante soit connectée.",
      problem:
        "Explorer l’accès mobile aux missions attribuées et aux outils de flotte destinés aux chauffeurs.",
      solution:
        "Une application Expo organise les écrans du tableau de bord, des missions, des véhicules et de l’historique autour d’un prototype local.",
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
    "voix-et-enfance": {
      title: "Voix & Enfance — Bürgerinitiative",
      shortDescription:
        "Eine öffentliche Informationsseite mit Vorschlag und Möglichkeiten, eine Initiative zu unterstützen.",
      description:
        "Die öffentliche Next.js-Anwendung stellt eine Initiative vor und führt zu einem Vorschlag sowie einem digitalen Unterschriftenablauf. Diese Beschreibung basiert auf Seitenstruktur und Paketmanifest; Wortlaut und Veröffentlichungsdetails sollten vor einer Weiterverwendung bestätigt werden.",
      problem:
        "Einen Vorschlag und Unterstützungsmöglichkeiten online zugänglich machen.",
      solution:
        "Eine öffentliche Website informiert und verweist auf Vorschlags- und Unterschriftsseiten, ohne institutionelle Unterstützung zu behaupten.",
    },
    "cv-builder-app": {
      title: "CV Studio — Lebenslauf-Editor",
      shortDescription:
        "Ein Lebenslauf-Editor mit Live-Vorschau, anpassbaren Layouts und PDF-Export im Browser.",
      description:
        "CV Studio ist ein Next.js-Editor mit veränderbaren Bereichen für Profil, Berufserfahrung, Ausbildung, Projekte und Kompetenzen. Das README beschreibt Live-Vorschau und A4-Druck; lokale Entwürfe können über Prisma mit SQLite gespeichert werden. Produktionsspeicherung und Mehrbenutzerzugriff werden nicht behauptet.",
      problem:
        "Einen Lebenslauf erstellen und überarbeiten, ohne jede Rubrik manuell zu layouten.",
      solution:
        "Formular und Vorschau bieten zwei Layouts, Stiloptionen sowie A4-Druck oder PDF-Export über den Browser.",
    },
    "association-declaration": {
      title: "Hilfe zur Veranstaltungsanmeldung",
      shortDescription:
        "Ein browserbasiertes Werkzeug zur Vorbereitung und zum Export von Veranstaltungsunterlagen.",
      description:
        "Das eigenständige Webwerkzeug führt durch eine Veranstaltungsanmeldung, zeigt eine Vorschau und unterstützt TXT/JSON-Export sowie PDF-Druck im Browser. Entwürfe bleiben im lokalen Browserspeicher; eine Übermittlung an Behörden findet nicht statt.",
      problem:
        "Die nötigen Angaben für eine öffentliche Veranstaltungsanmeldung strukturiert erfassen.",
      solution:
        "Geführtes Formular, lokale Entwürfe und Exportoptionen helfen bei der Vorbereitung zur manuellen Prüfung und Einreichung.",
    },
    "gestion-planning": {
      title: "Maison douce — Prototyp für Tagesplanung",
      shortDescription:
        "Ein mobiloptimiertes Dashboard für Familienroutinen, Arbeitsstunden und anstehende Aufgaben.",
      description:
        "Das README beschreibt ein frühes responsives Dashboard für Betreuungstage, Monatsstunden und kommende Aufgaben. Die Daten sind ausdrücklich lokale Beispieldaten; dauerhafte Geschäftsabläufe sind für spätere Schritte vorgesehen.",
      problem:
        "Tägliche Routinen, Arbeitsstunden und Aufgaben in einer Übersicht zusammenführen.",
      solution:
        "Ein mobiloptimiertes Dashboard zeigt Tages- und Monatsinformationen mit Demonstrationsdaten.",
    },
    "nos-liens-nos-enfants-contre-l-ase": {
      title: "Nos liens, nos enfants — Bürgerplattform",
      shortDescription:
        "Eine Informations- und Beteiligungsseite mit Quellen, moderierter Umfrage und Petitionsvorbereitung.",
      description:
        "Das README beschreibt einen anonymisierten Familienbericht, Quellenmaterial, eine moderierte öffentliche Umfrage, aggregierte Statistiken und einen Ablauf zur Petitionsvorbereitung. Verwendet werden Next.js, React, PostgreSQL und Prisma. Persönliche oder sensible Einzelheiten aus dem Quellmaterial werden hier nicht wiederholt.",
      problem:
        "Quellenbasierte Informationen bereitstellen und strukturierte Beteiligung ermöglichen.",
      solution:
        "Die öffentliche Website verbindet redaktionelle Ressourcen, Umfrage, moderierte Statistiken und Petitionsvorbereitung.",
    },
    "cv-international-manfred": {
      title: "Internationale Lebenslauf-Sammlung",
      shortDescription:
        "Eine Sammlung rollenbezogener Lebensläufe als Dokumente und statische HTML-Seiten.",
      description:
        "Dieses Repository enthält internationale und auf bestimmte Rollen zugeschnittene Lebensläufe in HTML- und PDF-Form. Es wird als Sammlung beruflicher Dokumente und nicht als Webanwendung dargestellt; ein Deployment oder die Aktualität der Dokumente wird nicht behauptet.",
      problem:
        "Mehrere Lebenslaufvarianten und Formate in einem öffentlichen Repository ordnen.",
      solution:
        "Statische HTML-Seiten und PDF-Dokumente bieten unterschiedliche Formate für berufliche Kontexte.",
    },
    "mmcgodrivers-website": {
      title: "MMC Go Drivers — Öffentliche Website",
      shortDescription:
        "Die begleitende Informationswebsite für den mobilen Dienst MMC Go Drivers.",
      description:
        "Die Website stellt Funktionen, Preise, Bewertungen und Informationen zu MMC Go Drivers vor. Der Next.js-Quellcode enthält Supabase-bezogene Inhalte und eine Resend-Abhängigkeit; dieses Webrepository wird getrennt von der Flutter-App aufgeführt.",
      problem:
        "Den mobilen Dienst und seine Angebote öffentlich im Web erklären.",
      solution:
        "Eine eigene Website bündelt Produktinformationen und öffentliche Seiten in einem separaten Repository zur mobilen App.",
    },
    tuktukgo: {
      title: "Angkor Move (TukTukGo) — Mobilitätsprototyp",
      shortDescription:
        "Ein mobiler Mobilitätsprototyp für Fahrer, Fahrgäste, Hotels und Transportunternehmen.",
      description:
        "Das README beschreibt einen Expo/React-Native-Prototyp mit rollenbezogenem Einstieg und Dashboard-Grundlagen. Buchungen und operative Abläufe werden als Produktziel beschrieben; ein produktiver Buchungsdienst wird hier nicht behauptet.",
      problem:
        "Eine mobile Grundlage zur Koordination lokaler Mobilitätsrollen und Dienste erkunden.",
      solution:
        "Der Prototyp ordnet rollenbezogene Einstiege und Dashboard-Grundlagen; zentrale Buchungsabläufe stehen laut README auf der Roadmap.",
    },
    "test-vs-2": {
      title: "TechBoutik — E-Commerce-Demo (Fork)",
      shortDescription:
        "Ein klar gekennzeichneter Fork einer E-Commerce-Demonstrationsanwendung.",
      description:
        "Dieses Repository ist ein Fork von michaelbaze1987-cloud/test-vs-2. Das README beschreibt einen Demo-Shop mit Produktkatalog, Warenkorb, Bestellansichten und simuliertem Checkout; Demo-Daten liegen im Speicher oder in lokalen Dateien, echte Zahlungen sind nicht aktiviert. Es wird nicht als originales Produktions-Commerce-System präsentiert.",
      problem:
        "Shop- und Administrationsabläufe in einer E-Commerce-Demo erkunden.",
      solution:
        "Der Fork bietet Katalog, Warenkorb, simulierten Checkout und Admin-Ansichten zum Experimentieren.",
    },
    testapprn: {
      title: "Routen- und Planungstool — Test-App",
      shortDescription:
        "Eine experimentelle Fahrer-App mit Routenplanung und Terminplanungsansichten.",
      description:
        "Der Expo-Quellcode enthält eine GPS-Routenansicht mit KML/GPX-Hilfsfunktionen und eine Planungskomponente, die Informationen aus PDF-Dateien extrahiert. Ein README fehlt; daher ist die Anwendung ausdrücklich als Test-App markiert, ohne Produktions- oder Backend-Anspruch.",
      problem:
        "Routen- und Planungsabläufe in einer mobilen Anwendung erproben.",
      solution:
        "Der Quellcode enthält getrennte Ansichten für Routenplanung und PDF-basierte Terminplanung.",
    },
    "flutter-first-app": {
      title: "Erste Flutter-App — Tutorial-Vorlage",
      shortDescription:
        "Das Flutter-Standardstartprojekt, aufbewahrt als Lernübung.",
      description:
        "Das README bezeichnet das Repository als neues Flutter-Projekt und verweist auf das offizielle Erste-App-Tutorial. Die pubspec enthält Flutter und die Standardabhängigkeit Cupertino Icons; es ist ausdrücklich eine Lernvorlage und kein veröffentlichtes Produkt.",
      problem: null,
      solution: null,
    },
    "frontend2-simplon-best": {
      title: "Cars Simplon — Mobile Missions-App",
      shortDescription:
        "Ein mobiler Client für Fahrer und Administration zur Ansicht von Missionen, Fahrzeugen und Teamaktivitäten.",
      description:
        "Das README beschreibt eine App für Busfahrermissionen; der geprüfte Expo-Quellcode fragt Missionen, Fahrzeuge und Fahrerdaten über einen API-Dienst für das Dashboard ab. Das Projekt wird als mobiler Prototyp behandelt; README und Manifest nennen leicht unterschiedliche Expo-Versionen.",
      problem:
        "Fahrern und Administratoren einen mobilen Überblick über Missionen und Flotte geben.",
      solution:
        "Ein rollenbasierter Client organisiert Dashboard-, Missions-, Fahrzeug- und Fahreransichten.",
    },
    "backend-for-frontend2-simplon-best": {
      title: "Simplon Drivers — Backend-API-Prototyp",
      shortDescription:
        "Ein API-Prototyp für Authentifizierung sowie Fahrer-, Fahrzeug-, Kunden- und Missionsverwaltung.",
      description:
        "Das Paketmanifest beschreibt ein Node.js/Express-Backend zur Fahrerverwaltung; der Quellcode enthält Routen für Authentifizierung, Nutzer, Fahrzeuge, Kunden und Missionen mit Mongoose. Im geprüften öffentlichen Stand war kein README verfügbar; diese Beschreibung beruht daher auf Manifest und Quellcode und macht keine Deployment-Aussage.",
      problem:
        "Dem mobilen Client Endpunkte für Fahrer, Fahrzeuge, Kunden und Missionen bereitstellen.",
      solution:
        "Ein Express-Server bündelt Authentifizierungs- und Verwaltungsrouten mit MongoDB/Mongoose-Modellen.",
    },
    "simplon-drivers-app": {
      title: "Cars Simplon Drivers — Lokaler SQLite-Prototyp",
      shortDescription:
        "Ein mobiles Dashboard für Busfahrermissionen, Fahrzeuge und Missionshistorie.",
      description:
        "Das README beschreibt eine Missions-App für Fahrer und Administratoren. Die geprüften Authentifizierungs-Hooks und das Dashboard verwenden derzeit lokales SQLite; obwohl das README Supabase erwähnt, wird hier keine verbundene entfernte Supabase-Authentifizierung oder -Speicherung behauptet.",
      problem:
        "Mobilen Zugriff auf zugewiesene Missionen und Fahrer-Flottenabläufe erkunden.",
      solution:
        "Eine Expo-App ordnet Dashboard-, Missions-, Fahrzeug- und Verlaufsansichten um einen lokalen Prototyp.",
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
    "voix-et-enfance": {
      title: "Voix & Enfance — Iniciativa ciudadana",
      shortDescription:
        "Un sitio informativo con una propuesta y formas de apoyar una iniciativa.",
      description:
        "La aplicación pública Next.js presenta una iniciativa y dirige a una propuesta y a un proceso de firma. El resumen se basa en la estructura de páginas y el manifiesto; el texto y los detalles de publicación deben validarse antes de reutilizarlos.",
      problem:
        "Facilitar en línea el acceso a una propuesta y a las formas de apoyar una iniciativa.",
      solution:
        "Un sitio público presenta información y dirige a la propuesta y a las páginas de firma, sin insinuar respaldo institucional.",
    },
    "cv-builder-app": {
      title: "CV Studio — Creador de currículums",
      shortDescription:
        "Un editor de currículums con vista previa en directo, diseños personalizables y exportación PDF desde el navegador.",
      description:
        "CV Studio es un editor Next.js con secciones editables para perfil, experiencia, formación, proyectos y competencias. El README documenta la vista previa y la impresión A4; Prisma con SQLite puede guardar borradores locales. No se afirma que haya almacenamiento de producción ni acceso multiusuario.",
      problem:
        "Crear y mejorar un currículum sin maquetar cada sección manualmente.",
      solution:
        "Un formulario y su vista previa ofrecen dos diseños, opciones de estilo e impresión A4 o exportación PDF desde el navegador.",
    },
    "association-declaration": {
      title: "Asistente para declarar eventos",
      shortDescription:
        "Una herramienta web para preparar y exportar documentos de declaración de eventos.",
      description:
        "Esta herramienta web independiente guía la preparación de una declaración de evento, genera una vista previa y permite exportar TXT/JSON o imprimir en PDF. Los borradores permanecen en el almacenamiento local del navegador; no se envían a ayuntamientos ni prefecturas.",
      problem:
        "Organizar la información necesaria para preparar una declaración de evento público.",
      solution:
        "Un formulario guiado, borradores locales y opciones de exportación ayudan a preparar el documento para su revisión y presentación manual.",
    },
    "gestion-planning": {
      title: "Maison douce — Prototipo de planificación diaria",
      shortDescription:
        "Un panel adaptable a móviles para rutinas familiares, horarios y tareas próximas.",
      description:
        "El README describe un primer panel adaptable para seguir la jornada de cuidados, las horas mensuales y las tareas previstas. Los datos se identifican explícitamente como ejemplos locales; los procesos de trabajo persistentes quedan para una fase posterior.",
      problem:
        "Reunir las rutinas diarias, las horas y las próximas tareas en una sola vista.",
      solution:
        "Un panel diseñado primero para móviles presenta información diaria y mensual con datos de demostración.",
    },
    "nos-liens-nos-enfants-contre-l-ase": {
      title: "Nos liens, nos enfants — Plataforma ciudadana",
      shortDescription:
        "Un sitio informativo y participativo con recursos citados, encuesta moderada y preparación de una petición.",
      description:
        "El README describe un relato familiar anonimizado, recursos con fuentes, una encuesta pública moderada, estadísticas agregadas y un proceso de preparación de petición. El proyecto utiliza Next.js, React, PostgreSQL y Prisma. Este resumen no repite detalles personales o sensibles del material original.",
      problem:
        "Presentar información documentada y ofrecer formas estructuradas de participar.",
      solution:
        "El sitio público combina recursos editoriales, participación en encuestas, estadísticas moderadas y preparación de peticiones.",
    },
    "cv-international-manfred": {
      title: "Colección internacional de currículums",
      shortDescription:
        "Una colección de currículums adaptados a distintos puestos, en documentos y páginas HTML estáticas.",
      description:
        "Este repositorio reúne currículums internacionales y adaptados a puestos específicos en formatos HTML y PDF. Se presenta como una colección de documentos profesionales, no como una aplicación web; no se afirma que esté desplegada ni que los documentos estén actualizados.",
      problem:
        "Organizar varias versiones y formatos de currículum en un repositorio público.",
      solution:
        "Páginas HTML estáticas y documentos PDF ofrecen diferentes formatos según el contexto profesional.",
    },
    "mmcgodrivers-website": {
      title: "MMC Go Drivers — Sitio público",
      shortDescription:
        "El sitio informativo complementario del servicio móvil MMC Go Drivers.",
      description:
        "El sitio público presenta las funciones, tarifas, opiniones e información del servicio MMC Go Drivers. El código Next.js incluye contenido relacionado con Supabase y una dependencia de Resend; este repositorio web se distingue de la aplicación móvil Flutter.",
      problem:
        "Explicar en la web el servicio móvil y sus planes.",
      solution:
        "Un sitio dedicado reúne información del producto y páginas públicas en un repositorio distinto de la aplicación móvil.",
    },
    tuktukgo: {
      title: "Angkor Move (TukTukGo) — Prototipo de movilidad",
      shortDescription:
        "Un prototipo móvil de movilidad para conductores, pasajeros, hoteles y empresas de transporte.",
      description:
        "El README describe un prototipo Expo/React Native con incorporación por roles y bases de paneles de control. Presenta las reservas y operaciones como una dirección futura; este portafolio no afirma que exista un servicio de reservas en producción.",
      problem:
        "Explorar una base móvil para coordinar roles y servicios de movilidad local.",
      solution:
        "El prototipo organiza accesos y paneles por rol; el README sitúa los flujos principales de reserva en la hoja de ruta.",
    },
    "test-vs-2": {
      title: "TechBoutik — Demostración e-commerce (fork)",
      shortDescription:
        "Un fork claramente identificado de una aplicación de demostración de comercio electrónico.",
      description:
        "Este repositorio es un fork de michaelbaze1987-cloud/test-vs-2. Su README describe una tienda de demostración con catálogo, carrito, pedidos y pago simulado; los datos se guardan en memoria o archivos locales y no hay pagos reales. No se presenta como una plataforma de comercio original en producción.",
      problem:
        "Explorar flujos de tienda y administración en una aplicación e-commerce de demostración.",
      solution:
        "El fork ofrece catálogo, carrito, pago simulado y pantallas administrativas para experimentar.",
    },
    testapprn: {
      title: "Herramientas de rutas y horarios — App de prueba",
      shortDescription:
        "Una aplicación experimental para conductores con pantallas de rutas y horarios.",
      description:
        "El código Expo incluye una pantalla GPS con utilidades KML/GPX y otra de horarios que extrae información de archivos PDF. El repositorio no tiene README, por lo que se etiqueta expresamente como app de prueba y no se afirma que esté en producción ni que disponga de backend.",
      problem:
        "Experimentar con flujos de rutas y horarios en una aplicación móvil.",
      solution:
        "El código contiene pantallas separadas para planificar rutas y gestionar horarios a partir de PDF.",
    },
    "flutter-first-app": {
      title: "Primera app Flutter — Plantilla tutorial",
      shortDescription:
        "El proyecto inicial predeterminado de Flutter, conservado como ejercicio de aprendizaje.",
      description:
        "El README identifica el repositorio como un nuevo proyecto Flutter y enlaza al tutorial oficial de primera aplicación. El pubspec contiene Flutter y la dependencia estándar Cupertino Icons; se etiqueta como plantilla educativa, no como producto publicado.",
      problem: null,
      solution: null,
    },
    "frontend2-simplon-best": {
      title: "Cars Simplon — Cliente móvil de misiones",
      shortDescription:
        "Un cliente móvil para consultar misiones, vehículos y actividad del equipo.",
      description:
        "El README describe una aplicación de misiones para conductores de autobús, y el código Expo consultado solicita misiones, vehículos y datos de conductores mediante un servicio API. Se presenta como prototipo móvil; el README y el manifiesto difieren ligeramente en la versión de Expo.",
      problem:
        "Ofrecer a conductores y administradores una vista móvil de misiones y flota.",
      solution:
        "Un cliente móvil por roles organiza paneles, misiones, vehículos y vistas de conductores.",
    },
    "backend-for-frontend2-simplon-best": {
      title: "Simplon Drivers — Prototipo de API backend",
      shortDescription:
        "Un prototipo de API para autenticación y gestión de conductores, vehículos, clientes y misiones.",
      description:
        "El manifiesto describe un backend Node.js/Express para la gestión de conductores, y el código incluye rutas de autenticación, usuarios, vehículos, clientes y misiones con Mongoose. No había README disponible en la revisión pública consultada; esta descripción se basa en el manifiesto y el código, sin afirmar que exista un despliegue.",
      problem:
        "Proporcionar al cliente móvil endpoints para conductores, vehículos, clientes y misiones.",
      solution:
        "Un servidor Express agrupa rutas de autenticación y gestión con modelos MongoDB/Mongoose.",
    },
    "simplon-drivers-app": {
      title: "Cars Simplon Drivers — Prototipo local SQLite",
      shortDescription:
        "Un prototipo de panel móvil para misiones de conductores, vehículos e historial.",
      description:
        "El README describe una aplicación móvil de misiones para conductores y administradores. Los hooks de autenticación y el panel revisados usan actualmente SQLite local; aunque el README menciona Supabase, este portafolio no afirma que la autenticación o persistencia remota de Supabase esté conectada.",
      problem:
        "Explorar el acceso móvil a misiones asignadas y flujos de gestión para conductores.",
      solution:
        "Una aplicación Expo organiza paneles, misiones, vehículos e historial alrededor de un prototipo local.",
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
