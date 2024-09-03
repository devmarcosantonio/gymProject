import { prisma } from "@/lib/prisma"
import { Prisma, User } from "@prisma/client"
import { UsersRespository } from "../users-repository"


export class PrismaUsersRepository implements UsersRespository {
    async create (data: Prisma.UserCreateInput) {
        const newUser = await prisma.user.create({
            data
        })

        return newUser
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user
    }

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return user
    }
}