import React from 'react';
import { Link } from 'react-router-dom';
import './WeatherCard.css';

function WeatherCard({ data }) {
  const temp = data.main.temp;
  const weatherMain = data.weather[0].main.toLowerCase();

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const getCardClass = () => {
    if (weatherMain.includes('clear')) return 'weather-card sunny';
    if (weatherMain.includes('cloud')) return 'weather-card cloudy';
    if (weatherMain.includes('rain')) return 'weather-card rainy';
    if (weatherMain.includes('snow')) return 'weather-card snowy';
    return 'weather-card default';
  };

  return (
    <div className={getCardClass()}>
      <div className="weather-info">
        <h2>{data.name}, {data.sys.country}</h2>
        <p>{currentTime}</p>
        <p>{currentDate}</p>
        <p><strong>{data.weather[0].main}</strong></p>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt="weather icon"
        />
        <p className="temp">{Math.round(temp)}°C</p>
        <Link to={`/details/${data.name}`} className="details-link">View details</Link>
      </div>
    </div>
  );
}

export default WeatherCard;
