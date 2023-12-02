const CurrentWeather = ({ data }) => {
  function formatDate() {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date();
    return date.toLocaleDateString(undefined, options);
  }

  const formattedDate = formatDate();

  return (
    <>
      <div className="container">
        {data.name !== undefined && (
          <div className="top">
            <div className="city">
              <p>
                {data.name}
                {data.sys ? <span> {data.sys.country}</span> : null}
              </p>
              <span>{data.main ? formattedDate : null}</span>
            </div>

            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
              {data.weather ? <p>{data.weather[0].description}</p> : null}
            </div>

            <div className="description">
              {data.weather ? (
                <img
                  alt="weather"
                  className="weather-icon"
                  src={`icons/${data.weather[0].icon}.png`}
                />
              ) : null}

              <div className="min-max">
                {data.weather ? (
                  <p className="min-max_item">
                    H:{data.main.temp_max.toFixed()}
                  </p>
                ) : null}
                {data.weather ? (
                  <p className="min-max_item">
                    L:{data.main.temp_min.toFixed()}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {data.name !== undefined && (
          <div className="bottom">
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
