import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data);
    });
  }, []);

  const addNumber = event => {
    event.preventDefault();
    if (!persons.some(e => e.name === newName)) {
      const obj = { name: newName, number: newNumber };
      personService.create(obj).then(response => {
        personService.getAll().then(response => {
          setPersons(response.data);
          setNewName("");
          setNewNumber("");
        });
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const i = persons.find(x => x.name === newName);
        i.number = newNumber;
        personService.update(i.id, i).then(() => {
          personService.getAll().then(response => {
            setPersons(response.data);
            setNewName("");
            setNewNumber("");
          });
        });
      }
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonsForm
        addNumber={addNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        personService={personService}
        setPersons={setPersons}
      ></Persons>
    </div>
  );
};

export default App;
