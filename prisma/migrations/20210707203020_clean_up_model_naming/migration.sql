/*
  Warnings:

  - You are about to drop the `Sales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stuff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DutyToStuff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ingridients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Sales` DROP FOREIGN KEY `sales_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_DutyToStuff` DROP FOREIGN KEY `_dutytostuff_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_DutyToStuff` DROP FOREIGN KEY `_dutytostuff_ibfk_2`;

-- DropForeignKey
ALTER TABLE `ingridients` DROP FOREIGN KEY `ingridients_ibfk_1`;

-- DropTable
DROP TABLE `Sales`;

-- DropTable
DROP TABLE `Stuff`;

-- DropTable
DROP TABLE `_DutyToStuff`;

-- DropTable
DROP TABLE `ingridients`;

-- CreateTable
CREATE TABLE `ingredients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `allergen` BOOLEAN NOT NULL,
    `vegan` BOOLEAN NOT NULL,
    `vegetarian` BOOLEAN NOT NULL,
    `good_id` INTEGER,

    UNIQUE INDEX `ingredients.name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `item_id` INTEGER,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DutyToStaff` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DutyToStaff_AB_unique`(`A`, `B`),
    INDEX `_DutyToStaff_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ingredients` ADD FOREIGN KEY (`good_id`) REFERENCES `goods`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD FOREIGN KEY (`item_id`) REFERENCES `goods`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DutyToStaff` ADD FOREIGN KEY (`A`) REFERENCES `Duty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DutyToStaff` ADD FOREIGN KEY (`B`) REFERENCES `Staff`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
