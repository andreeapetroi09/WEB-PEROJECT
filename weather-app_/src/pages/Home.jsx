import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import './Home.css';

function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');


  const handleSearch = async () => {
    const apiKey = '2626d8fea9b3d945589c6d1276ffdbad';
    const formattedCity = city.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${formattedCity},RO&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        setError('Orașul nu a fost găsit.');
        setWeather(null);
        return;
      }

      const data = await response.json();
      setWeather(data);
      setError('');
      localStorage.setItem('lastCity', city);
    } catch (err) {
      setError('Eroare la încărcarea datelor.');
    }
  };


  useEffect(() => {
    const savedCity = localStorage.getItem('lastCity');
    if (savedCity) {
      setCity(savedCity);
    }
  }, []);


  const getBackgroundClass = () => {
    if (!weather) return 'default-bg';
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes('clear')) return 'sunny-bg';
    if (main.includes('cloud')) return 'cloudy-bg';
    if (main.includes('rain')) return 'rainy-bg';
    if (main.includes('snow')) return 'snowy-bg';
    return 'default-bg';
  };

  return (
    <div className={`home-container ${getBackgroundClass()}`}>
      <h1 className="title">Weather App</h1>
      <div className="card-container">
        <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />
        {error && <p className="error">{error}</p>}
        {weather && <WeatherCard data={weather} />}
      </div>
    </div>
  );
}

export default Home;
