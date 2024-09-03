import { prisma } from "@/lib/prisma"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error"
import { makeRegisterService } from "@/services/factories/make-register-service"

export default async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerUserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {name, email, password} = registerUserSchema.parse(request.body) // parse = gera erro automático, safeparse não
    
    try {
        const registerService = makeRegisterService()
        await registerService.execute({name, email, password})
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({message: err.message})
        }

        // return reply.status(500).send()
        throw err
    }
    
    return reply.status(201).send()
}