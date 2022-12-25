import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import authHeader from "../../../Global/auth-header";
import "./NewOrder.scss";
import {
  Button,
  InputGroup,
  Row,
  Col,
  Container,
  Table,
  Form,
} from "react-bootstrap";
import manufacturerServices from "../../../Manufcturer/Services/manufacturer.services";
import partsServices from "../../../Parts/Services/parts.services";
const NewOrder = (props) => {
  const loggedIn = Object.keys(authHeader()).length ? true : false;

  useEffect(() => {
    partsServices.getAllparts().then((res) => {
      console.log(res);
      props.setParts(res);
    });
  }, []);
  useEffect(() => {
    manufacturerServices.getAllManufacturers().then((res) => {
      console.log(res);
      props.setManufacturers(res);
    });
  }, []);
  const handleChange = (e) => {
    console.log(e.target.value);
    props.setSelectedManufacturerEmail(e.target.value);
  };
  const addPart = (part) => {
    console.log(part);
    props.setParts(props.parts.filter((req) => req.id !== part.id));
    part.quantity = 1;
    props.setSelectedParts((selectedParts) => [...selectedParts, part]);
    console.log(props.selectedParts);
  };
  const removePart = (part) => {
    props.setSelectedParts(
      props.selectedParts.filter((req) => req.id !== part.id)
    );
    delete part["quantity"];
    props.setParts((parts) => [part, ...parts]);
    console.log(props.selectedParts);
  };
  const changeQuantity = (part, event) => {
    console.log(part);
    const newState = props.selectedParts.map((obj) => {
      if (obj.id === part.id) {
        return { ...obj, quantity: parseInt(event.target.value) };
      }
      return obj;
    });

    props.setSelectedParts(newState);
  };
  if (!loggedIn) return <Navigate to="/" />;
  return (
    <section id="newOrder">
      <Container className="mt-4">
        <Row>
          <Col>
            <InputGroup size="sm" className="mb-3">
              <Form.Select size="sm" onChange={handleChange}>
                {props.manufacturers.map((manufacturer, key) => (
                  <option value={manufacturer.email} key={key}>
                    {manufacturer.name}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>

            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Buying Price</th>
                </tr>
              </thead>
              <tbody>
                {props.parts.map((part, key) => (
                  <tr key={key} onClick={() => addPart(part)}>
                    <td>{part.id}</td>
                    <td>{part.name}</td>
                    <td>{part.buying_price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Buying Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {props.selectedParts.map((part, key) => (
                  <tr key={key}>
                    <td>{part.id}</td>
                    <td>{part.name}</td>
                    <td>{part.buying_price}</td>
                    <td>
                      <InputGroup size="sm" className="mb-3">
                        <Form.Control
                          value={part.quantity}
                          onChange={(event) => {
                            changeQuantity(part, event);
                          }}
                        />
                      </InputGroup>
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          removePart(part);
                        }}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button
              variant="outline-danger"
              disabled={
                props.selectedManufacturerEmail.length === 0 ||
                props.selectedParts.length === 0
              }
              onClick={() => {
                props.setPage(false);
              }}
            >
              Next
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NewOrder;
