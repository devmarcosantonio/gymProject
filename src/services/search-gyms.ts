
import { Gym} from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GymsRespository } from '@/repositories/gyms-repository'


interface SearchGymByTitleServiceInterfaceRequest {
    query: string
    page: number
}

interface SearchGymByTitleServiceInterfaceResponse {
    gyms: Gym[]
} 

export class SearchGymByTitleService {
    constructor (private GymsRepository: GymsRespository) {}

    async execute ({query, page}: SearchGymByTitleServiceInterfaceRequest): Promise<SearchGymByTitleServiceInterfaceResponse> {
        const gyms = await this.GymsRepository.searchMany(query, page)
        
        return {
            gyms
        } 
    }
}
