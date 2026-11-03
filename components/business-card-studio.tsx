"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { createBusinessCardPdf } from "@/lib/business-card";
import { businessCardSchema, type SavedBusinessCard } from "@/lib/business-card-schema";

const initialDetails = {
  name: "Manfred Parbatia",
  title: "Développement Web · Mobile · API & Conseil IT",
  address: "Taphul Village, Svai Dongkom, Siem Reap City",
  whatsapp: "", telegram: "",
  website: "https://manidev-siem-reap.vercel.app",
};
type ImageSlot = "portrait" | "whatsappQr" | "telegramQr";

const messagingIcons = {
  whatsapp: "M20.5 3.5A11.8 11.8 0 0 0 12.1 0 11.9 11.9 0 0 0 1.8 17.9L0 24l6.3-1.7a12 12 0 0 0 5.8 1.5h.1A11.9 11.9 0 0 0 24 11.9c0-3.2-1.2-6.2-3.5-8.4ZM12.1 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 0 1 2.1 12a10 10 0 0 1 10-10 9.9 9.9 0 0 1 10 10 9.9 9.9 0 0 1-10 9.8Zm5.5-7.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2.1 3.3 5.1 4.6.7.3 1.3.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2.1-1.5.2-.7.2-1.3.2-1.5-.1-.1-.3-.2-.6-.4Z",
  telegram: "M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.9 7.2-2 9.5c-.1.7-.5.9-1 .5l-3-2.2-1.5 1.5c-.2.2-.3.3-.6.3l.2-3.1 5.6-5.1c.2-.2 0-.3-.3-.1l-6.9 4.3-3-1c-.7-.2-.7-.7.2-1l11.4-4.4c.5-.2 1 0 .9.8Z",
};

async function apiResponse<T>(response: Response): Promise<T> {
  const body = await response.json() as T & { error?: string };
  if (!response.ok) throw new Error(body.error ?? "La requête a échoué.");
  return body;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Impossible de charger une image de la carte."));
    image.src = src;
  });
}

function drawCover(context: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number, height: number) {
  const scale = Math.max(width / image.width, height / image.height);
  const sourceWidth = width / scale;
  const sourceHeight = height / scale;
  context.drawImage(image, (image.width - sourceWidth) / 2, (image.height - sourceHeight) / 2, sourceWidth, sourceHeight, x, y, width, height);
}

export function BusinessCardStudio() {
  const [details, setDetails] = useState(initialDetails);
  const [images, setImages] = useState<Record<ImageSlot, string>>({
    portrait: "/images/profile-portrait.webp", whatsappQr: "", telegramQr: "",
  });
  const [cropMarks, setCropMarks] = useState(true);
  const [showPortrait, setShowPortrait] = useState(true);
  const [label, setLabel] = useState("Ma carte Manidev");
  const [savedId, setSavedId] = useState<string | null>(null);
  const [cards, setCards] = useState<Pick<SavedBusinessCard, "id" | "label" | "updatedAt">[]>([]);
  const [loadingCards, setLoadingCards] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [renderError, setRenderError] = useState("");
  const [renderedVersion, setRenderedVersion] = useState("");
  const version = JSON.stringify({ details, images, showPortrait });
  const ready = renderedVersion === version;
  const [busy, setBusy] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const importVersions = useRef<Record<ImageSlot, number>>({ portrait: 0, whatsappQr: 0, telegramQr: 0 });

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const result = await apiResponse<{ data: typeof cards }>(await fetch("/api/v1/admin/business-cards", { signal: controller.signal }));
        if (!controller.signal.aborted) setCards(result.data);
      } catch (reason) {
        if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : "Chargement impossible.");
      } finally {
        if (!controller.signal.aborted) setLoadingCards(false);
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        const iconImages = await Promise.all(Object.values(messagingIcons).map((path) =>
          loadImage(`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#062653" d="${path}"/></svg>`)}`),
        ));
        const [banner, portrait, whatsappQr, telegramQr] = await Promise.all([
          loadImage("/images/banniere.png"), showPortrait && images.portrait ? loadImage(images.portrait) : null,
          images.whatsappQr ? loadImage(images.whatsappQr) : null,
          images.telegramQr ? loadImage(images.telegramQr) : null,
        ]);
        if (cancelled) return;
        const canvas = canvasRef.current;
        const candidate = canvas?.getContext("2d");
        if (!canvas || !candidate) throw new Error("L’aperçu Canvas est indisponible dans ce navigateur.");
        const context = candidate;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#faf7f0";
        context.fillRect(0, 0, 1700, 1100);
        context.drawImage(banner, 0, 0, 1700, 632);
        const shade = context.createLinearGradient(0, 320, 0, 660);
        shade.addColorStop(0, "rgba(250,247,240,0)");
        shade.addColorStop(1, "#faf7f0");
        context.fillStyle = shade;
        context.fillRect(0, 320, 1700, 340);
        if (portrait) {
          context.save();
          context.beginPath();
          context.roundRect(70, 80, 220, 258, 60);
          context.clip();
          drawCover(context, portrait, 70, 80, 220, 258);
          context.restore();
          context.strokeStyle = "rgba(250,247,240,0.4)";
          context.lineWidth = 2;
          context.beginPath();
          context.roundRect(70, 80, 220, 258, 60);
          context.stroke();
        }
        function text(value: string, x: number, y: number, size: number, width: number, bold = false) {
          context.fillStyle = "#062653";
          let fontSize = size;
          context.font = `${bold ? "bold " : ""}${fontSize}px Arial`;
          while (context.measureText(value).width > width && fontSize > 16) {
            context.font = `${bold ? "bold " : ""}${--fontSize}px Arial`;
          }
          context.fillText(value, x, y, width);
        }
        text(details.name, 70, 660, 65, 960, true);
        text(details.title, 70, 724, 32, 960);
        text(details.address, 70, 795, 29, 960);
        context.drawImage(iconImages[0], 70, 827, 42, 42);
        context.drawImage(iconImages[1], 70, 887, 42, 42);
        text(details.whatsapp || "À renseigner", 130, 865, 33, 880);
        text(details.telegram || "À renseigner", 130, 925, 33, 880);
        text(details.website, 70, 995, 27, 940);
        for (const [index, qr] of [whatsappQr, telegramQr].entries()) {
          const x = 1080 + index * 280;
          context.fillStyle = "#ffffff";
          context.fillRect(x, 750, 240, 240);
          if (qr) {
            const scale = Math.min(210 / qr.width, 210 / qr.height);
            context.imageSmoothingEnabled = false;
            context.drawImage(qr, x + (240 - qr.width * scale) / 2, 750 + (240 - qr.height * scale) / 2, qr.width * scale, qr.height * scale);
            context.imageSmoothingEnabled = true;
          } else {
            context.strokeStyle = "#7891aa";
            context.lineWidth = 2;
            context.strokeRect(x + 15, 765, 210, 210);
            text("QR à importer", x + 25, 885, 25, 190);
          }
          context.drawImage(iconImages[index], x + 98, 1005, 44, 44);
        }
        context.fillStyle = "#ffad3b";
        context.fillRect(0, 1080, 1700, 20);
        setRenderedVersion(version);
        setRenderError("");
      } catch (reason) {
        if (!cancelled) setRenderError(reason instanceof Error ? reason.message : "Création de l’aperçu impossible.");
      }
    }
    void render();
    return () => { cancelled = true; };
  }, [details, images, showPortrait, version]);

  async function importImage(event: ChangeEvent<HTMLInputElement>, slot: ImageSlot) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const version = ++importVersions.current[slot];
    setBusy(true);
    setError("");
    setStatus("");
    try {
      if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) throw new Error("Utilisez une image PNG, JPEG ou WebP.");
      if (file.size > 5 * 1024 * 1024) throw new Error("L’image doit faire moins de 5 Mo.");
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("Image illisible."));
        reader.onerror = () => reject(new Error("Lecture du fichier impossible."));
        reader.readAsDataURL(file);
      });
      const image = await loadImage(dataUrl);
      if (image.width * image.height > 20_000_000) throw new Error("L’image doit contenir moins de 20 millions de pixels.");
      const normalized = document.createElement("canvas");
      const scale = Math.min(1, (slot === "portrait" ? 1024 : 768) / Math.max(image.width, image.height));
      normalized.width = Math.max(1, Math.round(image.width * scale));
      normalized.height = Math.max(1, Math.round(image.height * scale));
      const context = normalized.getContext("2d");
      if (!context) throw new Error("La conversion de l’image est indisponible.");
      context.drawImage(image, 0, 0, normalized.width, normalized.height);
      const normalizedUrl = normalized.toDataURL("image/png");
      if (normalizedUrl.length > 700_000) throw new Error("L’image normalisée dépasse 500 Ko. Choisissez une image plus simple ou plus petite.");
      if (version === importVersions.current[slot]) {
        setImages((current) => ({ ...current, [slot]: normalizedUrl }));
        setStatus("Image importée dans la carte.");
      }
    } catch (reason) {
      if (version === importVersions.current[slot]) setError(reason instanceof Error ? reason.message : "Import impossible.");
    } finally { setBusy(false); }
  }

  async function refreshCards() {
    const result = await apiResponse<{ data: typeof cards }>(await fetch("/api/v1/admin/business-cards"));
    setCards(result.data);
  }

  async function save(copy = false) {
    setBusy(true);
    setError("");
    setStatus("");
    try {
      const parsed = businessCardSchema.safeParse({ label, details, images, showPortrait, cropMarks });
      if (!parsed.success) throw new Error("Vérifiez le nom de la carte, votre nom et la taille des images.");
      const id = copy ? null : savedId;
      const result = await apiResponse<{ data?: { id: string } }>(await fetch(
        id ? `/api/v1/admin/business-cards/${encodeURIComponent(id)}` : "/api/v1/admin/business-cards",
        { method: id ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) },
      ));
      if (result.data) setSavedId(result.data.id);
      await refreshCards();
      setStatus("Carte enregistrée en base, images et options incluses.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Sauvegarde impossible.");
    } finally { setBusy(false); }
  }

  async function openCard(id: string) {
    if (!window.confirm("Charger cette carte et remplacer le brouillon actuel ?")) return;
    setBusy(true);
    setError("");
    setStatus("");
    try {
      const result = await apiResponse<{ data: SavedBusinessCard }>(await fetch(`/api/v1/admin/business-cards/${encodeURIComponent(id)}`));
      const parsed = businessCardSchema.safeParse(result.data.data);
      if (!parsed.success) throw new Error("La carte enregistrée contient des données invalides.");
      for (const slot of ["portrait", "whatsappQr", "telegramQr"] as const) importVersions.current[slot]++;
      setSavedId(id);
      setLabel(parsed.data.label);
      setDetails(parsed.data.details);
      setImages(parsed.data.images);
      setShowPortrait(parsed.data.showPortrait);
      setCropMarks(parsed.data.cropMarks);
      setStatus("Carte chargée depuis la base.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Chargement impossible.");
    } finally { setBusy(false); }
  }

  async function deleteCard(id: string) {
    if (!window.confirm("Supprimer définitivement cette carte enregistrée ?")) return;
    setBusy(true);
    setError("");
    setStatus("");
    try {
      await apiResponse(await fetch(`/api/v1/admin/business-cards/${encodeURIComponent(id)}`, { method: "DELETE" }));
      if (savedId === id) setSavedId(null);
      await refreshCards();
      setStatus("Carte supprimée. Le brouillon affiché reste disponible.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Suppression impossible.");
    } finally { setBusy(false); }
  }

  async function download() {
    if (!canvasRef.current || !ready) return;
    setBusy(true);
    setStatus("");
    setError("");
    try {
      const pdf = createBusinessCardPdf(canvasRef.current.toDataURL("image/png"), cropMarks);
      await pdf.save("manidev-cartes-de-visite-A4.pdf", { returnPromise: true });
      setStatus("PDF A4 téléchargé : 10 cartes de 85 × 55 mm.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Génération PDF impossible.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="admin-card business-card-studio">
      <p className="eyebrow">Atelier de cartes de visite</p>
      <p className="admin-note">
        Recto inspiré de la bannière Manidev, avec votre portrait et deux QR codes.
        Enregistrez le modèle, les coordonnées et les images dans votre base privée
        pour les retrouver après rechargement. L’export PDF reste local.
      </p>
      <fieldset disabled={busy} className="business-card-fields">
      <div className="admin-form">
        <label>Nom du modèle de carte
          <input value={label} maxLength={80} onChange={(event) => setLabel(event.target.value)} />
        </label>
        {([
          ["name", "Nom", 80], ["title", "Activité / titre", 120],
          ["address", "Adresse", 150], ["whatsapp", "Téléphone WhatsApp (avec indicatif)", 40],
          ["telegram", "Téléphone ou identifiant Telegram", 80], ["website", "Site web", 150],
        ] as const).map(([key, label, maxLength]) => (
          <label key={key}>{label}
            <input type={key === "whatsapp" ? "tel" : "text"} value={details[key]} maxLength={maxLength}
              onChange={(event) => setDetails((current) => ({ ...current, [key]: event.target.value }))} />
          </label>
        ))}
        {([
          ["portrait", "Photo de profil"], ["whatsappQr", "QR code WhatsApp"], ["telegramQr", "QR code Telegram"],
        ] as const).map(([slot, label]) => (
          <label key={slot}>{label} (PNG, JPEG ou WebP, 5 Mo maximum)
            <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => void importImage(event, slot)} />
            <button type="button" onClick={() => {
              importVersions.current[slot]++;
              setImages((current) => ({ ...current, [slot]: slot === "portrait" ? "/images/profile-portrait.webp" : "" }));
            }}>{slot === "portrait" ? "Reprendre la photo du site" : "Retirer ce QR code"}</button>
          </label>
        ))}
      </div>
      <label className="business-card-crop-marks">
        <input type="checkbox" checked={showPortrait} onChange={(event) => setShowPortrait(event.target.checked)} />
        Afficher la photo de profil (contour discret)
      </label>
      </fieldset>
      <p className="admin-note">Importez des QR codes nets avec leur marge blanche. Vérifiez-les avec votre téléphone : ils ne sont pas générés automatiquement à partir des coordonnées.</p>
      <canvas ref={canvasRef} width={1700} height={1100} className="business-card-preview" role="img" aria-label="Aperçu de la carte de visite avec portrait, coordonnées et QR codes" />
      <p className="admin-note">
        A4 portrait · 2 colonnes × 5 lignes · cartes de 85 × 55 mm · espacement 2 mm.
        Imprimez à taille réelle (100 %), sans « Ajuster à la page ». Pas de fond perdu.
        {!images.whatsappQr || !images.telegramQr ? " Attention : un ou plusieurs QR codes sont encore absents." : ""}
      </p>
      <label className="business-card-crop-marks">
        <input type="checkbox" disabled={busy} checked={cropMarks} onChange={(event) => setCropMarks(event.target.checked)} />
        Inclure les repères de découpe
      </label>
      <button type="button" className="button button-dark" disabled={!ready || busy} onClick={() => void download()}>
        {busy ? "Veuillez patienter…" : "Télécharger le PDF A4"}
      </button>
      <div className="admin-actions">
        <button type="button" disabled={busy} onClick={() => void save()}>{savedId ? "Enregistrer les modifications" : "Enregistrer en base"}</button>
        <button type="button" disabled={busy} onClick={() => void save(true)}>Enregistrer une copie</button>
        <button type="button" disabled={busy || loadingCards} onClick={() => {
          setBusy(true);
          void refreshCards().catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Chargement impossible.")).finally(() => setBusy(false));
        }}>Actualiser les cartes</button>
      </div>
      <p className={`admin-message${error || renderError ? " is-error" : ""}`} role="status">{error || renderError || status}</p>
      <p className="eyebrow">Mes cartes enregistrées</p>
      {loadingCards ? <p>Chargement…</p> : cards.length === 0 ? <p className="admin-note">Aucune carte enregistrée.</p> : (
        <ul className="admin-project-list">
          {cards.map((card) => <li key={card.id}>
            <div><strong>{card.label}</strong>{savedId === card.id && <span> · Modèle ouvert</span>}</div>
            <div className="admin-actions">
              <button type="button" disabled={busy} onClick={() => void openCard(card.id)}>Charger</button>
              <button type="button" disabled={busy} onClick={() => void deleteCard(card.id)}>Supprimer</button>
            </div>
          </li>)}
        </ul>
      )}
    </section>
  );
}
