import { Injectable } from '@nestjs/common';
import { ChainFactory } from './chain.factory';
import { ChainContext } from './context';

@Injectable()
export class ProcessHandlerUseCase {
    constructor(private readonly handlerFactory: ChainFactory) {}

    public processRequest(data: ChainContext, chainOrder: string[]) {
        const handlerChain = this.handlerFactory.createChain(chainOrder);
        if (!handlerChain) return 'no handlers found';
        handlerChain.handle(data);
    }
}
