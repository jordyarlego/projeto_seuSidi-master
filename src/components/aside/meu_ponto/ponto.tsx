import { useContext, useEffect, useState } from 'react';
import heroImage from '../../../assets/heroImage.svg';
import { AuthContext } from '../../../contexts/AuthContext';
import style from './styles.module.css';

type Ponto = {
  data: string;
  hora: string;
  status: string;
};

const MeuPonto = () => {
  const [activeDate, setActiveDate] = useState(new Date());
  const [location, setLocation] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [horaDoDia, setHoraDoDia] = useState(new Date());
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [usuarioLogado, setUsuarioLogado] = useState('');

  const { handleLogout } = useContext(AuthContext);

  useEffect(() => {
    // Recuperar o nome do usuário logado do localStorage
    const storedUser = localStorage.getItem('nomeUsuario');
    setUsuarioLogado(storedUser || 'Usuário');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }

    const pontosSalvos = JSON.parse(localStorage.getItem('pontos') || '[]');
    setPontos(pontosSalvos);

    const atualizarHora = setInterval(() => {
      setHoraDoDia(new Date());
    }, 1000);

    return () => clearInterval(atualizarHora);
  }, []);

  const horaAtual = horaDoDia.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const handleRegister = () => {
    const novoPonto: Ponto = {
      data: new Date().toLocaleDateString('pt-BR'),
      hora: horaAtual,
      status: 'Registrado',
    };

    const novosPontos = [...pontos, novoPonto];
    setPontos(novosPontos);
    localStorage.setItem('pontos', JSON.stringify(novosPontos));

    alert('Ponto registrado!');
  };

  const handleSuggestion = () => {
    alert('Sugestão de ajuste enviada!');
  };

  const generateDaysOfMonth = (date: Date) => {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1); // Primeiro dia do mês
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0); // Último dia do mês
    const days: Date[] = [];

    for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i));
    }

    return days;
  };

  const handleChangeMonth = (direction: 'prev' | 'next') => {
    setActiveDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className={style.pageContainer}>
      <div className={style.mainContent}>
        <header className={style.header}>
          <h1 className={style.title}>Ponto</h1>
          <div className={style.clockContainer}>
            <p className={style.clock}>{horaAtual}</p>
            <div className={style.profile}>
              <span>Bem-vindo, {usuarioLogado}</span>
              <button onClick={handleLogout} className={style.logoutButton}>
                Sair
              </button>
            </div>
          </div>
          <div className={style.alert}>Você possui 09 inconsistências</div>
        </header>
      </div>
      
      {/* Divisão lado a lado */}
      <div className={style.content}>
        <div className={style.timeRecordsContainer}>
          <article className={style.timeRecords}>
            <div className={style.buttonContainer}>
              <button onClick={handleRegister} className={style.batidaDePontoButton}>
                Bater ponto
              </button>
            </div>
            <table className={style.table}>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Hora</th>
                  <th>Resultado</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {pontos.map((ponto, index) => (
                  <tr key={index}>
                    <td>{ponto.data}</td>
                    <td>{ponto.hora}</td>
                    <td>{ponto.status}</td>
                    <td>
                      <button onClick={handleSuggestion} className={style.suggestButton}>
                        Sugerir ajuste
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </div>
        <div className={style.summaryContainer}>
          {/* Calendário */}
          <div className={style.calendarContainer}>
            <div className={style.calendarioHeader}>
              <button onClick={() => handleChangeMonth('prev')} className={style.carouselButton}>
                &lt;
              </button>
              <span className={style.monthTitle}>
                {activeDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
              </span>
              <button onClick={() => handleChangeMonth('next')} className={style.carouselButton}>
                &gt;
              </button>
            </div>
            <div className={style.calendar}>
              {generateDaysOfMonth(activeDate).map((day, index) => (
                <div
                  key={index}
                  className={`${style.day} ${day.toDateString() === new Date().toDateString() ? style.today : ''}`}
                >
                  {day.getDate()}
                </div>
              ))}
            </div>
          </div>
          <div className={style.heroContainer}>
            <img src={heroImage} alt="Hero" className={style.heroImage} />
          </div>
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
                width="100%"
                height="200px"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${location.lat},${location.lng}`}
                allowFullScreen
                aria-label="Mapa da sua localização"
              ></iframe>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default MeuPonto;
