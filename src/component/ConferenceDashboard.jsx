import { useState, useEffect } from "react";
import SpeakersList from "./SpeakersList/SpeakersList";
import ScheduleList from "./ScheduleList/ScheduleList";
import RegistrationPanel from "./RegistrationPanel/RegistrationPanel";
import ConferenceStatistics from "./ConferenceStatistics";
import "./ConferenceDashboard.css";

function ConferenceDashboard() {
  const [schedules, setSchedules] = useState(() => {
    try {
      const savedSchedules = localStorage.getItem("schedules");

      if (savedSchedules) {
        return JSON.parse(savedSchedules);
      }
    } catch (error) {
      console.error("Ошибка загрузки расписания:", error);
    }

    return [
      { id: 1, name: "Вступ", category: "React", time: 120, availablePlaces: 30, alreadyTaken: 12 },
      { id: 2, name: "JavaScript operator", category: "JavaScript", time: 120, availablePlaces: 30, alreadyTaken: 8 },
      { id: 3, name: "React operator", category: "React", time: 140, availablePlaces: 30, alreadyTaken: 1 },
      { id: 4, name: "Node.js", category: "Node.js", time: 60, availablePlaces: 30, alreadyTaken: 10 },
      { id: 5, name: "JavaScript function", category: "JavaScript", time: 60, availablePlaces: 30, alreadyTaken: 5 },
      { id: 6, name: "Node.js practice", category: "Node.js", time: 160, availablePlaces: 30, alreadyTaken: 3 },
    ];
  });

  const [registrations, setRegistrations] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("registrations")) || [];
    } catch (error) {
      console.error("Ошибка загрузки регистраций:", error);
      return [];
    }
  });

  const [speakers] = useState([
    {
      id: 1,
      name: "Олександр Петренко",
      specialization: "React",
      experience: 5,
      rating: 4.9,
    },
    {
      id: 2,
      name: "Марія Коваленко",
      specialization: "JavaScript",
      experience: 3,
      rating: 4.7,
    },
    {
      id: 3,
      name: "Андрій Шевченко",
      specialization: "React",
      experience: 7,
      rating: 4.8,
    },
    {
      id: 4,
      name: "Ірина Мельник",
      specialization: "Node.js",
      experience: 4,
      rating: 4.6,
    },
    {
      id: 5,
      name: "Дмитро Бондар",
      specialization: "JavaScript",
      experience: 6,
      rating: 4.5,
    },
    {
      id: 6,
      name: "Софія Ткаченко",
      specialization: "Node.js",
      experience: 2,
      rating: 4.9,
    },
  ]);

  useEffect(() => {
    localStorage.setItem("schedules", JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    localStorage.setItem("registrations", JSON.stringify(registrations));
  }, [registrations]);

  const takePlaces = (id) => {
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) =>
        schedule.id === id &&
        schedule.alreadyTaken < schedule.availablePlaces
          ? {
              ...schedule,
              alreadyTaken: schedule.alreadyTaken + 1,
            }
          : schedule
      )
    );
  };

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <SpeakersList speakers={speakers} />
      </aside>

      <main className="dashboard-main">
        <ConferenceStatistics
          schedules={schedules}
          speakers={speakers}
        />

        <RegistrationPanel
          schedules={schedules}
          registrations={registrations}
          setRegistrations={setRegistrations}
          takePlaces={takePlaces}
        />

        <ScheduleList schedules={schedules} />
      </main>
    </div>
  );
}

export default ConferenceDashboard;
