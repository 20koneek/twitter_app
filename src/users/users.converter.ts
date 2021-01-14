import { NewUserInput } from 'src/users/dto/new-user.input'

export const UsersConverter = {
    toFirestore({ name }: NewUserInput): FirebaseFirestore.DocumentData {
        return { name }
    },

    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): NewUserInput {
        const { name } = snapshot.data()
        return { name }
    },
}
