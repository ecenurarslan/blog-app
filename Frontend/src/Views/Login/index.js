import { useState } from "react";
import { Container, Form, Nav, Navbar, Button, Alert } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import { BaseConfig } from "../../Config/BaseConfig";
import Service, { User } from "../../Services";
import "./index.css";

export const Login = () => {
  const userAuth = BaseConfig.utilities.getUser();
  const isLoggedIn = userAuth && userAuth.token;
  const history = useHistory();
  const [alert, setAlert] = useState();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const submit = () => {
    setAlert();
    if (user.username === "" && user.password === "") {
      setAlert({
        text: "Please enter a valid username and a password",
        variant: "warning",
      });
    } else if (user.username === "") {
      setAlert({ text: "Please enter a valid username", variant: "warning" });
    } else if (user.password === "") {
      setAlert({ text: "Please enter a valid password", variant: "warning" });
    } else {
      Service.User.Login(user).then((response) => {
        if (response && !response.error) {
          localStorage.setItem("user", JSON.stringify(response.data));
          history.push("/");
        } else {
          setAlert({ text: response.message, variant: "danger" });
        }
      });
    }
  };
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const resetAlertContent = () => {
    setTimeout(() => setAlert(), 5000);
    return (
      <Alert
        style={{
          position: "absolute",
          top: 80,
          right: 20,
          width: "fit-content",
          height: "max-content",
        }}
        variant={alert.variant}
      >
        {alert.text}
      </Alert>
    );
  };
  return (
    <>
      {isLoggedIn ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 60,
            }}
          >
            {alert && resetAlertContent()}
            <Form
              onChange={onChange}
              style={{
                width: "40%",
                padding: 25,
                border: "1px grey solid",
                borderRadius: 30,
                boxShadow: "1px black",
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Button
                style={{ float: "right" }}
                variant="primary"
                type="button"
                onClick={() => submit()}
              >
                Submit
              </Button>
            </Form>
          </div>
        </>
      )}
    </>
  );
};
