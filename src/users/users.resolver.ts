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

    @Query(() => User)
    user(
        @Args('id') id: string,
    ): Promise<User> {
        return this.service.findById(id)
    }

    @Mutation(() => User)
    createUser(
        @Args('input') input: NewUserInput,
    ): Promise<User> {
        return this.service.create(input)
    }
}
