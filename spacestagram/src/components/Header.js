import React from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../assets/images/logo.png"

function Header(props) {

    const navigate = useNavigate();
    
    const redirectPage = (page) => {
        navigate(page)
    }

    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand style={{ float: 'left', cursor: 'pointer' }} onClick={() => redirectPage('/')}>
                <Row style={{ margin: '0px', padding: '0px'}}>
                    <Col style={{ margin: '0px', padding: '0px'}} xs={3} sm={3} md={3} lg={3} xl={3}>
                        <img alt="Spacestagram" style={{ height: '40px', width: '40px', marginLeft: '10px' }} src={logo}/>
                    </Col>
                    <Col style={{ margin: '0px', padding: '3px 0px 0px 10px'}} xs={9} sm={9} md={9} lg={9} xl={9}>
                        <div>Spacestagram</div>
                    </Col>
                </Row>
            
            </Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link onClick={() => redirectPage('/')}>Home</Nav.Link>
                <Nav.Link onClick={() => redirectPage('/gallery')}>Your Gallery</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Header;
