import { PrismaClient } from '@prisma/client'
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';

class DbConnect {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    getPrisma(): PrismaClient {
        return this.prisma;
    }

    async checkConnection(): Promise<string> {
        try {
            await this.prisma.$connect();
            return "Connected to the database";
        } catch (error) {
            if (error instanceof PrismaClientInitializationError) {
                return `Error connecting to the database: ${error.message}`;
            } else if (error instanceof Error) {
                return `Unknown error type: ${error.message}`;
            } else {
                return "An unexpected error occurred";
            }
        } finally {
            await this.prisma.$disconnect();
        }
    }
}

export default new DbConnect;