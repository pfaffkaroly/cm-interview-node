import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" data-testid="menu">
      <Container>
        <Navbar.Brand href="/" data-testid="logo">
          <img src="images.png" width="40" alt="Pokemon!" className="d-inline-block" />
          <span className="ms-2">PokeVote</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link href="upvote" className="text-uppercase">
              Upvote
            </Nav.Link>
            <Nav.Link href="toplist" className="text-uppercase">
              Toplist
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
