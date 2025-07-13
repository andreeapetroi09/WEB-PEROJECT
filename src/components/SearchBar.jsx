import React from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ city, setCity, onSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        value={city}
        placeholder="Introduceți un oraș..."
        onChange={(e) => setCity(e.target.value)}
        className="search-input"
      />
      <button onClick={onSearch} className="search-button">
        <FaSearch />
      </button>
    </div>
  );
}

export default SearchBar;
