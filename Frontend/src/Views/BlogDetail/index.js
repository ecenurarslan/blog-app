import { useState } from "react";
import { useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import Service from "../../Services";
import { DetailCard } from "../../Components";
import { BaseConfig } from "../../Config/BaseConfig";
import { Container, Modal, Button, Form, Navbar, Nav } from "react-bootstrap";
import Select from "react-select";
export const BlogDetail = () => {
  const user = BaseConfig.utilities.getUser();
  const isLoggedIn = user && user.token;
  const history = useHistory();
  const { id } = useParams();
  const [item, setItem] = useState();
  const [itemObj, setItemObj] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [img, setImg] = useState();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Service.Item.Get(id).then((response) => {
      if (response && !response.error) {
        setItem(response.data);
        setItemObj({ ...response.data });
        setImg(BaseConfig.api.resource(response.data.path));
      }
    });
    Service.Item.GetCategories().then((response) => {
      if (response && !response.error) {
        setCategories(
          response.data.map((m) => ({ label: m.name, value: m.id }))
        );
      }
    });
  }, []);
  const deleteBlog = () => {
    Service.Item.Delete(id).then((response) => {
      if (response && !response.error) {
        window.location.href = "/";
      }
    });
  };
  const editBlog = () => {
    const formData = new FormData();
    formData.append("Id", itemObj?.id);
    formData.append("Title", itemObj?.title);
    formData.append("CategoryId", itemObj?.categoryId);
    formData.append("Description", itemObj?.description);
    formData.append("File", itemObj?.file);

    Service.Item.Edit(formData).then((response) => {
      if (response && !response.error) {
        window.location.href = "/";
      }
    });
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
                  <Nav.Link href="/add-blog">Add Blog</Nav.Link>
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
          <Container>
            {item && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DetailCard
                  onDelete={() => setDeleteModal(true)}
                  onEdit={() => setEditModal(true)}
                  item={item}
                />
              </div>
            )}
          </Container>
          <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Delete blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              The blog post will be deleted. Do you want to continue?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setDeleteModal(false)}>
                Close
              </Button>
              <Button variant="danger" onClick={() => deleteBlog()}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            size="lg"
            show={editModal}
            onHide={() => {
              setEditModal(false);
              setItemObj(item);
              setImg(BaseConfig.api.resource(item.path));
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                      (f) => f.value === item?.categoryId
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
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setEditModal(false);
                  setItemObj(item);
                  setImg(BaseConfig.api.resource(item.path));
                }}
              >
                Close
              </Button>
              <Button variant="danger" onClick={() => editBlog()}>
                Edit
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};
