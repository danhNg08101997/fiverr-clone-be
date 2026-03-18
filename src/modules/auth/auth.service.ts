import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from '../../common/dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.prisma.nguoiDung.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const isPasswordValid = await bcrypt.compare(password, user.pass_word);

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

  async login(user: { id: number; email: string; name: string; role: string }) {
    const tokens = await this.generateTokens(user);

    const hashedRefresh = await bcrypt.hash(tokens.refreshToken, 10);

    await this.prisma.nguoiDung.update({
      where: { id: user.id },
      data: {
        refresh_token: hashedRefresh,
      },
    });

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return {
      message: 'Đăng nhập thành công',
      ...tokens,
      accessToken: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async register(registerDto: RegisterDto) {
    const {
      name,
      email,
      password,
      phone,
      role,
      birthday,
      gender,
      skill,
      certification,
    } = registerDto;
    const existingUser = await this.prisma.nguoiDung.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('Email đã tồn tại');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.nguoiDung.create({
      data: {
        name,
        email,
        pass_word: hashedPassword,
        phone: phone ?? '',
        role: 'USER',
        birth_day: birthday ?? null,
        gender: gender ?? true,
        skill: skill ?? '',
        certification: certification ?? '',
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        birth_day: true,
        gender: true,
        skill: true,
        certification: true,
      },
    });

    const tokens = await this.generateTokens(newUser);

    const hashedRefresh = await bcrypt.hash(tokens.refreshToken, 10);

    await this.prisma.nguoiDung.update({
      where: { id: newUser.id },
      data: {
        refresh_token: hashedRefresh,
      },
    });

    const payload = {
      sub: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      statusCode: 201,
      message: 'Đăng ký thành công',
      data: {
        ...tokens,
        accessToken,
        user: newUser,
      },
    };
  }

  async getProfile(userId: number) {
    const user = await this.prisma.nguoiDung.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        birth_day: true,
        gender: true,
        role: true,
        skill: true,
        certification: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Người dùng không tồn tại');
    }

    return user;
  }

  private async generateTokens(user: any) {
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: Number(process.env.JWT_ACCESS_EXPIRES) || 900,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: Number(process.env.JWT_REFRESH_EXPIRES) || 604800,
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.prisma.nguoiDung.findUnique({
      where: { id: userId },
    });

    if (!user || !user.refresh_token) {
      throw new UnauthorizedException('Refresh token không hợp lệ');
    }

    const isValid = await bcrypt.compare(refreshToken, user.refresh_token);

    if (!isValid) {
      throw new UnauthorizedException('Refresh token không đúng');
    }

    const tokens = await this.generateTokens(user);

    const hashedRefresh = await bcrypt.hash(tokens.refreshToken, 10);

    await this.prisma.nguoiDung.update({
      where: { id: userId },
      data: {
        refresh_token: hashedRefresh,
      },
    });

    return tokens;
  }

  async logout(userId: number) {
    await this.prisma.nguoiDung.update({
      where: { id: userId },
      data: {
        refresh_token: null,
      },
    });

    return { message: 'Đăng xuất thành công' };
  }
}
