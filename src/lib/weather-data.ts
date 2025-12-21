import type { WeatherData } from './types';

export const indianCitiesWeather: WeatherData[] = [
  {
    city: 'Delhi',
    country: 'India',
    temperature: 32,
    condition: 'Sunny',
    humidity: 45,
    windSpeed: 10,
    forecast: [
      { day: 'Mon', condition: 'Sunny', maxTemp: 34, minTemp: 25 },
      { day: 'Tue', condition: 'Partly Cloudy', maxTemp: 33, minTemp: 26 },
      { day: 'Wed', condition: 'Cloudy', maxTemp: 31, minTemp: 24 },
    ],
  },
  {
    city: 'Mumbai',
    country: 'India',
    temperature: 29,
    condition: 'Rainy',
    humidity: 88,
    windSpeed: 25,
    forecast: [
      { day: 'Mon', condition: 'Rainy', maxTemp: 30, minTemp: 26 },
      { day: 'Tue', condition: 'Rainy', maxTemp: 29, minTemp: 25 },
      { day: 'Wed', condition: 'Cloudy', maxTemp: 30, minTemp: 26 },
    ],
  },
  {
    city: 'Bangalore',
    country: 'India',
    temperature: 24,
    condition: 'Cloudy',
    humidity: 75,
    windSpeed: 15,
    forecast: [
      { day: 'Mon', condition: 'Partly Cloudy', maxTemp: 26, minTemp: 20 },
      { day: 'Tue', condition: 'Rainy', maxTemp: 24, minTemp: 20 },
      { day: 'Wed', condition: 'Cloudy', maxTemp: 25, minTemp: 21 },
    ],
  },
  {
    city: 'Chennai',
    country: 'India',
    temperature: 31,
    condition: 'Partly Cloudy',
    humidity: 70,
    windSpeed: 18,
    forecast: [
      { day: 'Mon', condition: 'Partly Cloudy', maxTemp: 33, minTemp: 27 },
      { day: 'Tue', condition: 'Sunny', maxTemp: 34, minTemp: 28 },
      { day: 'Wed', condition: 'Partly Cloudy', maxTemp: 33, minTemp: 27 },
    ],
  },
  {
    city: 'Kolkata',
    country: 'India',
    temperature: 30,
    condition: 'Cloudy',
    humidity: 82,
    windSpeed: 12,
    forecast: [
      { day: 'Mon', condition: 'Rainy', maxTemp: 31, minTemp: 26 },
      { day: 'Tue', condition: 'Cloudy', maxTemp: 30, minTemp: 25 },
      { day: 'Wed', condition: 'Rainy', maxTemp: 29, minTemp: 25 },
    ],
  },
];

export const defaultCity = 'Delhi';
