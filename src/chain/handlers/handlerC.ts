import { Injectable } from '@nestjs/common';
import { Handler } from '../handler';
import { ChainContext } from '../context';

@Injectable()
export class HandlerC extends Handler {
  public handle(context: ChainContext): void {
    context.data['C'] = 'Processed by Handler C';
    console.log(context.data);
    if (this.nextHandler) {
      this.nextHandler.handle(context);
    }
  }
}
