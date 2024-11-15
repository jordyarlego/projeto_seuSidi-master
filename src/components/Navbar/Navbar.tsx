import style from './styles.module.css';
import logoName from '../../assets/logoName.svg';
import iconeLogo from '../../assets/iconeLogo.svg';



const Navbar = () => {
  return (
    <section className={style.container}>
        <div className={style.logo}>
            <img src={iconeLogo} alt="iconde da logo" />
            <img src={logoName} alt="" />
           
        </div>
    </section>
  )
}

export default Navbar
