import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { successResponse } from '../../common/utils/response.util';
import { UpdateNguoiDungDto } from './dtos/update-nguoi-dung.dto';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NguoiDungService {
  private readonly saltRounds: number;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.saltRounds = Number(
      this.configService.get<number>('BCRYPT_SALT_ROUNDS', 10),
    );
  }

  async findAll() {
    const nguoiDungAll = await this.prisma.nguoiDung.findMany();

    return successResponse(
      nguoiDungAll.map(this.transformNguoiDungRes.bind(this)),
      'Lấy danh sách người dùng thành công',
    );
  }

  async update(id: string, req: UpdateNguoiDungDto) {
    const isExist = await this.prisma.nguoiDung.findUnique({
      where: { id: Number(id) },
    });

    if (!isExist) {
      throw new NotFoundException(`Không tìm thấy người dùng với id = ${id}`);
    }

    const updateData: Record<string, any> = {};

    return null;
  }

  private transformNguoiDungRes(nguoiDung: {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    birthday: string;
    avatar: string;
    gender: string;
    role: string;
    skill: string[];
    certification: string[];
    booking_job: number[];
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
