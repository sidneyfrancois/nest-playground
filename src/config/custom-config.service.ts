import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomConfigService {
    constructor(private readonly configService: ConfigService) {
        console.log('NODE_ENV:', process.env.NODE_ENV);
    }

    get app() {
        return {
            nodeEnv: this.configService.get<string>('NODE_ENV'),
        };
    }
}
