import CardForgot from "../../components/Login/CardForgotPassword/CardForgot";
import Hero from "../../components/Login/HeroLogin/Hero";
import Navbar from "../../components/Navbar/Navbar";
import style from './styles.module.css';

const ForgotPassword = () => {
  return (
    <div className={style.container}>
      <Navbar />
      <div className={style.group}>
        <Hero />
        <CardForgot />
      </div>
    </div>
  );
};

export default ForgotPassword;

