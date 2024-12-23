import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post()
  createUrl(@Body() { orginalLink }: { orginalLink: string }, @Request() req) {
    return this.urlService.createUrl({
      orginalUrl: orginalLink,
      userId: req.user._id,
    });
  }

  @Patch()
  async getLink(@Body() { id }: { id: string }) {
    console.log('pathrote');
    const orgLink = await this.urlService.clickLink(id);
    if (orgLink) {
      return orgLink;
    } else {
      throw new NotFoundException('Link Not found');
    }
  }

  @Get('/')
  async getLinks(@Request() req) {
    const userId = req.user._id;
    return this.urlService.getUserUrls(userId);
  }

  @Delete('/:id')
  async deleteLink(@Param('id') id: string) {
    this.urlService.deleteLink(id);
  }
}
