-- CreateTable
CREATE TABLE `Challenges` (
    `id` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NULL,
    `difficulty` VARCHAR(191) NOT NULL,
    `points` INTEGER NOT NULL,
    `flag` VARCHAR(191) NOT NULL,
    `writeups` VARCHAR(191) NOT NULL,
    `created_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `published` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Challenges_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Writeups` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` JSON NULL,
    `thumbnail` VARCHAR(191) NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `created_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Challenges` ADD CONSTRAINT `Challenges_writeups_fkey` FOREIGN KEY (`writeups`) REFERENCES `Writeups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
