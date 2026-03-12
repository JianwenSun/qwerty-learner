/*
  Warnings:

  - The primary key for the `sounds` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `delete_at` on the `sounds` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `sounds` table. All the data in the column will be lost.
  - You are about to drop the `sentence_sounds` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sentence_id,voice_type]` on the table `sounds` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gender` to the `sounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentence_id` to the `sounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voice_type` to the `sounds` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `sentence_sounds` DROP FOREIGN KEY `sentence_sounds_sentence_id_fkey`;

-- AlterTable
ALTER TABLE `sounds` DROP PRIMARY KEY,
    DROP COLUMN `delete_at`,
    DROP COLUMN `path`,
    ADD COLUMN `gender` VARCHAR(191) NOT NULL,
    ADD COLUMN `mp3_data` LONGBLOB NULL,
    ADD COLUMN `sentence_id` INTEGER NOT NULL,
    ADD COLUMN `url` VARCHAR(191) NULL,
    ADD COLUMN `voice_type` ENUM('Male', 'Female') NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `sentence_sounds`;

-- CreateIndex
CREATE INDEX `sounds_sentence_id_fkey` ON `sounds`(`sentence_id`);

-- CreateIndex
CREATE UNIQUE INDEX `sounds_sentence_id_voice_type_key` ON `sounds`(`sentence_id`, `voice_type`);

-- AddForeignKey
ALTER TABLE `sounds` ADD CONSTRAINT `sounds_sentence_id_fkey` FOREIGN KEY (`sentence_id`) REFERENCES `sentences`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
