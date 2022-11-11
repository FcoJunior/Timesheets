import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { youtrack } from './services/YouTrackService';
import { User } from 'youtrack-rest-client';
import { useQuery } from '@tanstack/react-query';

function App() {
    // const [user, setUser] = useState<User>();

    const { data } = useQuery<User>(
        ['current-user'],
        async () => {
            return youtrack.users.current();
        },
        { refetchOnWindowFocus: false, retry: 1 }
    );
    // youtrack.users.current().then((user: User) => {
    //     setUser(user);
    // });

    return <div className="App">{data?.name}</div>;
}

export default App;
