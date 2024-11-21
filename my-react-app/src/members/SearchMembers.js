import React from 'react';
import "../../src/assets/css/SearchMembers.css"

const SearchMembers = ({ searchTerm, onSearchChange, onClear }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="חפש חבר..."
        className="search-input"
        dir="rtl"
      />
      {searchTerm && (
        <button
          className="clear-search"
          onClick={onClear}
          aria-label="נקה חיפוש"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchMembers;