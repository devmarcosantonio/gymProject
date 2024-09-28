import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsService } from "./fetch-nearby-gyms";



describe('Fetch Nearby Gyms', () => {

    let gymsRepository: InMemoryGymsRepository;
    let sut: FetchNearbyGymsService;

    beforeEach (() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsService(gymsRepository)
    })

    //-2.5151989749343993, -44.175031539855844
    // -2.5502623468111296, -44.07685138068328

    it ('Deve ser possível buscar todas as academias próximas.', async () => {
        gymsRepository.create({
            title: 'Gym 1',
            latitude: -2.515198974,
            longitude: -44.17503153
        })

        gymsRepository.create({
            title: 'Gym 2',
            latitude: -2.55026234681,
            longitude: -44.076851380
        })

        const {gyms} = await sut.execute({userLatitude: -2.51519897, userLongitude: -44.175031539})

        expect(gyms).toHaveLength(1)
        expect.objectContaining([
            expect.objectContaining({title: 'Gym 1',})
        ])
    })
})