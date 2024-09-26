import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryService } from './fetch-user-check-ins-history'
import { GetUserMetricsService } from './get-user-metrics';

describe ('Fetch Check Ins History service.', () => {
    let checkInsRepository: InMemoryCheckInsRepository;
    let sut: GetUserMetricsService;
    
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsService(checkInsRepository)
    })

    it('Deve ser possível buscar número de checkins de um usuário.', async () => {
        await checkInsRepository.create({
            user_id: 'user-1',
            gym_id: 'gym-1',
        })

        await checkInsRepository.create({
            user_id: 'user-1',
            gym_id: 'gym-2',
        })

        const {checkInsCount} = await sut.execute({userId: 'user-1'})

        expect(checkInsCount).toEqual(2)

    })
})