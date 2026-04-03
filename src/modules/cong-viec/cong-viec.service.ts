import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCongViecDto } from './dtos/create-cong-viec.dto';
import { QueryLoaiCongViecDto } from '../../common/dtos/query-loai-cong-viec.dto';
import {
  paginationResponse,
  successResponse,
} from '../../common/utils/response.util';
import { UpdateLoaiCongViecDto } from '../loai-cong-viec/dtos/update-loai-cong-viec.dto';
import { UpdateCongViecDto } from './dtos/update-cong-viec.dto';

@Injectable()
export class CongViecService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCongViecDto) {
    const chiTietLoai = await this.prisma.chiTietLoaiCongViec.findUnique({
      where: {
        id: dto.maChiTietLoai,
      },
    });

    if (!chiTietLoai) {
      throw new BadRequestException(
        `maChiTietLoai = ${dto.maChiTietLoai} không tồn tại`,
      );
    }

    const newCongViec = await this.prisma.congViec.create({
      data: {
        ten_cong_viec: dto.tenCongViec,
        danh_gia: dto.danhGia ?? 0,
        gia_tien: dto.giaTien ?? 0,
        hinh_anh: dto.hinhAnh ?? '',
        mo_ta: dto.moTa ?? '',
        mo_ta_ngan: dto.moTaNgan ?? '',
        sao_cong_viec: dto.saoCongViec ?? 0,
        ma_chi_tiet_loai: dto.maChiTietLoai,
        nguoi_tao: dto.nguoiTao ?? 0,
      },
    });

    return successResponse(newCongViec, 'Tạo mới công việc thành công');
  }

  async findAll() {
    const congViecAll = await this.prisma.congViec.findMany();

    return successResponse(congViecAll, 'Lấy danh sách công việc thành công');
  }

  async findOne(id: string) {
    if (Number(id) < 1) {
      throw new BadRequestException(
        'id phải lớn hơn 1',
        HttpStatus.BAD_REQUEST.toString(),
      );
    }

    const congViecTheoId = await this.prisma.congViec.findUnique({
      where: { id: Number(id) },
    });

    return successResponse(congViecTheoId, 'Lấy công việc theo Id thành công');
  }

  async findAllPaginationAndSearch(query: QueryLoaiCongViecDto) {
    const pageIndex = Number(query.pageIndex) || 1;
    const pageSize = Number(query.pageSize) || 10;
    const keyword = query.keyword?.trim() || '';

    if (pageIndex < 1 && pageSize < 1) {
      throw new BadRequestException(
        'pageIndex và pageSize phải lớn hơn 1',
        HttpStatus.BAD_REQUEST.toString(),
      );
    }

    const whereCondition = keyword
      ? {
          ten_cong_viec: { contains: keyword },
        }
      : {};

    const [data, totalRow] = await Promise.all([
      this.prisma.congViec.findMany({
        where: whereCondition,
        skip: (pageIndex - 1) * pageSize,
        take: pageSize,
        orderBy: {
          id: 'asc',
        },
      }),

      this.prisma.congViec.count({
        where: whereCondition,
      }),
    ]);

    return paginationResponse(
      data,
      {
        pageIndex,
        pageSize,
        totalPages: Math.ceil(totalRow / pageSize),
        totalItems: totalRow,
        keyword,
      },
      'Lấy danh công việc phân trang, tìm kiếm thành công',
    );
  }

  async getMenuLoaiCongViec() {
    const menuLoaiCongViec = await this.prisma.loaiCongViec.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        ten_loai_cong_viec: true,
        NhomChiTietLoaiCongViecs: {
          orderBy: { id: 'asc' },
          select: {
            id: true,
            ten_nhom: true,
            hinh_anh: true,
            ma_loai_cong_viec: true,
            ChiTietLoaiCongViecs: {
              orderBy: { id: 'asc' },
              select: {
                id: true,
                ten_chi_tiet: true,
              },
            },
          },
        },
      },
    });

    return successResponse(
      menuLoaiCongViec.map(this.transformApiCongViecRes.bind(this)),
      'Lấy menu công việc thành công',
    );
  }

  async update(id: string, data: UpdateCongViecDto) {
    const isExist = await this.prisma.congViec.findUnique({
      where: { id: Number(id) },
    });

    if (!isExist) {
      throw new NotFoundException(`Không tìm thấy công việc với id = ${id}`);
    }

    const updateData: Record<string, any> = {};

    if (data.tenCongViec !== undefined) {
      updateData.ten_cong_viec = data.tenCongViec;
    }

    if (data.giaTien !== undefined) {
      updateData.gia_tien = data.giaTien;
    }

    if (data.moTa !== undefined) {
      updateData.mo_ta = data.moTa;
    }

    if (data.moTaNgan !== undefined) {
      updateData.mo_ta_ngan = data.moTaNgan;
    }

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException('Không có dữ liệu hợp lệ để cập nhật');
    }

    const congViecUpdated = await this.prisma.congViec.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return successResponse(congViecUpdated, 'Cập nhật công việc thành công');
  }

  async getChiTietLoaiCongViec(maLoaiCongViec: string) {
    const chiTietLoaiCongViec = await this.prisma.loaiCongViec.findMany({
      where: { id: Number(maLoaiCongViec) },
      orderBy: { id: 'asc' },
      select: {
        id: true,
        ten_loai_cong_viec: true,
        NhomChiTietLoaiCongViecs: {
          where: { ma_loai_cong_viec: Number(maLoaiCongViec) },
          orderBy: { id: 'asc' },
          select: {
            id: true,
            ten_nhom: true,
            hinh_anh: true,
            ma_loai_cong_viec: true,
            ChiTietLoaiCongViecs: {
              orderBy: { id: 'asc' },
              select: {
                id: true,
                ten_chi_tiet: true,
              },
            },
          },
        },
      },
    });

    return successResponse(
      chiTietLoaiCongViec.map(this.transformApiCongViecRes.bind(this)),
      'Lấy danh sách chi tiết loại công việc theo maLoaiCongViec thành công',
    );
  }

  async getCongViecTheoChiTietLoai(maChiTietLoai: string) {
    const congViecTheoChiTietLoai = await this.prisma.congViec.findMany({
      where: { ma_chi_tiet_loai: Number(maChiTietLoai) },
      include: {
        NguoiDung: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        ChiTietLoaiCongViec: {
          select: {
            id: true,
            ten_chi_tiet: true,
            NhomChiTietLoaiCongViec: {
              select: {
                id: true,
                ten_nhom: true,
                LoaiCongViec: {
                  select: {
                    id: true,
                    ten_loai_cong_viec: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return successResponse(
      congViecTheoChiTietLoai.map(
        this.transformApiCongViecTheoChiTietLoaiRes.bind(this),
      ),
      'Lấy công việc theo mã chi tiết loại thành công',
    );
  }

  async getCongVietTheoTen(tenCongViec: string) {
    const congViecTheoTen = await this.prisma.congViec.findMany({
      where: { ten_cong_viec: { contains: tenCongViec } },
      include: {
        NguoiDung: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        ChiTietLoaiCongViec: {
          select: {
            id: true,
            ten_chi_tiet: true,
            NhomChiTietLoaiCongViec: {
              select: {
                id: true,
                ten_nhom: true,
                LoaiCongViec: {
                  select: {
                    id: true,
                    ten_loai_cong_viec: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return successResponse(
      congViecTheoTen.map(
        this.transformApiCongViecTheoChiTietLoaiRes.bind(this),
      ),
      'Lấy công việc theo tên thành công',
    );
  }

  async getCongViecTheoMaCongViec(maCongViec: string) {
    const congViecTheoMaCongViec = await this.prisma.congViec.findUnique({
      where: { id: Number(maCongViec) },
      include: {
        NguoiDung: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        ChiTietLoaiCongViec: {
          select: {
            id: true,
            ten_chi_tiet: true,
            NhomChiTietLoaiCongViec: {
              select: {
                id: true,
                ten_nhom: true,
                LoaiCongViec: {
                  select: {
                    id: true,
                    ten_loai_cong_viec: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return successResponse(
      this.transformApiCongViecTheoChiTietLoaiRes.bind(congViecTheoMaCongViec),
      'Lấy công việc theo mã công việc thành công',
    );
  }

  private transformApiCongViecRes(loaiCongViec: {
    id: number;
    ten_loai_cong_viec: string;
    NhomChiTietLoaiCongViecs: {
      id: number;
      ten_nhom: string;
      hinh_anh: string | null;
      ma_loai_cong_viec: number;
      ChiTietLoaiCongViecs: {
        id: number;
        ten_chi_tiet: string;
      }[];
    }[];
  }) {
    return {
      id: loaiCongViec.id,
      tenLoaiCongViec: loaiCongViec.ten_loai_cong_viec,
      dsNhomChiTietLoai: loaiCongViec.NhomChiTietLoaiCongViecs.map((nhom) => ({
        id: nhom.id,
        tenNhom: nhom.ten_nhom,
        hinhAnh: nhom.hinh_anh,
        maLoaiCongViec: nhom.ma_loai_cong_viec,
        dsChiTietLoai: nhom.ChiTietLoaiCongViecs.map((chiTiet) => ({
          id: chiTiet.id,
          tenChiTiet: chiTiet.ten_chi_tiet,
        })),
      })),
    };
  }

  private transformApiCongViecTheoChiTietLoaiRes(congViec: {
    id: number;
    ten_cong_viec: string;
    danh_gia: number;
    gia_tien: number;
    nguoi_tao: number;
    hinh_anh: string;
    mo_ta: string;
    ma_chi_tiet_loai: number;
    mo_ta_ngan: string;
    sao_cong_viec: number;
    ChiTietLoaiCongViec: {
      ten_chi_tiet: string;
      NhomChiTietLoaiCongViec: {
        ten_nhom: string;
        LoaiCongViec: {
          ten_loai_cong_viec: string;
        };
      };
    };
    NguoiDung: {
      name: string;
      avatar: string;
    };
  }) {
    return {
      id: congViec.id,
      congViec: {
        id: congViec.id,
        tenCongViec: congViec.ten_cong_viec,
        danhGia: congViec.danh_gia,
        giaTien: congViec.gia_tien,
        nguoiTao: congViec.nguoi_tao,
        hinhAnh: congViec.hinh_anh,
        moTa: congViec.mo_ta,
        maChiTietLoaiCongViec: congViec.ma_chi_tiet_loai,
        moTaNgan: congViec.mo_ta_ngan,
        saoCongViec: congViec.sao_cong_viec,
      },
      tenLoaiCongViec:
        congViec.ChiTietLoaiCongViec.NhomChiTietLoaiCongViec.LoaiCongViec
          .ten_loai_cong_viec,
      tenNhomChiTietLoai:
        congViec.ChiTietLoaiCongViec.NhomChiTietLoaiCongViec.ten_nhom,
      tenChiTietLoai: congViec.ChiTietLoaiCongViec.ten_chi_tiet,
      tenNguoiTao: congViec.NguoiDung.name,
      avatar: congViec.NguoiDung.avatar,
    };
  }
}
