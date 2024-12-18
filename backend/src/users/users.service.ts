import { Injectable } from '@nestjs/common';
import { User,UserDocument } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async findUserByEmail(email:string) : Promise<UserDocument | null>{
        return this.userModel.findOne({email}).exec()
    }
    
   async createUser(createUserDto: CreateUserDto) : Promise<UserDocument>{
        createUserDto.password = bcrypt.hashSync(createUserDto.password, 10)
          const createdUser = new this.userModel(createUserDto)
          await createdUser.save()
          return createdUser
    }

    async findUserById(userId:string) : Promise<UserDocument | null>{
        console.log('err',userId);
        
        return this.userModel.findOne({_id:userId}).exec()
    }
}
