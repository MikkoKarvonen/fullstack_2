import React from "react";

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <p>
      filter shown with{" "}
      <input value={filter} onChange={handleFilterChange}></input>
    </p>
  );
};

export default Filter;
