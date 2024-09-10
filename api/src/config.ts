import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
    return {
        port: process.env.PORT,
        db: {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            database: process.env.DB_DATABASE,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            synchronize: process.env.synchronize === 'true'
        }
    }
})