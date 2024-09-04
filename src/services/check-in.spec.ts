import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository"
import { describe, it, expect, beforeEach } from "vitest"
import { AuthenticateService } from "./authenticate"
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"
import { CheckInService } from "./check-in"


describe('CheckIns Service.', () => {
    let checkInsRepository: InMemoryCheckInsRepository;
    let sut: CheckInService;

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInService(checkInsRepository)
    })

    it("Deve ser capaz de criar um checkin", async () => {
        const data = await sut.execute({
            userId: 'user-id-01',
            gymId: 'gym-id-01'
        })
        
        expect(data.checkin.id).toEqual(expect.any(String))
    })
})