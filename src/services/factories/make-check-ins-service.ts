import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { CheckInService } from "../check-in"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { GymsRespository } from "@/repositories/gyms-repository"


export function makeCheckInsService() {
    const checkinsRepository: CheckInsRepository = new PrismaCheckInsRepository() 
    const gymsRepository: GymsRespository = new PrismaGymsRepository()
    const checkInService: CheckInService = new CheckInService(checkinsRepository, gymsRepository)

    return checkInService
}