import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [country, setCountry] = useState([]);
  const [filter, setNewFilter] = useState("");
  const [data, setData] = useState([]);
  const [showCountry, setShowCountry] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setData(response.data);
    });
  }, []);

  const handleNameChange = event => {
    let val = "";
    if (event.target) {
      val = event.target.value;
    } else {
      val = event;
    }
    setNewFilter(val);
    const filtered = data.filter(e => {
      return e.name.toLowerCase().includes(val.toLowerCase());
    });
    setCountry(filtered);
    if (filtered.length === 1) {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=f23cf2d7deaddec8100582d7f2fe442a&query=${filtered[0].capital}`
        )
        .then(response => {
          const arr = filtered.map(e => {
            return (
              <div key={e.name}>
                <h1>{e.name}</h1>
                <p>capital {e.capital}</p>
                <p>population {e.population}</p>
                <h2>languages</h2>
                {e.languages.map(e => (
                  <li key={e.name}>{e.name}</li>
                ))}
                <img src={e.flag} alt={e.name}></img>
                <h3>Weather in {e.capital}</h3>
                <p>temperature: {response.data.current.temperature}</p>
                <img
                  src={response.data.current.weather_icons[0]}
                  alt={e.name}
                ></img>
                <p>
                  wind: {response.data.current.wind_speed} kph direction{" "}
                  {response.data.current.wind_dir}
                </p>
              </div>
            );
          });
          setShowCountry(arr);
        });
    } else {
      setShowCountry([]);
    }
  };

  const goToCountry = e => {
    setNewFilter(e.toLowerCase());
    handleNameChange(e.toLowerCase());
  };

  return (
    <div>
      find countries <input value={filter} onChange={handleNameChange} />
      {country.length === 0 ? null : country.length > 10 ? (
        <div>
          <p>Too many matches, specify another filter</p>
        </div>
      ) : country.length > 1 ? (
        <div>
          {country.map(e => (
            <p key={e.alpha2Code}>
              {e.name}
              <button onClick={() => goToCountry(e.name)}>show</button>
            </p>
          ))}
        </div>
      ) : (
        <div>{showCountry}</div>
      )}
    </div>
  );
}

export default App;
