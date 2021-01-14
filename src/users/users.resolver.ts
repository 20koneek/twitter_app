import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { NewUserInput } from './dto/new-user.input'
import { User } from './models/User.model'
import { UsersService } from './users.service'


@Resolver(() => User)
export class UsersResolver {
    constructor(
        private readonly service: UsersService,
    ) {
    }

    @Query(() => String)
    async user(): Promise<string> {
        return '1243'
    }

    @Mutation(() => User)
    async createUser(
        @Args('input') input: NewUserInput,
    ): Promise<User> {
        return await this.service.create(input)
    }
}
