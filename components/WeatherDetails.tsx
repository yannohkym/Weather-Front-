import { useState, useEffect } from 'react';

interface WeatherDetailsProps {
  city: string;
  unit: string;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ city, unit }) => {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(`/api/weather?city=${city}&unit=${unit}`);
      const data = await response.json();
      setWeather(data);
    };

    fetchWeather();
  }, [city, unit]);

  if (!weather) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex items-center">
        <img src={weather.current.icon} alt="weather icon" className="w-12 h-12" />
        <div className="ml-4">
          <h2 className="text-2xl">{weather.current.temperature}°{unit === 'metric' ? 'C' : 'F'}</h2>
          <p>{weather.current.description}</p>
          <p>{weather.location}</p>
          <p>{new Date(weather.current.date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl">Next 3 days</h3>
        <div className="flex justify-between">
          {weather.forecast.map((day: any, index: number) => (
            <div key={index} className="text-center">
              <img src={day.icon} alt="weather icon" className="w-8 h-8 mx-auto" />
              <p>{day.date}</p>
              <p>{day.temp_min}° - {day.temp_max}°</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl">Wind Status</h3>
        <p>{weather.current.wind_speed} km/h</p>
      </div>
      <div className="mt-4">
        <h3 className="text-xl">Humidity</h3>
        <p>{weather.current.humidity}%</p>
      </div>
    </div>
  );
};

export default WeatherDetails;
