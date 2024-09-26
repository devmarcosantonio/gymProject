
import { CheckIn} from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { CheckInsRepository } from '@/repositories/check-ins-repository'


interface FetchUserCheckInsHistoryServiceInterfaceRequest {
    userId: string
}

interface FetchUserCheckInsHistoryServiceInterfaceResponse {
    checkIns: CheckIn[]
} 

export class FetchUserCheckInsHistoryService {
    constructor (private checkInsRepository: CheckInsRepository) {}

    async execute ({userId, page}: {userId : string, page: number}): Promise<FetchUserCheckInsHistoryServiceInterfaceResponse> {
    
        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)
        const checkInsPage = checkIns.slice((page-1) * 20, page * 20)
                       
        return {checkIns: checkInsPage} 
    }
}
