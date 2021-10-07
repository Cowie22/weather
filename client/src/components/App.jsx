import React from 'react';
import '../main.scss';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap'



const App = () => {
  return (
    <section class='app-container'>
      <Container>
        <Row>
          <Col lg={12}>
            <h1>
              HELLO WORLD
            </h1>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default App