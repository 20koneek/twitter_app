import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { UsersModule } from './users/users.module'

@Module({
    imports: [
        UsersModule,
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            autoSchemaFile: 'schema.gql',
        }),
    ],
})
export class AppModule {
}
