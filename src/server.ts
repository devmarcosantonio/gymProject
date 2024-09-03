import { app } from "./app";
import { env } from "./env";

app.listen({
    host: '0.0.0.0',
    port: env.PORT
}).then((server) => {
    console.log('server running in port 3333!', server)
}).catch((error) => {
    console.log('error: ', error)
})