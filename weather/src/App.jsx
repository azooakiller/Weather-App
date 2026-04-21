import { useState } from "react";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

 

  let getWeather = async () => {
    try {
      setError(false); // reset error
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      let jsonResponse = await response.json();

      if (jsonResponse.cod !== 200) {
        setError(true); // invalid city or API error
        setWeather(null);
        return;
      }

      setWeather({
        Temp: jsonResponse.main.temp,
        Humidity: jsonResponse.main.humidity,
        Min: jsonResponse.main.temp_min,
        Max: jsonResponse.main.temp_max,
        Feels_Like: jsonResponse.main.feels_like,
        City: jsonResponse.name,
        Country: jsonResponse.sys.country,
      });
    } catch (err) {
      setError(true);
      setWeather(null);
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "") return;
    getWeather();
    setCity("");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", marginTop: "50px" }}>
      <h2 style={{ color: "#333" }}>🌤 Weather Finder</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter a city..."
          onChange={(e) => setCity(e.target.value)}
          value={city}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {error ? (
        <div style={{ color: "red", marginTop: "20px" }}>
          ⚠️ Could not find city. Please try again!
        </div>
      ) : weather ? (
        <div
          style={{
            backgroundColor: "#f0f8ff",
            display: "inline-block",
            padding: "20px 40px",
            borderRadius: "12px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>
            {weather.City}, {weather.Country}
          </h3>
          <p style={{ fontSize: "24px", margin: "10px 0" }}>
            🌡 {weather.Temp}°C
          </p>
          <p>Feels Like: {weather.Feels_Like}°C</p>
          <p>Min: {weather.Min}°C | Max: {weather.Max}°C</p>
          <p>Humidity: {weather.Humidity}%</p>
        </div>
      ) : (
        <div style={{ marginTop: "20px", color: "#666" }}>
          🔍 Enter a city to get the weather
        </div>
      )}
    </div>
  );
}
