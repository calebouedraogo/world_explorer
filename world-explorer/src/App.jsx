import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

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
}

export default App;
