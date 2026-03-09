/*
  Warnings:

  - You are about to drop the column `delete_at` on the `sentence_sounds` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `sentence_sounds` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `sentence_sounds` DROP COLUMN `delete_at`,
    DROP COLUMN `is_deleted`;
