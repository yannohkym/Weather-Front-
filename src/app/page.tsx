import { useState } from 'react';
import SearchBox from '..components/SearchBox';
import WeatherDetails from '../components/WeatherDetails';

const Home: React.FC = () => {
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric');
  const [searchedCity, setSearchedCity] = useState('');

  const handleSearch = (city: string) => {
    setSearchedCity(city);
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center mb-4">Weather App</h1>
      <SearchBox onSearch={handleSearch} />
      <button onClick={toggleUnit} className="mt-2 p-2 bg-green-500 text-white rounded">
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
      {searchedCity && <WeatherDetails city={searchedCity} unit={unit} />}
    </div>
  );
};

export default Home;
