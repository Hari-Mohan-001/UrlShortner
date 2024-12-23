import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/users/users.schema";

export type UrlDocument = HydratedDocument<Url>

@Schema({versionKey:false , minimize:false , timestamps:true})

export class Url {
    @Prop({type:String , required:true })
    orginalUrl :string

    @Prop({type:String , required:true , unique:true})
    shortUrl:string

    @Prop({type:Types.ObjectId, ref:"User"})
    userId:User

    @Prop({type:Number, default:0})
    click:number;
}

export const UrlSchema = SchemaFactory.createForClass(Url)