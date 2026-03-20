/*
  Warnings:

  - Added the required column `nguoi_tao` to the `CongViec` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CongViec` ADD COLUMN `nguoi_tao` VARCHAR(191) NOT NULL;
