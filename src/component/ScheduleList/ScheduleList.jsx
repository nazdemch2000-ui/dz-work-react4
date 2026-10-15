import React from "react";
import "./ScheduleList.css";


class ScheduleList extends React.Component {
  constructor() {
    super();

    this.state = {
      category: "all",
      sortOrder: "desc",

    
    };
  }

  
  handleCategoryChange = (event) => {
    this.setState({
      category: event.target.value,
    });
  };

  handleSortChange = (event) => {
    this.setState({
      sortOrder: event.target.value,
    });
  };

  render() {
    const { category, sortOrder } = this.state;
    const { schedules } = this.props;

    const filteredSchedules = schedules.filter((schedule) => {
      return (
        category === "all" ||
        schedule.category === category
      );
    });

    const sortedSchedules = [...filteredSchedules].sort((a, b) => {
      const freePlacesA = a.availablePlaces - a.alreadyTaken;
      const freePlacesB = b.availablePlaces - b.alreadyTaken;

      if (sortOrder === "desc") {
        return freePlacesB - freePlacesA;
      }

      return freePlacesA - freePlacesB;
    });

    return (
      <div className="schedule-container">

        <h1 className="schedule-title">Розклад доповідей</h1>

        <div className="schedule-filters">
          <label>
            Категорія:
            <select
              value={category}
              onChange={this.handleCategoryChange}
            >
              <option value="all">Усі категорії</option>
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Node.js">Node.js</option>
            </select>
          </label>

          <label>
            Сортування за вільними місцями:
            <select
              value={sortOrder}
              onChange={this.handleSortChange}
            >
              <option value="desc">Від більшого до меншого</option>
              <option value="asc">Від меншого до більшого</option>
            </select>
          </label>
        </div>

        <div className="schedule-list">
          {sortedSchedules.length > 0 ? (
            sortedSchedules.map((schedule) => (
              <div className="schedule-card" key={schedule.id}>
                <h2>{schedule.name}</h2>

                <p className="schedule-category">
                  {schedule.category}
                </p>

                <p>
                  Тривалість: {(schedule.time / 60).toFixed(1)} год.
                </p>

                <p>
                  Усього місць: {schedule.availablePlaces}
                </p>


                <div className="schedule-places">
                  <span>Вільних місць:</span>{" "}
                  {schedule.availablePlaces - schedule.alreadyTaken}
                </div>
              </div>
            ))
          ) : (
            <p>Доповідей не знайдено.</p>
          )}
        </div>

        <p className="schedule-count">
          Кількість доповідей: {sortedSchedules.length}
        </p>
      </div>
    );
  }
}

export default ScheduleList;
