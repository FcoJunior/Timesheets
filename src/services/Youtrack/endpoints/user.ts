import { ReducedUser, ReducedUserImpl, User, UserFields, UserImpl } from '../entities/user';
import { PaginationOptions } from '../options/pagination_options';
import { BaseEndpoint } from './base';

export const UserPaths = {
    current: '/users/me',
    users: '/users',
    user: '/users/{userId}',
};

export class UserEndpoint extends BaseEndpoint {
    public current(fields: UserFields[] = []): Promise<User> {
        return this.getResourceWithFieldNames<User>(UserPaths.current, fields);
    }

    public all(
        paginationOptions: PaginationOptions = {}
    ): Promise<ReducedUser[]> {
        return this.getResourceWithFields<ReducedUser[]>(
            UserPaths.users,
            ReducedUserImpl,
            { qs: paginationOptions }
        );
    }

    public byId(userId: string): Promise<User> {
        return this.getResourceWithFields<User>(
            this.format(UserPaths.user, { userId }),
            UserImpl
        );
    }
}
