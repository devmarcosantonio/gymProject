import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";



export class InMemoryCheckInsRepository implements CheckInsRepository {

    private checkins: CheckIn[] = []

    async getAll () {
        return this.checkins
    }

    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkin: CheckIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            created_at: new Date(),
            validated_at: data.validated_at ? new Date(data.validated_at) : null
        }

        this.checkins.push(checkin)

        return checkin
    }

    async findById(checkInId: string): Promise<CheckIn | null> {
        const checkIn = this.checkins.find((item) => {
            return item.id === checkInId
        })

        if (!checkIn) {
            return null
        }

        return checkIn
    }

    async countByUserId(userId: string): Promise<number> {
        const checkInsCount = this.checkins.filter((item) => {
            return item.user_id === userId
        })

        return checkInsCount.length
    }

    async findManyByUserId (userId: string, page: number): Promise<CheckIn[]> {
        const checkIns = this.checkins.filter((item) => {
            return item.user_id === userId
        })

        return checkIns
    }

    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>{

        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkinInOnSameDate = this.checkins.find((checkIn) => {

            const checkInDate = dayjs(checkIn.created_at)
            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

            return checkIn.user_id === userId && isOnSameDate

        })

        if (!checkinInOnSameDate) return null

        return checkinInOnSameDate
    }

    async save(checkIn: CheckIn): Promise<CheckIn> {
        const checkInIndex = this.checkins.findIndex((item) => item.id === checkIn.id)
        
        if (checkInIndex >= 0) {
            this.checkins[checkInIndex] = checkIn
        } 
        return checkIn
    }

}