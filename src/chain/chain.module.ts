import { Module } from '@nestjs/common';
import { ProcessHandlerUseCase } from './process-handler.usecase';
import { HandlerA } from './handlers/handlerA';
import { HandlerB } from './handlers/handlerB';
import { HandlerC } from './handlers/handlerC';
import { ChainController } from './chain.controller';
import { ChainFactory } from './chain.factory';

@Module({
    controllers: [ChainController],
    providers: [
        ProcessHandlerUseCase,
        HandlerA,
        HandlerB,
        HandlerC,
        ChainFactory,
    ],
})
export class ChainModule {}
