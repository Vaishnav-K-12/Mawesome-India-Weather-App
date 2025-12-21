import type { WeatherData } from './types';

export const indianCitiesWeather: WeatherData[] = [
  {
    city: 'Delhi',
    country: 'India',
    temperature: 32,
    condition: 'Sunny',
    humidity: 45,
    windSpeed: 10,
    aqi: 185,
    forecast: [
      { day: 'Mon', condition: 'Sunny', maxTemp: 34, minTemp: 25, aqi: 190 },
      { day: 'Tue', condition: 'Partly Cloudy', maxTemp: 33, minTemp: 26, aqi: 175 },
      { day: 'Wed', condition: 'Cloudy', maxTemp: 31, minTemp: 24, aqi: 160 },
    ],
  },
  {
    city: 'Mumbai',
    country: 'India',
    temperature: 29,
    condition: 'Rainy',
    humidity: 88,
    windSpeed: 25,
    aqi: 95,
    forecast: [
      { day: 'Mon', condition: 'Rainy', maxTemp: 30, minTemp: 26, aqi: 100 },
      { day: 'Tue', condition: 'Rainy', maxTemp: 29, minTemp: 25, aqi: 90 },
      { day: 'Wed', condition: 'Cloudy', maxTemp: 30, minTemp: 26, aqi: 85 },
    ],
  },
  {
    city: 'Bangalore',
    country: 'India',
    temperature: 24,
    condition: 'Cloudy',
    humidity: 75,
    windSpeed: 15,
    aqi: 65,
    forecast: [
      { day: 'Mon', condition: 'Partly Cloudy', maxTemp: 26, minTemp: 20, aqi: 70 },
      { day: 'Tue', condition: 'Rainy', maxTemp: 24, minTemp: 20, aqi: 60 },
      { day: 'Wed', condition: 'Cloudy', maxTemp: 25, minTemp: 21, aqi: 68 },
    ],
  },
  {
    city: 'Chennai',
    country: 'India',
    temperature: 31,
    condition: 'Partly Cloudy',
    humidity: 70,
    windSpeed: 18,
    aqi: 110,
    forecast: [
      { day: 'Mon', condition: 'Partly Cloudy', maxTemp: 33, minTemp: 27, aqi: 115 },
      { day: 'Tue', condition: 'Sunny', maxTemp: 34, minTemp: 28, aqi: 120 },
      { day: 'Wed', condition: 'Partly Cloudy', maxTemp: 33, minTemp: 27, aqi: 105 },
    ],
  },
  {
    city: 'Kolkata',
    country: 'India',
    temperature: 30,
    condition: 'Cloudy',
    humidity: 82,
    windSpeed: 12,
    aqi: 130,
    forecast: [
      { day: 'Mon', condition: 'Rainy', maxTemp: 31, minTemp: 26, aqi: 135 },
      { day: 'Tue', condition: 'Cloudy', maxTemp: 30, minTemp: 25, aqi: 125 },
      { day: 'Wed', condition: 'Rainy', maxTemp: 29, minTemp: 25, aqi: 120 },
    ],
  },
];

export const defaultCity = 'Delhi';
