import { User } from "@/services/api/user";

export enum UserActionTyes {
    ADD_CURRENT_USER = 'ADD_CURRENT_USER',
}

export const addCurrentUserAction = (user: User) => {
    return {
        type: UserActionTyes.ADD_CURRENT_USER,
        payload: user,
    };
};