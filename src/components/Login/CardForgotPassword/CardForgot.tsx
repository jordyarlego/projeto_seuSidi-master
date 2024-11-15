import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.css';
import { routes } from '../../../Router/routes'; // Certifique-se de importar os routes

const CardForgot = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica para processar a solicitação de redefinição de senha
    alert(`Link de redefinição de senha enviado para: ${email}`);
  };

  return (
    <div className={style.container}>
      <div className={style.forgotBox}>
        <h2 className={style.welcome}>Recuperar Senha</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='E-mail de usuário'
            name='email'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <button type='submit' className={style.submitButton}>
            Enviar
          </button>
          <div className={style.options}>
            <Link to={routes.login} className={style.backToLogin}>
              Voltar ao Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardForgot;

