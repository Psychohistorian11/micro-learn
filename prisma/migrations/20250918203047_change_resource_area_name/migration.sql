/*
  Warnings:

  - You are about to drop the `_ResourceAreas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_ResourceAreas" DROP CONSTRAINT "_ResourceAreas_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ResourceAreas" DROP CONSTRAINT "_ResourceAreas_B_fkey";

-- DropTable
DROP TABLE "public"."_ResourceAreas";

-- CreateTable
CREATE TABLE "public"."Resource_Area" (
    "id" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "areaId" TEXT NOT NULL,

    CONSTRAINT "Resource_Area_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Resource_Area" ADD CONSTRAINT "Resource_Area_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "public"."Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resource_Area" ADD CONSTRAINT "Resource_Area_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "public"."Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
