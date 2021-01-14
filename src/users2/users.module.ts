import { Module } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'
import { UsersResolver } from 'src/users/users.resolver'
import { UsersService } from 'src/users/users.service'

@Module({
    providers: [
        UsersResolver,
        UsersService,
        {
            provide: 'PUB_SUB',
            useValue: new PubSub(),
        },
    ],
})
export class UsersModule {
}
