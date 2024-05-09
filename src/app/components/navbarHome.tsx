"use client";

import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../layout";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Tooltip from "react-bootstrap/Tooltip";
import { OverlayTrigger } from "react-bootstrap";

function OffcanvasExample() {
  const { username, useremail } = useContext(UserContext);
  const firstLetterUserName = username ? username[0].toUpperCase() : "";
  const [showTooltip, setShowTooltip] = useState(false);
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
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>

          {username ? ( // Check if username exists
            <>
              <Navbar.Brand href="/sell">Sell</Navbar.Brand>
              <Navbar.Brand>
                <div
                  className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <OverlayTrigger
                    show={showTooltip}
                    placement="bottom"
                    overlay={
                      <Tooltip id="username-tooltip">
                        <div className="flex flex-col">
                          <span className="font-semibold">{username}</span>
                          <span>{useremail}</span>
                          {/* <Button variant="primary" size="sm" href="/">
                            Log Out
                          </Button> */}
                        </div>
                      </Tooltip>
                    }
                  >
                    <span
                      className="font-medium text-gray-600 dark:text-gray-300"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                    >
                      {firstLetterUserName}
                    </span>
                  </OverlayTrigger>
                </div>
              </Navbar.Brand>
            </>
          ) : (
            <>
              <Navbar.Brand href="/login">Sell</Navbar.Brand>
              <Navbar.Brand href="/login">Sign In</Navbar.Brand>
            </>
          )}
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;
