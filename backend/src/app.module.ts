import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UrlModule } from './url/url.module';

@Module({
  imports: [
    // Make sure ConfigModule is imported first
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config service global
    }),

    // MongooseModule uses ConfigService to get the Mongo connection string 
    // can use process.env also
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_CONNECTION_STRING'),
      }),
    }),
    UsersModule,
    AuthModule,
    UrlModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
