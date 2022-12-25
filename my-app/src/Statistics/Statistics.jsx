import React, { useState, useEffect } from "react";
import statisticsServices from "./Services/statistics.services";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Navigate, useSearchParams } from "react-router-dom";
import authHeader from "../Global/auth-header";
import "./Statistics.scss";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
const Statistics = () => {
  const loggedIn = Object.keys(authHeader()).length ? true : false;
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  //if (loggedIn) return <Navigate to="/" />;
  return <section id="statistics">Statistics</section>;
};

export default Statistics;
