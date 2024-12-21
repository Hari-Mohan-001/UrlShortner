import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "src/users/dto/login-user.dto";


@Controller("auth")

export class AuthController{

    constructor(private readonly authService:AuthService){}

    @Post('signup')
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto ){
         return this.authService.register(createUserDto)
    }

    @Post('login')
    async loginUser(@Body(ValidationPipe) loginUserDto : LoginUserDto){
        return this.authService.login(loginUserDto)
    }
}