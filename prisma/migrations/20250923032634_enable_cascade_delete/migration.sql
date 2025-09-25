-- DropForeignKey
ALTER TABLE "public"."Resource" DROP CONSTRAINT "Resource_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Resource_Area" DROP CONSTRAINT "Resource_Area_areaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Resource_Area" DROP CONSTRAINT "Resource_Area_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Resource_Community" DROP CONSTRAINT "Resource_Community_communityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Resource_Community" DROP CONSTRAINT "Resource_Community_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User_Community" DROP CONSTRAINT "User_Community_communityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User_Community" DROP CONSTRAINT "User_Community_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."User_Community" ADD CONSTRAINT "User_Community_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User_Community" ADD CONSTRAINT "User_Community_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "public"."Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resource" ADD CONSTRAINT "Resource_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resource_Area" ADD CONSTRAINT "Resource_Area_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "public"."Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resource_Area" ADD CONSTRAINT "Resource_Area_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "public"."Area"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resource_Community" ADD CONSTRAINT "Resource_Community_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "public"."Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resource_Community" ADD CONSTRAINT "Resource_Community_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "public"."Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;
