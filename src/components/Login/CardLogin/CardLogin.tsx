import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { routes } from '../../../Router/routes'; // Certifique-se de importar os routes corretamente

const CardLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate(); // Para redirecionamento após login bem-sucedido

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Recuperar usuários do localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]') as {
      email: string;
      password: string;
    }[];

    // Verificar se o usuário está cadastrado
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Login bem-sucedido
      alert('Login realizado com sucesso!');
      navigate(routes.inicio); // Redirecionar para a página inicial após login bem-sucedido
    } else {
      // Login falhou
      setError('E-mail ou senha inválidos.');
    }
  };

  return (
    <section className={style.container}>
      <div className={style.loginBox}>
        <h2 className={style.welcome}>Bem-vindo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="E-mail de usuário"
            name="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button type="submit" className={style.submitButton}>
            Entrar
          </button>
          <div className={style.options}>
            <label className={style.rememberMe}>
              <input type="checkbox" />
              Lembre de mim
            </label>
            <Link to={routes.esqueciSenha} className={style.forgotPassword}>
              Esqueceu sua senha?
            </Link>
          </div>
          <p>
            Não é um membro? <Link to={routes.cadastro}>Inscreva-se agora</Link>
          </p>
          {error && <p className={style.error}>{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default CardLogin;
