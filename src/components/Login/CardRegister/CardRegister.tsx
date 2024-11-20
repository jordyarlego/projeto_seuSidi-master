import { useState } from 'react';
import style from './style.module.css';
import { useNavigate } from 'react-router-dom';  // Importe o useNavigate

const CardRegister = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();  // Crie a constante navigate para redirecionar

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]') as {
      username: string;
      email: string;
      phone: string;
      password: string;
    }[];

    const userExists = users.some(
      (user) => user.username === username || user.email === email
    );

    if (userExists) {
      setError("Usuário ou e-mail já cadastrado!");
      return;
    }

    const newUser = { username, email, phone, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    setUsername("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setError("");

    alert("Cadastro realizado com sucesso!");

    // Redireciona para a página de login após o cadastro
    navigate('/');  // Ou use o caminho de login da sua aplicação, como `routes.login`
  };

  return (
    <section className={style.container}>
      <div className={style.registerBox}>
        <h2 className={style.welcome}>Criar Conta</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className={style.submitButton}>
            Registrar
          </button>
        </form>
        {error && <p className={style.error}>{error}</p>}
      </div>
    </section>
  );
};

export default CardRegister;
