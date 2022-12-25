import React, { useState, useEffect } from "react";
import newOrderServices from "../../Services/newOrder.services";
import { useNavigate, Navigate } from "react-router-dom";
import authHeader from "../../../Global/auth-header";
import "./ConfirmOrder.scss";
import { Button, Row, Col, Container, Table } from "react-bootstrap";
const ConfirmOrder = (props) => {
  const navigate = useNavigate();

  const loggedIn = Object.keys(authHeader()).length ? true : false;
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let newVal = 0;
    props.selectedParts.map((part) => {
      console.log(part);
      newVal = newVal + part.quantity * part.buying_price;
    });
    setTotalPrice(newVal);
  }, [props.selectedParts]);

  const handleSubmit = () => {
    setLoading(true);
    setMessage("");
    setSuccessful(false);
    newOrderServices
      .postPurchaseReceipt(
        totalPrice,
        props.selectedManufacturerEmail,
        props.selectedParts
      )
      .then(
        (response) => {
          setLoading(false);
          setSuccessful(true);
          setMessage("Successful");
          console.log("a");
          setTimeout(() => {
            console.log("a");
            navigate("/");
          }, 2000);
          //window.location.reload();
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
  if (!loggedIn) return <Navigate to="/" />;
  return (
    <section id="confirmOrder">
      <Container className="mt-4">
        <Row>
          <h5>Manufacturer Email: {props.selectedManufacturerEmail}</h5>
        </Row>
        <Row className="mt-4">
          <Col>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Buying Price</th>
                  <th>Quantity</th>
                  <th>TotalPrice</th>
                </tr>
              </thead>
              <tbody>
                {props.selectedParts.map((part, key) => (
                  <tr key={key}>
                    <td>{part.id}</td>
                    <td>{part.name}</td>
                    <td>{part.buying_price}</td>
                    <td>{part.quantity}</td>
                    <td>{part.quantity * part.buying_price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <h3>Total price: {totalPrice}</h3>
        <Button
          disabled={loading}
          variant="outline-danger"
          onClick={() => props.setPage(true)}
        >
          Back
        </Button>{" "}
        <Button
          disabled={loading}
          variant="success"
          onClick={() => {
            handleSubmit();
          }}
        >
          Confirm Purchase
        </Button>
        {message && (
          <div className="form-group mt-4">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default ConfirmOrder;
