import admin from 'firebase-admin'
import { Injectable } from '@nestjs/common'
import { PubSubEngine } from 'graphql-subscriptions'
import { NewUserInput } from 'src/users/dto/new-user.input'
import { User } from 'src/users/models/User.model'

export const productConverter = {
    toFirestore(post: NewUserInput): FirebaseFirestore.DocumentData {
        return { name: post.name }
    },

    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): NewUserInput {
        const data = snapshot.data()
        return { name: data.name }
    },
}

@Injectable()
export class UsersService {
    getCollection = () => (
        admin.firestore().collection('users').withConverter(productConverter)
    )

    async create(data: NewUserInput): Promise<User> {
        const { id } = await this.getCollection().add(data)

        return {
            ...data,
            id,
        }
    }

    async findOneById(id: string): Promise<User> {
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

    async findAll(): Promise<User[]> {
        return [] as User[]
    }

    async remove(id: string): Promise<boolean> {
        await this.getCollection().doc(id).delete()
        return true
    }

    sub(pub: PubSubEngine): VoidFunction {
        let isFirst = true
        console.log('123123')
        return this.getCollection().onSnapshot(querySnapshot => {
            if (isFirst) {
                isFirst = false
            } else {
                querySnapshot.docChanges().forEach(async (change) => {
                    await pub.publish('test', { test2: change.doc.id })
                    //     {
                    //     id: change.doc.id,
                    //     ...change.doc.data(),
                    // })
                    console.log({
                        id: change.doc.id,
                        ...change.doc.data(),
                    })
                })
            }
        })
    }
}
