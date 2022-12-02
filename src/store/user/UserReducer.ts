import { User } from "@/services/api/user";
import { UserActionTyes } from "./UserAction";

export interface UserState {
    user: User | null;
}

export const userReducer = (state: UserState, action: any) => {
    switch (action.type) {
        case UserActionTyes.ADD_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
}