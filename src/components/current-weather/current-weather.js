const CurrentWeather = ({ data }) => {
  if (!data.name) {
    return null; // or render an error message
  }

  const { name, sys, main, weather, wind } = data;

  function formatDate() {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date();
    return date.toLocaleDateString(undefined, options);
  }

  const formattedDate = formatDate();

  return (
    <div className="container">
      <div className="top">
        <div className="city">
          <p>
            {name}
            {sys && <span> {sys.country}</span>}
          </p>
          <span>{main && formattedDate}</span>
        </div>

        <div className="temp">
          {main && <h1>{main.temp.toFixed()}°F</h1>}
          {weather && <p>{weather[0].description}</p>}
        </div>

        <div className="description">
          {weather && (
            <img
              alt="weather"
              className="weather-icon"
              src={`icons/${weather[0].icon}.png`}
            />
          )}

          <div className="min-max">
            {weather && (
              <p className="min-max_item">H:{main.temp_max.toFixed()}</p>
            )}
            {weather && (
              <p className="min-max_item">L:{main.temp_min.toFixed()}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bottom">
        <div className="bottom">
          <WeatherInfoBlock
            title="Feels Like"
            value={main && main.feels_like.toFixed()}
            unit="°F"
          />
          <WeatherInfoBlock
            title="Humidity"
            value={main && `${main.humidity}%`}
          />
          <WeatherInfoBlock
            title="Wind Speed"
            value={wind && `${wind.speed.toFixed()} MPH`}
          />
        </div>
      </div>
    </div>
  );
};

const WeatherInfoBlock = ({ title, value, unit = '' }) => (
  <div className={title.toLowerCase()}>
    {value && (
      <p className="bold">
        {value} {unit}
      </p>
    )}
    <p>{title}</p>
  </div>
);

export default CurrentWeather;
