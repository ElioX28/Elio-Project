import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Landingpage = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center mb-5">MBTA Transit Scheduling App</h1>
          <p className="lead text-center mb-5">
            A web application designed to help you navigate and schedule your trip on the MBTA.
          </p>
          <div className="text-center">
            <Link to="/signup">
              <Button variant="primary" className="me-2">
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline-primary">Login</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Landingpage;