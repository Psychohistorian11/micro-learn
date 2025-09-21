/*
  Warnings:

  - The values [Participant] on the enum `CommunityRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."CommunityRole_new" AS ENUM ('Admin', 'Mod', 'Member');
ALTER TABLE "public"."User_Community" ALTER COLUMN "role" TYPE "public"."CommunityRole_new" USING ("role"::text::"public"."CommunityRole_new");
ALTER TYPE "public"."CommunityRole" RENAME TO "CommunityRole_old";
ALTER TYPE "public"."CommunityRole_new" RENAME TO "CommunityRole";
DROP TYPE "public"."CommunityRole_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Resource" ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT '';
