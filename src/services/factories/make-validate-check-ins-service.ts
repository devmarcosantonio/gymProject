import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { CheckInService } from "../check-in"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { GymsRespository } from "@/repositories/gyms-repository"
import { ValidateCheckInService } from "../validate-check-in"


export function makeValidateCheckInsService() {
    const checkinsRepository: CheckInsRepository = new PrismaCheckInsRepository() 
    const validadeCheckInService: ValidateCheckInService = new ValidateCheckInService(checkinsRepository)

    return validadeCheckInService
}