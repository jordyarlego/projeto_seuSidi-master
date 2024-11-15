import style from './style.module.css';
import heroImage from '../../../assets/heroImage.svg';

const Hero = () => {

  return (
    <section className={style.container}>
      <div className={style.heroSection}>
        <div className={style.title}>
          <span className={style.hoverEffect}>Seu</span>
          <span className={`${style.hoverEffect} ${style.sidi}`}>SiDi</span>
        </div>
        <div className={style.imageHero}>
          <img src={heroImage} alt="Hero" className={style.heroImage} />
        </div>
      </div>
    </section>
  );
}

export default Hero;
