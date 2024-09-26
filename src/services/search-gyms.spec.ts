import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym'
import { SearchGymByTitleService } from './search-gyms'

describe ('Search Gyms by name service.', () => {
    let gymsRepository:InMemoryGymsRepository;
    let sut: SearchGymByTitleService;
    

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymByTitleService(gymsRepository)
    })

    it('Deve ser possível buscar acadenia pelo nome/title', async () => {
        gymsRepository.create({
            title: 'Academia 1',
            description: 'uma academia legal',
            phone: '+55982929292',
            latitude: -2.4973319050,
            longitude: -44.1012469949
        })

        gymsRepository.create({
            title: 'Academia 1',
            description: 'uma academia legal 2',
            phone: '+55982929293',
            latitude: -2.4973319050,
            longitude: -44.1012469949
        })

        const {gyms} = await sut.execute({query: 'Academia 1', page: 1})

        expect(gyms).toEqual([
            expect.objectContaining({
                title: 'Academia 1',
                description: 'uma academia legal',
                phone: '+55982929292'
            }), 
            expect.objectContaining({
                title: 'Academia 1',
                description: 'uma academia legal 2',
                phone: '+55982929293'
            })
        ])
    })
})