import { Inject } from '@nestjs/common'
import { Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSubEngine } from 'graphql-subscriptions'
import { User } from 'src/users/models/User.model'
import { withCancel } from 'src/users/users.helpers'
import { UsersService } from 'src/users/users.service'

const s = 'test'

@Resolver(() => User)
export class UsersResolver {
    constructor(
        @Inject('PUB_SUB') private readonly pubSub: PubSubEngine,
        private readonly service: UsersService,
    ) {
    }

    @Query(() => String)
    async user(): Promise<string> {
        await this.pubSub.publish(s, { test2: 'kek' })
        return '1243'
    }

    @Subscription(() => String)
    test2(): AsyncIterator<undefined, any, undefined> {
        const uns = this.service.sub(this.pubSub)

        return withCancel(this.pubSub.asyncIterator(s), uns)
    }
}
