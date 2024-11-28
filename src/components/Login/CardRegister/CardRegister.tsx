import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { routes } from '../../../Router/routes';

const CardRegister = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validações de campos vazios
    if (!nome || !email || !telefone || !password || !confirmPassword) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    // Validação de e-mail
    if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    // Validação de senha
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    // Recuperar usuários já cadastrados
    const users = JSON.parse(localStorage.getItem('users') || '[]') as {
      nome: string;
      email: string;
      telefone: string;
      password: string;
    }[];

    // Verificar se o e-mail já está cadastrado
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      setError('Este e-mail já está cadastrado.');
      return;
    }

    // Salvar novo usuário
    const newUser = { nome, email, telefone, password };
    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Salvar o nome do usuário no localStorage para uso após login
    localStorage.setItem('nomeUsuario', nome);

    alert('Cadastro realizado com sucesso!');
    navigate(routes.login); // Redirecionar para a página de login
  };

  return (
    <section className={style.container}>
      <div className={style.registerBox}>
        <h2>Crie sua conta</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={({ target }) => setNome(target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={({ target }) => setTelefone(target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
          <button type="submit" className={style.submitButton}>
            Registrar
          </button>
          {error && <p className={style.error}>{error}</p>}
        </form>
        <p>
          Já tem uma conta? <Link to={routes.login}>Faça login</Link>
        </p>
      </div>
    </section>
  );
};

export default CardRegister;
