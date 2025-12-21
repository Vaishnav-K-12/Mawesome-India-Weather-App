export type DailyForecast = {
  day: string;
  condition: WeatherCondition;
  maxTemp: number;
  minTemp: number;
  feelsLike: number;
  aqi: number;
  precipitation: number; // Chance of rain in %
  rainAlert?: string;
};

export type WeatherData = {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  aqi: number;
  rainAlert?: string;
  forecast: DailyForecast[];
};

export type WeatherCondition = "Sunny" | "Cloudy" | "Rainy" | "Windy" | "Partly Cloudy";
