import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '../repositories/in-memory/in-memory-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe ('Register service.', () => {
    let userRepository: InMemoryRepository
    let userRegisterService: RegisterService

    beforeEach(() => {
        userRepository = new InMemoryRepository()
        userRegisterService = new RegisterService(userRepository)
    })

    it('Deve ser possível criar usuário', async () => {
        const {user} = await userRegisterService.execute({
            name: 'Marcos',
            email: 'marcos@example.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })
    
    it('Deve ser possível registrar password creiptografado com hash.', async () => {
        const {user} = await userRegisterService.execute({
            name: 'Marcos',
            email: 'marcos@example.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('Não deve ser possível adicionar uma usuário com o mesmo email.', async () => {
        await userRegisterService.execute({
            name: 'Marcos',
            email: 'marcos@example.com',
            password: '123456'
        })

        expect(async () => {
            await userRegisterService.execute({
                name: 'Marcos',
                email: 'marcos@example.com',
                password: '123456'
            })
        }).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})