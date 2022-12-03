import { useQuery } from '@tanstack/react-query';
import { Menu } from './components/Menu';
import { Calendar } from './components/Calendar';
import { currentUser, User } from './services/api/user';
import { useContext } from 'react';
import { UserContext } from './context/UserContextProvider';

function App() {
    const userContext = useContext(UserContext);
    const { isSuccess } = useQuery<User>(
        ['current-user'],
        async () => {
            return currentUser();
        },
        {
            refetchOnWindowFocus: false,
            retry: 1,
            onSuccess: (userInfo: User) => {
                userContext.addCurrentUser(userInfo);
            },
        }
    );

    return (
        <div className="min-h-screen">
            <header className="mb-2">
                <Menu></Menu>
            </header>
            {userContext.user && (
                <div className="px-4 pb-6">
                    <Calendar />
                </div>
            )}
        </div>
    );
}

export default App;
