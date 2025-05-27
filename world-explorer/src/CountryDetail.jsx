import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button, Container, Card } from "react-bootstrap";

function CountryDetail({ darkMode }) {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => setCountry(res.data[0]))
      .catch((err) => console.error(err));
  }, [code]);

  if (!country) {
    return (
      <Container className={`py-4 ${darkMode ? "text-light" : "text-dark"}`}>
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container className={`py-4 ${darkMode ? "text-light" : "text-dark"}`}>
      <Button
        as={Link}
        to="/"
        variant={darkMode ? "light" : "dark"}
        className="mb-4"
      >
        ← Back to list
      </Button>

      <Card
        bg={darkMode ? "dark" : "light"}
        text={darkMode ? "light" : "dark"}
        className="shadow"
      >
        <Card.Img
          variant="top"
          src={country.flags.svg}
          alt={country.name.common}
          style={{
            maxWidth: "300px",
            height: "auto",
            objectFit: "contain",
            margin: "20px auto 0",
          }}
        />
        <Card.Body>
          <Card.Title className="fs-2 mb-3">{country.name.common}</Card.Title>
          <Card.Text>
            <strong>Official Name:</strong> {country.name.official}
          </Card.Text>
          <Card.Text>
            <strong>Population:</strong> {country.population.toLocaleString()}
          </Card.Text>
          <Card.Text>
            <strong>Region:</strong> {country.region}
          </Card.Text>
          <Card.Text>
            <strong>Subregion:</strong> {country.subregion}
          </Card.Text>
          <Card.Text>
            <strong>Capital:</strong> {country.capital?.[0]}
          </Card.Text>
          <Card.Text>
            <strong>Languages:</strong>{" "}
            {country.languages
              ? Object.values(country.languages).join(", ")
              : "N/A"}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CountryDetail;
