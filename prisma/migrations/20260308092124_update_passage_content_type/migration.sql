-- AlterTable
ALTER TABLE `passages` MODIFY `content` TEXT NOT NULL,
    MODIFY `content_cn` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `sentences` MODIFY `sound_id` INTEGER NULL;
