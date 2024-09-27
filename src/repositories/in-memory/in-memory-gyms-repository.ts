import { Prisma, Gym } from "@prisma/client";
import { randomUUID } from "crypto";
import { GymsRespository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRespository {
    public gyms: Gym[] = []

    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        const newGym: Gym = {
            id: data.id ?? randomUUID() ,
            title: data.title,
            phone: data.phone ?? null,
            description: data.description ?? null,
            longitude: new Prisma.Decimal(data.longitude.toString()),
            latitude: new Prisma.Decimal(data.latitude.toString())
        }

        this.gyms.push(newGym)

        return newGym
    }
    
    async findById(gymId: string): Promise<Gym | null> {
        const gym = this.gyms.find((item) => {
            return item.id === gymId
        })

        if (!gym) {
            return null
        }

        return gym
    }

    async searchMany (query: string, page: number): Promise<Gym[]> {
        const gyms = this.gyms.filter((item) => item.title.includes(query)).slice((page - 1) * 20, page * 20)

        return gyms
    }
}