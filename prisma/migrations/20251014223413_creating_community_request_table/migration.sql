-- CreateEnum
CREATE TYPE "public"."RequestStatus" AS ENUM ('Pending', 'Accepted', 'Rejected');

-- AlterTable
ALTER TABLE "public"."Community" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "public"."Community_Request" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "status" "public"."RequestStatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "respondedAt" TIMESTAMP(3),

    CONSTRAINT "Community_Request_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Community_Request" ADD CONSTRAINT "Community_Request_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "public"."Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Community_Request" ADD CONSTRAINT "Community_Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
