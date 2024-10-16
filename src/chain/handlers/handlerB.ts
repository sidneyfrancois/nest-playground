import { Injectable } from '@nestjs/common';
import { Handler } from '../handler';
import { ChainContext } from '../context';

@Injectable()
export class HandlerB extends Handler {
    public handle(context: ChainContext): void {
        context.data['B'] = 'Processed by Handler B';
        console.log(context.data);
        if (this.nextHandler) {
            this.nextHandler.handle(context);
        }
    }
}
