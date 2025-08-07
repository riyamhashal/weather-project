import axios from "axios";
import React, { useState } from "react";

const Weather = () => {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState(null);

  let handleCityChange = (e) => {
    setCity(e.target.value);
  };
  let fetchWeather = async () => {
    try {
      let response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'b6d10de3dc40022a0a566ec0f91508f9'}&units=metric`
      );
      console.log(response);
      setWeather(response);
    } catch (error) {
      console.log("Error fetching weather data", error);
    }
  };

  let handleClick = (e) => {
    fetchWeather();
  };

  const getWeatherImage = (main) => {
    switch (main.toLowerCase()) {
      case "rain":
        return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; // Rain icon
      case "clear":
        return "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Sun icon
      case "clouds":
        return "https://cdn-icons-png.flaticon.com/512/1163/1163620.png"; // Cloud icon
      case "snow":
        return "https://cdn-icons-png.flaticon.com/512/642/642102.png"; // Snow icon
      case "thunderstorm":
        return "https://cdn-icons-png.flaticon.com/512/1146/1146860.png"; // Thunder icon
      case "drizzle":
        return "https://cdn-icons-png.flaticon.com/512/4005/4005901.png"; // Drizzle icon
      default:
        return "https://cdn-icons-png.flaticon.com/512/1163/1163634.png"; // Default weather icon
    }
  };
  return (
    <div className="weather-container">
      <input
        type="text"
        placeholder="Enter City Name"
        value={city}
        onChange={handleCityChange}
      />
      <br />
      <br />
      <button onClick={handleClick}>Get Weather </button>
      {weather && (
        <>
          <div className="weather-info">
            <h2>{weather.data.name}</h2>

            <img
              src={getWeatherImage(weather.data.weather[0].main)}
              alt={weather.data.weather[0].description}
              width={100}
              height={100}
            />

            <p>Temp is {weather.data.main.temp} °C</p>

            <p>{weather.data.weather[0].description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
