export type DailyForecast = {
  day: string;
  condition: WeatherCondition;
  maxTemp: number;
  minTemp: number;
  aqi: number;
  rainAlert?: string;
};

export type WeatherData = {
  city: string;
  country: string;
  temperature: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  aqi: number;
  rainAlert?: string;
  forecast: DailyForecast[];
};

export type WeatherCondition = "Sunny" | "Cloudy" | "Rainy" | "Windy" | "Partly Cloudy";
