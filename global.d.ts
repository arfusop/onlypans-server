declare global {
    namespace NodeJS {
        interface ProcessENV {
            PORT?: string
            MONGODB: string
            TOKEN_SECRET: string
            TOKEN_EXPIRE: string
        }
    }
}

export {}
