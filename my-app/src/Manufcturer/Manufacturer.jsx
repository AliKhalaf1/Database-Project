import React, { useState, useEffect } from "react";
import manufacturerServices from "./Services/manufacturer.services";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Navigate } from "react-router-dom";
import authHeader from "../Global/auth-header";
import "./Manufacturer.scss";
import { Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
const Manufacturer = () => {
  const loggedIn = Object.keys(authHeader()).length ? true : false;
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [manufacturers, setManufacturers] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  const { register, handleSubmit, setValue } = useForm({});
  useEffect(() => {
    setLoading(true);
    manufacturerServices.getAllManufacturers().then((res) => {
      console.log(res);
      setManufacturers(res);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    setValue("email", manufacturer.email);
    setValue("name", manufacturer.name);
    setValue("location", manufacturer.location);
  }, [manufacturer]);
  const HandleDeleteManufacturer = (manufacturer) => {
    console.log(manufacturer);
    setLoading(true);
    setMessage("");
    manufacturerServices.deleteManufacturer(manufacturer).then(
      (res) => {
        setLoading(false);
        if (res.status === 200) {
          setManufacturers(
            manufacturers.filter((req) => req.email !== manufacturer.email)
          );
          setSuccessful(true);
          setMessage("Successful");
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

  const handleInsert = (register) => {
    setLoading(true);
    setMessage("");
    setSuccessful(false);
    manufacturerServices.postManufacturer(register).then(
      (response) => {
        setLoading(false);
        setSuccessful(true);
        setMessage("Successful");
        setManufacturers((manufacturers) => [register, ...manufacturers]);
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
  const handleUpdate = (register) => {
    console.log(register);
    setLoading(true);
    setMessage("");
    setSuccessful(false);
    manufacturerServices.patchManufacturer(register).then(
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
  if (!loggedIn) return <Navigate to="/login" />;
  return (
    <section id="manufacturer">
      <Container className="mt-5">
        <Row>
          <Col>
            <Form>
              <InputGroup size="sm" className="mb-3">
                <Form.Control
                  placeholder="Name"
                  {...register("name", { required: true })}
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <Form.Control
                  placeholder="E-mail"
                  {...register("email", { required: true })}
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <Form.Control
                  placeholder="Location"
                  {...register("location", { required: true })}
                />
              </InputGroup>
              <Button disabled={loading} onClick={handleSubmit(handleUpdate)}>
                Update
              </Button>{" "}
              <Button disabled={loading} onClick={handleSubmit(handleInsert)}>
                Insert New
              </Button>
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
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <Container className="mt-5">
        <Row>
          <Col></Col>

          <Col></Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>E-mail</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {manufacturers.map((manufacturer, key) => (
                  <tr key={key} onClick={() => setManufacturer(manufacturer)}>
                    <td>{manufacturer.name}</td>
                    <td>{manufacturer.email}</td>
                    <td>{manufacturer.location}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          HandleDeleteManufacturer(manufacturer);
                        }}
                      >
                        Delete
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

export default Manufacturer;
