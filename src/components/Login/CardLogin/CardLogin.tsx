import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import style from './style.module.css';
import { routes } from '../../../Router/routes'; // Certifique-se de importar os routes

const CardLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useContext(AuthContext);

  const handleSubmit = async () => {
    await handleLogin(email, password);
  };

  return (
    <section className={style.container}>
      <div className={style.loginBox}>
        <h2 className={style.welcome}>Bem-vindo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='E-mail de usuário'
            name='email'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <input
            type='password'
            placeholder='Senha'
            name='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button type='submit' className={style.submitButton}>
            Entrar
          </button>
          <div className={style.options}>
            <label className={style.rememberMe}>
              <input type='checkbox' />
              Lembre de mim
            </label>
            <Link to={routes.esqueciSenha} className={style.forgotPassword}>
              Esqueceu sua senha?
            </Link>
          </div>
          <p>
            Não é um membro? <Link to={routes.cadastro}>Inscreva-se agora</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default CardLogin;

