import { deleteAdminSession } from "@/lib/admin-session";
import { hasSameOrigin } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) {
    return Response.json({ error: "Origine de requête invalide." }, { status: 403 });
  }

  try {
    await deleteAdminSession();
    return Response.json({ message: "Session fermée." });
  } catch (error) {
    console.error("Échec de la fermeture de session administrateur.", error);
    return Response.json(
      { error: "Impossible de fermer la session." },
      { status: 500 },
    );
  }
}
