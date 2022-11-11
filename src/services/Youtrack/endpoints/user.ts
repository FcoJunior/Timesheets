import {
    User,
    UserImpl,
    ReducedUser,
    ReducedUserImpl,
} from 'youtrack-rest-client';
import { PaginationOptions } from 'youtrack-rest-client/dist/options/pagination_options';
import { BaseEndpoint } from './base';

export const UserPaths = {
    current: '/admin/users/me',
    users: '/admin/users',
    user: '/admin/users/{userId}',
};

export class UserEndpoint extends BaseEndpoint {
    public current(): Promise<User> {
        return this.getResourceWithFields<User>(UserPaths.current, UserImpl);
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
