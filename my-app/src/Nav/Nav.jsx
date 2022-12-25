import React, { useEffect } from "react";
import { useState } from "react";
import authHeader from "../Global/auth-header";
import loginServices from "../Login/Services/login.services";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Nav.scss";
import mechanicServices from "../Mechanic/Services/mechanic.services";

const Navb = () => {
  const [serviceCenterName, setServiceCenterName] = useState("");
  const [loggedIn, setLoggetIn] = useState(
    Object.keys(authHeader()).length ? true : false
  );
  useEffect(() => {
    mechanicServices.getServiceCenterById().then((res) => {
      setServiceCenterName(res[0].name);
    }, []);
  }, []);
  const logOut = () => {
    loginServices.logout();
    setLoggetIn(false);
    window.location.reload();
  };
  return (
    <section id="navbar">
      <Navbar collapseOnSelect expand="lg" className="navbar">
        <Container>
          <Navbar.Brand href="/">
            <div className="serviceName">
              {serviceCenterName ? serviceCenterName : "Loading..."}
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/mechanic">Mechanic</Nav.Link>
              <Nav.Link href="/manufacturer">Manufacturer</Nav.Link>
              <Nav.Link href="/parts">Stock</Nav.Link>
              <Nav.Link href="/neworder">New Order</Nav.Link>
            </Nav>
            <Nav>
              {loggedIn ? (
                <>
                  {/* <Nav.Link href="/user">Profile</Nav.Link> */}
                  <Nav.Link onClick={logOut}>Log Out</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
};

export default Navb;
