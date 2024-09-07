import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { randomUUID } from 'crypto'
import { GymsRespository } from '@/repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from '../utils/get-distance-between-coordinates'


interface CheckinServiceInterfaceRequest {
    userId: string,
    gymId: string,
    userLatitude: number,
    userLongitude: number
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

        const gym = await this.gymsRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        const distanceBetweenUserAndGym = getDistanceBetweenCoordinates(
            {latitude: userLatitude, longitude: userLongitude},
            {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
        )

        console.log(distanceBetweenUserAndGym)

        const MAX_DISTANCE_IN_KM = 0.1

        if (distanceBetweenUserAndGym > MAX_DISTANCE_IN_KM) {
            throw new Error()
        }

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
