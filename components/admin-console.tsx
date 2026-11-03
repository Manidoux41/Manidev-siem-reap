"use client";

import { FormEvent, useState } from "react";

type ProjectStatus = "IN_DEVELOPMENT" | "TEST" | "PRODUCTION" | "UNKNOWN";

export type AdminProject = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  problem: string | null;
  solution: string | null;
  status: ProjectStatus;
  category: string;
  technologies: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  appUrl: string | null;
  coverImage: string | null;
  featured: boolean;
  published: boolean;
  sortOrder: number;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "NEW" | "READ" | "REPLIED" | "ARCHIVED";
  createdAt: string;
};

type FormValues = Omit<AdminProject, "id">;
export type SiteSettings = {
  "site.title": string;
  "site.description": string;
  "site.locale": string;
  "site.github": string;
  "site.telegram": string;
};
export type AdminConsoleInitialData = {
  projects: AdminProject[];
  messages: ContactMessage[];
  settings: Partial<SiteSettings>;
};

const emptyForm: FormValues = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  problem: "",
  solution: "",
  status: "UNKNOWN",
  category: "Website",
  technologies: [],
  githubUrl: "",
  liveUrl: "",
  appUrl: "",
  coverImage: "",
  featured: false,
  published: false,
  sortOrder: 0,
};

async function readResponse<T>(response: Response): Promise<T> {
  const body = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(body.error ?? "Une erreur est survenue.");
  return body;
}

export function AdminLogin() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setError(false);
    const form = new FormData(event.currentTarget);

    try {
      await readResponse(
        await fetch("/api/v1/admin/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.get("email"),
            password: form.get("password"),
          }),
        }),
      );
      window.location.reload();
    } catch (reason) {
      setError(true);
      setMessage(
        reason instanceof Error ? reason.message : "Connexion impossible.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="admin-card admin-login">
      <p className="eyebrow">Accès sécurisé</p>
      <h2>Connexion</h2>
      <p className="admin-note">
        Utilisez le compte créé avec <code>npm run admin:create</code>.
      </p>
      <noscript>
        <p className="admin-message is-error">
          Activez JavaScript pour vous connecter à l’administration.
        </p>
      </noscript>
      <form
        className="admin-form"
        method="post"
        action="/api/v1/admin/auth/login"
        onSubmit={submit}
      >
        <label>
          E-mail
          <input name="email" type="email" autoComplete="username" required />
        </label>
        <label>
          Mot de passe
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </label>
        <button className="button button-dark" type="submit" disabled={busy}>
          {busy ? "Connexion…" : "Se connecter"}
        </button>
      </form>
      <p className={`admin-message${error ? " is-error" : ""}`} role="status">
        {message}
      </p>
    </section>
  );
}

export function AdminConsole({
  initialData,
}: {
  initialData: AdminConsoleInitialData;
}) {
  const [projects, setProjects] = useState<AdminProject[]>(initialData.projects);
  const [messages, setMessages] = useState<ContactMessage[]>(initialData.messages);
  const [settings, setSettings] = useState<SiteSettings>({
    "site.title": "",
    "site.description": "",
    "site.locale": "en",
    "site.github": "https://github.com/Manidoux41",
    "site.telegram": "",
    ...initialData.settings,
  });
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function loadContent() {
    const [projectResponse, messageResponse, settingsResponse] = await Promise.all([
      fetch("/api/v1/admin/projects"),
      fetch("/api/v1/admin/messages"),
      fetch("/api/v1/admin/settings"),
    ]);
    const [projectPayload, messagePayload, settingsPayload] = await Promise.all([
      readResponse<{ data: AdminProject[] }>(projectResponse),
      readResponse<{ data: ContactMessage[] }>(messageResponse),
      readResponse<{ data: Partial<SiteSettings> }>(settingsResponse),
    ]);
    setProjects(projectPayload.data);
    setMessages(messagePayload.data);
    setSettings((current) => ({ ...current, ...settingsPayload.data }));
  }

  function updateField<K extends keyof FormValues>(
    key: K,
    value: FormValues[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function editProject(project: AdminProject) {
    const { id, ...values } = project;
    setEditingId(id);
    setForm(values);
    setFeedback("");
    document.getElementById("admin-project-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  async function submitProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setFeedback("");
    setError(false);

    const payload = {
      ...form,
      technologies: form.technologies,
      sortOrder: Number(form.sortOrder),
      problem: form.problem || null,
      solution: form.solution || null,
      githubUrl: form.githubUrl || null,
      liveUrl: form.liveUrl || null,
      appUrl: form.appUrl || null,
      coverImage: form.coverImage || null,
    };

    try {
      const response = await fetch(
        editingId
          ? `/api/v1/admin/projects/${encodeURIComponent(editingId)}`
          : "/api/v1/admin/projects",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      await readResponse(response);
      setFeedback(editingId ? "Projet modifié." : "Projet créé.");
      setEditingId(null);
      setForm(emptyForm);
      await loadContent();
    } catch (reason) {
      setError(true);
      setFeedback(
        reason instanceof Error ? reason.message : "Enregistrement impossible.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function deleteProject(project: AdminProject) {
    if (!window.confirm(`Supprimer « ${project.title} » ?`)) return;
    try {
      await readResponse(
        await fetch(`/api/v1/admin/projects/${encodeURIComponent(project.id)}`, {
          method: "DELETE",
        }),
      );
      setFeedback("Projet supprimé.");
      await loadContent();
    } catch (reason) {
      setError(true);
      setFeedback(
        reason instanceof Error ? reason.message : "Suppression impossible.",
      );
    }
  }

  async function changeMessageStatus(
    id: string,
    status: ContactMessage["status"],
  ) {
    try {
      await readResponse(
        await fetch(`/api/v1/admin/messages/${encodeURIComponent(id)}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }),
      );
      await loadContent();
    } catch (reason) {
      setError(true);
      setFeedback(
        reason instanceof Error ? reason.message : "Mise à jour impossible.",
      );
    }
  }

  async function logout() {
    try {
      await readResponse(
        await fetch("/api/v1/admin/auth/logout", { method: "POST" }),
      );
      window.location.reload();
    } catch (reason) {
      setError(true);
      setFeedback(
        reason instanceof Error ? reason.message : "Déconnexion impossible.",
      );
    }
  }

  async function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");
    setError(false);
    try {
      await readResponse(
        await fetch("/api/v1/admin/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(settings),
        }),
      );
      setFeedback("Paramètres enregistrés.");
    } catch (reason) {
      setError(true);
      setFeedback(
        reason instanceof Error ? reason.message : "Enregistrement impossible.",
      );
    }
  }

  return (
    <>
      <div className="admin-toolbar">
        <p className="eyebrow">Espace éditeur</p>
        <button type="button" onClick={logout}>Se déconnecter</button>
      </div>
      <p className={`admin-message${error ? " is-error" : ""}`} role="status">
        {feedback}
      </p>
      <section className="admin-card" id="admin-project-form">
        <p className="eyebrow">{editingId ? "Modifier" : "Nouveau projet"}</p>
        <p className="admin-note">
          Les textes de projet sont saisis en anglais, langue par défaut du site.
        </p>
        <form className="admin-form" onSubmit={submitProject}>
          <div className="form-row">
            <label>
              Titre
              <input
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                required
                maxLength={120}
              />
            </label>
            <label>
              Slug
              <input
                value={form.slug}
                onChange={(event) => updateField("slug", event.target.value)}
                required
                maxLength={140}
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              />
            </label>
          </div>
          <label>
            Résumé
            <input
              value={form.shortDescription}
              onChange={(event) =>
                updateField("shortDescription", event.target.value)
              }
              required
              minLength={10}
              maxLength={240}
            />
          </label>
          <label>
            Présentation
            <textarea
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              required
              minLength={20}
              maxLength={10000}
            />
          </label>
          <div className="form-row">
            <label>
              Problématique
              <textarea
                value={form.problem ?? ""}
                onChange={(event) => updateField("problem", event.target.value)}
                maxLength={5000}
              />
            </label>
            <label>
              Solution
              <textarea
                value={form.solution ?? ""}
                onChange={(event) => updateField("solution", event.target.value)}
                maxLength={5000}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Catégorie
              <input
                value={form.category}
                onChange={(event) => updateField("category", event.target.value)}
                required
                maxLength={60}
              />
            </label>
            <label>
              Technologies (séparées par des virgules)
              <input
                value={form.technologies.join(", ")}
                onChange={(event) =>
                  updateField(
                    "technologies",
                    event.target.value.split(",").map((item) => item.trim()),
                  )
                }
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Statut
              <select
                value={form.status}
                onChange={(event) =>
                  updateField("status", event.target.value as ProjectStatus)
                }
              >
                <option value="UNKNOWN">À confirmer</option>
                <option value="IN_DEVELOPMENT">En développement</option>
                <option value="TEST">En test</option>
                <option value="PRODUCTION">En production</option>
              </select>
            </label>
            <label>
              Ordre d’affichage
              <input
                type="number"
                min={0}
                max={10000}
                value={form.sortOrder}
                onChange={(event) =>
                  updateField("sortOrder", Number(event.target.value))
                }
              />
            </label>
          </div>
          <label>
            URL GitHub (HTTPS)
            <input
              type="url"
              value={form.githubUrl ?? ""}
              onChange={(event) => updateField("githubUrl", event.target.value)}
            />
          </label>
          <div className="form-row">
            <label>
              Site web (HTTPS)
              <input
                type="url"
                value={form.liveUrl ?? ""}
                onChange={(event) => updateField("liveUrl", event.target.value)}
              />
            </label>
            <label>
              Application (HTTPS)
              <input
                type="url"
                value={form.appUrl ?? ""}
                onChange={(event) => updateField("appUrl", event.target.value)}
              />
            </label>
          </div>
          <label>
            Image de couverture (URL HTTPS)
            <input
              type="url"
              value={form.coverImage ?? ""}
              onChange={(event) => updateField("coverImage", event.target.value)}
            />
          </label>
          <div className="admin-checkboxes">
            <label>
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) => updateField("featured", event.target.checked)}
              />
              Mis en avant
            </label>
            <label>
              <input
                type="checkbox"
                checked={form.published}
                onChange={(event) => updateField("published", event.target.checked)}
              />
              Publié
            </label>
          </div>
          <div className="admin-actions">
            <button type="submit" disabled={busy}>
              {busy ? "Enregistrement…" : editingId ? "Enregistrer" : "Créer le projet"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="admin-card">
        <p className="eyebrow">Projets / {projects.length.toString().padStart(2, "0")}</p>
        <ul className="admin-project-list">
          {projects.map((project) => (
            <li key={project.id}>
              <div>
                <strong>{project.title}</strong>
                <span> · {project.published ? "Publié" : "Brouillon"}</span>
              </div>
              <div className="admin-actions">
                <button type="button" onClick={() => editProject(project)}>Modifier</button>
                <button type="button" onClick={() => deleteProject(project)}>Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="admin-card">
        <p className="eyebrow">Messages de contact / {messages.length.toString().padStart(2, "0")}</p>
        {messages.length === 0 ? (
          <p className="admin-note">Aucun message enregistré.</p>
        ) : (
          <ul className="admin-project-list">
            {messages.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.subject}</strong>
                  <span> — {item.name} · {item.email} · {item.status}</span>
                  <p>{item.message}</p>
                </div>
                <select
                  aria-label={`Statut du message de ${item.name}`}
                  value={item.status}
                  onChange={(event) =>
                    changeMessageStatus(
                      item.id,
                      event.target.value as ContactMessage["status"],
                    )
                  }
                >
                  <option value="NEW">Nouveau</option>
                  <option value="READ">Lu</option>
                  <option value="REPLIED">Répondu</option>
                  <option value="ARCHIVED">Archivé</option>
                </select>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="admin-card">
        <p className="eyebrow">Paramètres du site</p>
        <form className="admin-form" onSubmit={saveSettings}>
          <label>
            Titre du site
            <input
              value={settings["site.title"]}
              maxLength={2000}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  "site.title": event.target.value,
                }))
              }
            />
          </label>
          <label>
            Description publique
            <textarea
              value={settings["site.description"]}
              maxLength={2000}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  "site.description": event.target.value,
                }))
              }
            />
          </label>
          <label>
            Lien GitHub public
            <input
              type="url"
              value={settings["site.github"]}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  "site.github": event.target.value,
                }))
              }
            />
          </label>
          <label>
            Lien Telegram public (https://t.me/...)
            <input
              type="url"
              value={settings["site.telegram"]}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  "site.telegram": event.target.value,
                }))
              }
            />
          </label>
          <button type="submit">Enregistrer les paramètres</button>
        </form>
      </section>
    </>
  );
}
