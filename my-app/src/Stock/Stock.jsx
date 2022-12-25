import React, { useState, useEffect } from "react";
import stockServices from "./Services/stock.services";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Navigate, useSearchParams } from "react-router-dom";
import authHeader from "../Global/auth-header";
import "./Stock.scss";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
const Stock = () => {
  const loggedIn = Object.keys(authHeader()).length ? true : false;
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  //if (loggedIn) return <Navigate to="/" />;
  return <section id="stock">Stock</section>;
};

export default Stock;
