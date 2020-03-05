import React from "react";

const Persons = ({ persons, filter, personService, setPersons }) => {
  const handleDelete = e => {
    if (window.confirm(`Delete ${e.name}?`)) {
      personService.del(e.id);
      let filtered = persons.filter(el => {
        return el.id !== e.id;
      });
      setPersons(filtered);
    }
  };

  return (
    <>
      {persons.map(e => (
        <span key={e.name}>
          {e.name.toLowerCase().includes(filter.toLowerCase()) ? (
            <p key={e.name}>
              {e.name} {e.number}{" "}
              <button onClick={() => handleDelete(e)}>delete</button>
            </p>
          ) : null}
        </span>
      ))}
    </>
  );
};

export default Persons;
