import { useQuery } from '@tanstack/react-query';
import { Menu } from './components/Menu';
import { Calendar } from './components/Calendar';
import { currentUser, User } from './services/api/user';
import { useContext } from 'react';
import { UserContext } from './context/UserContextProvider';

function App() {
    const userContext = useContext(UserContext);
    const { data, isFetched } = useQuery<User>(
        ['current-user'],
        async () => {
            return currentUser();
        },
        {
            refetchOnWindowFocus: false,
            retry: 1,
            onSuccess: (userInfo: User) => {
                userContext.addCurrentUser(userInfo);
                // return getIssueWorkItemsByUser(
                //     data!.id,
                //     '2022-11-27',
                //     '2022-12-03'
                // );
            },
        }
    );

    return (
        <div className="min-h-screen">
            <header className="mb-2">
                <Menu></Menu>
            </header>
            <div className="px-4">
                {/* <div className="font-heading text-2xl">Activities</div> */}
                {/* <div className="App">Nome: {data?.fullName}</div> */}
            </div>
            <div className="px-4 pb-6">
                <Calendar />
            </div>
        </div>
    );
}

export default App;
