/*
  Warnings:

  - You are about to drop the column `category` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `subCategory` on the `Portfolio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "category",
DROP COLUMN "subCategory",
ADD COLUMN     "categories" JSONB NOT NULL DEFAULT '[]',
ALTER COLUMN "results" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Portfolio_published_idx" ON "Portfolio"("published");

-- CreateIndex
CREATE INDEX "Portfolio_featured_idx" ON "Portfolio"("featured");
