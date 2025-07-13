import React from 'react';
import { Link } from 'react-router-dom';
import './WeatherCard.css';
import { useFavorites } from '../context/FavoritesContext';

function WeatherCard({ data }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const temp = data.main.temp;
  const weatherMain = data.weather[0].main.toLowerCase();

  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const isFavorite = favorites.includes(data.name);
  const handleFavorite = () => {
    isFavorite ? removeFavorite(data.name) : addFavorite(data.name);
  };

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
        <div className="button-group">
          <Link to={`/details/${data.name}`} className="details-link">Vezi detalii</Link>
          <button className="details-link" onClick={handleFavorite}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
