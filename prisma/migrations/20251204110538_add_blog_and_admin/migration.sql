/*
  Warnings:

  - You are about to drop the column `email` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `bannerUrl` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Admin_email_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "email",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "bannerUrl",
DROP COLUMN "publishedAt",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "content_html" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "readTime" TEXT,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "Project";

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
