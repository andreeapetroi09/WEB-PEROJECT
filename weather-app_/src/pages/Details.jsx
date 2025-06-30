import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Details() {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '2626d8fea9b3d945589c6d1276ffdbad';

  useEffect(() => {
    if (!cityName) {
      setError('Orașul nu este specificat.');
      return;
    }

    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );
        if (!res.ok) {
          throw new Error('Eroare la încărcarea detaliilor');
        }
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDetails();
  }, [cityName]);

  if (error) return <div style={{ padding: '20px' }}>{error}</div>;

  if (!details) return <div style={{ padding: '20px' }}>Se încarcă...</div>;

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f4f4f4', borderRadius: '12px' }}>
      <h2>{details.name}, {details.sys.country}</h2>
      <p><strong>Temperatură:</strong> {details.main.temp} °C</p>
      <p><strong>Resimțită:</strong> {details.main.feels_like} °C</p>
      <p><strong>Umiditate:</strong> {details.main.humidity} %</p>
      <p><strong>Presiune:</strong> {details.main.pressure} hPa</p>
      <p><strong>Viteza vântului:</strong> {details.wind.speed} m/s</p>
      <p><strong>Descriere:</strong> {details.weather[0].description}</p>

      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Înapoi
      </button>
    </div>
  );
}

export default Details;
