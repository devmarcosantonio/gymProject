import fastify from "fastify";
import { AppRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";
import { AuthenticateService } from "./services/authenticate";


export const app = fastify()

app.register(AppRoutes)

app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
        reply.status(400).send({message: 'Validation error.', issues: error.format()})
    }

    if (env.NODE_ENV !== 'production') {
        console.log(error)
    } else {
        // TODO, AQUI DEVO SER CAPAZ DE MANDAR ESSE ERRO PRAA UM APLICATIVO DE TERCEIRO. DATADOG, NEWRELIC, SENTRY
    }

    reply.status(500).send({message: 'Internal server error.'})
})