/*
  Warnings:

  - Made the column `image` on table `Community` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Community` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Resource` required. This step will fail if there are existing NULL values in that column.
  - Made the column `authorId` on table `Resource` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Resource" DROP CONSTRAINT "Resource_authorId_fkey";

-- AlterTable
ALTER TABLE "public"."Area" ADD COLUMN     "color" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "icon" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "public"."Community" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DEFAULT '',
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "public"."Resource" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DEFAULT '',
ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Resource" ADD CONSTRAINT "Resource_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
