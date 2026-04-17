import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  paginationResponse,
  successResponse,
} from '../common/utils/response.util';
import { UpdateNguoiDungDto } from './dtos/update-nguoi-dung.dto';
import { Prisma } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/client';
import { QueryPaginationAndSearch } from '../common/dtos/query-pagination-and-search.dto';

@Injectable()
export class NguoiDungService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly nguoiDungPublicSelect = {
    id: true,
    name: true,
    email: true,
    phone: true,
    birthday: true,
    avatar: true,
    gender: true,
    role: true,
    skill: true,
    certification: true,
  };

  async findAll() {
    const nguoiDungAll = await this.prisma.nguoiDung.findMany();

    return successResponse(
      nguoiDungAll.map(this.transformNguoiDungRes.bind(this)),
      'Lấy danh sách người dùng thành công',
    );
  }

  async update(id: number, req: UpdateNguoiDungDto) {
    const updateData: Prisma.NguoiDungUpdateInput = {};

    if (req.name !== undefined) {
      updateData.name = req.name.trim();
    }
    if (req.email !== undefined) {
      updateData.email = req.email.trim();
    }
    if (req.phone !== undefined) {
      updateData.phone = req.phone.trim();
    }
    if (req.birthday !== undefined) {
      updateData.birthday = req.birthday;
    }
    if (req.gender !== undefined) {
      updateData.gender = req.gender;
    }
    if (req.role !== undefined) {
      updateData.role = req.role.trim();
    }
    if (req.skill !== undefined) {
      updateData.skill = req.skill;
    }
    if (req.certification !== undefined) {
      updateData.certification = req.certification;
    }

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException('Không có dữ liệu hợp lệ để cập nhật');
    }

    try {
      const updated = await this.prisma.nguoiDung.update({
        where: { id },
        data: updateData,
      });

      return successResponse(updated, 'Cập nhật người dùng thành công');
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new NotFoundException(`Không tìm thấy người dùng với id = ${id}`);
      }
      return error;
    }
  }

  async delete(id: number) {
    try {
      const deletedNguoiDung = await this.prisma.nguoiDung.delete({
        where: { id },
      });
      return successResponse(deletedNguoiDung, 'Xóa người dùng thành công');
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Không tìm thấy người dùng với id = ${id}`);
      }

      throw error;
    }
  }

  async findOne(id: number) {
    const nguoiDungTheoId = await this.prisma.nguoiDung.findUnique({
      where: { id },
      select: this.nguoiDungPublicSelect,
    });

    if (!nguoiDungTheoId) {
      throw new NotFoundException(`Không tìm thấy người dùng với id = ${id}`);
    }

    return successResponse(
      this.transformNguoiDungRes(nguoiDungTheoId),
      'Tìm kiếm người dùng theo Id thành công',
    );
  }

  async getNguoiDungTheoTen(tenNguoiDung: string) {
    const keyword = tenNguoiDung.trim();

    if (!keyword) {
      return successResponse([], 'Từ khóa tìm kiếm rỗng');
    }

    const nguoiDungTheoTen = await this.prisma.nguoiDung.findMany({
      where: {
        name: {
          contains: keyword,
          mode: 'insensitive',
        },
      },
      select: this.nguoiDungPublicSelect,
    });

    return successResponse(
      nguoiDungTheoTen.map(this.transformNguoiDungRes.bind(this)),
      'Lấy người dùng theo tên người dùng thành công',
    );
  }

  async findAllPaginationAndSearch(query: QueryPaginationAndSearch) {
    const pageIndex = query.pageIndex || 1;
    const pageSize = query.pageSize || 10;
    const keyword = query.keyword?.trim() || '';

    if (pageIndex < 1 || pageSize < 1) {
      throw new BadRequestException(
        'pageIndex và pageSize không nhỏ hơn 1',
        HttpStatus.BAD_REQUEST.toString(),
      );
    }

    const whereCondition: Prisma.NguoiDungWhereInput = keyword
      ? {
          name: {
            contains: keyword,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {};

    const [data, totalRow] = await Promise.all([
      this.prisma.nguoiDung.findMany({
        where: whereCondition,
        skip: (pageIndex - 1) * pageSize,
        take: pageSize,
        orderBy: {
          id: 'asc',
        },
      }),

      this.prisma.nguoiDung.count({
        where: whereCondition,
      }),
    ]);

    return paginationResponse(
      data.map(this.transformNguoiDungRes.bind(this)),
      {
        pageIndex,
        pageSize,
        totalItems: totalRow,
        totalPages: Math.ceil(totalRow / pageSize),
        keyword,
      },
      'Lấy danh sách nhóm chi tiết loại công việc phân trang, tìm kiếm thành công',
    );
  }

  private transformNguoiDungRes(nguoiDung: {
    id: number;
    name: string;
    email: string;
    password?: string | null;
    phone?: string | null;
    birthday?: string | null;
    avatar?: string | null;
    gender?: boolean | null;
    role: string;
    skill?: string[] | JsonValue;
    certification?: string[] | JsonValue;
    booking_job?: number[];
  }) {
    return {
      id: nguoiDung.id,
      name: nguoiDung.name,
      email: nguoiDung.email,
      password: '',
      phone: nguoiDung.phone,
      birthday: nguoiDung.birthday,
      avatar: nguoiDung.avatar ?? '',
      gender: nguoiDung.gender ? 'Male' : 'Female',
      role: nguoiDung.role,
      skill: nguoiDung.skill ?? [],
      certification: nguoiDung.certification ?? [],
      bookingJob: nguoiDung.booking_job ?? [],
    };
  }
}
