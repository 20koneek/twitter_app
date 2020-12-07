import { Injectable } from '@nestjs/common'
import { NewUserInput } from 'src/users/dto/new-user.input'
import { User } from 'src/users/models/User.model'

@Injectable()
export class UsersService {
    async create(data: NewUserInput): Promise<User> {
        return {} as any
    }

    async findOneById(id: string): Promise<User> {
        return {} as any
    }

    async findAll(): Promise<User[]> {
        return [] as User[]
    }

    async remove(id: string): Promise<boolean> {
        return true
    }
}
