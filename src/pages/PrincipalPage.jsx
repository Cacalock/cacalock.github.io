import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.js';
import { signOut } from 'firebase/auth';

export default function PrincipalPage({ userData, onLogout }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!userData) {
            navigate('/login');
        }
    }, [userData, navigate]);

    const sair = async () => {
        await signOut(auth);
        onLogout();
        navigate('/login');
    };

    if (!userData) {
        return (
            <main>
                <h2>Principal</h2>
                <p>Carregando dados do usuário...</p>
            </main>
        );
    }

    return (
        <main>
            <h2>Página Principal</h2>
            <div className="cartao">
                <p>
                    <strong>Nome:</strong> {userData.nome}
                </p>
                <p>
                    <strong>Sobrenome:</strong> {userData.sobrenome}
                </p>
                <p>
                    <strong>Data de Nascimento:</strong>{' '}
                    {userData.dataNascimento}
                </p>
            </div>
            <button onClick={sair}>Sair</button>
        </main>
    );
}
