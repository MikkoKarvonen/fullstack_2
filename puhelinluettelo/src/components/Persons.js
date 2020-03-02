import React from "react";

const Persons = ({ persons, filter }) => {
  return (
    <>
      {persons.map(e => (
        <span key={e.name}>
          {e.name.toLowerCase().includes(filter.toLowerCase()) ? (
            <p key={e.name}>
              {e.name} {e.number}
            </p>
          ) : null}
        </span>
      ))}
    </>
  );
};

export default Persons;
