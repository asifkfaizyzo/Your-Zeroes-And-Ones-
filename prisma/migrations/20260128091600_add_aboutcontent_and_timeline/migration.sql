CREATE TABLE IF NOT EXISTS "AboutContent" (
  "id" TEXT PRIMARY KEY,
  "badge" TEXT NOT NULL DEFAULT 'Who We Are',
  "title" TEXT NOT NULL DEFAULT 'Crafting Digital',
  "highlightedText" TEXT NOT NULL DEFAULT 'Excellence',
  "paragraph1" TEXT NOT NULL,
  "paragraph2" TEXT NOT NULL,
  "media" TEXT,
  "mediaType" TEXT NOT NULL DEFAULT 'image',
  "stats" JSONB NOT NULL,
  "published" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "Timeline" (
  "id" TEXT PRIMARY KEY,
  "year" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "icon" TEXT NOT NULL DEFAULT 'Rocket',
  "position" INTEGER NOT NULL,
  "published" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS "Timeline_position_idx" ON "Timeline"("position");
CREATE INDEX IF NOT EXISTS "Timeline_published_idx" ON "Timeline"("published");
