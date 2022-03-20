import { Container, Form, Button, Alert, Navbar, Nav } from "react-bootstrap";
import Select from "react-select";
import Service from "../../Services";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { BaseConfig } from "../../Config/BaseConfig";
import { Redirect } from "react-router-dom";
export const AddBlog = () => {
  const user = BaseConfig.utilities.getUser();
  const isLoggedIn = user && user.token;
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState();
  const [img, setImg] = useState();
  const [itemObj, setItemObj] = useState({
    title: "",
    categoryId: 0,
    description: "",
    file: null,
  });

  useEffect(() => {
    Service.Item.GetCategories().then((response) => {
      if (response && !response.error) {
        setCategories(
          response.data.map((m) => ({ label: m.name, value: m.id }))
        );
      }
    });
  }, []);
  const createBlog = () => {
    if (itemObj.title && itemObj.categoryId && itemObj.description) {
      setAlert();
      const formData = new FormData();
      formData.append("Title", itemObj.title);
      formData.append("CategoryId", itemObj.categoryId.toString());
      formData.append("Description", itemObj.description);
      formData.append("File", itemObj.file);
      Service.Item.Add(formData).then((response) => {
        if (response && !response.error) {
          history.push("/");
        }
      });
    } else {
        console.log(itemObj);
      setAlert("Please fill the required fields properly");
    }
  };

  const onChangeImg = (e) => {
    var fr = new FileReader();
    fr.onload = function () {
      setImg(fr.result);
    };
    fr.readAsDataURL(e.target.files[0]);
    setItemObj({ ...itemObj, file: e.target.files[0] });
  };
  return (
    <>
      {!isLoggedIn ? (
        <Redirect to={{ pathname: "/login" }} />
      ) : (
        <>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Blog</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                  <Nav.Link href="/">Blogs</Nav.Link>
                </Nav>
                {user && user.token && (
                  <Nav.Link
                    onClick={() => {
                      localStorage.removeItem("user");
                      history.push("/login");
                    }}
                  >
                    Logout
                  </Nav.Link>
                )}
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Container style={{ padding: "5%" }}>
            <Alert
              variant="danger"
              show={!!alert}
              onClose={() => setAlert()}
              dismissible
            >
              {alert}
            </Alert>
            <Form
              style={{
                width: "100%",
                padding: 35,
                paddingBottom: 38,
                border: "1px grey solid",
                borderRadius: 30,
                boxShadow: "1px black",
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="Title"
                  value={itemObj?.title}
                  onChange={(e) =>
                    setItemObj({ ...itemObj, title: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCategory">
                <Form.Label>Category</Form.Label>
                <Select
                  name="CategoryId"
                  defaultValue={categories.find(
                    (f) => f.value === itemObj?.categoryId
                  )}
                  onChange={(selected) =>
                    setItemObj({ ...itemObj, categoryId: selected.value })
                  }
                  options={categories}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicContent">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="Description"
                  value={itemObj?.description}
                  onChange={(e) =>
                    setItemObj({ ...itemObj, description: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/png, image/jpeg"
                  name="image"
                  onChange={(e) => onChangeImg(e)}
                />
              </Form.Group>
              <img style={{ width: "15%" }} src={img} />
              <Form.Group
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button variant="info" onClick={() => createBlog()}>
                  Create
                </Button>
              </Form.Group>
            </Form>
          </Container>
        </>
      )}
    </>
  );
};
