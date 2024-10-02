

import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserMetricsService } from "../get-user-metrics"
import { GetUserProfileService } from "../get-user-profile"

export function mekeGetUserProfileService (): GetUserProfileService {
    const prismaUsersRepository = new PrismaUsersRepository()
    const getUserProfileService: GetUserProfileService = new GetUserProfileService(prismaUsersRepository)
    return  getUserProfileService
}