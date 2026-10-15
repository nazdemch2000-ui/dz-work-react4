
import { useState, useEffect } from "react";
import "./RegistrationPanel.css";

function RegistrationPanel({
  schedules,
  registrations,
  setRegistrations,
  takePlaces,
}) {
  const [category, setCategory] = useState("React");
  const [scheduleId, setScheduleId] = useState("");

  useEffect(() => {
    localStorage.setItem("registrations", JSON.stringify(registrations));
  }, [registrations]);

  const filteredSchedules = schedules.filter((schedule) => {
    return schedule.category === category;
  });

  function handleCategoryChange(event) {
    setCategory(event.target.value);
    setScheduleId("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim().toLowerCase();

    if (!scheduleId) {
      alert("Выбери доклад");
      return;
    }

    const selectedSchedule = schedules.find(
      (schedule) => schedule.id === Number(scheduleId)
    );

    if (
      !selectedSchedule ||
      selectedSchedule.alreadyTaken >= selectedSchedule.availablePlaces
    ) {
      alert("Вільних місць немає");
      return;
    }

    const alreadyRegistered = registrations.some((registration) => {
      return (
        registration.email === email &&
        registration.scheduleId === Number(scheduleId)
      );
    });

    if (alreadyRegistered) {
      alert("Вже зареєстровано");
      return;
    }

    const newRegistration = {
      id: Date.now(),
      name,
      email,
      scheduleId: Number(scheduleId),
      category,
    };

    setRegistrations((prev) => [...prev, newRegistration]);
    takePlaces(Number(scheduleId));

    event.currentTarget.reset();
    setCategory("React");
    setScheduleId("");

    console.log(newRegistration);
    alert("Успішно!");
  }

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
        />

        <label>
          Category:
          <select value={category} onChange={handleCategoryChange}>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Node.js">Node.js</option>
          </select>
        </label>

        <label>
          Talk:
          <select
            value={scheduleId}
            onChange={(event) => setScheduleId(event.target.value)}
            required
          >
            <option value="">Choose a talk</option>
            {filteredSchedules.map((schedule) => (
              <option key={schedule.id} value={schedule.id}>
                {schedule.name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Add to schedule</button>
      </form>
    </div>
  );
}

export default RegistrationPanel;
