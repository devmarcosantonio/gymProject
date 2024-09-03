import { Prisma, User } from "@prisma/client"

export interface UsersRespository {
    create (data: Prisma.UserCreateInput): Promise <User>
    findByEmail (email: string): Promise <User | null>
    findById (email: string): Promise <User | null>
}