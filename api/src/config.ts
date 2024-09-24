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
        },
        jwtSecret: {
            reset: process.env.RESET_TOKEN_SECRET,
            access: process.env.ACCESS_TOKEN_SECRET,
        },
        mail: {
            host: process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT, 10),
            secure: process.env.MAIL_SECURE === 'true',
            user: process.env.MAIL_USER,
            password: process.env.MAIL_PASSWORD
        }
    }
})