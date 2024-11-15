
import MeuPonto from "../../components/aside/meu_ponto/ponto";
import Navbar from "../../components/Navbar/Navbar"
import style from './styles.module.css';

const Register = () => {
  return (
    <div className={style.container}>
      <Navbar />
      <div className={style.group}>
       <MeuPonto/>
      </div>
    </div>
  )
}

export default Register