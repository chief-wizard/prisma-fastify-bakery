/*
  Warnings:

  - You are about to drop the `Duties` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Goods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ingridient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Duties` DROP FOREIGN KEY `duties_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Ingridient` DROP FOREIGN KEY `ingridient_ibfk_1`;

-- DropTable
DROP TABLE `Duties`;

-- DropTable
DROP TABLE `Goods`;

-- DropTable
DROP TABLE `Ingridient`;

-- CreateTable
CREATE TABLE `goods` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,

    UNIQUE INDEX `goods.name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingridients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `allergen` BOOLEAN NOT NULL,
    `vegan` BOOLEAN NOT NULL,
    `vegetarian` BOOLEAN NOT NULL,
    `goods_id` INTEGER NOT NULL,

    UNIQUE INDEX `ingridients.name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Duty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `task` VARCHAR(191) NOT NULL,
    `stuff_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ingridients` ADD FOREIGN KEY (`goods_id`) REFERENCES `goods`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Duty` ADD FOREIGN KEY (`stuff_id`) REFERENCES `Stuff`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
