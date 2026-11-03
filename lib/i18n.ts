import type { PortfolioProject } from "./portfolio-data";

export const locales = ["en", "fr", "de", "es", "km", "zh", "ja"] as const;
export type SiteLocale = (typeof locales)[number];

export const localeLabels: Record<SiteLocale, string> = {
  en: "EN",
  fr: "FR",
  de: "DE",
  es: "ES",
  km: "ខ្មែរ",
  zh: "中文",
  ja: "日本語",
};

export function isSiteLocale(value: string): value is SiteLocale {
  return locales.some((locale) => locale === value);
}

export function getSiteLocale(value: string): SiteLocale {
  return isSiteLocale(value) ? value : "en";
}

export function localizedPath(pathname: string, locale: SiteLocale): string {
  const suffixIndex = pathname.search(/[?#]/u);
  const path = suffixIndex < 0 ? pathname : pathname.slice(0, suffixIndex);
  const suffix = suffixIndex < 0 ? "" : pathname.slice(suffixIndex);
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
  km: {
    metadata: {
      title: "Manfred Parbatia — អ្នកអភិវឌ្ឍ Full-Stack",
      description: "ស្នាដៃរបស់ Manfred Parbatia អ្នកអភិវឌ្ឍ Full-Stack ដែលបង្កើតផលិតផលឌីជីថលមានប្រយោជន៍សម្រាប់គេហទំព័រ និងទូរស័ព្ទ។",
    },
    header: {
      projects: "គម្រោង",
      about: "អំពីខ្ញុំ",
      contact: "ទំនាក់ទំនង",
      github: "GitHub",
      telegram: "Telegram",
      language: "ភាសា",
      menu: "ម៉ឺនុយ",
      close: "បិទ",
      navigation: "ការរុករកចម្បង",
      home: "Manfred Parbatia, ទំព័រដើម",
    },
    location: "មានមូលដ្ឋាននៅក្រុងសៀមរាប ប្រទេសកម្ពុជា។",
    hero: {
      eyebrow: "ស្នាដៃ / ២០២៦",
      lineOne: "បង្កើត",
      lineTwo: "គំនិត",
      lineThree: "មានប្រយោជន៍",
      intro: "Manfred Parbatia — អ្នកអភិវឌ្ឍ Full-Stack។",
      introSecond: "ពីតម្រូវការជាក់ស្តែង ទៅជាផលិតផលឌីជីថល។",
      explore: "មើលគម្រោង",
      position: "ការណែនាំខ្លួន",
      strip: "ចូលចិត្តស្វែងយល់តាមធម្មជាតិ និងជ្រើសរើសការអភិវឌ្ឍដោយចិត្តស្រឡាញ់។ គំនិតក្លាយជាការពិតនៅពេលយើងចាប់ផ្តើមសាងសង់វា។",
    },
    projects: {
      eyebrow: "០១ — ស្នាដៃដែលបានជ្រើសរើស",
      title: "គម្រោង",
      titleAccent: "ដែលមានគោលបំណង។",
      aside: "ឧបករណ៍ឌីជីថលដែលរៀបចំឡើងតាមតម្រូវការជាក់ស្តែង។ គម្រោងនីមួយៗសាកល្បងវិធីផ្សេងក្នុងការដោះស្រាយបញ្ហា។",
      note: "ព័ត៌មាន និងតំណភ្ជាប់គម្រោងផ្អែកលើឃ្លាំងកូដសាធារណៈ និងគេហទំព័រដែលបានពិនិត្យ។ ព័ត៌មានអំពីស្ថានភាពដែលមិនទាន់បញ្ជាក់ នៅតែត្រូវបញ្ជាក់បន្ថែម។",
      all: "ទាំងអស់",
      filters: "ត្រងគម្រោង",
      slideshow: "ស្លាយបង្ហាញគម្រោង",
      previous: "គម្រោងមុន",
      next: "គម្រោងបន្ទាប់",
      discover: "ស្វែងយល់អំពីគម្រោង {title}",
      statusUnknown: "ស្ថានភាពត្រូវបញ្ជាក់",
      statusProduction: "កំពុងប្រើប្រាស់ជាក់ស្តែង",
      statusTest: "កំពុងសាកល្បង",
      statusDevelopment: "កំពុងអភិវឌ្ឍ",
      empty: "មិនទាន់មានគម្រោងក្នុងប្រភេទនេះទេ។",
      artAlt: "រូបគំនូរក្រាហ្វិកដើម មិនមែនរូបថតអេក្រង់ទេ",
      sceneRoute: "ផ្លូវ",
      sceneGreeting: "សួស្តី,",
      sceneDriver: "អ្នកបើកបរ។",
      sceneNext: "ដំណើរបន្ទាប់",
      sceneAssociation: "គ្រប់សំឡេង",
      sceneAssociationSecond: "សុទ្ធតែគួរត្រូវបានស្តាប់។",
      sceneAssociationFooter: "ការការពារ · ការស្តាប់ · ការតភ្ជាប់",
      sceneAirport: "អាកាសយានដ្ឋានសៀមរាប",
      sceneTransfer: "សេវាដឹកជញ្ជូនឯកជន",
      sceneKhmera: "សៀមរាប",
      sceneKhmeraFooter: "ផ្លាស់ទី · កសាង · ស្វែងយល់",
    },
    about: {
      eyebrow: "០២ — អំពីខ្ញុំ",
      mantra: "រៀន។ សាងសង់។ ចាប់ផ្តើមម្ដងទៀត។",
      first: "ខ្ញុំជាអ្នកអភិវឌ្ឍ",
      second: "ដោយសារការចង់ដឹង,",
      third: "និងជាអ្នកសាងសង់ដោយជំនឿ។",
      description: "ខ្ញុំជាអ្នកអភិវឌ្ឍដែលបានទទួលការបណ្តុះបណ្តាល មានបទពិសោធន៍ និងផ្តោតលើដំណោះស្រាយ។ ខ្ញុំចូលចិត្តស្វែងយល់ពីតម្រូវការ ពិចារណាវិធីសមស្រប និងអនុវត្តឱ្យបានចប់។ ពីគេហទំព័រដល់ទូរស័ព្ទ ខ្ញុំបង្កើតបទពិសោធន៍ដែលងាយប្រើ មានប្រយោជន៍ និងគិតគូរពីការប្រើប្រាស់រយៈពេលវែង។",
      educationLabel: "ការបណ្តុះបណ្តាល និងសញ្ញាបត្រ",
      education: "សញ្ញាបត្រអ្នកអភិវឌ្ឍគេហទំព័រ កម្រិត IV — ទទួលបាននៅឆ្នាំ ២០២៣ តាមរយៈ OpenClassrooms។ ការបណ្តុះបណ្តាលផ្លូវការនេះបំពេញបន្ថែមបទពិសោធន៍អនុវត្ត និងការបន្តរៀនរបស់ខ្ញុំ។",
      motto: "«បើអ្នកដទៃធ្វើបាន អ្នកក៏អាចធ្វើបានដែរ។»",
      skills: "បច្ចេកវិទ្យាដែលមានក្នុងគម្រោងទាំងនេះ",
      aiLabel: "ជំនាញបន្ថែមផ្នែកបញ្ញាសិប្បនិម្មិត",
      aiDescription: "ខ្ញុំប្រើឧបករណ៍ AI ដើម្បីជួយដល់ការអភិវឌ្ឍ ស្វ័យប្រវត្តិកម្មលំហូរការងារ និងបញ្ចូលដំណោះស្រាយជាក់ស្តែងដែលមានជំនួយពី AI។",
      skillsNote: "មិនប្រើរបារវាយតម្លៃជំនាញតាមអារម្មណ៍ទេ — បង្ហាញតែឧបករណ៍ដែលប្រើក្នុងគម្រោងដែលអាចស្គាល់បាន។",
    },
    contact: {
      eyebrow: "០៣ — មកនិយាយពីគំនិតរបស់អ្នក",
      title: "ចុះបើយើង",
      titleAccent: "សាងសង់វា?",
      description: "ចង់សហការ មានសំណួរ ឬមានគម្រោងចង់អភិវឌ្ឍបន្ថែម? ផ្ញើសារមកខ្ញុំ។",
      github: "ឬស្វែងរកខ្ញុំនៅ GitHub",
      telegram: "ផ្ញើសារមកខ្ញុំតាម Telegram",
      yourName: "ឈ្មោះរបស់អ្នក",
      yourEmail: "អ៊ីមែលរបស់អ្នក",
      subject: "ប្រធានបទ",
      yourMessage: "សាររបស់អ្នក",
      privacy: "ព័ត៌មានរបស់អ្នកប្រើតែសម្រាប់ឆ្លើយតបអ្នកប៉ុណ្ណោះ។",
      send: "ផ្ញើសារ",
      sending: "កំពុងផ្ញើ…",
      sent: "អរគុណ — សាររបស់អ្នកត្រូវបានរក្សាទុកហើយ។",
      notificationPending: "សាររបស់អ្នកត្រូវបានរក្សាទុក ប៉ុន្តែការជូនដំណឹងតាមអ៊ីមែលមិនទាន់បានផ្ញើទេ។ សូមកុំផ្ញើម្ដងទៀត។",
      errors: {
        rejected: "មិនអាចទទួលយកសារបានទេ។ សូមពិនិត្យមើលទម្រង់។",
        rateLimit: "អ្នកបានព្យាយាមច្រើនដងពេក។ សូមសាកល្បងម្ដងទៀតពេលក្រោយ។",
        unavailable: "ទម្រង់ទំនាក់ទំនងមិនអាចប្រើបានជាបណ្តោះអាសន្នទេ។",
        failed: "មិនអាចរក្សាទុកសារនៅពេលនេះបានទេ។",
        network: "ការតភ្ជាប់មិនបានសម្រេច។ សូមសាកល្បងម្ដងទៀតបន្តិចក្រោយ។",
      },
    },
    footer: {
      home: "ត្រឡប់ទៅទំព័រដើម",
      made: "បង្កើតឡើងដោយយកចិត្តទុកដាក់។",
      admin: "អ្នកគ្រប់គ្រង",
      contact: "ទាក់ទងមក",
    },
    detail: {
      allProjects: "គម្រោងទាំងអស់",
      selected: "គម្រោងដែលបានជ្រើសរើស / ២០២៦",
      status: "ស្ថានភាពត្រូវបញ្ជាក់",
      production: "កំពុងប្រើប្រាស់ជាក់ស្តែង",
      testing: "កំពុងសាកល្បង",
      development: "កំពុងអភិវឌ្ឍ",
      project: "អំពីគម្រោង",
      need: "តម្រូវការ",
      approach: "វិធីសាស្ត្រ",
      explore: "ស្វែងយល់",
      repository: "ឃ្លាំងកូដ GitHub",
      website: "គេហទំព័រ",
      application: "កម្មវិធី",
      next: "គម្រោងផ្សេងទៀត",
      notFoundTitle: "ទំព័រនេះមិនមានទេ។",
      notFoundDescription: "តំណភ្ជាប់ប្រហែលជាបានផ្លាស់ប្តូរ ឬគម្រោងនេះមិនទាន់ត្រូវបានផ្សព្វផ្សាយ។",
      associationCaveat: "អង្គការត្រូវពិនិត្យ និងបញ្ជាក់ខ្លឹមសារ និងព័ត៌មានទំនាក់ទំនងរបស់ខ្លួន មុនពេលផ្សព្វផ្សាយឡើងវិញ។",
      khmeraCaveat: "សេវាកម្មរបស់ KHMERA មានលក្ខណៈផ្តល់ព័ត៌មាន។ ការកក់តាមអ៊ីនធឺណិត ការពិនិត្យភាពទំនេរ និងការទូទាត់ មិនទាន់ដំណើរការនៅលើគេហទំព័រសាធារណៈទេ។",
    },
    categories: {
      mobile: "កម្មវិធីទូរស័ព្ទ",
      web: "គេហទំព័រ",
      transfers: "ការដឹកជញ្ជូនទៅអាកាសយានដ្ឋាន",
      travel: "ការផ្លាស់ទីលំនៅ និងទេសចរណ៍",
      civic: "វេទិកាសាធារណៈ",
      tools: "ឧបករណ៍ឌីជីថល",
      professional: "ប្រវត្តិរូបវិជ្ជាជីវៈ",
      transport: "ការដឹកជញ្ជូន",
      learning: "ការសាកល្បង និងមេរៀន",
    },
  },
  zh: {
    metadata: {
      title: "Manfred Parbatia — 全栈开发者",
      description: "Manfred Parbatia 的作品集：专注于为网页和移动端打造实用数字产品的全栈开发者。",
    },
    header: {
      projects: "项目",
      about: "关于",
      contact: "联系",
      github: "GitHub",
      telegram: "Telegram",
      language: "语言",
      menu: "菜单",
      close: "关闭",
      navigation: "主导航",
      home: "Manfred Parbatia，首页",
    },
    location: "常驻柬埔寨暹粒。",
    hero: {
      eyebrow: "作品集 / 2026",
      lineOne: "让",
      lineTwo: "实用的",
      lineThree: "想法成形",
      intro: "Manfred Parbatia — 全栈开发者。",
      introSecond: "从真实需求出发，打造数字产品。",
      explore: "浏览项目",
      position: "个人定位",
      strip: "天生好奇，选择成为开发者。把想法付诸实践，它才会成为现实。",
    },
    projects: {
      eyebrow: "01 — 精选作品",
      title: "项目",
      titleAccent: "皆有用意。",
      aside: "围绕真实需求打造的数字工具。每个项目都尝试以不同方式解决问题。",
      note: "项目详情和链接依据公开代码仓库及已核实的网站。尚未确认的项目状态会明确保留为待确认。",
      all: "全部",
      filters: "筛选项目",
      slideshow: "项目幻灯片",
      previous: "上一个项目",
      next: "下一个项目",
      discover: "了解 {title} 项目",
      statusUnknown: "状态待确认",
      statusProduction: "已投入使用",
      statusTest: "测试中",
      statusDevelopment: "开发中",
      empty: "此类别暂时没有项目。",
      artAlt: "原创图形插画，并非应用截图",
      sceneRoute: "路线",
      sceneGreeting: "你好，",
      sceneDriver: "司机。",
      sceneNext: "下一程",
      sceneAssociation: "每一种声音",
      sceneAssociationSecond: "都值得被倾听。",
      sceneAssociationFooter: "保护 · 倾听 · 联结",
      sceneAirport: "暹粒机场",
      sceneTransfer: "专车接送",
      sceneKhmera: "暹粒",
      sceneKhmeraFooter: "出行 · 建设 · 探索",
    },
    about: {
      eyebrow: "02 — 关于",
      mantra: "学习。构建。重新出发。",
      first: "我是一名开发者",
      second: "源于好奇，",
      third: "也因信念而创造。",
      description: "我受过专业培训，拥有实践经验，并以解决问题为导向。我喜欢理解需求、探索合适的方法，并把工作落实。从网页到移动端，我致力于打造易用、实在且经得起长期使用的体验。",
      educationLabel: "培训与学历",
      education: "网页开发者文凭，法国 IV 级 — 于 2023 年通过 OpenClassrooms 获得。正规培训补充了我的实践经验，也支持我持续学习。",
      motto: "“别人做得到，你也可以。”",
      skills: "这些项目中使用的技术",
      aiLabel: "人工智能应用方向",
      aiDescription: "我运用 AI 工具辅助开发、自动化工作流程，并整合切实可用的 AI 辅助方案。",
      skillsNote: "不使用主观的技能条，只展示在可识别项目中实际用到的工具。",
    },
    contact: {
      eyebrow: "03 — 聊聊你的想法",
      title: "要不我们",
      titleAccent: "把它做出来？",
      description: "想合作、有问题，或有一个值得继续推进的项目？欢迎给我留言。",
      github: "也可以在 GitHub 上找到我",
      telegram: "通过 Telegram 给我发消息",
      yourName: "姓名",
      yourEmail: "电子邮箱",
      subject: "主题",
      yourMessage: "留言内容",
      privacy: "你提供的信息仅用于回复你。",
      send: "发送消息",
      sending: "正在发送…",
      sent: "谢谢 — 你的消息已记录。",
      notificationPending: "消息已保存，但邮件通知尚未发送。请不要重复提交。",
      errors: {
        rejected: "无法接收这条消息，请检查表单内容。",
        rateLimit: "尝试次数过多，请稍后再试。",
        unavailable: "联系表单暂时无法使用。",
        failed: "目前无法保存消息。",
        network: "连接失败，请稍后再试。",
      },
    },
    footer: {
      home: "返回首页",
      made: "用心制作。",
      admin: "管理",
      contact: "联系我",
    },
    detail: {
      allProjects: "所有项目",
      selected: "精选项目 / 2026",
      status: "状态待确认",
      production: "已投入使用",
      testing: "测试中",
      development: "开发中",
      project: "项目介绍",
      need: "需求",
      approach: "实现思路",
      explore: "了解更多",
      repository: "GitHub 代码仓库",
      website: "网站",
      application: "应用",
      next: "更多项目",
      notFoundTitle: "此页面不存在。",
      notFoundDescription: "链接可能已更改，或该项目尚未发布。",
      associationCaveat: "协会在重新发布前必须核实并确认其内容和联系方式。",
      khmeraCaveat: "KHMERA 的服务信息仅供参考。公开网站目前未启用在线预订、可用性查询或付款功能。",
    },
    categories: {
      mobile: "移动应用",
      web: "网站",
      transfers: "机场接送",
      travel: "搬迁与旅行",
      civic: "公民参与平台",
      tools: "数字工具",
      professional: "职业资料",
      transport: "交通运输",
      learning: "实验与教程",
    },
  },
  ja: {
    metadata: {
      title: "Manfred Parbatia — フルスタック開発者",
      description: "Manfred Parbatiaのポートフォリオ。Webとモバイル向けに実用的なデジタルプロダクトを作るフルスタック開発者です。",
    },
    header: {
      projects: "プロジェクト",
      about: "プロフィール",
      contact: "お問い合わせ",
      github: "GitHub",
      telegram: "Telegram",
      language: "言語",
      menu: "メニュー",
      close: "閉じる",
      navigation: "メインナビゲーション",
      home: "Manfred Parbatia、ホーム",
    },
    location: "カンボジアのシェムリアップを拠点にしています。",
    hero: {
      eyebrow: "ポートフォリオ / 2026",
      lineOne: "役立つ",
      lineTwo: "アイデアを",
      lineThree: "形にする",
      intro: "Manfred Parbatia — フルスタック開発者。",
      introSecond: "身近な課題からデジタルプロダクトへ。",
      explore: "プロジェクトを見る",
      position: "プロフィール",
      strip: "好奇心を持ち、開発者の道を選びました。アイデアは形にしてこそ現実になります。",
    },
    projects: {
      eyebrow: "01 — 主なプロジェクト",
      title: "プロジェクト",
      titleAccent: "目的のあるもの。",
      aside: "実際のニーズをもとに形にしたデジタルツールです。それぞれ異なる方法で課題解決に取り組んでいます。",
      note: "プロジェクトの説明とリンクは、公開リポジトリおよび確認済みのWebサイトに基づいています。未確認の開発状況は未確認のまま記載しています。",
      all: "すべて",
      filters: "プロジェクトを絞り込む",
      slideshow: "プロジェクトスライドショー",
      previous: "前のプロジェクト",
      next: "次のプロジェクト",
      discover: "{title} プロジェクトを見る",
      statusUnknown: "状況は要確認",
      statusProduction: "運用中",
      statusTest: "テスト中",
      statusDevelopment: "開発中",
      empty: "このカテゴリにはまだプロジェクトがありません。",
      artAlt: "オリジナルのグラフィックイラスト（画面キャプチャではありません）",
      sceneRoute: "ルート",
      sceneGreeting: "こんにちは、",
      sceneDriver: "ドライバー。",
      sceneNext: "次の乗車",
      sceneAssociation: "一人ひとりの声に",
      sceneAssociationSecond: "耳を傾ける。",
      sceneAssociationFooter: "保護 · 傾聴 · つながり",
      sceneAirport: "シェムリアップ空港",
      sceneTransfer: "専用送迎",
      sceneKhmera: "シェムリアップ",
      sceneKhmeraFooter: "移動 · つくる · 探索",
    },
    about: {
      eyebrow: "02 — プロフィール",
      mantra: "学ぶ。つくる。また始める。",
      first: "開発者として",
      second: "好奇心を原動力に、",
      third: "信念を持って形にします。",
      description: "実務経験と専門的な学びを重ね、課題解決を大切にしています。ニーズを理解し、適切な方法を探り、最後まで形にすることが好きです。Webからモバイルまで、使いやすく長く役立つ体験を目指して開発しています。",
      educationLabel: "学習歴・資格",
      education: "Web開発者ディプロマ（フランス資格レベルIV）— OpenClassroomsにて2023年取得。正式な学習に加え、実践経験を積みながら継続して学んでいます。",
      motto: "「誰かにできたことなら、あなたにもできる。」",
      skills: "プロジェクトで使用した技術",
      aiLabel: "人工知能の活用",
      aiDescription: "AIツールを開発の補助や業務フローの自動化に活用し、実用的なAI支援ソリューションの導入にも取り組んでいます。",
      skillsNote: "根拠のないスキル評価はせず、実際のプロジェクトで使った技術を掲載しています。",
    },
    contact: {
      eyebrow: "03 — アイデアについて話しましょう",
      title: "一緒に",
      titleAccent: "つくりませんか？",
      description: "協業の相談、質問、これから育てたいプロジェクトなど、お気軽にメッセージをお送りください。",
      github: "GitHubでもご覧いただけます",
      telegram: "Telegramでメッセージを送る",
      yourName: "お名前",
      yourEmail: "メールアドレス",
      subject: "件名",
      yourMessage: "メッセージ",
      privacy: "お預かりした情報は返信のためにのみ使用します。",
      send: "メッセージを送信",
      sending: "送信中…",
      sent: "ありがとうございます。メッセージを記録しました。",
      notificationPending: "メッセージは保存されましたが、メール通知は保留中です。再送信しないでください。",
      errors: {
        rejected: "メッセージを受け付けられませんでした。フォームをご確認ください。",
        rateLimit: "試行回数が多すぎます。しばらくしてからお試しください。",
        unavailable: "お問い合わせフォームは一時的に利用できません。",
        failed: "現在、メッセージを保存できませんでした。",
        network: "接続に失敗しました。少し時間をおいて再度お試しください。",
      },
    },
    footer: {
      home: "ホームに戻る",
      made: "意図を持って制作。",
      admin: "管理",
      contact: "お問い合わせ",
    },
    detail: {
      allProjects: "すべてのプロジェクト",
      selected: "ピックアップ / 2026",
      status: "状況は要確認",
      production: "運用中",
      testing: "テスト中",
      development: "開発中",
      project: "プロジェクト",
      need: "課題・ニーズ",
      approach: "取り組み方",
      explore: "詳しく見る",
      repository: "GitHubリポジトリ",
      website: "Webサイト",
      application: "アプリケーション",
      next: "その他のプロジェクト",
      notFoundTitle: "このページは見つかりません。",
      notFoundDescription: "リンクが変更されたか、プロジェクトが公開されていない可能性があります。",
      associationCaveat: "再掲載の前に、団体による内容と連絡先の確認が必要です。",
      khmeraCaveat: "KHMERAのサービス情報は案内を目的としています。公開サイトではオンライン予約、空き状況の確認、決済は利用できません。",
    },
    categories: {
      mobile: "モバイルアプリ",
      web: "Webサイト",
      transfers: "空港送迎",
      travel: "移住・旅行",
      civic: "市民参加プラットフォーム",
      tools: "デジタルツール",
      professional: "職務プロフィール",
      transport: "交通",
      learning: "実験・チュートリアル",
    },
  },
};

export function getMessages(locale: SiteLocale): SiteMessages {
  return translations[locale];
}

export function getCategoryName(locale: SiteLocale, slug: string, name: string) {
  const translated = Object.entries(translations[locale].categories)
    .find(([categorySlug]) => categorySlug === slug)?.[1];
  return translated ?? name;
}

type ProjectCopy = Pick<
  PortfolioProject,
  "title" | "shortDescription" | "description" | "problem" | "solution"
>;

const projectCopies: Record<
  Exclude<SiteLocale, "en">,
  Record<string, ProjectCopy>
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
  km: {
    "mmc-go-drivers": {
      title: "MMC Go Drivers",
      shortDescription: "កម្មវិធីទូរស័ព្ទសម្រាប់ការរុករកផ្លូវ រៀបចំដំណើរ និងគ្រប់គ្រងយានយន្ត។",
      description: "MMC Go Drivers ប្រមូលផ្តុំឧបករណ៍រុករកផ្លូវដែលសមស្របនឹងយានយន្ត ការគ្រប់គ្រងដំណើរ និងកាលវិភាគ ព្រមទាំងឧបករណ៍គ្រប់គ្រងកងយានយន្ត។ ការពិពណ៌នានេះផ្អែកលើ README សាធារណៈរបស់ឃ្លាំងកូដ។",
      problem: "អ្នកបើកបរ និងអាជីវកម្មដឹកជញ្ជូនខ្នាតតូចត្រូវការឧបករណ៍រុករកផ្លូវ រៀបចំកាលវិភាគ និងឯកសារដែលប្រមូលនៅកន្លែងតែមួយ។",
      solution: "កម្មវិធីនេះផ្តល់មុខងារសម្រាប់អ្នកបើកបររថយន្តក្រុង តាក់ស៊ី និងរថយន្តដឹកទំនិញ ព្រមទាំងឧបករណ៍គ្រប់គ្រងសម្រាប់អាជីវកម្ម។",
    },
    "la-voix-des-enfants-places": {
      title: "La Voix des Enfants Placés — Vienne",
      shortDescription: "ការរៀបចំខ្លឹមសារគេហទំព័រដែលឆ្លើយតបតាមទំហំអេក្រង់ សម្រាប់សមាគមការពារកុមារ។",
      description: "ឃ្លាំងកូដពិពណ៌នាអំពីគេហទំព័រសាធារណៈដែលមានទំព័រព័ត៌មាន និងព័ត៌មានថ្មីៗគ្រប់គ្រងដោយ Prisma និង PostgreSQL។ ក៏មានផ្នែកឯកជនសម្រាប់គ្រប់គ្រងអត្ថបទផងដែរ។ សមាគមត្រូវផ្ទៀងផ្ទាត់ខ្លឹមសារ និងព័ត៌មានទំនាក់ទំនងមុនផ្សព្វផ្សាយ។",
      problem: "ធ្វើឱ្យព័ត៌មានរបស់សមាគមងាយស្រួលចូលមើល និងអនុញ្ញាតឱ្យក្រុមការងារផ្សព្វផ្សាយព័ត៌មានថ្មីដោយមិនចាំបាច់កែប្រែកូដ។",
      solution: "ចំណុចប្រទាក់បោះពុម្ពផ្សាយដែលឆ្លើយតបតាមអេក្រង់ ភ្ជាប់នឹងមូលដ្ឋានទិន្នន័យ មានការគ្រប់គ្រងអត្ថបទឯកជន និងទម្រង់ទំនាក់ទំនង។",
    },
    saiway: {
      title: "Saiway — ដឹកជញ្ជូនទៅអាកាសយានដ្ឋានសៀមរាប",
      shortDescription: "វេទិកាកក់ និងគ្រប់គ្រងការដឹកជញ្ជូនឯកជនពីអាកាសយានដ្ឋានអន្តរជាតិសៀមរាប។",
      description: "Saiway ជាសេវាដឹកជញ្ជូនទៅអាកាសយានដ្ឋាន ដែលមានដំណើរការកក់ និងឧបករណ៍ប្រតិបត្តិការសម្រាប់អតិថិជន អ្នកបើកបរ និងអ្នកគ្រប់គ្រង។ README រៀបរាប់ពីការគ្រប់គ្រងការកក់ និងដំណើរតាមតួនាទី ដោយប្រើ PostgreSQL។",
      problem: "សម្របសម្រួលការធ្វើដំណើរទៅអាកាសយានដ្ឋាន និងប្រតិបត្តិការប្រចាំថ្ងៃរវាងអតិថិជន អ្នកបើកបរ និងអ្នកគ្រប់គ្រង។",
      solution: "វេទិកាមួយប្រមូលផ្តុំដំណើរការកក់ ការបែងចែកដំណើរឱ្យអ្នកបើកបរ និងឧបករណ៍តាមតួនាទី។",
    },
    khmera: {
      title: "KHMERA — ការផ្លាស់ទីមករស់នៅ និងទេសចរណ៍នៅសៀមរាប",
      shortDescription: "ការណែនាំតាមតម្រូវការសម្រាប់អ្នកមកថ្មី សហគ្រិន និងអ្នកធ្វើដំណើរនៅសៀមរាប។",
      description: "KHMERA បង្ហាញព័ត៌មានក្នុងតំបន់ និងសេវាកម្មដែលស្នើតម្លៃតាមករណី ដើម្បីត្រៀមការផ្លាស់ទីលំនៅ គម្រោងអាជីវកម្ម ឬដំណើរស្វែងយល់នៅសៀមរាប។ គេហទំព័រសាធារណៈមានជាភាសាអង់គ្លេស បារាំង អេស្ប៉ាញ និងអាល្លឺម៉ង់។",
      problem: "អ្នកដែលរៀបចំផ្លាស់ទីលំនៅ បើកអាជីវកម្ម ឬមកស្វែងយល់ពីសៀមរាប ត្រូវការព័ត៌មានណែនាំក្នុងតំបន់ដែលច្បាស់លាស់។",
      solution: "គេហទំព័រច្រើនភាសាបង្ហាញសេវាកម្ម និងជួយរៀបចំសំណើ។ ព័ត៌មានសេវាមានលក្ខណៈណែនាំប៉ុណ្ណោះ ហើយការកក់ និងការទូទាត់តាមអ៊ីនធឺណិតមិនទាន់ដំណើរការទេ។",
    },
    "voix-et-enfance": {
      title: "Voix & Enfance — គំនិតផ្តួចផ្តើមសាធារណៈ",
      shortDescription: "គេហទំព័រព័ត៌មានដែលបង្ហាញសំណើ និងវិធីចូលរួមគាំទ្រគំនិតផ្តួចផ្តើមមួយ។",
      description: "កម្មវិធី Next.js សាធារណៈបង្ហាញគំនិតផ្តួចផ្តើម ភ្ជាប់ទៅសំណើរបស់វា និងផ្តល់លំហូរចុះហត្ថលេខា។ សេចក្តីសង្ខេបផ្អែកលើរចនាសម្ព័ន្ធទំព័រ និង manifest; ត្រូវផ្ទៀងផ្ទាត់អត្ថបទ និងលក្ខខណ្ឌផ្សព្វផ្សាយមុនយកទៅប្រើឡើងវិញ។",
      problem: "ធ្វើឱ្យសំណើ និងវិធីគាំទ្រគំនិតផ្តួចផ្តើមអាចចូលមើលតាមអ៊ីនធឺណិតបាន។",
      solution: "គេហទំព័រសាធារណៈបង្ហាញព័ត៌មាន និងនាំទៅកាន់សំណើ និងទំព័រចុះហត្ថលេខា ដោយមិនបញ្ជាក់ថាស្ថាប័នណាមួយគាំទ្រទេ។",
    },
    "cv-builder-app": {
      title: "CV Studio — កម្មវិធីបង្កើតប្រវត្តិរូបការងារ",
      shortDescription: "កម្មវិធីកែ CV ដែលមានការមើលជាមុនផ្ទាល់ ប្លង់អាចកែសម្រួល និងនាំចេញ PDF ពីកម្មវិធីរុករក។",
      description: "CV Studio ជាកម្មវិធីបង្កើត CV ដោយប្រើ Next.js ដែលមានផ្នែកកែប្រែបានសម្រាប់ប្រវត្តិរូប បទពិសោធន៍ ការសិក្សា គម្រោង និងជំនាញ។ README រៀបរាប់ពីការមើលជាមុនផ្ទាល់ និងការបោះពុម្ព A4; Prisma ជាមួយ SQLite អាចប្រើសម្រាប់សេចក្តីព្រាងក្នុងមូលដ្ឋាន។ មិនអះអាងថាមានការផ្ទុកទិន្នន័យ production ឬការចូលប្រើច្រើនអ្នកប្រើទេ។",
      problem: "បង្កើត និងកែលម្អ CV ដោយមិនចាំបាច់រៀបចំប្លង់ផ្នែកនីមួយៗដោយដៃ។",
      solution: "ទម្រង់ និងការមើលជាមុនផ្តល់ប្លង់ពីរ ជម្រើសរចនាបថ និងការបោះពុម្ព A4 ឬនាំចេញ PDF តាមកម្មវិធីរុករក។",
    },
    "association-declaration": {
      title: "ជំនួយរៀបចំសេចក្តីប្រកាសព្រឹត្តិការណ៍",
      shortDescription: "ឧបករណ៍ក្នុងកម្មវិធីរុករកសម្រាប់រៀបចំ និងនាំចេញឯកសារប្រកាសព្រឹត្តិការណ៍។",
      description: "ឧបករណ៍គេហទំព័រឯករាជ្យនេះណែនាំការរៀបចំសេចក្តីប្រកាសព្រឹត្តិការណ៍ បង្កើតការមើលជាមុន និងអាចនាំចេញជា TXT/JSON ឬបោះពុម្ពជា PDF។ សេចក្តីព្រាងរក្សាទុកក្នុងកម្មវិធីរុករក៖ គ្មានឯកសារណាត្រូវបានផ្ញើទៅសាលាក្រុង ឬអាជ្ញាធរខេត្តទេ។",
      problem: "រៀបចំព័ត៌មានដែលត្រូវការសម្រាប់ត្រៀមសេចក្តីប្រកាសព្រឹត្តិការណ៍។",
      solution: "ទម្រង់ណែនាំ សេចក្តីព្រាងក្នុងកម្មវិធីរុករក និងទម្រង់នាំចេញជាច្រើន ជួយរៀបចំឯកសារសម្រាប់ពិនិត្យ និងដាក់ស្នើដោយដៃ។",
    },
    "gestion-planning": {
      title: "Maison douce — គំរូដើមសម្រាប់រៀបចំកាលវិភាគប្រចាំថ្ងៃ",
      shortDescription: "ផ្ទាំងគ្រប់គ្រងផ្តោតលើទូរស័ព្ទ សម្រាប់ទម្លាប់គ្រួសារ ម៉ោង និងកិច្ចការខាងមុខ។",
      description: "README ពិពណ៌នាអំពីផ្ទាំងគ្រប់គ្រងឆ្លើយតបតាមអេក្រង់ដំបូង សម្រាប់តាមដានថ្ងៃថែទាំ ម៉ោងប្រចាំខែ និងកិច្ចការដែលបានគ្រោង។ ទិន្នន័យត្រូវបានបញ្ជាក់ច្បាស់ថាជាទិន្នន័យគំរូក្នុងមូលដ្ឋាន; លំហូរការងារដែលរក្សាទិន្នន័យជាបន្តបន្ទាប់ត្រូវបានគ្រោងទុកសម្រាប់ពេលក្រោយ។",
      problem: "ប្រមូលទម្លាប់ប្រចាំថ្ងៃ ម៉ោង និងកិច្ចការខាងមុខក្នុងទិដ្ឋភាពតែមួយ។",
      solution: "ផ្ទាំងគ្រប់គ្រងផ្តោតលើទូរស័ព្ទបង្ហាញព័ត៌មានថ្ងៃ និងខែ ដោយប្រើទិន្នន័យសាកល្បង។",
    },
    "nos-liens-nos-enfants-contre-l-ase": {
      title: "Nos liens, nos enfants — វេទិកាសាធារណៈ",
      shortDescription: "គេហទំព័រព័ត៌មាន និងចូលរួម ដែលមានប្រភពយោង ការស្ទង់មតិមានការសម្របសម្រួល និងការរៀបចំញត្តិ។",
      description: "README ពិពណ៌នាអំពីរឿងរ៉ាវគ្រួសារដែលបានអនាមិក ធនធានមានប្រភពយោង ការស្ទង់មតិសាធារណៈដែលមានការសម្របសម្រួល ស្ថិតិសរុប និងលំហូររៀបចំញត្តិ។ គម្រោងប្រើ Next.js, React, PostgreSQL និង Prisma។ សេចក្តីសង្ខេបនេះមិនបង្ហាញព័ត៌មានផ្ទាល់ខ្លួន ឬព័ត៌មានរសើបពីខ្លឹមសារដើមទេ។",
      problem: "បង្ហាញព័ត៌មានដែលមានប្រភពយោង និងផ្តល់វិធីចូលរួមដែលមានរចនាសម្ព័ន្ធដល់អ្នកចូលមើល។",
      solution: "គេហទំព័រសាធារណៈរួមបញ្ចូលធនធាននិពន្ធ ការចូលរួមក្នុងការស្ទង់មតិ ស្ថិតិដែលមានការសម្របសម្រួល និងការរៀបចំញត្តិ។",
    },
    "cv-international-manfred": {
      title: "បណ្ណសារ CV អន្តរជាតិ",
      shortDescription: "បណ្ណសារ CV សម្រាប់មុខតំណែងផ្សេងៗ ជាឯកសារ និងទំព័រ HTML ឋិតិវន្ត។",
      description: "ឃ្លាំងនេះប្រមូល CV អន្តរជាតិ និង CV ផ្តោតលើមុខតំណែងជាក់លាក់ ជាទម្រង់ HTML និង PDF។ វាត្រូវបានបង្ហាញជាបណ្ណសារឯកសារវិជ្ជាជីវៈ មិនមែនជាកម្មវិធីគេហទំព័រទេ; មិនបញ្ជាក់ថាបានដាក់ឱ្យប្រើ ឬថាឯកសារទាំងនេះទាន់សម័យទេ។",
      problem: "រៀបចំកំណែ និងទម្រង់ CV ច្រើនក្នុងឃ្លាំងសាធារណៈមួយ។",
      solution: "ទំព័រ HTML ឋិតិវន្ត និងឯកសារ PDF ផ្តល់ទម្រង់ផ្សេងៗតាមបរិបទការងារ។",
    },
    "mmcgodrivers-website": {
      title: "MMC Go Drivers — គេហទំព័រសាធារណៈ",
      shortDescription: "គេហទំព័រព័ត៌មានដែលភ្ជាប់ជាមួយសេវាទូរស័ព្ទ MMC Go Drivers។",
      description: "គេហទំព័រសាធារណៈបង្ហាញមុខងារ តម្លៃ មតិយោបល់ និងព័ត៌មានអំពីសេវា MMC Go Drivers។ កូដ Next.js មានខ្លឹមសារពាក់ព័ន្ធនឹង Supabase និង dependency Resend; ឃ្លាំងកូដគេហទំព័រនេះដាច់ដោយឡែកពីកម្មវិធីទូរស័ព្ទ Flutter។",
      problem: "បង្ហាញសេវាទូរស័ព្ទ និងជម្រើសសេវារបស់វាតាមគេហទំព័រ។",
      solution: "គេហទំព័រដាច់ដោយឡែកប្រមូលព័ត៌មានផលិតផល និងទំព័រសាធារណៈ ក្នុងឃ្លាំងកូដផ្សេងពីកម្មវិធីទូរស័ព្ទ។",
    },
    tuktukgo: {
      title: "Angkor Move (TukTukGo) — គំរូដើមសេវាចល័ត",
      shortDescription: "គំរូដើមកម្មវិធីទូរស័ព្ទសម្រាប់អ្នកបើកបរ អ្នកដំណើរ សណ្ឋាគារ និងអាជីវកម្មដឹកជញ្ជូន។",
      description: "README ពិពណ៌នាអំពីគំរូដើម Expo/React Native ដែលមានចំណុចចាប់ផ្តើម និងមូលដ្ឋានផ្ទាំងគ្រប់គ្រងតាមតួនាទី។ ការកក់ និងប្រតិបត្តិការត្រូវបានបង្ហាញជាទិសដៅផលិតផលនាពេលអនាគត; ផលប័ត្រនេះមិនអះអាងថាមានសេវាកក់ដែលកំពុងប្រើប្រាស់ជាក់ស្តែងទេ។",
      problem: "ស្វែងយល់ពីមូលដ្ឋានកម្មវិធីទូរស័ព្ទសម្រាប់សម្របសម្រួលតួនាទី និងសេវាចល័តក្នុងតំបន់។",
      solution: "គំរូដើមរៀបចំចំណុចចូល និងមូលដ្ឋានផ្ទាំងគ្រប់គ្រងតាមតួនាទី; README ដាក់លំហូរកក់សំខាន់ៗនៅក្នុងផែនការអភិវឌ្ឍបន្ទាប់។",
    },
    "test-vs-2": {
      title: "TechBoutik — គំរូហាងអេឡិចត្រូនិក (Fork)",
      shortDescription: "Fork ដែលត្រូវបានសម្គាល់ច្បាស់ថាជាកម្មវិធីគំរូហាងអេឡិចត្រូនិក។",
      description: "ឃ្លាំងនេះជា fork ពី michaelbaze1987-cloud/test-vs-2។ README ពិពណ៌នាអំពីហាងសាកល្បងដែលមានកាតាឡុកផលិតផល កន្ត្រក ទិដ្ឋភាពការបញ្ជាទិញ និងការទូទាត់សាកល្បង; ទិន្នន័យគំរូស្ថិតក្នុង memory ឬឯកសារក្នុងមូលដ្ឋាន ហើយមិនបានបើកការទូទាត់ពិតទេ។ វាមិនត្រូវបានបង្ហាញថាជាប្រព័ន្ធពាណិជ្ជកម្មដើមដែលកំពុងប្រើប្រាស់ជាក់ស្តែងទេ។",
      problem: "សាកល្បងលំហូរហាង និងការគ្រប់គ្រងក្នុងកម្មវិធីគំរូ e-commerce។",
      solution: "Fork នេះមានកាតាឡុក កន្ត្រក ការទូទាត់សាកល្បង និងទិដ្ឋភាពគ្រប់គ្រង សម្រាប់ការសាកល្បងប៉ុណ្ណោះ។",
    },
    testapprn: {
      title: "ឧបករណ៍ផ្លូវ និងកាលវិភាគ — កម្មវិធីសាកល្បង",
      shortDescription: "កម្មវិធីសាកល្បងសម្រាប់អ្នកបើកបរ ដែលមានទិដ្ឋភាពរៀបចំផ្លូវ និងកាលវិភាគ។",
      description: "កូដ Expo មានទិដ្ឋភាព GPS សម្រាប់ផ្លូវ ជាមួយឧបករណ៍ជំនួយ KML/GPX និងផ្នែកកាលវិភាគដែលទាញយកព័ត៌មានពីឯកសារ PDF។ ឃ្លាំងនេះគ្មាន README ដូច្នេះវាត្រូវបានសម្គាល់ច្បាស់ថាជាកម្មវិធីសាកល្បង ដោយមិនអះអាងពីការប្រើប្រាស់ production ឬ backend ទេ។",
      problem: "សាកល្បងលំហូររុករកផ្លូវ និងកាលវិភាគក្នុងកម្មវិធីទូរស័ព្ទ។",
      solution: "កូដមានទិដ្ឋភាពដាច់ដោយឡែកសម្រាប់រៀបចំផ្លូវ និងគ្រប់គ្រងកាលវិភាគពី PDF។",
    },
    "flutter-first-app": {
      title: "កម្មវិធី Flutter ដំបូង — គំរូតាមមេរៀន",
      shortDescription: "គម្រោងចាប់ផ្តើម Flutter លំនាំដើម ដែលរក្សាទុកជាលំហាត់សិក្សា។",
      description: "README កំណត់ឃ្លាំងនេះថាជាគម្រោង Flutter ថ្មី និងភ្ជាប់ទៅមេរៀនផ្លូវការសម្រាប់បង្កើតកម្មវិធីដំបូង។ pubspec មាន Flutter និង dependency ស្តង់ដារ Cupertino Icons; នេះជាគំរូសម្រាប់រៀន មិនមែនជាផលិតផលដែលបានផ្សព្វផ្សាយទេ។",
      problem: null,
      solution: null,
    },
    "frontend2-simplon-best": {
      title: "Cars Simplon — កម្មវិធីទូរស័ព្ទសម្រាប់មើលបេសកកម្ម",
      shortDescription: "កម្មវិធីទូរស័ព្ទសម្រាប់មើលបេសកកម្ម យានយន្ត និងសកម្មភាពក្រុម។",
      description: "README ពិពណ៌នាអំពីកម្មវិធីបេសកកម្មអ្នកបើកបរឡានក្រុង ហើយកូដ Expo ដែលបានពិនិត្យស្នើទិន្នន័យបេសកកម្ម យានយន្ត និងអ្នកបើកបរពីសេវា API សម្រាប់ផ្ទាំងគ្រប់គ្រង។ គម្រោងនេះត្រូវបានចាត់ទុកជាគំរូដើមទូរស័ព្ទ; README និង manifest បញ្ជាក់កំណែ Expo ខុសគ្នាបន្តិច។",
      problem: "ផ្តល់ទិដ្ឋភាពទូរស័ព្ទអំពីបេសកកម្ម និងកងយានយន្តដល់អ្នកបើកបរ និងអ្នកគ្រប់គ្រង។",
      solution: "កម្មវិធីចំណុចប្រទាក់តាមតួនាទីរៀបចំទិដ្ឋភាពផ្ទាំងគ្រប់គ្រង បេសកកម្ម យានយន្ត និងអ្នកបើកបរ។",
    },
    "backend-for-frontend2-simplon-best": {
      title: "Simplon Drivers — គំរូដើម Backend API",
      shortDescription: "គំរូដើម API សម្រាប់ការផ្ទៀងផ្ទាត់ និងគ្រប់គ្រងអ្នកបើកបរ យានយន្ត អតិថិជន និងបេសកកម្ម។",
      description: "manifest កញ្ចប់ពិពណ៌នា backend Node.js/Express សម្រាប់គ្រប់គ្រងអ្នកបើកបរ ហើយកូដមាន route សម្រាប់ការផ្ទៀងផ្ទាត់ អ្នកប្រើប្រាស់ យានយន្ត អតិថិជន និងបេសកកម្ម ដោយប្រើ Mongoose។ នៅក្នុងកំណែសាធារណៈដែលបានពិនិត្យ មិនមាន README ទេ; ការពិពណ៌នានេះផ្អែកលើ manifest និងកូដ ហើយមិនអះអាងពីការដាក់ឱ្យប្រើទេ។",
      problem: "ផ្តល់ endpoint ដល់កម្មវិធីទូរស័ព្ទសម្រាប់អ្នកបើកបរ យានយន្ត អតិថិជន និងបេសកកម្ម។",
      solution: "ម៉ាស៊ីនមេ Express ប្រមូល route ផ្ទៀងផ្ទាត់ និងគ្រប់គ្រង ជាមួយម៉ូដែល MongoDB/Mongoose។",
    },
    "simplon-drivers-app": {
      title: "Cars Simplon Drivers — គំរូដើម SQLite ក្នុងមូលដ្ឋាន",
      shortDescription: "គំរូដើមផ្ទាំងគ្រប់គ្រងទូរស័ព្ទសម្រាប់បេសកកម្ម យានយន្ត និងប្រវត្តិរបស់អ្នកបើកបរ។",
      description: "README ពិពណ៌នាកម្មវិធីបេសកកម្មចល័តសម្រាប់អ្នកបើកបរ និងអ្នកគ្រប់គ្រង។ Hook ផ្ទៀងផ្ទាត់អត្តសញ្ញាណ និងផ្ទាំងគ្រប់គ្រងដែលបានពិនិត្យ ប្រើ SQLite ក្នុងមូលដ្ឋាននាពេលបច្ចុប្បន្ន; ទោះ README និយាយពី Supabase ក៏ដោយ ក៏មិនអះអាងថាមានការផ្ទៀងផ្ទាត់ ឬរក្សាទុកទិន្នន័យ Supabase ពីចម្ងាយដែលបានភ្ជាប់ទេ។",
      problem: "ស្វែងយល់ពីការចូលប្រើបេសកកម្មដែលបានចាត់តាំងតាមទូរស័ព្ទ និងលំហូរការងារគ្រប់គ្រងកងយានយន្តសម្រាប់អ្នកបើកបរ។",
      solution: "កម្មវិធី Expo រៀបចំទិដ្ឋភាពផ្ទាំងគ្រប់គ្រង បេសកកម្ម យានយន្ត និងប្រវត្តិ ជុំវិញគំរូដើមក្នុងមូលដ្ឋាន។",
    },
  },
  zh: {
    "mmc-go-drivers": {
      title: "MMC Go Drivers",
      shortDescription: "用于导航、行程规划和车队管理的移动应用。",
      description: "MMC Go Drivers 集成了适配车辆的导航、行程与日程管理，以及车队管理工具。介绍依据该仓库的公开 README。",
      problem: "驾驶员和小型运输企业需要在同一处使用导航、排程和文档工具。",
      solution: "应用提供面向公交车、出租车和货车驾驶员的功能，以及供企业使用的管理工具。",
    },
    "la-voix-des-enfants-places": {
      title: "La Voix des Enfants Placés — Vienne",
      shortDescription: "为儿童保护协会重新梳理并适配移动端的内容型网站。",
      description: "仓库介绍了一个公开网站，包含信息页面和由 Prisma、PostgreSQL 管理的新闻内容，也有用于管理文章的私有区域。协会须在发布前核实内容和联系方式。",
      problem: "让协会信息更易获取，并让团队无需修改代码即可发布新闻。",
      solution: "响应式内容管理界面连接数据库，提供私有文章管理和联系表单。",
    },
    saiway: {
      title: "Saiway — 暹粒机场接送",
      shortDescription: "从暹粒国际机场出发的私人接送预订与管理平台。",
      description: "Saiway 是一项机场接送服务，围绕预订流程构建客户、驾驶员和管理员使用的运营工具。README 介绍了基于角色的预订及行程管理，并使用 PostgreSQL。",
      problem: "协调客户、驾驶员和管理员之间的机场接送与日常运营。",
      solution: "平台整合预订流程、行程分配和各角色所需的工具。",
    },
    khmera: {
      title: "KHMERA — 暹粒安居与旅行信息",
      shortDescription: "为计划在暹粒生活、创业或旅行的人提供个性化指引。",
      description: "KHMERA 提供本地信息和按需报价的服务，帮助准备搬迁、商业计划或暹粒探索之旅。公开网站提供英语、法语、西班牙语和德语版本。",
      problem: "计划搬迁、开展业务或游览暹粒的人需要清晰的本地信息。",
      solution: "多语言信息网站介绍服务并帮助准备咨询；服务介绍仅供参考，网站未启用在线预订或付款。",
    },
    "voix-et-enfance": {
      title: "Voix & Enfance — 公民倡议",
      shortDescription: "介绍一项倡议、相关提案及参与支持方式的信息网站。",
      description: "公开的 Next.js 应用介绍一项倡议，并链接至提案及签名流程。本说明依据页面结构和项目清单；转载前应核实文案及发布细节。",
      problem: "让公众能够在线了解提案并找到支持倡议的方式。",
      solution: "公开网站提供信息并引导至提案和签名页面，不暗示任何机构背书。",
    },
    "cv-builder-app": {
      title: "CV Studio — 简历制作工具",
      shortDescription: "可实时预览、调整版式并在浏览器中导出 PDF 的简历编辑器。",
      description: "CV Studio 是一款 Next.js 简历工具，可编辑个人简介、工作经历、教育、项目和技能。README 介绍实时预览与 A4 打印；Prisma 配合 SQLite 可用于本地草稿。这里不声称具备生产环境存储或多用户访问。",
      problem: "制作和修改简历时，无需手动排版每个部分。",
      solution: "表单和预览提供两种版式、样式选项，以及 A4 打印或浏览器 PDF 导出。",
    },
    "association-declaration": {
      title: "活动申报准备工具",
      shortDescription: "在浏览器中准备并导出活动申报文件的工具。",
      description: "这款独立 Web 工具引导用户准备活动申报，生成预览，并支持导出 TXT/JSON 或打印为 PDF。草稿保存在浏览器中，不会提交给市政府或省级行政部门。",
      problem: "整理准备公共活动申报所需的信息。",
      solution: "分步表单、本地草稿和多种导出格式帮助准备文件，供用户自行核查并提交。",
    },
    "gestion-planning": {
      title: "Maison douce — 每日安排原型",
      shortDescription: "以移动端为先的仪表盘，用于查看家庭日常、工时和待办事项。",
      description: "README 介绍了一个早期响应式仪表盘，用于查看照护日程、月度工时和计划任务。数据明确标为本地示例；持久化业务流程计划在后续实现。",
      problem: "在一个视图中汇总每日安排、工时和待办任务。",
      solution: "移动端优先的仪表盘使用演示数据展示每日和每月信息。",
    },
    "nos-liens-nos-enfants-contre-l-ase": {
      title: "Nos liens, nos enfants — 公民参与平台",
      shortDescription: "提供来源资料、经审核的调查及请愿准备流程的信息与参与网站。",
      description: "README 介绍匿名化的家庭叙述、带来源的资料、经审核的公开调查、汇总统计和请愿准备流程。项目使用 Next.js、React、PostgreSQL 和 Prisma。本摘要不复述源内容中的个人或敏感细节。",
      problem: "呈现有来源依据的信息，并为访客提供有组织的参与方式。",
      solution: "公开网站整合编辑资料、调查参与、经审核的统计信息和请愿准备流程。",
    },
    "cv-international-manfred": {
      title: "国际简历合集",
      shortDescription: "面向不同岗位的简历合集，包含文档和静态 HTML 页面。",
      description: "该仓库收录国际化及针对不同岗位的 HTML、PDF 简历。它是职业文档合集，而非 Web 应用；不暗示已部署，也不保证文档仍是最新版本。",
      problem: "在公开仓库中整理多个版本和格式的简历。",
      solution: "静态 HTML 页面和 PDF 文档为不同职业场景提供多种格式。",
    },
    "mmcgodrivers-website": {
      title: "MMC Go Drivers — 官方信息网站",
      shortDescription: "与 MMC Go Drivers 移动服务配套的信息网站。",
      description: "公开网站介绍 MMC Go Drivers 的功能、价格、评价和服务信息。Next.js 代码包含与 Supabase 相关的内容并依赖 Resend；此 Web 仓库与 Flutter 移动应用分开。",
      problem: "通过网站介绍移动服务及其方案。",
      solution: "独立网站在与移动应用不同的仓库中汇集产品信息和公开页面。",
    },
    tuktukgo: {
      title: "Angkor Move (TukTukGo) — 出行原型",
      shortDescription: "面向驾驶员、乘客、酒店和运输企业的移动出行原型。",
      description: "README 介绍了一个 Expo/React Native 原型，包含按角色区分的入口和基础仪表盘。预订及运营流程属于产品设想；本作品集不声称已有正式运行的预订服务。",
      problem: "探索用于协调本地出行角色和服务的移动端基础方案。",
      solution: "原型按角色组织入口和基础仪表盘；README 将核心预订流程列为后续计划。",
    },
    "test-vs-2": {
      title: "TechBoutik — 电商演示（Fork）",
      shortDescription: "明确标注为电商演示应用 Fork 的项目。",
      description: "此仓库是 michaelbaze1987-cloud/test-vs-2 的 Fork。README 介绍了包含商品目录、购物车、订单页面和模拟结账的演示商店；演示数据存放于内存或本地文件，未启用真实支付。它并非原创的生产级电商系统。",
      problem: "在电商演示应用中探索购物和管理流程。",
      solution: "该 Fork 提供商品目录、购物车、模拟结账及管理页面供实验使用。",
    },
    testapprn: {
      title: "路线与排程工具 — 测试应用",
      shortDescription: "面向驾驶员的实验性应用，包含路线规划和排程页面。",
      description: "Expo 源码包含带 KML/GPX 工具的 GPS 路线页面，以及从 PDF 提取信息的排程组件。仓库没有 README，因此明确标注为测试应用，不声称已投入生产或具备后端。",
      problem: "在移动应用中试验路线与排程流程。",
      solution: "源码包含用于路线规划和基于 PDF 处理排程的独立页面。",
    },
    "flutter-first-app": {
      title: "Flutter 第一个应用 — 教程模板",
      shortDescription: "保留为学习练习的 Flutter 默认入门项目。",
      description: "README 将仓库称为新的 Flutter 项目，并链接到官方入门教程。pubspec 包含 Flutter 和标准依赖 Cupertino Icons；这是学习模板，并非已发布产品。",
      problem: null,
      solution: null,
    },
    "frontend2-simplon-best": {
      title: "Cars Simplon — 任务移动端客户端",
      shortDescription: "供团队查看任务、车辆和活动情况的移动端客户端。",
      description: "README 介绍了公交驾驶员任务应用；经查看的 Expo 源码通过 API 服务请求任务、车辆和驾驶员数据以显示仪表盘。该项目按移动端原型处理；README 与项目清单中的 Expo 版本略有差异。",
      problem: "让驾驶员和管理员能够在移动端查看任务和车队信息。",
      solution: "基于角色的移动端客户端组织仪表盘、任务、车辆和驾驶员页面。",
    },
    "backend-for-frontend2-simplon-best": {
      title: "Simplon Drivers — 后端 API 原型",
      shortDescription: "用于身份验证以及驾驶员、车辆、客户和任务管理的 API 原型。",
      description: "项目清单将其描述为用于驾驶员管理的 Node.js/Express 后端；源码包含使用 Mongoose 的身份验证、用户、车辆、客户和任务路由。在查看的公开版本中没有 README；本说明依据项目清单和源码，不对部署情况作任何声明。",
      problem: "为移动客户端提供驾驶员、车辆、客户和任务相关接口。",
      solution: "Express 服务器整合身份验证和管理路由，并使用 MongoDB/Mongoose 模型。",
    },
    "simplon-drivers-app": {
      title: "Cars Simplon Drivers — 本地 SQLite 原型",
      shortDescription: "用于查看驾驶员任务、车辆及历史记录的移动仪表盘原型。",
      description: "README 介绍了供驾驶员和管理员使用的任务应用。经查看的身份验证 hooks 和仪表盘目前使用本地 SQLite；虽然 README 提到 Supabase，本作品集不声称已连接远程 Supabase 身份验证或存储。",
      problem: "探索在移动端查看已分配任务及驾驶员车队工作流程。",
      solution: "Expo 应用围绕本地原型组织仪表盘、任务、车辆和历史记录页面。",
    },
  },
  ja: {
    "mmc-go-drivers": {
      title: "MMC Go Drivers",
      shortDescription: "ナビゲーション、運行計画、車両管理を扱うモバイルアプリです。",
      description: "MMC Go Driversは、車両に合わせたナビゲーション、運行・スケジュール管理、車両管理機能をまとめています。説明は公開リポジトリのREADMEに基づいています。",
      problem: "運転手や小規模な運送事業者には、ナビゲーション、計画、書類を一か所で扱う手段が必要です。",
      solution: "バス、タクシー、トラックの運転手向け機能と、事業者向けの管理ツールを提供する構成です。",
    },
    "la-voix-des-enfants-places": {
      title: "La Voix des Enfants Placés — Vienne",
      shortDescription: "児童保護に取り組む団体向けに、情報を整理したレスポンシブサイトです。",
      description: "リポジトリでは、PrismaとPostgreSQLで情報ページやニュースを管理する公開サイトが説明されています。記事を管理する非公開エリアも含まれます。掲載前に団体が内容と連絡先を確認する必要があります。",
      problem: "団体の情報を分かりやすく公開し、コードを変更せずにスタッフがニュースを掲載できるようにすること。",
      solution: "データベースに接続したレスポンシブな編集画面に、非公開の記事管理と問い合わせフォームを備えています。",
    },
    saiway: {
      title: "Saiway — シェムリアップ空港送迎",
      shortDescription: "シェムリアップ国際空港発の専用送迎を予約・管理するプラットフォームです。",
      description: "Saiwayは、予約フローと、利用者・運転手・管理者向けの運用ツールを備える空港送迎サービスです。READMEでは、PostgreSQLを使った役割別の予約・運行管理が説明されています。",
      problem: "利用者、運転手、管理者の間で空港送迎と日々の運用を調整すること。",
      solution: "予約、運行の割り当て、各役割に合わせたツールを一つのプラットフォームにまとめます。",
    },
    khmera: {
      title: "KHMERA — シェムリアップでの生活と旅行",
      shortDescription: "シェムリアップへの移住を考える方、起業家、旅行者向けの個別案内です。",
      description: "KHMERAは、シェムリアップへの移住、事業計画、地域を知る旅行の準備に役立つ地域情報と個別見積もりのサービスを紹介しています。公開サイトは英語、フランス語、スペイン語、ドイツ語に対応しています。",
      problem: "移住、事業の立ち上げ、地域の探索を考える人には、分かりやすい現地情報が必要です。",
      solution: "多言語の情報サイトでサービスを紹介し、相談の準備を支援します。掲載内容は情報提供を目的とし、オンライン予約と支払いは稼働していません。",
    },
    "voix-et-enfance": {
      title: "Voix & Enfance — 市民イニシアチブ",
      shortDescription: "提案内容とイニシアチブへの参加方法を紹介する情報サイトです。",
      description: "公開されているNext.jsアプリは、イニシアチブと提案を紹介し、署名の流れへ案内します。この説明はページ構成とマニフェストに基づいています。再利用の前に文面と公開条件を確認してください。",
      problem: "提案とイニシアチブへの参加方法をオンラインで分かりやすくすること。",
      solution: "公開サイトで情報を伝え、提案と署名のページへ案内します。公的機関の支持を示唆するものではありません。",
    },
    "cv-builder-app": {
      title: "CV Studio — 履歴書作成ツール",
      shortDescription: "ライブプレビュー、レイアウト調整、ブラウザーからのPDF出力に対応する履歴書エディターです。",
      description: "CV Studioは、プロフィール、職歴、学歴、プロジェクト、スキルを編集できるNext.js製の履歴書ツールです。READMEではライブプレビューとA4印刷が説明されています。PrismaとSQLiteはローカルの下書きに利用できます。本番環境での保存機能や複数ユーザー対応をうたうものではありません。",
      problem: "各項目を手作業でレイアウトせずに履歴書を作成・更新すること。",
      solution: "フォームとプレビューで2種類のレイアウトやスタイルを選べ、A4印刷またはブラウザーからのPDF出力ができます。",
    },
    "association-declaration": {
      title: "イベント申告の準備ツール",
      shortDescription: "ブラウザーでイベント申告書類を準備し、書き出すためのツールです。",
      description: "この独立したWebツールは、イベント申告の準備を案内し、プレビューを作成します。TXT/JSONへの書き出しやPDF印刷も可能です。下書きはブラウザー内に保存され、市役所や県当局に書類が送信されることはありません。",
      problem: "イベント申告の準備に必要な情報を整理すること。",
      solution: "ガイド付きフォーム、ローカルの下書き、複数の書き出し形式で、確認と手動提出に向けた準備を支援します。",
    },
    "gestion-planning": {
      title: "Maison douce — 日々の予定管理プロトタイプ",
      shortDescription: "家族の日課、勤務時間、今後のタスクを表示するモバイル優先のダッシュボードです。",
      description: "READMEでは、保育日の予定、月間時間、今後のタスクを確認する初期のレスポンシブダッシュボードとして説明されています。データはローカルのサンプルと明記され、永続的な業務フローは今後の課題とされています。",
      problem: "毎日の習慣、勤務時間、予定タスクを一つの画面にまとめること。",
      solution: "モバイル優先のダッシュボードで、デモデータを使って日次・月次の情報を表示します。",
    },
    "nos-liens-nos-enfants-contre-l-ase": {
      title: "Nos liens, nos enfants — 市民参加プラットフォーム",
      shortDescription: "出典付きの資料、モデレーション付き調査、請願準備を備えた情報・参加サイトです。",
      description: "READMEでは、匿名化された家族の記録、出典付き資料、モデレーション付きの公開調査、集計統計、請願準備の流れが説明されています。Next.js、React、PostgreSQL、Prismaを使用しています。この紹介では、元資料の個人情報や機微な内容を繰り返しません。",
      problem: "出典に基づく情報を示し、訪問者に整理された参加方法を提供すること。",
      solution: "公開サイトで編集資料、調査への参加、モデレーション済み統計、請願の準備をまとめます。",
    },
    "cv-international-manfred": {
      title: "国際向け履歴書コレクション",
      shortDescription: "職種に合わせた履歴書を、文書と静的HTMLページでまとめています。",
      description: "このリポジトリには、国際向けおよび職種別の履歴書がHTMLとPDFで収録されています。Webアプリではなく職業関連文書のコレクションとして紹介しており、公開状況や文書の最新性を示すものではありません。",
      problem: "複数の履歴書バージョンと形式を公開リポジトリで整理すること。",
      solution: "静的HTMLページとPDF文書で、職業上の状況に応じた形式を用意します。",
    },
    "mmcgodrivers-website": {
      title: "MMC Go Drivers — 公開情報サイト",
      shortDescription: "モバイルサービスMMC Go Driversに関連する情報サイトです。",
      description: "公開サイトではMMC Go Driversの機能、料金、レビュー、サービス情報を紹介しています。Next.jsコードにはSupabase関連のコンテンツとResend依存関係があります。このWebリポジトリはFlutterモバイルアプリとは別です。",
      problem: "モバイルサービスと提供内容をWeb上で紹介すること。",
      solution: "モバイルアプリとは別のリポジトリに、製品情報と公開ページをまとめています。",
    },
    tuktukgo: {
      title: "Angkor Move (TukTukGo) — モビリティプロトタイプ",
      shortDescription: "運転手、乗客、ホテル、運送事業者を想定したモバイルモビリティのプロトタイプです。",
      description: "READMEでは、役割別の導入画面と基本的なダッシュボードを備えたExpo/React Nativeプロトタイプとして説明されています。予約や運用は今後の製品構想であり、稼働中の予約サービスがあるとは紹介していません。",
      problem: "地域の移動サービスと関係者を調整するモバイル基盤を検討すること。",
      solution: "プロトタイプでは役割ごとの入口と基本ダッシュボードを整理しています。READMEでは主要な予約フローを今後の計画としています。",
    },
    "test-vs-2": {
      title: "TechBoutik — ECデモ（Fork）",
      shortDescription: "ECデモアプリから派生したForkであることを明記しています。",
      description: "このリポジトリはmichaelbaze1987-cloud/test-vs-2のForkです。READMEでは、商品一覧、カート、注文画面、模擬決済を備えるデモショップとして説明されています。デモデータはメモリまたはローカルファイルに保存され、実際の決済は有効化されていません。オリジナルの本番向けECシステムとして紹介するものではありません。",
      problem: "ECデモアプリで店舗と管理のフローを試すこと。",
      solution: "Forkには、実験用の商品一覧、カート、模擬決済、管理画面が含まれます。",
    },
    testapprn: {
      title: "ルート・予定管理ツール — テストアプリ",
      shortDescription: "ルート計画と予定管理の画面を備えた、運転手向けの実験的アプリです。",
      description: "Expoのソースには、KML/GPXユーティリティを使うGPSルート画面と、PDFから情報を抽出する予定管理コンポーネントがあります。READMEはありません。そのためテストアプリとして明記し、本番運用やバックエンドがあるとはしていません。",
      problem: "モバイルアプリでルートや予定管理の流れを試すこと。",
      solution: "ソースにはルート計画とPDFを使った予定処理の画面が分けて用意されています。",
    },
    "flutter-first-app": {
      title: "Flutter初めてのアプリ — チュートリアル用テンプレート",
      shortDescription: "学習用に保管しているFlutter標準のスタータープロジェクトです。",
      description: "READMEでは新しいFlutterプロジェクトとして紹介され、公式の初めてのアプリのチュートリアルに案内しています。pubspecにはFlutterと標準依存関係のCupertino Iconsが含まれます。公開済み製品ではなく、学習用テンプレートです。",
      problem: null,
      solution: null,
    },
    "frontend2-simplon-best": {
      title: "Cars Simplon — ミッション確認用モバイルアプリ",
      shortDescription: "ミッション、車両、チームの活動を確認するモバイルクライアントです。",
      description: "READMEではバス運転手向けのミッションアプリとして説明されています。確認したExpoコードはAPIサービスからミッション、車両、運転手のデータを取得してダッシュボードに表示します。モバイルプロトタイプとして扱っており、READMEとマニフェストのExpoバージョン表記にはわずかな差があります。",
      problem: "運転手と管理者がモバイルでミッションや車両の状況を確認できるようにすること。",
      solution: "役割に応じたクライアントで、ダッシュボード、ミッション、車両、運転手の画面を整理します。",
    },
    "backend-for-frontend2-simplon-best": {
      title: "Simplon Drivers — バックエンドAPIプロトタイプ",
      shortDescription: "認証と運転手、車両、顧客、ミッション管理のためのAPIプロトタイプです。",
      description: "パッケージマニフェストでは運転手管理用のNode.js/Expressバックエンドとされています。ソースにはMongooseを使った認証、ユーザー、車両、顧客、ミッションのルートがあります。確認した公開版にはREADMEがなく、説明はマニフェストとソースに基づいており、デプロイ状況を示すものではありません。",
      problem: "モバイルクライアントに運転手、車両、顧客、ミッション用のエンドポイントを提供すること。",
      solution: "Expressサーバーに認証・管理ルートとMongoDB/Mongooseモデルをまとめています。",
    },
    "simplon-drivers-app": {
      title: "Cars Simplon Drivers — ローカルSQLiteプロトタイプ",
      shortDescription: "運転手のミッション、車両、履歴を扱うモバイルダッシュボードのプロトタイプです。",
      description: "READMEでは運転手と管理者向けのミッションアプリとして説明されています。確認した認証hooksとダッシュボードは現在ローカルSQLiteを使用しています。READMEにはSupabaseへの言及がありますが、リモートのSupabase認証や保存機能が接続されているとはしていません。",
      problem: "割り当てられたミッションや運転手向けの車両管理フローをモバイルで検討すること。",
      solution: "ローカルプロトタイプを中心に、Expoアプリでダッシュボード、ミッション、車両、履歴の画面を整理します。",
    },
  },
};

export function localizeProject(
  project: PortfolioProject,
  locale: SiteLocale,
): PortfolioProject {
  const copy = locale === "en" ? undefined : projectCopies[locale][project.slug];
  if (locale !== "en" && !copy) {
    throw new Error(`Missing ${locale} translation for project "${project.slug}".`);
  }
  return {
    ...project,
    ...(copy ?? {}),
    category: {
      ...project.category,
      name: getCategoryName(locale, project.category.slug, project.category.name),
    },
  };
}
