import style from './style.module.css';

const CardRegister = () => {
  return (
    <>
      <section className={style.container}>
        <div className={style.registerBox}>
          <h2 className={style.welcome}>Criar Conta</h2>
          <form>
            <input type="text" placeholder="Nome de usuário" />
            <input type="email" placeholder="E-mail" />
            <input type="text" placeholder="Telefone" />
            <input type="password" placeholder="Senha" />
            <input type="password" placeholder="Confirme a senha" />
            <button type="submit" className={style.submitButton}>Registrar</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default CardRegister;

