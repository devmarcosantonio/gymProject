import { UsersRespository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'


interface GetUserProfileServiceInterfaceRequest {
    userId: string
}

interface GetUserProfileServiceInterfaceResponse {
    user: User
} 

export class GetUserProfileService {
    constructor (private usersRepository: UsersRespository) {}

    async execute ({userId} : GetUserProfileServiceInterfaceRequest): Promise<GetUserProfileServiceInterfaceResponse> {
    
        const user = await this.usersRepository.findById(userId)
    
        if (!user) {
            throw new ResourceNotFoundError()
        }

        return {
            user
        } 
    }
}
