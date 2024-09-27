import { Injectable } from '@nestjs/common';
import { ChainContext } from './context';

@Injectable()
export abstract class Handler {
  protected nextHandler: Handler | null = null;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public abstract handle(context: ChainContext): void;
}
