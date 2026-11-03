import { z } from "zod";
import { databaseConfigured, getPrisma } from "@/lib/prisma";

export const testimonialSchema = z.object({
  projectId: z.string().trim().min(1).max(100),
  displayName: z.string().trim().min(2).max(100),
  testimony: z.string().trim().min(20).max(2000),
  publicationConsent: z.literal(true),
  website: z.string().max(0).optional(),
}).strict();

export const testimonialModerationSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
}).strict();

export type PublicTestimonial = {
  displayName: string;
  testimony: string;
  project: { title: string };
};

export type AdminTestimonial = PublicTestimonial & {
  id: string;
  projectId: string;
  project: { title: string; published: boolean };
  status: "PENDING" | "APPROVED" | "REJECTED";
  publicationConsent: boolean;
  consentedAt: string;
  createdAt: string;
};

export async function getPublicTestimonials(projectId?: string): Promise<PublicTestimonial[]> {
  if (!databaseConfigured) return [];
  return getPrisma().testimonial.findMany({
    where: {
      status: "APPROVED",
      publicationConsent: true,
      project: { published: true },
      ...(projectId ? { projectId } : {}),
    },
    select: { displayName: true, testimony: true, project: { select: { title: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}

export function getAdminTestimonials() {
  return getPrisma().testimonial.findMany({
    include: { project: { select: { title: true, published: true } } },
    orderBy: { createdAt: "desc" },
  });
}
