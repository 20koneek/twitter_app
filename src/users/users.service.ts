import admin from 'firebase-admin'
import { Injectable } from '@nestjs/common'
import { User } from './models/User.model'
import { NewUserInput } from './dto/new-user.input'
import { UsersConverter } from './users.converter'

@Injectable()
export class UsersService {
    getCollection = (): FirebaseFirestore.CollectionReference<NewUserInput> => (
        admin.firestore().collection('users').withConverter(UsersConverter)
    )

    async create(input: NewUserInput): Promise<User> {
        const { id } = await this.getCollection().add(input)

        return {
            ...input,
            id,
        }
    }

    async findById(id: string): Promise<User> {
        const data = await this.getCollection().doc(id).get()
        const user = data.data()

        if (!user) {
            throw new Error('user not found')
        }

        return {
            id,
            ...user,
        }
    }
}
