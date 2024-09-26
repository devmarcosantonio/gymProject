
import { CheckIn} from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { CheckInsRepository } from '@/repositories/check-ins-repository'


interface GetUserMetricsServiceInterfaceRequest {
    userId: string
}

interface GetUserMetricsServiceInterfaceResponse {
    checkInsCount: number
} 

export class GetUserMetricsService {
    constructor (private checkInsRepository: CheckInsRepository) {}

    async execute ({userId}: GetUserMetricsServiceInterfaceRequest): Promise<GetUserMetricsServiceInterfaceResponse> {
        const checkInsCount = await this.checkInsRepository.countByUserId(userId)

        return {checkInsCount} 
    }
}
