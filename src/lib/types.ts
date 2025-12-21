export type DailyForecast = {
  day: string;
  condition: WeatherCondition;
  maxTemp: number;
  minTemp: number;
  aqi: number;
};

export type WeatherData = {
  city: string;
  country: string;
  temperature: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  aqi: number;
  forecast: DailyForecast[];
};

export type WeatherCondition = "Sunny" | "Cloudy" | "Rainy" | "Windy" | "Partly Cloudy";
