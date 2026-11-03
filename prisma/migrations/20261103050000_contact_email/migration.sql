ALTER TABLE "ContactMessage"
ADD COLUMN "notificationPending" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "notificationClaimedAt" TIMESTAMP(3),
ADD COLUMN "notifiedAt" TIMESTAMP(3);

CREATE INDEX "ContactMessage_notificationPending_notificationClaimedAt_idx"
ON "ContactMessage"("notificationPending", "notificationClaimedAt");
