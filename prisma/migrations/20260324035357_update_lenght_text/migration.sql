/*
  Warnings:

  - You are about to drop the column `hinh_anh` on the `ChiTietLoaiCongViec` table. All the data in the column will be lost.
  - You are about to drop the column `ma_loai_cong_viec` on the `ChiTietLoaiCongViec` table. All the data in the column will be lost.
  - Added the required column `ma_nhom_chi_tiet_loai_cong_viec` to the `ChiTietLoaiCongViec` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ChiTietLoaiCongViec` DROP FOREIGN KEY `ChiTietLoaiCongViec_ma_loai_cong_viec_fkey`;

-- DropForeignKey
ALTER TABLE `CongViec` DROP FOREIGN KEY `CongViec_ma_chi_tiet_loai_fkey`;

-- DropIndex
DROP INDEX `ChiTietLoaiCongViec_ma_loai_cong_viec_fkey` ON `ChiTietLoaiCongViec`;

-- DropIndex
DROP INDEX `CongViec_ma_chi_tiet_loai_fkey` ON `CongViec`;

-- AlterTable
ALTER TABLE `ChiTietLoaiCongViec` DROP COLUMN `hinh_anh`,
    DROP COLUMN `ma_loai_cong_viec`,
    ADD COLUMN `ma_nhom_chi_tiet_loai_cong_viec` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `CongViec` MODIFY `mo_ta` TEXT NOT NULL,
    MODIFY `mo_ta_ngan` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `NhomChiTietLoaiCongViec` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_nhom` VARCHAR(191) NOT NULL,
    `hinh_anh` VARCHAR(191) NOT NULL,
    `ma_loai_cong_viec` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NhomChiTietLoaiCongViec` ADD CONSTRAINT `NhomChiTietLoaiCongViec_ma_loai_cong_viec_fkey` FOREIGN KEY (`ma_loai_cong_viec`) REFERENCES `LoaiCongViec`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietLoaiCongViec` ADD CONSTRAINT `ChiTietLoaiCongViec_ma_nhom_chi_tiet_loai_cong_viec_fkey` FOREIGN KEY (`ma_nhom_chi_tiet_loai_cong_viec`) REFERENCES `NhomChiTietLoaiCongViec`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
