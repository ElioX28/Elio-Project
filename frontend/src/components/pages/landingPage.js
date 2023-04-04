import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Landingpage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getContainerStyle = () => {
    return {
      backgroundColor: darkMode ? '#222' : '#fff',
      color: darkMode ? '#fff' : '#222',
    };
  };

  const getButtonVariant = () => {
    return darkMode ? 'outline-light' : 'outline-primary';
  };

  return (
    <Container className="mt-5" style={getContainerStyle()}>
      <Row>
        <Col>
          <h1 className="text-center mb-5">MBTA Transit Scheduling App</h1>
          <p className="lead text-center mb-5">
            A web application designed to help you navigate and schedule your trip on the MBTA.
          </p>
          <div className="text-center">
            <Link to="/signup">
              <Button variant={getButtonVariant()} className="me-2">
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button variant={getButtonVariant()}>Login</Button>
            </Link>
          </div>
          <div className="text-end mt-3">
            <Button variant={getButtonVariant()} onClick={handleToggleDarkMode}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Landingpage;
