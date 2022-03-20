import { useState } from "react";
import Select from "react-select";
import { Redirect, useHistory } from "react-router-dom";
import Service from "../../Services";
import { Alert, Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { BaseConfig } from "../../Config/BaseConfig";

const roles = [
  { label: "Admin", value: "1" },
  { label: "User", value: "2" },
];

export const Register = () => {
  const userAuth = BaseConfig.utilities.getUser();
  const isLoggedIn = userAuth && userAuth.token;
  const [alert, setAlert] = useState();
  const history = useHistory();
  const [user, setUser] = useState({
    Username: "",
    Password: "",
    Email: "",
    RoleId: "",
  });

  const submit = () => {
    setAlert();
    if (!user.Username || !user.Password || !user.Email || !user.RoleId) {
      setAlert({
        text: "Please fill the required fields properly",
        variant: "warning",
      });
    } else {
      Service.User.Register(user).then((response) => {
        if (response && !response.error) {
          history.push("/login");
        } else {
          setAlert(response.message);
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
              <Navbar.Brand href="/">Blog</Navbar.Brand>
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
              marginTop: 20,
            }}
          >
            {alert && resetAlertContent()}

            <Form
              onChange={onChange}
              style={{
                width: "40%",
                padding: 35,
                paddingBottom: 38,
                border: "1px grey solid",
                borderRadius: 30,
                boxShadow: "1px black",
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="Username"
                  placeholder="Enter a valid username"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="Password"
                  placeholder="Enter password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="Email"
                  placeholder="example@example.com"
                />
              </Form.Group>
              Role
              <Select
                name="RoleId"
                onChange={(selected) =>
                  setUser({ ...user, RoleId: +selected.value })
                }
                options={roles}
              />
              <Button
                style={{ float: "right", marginTop: "20px" }}
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
