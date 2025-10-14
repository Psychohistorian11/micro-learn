-- AlterEnum
ALTER TYPE "public"."CommunityRole" ADD VALUE 'Pending';

-- AlterTable
ALTER TABLE "public"."Community" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true;
