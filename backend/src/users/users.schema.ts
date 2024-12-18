import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema({versionKey:false , minimize:false , timestamps:true})

export class User{
    @Prop({required:true ,type:String})
    name:string

    @Prop({required:true , unique:true ,type:String}) 
    email:string

    @Prop({required:true, type:String})
    password:string
}

export const UserSchema = SchemaFactory.createForClass(User)