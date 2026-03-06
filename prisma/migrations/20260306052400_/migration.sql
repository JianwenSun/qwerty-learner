-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `describe` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modify_at` DATETIME(3) NULL,
    `delete_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `categories_create_at_is_deleted_key`(`create_at`, `is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chapters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `describe` VARCHAR(191) NOT NULL,
    `type` ENUM('Word', 'Sentence', 'Passage') NOT NULL,
    `dictionary_id` INTEGER NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modify_at` DATETIME(3) NULL,
    `delete_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `chapters_create_at_is_deleted_key`(`create_at`, `is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `words` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `token_indexes` VARCHAR(191) NOT NULL,
    `sense_ids` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modify_at` DATETIME(3) NULL,
    `delete_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `words_content_key`(`content`),
    INDEX `words_content_idx`(`content`),
    UNIQUE INDEX `words_create_at_is_deleted_key`(`create_at`, `is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clauses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sentence_id` INTEGER NOT NULL,
    `index` INTEGER NOT NULL,
    `type` ENUM('Simple', 'Complex') NOT NULL,
    `explanation` VARCHAR(191) NOT NULL,
    `chunk_indexes` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modify_at` DATETIME(3) NULL,
    `delete_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `clauses_create_at_is_deleted_key`(`create_at`, `is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sentences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chapter_id` INTEGER NULL,
    `passage_id` INTEGER NULL,
    `content` VARCHAR(191) NOT NULL,
    `content_cn` VARCHAR(191) NOT NULL,
    `explanation` VARCHAR(191) NOT NULL,
    `tokens` TEXT NOT NULL,
    `words` TEXT NOT NULL,
    `sound_id` INTEGER NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modify_at` DATETIME(3) NULL,
    `delete_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `sentences_content_idx`(`content`),
    UNIQUE INDEX `sentences_create_at_is_deleted_key`(`create_at`, `is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dictionaries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `describe` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `category_id` INTEGER NOT NULL,
    `chapter_num` INTEGER NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modify_at` DATETIME(3) NULL,
    `delete_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `dictionaries_create_at_is_deleted_key`(`create_at`, `is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sounds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modify_at` DATETIME(3) NULL,
    `delete_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `sounds_create_at_is_deleted_key`(`create_at`, `is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `practices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modify_at` DATETIME(3) NULL,
    `delete_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `practices_name_idx`(`name`),
    UNIQUE INDEX `practices_create_at_is_deleted_key`(`create_at`, `is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `passages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `content_cn` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NULL,
    `source` VARCHAR(191) NOT NULL,
    `word_count` INTEGER NOT NULL,
    `sentence_count` INTEGER NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modify_at` DATETIME(3) NULL,
    `delete_at` DATETIME(3) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `chapter_id` INTEGER NULL,

    INDEX `passages_title_idx`(`title`),
    UNIQUE INDEX `passages_create_at_is_deleted_key`(`create_at`, `is_deleted`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SentencePractice` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SentencePractice_AB_unique`(`A`, `B`),
    INDEX `_SentencePractice_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chapters` ADD CONSTRAINT `chapters_dictionary_id_fkey` FOREIGN KEY (`dictionary_id`) REFERENCES `dictionaries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clauses` ADD CONSTRAINT `clauses_sentence_id_fkey` FOREIGN KEY (`sentence_id`) REFERENCES `sentences`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sentences` ADD CONSTRAINT `sentences_passage_id_fkey` FOREIGN KEY (`passage_id`) REFERENCES `passages`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sentences` ADD CONSTRAINT `sentences_chapter_id_fkey` FOREIGN KEY (`chapter_id`) REFERENCES `chapters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `passages` ADD CONSTRAINT `passages_chapter_id_fkey` FOREIGN KEY (`chapter_id`) REFERENCES `chapters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SentencePractice` ADD CONSTRAINT `_SentencePractice_A_fkey` FOREIGN KEY (`A`) REFERENCES `practices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SentencePractice` ADD CONSTRAINT `_SentencePractice_B_fkey` FOREIGN KEY (`B`) REFERENCES `sentences`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
