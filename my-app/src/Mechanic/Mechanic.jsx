import React, { useState, useEffect } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import mechanicServices from "./Services/mechanic.services";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Navigate } from "react-router-dom";
import authHeader from "../Global/auth-header";
import "./Mechanic.scss";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Mechanic = () => {
  const loggedIn = Object.keys(authHeader()).length ? true : false;
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [mechanics, setMechanics] = useState([]);
  const [mechanic, setMechanic] = useState([]);
  const { register, handleSubmit, setValue } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    setLoading(true);
    mechanicServices.getAllMecahnicsByServiceCenter().then((res) => {
      setMechanics(res);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    setValue("ssn", mechanic.ssn);
    mechanic.sex === "M" ? setValue("sex", "M") : setValue("sex", "F");
    setValue("fname", mechanic.fname);
    setValue("mname", mechanic.mname);
    setValue("lname", mechanic.lname);
    setValue("phone", mechanic.phone);
  }, [mechanic]);
  const HandleDeleteMechanic = (ssn) => {
    setLoading(true);
    setMessage("");
    mechanicServices.deleteMechanic(ssn).then(
      (res) => {
        setLoading(false);
        if (res.status === 200) {
          setMechanics(mechanics.filter((req) => req.ssn !== ssn));
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
    console.log(register);
    setLoading(true);
    setMessage("");
    setSuccessful(false);
    mechanicServices.postMechanic(register).then(
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
  const handleUpdate = (register) => {
    console.log(register);
    setLoading(true);
    setMessage("");
    setSuccessful(false);
    mechanicServices.patchMechanic(register).then(
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
    <section id="mechanic">
      <Container className="mt-5">
        <Row>
          <Col>
            <Form>
              <InputGroup size="sm" className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="SSN"
                  {...register("ssn", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <Form.Control
                  placeholder="First Name"
                  {...register("fname", { required: true })}
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <Form.Control
                  placeholder="Middle Name"
                  {...register("mname", { required: true })}
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <Form.Control
                  placeholder="Last Name"
                  {...register("lname", { required: true })}
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <Form.Select size="sm" {...register("sex", { required: true })}>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </Form.Select>
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Phone"
                  {...register("phone", { required: true })}
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <Form.Control
                  type="date"
                  placeholder="Date"
                  {...register("birthdate", { required: true })}
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <Form.Label className="mx-2">Service Center ID: </Form.Label>
                <Form.Control
                  {...register("service_center_id", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="text-center"
                  value={localStorage.getItem("service_center_id")}
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <Form.Control
                  placeholder="Password"
                  {...register("passwd", { required: true })}
                />
              </InputGroup>
              <Button onClick={handleSubmit(handleUpdate)} disabled={loading}>
                Update
              </Button>{" "}
              <Button onClick={handleSubmit(handleInsert)} disabled={loading}>
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
        <Row>
          <Col>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>SSN</th>
                  <th>Phone</th>
                  <th>BirthDate</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mechanics.map((mechanic, key) => (
                  <tr key={key} onClick={() => setMechanic(mechanic)}>
                    <td>{mechanic.ssn}</td>
                    <td>
                      {mechanic.fname +
                        " " +
                        mechanic.mname +
                        " " +
                        mechanic.lname}
                    </td>
                    <td>{mechanic.phone}</td>
                    <td>{mechanic.birthdate}</td>
                    <td>{mechanic.sex === "M" ? "Male" : "Female"}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          HandleDeleteMechanic(mechanic.ssn);
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

export default Mechanic;
