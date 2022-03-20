import { useState } from "react";
import { useEffect } from "react";
import { Col, Row, Container, Nav, Navbar, Card } from "react-bootstrap";
import { BlogCard } from "../../Components";
import Service from "../../Services";
import { BaseConfig } from "../../Config/BaseConfig";
import ReactPaginate from "react-paginate";
import { useHistory, Redirect } from "react-router-dom";
import "./index.css";
const PAGE_SIZE = 10;
export const Home = () => {
  const user = BaseConfig.utilities.getUser();
  const history = useHistory();
  const isLoggedIn = !!(user && user.token);
  const [blogList, setBlogList] = useState([]);
  const [topViewed, setTopViewed] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  useEffect(() => {
    Service.Item.ListTopViewed(5).then((response) => {
      if (response && !response.error) {
        setTopViewed(response.data);
      }
    });
  }, []);
  useEffect(() => {
    getBlogs(page);
  }, [page]);
  const getBlogs = (pageNumber) => {
    Service.Item.List(pageNumber, PAGE_SIZE).then((response) => {
      if (response && !response.error) {
        setBlogList(response.data.itemList);
        setMaxPage(response.data.maxPage);
      }
    });
  };
  return (
    <>
      {!isLoggedIn ? (
        <Redirect to={{pathname:'/login'}} />
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
                  {user && user.token ? (
                    <Nav.Link
                      onClick={() => {
                        localStorage.removeItem("user");
                        history.push("/login");
                      }}
                    >
                      Logout
                    </Nav.Link>
                  ) : (
                    <>
                      <Nav.Link href="/login">Login</Nav.Link>
                      <Nav.Link href="/register">Register</Nav.Link>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Container>
            <Row>
              <Col>
                <Container style={{ border: "1px black solid", marginTop: 20 }}>
                  <Card.Title style={{ textAlign: "center", paddingTop: 10 }}>
                    {" "}
                    Top 5 Viewed
                  </Card.Title>
                  {topViewed.length > 0 &&
                    topViewed.map((blog) => (
                      <BlogCard key={blog.id} item={blog} />
                    ))}
                </Container>
              </Col>
              <Col
                xs={8}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {blogList.length > 0 &&
                  blogList.map((blog) => (
                    <BlogCard key={blog.id} width="80%" item={blog} />
                  ))}
                <ReactPaginate
                  containerClassName="containerPagination"
                  pageClassName="page"
                  nextClassName="page"
                  previousClassName="page"
                  nextLinkClassName="linkpage"
                  previousLinkClassName="linkpage"
                  activeClassName="activePage"
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={(p) => setPage(p.selected + 1)}
                  pageRangeDisplayed={5}
                  pageCount={maxPage}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
                />
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};
