"use client";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

function OffcanvasExample() {
  return (
    <>
      {["md"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="/">Vinted 2.0</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavDropdown
                    title="Women"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/women/shoes">
                      Shoes
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/women/pants">
                      Pants
                    </NavDropdown.Item>

                    <NavDropdown.Item href="/women/sweaters">
                      Sweaters
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/women">All</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title="Men"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/men/shoes">Shoes</NavDropdown.Item>
                    <NavDropdown.Item href="/men/pants">Pants</NavDropdown.Item>

                    <NavDropdown.Item href="/men/sweaters">
                      Sweaters
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/men">All</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  {/* <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  /> */}
                  {/* <Button variant="outline-success">Search</Button> */}
                  <input type="Search" placeholder="Search" />
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
          <Navbar.Brand href="/sell">Sell</Navbar.Brand>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;
