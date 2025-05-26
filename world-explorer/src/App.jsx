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
}

export default App;
