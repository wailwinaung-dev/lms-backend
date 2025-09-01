-- CreateTable
CREATE TABLE "public"."Companions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "voice" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Companions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SessionHistory" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "companion_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."SessionHistory" ADD CONSTRAINT "SessionHistory_companion_id_fkey" FOREIGN KEY ("companion_id") REFERENCES "public"."Companions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
