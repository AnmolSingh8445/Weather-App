import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import './App.css';

export default function SearchBar() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "6fc301b22e42c9349b84f6a63d49cd45";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  const getWeatherInfo = async () => {
    try {
      let response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`City not found`);
      }
      let jsonResponse = await response.json();
      let result = {
        city: jsonResponse.name,
        temp: jsonResponse.main.temp,
        humidity: jsonResponse.main.humidity,
        weather: jsonResponse.weather[0].description,
      };
      setWeatherData(result);
      setError(""); // Clear error if request is successful
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
      setError("City not found");
      triggerVibration(); // Trigger the vibration animation
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city.trim() !== "") {
      getWeatherInfo();
      setCity("");
    }
  };

  const triggerVibration = () => {
    const searchContainer = document.querySelector('.search-container');
    searchContainer.classList.add('vibrate');
    setTimeout(() => {
      searchContainer.classList.remove('vibrate');
    }, 500); // Remove class after animation ends
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <div className="input-div">
        <div className="input-wrapper">
        <FaSearch className="search-icon" />
          <input
            type="text"
            value={city}
            onChange={handleChange}
            className="search-input"
            placeholder="Search City"
            required
          />
        </div>
      </div>
      <div>
        <button type="submit" className="search-button">
          Search
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h1>{weatherData.city}</h1>
          <p>Temperature - {weatherData.temp}°C</p>
          <p>Humidity - {weatherData.humidity}%</p>
          <p>Weather - {weatherData.weather}</p>
        </div>
      )}
    </form>
  );
}
