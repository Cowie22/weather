
import React, { useContext, useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import { Container, Row, Col } from 'react-bootstrap'

import { AppContext } from '../../contexts/state'

const Display = (props) => {
  const state = useContext(AppContext);
  const {
    weatherData,
  } = state;

  const colorAccordingToWeather = {
    sn: 'rgba(0, 210, 255, 0.5)',
    sl: 'rgba(102, 166, 255, 0.5)',
    h: 'rgba(63, 170, 212, 0.5)',
    t: 'rgba(97, 97, 97, 0.5)',
    hr: 'rgba(0, 91, 234, 0.5)',
    lr: 'rgba(7, 101, 133, 0.5)',
    s: 'rgba(60, 211, 173, 0.5)',
    hc: 'rgba(128, 128, 128, 0.5)',
    lc: 'rgba(192, 192, 192, 0.5)',
    c: 'rgba(247, 183,	51, 0.5)',
  }

  const celsiusToFahrenheit = (temp) => {
    let fahrenheit = (temp * (9/5)) + 32;
    return fahrenheit.toFixed(0)
  };

  let forecastData = weatherData.consolidated_weather.slice(0, 5).map((day, i) => {
    let color = colorAccordingToWeather[day.weather_state_abbr];
    let temp = celsiusToFahrenheit(day.the_temp);
    let maxTemp = celsiusToFahrenheit(day.max_temp);
    let minTemp = celsiusToFahrenheit(day.min_temp);
    return (
      <Col className='forecast-col'>
        <div className='inner-forecast-container' style={{backgroundColor: color}} key={i}>
          <div className='day-container'>
            <p className='text-center grey'>
              {day.applicable_date.slice(5)}
            </p>
            <h4 className='text-center grey'>
              {day.weather_state_name}
            </h4>
          </div>
          <Row>
            <Col lg={{span: 5, offset: 0}}>
              <div className='temp-container'>
                <p>
                  {'  '} {temp}˚F
                </p>
                <p>
                  High {'  '} {maxTemp}˚F
                </p>
                <p>
                  Low {'  '} {minTemp}˚F
                </p>
              </div>
            </Col>
            <Col lg={{span: 5, offset: 1}}>
              <div className='misc-weather-container'>
                <p>
                  Hum: {' '} {day.humidity}%
                </p>
                <p>
                  Wind {' '}{(day.wind_speed * 0.621371).toFixed(0)}mph
                </p>
              </div>
            </Col>
          </Row>
          <div className='weather-logo-container'>
            <img
              src={`https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg`}
            />
          </div>
        </div>
      </Col>
    )
  });

  return (
    <section class='display-container'>
      <Container>
        <Row>
          <Col lg={{span: 12, offset: 0}}>
            <Row>
              <Fade
              // Animation for smoother forecast display transition
                down
                duration={2000}
                distance={'800px'}
              >
                <div className='inner-weather-container'>
                  <h1 className='gold text-center'>
                    {weatherData.title}
                  </h1>
                  <div className='forecast-container'>
                    {forecastData}
                  </div>
                </div>
              </Fade>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Display