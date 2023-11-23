import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");

  const KEY = 'c246e7ccc7c4a6223ab7661ddb69e82d';

  useEffect(
    function () {
      async function fetchCurrentWeather() {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${KEY}`
        );
        const data = await res.json();
        console.log(data);
        setData(data);

        if (location.length < 3) {
          setData({});
          return;
        }
      }
      fetchCurrentWeather();
    },
    [location]
  );

  return (
    <>
      <div className="app">
        <SearchBar>
          <Search location={location} setLocation={setLocation} />
        </SearchBar>
        <Main>
          <WeatherContainer data={data} />
        </Main>
      </div>
    </>
  );
}

const SearchBar = ({ children }) => {
  return <nav className="search-bar">{children}</nav>;
};

const Search = ({ location, setLocation }) => {
  const inputEl = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputEl.current) return;
        if (e.code === 'Enter') {
          inputEl.current.focus();
          setLocation('');
        }
      }

      document.addEventListener('keydown', callback);
      return () => document.addEventListener('keydown', callback);
    },
    [setLocation]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Enter Location"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      ref={inputEl}
    />
  );
};

const Main = ({ children }) => {
  return <main className="main">{children}</main>;
};

const WeatherContainer = ({ data }) => {
  return (
    <>
      <div className="container">
        <div className="current-weather">
          <div className="a">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="current-condition">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
