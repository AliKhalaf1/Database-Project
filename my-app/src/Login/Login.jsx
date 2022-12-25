import React, { useState } from "react";
import { useForm } from "react-hook-form";
import loginServices from "./Services/login.services";
import { Navigate, useSearchParams } from "react-router-dom";
import authHeader from "../Global/auth-header";
import "./Login.scss";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
const Login = () => {
  const loggedIn = Object.keys(authHeader()).length ? true : false;
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const { register, handleSubmit } = useForm({});

  const onSubmit = (data) => {
    setLoading(true);
    setMessage("");
    setSuccessful(false);
    loginServices.login(data).then(
      (response) => {
        setLoading(false);
        setSuccessful(true);
        setMessage("Successful");
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
  if (loggedIn) return <Navigate to="/" />;
  return (
    <section id="login" className="register-container">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="form-control"
            placeholder="SSN"
            {...register("ssn", {
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            {...register("passwd")}
          />

          <Button type="submit" disabled={loading}>
            {loading ? (
              <Spinner as="span" animation="border" size="sm" />
            ) : (
              <></>
            )}
            Login
          </Button>
        </form>
        {message && (
          <div className="form-group">
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
      </div>
    </section>
  );
};

export default Login;
