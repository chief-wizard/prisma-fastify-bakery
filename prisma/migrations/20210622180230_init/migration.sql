/*
  Warnings:

  - You are about to drop the column `test` on the `Ingridient` table. All the data in the column will be lost.
  - Added the required column `stuff_id` to the `Duties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goods_id` to the `Ingridient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Duties` DROP FOREIGN KEY `duties_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Ingridient` DROP FOREIGN KEY `ingridient_ibfk_1`;

-- AlterTable
ALTER TABLE `Duties` ADD COLUMN `stuff_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Ingridient` DROP COLUMN `test`,
    ADD COLUMN `goods_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Ingridient` ADD FOREIGN KEY (`goods_id`) REFERENCES `Goods`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Duties` ADD FOREIGN KEY (`stuff_id`) REFERENCES `Stuff`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
