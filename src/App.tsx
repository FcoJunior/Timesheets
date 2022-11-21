import { youtrack } from './services/Youtrack/client';
import { useQuery } from '@tanstack/react-query';
import { User, UserFields } from './services/Youtrack/entities/user';
import { Menu } from './components/Menu';
import { Calendar } from './components/Calendar';

function App() {
    const { data } = useQuery<User>(
        ['current-user'],
        async () => {
            return youtrack.users.current([
                UserFields.email,
                UserFields.fullName,
            ]);
        },
        { refetchOnWindowFocus: false, retry: 1 }
    );

    return (
        <div className="min-h-screen">
            <header className="mb-2">
                <Menu></Menu>
            </header>
            <div className="px-4">
                <div className="font-heading text-2xl">Activities</div>
                {/* <div className="App">Nome: {data?.fullName}</div> */}
            </div>
            <div className="px-4 pb-6">
                <Calendar />
            </div>
        </div>
    );
}

export default App;
