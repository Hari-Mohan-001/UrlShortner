import { Module } from "@nestjs/common";
import { UrlController } from "./url.controller";
import { UrlService } from "./url.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Url, UrlSchema } from "./url.schema";
import { UsersModule } from "src/users/users.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports:[
        MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]),
        UsersModule,
        AuthModule
    ],
    providers:[UrlService],
    controllers:[UrlController]
})
export class UrlModule {

}   