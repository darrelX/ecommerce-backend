import { DarrelBroService } from './darrelBro.service';
import { DarrelBro } from '@prisma/client';
import { Prisma } from '@prisma/client';
export declare class DarrelBroController {
    private readonly darrelBroService;
    constructor(darrelBroService: DarrelBroService);
    getDarrelBro(skip?: string, take?: string, cursor?: string, where?: string, orderBy?: string, page?: string): Promise<{
        total: number;
        page: number;
        data: DarrelBro[];
    }>;
    updateDarrelBro(id: string, data: Prisma.DarrelBroUpdateInput): Promise<DarrelBro>;
    createDarrelBro(darrelBroData: Prisma.DarrelBroCreateInput): Promise<DarrelBro>;
    deleteDarrelBro(id: string): Promise<DarrelBro>;
}
