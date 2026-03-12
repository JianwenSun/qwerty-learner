/*
  Warnings:

  - You are about to drop the column `token_indexes` on the `words` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `words` DROP COLUMN `token_indexes`;

-- CreateTable
CREATE TABLE `senses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `word_id` INTEGER NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modify_at` DATETIME(3) NULL,
    `delete_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `senses_word_id_fkey`(`word_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `senses` ADD CONSTRAINT `senses_word_id_fkey` FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
