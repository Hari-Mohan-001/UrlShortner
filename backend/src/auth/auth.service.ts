import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export type SignInResult = { _id: string; accessToken: string; name: string };

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(inputData: CreateUserDto): Promise<boolean> {
    const existingUser = await this.userService.findUserByEmail(
      inputData.email,
    );
    if (existingUser) {
      throw new ConflictException('This email already exist');
    }
    const newUser = await this.userService.createUser(inputData);
    if (!newUser) {
      throw new Error('User Registration failed');
    }
    return true;
  }

  async login(loginUserDto: LoginUserDto): Promise<SignInResult> {
    const user = await this.validate(loginUserDto);

    if (!user) {
      throw new UnauthorizedException();
    }
    return await this.generateToken(user._id, user.name);
  }

  async validate(loginUserDto: LoginUserDto) {
    const user = await this.userService.findUserByEmail(loginUserDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await this.comparePassword(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      _id: user._id.toString(),
      name: user.name,
    };
  }

  async comparePassword(password: string, hashPassword: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  async generateToken(id: string, name: string): Promise<SignInResult> {
    const payLoad = { _id: id, name: name };
    const accessToken = await this.jwtService.signAsync(payLoad);
    return { _id: id, accessToken, name };   
  }
}
