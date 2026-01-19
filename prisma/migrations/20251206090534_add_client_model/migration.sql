/*
  Warnings:

  - You are about to drop the column `initials` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Client` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Client_slug_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "initials",
DROP COLUMN "slug";
