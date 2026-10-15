
import "./ConferenceStatistics.css";

function ConferenceStatistics({ schedules, speakers }) {
  const totalSchedules = schedules.length;

  const totalSpeakers = speakers.length;

  const totalDuration = schedules.reduce((total, schedule) => {
    return total + schedule.time;
  }, 0);

  const freePlaces = schedules.reduce((total, schedule) => {
    return total + schedule.availablePlaces - schedule.alreadyTaken;
  }, 0);

  return (
    <div className="conference-statistics">
      <h2>Статистика конференції</h2>

      <div className="statistics-grid">
        <div className="statistics-card">
          <h3>Кількість доповідей</h3>
          <p>{totalSchedules}</p>
        </div>

        <div className="statistics-card">
          <h3>Кількість доповідачів</h3>
          <p>{totalSpeakers}</p>
        </div>

        <div className="statistics-card">
          <h3>Загальна тривалість</h3>
          <p>{(totalDuration / 60).toFixed(1)} год.</p>
        </div>

        <div className="statistics-card">
          <h3>Вільні місця</h3>
          <p>{freePlaces}</p>
        </div>
      </div>
    </div>
  );
}

export default ConferenceStatistics;
