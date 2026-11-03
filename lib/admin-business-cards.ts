import { businessCardSchema } from "@/lib/business-card-schema";

export async function readBusinessCardInput(request: Request) {
  const reader = request.body?.getReader();
  let text = "";
  let size = 0;
  const decoder = new TextDecoder();
  try {
    if (reader) {
      while (true) {
        const chunk = await reader.read();
        if (chunk.done) break;
        size += chunk.value.byteLength;
        if (size > 2_200_000) {
          await reader.cancel();
          return { response: Response.json({ error: "La carte dépasse la limite de 2,2 Mo." }, { status: 413 }) };
        }
        text += decoder.decode(chunk.value, { stream: true });
      }
      text += decoder.decode();
    }
  } catch (error) {
    console.error("Échec de la lecture des données de carte.", error);
    return { response: Response.json({ error: "Lecture de la requête impossible." }, { status: 400 }) };
  } finally {
    reader?.releaseLock();
  }
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return { response: Response.json({ error: "Corps JSON invalide." }, { status: 400 }) };
  }
  const parsed = businessCardSchema.safeParse(body);
  if (!parsed.success) {
    return { response: Response.json({ error: "Données de carte invalides.", details: parsed.error.flatten() }, { status: 422 }) };
  }
  return { data: parsed.data };
}
