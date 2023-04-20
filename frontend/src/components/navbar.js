import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';

export default function Navbar() {
  const [user, setUser] = useState({})

  useEffect(() => {
    setUser(getUserInfo())
  }, [])
  
  return (
    <ReactNavbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto align-items-center">
          <Nav.Link href="/" style={{ fontSize: "22px" }}>Start</Nav.Link>
          <Nav.Link href="/home" style={{ fontSize: "22px" }}>Scheduling</Nav.Link>
          <Nav.Link href="/cmlines" style={{ fontSize: "17px" }}>Commuter Rail</Nav.Link>
          <Nav.Link href="/subwaylines" style={{ fontSize: "17px" }}>Subway</Nav.Link>
          <Nav.Link href="/buslines" style={{ fontSize: "17px" }}>Bus</Nav.Link>
          <Nav.Link href="/ferrylines" style={{ fontSize: "17px" }}>Ferry</Nav.Link>
          <Nav.Link href="/map" style={{ fontSize: "22px" }}>Maps</Nav.Link>
          <Nav.Link href="/addComment"style={{ fontSize: "22px" }}>Comment</Nav.Link>
          <Nav.Link href="/privateUserProfile" style={{ fontSize: "22px" }}>Profile</Nav.Link>
        </Nav>
      </Container>
    </ReactNavbar>
  );
}
