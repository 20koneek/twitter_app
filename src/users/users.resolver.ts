import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { NewUserInput } from 'src/users/dto/new-user.input'
import { User } from 'src/users/models/User.model'
import { UsersService } from 'src/users/users.service'

// const pubSub = new PubSub()

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly service: UsersService) {
    }

    @Query(() => User)
    async user(@Args('id') id: string): Promise<User> {
        const recipe = await this.service.findOneById(id)
        if (!recipe) {
            throw new NotFoundException(id)
        }
        return recipe
    }

    @Query(() => [User])
    users(): Promise<User[]> {
        return this.service.findAll()
    }

    @Mutation(() => User)
    async crateUser(
        @Args('newRecipeData') newRecipeData: NewUserInput,
    ): Promise<User> {
        // pubSub.publish('recipeAdded', { recipeAdded: recipe })
        return await this.service.create(newRecipeData)
    }

    @Mutation(() => Boolean)
    async deleteUser(@Args('id') id: string) {
        return this.service.remove(id)
    }

    // @Subscription(() => User)
    // recipeAdded() {
    //     return pubSub.asyncIterator('recipeAdded')
    // }
}
