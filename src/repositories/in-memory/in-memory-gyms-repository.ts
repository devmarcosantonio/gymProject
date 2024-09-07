import { Prisma, Gym } from "@prisma/client";
import { randomUUID } from "crypto";
import { GymsRespository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRespository {
    public gyms: Gym[] = []

    create(data: Prisma.GymCreateInput): Promise<Gym> {
        throw new Error("Method not implemented.");
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
}