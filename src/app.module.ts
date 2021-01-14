import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { UsersModule } from './users/users.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        UsersModule,
        GraphQLModule.forRoot({
            debug: true,
            playground: true,
            installSubscriptionHandlers: true,
            autoSchemaFile: 'schema.gql',
        }),
    ],
})
export class AppModule {
}