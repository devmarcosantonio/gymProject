import { GymsRespository } from "@/repositories/gyms-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymService } from "../create-gym";
import { SearchGymByTitleService } from "../search-gyms";



export function MakeSearchGymsService() {
    const gymsRepository: GymsRespository = new PrismaGymsRepository()
    const searchGymsService: SearchGymByTitleService = new SearchGymByTitleService(gymsRepository)

    return searchGymsService
}