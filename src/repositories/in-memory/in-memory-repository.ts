import { Prisma, User } from "@prisma/client";
import { UsersRespository} from "../users-repository";
import { randomUUID } from "crypto";

export class InMemoryRepository implements UsersRespository {
    private items: User[] = []

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: randomUUID(),
            name: data.name,
            password_hash: data.password_hash,
            email: data.email,
            created_at: new Date()
        }

        this.items.push(user)        

        return user
        
    }
    
    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find((item) => {
            return item.email === email
        })
        
        if (!user) {
            return null
        }

        return user
    }

    async findById(id: string): Promise<User | null> {
        const user = this.items.find((item) => {
            return item.id === id
        })
        
        if (!user) {
            return null
        }

        return user
    }

}