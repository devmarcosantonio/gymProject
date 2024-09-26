import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryService } from './fetch-user-check-ins-history'

describe ('Fetch Check Ins History service.', () => {
    let checkInsRepository: InMemoryCheckInsRepository;
    let sut: FetchUserCheckInsHistoryService;
    

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new FetchUserCheckInsHistoryService(checkInsRepository)
    })

    it('Deve ser possível buscar todos os checkins de um usuário paginado.', async () => {
        

        for(let i = 0; i < 22; i++) {
            checkInsRepository.create({
                user_id: 'user-1',
                gym_id: `gym-${i}`,
            })
        }

        const {checkIns} = await sut.execute({userId: 'user-1', page: 2})

        expect(checkIns).toHaveLength(2)
        expect.objectContaining([
            expect.objectContaining({
                gym_id: 'gym-21',
            }),
            expect.objectContaining({
                gym_id: 'gym-22',
            })
        ])
    })

    it('Deve ser possível buscar todos os checkins de um usuário.', async () => {
        const checkin1 = await checkInsRepository.create({
            user_id: 'user-1',
            gym_id: 'gym-1',
        })

        const checkin2 = await checkInsRepository.create({
            user_id: 'user-1',
            gym_id: 'gym-1',
        })

        await checkInsRepository.create({
            user_id: 'user-2',
            gym_id: 'gym-1',
        })

        const {checkIns} = await sut.execute({userId: 'user-1', page: 1})

        expect(checkIns).toHaveLength(2)
        expect.objectContaining([
            checkin1,
            checkin2
        ])
    })
})