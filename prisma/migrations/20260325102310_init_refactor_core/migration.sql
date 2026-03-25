/*
  Warnings:

  - Added the required column `updated_at` to the `BinhLuan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ChiTietLoaiCongViec` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `CongViec` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `LoaiCongViec` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `NguoiDung` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `NhomChiTietLoaiCongViec` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ThueCongViec` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BinhLuan` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `noi_dung` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `ChiTietLoaiCongViec` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `CongViec` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `danh_gia` INTEGER NOT NULL DEFAULT 0,
    MODIFY `hinh_anh` VARCHAR(191) NULL,
    MODIFY `sao_cong_viec` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `LoaiCongViec` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `NguoiDung` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `NhomChiTietLoaiCongViec` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `hinh_anh` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ThueCongViec` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `hoan_thanh` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX `CongViec_ma_chi_tiet_loai_idx` ON `CongViec`(`ma_chi_tiet_loai`);

-- AddForeignKey
ALTER TABLE `CongViec` ADD CONSTRAINT `CongViec_ma_chi_tiet_loai_fkey` FOREIGN KEY (`ma_chi_tiet_loai`) REFERENCES `ChiTietLoaiCongViec`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `BinhLuan` RENAME INDEX `BinhLuan_ma_cong_viec_fkey` TO `BinhLuan_ma_cong_viec_idx`;

-- RenameIndex
ALTER TABLE `BinhLuan` RENAME INDEX `BinhLuan_ma_nguoi_binh_luan_fkey` TO `BinhLuan_ma_nguoi_binh_luan_idx`;

-- RenameIndex
ALTER TABLE `ChiTietLoaiCongViec` RENAME INDEX `ChiTietLoaiCongViec_ma_nhom_chi_tiet_loai_cong_viec_fkey` TO `ChiTietLoaiCongViec_ma_nhom_chi_tiet_loai_cong_viec_idx`;

-- RenameIndex
ALTER TABLE `NhomChiTietLoaiCongViec` RENAME INDEX `NhomChiTietLoaiCongViec_ma_loai_cong_viec_fkey` TO `NhomChiTietLoaiCongViec_ma_loai_cong_viec_idx`;

-- RenameIndex
ALTER TABLE `ThueCongViec` RENAME INDEX `ThueCongViec_ma_cong_viec_fkey` TO `ThueCongViec_ma_cong_viec_idx`;

-- RenameIndex
ALTER TABLE `ThueCongViec` RENAME INDEX `ThueCongViec_ma_nguoi_thue_fkey` TO `ThueCongViec_ma_nguoi_thue_idx`;
