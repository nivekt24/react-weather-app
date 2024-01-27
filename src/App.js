import React, { useState } from 'react';
import { useCurrentWeather } from './hooks/useCurrentWeather';
import SearchBar from './ui/SearchBar';
import Search from './components/search/search';
import Main from './ui/Main';
import CurrentWeather from './components/current-weather/current-weather';
import ErrorMessage from './ui/ErrorMessage';
import Loader from './ui/Loader';

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
          {!isLoading && !error ? <CurrentWeather data={data} /> : null}
          {error && <ErrorMessage message={error} />}
        </Main>
      </div>
    </>
  );
}
