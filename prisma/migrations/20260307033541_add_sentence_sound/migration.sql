-- CreateTable
CREATE TABLE `sentence_sounds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sentence_id` INTEGER NOT NULL,
    `voiceType` ENUM('Male', 'Female') NOT NULL,
    `hash` VARCHAR(32) NOT NULL,
    `mp3_data` LONGBLOB NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modify_at` DATETIME(3) NULL,
    `delete_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `sentence_sounds_sentence_id_fkey`(`sentence_id`),
    UNIQUE INDEX `sentence_sounds_sentence_id_voiceType_key`(`sentence_id`, `voiceType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sentence_sounds` ADD CONSTRAINT `sentence_sounds_sentence_id_fkey` FOREIGN KEY (`sentence_id`) REFERENCES `sentences`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
