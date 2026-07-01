import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const fazerLogin = async (evento) => {
        evento.preventDefault();
        setMensagem('');
        setCarregando(true);

        try {
            const withTimeout = (p, ms = 10000) =>
                Promise.race([
                    p,
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('timeout')), ms),
                    ),
                ]);

            const credential = await withTimeout(
                signInWithEmailAndPassword(auth, email, senha),
            );
            const uid = credential.user.uid;
            let userData = null;

            try {
                const userSnapshot = await getDoc(doc(db, 'users', uid));
                if (userSnapshot.exists()) {
                    userData = userSnapshot.data();
                }
            } catch (fireError) {
                console.error(
                    'Falha ao ler Firestore, usando fallback do Auth:',
                    fireError,
                );
            }

            if (!userData) {
                const displayName = credential.user.displayName || '';
                const parts = displayName.split(' ');
                const nome = parts[0] || '';
                const sobrenome = parts.slice(1).join(' ') || '';
                userData = {
                    uid,
                    email: credential.user.email,
                    nome,
                    sobrenome,
                    dataNascimento: '',
                };
            }

            onLogin(userData);
            navigate('/principal');
        } catch (error) {
            console.error('Login Firebase:', error);
            setMensagem('Usuário não cadastrado ou senha inválida.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <main>
            <h2>Login</h2>
            <form onSubmit={fazerLogin}>
                <div>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={carregando}>
                    {carregando ? 'Entrando...' : 'Acessar'}
                </button>
            </form>

            {mensagem && <p className="mensagem">{mensagem}</p>}
            <p>
                Ainda não tem conta?{' '}
                <Link to="/cadastro">Ir para Cadastro</Link>
            </p>
        </main>
    );
}
