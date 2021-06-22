/*
  Warnings:

  - You are about to alter the column `title` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the `BakedGoods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Ingridient` DROP FOREIGN KEY `ingridient_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `profile_ibfk_1`;

-- AlterTable
ALTER TABLE `Post` ADD COLUMN `viewCount` INTEGER NOT NULL DEFAULT 0,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `authorId` INTEGER;

-- DropTable
DROP TABLE `BakedGoods`;

-- DropTable
DROP TABLE `Profile`;

-- CreateTable
CREATE TABLE `Goods` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,

    UNIQUE INDEX `Goods.name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ingridient` ADD FOREIGN KEY (`test`) REFERENCES `Goods`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
