import React, { useEffect, useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import './Favorites.css';

function Favorites() {
  const { favorites } = useFavorites();
  const [weatherList, setWeatherList] = useState([]);
  const navigate = useNavigate();

  const apiKey = '2626d8fea9b3d945589c6d1276ffdbad';

  useEffect(() => {
    const fetchFavoritesWeather = async () => {
      try {
        const promises = favorites.map((city) =>
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(res => res.json())
        );
        const results = await Promise.all(promises);
        setWeatherList(results);
      } catch (err) {
        console.error('Error fetching favorites weather data:', err);
      }
    };

    if (favorites.length > 0) {
      fetchFavoritesWeather();
    } else {
      setWeatherList([]);
    }
  }, [favorites]);

  return (
    <div className="favorites-container">
      <h2>Favorite Cities</h2>

      {weatherList.length === 0 && <p>No favorites added.</p>}

      {weatherList.map((city, index) => (
        city && city.name && city.main && city.weather ? (
          <div key={index} className="favorite-card">
            <h3>{city.name}, {city.sys?.country}</h3>
            <p><strong>Temperature:</strong> {city.main?.temp} °C</p>
            <p><strong>Description:</strong> {city.weather?.[0]?.description}</p>
          </div>
        ) : null
      ))}

      <button className="back-button" onClick={() => navigate('/')}>Back</button>
    </div>
  );
}

export default Favorites;
