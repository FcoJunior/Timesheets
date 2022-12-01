import api from '..';

export interface User {
    $type: string;
    id: string;
    fullName: string;
    email: string;
}

export enum UserFields {
    fullName = 'fullName',
    email = 'email',
    id = 'id',
}

const defaultFields: UserFields[] = [
    UserFields.id,
    UserFields.fullName,
    UserFields.email,
];

export const currentUser = async (): Promise<User> =>
    api
        .get('users/me', { params: { fields: defaultFields.join() } })
        .then((response) => {
            return response.data;
        });
