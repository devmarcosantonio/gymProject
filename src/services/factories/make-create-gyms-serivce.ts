import { GymsRespository } from "@/repositories/gyms-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymService } from "../create-gym";



export function MakeCreateGymsService() {
    const gymsRepository: GymsRespository = new PrismaGymsRepository()
    const createGymsService: CreateGymService = new CreateGymService(gymsRepository)

    return createGymsService
}