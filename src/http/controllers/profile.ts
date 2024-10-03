import { makeGetUserProfileService } from "@/services/factories/make-get-user-profile-service"
import { FastifyReply, FastifyRequest } from "fastify"

export async function profile(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify()

    const id = request.user.sub
    console.log(id)


    const sut = makeGetUserProfileService()
    const { user }  = await sut.execute({
        userId: request.user.sub
    })

    reply.status(200).send({
        user: {
            ...user,
            password_hash: undefined
        }
    
    })
    

    
}   