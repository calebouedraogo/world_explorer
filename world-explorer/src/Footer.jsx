import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function Footer({ darkMode }) {
  return (
    <footer
      className={`mt-5 py-4 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{
        borderTop: "1px solid",
        borderColor: darkMode ? "#333" : "#ddd",
        background: darkMode
          ? "linear-gradient(45deg, #1e1e1e, #121212)"
          : "linear-gradient(45deg, #ffffff, #f7f7f7)",
      }}
    >
      <Container>
        <Row className="text-center text-md-start">
          <Col md={6} className="mb-3 mb-md-0">
            <h5 className="fw-bold">🌍 World Explorer</h5>
            <p className="mb-0">
              Discover countries, their cultures, and populations in an
              interactive way.
            </p>
          </Col>

          <Col md={3} className="mb-3 mb-md-0">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="https://restcountries.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none"
                >
                  API Source
                </a>
              </li>
            </ul>
          </Col>

          <Col md={3}>
            <h6>Connect</h6>
            <div className="d-flex gap-3 justify-content-md-start justify-content-center">
              <a
                href="https://github.com/calebouedraogo"
                className="text-decoration-none text-reset"
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
              <a
                href="https://x.com/TechInsighs24"
                className="text-decoration-none text-reset"
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a
                href="https://www.linkedin.com/in/caleb-ouedraogo/"
                className="text-decoration-none text-reset"
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
            </div>
          </Col>
        </Row>

        <hr
          className="my-4"
          style={{ borderColor: darkMode ? "#444" : "#ccc" }}
        />

        <p className="text-center mb-0">
          © {new Date().getFullYear()} <strong>Caleb Ouedraogo</strong>. All
          rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
