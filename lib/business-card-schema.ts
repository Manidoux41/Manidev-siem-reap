import { z } from "zod";

const image = z.string().max(700_000).refine((value) => {
  if (!value || value === "/images/profile-portrait.webp") return true;
  return /^data:image\/png;base64,iVBORw0KGgo[A-Za-z0-9+/]*={0,2}$/.test(value);
}, "Utilisez une image PNG normalisée de moins de 500 Ko.");

export const businessCardSchema = z.object({
  label: z.string().trim().min(1).max(80),
  details: z.object({
    name: z.string().trim().min(1).max(80),
    title: z.string().trim().max(120),
    address: z.string().trim().max(150),
    whatsapp: z.string().trim().max(40),
    telegram: z.string().trim().max(80),
    website: z.string().trim().max(150),
  }).strict(),
  images: z.object({
    portrait: image,
    whatsappQr: image.refine((value) => value !== "/images/profile-portrait.webp"),
    telegramQr: image.refine((value) => value !== "/images/profile-portrait.webp"),
  }).strict(),
  showPortrait: z.boolean(),
  cropMarks: z.boolean(),
}).strict();

export type BusinessCardData = z.infer<typeof businessCardSchema>;
export type SavedBusinessCard = {
  id: string;
  label: string;
  updatedAt: string;
  data: BusinessCardData;
};
