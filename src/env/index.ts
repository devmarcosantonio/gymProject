import { z } from 'zod'
import 'dotenv/config'

// process.env: {NODE_ENV: 'dev', ...}

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333), // coerce transforma o que tiver em PORT, em número, pq pode vim com string.
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
    console.log('Variáveis de ambiente não informadas: ', _env.error.format())
    throw new Error('Variáveis de ambiente não informadas.')
}

export const env = _env.data