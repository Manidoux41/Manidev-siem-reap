import { getPrisma, databaseConfigured } from "@/lib/prisma";
import { isRateLimited, requestAddress, hasSameOrigin } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) {
    return Response.json({ error: "Origine de requête invalide." }, { status: 403 });
  }

  try {
    if (
      await isRateLimited(
        `contact:${requestAddress(request)}`,
        5,
        60 * 60 * 1000,
      )
    ) {
      return Response.json(
        { error: "Trop de tentatives. Réessayez plus tard." },
        { status: 429 },
      );
    }
  } catch (error) {
    console.error("Échec du contrôle de fréquence du formulaire.", error);
    return Response.json(
      { error: "Le formulaire est momentanément indisponible." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corps JSON invalide." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Vérifiez les champs du formulaire.", details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  if (parsed.data.website) {
    return Response.json({ error: "Requête rejetée." }, { status: 422 });
  }
  if (!databaseConfigured) {
    return Response.json(
      { error: "Le formulaire sera disponible après configuration de PostgreSQL." },
      { status: 503 },
    );
  }

  try {
    const { name, email, subject, message } = parsed.data;
    await getPrisma().contactMessage.create({
      data: { name, email, subject, message },
    });
    return Response.json(
      { message: "Merci, votre message a bien été enregistré." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Échec de l'enregistrement du message de contact.", error);
    return Response.json(
      { error: "Impossible d'enregistrer le message pour le moment." },
      { status: 500 },
    );
  }
}
