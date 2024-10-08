import { hash } from 'bcryptjs'
import { UsersRespository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { Gym } from '@prisma/client'
import { randomUUID } from 'crypto'
import { GymsRespository } from '@/repositories/gyms-repository'

interface CreateGymServiceInterfaceRequest {
    title: string,
    description: string | null,
    phone: string | null,
    latitude: number,
    longitude: number

}

interface CreateGymServiceResponse {
    gym: Gym
} 

export class CreateGymService {
    constructor (private gymsRepository:GymsRespository) {}

    async execute ({title, description, phone, latitude, longitude} : CreateGymServiceInterfaceRequest): Promise<CreateGymServiceResponse > {
    
        const gym = await this.gymsRepository.create({title, description, phone, latitude, longitude})

        return {
            gym
        } 
    }
}
