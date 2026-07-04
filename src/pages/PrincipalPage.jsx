import { useEffect, useMemo } from 'react'; // Adicionado useMemo aqui
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

    const randomImageNumber = useMemo(() => {
        return Math.floor(Math.random() * 5) + 1;
    }, []);

    if (!userData) {
        return (
            <main>
                <h2>Principal</h2>
                <p>Carregando dados do usuário...</p>
            </main>
        );
    }

    const imageUrl = `/images/${randomImageNumber}.jpg`;

    return (
        <main>
            <h2>Seus Dados</h2>
            <div className="cartao">
                <p>
                    <strong>Nome:</strong> {userData.nome}
                </p>
                <p>
                    <strong>Sobrenome:</strong> {userData.sobrenome}
                </p>
                <p>
                    <strong>Data de Nascimento:</strong>{' '}
                    {userData.dataNascimento || 'Não informada'}
                </p>
                <img src={imageUrl} alt="Foto" />
            </div>
            <button onClick={sair}>Sair</button>
        </main>
    );
}
