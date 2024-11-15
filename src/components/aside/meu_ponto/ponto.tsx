import { useContext, useEffect, useState } from 'react';
import heroImage from '../../../assets/heroImage.svg';
import { AuthContext } from '../../../contexts/AuthProvider';
import style from './styles.module.css';

const MeuPonto = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const dates = [
    '01/10/2024 a 31/10/2024',
    'Novembro 2024',
    'Dezembro 2024',
    'Janeiro 2025',
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % dates.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + dates.length) % dates.length
    );
  };

  const handleRegister = () => {
    alert('Ponto registrado!');
  };

  const handleSuggestion = () => {
    alert('Sugestão de ajuste enviada!');
  };

  const { handleLogout } = useContext(AuthContext);

  return (
    <div className={style.pageContainer}>
      <div className={style.mainContent}>
        <header className={style.header}>
          <h1 className={style.title}>Ponto</h1>
          <button onClick={handleLogout} className={style.logoutButton}>
            Sair
          </button>
        </header>

        <div className={style.carousel}>
          <button
            onClick={handlePrev}
            className={style.carouselButton}
            aria-label='Anterior'
          >
            &lt;
          </button>
          <span>{dates[activeIndex]}</span>
          <button
            onClick={handleNext}
            className={style.carouselButton}
            aria-label='Próximo'
          >
            &gt;
          </button>
        </div>

        <section className={style.content}>
          <article className={style.timeRecords}>
            <div className={style.alert}>Você possui 09 inconsistências</div>
            <table className={style.table}>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Marcação (Início/Fim)</th>
                  <th>Resultado</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>25/10 Sexta</td>
                  <td>
                    Início: 10:50 <br />
                    Fim: 18:00
                  </td>
                  <td>
                    <span role='img' aria-label='atencao'>
                      ⚠️
                    </span>{' '}
                    Aguardando processamento
                  </td>
                  <td>
                    <button
                      onClick={handleRegister}
                      className={style.registerButton}
                    >
                      Registrar
                    </button>
                    <button
                      onClick={handleSuggestion}
                      className={style.suggestButton}
                    >
                      Sugerir ajuste
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>24/10 Quinta</td>
                  <td>
                    Início: 09:00 <br />
                    Fim: 17:00
                  </td>
                  <td>Falta</td>
                  <td>
                    <button
                      onClick={handleRegister}
                      className={style.registerButton}
                    >
                      Registrar
                    </button>
                    <button
                      onClick={handleSuggestion}
                      className={style.suggestButton}
                    >
                      Sugerir ajuste
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </article>

          <article className={style.summary}>
            <h2>Total de horas</h2>
            <div className={style.totalHoursBox}>
              <p className={style.totalHours}>
                Horas em folha: <span className={style.greenText}>180h</span>
              </p>
            </div>
            <h2>Minha localização</h2>
            <div className={style.map}>
              <iframe
                width='100%'
                height='200px'
                frameBorder='0'
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA2Vsh8WKp-wLV9jX6_GZ1VV9UR3glnsq0&q=${location.lat},${location.lng}`}
                allowFullScreen
                aria-label='Mapa da sua localização'
              ></iframe>
            </div>
          </article>
        </section>

        <div className={style.heroContainer}>
          <img src={heroImage} alt='Hero' className={style.heroImage} />
        </div>
      </div>
    </div>
  );
};

export default MeuPonto;
