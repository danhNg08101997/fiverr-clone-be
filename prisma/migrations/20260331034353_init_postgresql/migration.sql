-- CreateTable
CREATE TABLE "NguoiDung" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "birthday" TEXT,
    "gender" BOOLEAN,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "skill" JSONB,
    "certification" JSONB,
    "refresh_token" TEXT,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NguoiDung_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThueCongViec" (
    "id" SERIAL NOT NULL,
    "ma_cong_viec" INTEGER NOT NULL,
    "ma_nguoi_thue" INTEGER NOT NULL,
    "ngay_thue" TIMESTAMP(3) NOT NULL,
    "hoan_thanh" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ThueCongViec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CongViec" (
    "id" SERIAL NOT NULL,
    "ten_cong_viec" TEXT NOT NULL,
    "danh_gia" INTEGER NOT NULL DEFAULT 0,
    "gia_tien" INTEGER NOT NULL,
    "nguoi_tao" INTEGER NOT NULL,
    "hinh_anh" TEXT,
    "mo_ta" TEXT NOT NULL,
    "mo_ta_ngan" TEXT NOT NULL,
    "sao_cong_viec" INTEGER NOT NULL DEFAULT 0,
    "ma_chi_tiet_loai" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CongViec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NhomChiTietLoaiCongViec" (
    "id" SERIAL NOT NULL,
    "ten_nhom" TEXT NOT NULL,
    "hinh_anh" TEXT,
    "ma_loai_cong_viec" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NhomChiTietLoaiCongViec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChiTietLoaiCongViec" (
    "id" SERIAL NOT NULL,
    "ten_chi_tiet" TEXT NOT NULL,
    "ma_nhom_chi_tiet_loai_cong_viec" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChiTietLoaiCongViec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoaiCongViec" (
    "id" SERIAL NOT NULL,
    "ten_loai_cong_viec" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoaiCongViec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BinhLuan" (
    "id" SERIAL NOT NULL,
    "ma_cong_viec" INTEGER NOT NULL,
    "ma_nguoi_binh_luan" INTEGER NOT NULL,
    "ngay_binh_luan" TIMESTAMP(3) NOT NULL,
    "noi_dung" TEXT NOT NULL,
    "sao_binh_luan" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BinhLuan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NguoiDung_email_key" ON "NguoiDung"("email");

-- CreateIndex
CREATE INDEX "ThueCongViec_ma_cong_viec_idx" ON "ThueCongViec"("ma_cong_viec");

-- CreateIndex
CREATE INDEX "ThueCongViec_ma_nguoi_thue_idx" ON "ThueCongViec"("ma_nguoi_thue");

-- CreateIndex
CREATE INDEX "CongViec_ma_chi_tiet_loai_idx" ON "CongViec"("ma_chi_tiet_loai");

-- CreateIndex
CREATE INDEX "CongViec_nguoi_tao_idx" ON "CongViec"("nguoi_tao");

-- CreateIndex
CREATE INDEX "NhomChiTietLoaiCongViec_ma_loai_cong_viec_idx" ON "NhomChiTietLoaiCongViec"("ma_loai_cong_viec");

-- CreateIndex
CREATE INDEX "ChiTietLoaiCongViec_ma_nhom_chi_tiet_loai_cong_viec_idx" ON "ChiTietLoaiCongViec"("ma_nhom_chi_tiet_loai_cong_viec");

-- CreateIndex
CREATE INDEX "BinhLuan_ma_cong_viec_idx" ON "BinhLuan"("ma_cong_viec");

-- CreateIndex
CREATE INDEX "BinhLuan_ma_nguoi_binh_luan_idx" ON "BinhLuan"("ma_nguoi_binh_luan");

-- AddForeignKey
ALTER TABLE "ThueCongViec" ADD CONSTRAINT "ThueCongViec_ma_nguoi_thue_fkey" FOREIGN KEY ("ma_nguoi_thue") REFERENCES "NguoiDung"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThueCongViec" ADD CONSTRAINT "ThueCongViec_ma_cong_viec_fkey" FOREIGN KEY ("ma_cong_viec") REFERENCES "CongViec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CongViec" ADD CONSTRAINT "CongViec_ma_chi_tiet_loai_fkey" FOREIGN KEY ("ma_chi_tiet_loai") REFERENCES "ChiTietLoaiCongViec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CongViec" ADD CONSTRAINT "CongViec_nguoi_tao_fkey" FOREIGN KEY ("nguoi_tao") REFERENCES "NguoiDung"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NhomChiTietLoaiCongViec" ADD CONSTRAINT "NhomChiTietLoaiCongViec_ma_loai_cong_viec_fkey" FOREIGN KEY ("ma_loai_cong_viec") REFERENCES "LoaiCongViec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChiTietLoaiCongViec" ADD CONSTRAINT "ChiTietLoaiCongViec_ma_nhom_chi_tiet_loai_cong_viec_fkey" FOREIGN KEY ("ma_nhom_chi_tiet_loai_cong_viec") REFERENCES "NhomChiTietLoaiCongViec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BinhLuan" ADD CONSTRAINT "BinhLuan_ma_cong_viec_fkey" FOREIGN KEY ("ma_cong_viec") REFERENCES "CongViec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BinhLuan" ADD CONSTRAINT "BinhLuan_ma_nguoi_binh_luan_fkey" FOREIGN KEY ("ma_nguoi_binh_luan") REFERENCES "NguoiDung"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
