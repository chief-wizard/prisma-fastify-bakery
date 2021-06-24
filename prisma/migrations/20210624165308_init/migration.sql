/*
  Warnings:

  - A unique constraint covering the columns `[task]` on the table `Duty` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Duty.task_unique` ON `Duty`(`task`);
