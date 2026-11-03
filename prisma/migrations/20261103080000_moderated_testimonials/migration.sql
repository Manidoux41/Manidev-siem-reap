CREATE TYPE "TestimonialStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "displayName" VARCHAR(100) NOT NULL,
    "testimony" VARCHAR(2000) NOT NULL,
    "publicationConsent" BOOLEAN NOT NULL,
    "consentedAt" TIMESTAMP(3) NOT NULL,
    "status" "TestimonialStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Testimonial_status_createdAt_idx" ON "Testimonial"("status", "createdAt");
CREATE INDEX "Testimonial_projectId_idx" ON "Testimonial"("projectId");
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_projectId_fkey"
    FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
