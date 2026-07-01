import { useState } from 'react';
import './App.css';
import AppRoutes from './routes.jsx';

function App() {
    const [userData, setUserData] = useState(null);

    const handleLogin = (data) => {
        setUserData(data);
    };

    const handleLogout = () => {
        setUserData(null);
    };

    return (
        <AppRoutes
            userData={userData}
            onLogin={handleLogin}
            onLogout={handleLogout}
        />
    );
}

export default App;
