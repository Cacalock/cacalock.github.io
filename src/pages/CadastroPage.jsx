import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase.js';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function CadastroPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const withTimeout = (p, ms = 10000) =>
        Promise.race([
            p,
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('timeout')), ms),
            ),
        ]);

    const cadastrarUsuario = async (evento) => {
        evento.preventDefault();
        setMensagem('');
        setCarregando(true);

        try {
            const userCredential = await withTimeout(
                createUserWithEmailAndPassword(auth, email, senha),
            );
            const uid = userCredential.user.uid;

            const dadosUsuario = {
                uid,
                email,
                nome,
                sobrenome,
                dataNascimento,
            };

            try {
                await withTimeout(
                    setDoc(doc(db, 'users', uid), dadosUsuario, {
                        merge: true,
                    }),
                );
                localStorage.setItem(
                    `user:${uid}`,
                    JSON.stringify(dadosUsuario),
                );
            } catch (firestoreError) {
                console.error('Falha ao gravar no Firestore:', firestoreError);
                localStorage.setItem(
                    `user:${uid}`,
                    JSON.stringify(dadosUsuario),
                );
            }

            try {
                await updateProfile(userCredential.user, {
                    displayName: `${nome} ${sobrenome}`,
                });
            } catch (profileError) {
                console.error(
                    'Falha ao atualizar perfil do Auth:',
                    profileError,
                );
            }

            setMensagem(
                'Cadastro concluído com sucesso. Faça login para continuar.',
            );
            navigate('/login');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setMensagem('E-mail já cadastrado. Tente fazer login.');
            } else {
                setMensagem(
                    'Erro ao cadastrar. Verifique os dados e tente novamente.',
                );
            }
            console.error('Cadastro Firebase:', error);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <main>
            <h2>Cadastro</h2>
            <form onSubmit={cadastrarUsuario}>
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
                        minLength={6}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Sobrenome"
                        value={sobrenome}
                        onChange={(e) => setSobrenome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="date"
                        placeholder="Data de nascimento"
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={carregando}>
                    {carregando ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>

            {mensagem && <p className="mensagem">{mensagem}</p>}
            <p>
                Já tem conta? <Link to="/login">Ir para Login</Link>
            </p>
        </main>
    );
}
