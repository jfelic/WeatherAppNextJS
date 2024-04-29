'use client'

import styles from './Weather.module.css';
import { useEffect, useState } from 'react';

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    fetchWeather();

    async function fetchWeather() {
      const city = 'Charleston';
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY; 
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},SC,US&appid=${apiKey}&units=imperial`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(`Failed to fetch weather, received status ${res.status}`);
        }
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      }
    }

  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.weatherContainer}>
      <h2 className={styles.title}>Weather for {weatherData.name}</h2>
      <p className={styles.temperature}>Current temperature: {weatherData.main.temp}°F</p>
      <p className={styles.description}>Weather conditions: {weatherData.weather[0].description}</p>
    </div>
  );
}