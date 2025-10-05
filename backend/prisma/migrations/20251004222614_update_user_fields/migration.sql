/*
  Warnings:

  - You are about to drop the column `sex` on the `users` table. All the data in the column will be lost.
  - Added the required column `gender` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "sex",
ADD COLUMN     "gender" TEXT NOT NULL,
ALTER COLUMN "disabilities" DROP NOT NULL;
