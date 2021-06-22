/*
  Warnings:

  - Added the required column `address` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_num` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Supplier` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `contact` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone_num` VARCHAR(191) NOT NULL;
