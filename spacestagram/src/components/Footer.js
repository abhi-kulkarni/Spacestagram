import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from 'react-router-dom';

function Footer(props) {

    const navigate = useNavigate();

    const redirectPage = (page) => {
        navigate(page)
    }

  return (
      <Navbar className="fixed-bottom" bg="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => redirectPage('/')} style={{ fontSize: "0.8rem" }}>
              <span>©</span>
              <span style={{ margin: '0px 5px 8px 8px' }}>2021 Copyright Spacestagram</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  );
}

export default Footer;
