
import CardRegister from "../../components/Login/CardRegister/CardRegister";
import Hero from "../../components/Login/HeroLogin/Hero";
import Navbar from "../../components/Navbar/Navbar"
import style from './styles.module.css';

const Register = () => {
  return (
    <div className={style.container}>
      <Navbar />
      <div className={style.group}>
        <Hero/>
        
        <CardRegister/>
        
      </div>
    </div>
  )
}

export default Register