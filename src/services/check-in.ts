import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { randomUUID } from 'crypto'


interface CheckinServiceInterfaceRequest {
    userId: string,
    gymId: string,

}

interface CheckinServiceInterfaceResponse {
    checkin: CheckIn
} 

export class CheckInService {
    constructor (private checkinsRepository: CheckInsRepository) {}

    async execute ({userId, gymId} : CheckinServiceInterfaceRequest): Promise<CheckinServiceInterfaceResponse> {
    
        const checkin = await this.checkinsRepository.create ({
            user_id: userId,
            gym_id: gymId
        })

        return {
            checkin
        } 
    }
}
