import React, { useState } from "react";
import loginServices from "./Services/home.services";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Navigate, useSearchParams } from "react-router-dom";
import authHeader from "../Global/auth-header";
import "./Home.scss";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
const Login = ({ location }) => {
  const loggedIn = Object.keys(authHeader()).length ? true : false;
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = (data) => {
    setLoading(true);
    setMessage("");
    setSuccessful(false);
    loginServices.login(data).then(
      (response) => {
        setLoading(false);
        setSuccessful(true);
        setMessage("Successful");
        window.location.reload();
      },
      (error) => {
        setLoading(false);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        console.log(resMessage);
        setSuccessful(false);
      }
    );
  };
  //if (loggedIn) return <Navigate to="/" />;
  return (
    <section id="home">
      <Container className="home-text">
        <h1>Mehcanic Shop</h1>
        <h6>.... </h6>
      </Container>
      <Container className="homeContainer">
        <Row>
          <Col>
            <a href="/Mechanic">
              <Card className="homeCard">Mechanics</Card>
            </a>
          </Col>
          <Col>
            <a href="/swap">
              <Card className="homeCard">Submit a Request</Card>
            </a>
          </Col>
          <Col>
            <a href="/swap">
              <Card className="homeCard">Submit a Request</Card>
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
