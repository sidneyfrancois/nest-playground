import { Injectable } from '@nestjs/common';
import { Handler } from './handler';
import { HandlerB } from './handlers/handlerB';
import { HandlerC } from './handlers/handlerC';
import { HandlerA } from './handlers/handlerA';

@Injectable()
export class ChainFactory {
  private readonly handlerMap: { [key: string]: Handler };

  constructor(handlerA: HandlerA, handlerB: HandlerB, handlerC: HandlerC) {
    // Initialize a mapping of handlers
    this.handlerMap = {
      A: handlerA,
      B: handlerB,
      C: handlerC,
    };
  }

  public createChain(handlerOrder: string[]): Handler | null {
    let firstHandler: Handler | null = null;
    let previousHandler: Handler | null = null;

    handlerOrder.forEach((handlerType) => {
      const currentHandler = this.handlerMap[handlerType];
      if (currentHandler) {
        if (!firstHandler) {
          firstHandler = currentHandler; // Set the first handler
        }

        if (previousHandler) {
          previousHandler.setNext(currentHandler); // Link the previous handler to the current
        }

        previousHandler = currentHandler; // Move to the current handler
      }
    });

    return firstHandler; // Return the first handler in the chain
  }
}
