import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserMetricsService } from "../get-user-metrics"
import { UsersRespository } from "@/repositories/users-repository"
import { CheckInService } from "../check-in"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { CheckInsRepository } from "@/repositories/check-ins-repository"


export function makeGetUserMetricsService (): GetUserMetricsService {
    const prismaCheckInsRepository: CheckInsRepository = new PrismaCheckInsRepository()
    const getUserMetricsService: GetUserMetricsService = new GetUserMetricsService(prismaCheckInsRepository)
    return  getUserMetricsService
}