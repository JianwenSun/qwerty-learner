/*
  Warnings:

  - You are about to drop the column `content` on the `senses` table. All the data in the column will be lost.
  - You are about to drop the column `sound_id` on the `sentences` table. All the data in the column will be lost.
  - You are about to drop the column `sentence_id` on the `sounds` table. All the data in the column will be lost.
  - You are about to drop the column `sense_ids` on the `words` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[word_id]` on the table `senses` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `sounds` DROP FOREIGN KEY `sounds_sentence_id_fkey`;

-- DropIndex
DROP INDEX `sounds_sentence_id_fkey` ON `sounds`;

-- DropIndex
DROP INDEX `sounds_sentence_id_voice_type_key` ON `sounds`;

-- AlterTable
ALTER TABLE `senses` DROP COLUMN `content`,
    ADD COLUMN `sound_id` VARCHAR(191) NULL,
    ADD COLUMN `ukphone` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `usphone` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `sentences` DROP COLUMN `sound_id`,
    MODIFY `explanation` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `sounds` DROP COLUMN `sentence_id`;

-- AlterTable
ALTER TABLE `words` DROP COLUMN `sense_ids`,
    ADD COLUMN `ukphone` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `usphone` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE `sense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `pos` VARCHAR(191) NOT NULL,
    `ukphone` VARCHAR(191) NULL,
    `usphone` VARCHAR(191) NULL,
    `senses_id` INTEGER NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modify_at` DATETIME(3) NULL,
    `delete_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `sense_senses_id_fkey`(`senses_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sentence_sounds` (
    `sentence_id` INTEGER NOT NULL,
    `sound_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`sentence_id`, `sound_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `senses_sounds` (
    `senses_id` INTEGER NOT NULL,
    `sound_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`senses_id`, `sound_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sense_sounds` (
    `sense_id` INTEGER NOT NULL,
    `sound_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`sense_id`, `sound_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `senses_word_id_key` ON `senses`(`word_id`);

-- CreateIndex
CREATE INDEX `senses_sound_id_fkey` ON `senses`(`sound_id`);

-- AddForeignKey
ALTER TABLE `senses` ADD CONSTRAINT `senses_sound_id_fkey` FOREIGN KEY (`sound_id`) REFERENCES `sounds`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sense` ADD CONSTRAINT `sense_senses_id_fkey` FOREIGN KEY (`senses_id`) REFERENCES `senses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sentence_sounds` ADD CONSTRAINT `sentence_sounds_sentence_id_fkey` FOREIGN KEY (`sentence_id`) REFERENCES `sentences`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sentence_sounds` ADD CONSTRAINT `sentence_sounds_sound_id_fkey` FOREIGN KEY (`sound_id`) REFERENCES `sounds`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `senses_sounds` ADD CONSTRAINT `senses_sounds_senses_id_fkey` FOREIGN KEY (`senses_id`) REFERENCES `senses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `senses_sounds` ADD CONSTRAINT `senses_sounds_sound_id_fkey` FOREIGN KEY (`sound_id`) REFERENCES `sounds`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sense_sounds` ADD CONSTRAINT `sense_sounds_sense_id_fkey` FOREIGN KEY (`sense_id`) REFERENCES `sense`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sense_sounds` ADD CONSTRAINT `sense_sounds_sound_id_fkey` FOREIGN KEY (`sound_id`) REFERENCES `sounds`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
