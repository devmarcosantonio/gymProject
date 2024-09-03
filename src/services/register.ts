import { hash } from 'bcryptjs'
import { UsersRespository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'
import { randomUUID } from 'crypto'

interface registerServiceInterfaceRequest {
    name: string
    email: string
    password: string
}

interface ResgisterServiceResponse {
    user: User
} 

export class RegisterService {
    constructor (private usersRepository: UsersRespository) {}

    async execute ({name, email, password} : registerServiceInterfaceRequest): Promise<ResgisterServiceResponse> {
        const password_hash = await hash(password, 6)
    
        const userWithSameEmail = await this.usersRepository.findByEmail(email)
    
        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }
    
        const user = await this.usersRepository.create({name, email, password_hash})

        return {
            user
        } 
    }
}
