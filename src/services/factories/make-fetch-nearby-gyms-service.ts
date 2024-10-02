import { GymsRespository } from "@/repositories/gyms-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchNearbyGymsService } from "../fetch-nearby-gyms";


export function MakeFetchNearbyGymsService() {
    const gymsRepository: GymsRespository = new PrismaGymsRepository()
    const fetchNearbyGymsService: FetchNearbyGymsService = new FetchNearbyGymsService(gymsRepository)

    return fetchNearbyGymsService
}