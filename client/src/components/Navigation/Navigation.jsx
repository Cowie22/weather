import React, { useContext, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

import { AppContext } from "../../contexts/state";

const Navigation = (props) => {
  const [city, handleCity] = useState("RECENTLY SEARCHED");

  const state = useContext(AppContext);
  const {
    currentLat,
    currentLong,
    handleLatLongChange,
    handleDropdownLongLat,
    weatherData,
    currentCity,
    cities,
    getWeatherData,
    getCity,
    addCity,
  } = state;

  let dropdownOptions = cities.map((city, i) => {
    const { name, latitude, longitude } = city;
    let valueArray = [name, latitude, longitude];
    return (
      <option value={valueArray} name={name} key={i}>
        {name}
      </option>
    );
  });

  const handleRecentCityClick = (event) => {
    let cityValues = event.target.value.split(",");
    let recentLat = cityValues[1];
    let recentLong = cityValues[2];
    handleCity(event.target.value);
    handleDropdownLongLat(recentLat, recentLong);
  };

  return (
    <section className="navigation-container">
      <Container>
        <Row>
          <Col lg={{ span: 12 }}>
            <form className="navigation-form">
              <Row>
                <Col lg={{ span: 3, offset: 0 }}>
                  <label className="dropdown-container">
                    <select
                      name="city"
                      value={city}
                      onChange={handleRecentCityClick}
                      default="Recently Searched"
                      className="dropdown"
                    >
                      <option value={"Recently Searched"} key={0}>
                        Recently Searched
                      </option>
                      {dropdownOptions}
                    </select>
                  </label>
                </Col>
                <Col lg={{ span: 3, offset: 0 }}>
                  <input
                    type="text"
                    name="currentLat"
                    placeholder={"Insert Latitude"}
                    className="input-field"
                    id="lat"
                    value={currentLat}
                    onChange={handleLatLongChange}
                  />
                </Col>
                <Col lg={{ span: 3, offset: 0 }}>
                  <input
                    type="text"
                    name="currentLong"
                    placeholder={"Insert Longitude"}
                    className="input-field"
                    id="long"
                    value={currentLong}
                    onChange={handleLatLongChange}
                  />
                </Col>
                <Col lg={{ span: 3, offset: 0 }}>
                  <div
                    className="cta-btn-container"
                    onClick={(e) => {
                      e.preventDefault();
                      getWeatherData(currentLat, currentLong);
                    }}
                  >
                    <button className="cta-btn gold-btn">Get Weather</button>
                  </div>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Navigation;
