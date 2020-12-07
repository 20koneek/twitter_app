import { Module } from '@nestjs/common'
import { UsersResolver } from 'src/users/users.resolver'
import { UsersService } from 'src/users/users.service'

@Module({
    providers: [UsersResolver, UsersService],
})
export class UsersModule {
}
