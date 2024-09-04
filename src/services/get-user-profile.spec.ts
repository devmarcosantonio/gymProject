import { InMemoryRepository } from "../repositories/in-memory/in-memory-users-repository"
import { describe, it, expect, beforeEach } from "vitest"
import { AuthenticateService } from "./authenticate"
import { hash } from "bcryptjs"
import { GetUserProfileService } from "./get-user-profile"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"


describe('Get User Profile.', () => {
    let usersRepository: InMemoryRepository;
    let sut: GetUserProfileService;

    beforeEach(() => {
        usersRepository = new InMemoryRepository()
        sut = new GetUserProfileService(usersRepository)
    })

    it("Deve ser possível puxar o perfil de um usuário por ID.", async () => {
        const userCreated = await usersRepository.create({
            name: "Marcos",
            email: "marcos@example.com",
            password_hash: await hash("123456", 6)
        })

        const { user } = await sut.execute({
            userId: userCreated.id
        })

        expect(user).toEqual(expect.objectContaining({
            name: "Marcos",
            email: "marcos@example.com",
            
        }))

    })

    it("Deve ser possível puxar dado um id errado perfil de um usuário por ID.", async () => {
        const userId = 'siubrviourgouehorfuh'

        expect( async () => {
            const { user } = await sut.execute({
                userId
            })
        }).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})