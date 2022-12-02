import { User } from "@/services/api/user";
import { addCurrentUserAction } from "@/store/user/UserAction";
import { userReducer, UserState } from "@/store/user/UserReducer";
import { createContext, ReactNode, useReducer } from "react";

interface UserContextType {
    user: User | null;
    addCurrentUser: (user: User) => void;
}

interface UserProviderProps {
    children: ReactNode;
}

const initialState: UserState = {
    user: null
}

export const UserContext = createContext({} as UserContextType);

export const UserProvider = ({ children }: UserProviderProps) => {
    const [userState, dispatch] = useReducer(userReducer, initialState)
    const { user } = userState;

    const addCurrentUser = (user: User) => {
        dispatch(addCurrentUserAction(user));
    }

    return (
        <UserContext.Provider
            value={{
                user,
                addCurrentUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};