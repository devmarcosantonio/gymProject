import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym'

describe ('Create Gym service.', () => {
    let gymsRepository:InMemoryGymsRepository;
    let sut: CreateGymService;
    

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymService(gymsRepository)
    })

    it('Deve ser possível criar academia', async () => {
        const {gym} = await sut.execute({
            title: 'Academia 1',
            description: 'uma academia legal',
            phone: '+55982929292',
            latitude: -2.4973319050,
            longitude: -44.1012469949
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})