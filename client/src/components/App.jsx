import React, { useContext, useState, useEffect } from 'react';
import '../main.scss';
import { hot } from 'react-hot-loader/root';
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
      <section className='display-container'>
        {
          weatherData.consolidated_weather ?
            <Display />
          :
          <div>

          </div>
        }
      </section>
    </>
    :
    <div>
      ...LOADING
    </div>
  )
}

export default hot(App)