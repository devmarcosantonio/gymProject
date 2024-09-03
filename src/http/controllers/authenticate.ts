import { prisma } from "@/lib/prisma"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error"
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service"

export default async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateUserSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {email, password} = authenticateUserSchema.parse(request.body) // parse = gera erro automático, safeparse não
    
    try {
        const authenticateService = makeAuthenticateService()
        await authenticateService.execute({email, password})
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({message: err.message})
        }

        // return reply.status(500).send()
        throw err
    }
    
    return reply.status(200).send()
}