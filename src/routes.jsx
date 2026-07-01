import { Routes, Route, Navigate } from 'react-router-dom';
import CadastroPage from './pages/CadastroPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PrincipalPage from './pages/PrincipalPage.jsx';

export default function AppRoutes({ userData, onLogin, onLogout }) {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
            <Route
                path="/principal"
                element={
                    <PrincipalPage userData={userData} onLogout={onLogout} />
                }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}
