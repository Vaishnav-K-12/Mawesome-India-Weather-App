'use client';

import { useState, useMemo } from 'react';
import { Cloud, Droplets, Search, Sun, Wind, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { indianCitiesWeather, defaultCity } from '@/lib/weather-data';
import type { WeatherData, DailyForecast, WeatherCondition } from '@/lib/types';
import { WeatherIcon } from '@/components/weather/weather-icon';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type DisplayWeather = {
  city: string;
  country: string;
  temperature: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  aqi: number;
  day: string;
};

const getAqiColor = (aqi: number) => {
  if (aqi <= 50) return 'text-green-500';
  if (aqi <= 100) return 'text-yellow-500';
  if (aqi <= 150) return 'text-orange-500';
  if (aqi <= 200) return 'text-red-500';
  if (aqi <= 300) return 'text-purple-500';
  return 'text-rose-700';
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cityData, setCityData] = useState<WeatherData | null>(
    indianCitiesWeather.find(city => city.city.toLowerCase() === defaultCity.toLowerCase()) || null
  );
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm) return;
    const foundCity = indianCitiesWeather.find(
      city => city.city.toLowerCase() === searchTerm.toLowerCase()
    );
    if (foundCity) {
      setCityData(foundCity);
      setSelectedDayIndex(null); // Reset to current day on new search
    } else {
      toast({
        variant: "destructive",
        title: "City not found",
        description: `Weather data for "${searchTerm}" is not available. Please try another Indian city.`,
      })
    }
  };

  const handleForecastClick = (index: number) => {
    setSelectedDayIndex(index);
  };
  
  const handleCurrentWeatherClick = () => {
    setSelectedDayIndex(null);
  }

  const displayWeather: DisplayWeather | null = useMemo(() => {
    if (!cityData) return null;
    
    if (selectedDayIndex !== null) {
      const forecastDay = cityData.forecast[selectedDayIndex];
      return {
        city: cityData.city,
        country: cityData.country,
        temperature: Math.round((forecastDay.maxTemp + forecastDay.minTemp) / 2),
        condition: forecastDay.condition,
        humidity: cityData.humidity, // Using parent humidity as placeholder
        windSpeed: cityData.windSpeed, // Using parent windSpeed as placeholder
        aqi: forecastDay.aqi,
        day: forecastDay.day,
      };
    }

    return {
      city: cityData.city,
      country: cityData.country,
      temperature: cityData.temperature,
      condition: cityData.condition,
      humidity: cityData.humidity,
      windSpeed: cityData.windSpeed,
      aqi: cityData.aqi,
      day: 'Today',
    };
  }, [cityData, selectedDayIndex]);

  const aqiColor = displayWeather ? getAqiColor(displayWeather.aqi) : '';

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground font-body p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-3xl mx-auto">
        <header className="flex flex-col items-center mb-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary flex items-center gap-2">
                <Sun className="w-10 h-10 text-accent" />
                Mawesome
                <Cloud className="w-10 h-10 text-primary" />
            </h1>
            <p className="text-muted-foreground mt-2">Your daily weather companion for India</p>
        </header>

        <form onSubmit={handleSearch} className="flex w-full gap-2 mb-8">
          <Input
            type="text"
            placeholder="Search for a city in India..."
            className="flex-grow bg-card focus-visible:ring-accent"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Button type="submit" variant="default" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
        </form>

        {cityData && displayWeather ? (
          <div className="space-y-8 animate-in fade-in-50 duration-500">
            {/* Current Weather */}
            <Card className="overflow-hidden shadow-lg cursor-pointer hover:bg-primary/5 transition-colors" onClick={handleCurrentWeatherClick}>
              <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6 bg-primary/10">
                <div className="flex items-center gap-4">
                  <WeatherIcon condition={displayWeather.condition} className="w-20 h-20 text-accent" />
                  <div>
                    <p className="text-5xl font-bold">{displayWeather.temperature}°C</p>
                    <p className="text-xl text-muted-foreground">{displayWeather.condition}</p>
                    <p className="text-lg font-medium">{displayWeather.city}, {displayWeather.country} ({displayWeather.day})</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-center sm:text-left">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-bold">{displayWeather.humidity}%</p>
                      <p className="text-sm text-muted-foreground">Humidity</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-bold">{displayWeather.windSpeed} km/h</p>
                      <p className="text-sm text-muted-foreground">Wind</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className={cn("w-6 h-6", aqiColor)} />
                    <div>
                      <p className={cn("font-bold", aqiColor)}>{displayWeather.aqi}</p>
                      <p className="text-sm text-muted-foreground">AQI</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* 3-Day Forecast */}
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>3-Day Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        {cityData.forecast.map((day: DailyForecast, index: number) => (
                            <div 
                                key={index} 
                                className={cn(
                                  "flex flex-col items-center p-4 rounded-lg bg-background hover:bg-primary/5 transition-colors cursor-pointer",
                                  selectedDayIndex === index && "bg-primary/10 ring-2 ring-accent"
                                )}
                                onClick={() => handleForecastClick(index)}
                            >
                                <p className="font-bold text-lg">{day.day}</p>
                                <WeatherIcon condition={day.condition} className="w-12 h-12 my-2 text-accent" />
                                <p className="font-semibold">{day.maxTemp}° / {day.minTemp}°</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

          </div>
        ) : (
          <Card className="text-center p-8 shadow-lg">
            <p className="text-muted-foreground">Weather data not found. Please search for a major Indian city.</p>
          </Card>
        )}
      </main>
      <Toaster />
    </div>
  );
}
