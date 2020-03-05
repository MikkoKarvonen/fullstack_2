import React from "react";

const Persons = ({
  persons,
  filter,
  personService,
  setPersons,
  setMsg,
  setMsgStyle
}) => {
  const handleDelete = e => {
    if (window.confirm(`Delete ${e.name}?`)) {
      personService.del(e.id).then(res => {
        personService.getAll().then(response => {
          setPersons(response.data);
          if (res) {
            setMsg(`Removed ${e.name}`);
            setMsgStyle("del");
          } else {
            setMsg(`${e.name} was already removed`);
            setMsgStyle("err");
          }
          setTimeout(() => {
            setMsg(null);
            setMsgStyle(null);
          }, 5000);
        });
      });
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
