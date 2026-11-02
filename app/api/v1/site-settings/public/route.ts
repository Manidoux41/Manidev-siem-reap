import { connection } from "next/server";
import { getPublicSiteSettings } from "@/lib/site-settings";

export async function GET() {
  await connection();
  try {
    return Response.json({ data: await getPublicSiteSettings() });
  } catch (error) {
    console.error("Erreur lors du chargement des paramètres publics.", error);
    return Response.json(
      { error: "Les paramètres sont momentanément indisponibles." },
      { status: 500 },
    );
  }
}
