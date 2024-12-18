import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('users')   /// Going to handle the users route ie /users/
export class UsersController {
    @Get() // get all users
    findAll(){
        return [{}]
    }

    @Get(":id")
    findOne(@Param("id") id:string){
        return {id}
    }

    @Post()  //create new user
    createUser(@Body() user:{}){
        return user
    }
}
