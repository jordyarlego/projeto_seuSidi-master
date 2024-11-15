import CardLogin from "../../components/Login/CardLogin/CardLogin";
import Hero from "../../components/Login/HeroLogin/Hero";
import Navbar from "../../components/Navbar/Navbar"
import style from './styles.module.css';

const Login = () => {
  return (
    <div className={style.container}>
      <Navbar />
      <div className={style.group}>
        <Hero />
        <CardLogin />
      </div>
    </div>
  )
}

export default Login
