import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateThueCongViecDto } from './dtos/create-thue-cong-viec.dto';

@Injectable()
export class ThueCongViecService {
  constructor(private readonly prisma: PrismaService) {}

}
