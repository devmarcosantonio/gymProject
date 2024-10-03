// fastify-jwt.d.ts
import "@fastify/jwt"

declare module "@fastify/jwt" {
  interface FastifyJWT {
    // payload: {} 
    user: {
      sub: string
    } // user type is return type of `request.user` object
  }
}