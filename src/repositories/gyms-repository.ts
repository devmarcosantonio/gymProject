import { Gym, Prisma } from "@prisma/client"


export interface FindManyNearbyParams {
    latitude: number 
    longitude: number
}

export interface GymsRespository {
    create (data: Prisma.GymCreateInput): Promise <Gym>
    findById (gymId: string): Promise <Gym | null>
    searchMany (query: string, page: number): Promise <Gym[]>
    findManyNearby (params: FindManyNearbyParams): Promise<Gym[]>
}