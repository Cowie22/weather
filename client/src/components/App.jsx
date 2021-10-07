import React, { useContext } from 'react';
import '../main.scss';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap'

import { AppContext } from '../contexts/state'

const App = (props) => {
  const state = useContext(AppContext);
  const {
    isCookieVisible,
    handleIsCookieVisible
  } = state;
  return (
    <section className='app-container'>
      <Container>
        <Row>
          <Col lg={{span: 10, offset: 1}}>
            <h1 className='gold' onClick={() => handleIsCookieVisible(!isCookieVisible)}>
              HELLO WORLD
            </h1>
            {
              isCookieVisible ?
                <h2 className='gold'>
                  HELLO HIDDEN WORLD
                </h2>
              :
                <div>

                </div>
            }
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default App