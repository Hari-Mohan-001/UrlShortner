import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url, UrlDocument } from './url.schema';
import { Model } from 'mongoose';
import { CreateUrlDto } from './dto/create.url.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(Url.name) private UrlModel: Model<UrlDocument>,
    private userService: UsersService,
  ) {}

  async createUrl({ orginalUrl, userId }: CreateUrlDto): Promise<UrlDocument> {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    const shortUrl = await this.createShortUrl();
    return await this.UrlModel.create({ orginalUrl, shortUrl, userId });
  }

  private async createShortUrl(): Promise<string> {
    let shortLink: string;
    let isUnique = false;

    while (!isUnique) {
      const { nanoid } = require('nanoid');

      const nanoId = nanoid(7);
      shortLink = `${process.env.CLIENT_URL}/${nanoId}`;
      const existingLink = await this.UrlModel.findOne({ shortLink });
      if (!existingLink) {
        isUnique = true;
      }
    }

    return shortLink;
  }

  async getUserUrls(userId: string): Promise<UrlDocument[]> {
    return await this.UrlModel.find({ userId });
  }

  async clickLink(id: string): Promise<string> {
    const link = await this.UrlModel.findByIdAndUpdate(id, {
      $inc: { click: 1 },
    });
    console.log(link);

    if (link) {
      return link.orginalUrl;
    }
  }

  async deleteLink(id: string) {
    await this.UrlModel.findByIdAndDelete(id);
  }
}
