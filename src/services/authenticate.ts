import { UsersRespository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateServiceInterfaceRequest {
    email: string,
    password: string
}

interface AuthenticateServiceInterfaceResponse {
    user: User
}

export class AuthenticateService {
    constructor (private usersRepository: UsersRespository){}

    async execute ({email, password}: AuthenticateServiceInterfaceRequest): Promise<AuthenticateServiceInterfaceResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordsMatches = await compare(password, user.password_hash)

        if (!doesPasswordsMatches) {
            throw new InvalidCredentialsError()
        }

        return {
            user
        }
    }
}