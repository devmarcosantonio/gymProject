import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository"
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { ValidateCheckInService } from "./validate-check-in"
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error"



describe('Validate CheckIns Service.', () => {
    let checkInsRepository: InMemoryCheckInsRepository;
    let sut: ValidateCheckInService;

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new ValidateCheckInService(checkInsRepository)

        // poder trabalhar com mocking de data antes de cada teste
        vi.useFakeTimers()
    })

    afterEach(() => {
        // restaurando tempo normal apó cada teste
        vi.useRealTimers()
    }) 

    it("Deve ser capaz de validar um checkin.", async () => {        
        const checkIn_no_validate = await checkInsRepository.create({
            gym_id: 'gym-1',
            user_id: 'user-1',
        })

        const { checkIn } = await sut.execute({checkInId: checkIn_no_validate.id})
        expect(checkIn.validated_at).toEqual(expect.any(Date))

        const checkins = await checkInsRepository.getAll()
        expect(checkins[0].validated_at).toEqual(expect.any(Date))
    })

    it("Não deve eve ser capaz de validar um checkin que não existe.", async () => {        
        expect(async () => {
            await sut.execute({checkInId: 'id-não-existente'})
        }).rejects.toBeInstanceOf(ResourceNotFoundError)
       
    })

    it("ão deve ser possível validar um checkin após 20 min da sua criação.", async () => {
        vi.setSystemTime(new Date(1, 1, 1, 13, 0))

        const checkin = await checkInsRepository.create({
            gym_id: 'gym-1',
            user_id: 'user-1',
        })

        const vinteUmMinutosEmMilissegundos = 1000 * 60 * 21;

        vi.advanceTimersByTime(vinteUmMinutosEmMilissegundos) // passa 21 minutos

        expect(async () => {
            await sut.execute({checkInId: checkin.id})
        }).rejects.toBeInstanceOf(LateCheckInValidationError)

    })
}) 