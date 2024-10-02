import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'


interface ValidateCheckInServiceInterfaceRequest {
    checkInId: string
}

interface ValidateCheckInServiceInterfaceResponse {
    checkIn: CheckIn
} 

export class ValidateCheckInService {
    constructor (
        private checkinsRepository: CheckInsRepository
    ) {}

    async execute ({checkInId} : ValidateCheckInServiceInterfaceRequest): Promise<ValidateCheckInServiceInterfaceResponse> {

        const checkIn = await this.checkinsRepository.findById(checkInId)

        if (!checkIn) {
            throw new ResourceNotFoundError()
        }

        const distanceInMinutesFromCheckinInCreation = dayjs(new Date())
            .diff(
                checkIn.created_at,
                'minutes'
            )

        if (distanceInMinutesFromCheckinInCreation > 20) {
            throw new LateCheckInValidationError()
        }

        checkIn.validated_at = new Date()

        this.checkinsRepository.save(checkIn)

        return {
            checkIn
        }
    }
}
