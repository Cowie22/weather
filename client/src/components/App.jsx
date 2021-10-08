import React, { useContext } from 'react';
import '../main.scss';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap'

import { AppContext } from '../contexts/state'

const App = (props) => {
  return (
    <section className='app-container'>
      <Container>
        <Row>
          <Col lg={{span: 10, offset: 1}}>
            <h1 className='gold'>
              HELLO WORLD
            </h1>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default App