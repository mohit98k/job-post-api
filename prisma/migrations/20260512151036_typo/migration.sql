/*
  Warnings:

  - You are about to drop the column `idBanned` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "idBanned",
ADD COLUMN     "isBanned" BOOLEAN NOT NULL DEFAULT false;
