import { useState } from 'react';
import './App.css';
import rainIcon from './assets/rain.png';
import cloudsIcon from './assets/clouds.png';
import mistIcon from './assets/mist.png';
import snowIcon from './assets/snow.png';
import clearIcon from './assets/clear.png';
import drizzleIcon from './assets/drizzle.png';
import humidityIcon from './assets/humidity.png';
import windIcon from './assets/wind.png';
import searchIcon from './assets/search.png';

function App() {
  const apiKey = import.meta.env.VITE_API_KEY || "f0ef7948b02d6e8eceb01c7532034814";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const checkWeather = async (city) => {
    console.log(`Fetching weather for city: ${city}`); // Debug: Confirm the function is called
    try {
      const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
      console.log(`Response status: ${response.status}`); // Debug: Log the response status
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        setError(errorData.message || 'Failed to fetch weather data');
        setWeatherData(null);
      } else {
        const data = await response.json();
        console.log('API Response:', data); // Debug: Log the full response
        setWeatherData(data);
        setError(null);
        console.log('weatherData state updated:', data); // Debug: Confirm state update
      }
    } catch (err) {
      console.error('Fetch Error:', err.message);
      setError('Network error or failed to fetch data');
      setWeatherData(null);
    }
  };

  const getWeatherIcon = (weatherMain) => {
    console.log(`Weather condition: ${weatherMain}`); // Debug: Log the weather condition
    switch (weatherMain) {
      case 'Rain': return rainIcon;
      case 'Clouds': return cloudsIcon;
      case 'Mist': return mistIcon;
      case 'Snow': return snowIcon;
      case 'Clear': return clearIcon;
      case 'Drizzle': return drizzleIcon;
      default:
        console.warn(`Unexpected weather condition: ${weatherMain}`);
        return clearIcon;
    }
  };

  const handleSearch = () => {
    if (city) {
      console.log('Search button clicked, city:', city); // Debug: Confirm button click
      setError(null);
      setWeatherData(null); // Reset weatherData to ensure fresh render
      checkWeather(city);
    } else {
      setError('Please enter a city name');
      setWeatherData(null);
    }
  };

  return (
    <div>
      {/* Sun */}
      <div className="sun"></div>
      {/* Clouds */}
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>
      {/* Stars */}
      <div className="star" style={{ top: '10%', left: '70%' }}></div>
      <div className="star" style={{ top: '20%', left: '30%' }}></div>
      <div className="star" style={{ top: '50%', left: '80%' }}></div>

      {/* Weather Card */}
      <div className="card">
        <div className="search">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            spellCheck="false"
            placeholder="Enter city name"
          />
          <button onClick={handleSearch}>
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        <div className="err" style={{ display: error ? 'block' : 'none' }}>
          <p>{error || 'Invalid City Name !!!'}</p>
        </div>
        <div className="weather" style={{ display: weatherData ? 'block' : 'none' }}>
          {weatherData && (
            <>
              <img
                className="icon"
                src={getWeatherIcon(weatherData.weather[0]?.main)}
                alt="Weather Icon"
              />
              <h1 className="temp">{Math.round(weatherData.main?.temp)} °C</h1>
              <h2 className="city">{weatherData.name}</h2>
              <div className="details">
                <div className="col">
                  <img src={humidityIcon} alt="Humidity" />
                  <div>
                    <p className="humidity">{weatherData.main?.humidity}%</p>
                  </div>
                  <div className="hum">
                    <p>Humidity</p>
                  </div>
                </div>
                <div className="col">
                  <img src={windIcon} alt="Wind" />
                  <div>
                    <p className="wind">{weatherData.wind?.speed} Km/h</p>
                  </div>
                  <div className="win">
                    <p>Wind Speed</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;