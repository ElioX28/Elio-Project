import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavigationBar() {
  const [user, setUser] = useState({})

  useEffect(() => {
    setUser(getUserInfo())
  }, [])

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{ fontSize: "22px" }}>Start</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto align-items-center">
            <Nav.Link href="/home" style={{ fontSize: "22px" }}>Home</Nav.Link>
            <NavDropdown title="Schedule" style={{ fontSize: "22px" }} id="basic-nav-dropdown">
              <NavDropdown.Item href="/cmlines">Commuter Rail</NavDropdown.Item>
              <NavDropdown.Item href="/subwaylines">Subway</NavDropdown.Item>
              <NavDropdown.Item href="/buslines">Bus</NavDropdown.Item>
              <NavDropdown.Item href="/ferrylines">Ferry</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/map" style={{ fontSize: "22px" }}>Maps</Nav.Link>
            <Nav.Link href="/addComment" style={{ fontSize: "22px" }}>Comment</Nav.Link>
            <Nav.Link href="/privateUserProfile" style={{ fontSize: "22px" }}>Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
