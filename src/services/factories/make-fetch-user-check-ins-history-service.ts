import { GymsRespository } from "@/repositories/gyms-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchNearbyGymsService } from "../fetch-nearby-gyms";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { FetchUserCheckInsHistoryService } from "../fetch-user-check-ins-history";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";


export function MakeFetchUserCheckInsHistoryService() {
    const checkInsRepository: CheckInsRepository = new PrismaCheckInsRepository()

    const fetchUserCheckInsHistoryService = new FetchUserCheckInsHistoryService(checkInsRepository)

    return fetchUserCheckInsHistoryService
}