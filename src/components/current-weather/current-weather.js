const CurrentWeather = ({ data }) => {
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

export default CurrentWeather;
