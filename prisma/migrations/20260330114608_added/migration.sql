-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'GOD';

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "websiteLink" DROP NOT NULL;
