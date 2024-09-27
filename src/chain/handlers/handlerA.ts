import { Injectable } from '@nestjs/common';
import { Handler } from '../handler';
import { ChainContext } from '../context';

@Injectable()
export class HandlerA extends Handler {
  public handle(context: ChainContext): void {
    context.data['A'] = 'Processed by Handler A';
    console.log(context.data);
    if (this.nextHandler) {
      this.nextHandler.handle(context);
    }
  }
}
