import React, { useState, useEffect } from "react";
import partsServices from "./Services/parts.services";
import { Navigate } from "react-router-dom";
import authHeader from "../Global/auth-header";
import "./Parts.scss";
import {
  Button,
  InputGroup,
  Form,
  Table,
  Col,
  Row,
  Container,
} from "react-bootstrap";
const Parts = () => {
  const loggedIn = Object.keys(authHeader()).length ? true : false;
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [parts, setParts] = useState([]);
  useEffect(() => {
    setLoading(true);
    partsServices.getAllpartsByServiceCenter().then((res) => {
      console.log(res);
      setParts(res);
      setLoading(false);
    });
  }, []);
  const HandleChangePrice = (part) => {
    console.log(part);
    setLoading(true);
    setMessage("");
    partsServices.patchPart(part).then(
      (res) => {
        setLoading(false);
        if (res.status === 200) {
          setSuccessful(true);
          setMessage("Successful");
          //window.location.reload();
        }
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
  if (!loggedIn) return <Navigate to="/login" />;
  return (
    <section id="parts">
      <Container className="mt-5">
        <Row>
          <Col>
            {message && (
              <div className="form-group mt-3">
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
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Selling Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {parts.map((part, key) => (
                  <tr key={key}>
                    <td>{part.id}</td>
                    <td>{part.name}</td>
                    <td>{part.quantity}</td>
                    <td>
                      <InputGroup size="sm" className="mb-3">
                        <Form.Control
                          placeholder={part.selling_price}
                          onChange={(event) => {
                            part.selling_price = event.target.value;
                          }}
                        />
                      </InputGroup>
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          HandleChangePrice(part);
                        }}
                      >
                        Edit Price
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Parts;
