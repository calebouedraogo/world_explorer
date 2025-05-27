import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [darkMode, setDarkMode] = useState(
    () => lacalStorage.getItem("theme") === "dark"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredCountries = countries.filllter(
    (c) =>
      c.name.common.toLowerCase().includes(search.toLowerCase()) &&
      (region ? c.region === region : true)
  );

  const sortedCountries = filteredCountries.sort((a, b) => {
    if (sortKey === "name") {
      return a.name.common.localeCompare(b.name.common);
    } else if (sortKey === "population") {
      return b.population - a.population;
    }
    return 0;
  });

  const painatedCountries = sortedCountries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Container
            className={`py-4 ${darkMode ? "text-light" : "text-dark"}`}
          >
            <header className="d-flex justify-content-between align-items-center mb-4">
              <h1>🌍 World Explorer</h1>
              <Button
                variant={darkMode ? "light" : "dark"}
                onClick={() => setDarkMode((prev) => !prev)}
              >
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </Button>
            </header>

            <div className="d-flex gap-3 mb-4 flex-wrap">
              <Form.Control
                type="text"
                placeholder="Search by name..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <Form.Select
                onChange={(e) => setRegion(e.target.value)}
                defaultValue=""
              >
                <option value="">All Regions</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania"></option>
              </Form.Select>
              <Form.Select
                onChange={(e) => setSortKey(e.target.value)}
                defaultValue="name"
              >
                <option value="name">Sort by Name</option>
                <option value="population">Sort by population</option>
              </Form.Select>
            </div>

            <Row xs={1} md={3} className="g-4">
              {paginatedCountries.map((country) => (
                <Col key={country.cca3}>
                  <Card
                    bg={darkMode ? "dark" : "light"}
                    text={darkMode ? "light" : "dark"}
                  >
                    <Link
                      to={`/country/${country.cca3}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Card.Img
                        variant="top"
                        src={country.flags.svg}
                        alt={country.name.common}
                      />
                      <Card.Body>
                        <Card.Title>{country.name.common}</Card.Title>
                        <Card.Text>
                          Population: {country.population.toLocaleString()}
                        </Card.Text>
                        <Card.Text>Region: {country.region}</Card.Text>
                        <Card.Text>Capital: {country.capital?.[0]}</Card.Text>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        }
      />
    </Routes>
  );
}

export default App;
