import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => setCity(e.target.value);
  const handleChangeCountry = (e) => setCountry(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://p2pclouds.up.railway.app/v1/learn/weather?city=${city}`
      );

      const data = response.data.current;

      setWeather({
        temp: data.temp_c,
        condition: data.condition.text,
        icon: data.condition.icon,
        wind: data.wind_kph,
        humidity: data.humidity,
      });

      setError("");
    } catch (err) {
      setError("City not found or API error");
      setWeather(null);
    }
  };

  // 🌦 Dynamic background based on condition
  const getBackground = () => {
    if (!weather) return "default";
    const c = weather.condition.toLowerCase();

    if (c.includes("sunny")) return "sunny";
    if (c.includes("rain")) return "rain";
    if (c.includes("cloud")) return "cloud";
    if (c.includes("snow")) return "snow";

    return "default";
  };

  return (
    <div className={`app ${getBackground()}`}>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder="City" onChange={handleChange} />
        <input type="text" placeholder="Country" onChange={handleChangeCountry} />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <h2>{city}</h2>
          <h3>{weather.temp}°C</h3>
          <img src={weather.icon} alt="Weather Icon" />
          <p>{weather.condition}</p>

          <p><strong>Wind:</strong> {weather.wind} km/h</p>
          <p><strong>Humidity:</strong> {weather.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;