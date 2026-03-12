-- AlterTable
ALTER TABLE `senses` ALTER COLUMN `ukphone` DROP DEFAULT,
    ALTER COLUMN `usphone` DROP DEFAULT;

-- AlterTable
ALTER TABLE `words` ALTER COLUMN `ukphone` DROP DEFAULT,
    ALTER COLUMN `usphone` DROP DEFAULT;
