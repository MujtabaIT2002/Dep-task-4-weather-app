import { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const API_KEY = '27MZS8AN8SUHNSBK6Y4RNKGT4'; // Your API key here

  const fetchWeather = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}&contentType=json`
      );
      setWeather(response.data);
    } catch (error) {
      alert('City not found. Please try again.', error);
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      {/* Landing Page */}
      {!showSearch && (
        <div className="landing">
          <h1 className="landing-title">Welcome to Weather App</h1>
          <button className="landing-button" onClick={() => setShowSearch(true)}>
            Start Searching
          </button>
        </div>
      )}

      {/* Weather Search Page */}
      {showSearch && (
        <div className="weather-card">
          <header>
            <h1 className="fade-in">Weather Forecast</h1>
          </header>

          <form onSubmit={fetchWeather} className="input-form">
            <input
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="city-input fade-in"
            />
            <button type="submit" className="get-weather-btn fade-in" disabled={loading}>
              {loading ? 'Loading...' : 'Get Weather'}
            </button>
          </form>

          {weather && (
            <div className="weather-info fade-in">
              <h2>{weather.address}</h2>
              <div className="temp-display">
                <span className="temp">{weather.currentConditions.temp}°C</span>
                <img
                  src={`https://openweathermap.org/img/wn/10d.png`}
                  alt="Weather Icon"
                  className="weather-icon"
                />
              </div>
              <p className="description">{weather.currentConditions.conditions}</p>
              <p>Humidity: {weather.currentConditions.humidity}%</p>
              <p>Min: {weather.days[0].tempmin}°C | Max: {weather.days[0].tempmax}°C</p>
            </div>
          )}

          {/* Back to Landing Page Button */}
          <button className="back-to-landing-btn fade-in" onClick={() => setShowSearch(false)}>
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
