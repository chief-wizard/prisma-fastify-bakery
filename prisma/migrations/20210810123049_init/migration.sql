/*
  Warnings:

  - You are about to alter the column `category` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Enum("Product_category")` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `category` VARCHAR(191) NOT NULL;
