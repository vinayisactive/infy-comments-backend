import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
    log: ["info", "error"]
}); 

process.on("beforeExit", async() => {
    await db.$disconnect(); 
})

export default db; 