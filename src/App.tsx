import './App.css';
import { youtrack } from './services/Youtrack/client';
import { useQuery } from '@tanstack/react-query';
import { User, UserFields } from './services/Youtrack/entities/user';

function App() {
    // const [user, setUser] = useState<User>();

    const { data } = useQuery<User>(
        ['current-user'],
        async () => {
            return youtrack.users.current([ UserFields.email, UserFields.fullName ]);
        },
        { refetchOnWindowFocus: false, retry: 1 }
    );

    return <div className="App">Nome: {data?.fullName}</div>;
}

export default App;
