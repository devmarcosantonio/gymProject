import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { randomUUID } from 'crypto'
import { GymsRespository } from '@/repositories/gyms-repository'


interface CheckinServiceInterfaceRequest {
    userId: string,
    gymId: string,
    userLatitude: Number,
    userLongitude: Number

}

interface CheckinServiceInterfaceResponse {
    checkin: CheckIn
} 

export class CheckInService {
    constructor (
        private checkinsRepository: CheckInsRepository,
        private gymsRepository: GymsRespository
    ) {}

    async execute ({userId, gymId, userLatitude, userLongitude} : CheckinServiceInterfaceRequest): Promise<CheckinServiceInterfaceResponse> {

        const gym = this.gymsRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        // calcular a distancia

        const checkinInOnSameDate = await this.checkinsRepository.findByUserIdOnDate(userId, new Date())

        if (checkinInOnSameDate) {
            throw new Error()
        }
    
        const checkin = await this.checkinsRepository.create ({
            user_id: userId,
            gym_id: gymId
        })

        return {
            checkin
        } 
    }
}
