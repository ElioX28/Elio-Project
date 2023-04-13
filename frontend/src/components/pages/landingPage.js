import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Container fluid className="d-flex flex-column" style={{ minHeight: '100vh', backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/73/MBTA_Green_Line_3907_at_Riverside_station.jpg")', backgroundSize: 'cover',  backgroundPosition: 'center',backgroundColor: 'rgba(255, 255, 255, 0.3)', backgroundBlendMode: 'overlay' }}>
      <Row className="flex-grow-1 align-items-center">
        <Col>
          <h1 className="text-center mb-5" style={{ textShadow: '1px 1px 10px rgba(255, 255, 255, 1.0)' , fontSize: '4rem' , fontFamily: '"Playfair Display", serif', fontWeight: 'bold' }}>MBTA Transit Scheduling App</h1>
          <p className="lead text-center mb-5" style={{ textShadow: '1px 1px 10px rgba(255, 255, 255, 1.0)', fontSize: '2rem' , fontFamily: '"Playfair Display", serif', fontWeight: 'bold' }}>
            A web application designed to help you navigate and schedule your trip on the MBTA.
          </p>
          <div className="text-center">
            <Link to="/signup">
              <Button variant="success" className="me-2" style={{ textShadow: '1px 1px 10px rgba(255, 255, 255, 0.5)' , fontSize: '1.5rem', fontFamily: '"Playfair Display", serif', fontWeight: 'bold' }}>
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="success" style={{ textShadow: '1px 1px 10px rgba(255, 255, 255, 0.5)' ,fontSize: '1.5rem',   fontFamily: '"Playfair Display", serif', fontWeight: 'bold' }}>Login</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
