import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository"
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository"
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { CheckInService } from "./check-in"
import { Decimal } from "@prisma/client/runtime/library"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { MaxCheckInsError } from "./errors/max-check-is-error"
import { MaxDistanceError } from "./errors/max-distance-error"



describe('CheckIns Service.', () => {
    let checkInsRepository: InMemoryCheckInsRepository;
    let gymsRepository: InMemoryGymsRepository
    let sut: CheckInService;

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInService(checkInsRepository, gymsRepository)

        gymsRepository.gyms.push({
            id: 'gym-id-01',
            title: 'Academia 1',
            description: '',
            phone: '',
            latitude: new Decimal(-2.5532810),
            longitude: new Decimal(-44.1938228)
        })

        // poder trabalhar com mocking de data antes de cada teste
        vi.useFakeTimers()
    })

    afterEach(() => {
        // restaurando tempo normal apó cada teste
        vi.useRealTimers()
    }) 

    it("Deve ser capaz de criar um checkin", async () => {        
        const data = await sut.execute({
            userId: 'user-id-01',
            gymId: 'gym-id-01',
            userLatitude: -2.5532810,
            userLongitude: -44.1938228
        })
        
        expect(data.checkin.id).toEqual(expect.any(String))
    })

    it("Não deve ser possível fazer check in no mesmo dia.", async () => {
        // mocking de data fake
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            userId: 'user-id-01',
            gymId: 'gym-id-01',
            userLatitude: -2.5532810,
            userLongitude: -44.1938228
        })


        expect(async () => {
            await sut.execute({
                userId: 'user-id-01',
                gymId: 'gym-id-01',
                userLatitude: -2.5532810,
                userLongitude: -44.1938228
            })
        }).rejects.toBeInstanceOf(MaxCheckInsError)
    })

    it("Deve ser possível fazer check in em dias diferentes.", async () => {
        // mocking de data fake
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            userId: 'user-id-01',
            gymId: 'gym-id-01',
            userLatitude: -2.5532810,
            userLongitude: -44.1938228
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        
        const {checkin} = await sut.execute({
            userId: 'user-id-01',
            gymId: 'gym-id-01',
            userLatitude: -2.5532810,
            userLongitude: -44.1938228
        })

        expect(checkin.id).toEqual(expect.any(String))
    })

    it("Não deve ser possível fazer check in a uam distância acima de 100m", async () => {
        gymsRepository.gyms.push({
            id: 'gym-id-02',
            title: 'Academia 2',
            description: '',
            phone: '',
            latitude: new Decimal(-2.4973319050),
            longitude: new Decimal(-44.1012469949)
        })

        expect(async () => {
            await sut.execute({
                userId: 'user-id-01',
                gymId: 'gym-id-02',
                userLatitude: -2.5532810,
                userLongitude: -44.1938228
            })
        }).rejects.toBeInstanceOf(MaxDistanceError)
    })
}) 