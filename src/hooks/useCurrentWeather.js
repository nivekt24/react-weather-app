import { useState, useEffect } from 'react';

const KEY = 'c246e7ccc7c4a6223ab7661ddb69e82d';

export function useCurrentWeather(location) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchCurrentWeather() {
        try {
          setIsLoading(true);
          setError('');

          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${KEY}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error('Something went wrong with fetching weather data');

          const data = await res.json();
          if (data.Response === 'False')
            throw new Error('Location is not found');

          // console.log(data);
          setData(data);
          setError('');
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
        if (location.length < 3) {
          setData({});
          setError('');
          return;
        }
      }
      fetchCurrentWeather();
    },
    [location]
  );

  return { data, isLoading, error };
}
