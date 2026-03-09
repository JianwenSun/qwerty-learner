/*
  Warnings:

  - A unique constraint covering the columns `[sentence_id,voice_type]` on the table `sentence_sounds` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `sentence_sounds` DROP FOREIGN KEY `sentence_sounds_sentence_id_fkey`;

-- DropIndex
DROP INDEX `sentence_sounds_sentence_id_voiceType_key` ON `sentence_sounds`;

-- AlterTable
ALTER TABLE `sentence_sounds` ADD COLUMN `voice_type` ENUM('Male', 'Female') NULL;

-- Update existing data
UPDATE `sentence_sounds` SET `voice_type` = `voiceType`;

-- AlterTable
ALTER TABLE `sentence_sounds` MODIFY COLUMN `voice_type` ENUM('Male', 'Female') NOT NULL;

-- DropColumn
ALTER TABLE `sentence_sounds` DROP COLUMN `voiceType`;

-- CreateIndex
CREATE UNIQUE INDEX `sentence_sounds_sentence_id_voice_type_key` ON `sentence_sounds`(`sentence_id`, `voice_type`);

-- AddForeignKey
ALTER TABLE `sentence_sounds` ADD CONSTRAINT `sentence_sounds_sentence_id_fkey` FOREIGN KEY (`sentence_id`) REFERENCES `sentences`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
