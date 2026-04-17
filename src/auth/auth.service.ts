import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dtos/register.dto';
import { ConfigService } from '@nestjs/config';
import { UserRole } from '../common/enums/role.enum';
import { successResponse } from '../common/utils/response.util';
import { AuthUserPayload } from '../common/types/authUser.type';

@Injectable()
export class AuthService {
  private readonly saltRounds: number;
  private readonly accessExpiresIn: number;
  private readonly refreshExpiresIn: number;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.saltRounds = Number(
      this.configService.get<number>('BCRYPT_SALT_ROUNDS', 10),
    );
    this.accessExpiresIn = Number(
      this.configService.get<number>('JWT_ACCESS_EXPIRES', 900),
    );
    this.refreshExpiresIn = Number(
      this.configService.get<number>('JWT_REFRESH_EXPIRES', 604800),
    );
  }
  async validateUser(email: string, password: string) {
    const user = await this.prisma.nguoiDung.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.prisma.nguoiDung.findUnique({
      where: { email: registerDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email đã tồn tại');
    }
    const hashedPassword = await bcrypt.hash(
      registerDto.password,
      this.saltRounds,
    );

    const newUser = await this.prisma.nguoiDung.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        password: hashedPassword,
        phone: registerDto.phone,
        birthday: registerDto.birthday,
        gender: registerDto.gender,
        skill: registerDto.skill,
        certification: registerDto.certification,
        role: UserRole.USER_ENUM,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        birthday: true,
        gender: true,
        skill: true,
        certification: true,
      },
    });

    const tokens = await this.generateTokens({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });

    await this.saveRefreshToken(newUser.id, tokens.refreshToken);

    return successResponse(
      {
        user: newUser,
        tokens,
      },
      'Đăng ký thành công',
      201,
    );
  }

  async login(user: AuthUserPayload) {
    const tokens = await this.generateTokens(user);

    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return successResponse(
      {
        user,
        tokens,
      },
      'Đăng nhập thành công',
    );
  }

  async getProfile(userId: number) {
    const user = await this.prisma.nguoiDung.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        birthday: true,
        gender: true,
        role: true,
        skill: true,
        certification: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Người dùng không tồn tại');
    }

    return successResponse({ user }, 'Lấy thông tin người dùng thành công');
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.prisma.nguoiDung.findUnique({
      where: { id: userId },
    });

    if (!user || !user.refresh_token) {
      throw new UnauthorizedException('Refresh token không hợp lệ');
    }

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET', 'secretKey'),
      });

      if (payload.sub !== userId) {
        throw new UnauthorizedException('Refresh token không đúng người dùng');
      }
    } catch {
      throw new UnauthorizedException(
        'Refresh token hết hạn hoặc không hợp lệ',
      );
    }

    const isValid = await bcrypt.compare(refreshToken, user.refresh_token);

    if (!isValid) {
      throw new UnauthorizedException('Refresh token không đúng');
    }

    const tokens = await this.generateTokens({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return successResponse(
      {
        tokens,
      },
      'Làm mới phiên đăng nhập thành công',
    );
  }

  async logout(userId: number) {
    const user = await this.prisma.nguoiDung.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      throw new UnauthorizedException('Người dùng không tồn tại');
    }

    await this.prisma.nguoiDung.update({
      where: { id: userId },
      data: {
        refresh_token: null,
      },
    });

    return successResponse(null, 'Đăng xuất thành công');
  }

  private async saveRefreshToken(userId: number, refreshToken: string) {
    const hashedRefresh = await bcrypt.hash(refreshToken, this.saltRounds);

    await this.prisma.nguoiDung.update({
      where: { id: userId },
      data: {
        refresh_token: hashedRefresh,
      },
    });
  }

  private async generateTokens(user: AuthUserPayload) {
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.accessExpiresIn,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.refreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }
}
