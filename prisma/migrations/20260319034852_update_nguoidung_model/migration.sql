/*
  Warnings:

  - You are about to drop the column `birth_day` on the `NguoiDung` table. All the data in the column will be lost.
  - You are about to drop the column `pass_word` on the `NguoiDung` table. All the data in the column will be lost.
  - You are about to alter the column `gender` on the `NguoiDung` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.
  - You are about to alter the column `skill` on the `NguoiDung` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `certification` on the `NguoiDung` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - Added the required column `password` to the `NguoiDung` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `NguoiDung` DROP COLUMN `birth_day`,
    DROP COLUMN `pass_word`,
    ADD COLUMN `birthday` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `refresh_token` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `gender` BOOLEAN NULL,
    MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'USER',
    MODIFY `skill` JSON NULL,
    MODIFY `certification` JSON NULL;
