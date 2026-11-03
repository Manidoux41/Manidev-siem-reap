CREATE TABLE "BusinessCard" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "BusinessCard_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "BusinessCard_userId_updatedAt_idx" ON "BusinessCard"("userId", "updatedAt");
ALTER TABLE "BusinessCard" ADD CONSTRAINT "BusinessCard_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "AdminUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "Skill" ("id", "name", "category", "description", "sortOrder", "published", "createdAt", "updatedAt")
VALUES ('ai-specialization', 'Artificial intelligence', 'Specializations',
        'Specialized in using AI tools to support development, automate workflows and integrate practical AI-assisted solutions.',
        0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("name", "category") DO NOTHING;
