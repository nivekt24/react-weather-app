import React, { useState } from 'react';
import { useCurrentWeather } from './hooks/useCurrentWeather';
import Main from './ui/Main';
import ErrorMessage from './ui/ErrorMessage';
import Loader from './ui/Loader';
import SearchBar from './ui/SearchBar';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';

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
          {!isLoading && !error && <CurrentWeather data={data} />}
          {error && <ErrorMessage message={error} />}
        </Main>
      </div>
    </>
  );
}
