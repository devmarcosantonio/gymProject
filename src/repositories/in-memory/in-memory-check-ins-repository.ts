import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";



export class InMemoryCheckInsRepository implements CheckInsRepository {

    private checkins: CheckIn[] = []

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

}