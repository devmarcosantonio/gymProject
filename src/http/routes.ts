import { FastifyInstance } from "fastify"
import fastify from "fastify"
import register from "./controllers/register"
import authenticate from "./controllers/authenticate"
import { profile } from "./controllers/profile"

export async function AppRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/sessions', authenticate)

    // Rotas para usuários autenticados!
    app.get('/me', profile)
}

