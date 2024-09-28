
import { Gym} from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GymsRespository } from '@/repositories/gyms-repository'


interface FetchNearbyGymsServiceInterfaceRequest {
    userLatitude: number
    userLongitude: number
}

interface FetchNearbyGymsServiceInterfaceResponse {
    gyms: Gym[]
} 

export class FetchNearbyGymsService {
    constructor (private gymsRepository: GymsRespository) {}

    async execute ({userLatitude, userLongitude}: FetchNearbyGymsServiceInterfaceRequest): Promise<FetchNearbyGymsServiceInterfaceResponse> {
        const gyms = await this.gymsRepository.findManyNearby({latitude: userLatitude, longitude: userLongitude})
        
        return {
            gyms
        } 
    }
}
