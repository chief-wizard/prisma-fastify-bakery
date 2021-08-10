/*
  Warnings:

  - You are about to alter the column `category` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("Product_category")`.
  - You are about to drop the column `item_id` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DutyToStaff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Sale` DROP FOREIGN KEY `sale_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_DutyToStaff` DROP FOREIGN KEY `_dutytostaff_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_DutyToStaff` DROP FOREIGN KEY `_dutytostaff_ibfk_2`;

-- AlterTable
ALTER TABLE `Duty` ADD COLUMN `completed` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Product` MODIFY `category` ENUM('Cake', 'Drink', 'Food') NOT NULL;

-- AlterTable
ALTER TABLE `Sale` DROP COLUMN `item_id`;

-- DropTable
DROP TABLE `Staff`;

-- DropTable
DROP TABLE `_DutyToStaff`;

-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductToSale` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductToSale_AB_unique`(`A`, `B`),
    INDEX `_ProductToSale_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DutyToEmployee` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DutyToEmployee_AB_unique`(`A`, `B`),
    INDEX `_DutyToEmployee_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProductToSale` ADD FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToSale` ADD FOREIGN KEY (`B`) REFERENCES `Sale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DutyToEmployee` ADD FOREIGN KEY (`A`) REFERENCES `Duty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DutyToEmployee` ADD FOREIGN KEY (`B`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
