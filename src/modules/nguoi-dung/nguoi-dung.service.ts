import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { successResponse } from '../../common/utils/response.util';
import { UpdateNguoiDungDto } from './dtos/update-nguoi-dung.dto';
import { Prisma } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/client';

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
    if (req.role !== undefined) {
      updateData.role = req.role.trim();
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
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
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
    const nguoiDungTheoTen = await this.prisma.nguoiDung.findMany({
      where: {
        name: {
          contains: tenNguoiDung,
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
