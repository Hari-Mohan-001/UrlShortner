import {  IsNotEmpty, IsString } from "class-validator";

export class CreateUrlDto{
    @IsNotEmpty()
    @IsString()
    orginalUrl:string

    @IsNotEmpty()
    @IsString()
    userId:string
}