
import React, { useContext, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

import { AppContext } from '../../contexts/state'

const Navigation = (props) => {
  const [lat, handleLat] = useState("");
  const [long, handleLong] = useState("");
  const [city, handleCity] = useState("RECENTLY SEARCHED");

  const state = useContext(AppContext);
  const {
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
      <option
        value={valueArray}
        name={name}
        key={i}
      >
        {name}
      </option>
    )
  });

  const handleRecentCityClick = (event) => {
    let cityValues = (event.target.value).split(',')
    let currentLat = cityValues[1];
    let currentLong = cityValues[2];
    handleCity(event.target.value);
    handleLat(currentLat);
    handleLong(currentLong);
  }

  return (
    <section className="navigation-container">
      <Container>
        <Row>
          <Col lg={{ span: 12 }}>
            <form className="navigation-form">
              <Row>
                <Col lg={{ span: 4, offset: 0 }}>
                  <input
                    type="text"
                    name="latitude"
                    placeholder={"Insert Latitude"}
                    className="input-field"
                    id="lat"
                    value={lat}
                    onChange={(e) => handleLat(e.target.value)}
                  />
                </Col>
                <Col lg={{ span: 4, offset: 1 }}>
                  <input
                    type="text"
                    name="longitude"
                    placeholder={"Insert Longitude"}
                    className="input-field"
                    id="long"
                    value={long}
                    onChange={(e) => handleLong(e.target.value)}
                  />
                </Col>
                <Col lg={{ span: 2, offset: 1 }}>
                  <div 
                    className='cta-btn-container' 
                    onClick={(e) => {
                      e.preventDefault()
                      getWeatherData(lat, long)
                    }}
                  >
                    <button className='cta-btn gold-btn'>
                      Get Weather
                    </button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={{span: 10, offset: 1}}>
                  <label className='dropdown-container'>
                    <select
                      name="city"
                      value={city}
                      onChange={handleRecentCityClick}
                      default='Recently Searched'
                      className='dropdown'
                      // Ensures that the lat/lng input fields can be utilized by the map and dropdown/manual input
                      // onClick={() => handleManualVsMapInput()}
                    >
                      <option value={'Recently Searched'} key={0}>Recently Searched</option>
                      {dropdownOptions}
                    </select>
                  </label>
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
