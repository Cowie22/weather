
import React, { useContext, useState } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

import { AppContext } from '../../contexts/state'

const Map = (props) => {
  const state = useContext(AppContext);
  const {
    handleLongLatFromMap,
  } = state;

  return (
    <section className='map-container'>
      <Container>
        <Row>
          <Col lg={{span: 12}}>
            <h2 className='gold text-center'>
              Click Anywhere On The Map To Get The Forecast
            </h2>
            <div className='inner-map-container'>
              <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBSBuWAjIYxYIqLRmVYltprhS0_mwUO7k8" }}
                className={"map"}
                defaultCenter={{ lat: 40.7128, lng: -74.006 }}
                defaultZoom={0}
                style={{
                  color: "white",
                  height: 600,
                  width: 1000,
                  position: "static",
                  zIndex: 10,
                  top: "24%",
                  right: "28%"
                }}
                yesIWantToUseGoogleMapApiInternals
                // Gets lat/lng from the map on user click
                onClick={event => handleLongLatFromMap(event)}
              >
              </GoogleMapReact>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Map