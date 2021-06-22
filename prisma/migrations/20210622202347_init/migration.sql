/*
  Warnings:

  - You are about to drop the column `stuff_id` on the `Duty` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Duty` DROP FOREIGN KEY `duty_ibfk_1`;

-- AlterTable
ALTER TABLE `Duty` DROP COLUMN `stuff_id`;

-- CreateTable
CREATE TABLE `_DutyToStuff` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DutyToStuff_AB_unique`(`A`, `B`),
    INDEX `_DutyToStuff_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_DutyToStuff` ADD FOREIGN KEY (`A`) REFERENCES `Duty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DutyToStuff` ADD FOREIGN KEY (`B`) REFERENCES `Stuff`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
