import { CheckIn, Prisma } from "@prisma/client";


export interface CheckInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findById(checkInId: string): Promise<CheckIn | null>
    save(checkIn: CheckIn): Promise<CheckIn>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    countByUserId(userId: string): Promise<number>
}