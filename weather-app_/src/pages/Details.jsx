import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Details.css';

function Details() {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '2626d8fea9b3d945589c6d1276ffdbad';

  useEffect(() => {
    if (!cityName) {
      setError('City is not specified.');
      return;
    }

    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName},RO&appid=${apiKey}&units=metric&lang=en`
        );
        if (!res.ok) {
          throw new Error('Error loading details.');
        }
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDetails();
  }, [cityName]);

  if (error) return <div className="details-container"><div className="details-card">{error}</div></div>;
  if (!details) return <div className="details-container"><div className="details-card">Loading...</div></div>;

  return (
    <div className="details-container">
      <div className="details-card">
        <h2>{details.name}, {details.sys.country}</h2>
        <p><strong>Temperature:</strong> {details.main.temp} °C</p>
        <p><strong>Feels like:</strong> {details.main.feels_like} °C</p>
        <p><strong>Humidity:</strong> {details.main.humidity} %</p>
        <p><strong>Pressure:</strong> {details.main.pressure} hPa</p>
        <p><strong>Wind speed:</strong> {details.wind.speed} m/s</p>
        <p><strong>Description:</strong> {details.weather[0].description}</p>

        <button onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  );
}

export default Details;
