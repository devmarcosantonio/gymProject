import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";




export class PrismaCheckInsRepository implements CheckInsRepository {
    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn = await prisma.checkIn.create({
            data
        })

        return checkIn
    }

    async findById(checkInId: string): Promise<CheckIn | null> {
        const checkIn = await prisma.checkIn.findUnique({
            where: {
                id: checkInId
            }
        })

        return checkIn
    }


    async save(data: CheckIn): Promise<CheckIn> {
        const checkInUpdate = await prisma.checkIn.update({
            where: {
                id: data.id
            },
            data
        })

        return checkInUpdate
    }

    async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
        const checkIns = await prisma.checkIn.findMany({
            where: {
                user_id: userId
            },
            take: 20,
            skip: (page - 1) * 20
        }) 

        return checkIns
    }

    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkIn = await prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    gte: startOfTheDay.toDate(), // greaded then or equal (maior que ou igual a....)
                    lte: endOfTheDay.toDate()    // lower then or equal (menor que ou igual a....)
                }
            }
        })

        return checkIn
    }

    async countByUserId(userId: string): Promise<number> {
        const countCheckIns = await prisma.checkIn.count({
            where: {
                user_id: userId
            }
        })

        return countCheckIns
    }
}