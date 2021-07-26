/*
  Warnings:

  - You are about to drop the `goods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ingredients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Sale` DROP FOREIGN KEY `sale_ibfk_1`;

-- DropForeignKey
ALTER TABLE `ingredients` DROP FOREIGN KEY `ingredients_ibfk_1`;

-- DropTable
DROP TABLE `goods`;

-- DropTable
DROP TABLE `ingredients`;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,

    UNIQUE INDEX `Product.name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ingredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `allergen` BOOLEAN NOT NULL,
    `vegan` BOOLEAN NOT NULL,
    `vegetarian` BOOLEAN NOT NULL,
    `products_id` INTEGER,

    UNIQUE INDEX `Ingredient.name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ingredient` ADD FOREIGN KEY (`products_id`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD FOREIGN KEY (`item_id`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
