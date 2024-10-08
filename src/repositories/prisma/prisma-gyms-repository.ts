import { Prisma, CheckIn, Gym } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { FindManyNearbyParams, GymsRespository } from "../gyms-repository";




export class PrismaGymsRepository implements GymsRespository {
    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        const gym = await prisma.gym.create({
            data
        })

        return gym
    }

    async findById(gymId: string): Promise<Gym | null> {
        const gym = await prisma.gym.findUnique({
            where: {
                id: gymId
            }
        })

        return gym
    }

    async searchMany(query: string, page: number): Promise<Gym[]> {
        const gyms = await prisma.gym.findMany({
            where: {
                title: {
                    contains: query
                }
            },
            skip: (page - 1) * 20,
            take: 20
        })

        return gyms
    }

    async findManyNearby({latitude, longitude}: FindManyNearbyParams): Promise<Gym[]> {
        const gyms = await prisma.$queryRaw<Gym[]>`
            SELECT * FROM gyms
            WHERE (6371 acos (cos (radians (${latitude}) ) * cos(radians (latitude ) ) * cos(radians (longitude) - radians ( ${longitude})) + sin(radians(${latitude})) * sin(radians (latitude)))) <= 10
        `

        return gyms
    }

}