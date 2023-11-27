import React, { useState, useRef } from 'react';
import { useCurrentWeather } from './useCurrentWeather';
import { useKey } from './useKey';

// const KEY = 'c246e7ccc7c4a6223ab7661ddb69e82d';

export default function App() {
  const [location, setLocation] = useState('');
  const { data, isLoading, error } = useCurrentWeather(location);

  return (
    <>
      <div className="app">
        <SearchBar>
          <Search location={location} setLocation={setLocation} />
        </SearchBar>
        <Main>
          {isLoading && <Loader />}
          {!isLoading && !error && <WeatherContainer data={data} />}
          {error && <ErrorMessage message={error} />}
        </Main>
      </div>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

const SearchBar = ({ children }) => {
  return <nav className="search-bar">{children}</nav>;
};

const Search = ({ location, setLocation }) => {
  const inputEl = useRef(null);

  useKey('Enter', function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setLocation('');
  });

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
            {/* {data.weather ? <p>{data.weather[0].main}</p> : 
            null} */}

            {data.weather ? (
              <img
                alt="weather"
                className="weather-icon"
                src={`icons/${data.weather[0].icon}.png`}
              />
            ) : null}
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
