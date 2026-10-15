
import React from "react";
import "./SpeakersList.css";

class SpeakersList extends React.Component {
  constructor() {
    super();

    this.state = {
      specialization: "all",
      sortOrder: "desc",

      
    };
  }

  handleSpecializationChange = (event) => {
    this.setState({
      specialization: event.target.value,
    });
  };

  handleSortChange = (event) => {
    this.setState({
      sortOrder: event.target.value,
    });
  };

  render() {
    const {  specialization, sortOrder } = this.state;
    const { speakers } = this.props;

    const filteredSpeakers = speakers.filter((speaker) => {
      return (
        specialization === "all" ||
        speaker.specialization === specialization
      );
    });

    const sortedSpeakers = [...filteredSpeakers].sort((a, b) => {
      if (sortOrder === "desc") {
        return b.rating - a.rating;
      }

      return a.rating - b.rating;
    });

    return (
      <div className="speakers-container">
        <h1 className="speakers-title">Наші доповідачі</h1>

        <div className="speakers-filters">
          <label>
            Спеціалізація:
            <select
              value={specialization}
              onChange={this.handleSpecializationChange}
            >
              <option value="all">Усі спеціалізації</option>
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Node.js">Node.js</option>
            </select>
          </label>

          <label>
            Сортування за рейтингом:
            <select value={sortOrder} onChange={this.handleSortChange}>
              <option value="desc">Від більшого до меншого</option>
              <option value="asc">Від меншого до більшого</option>
            </select>
          </label>
        </div>

        <div className="speakers-list">
          {sortedSpeakers.length > 0 ? (
            sortedSpeakers.map((speaker) => (
              <div className="speaker-card" key={speaker.id}>
                <div className="speaker-avatar">
                  {speaker.name.charAt(0)}
                </div>

                <h2>{speaker.name}</h2>

                <p className="speaker-specialization">
                  {speaker.specialization}
                </p>

                <p>
                  Досвід: {speaker.experience}{" "}
                  {speaker.experience === 1
                    ? "рік"
                    : speaker.experience >= 2 && speaker.experience <= 4
                      ? "роки"
                      : "років"}
                </p>

                <div className="speaker-rating">
                  <span>★</span> {speaker.rating.toFixed(1)} / 5
                </div>
              </div>
            ))
          ) : (
            <p>Доповідачів не знайдено.</p>
          )}
        </div>

        <p className="speakers-count">
          Кількість доповідачів: {sortedSpeakers.length}
        </p>
      </div>
    );
  }
}

export default SpeakersList;
