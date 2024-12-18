import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from "@nestjs/common";
import { CreateUrlDto } from "./dto/create.url.dto";
import { UrlService } from "./url.service";
import { AuthGuard } from "src/auth/guard/auth.guard";

@UseGuards(AuthGuard)
@Controller('url')

export class UrlController{
    constructor(private urlService:UrlService){} 

    @Post()
      createUrl(@Body(ValidationPipe) urlDto: CreateUrlDto, @Request() req){
        console.log('postrote');
        
          return this.urlService.createUrl({orginalUrl: urlDto.orginalUrl , userId:req.user._id})
      }

      @Get()
      async getUrls(@Request() req) {
        const userId = req.user._id;
        return this.urlService.getUserUrls(userId);
    }
    

}