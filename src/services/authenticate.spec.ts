import { InMemoryRepository } from "../repositories/in-memory/in-memory-users-repository"
import { describe, it, expect, beforeEach } from "vitest"
import { AuthenticateService } from "./authenticate"
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"


describe('Authenticate Service.', () => {
    let usersRepository: InMemoryRepository;
    let sut: AuthenticateService;

    beforeEach(() => {
        usersRepository = new InMemoryRepository()
        sut = new AuthenticateService(usersRepository)

        
    })

    it("Deve ser possível fazer autenticação.", async () => {
        await usersRepository.create({
            name: "Marcos",
            email: "marcos@example.com",
            password_hash: await hash("123456", 6)
        })

        const { user } = await sut.execute({
            email: "marcos@example.com",
            password: "123456"
        })

        expect(user.id).toEqual(expect.any(String))

    })

    it("Deve ser capaz de disparar erro de Credenciais inválidas", async () => {
        await usersRepository.create({
            name: "Marcos",
            email: "marcos@example.com",
            password_hash: await hash("123456", 6)
        })

        expect (async () => {
            await sut.execute({
                email: "marcos@example.com",
                password: "654321"
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)

        expect (async () => {
            await sut.execute({
                email: "socram@example.com",
                password: "12345"
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})