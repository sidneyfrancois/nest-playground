import { Controller, Post } from '@nestjs/common';
import { ProcessHandlerUseCase } from './process-handler.usecase';

@Controller('chain')
export class ChainController {
    constructor(
        private readonly processHandlerUseCase: ProcessHandlerUseCase,
    ) {}

    @Post()
    public triggerProcess() {
        return this.processHandlerUseCase.processRequest(
            {
                data: {
                    A: 'Unprocessed A',
                    B: 'Unprocessed B',
                    C: 'Unprocessed C',
                },
            },
            ['C', 'A', 'B'],
        );
    }
}
