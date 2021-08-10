/*
  Warnings:

  - You are about to alter the column `category` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("Product_category")`.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `category` ENUM('Cake', 'Drink', 'Food') NOT NULL DEFAULT 'Food';
