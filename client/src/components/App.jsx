import React, { useContext, useState, useEffect } from 'react';
import '../main.scss';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap'

import { AppContext } from '../contexts/state'

import Navigation from './Navigation/Navigation'
import Display from './Display/Display'

const App = (props) => {
  const state = useContext(AppContext);
  const {
    weatherData,
    currentCity,
    cities,
    getWeatherData,
    getCity,
    addCity,
  } = state;

  useEffect(() => {
    getCity();
  }, [])
  console.log('DATA', weatherData)
  console.log('currentCity', currentCity)
  console.log('cities', cities)
  return (
    cities.length > 0 ?
    <>
      <section className='app-container'>
        <Container>
          <Row>
            <Col lg={{span: 10, offset: 1}}>
              <h1 className='gold text-center'>
                Weather App
              </h1>
            </Col>
          </Row>
        </Container>
      </section>
      <Navigation />
      {
        weatherData.consolidated_weather ?
          <Display />
        :
        <div>
          
        </div>
      }
    </>
    :
    <div>
      ...LOADING
    </div>
  )
}

export default App