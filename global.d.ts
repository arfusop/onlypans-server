declare global {
    namespace NodeJS {
        interface ProcessENV {
            PORT?: string
            MONGODB: string
        }
    }
}

export {}
