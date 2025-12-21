'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Cloud, Droplets, Search, Sun, Wind, Leaf, Smile, Frown, Meh, AlertTriangle, CloudRain, Thermometer, Pin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { indianCitiesWeather, defaultCity } from '@/lib/weather-data';
import type { WeatherData, DailyForecast, WeatherCondition } from '@/lib/types';
import { WeatherIcon } from '@/components/weather/weather-icon';
import { WeatherCharts } from '@/components/weather/weather-charts';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from '@/components/ui/popover';
import { format, addDays } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type DisplayWeather = {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  aqi: number;
  day: string;
  rainAlert?: string;
};

const getAqiInfo = (aqi: number) => {
  if (aqi <= 50) return { color: 'text-green-500', advice: 'Good', Icon: Smile };
  if (aqi <= 100) return { color: 'text-yellow-500', advice: 'Moderate', Icon: Meh };
  if (aqi <= 150) return { color: 'text-orange-500', advice: 'Unhealthy for Sensitive Groups', Icon: Frown };
  if (aqi <= 200) return { color: 'text-red-500', advice: 'Unhealthy', Icon: Frown };
  if (aqi <= 300) return { color: 'text-purple-500', advice: 'Very Unhealthy', Icon: AlertTriangle };
  return { color: 'text-rose-700', advice: 'Hazardous', Icon: AlertTriangle };
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cityData, setCityData] = useState<WeatherData | null>(
    indianCitiesWeather.find(city => city.city.toLowerCase() === defaultCity.toLowerCase()) || null
  );
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();
  
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('favoriteCities');
      if (storedFavorites) {
        setFavoriteCities(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Failed to parse favorite cities from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
    } catch (error) {
      console.error("Failed to save favorite cities to localStorage", error);
    }
  }, [favoriteCities]);


  useEffect(() => {
    const currentHour = new Date().getHours();
    // Night time between 6 PM (18) and 6 AM (6)
    if (currentHour >= 18 || currentHour < 6) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm) return;
    const foundCity = indianCitiesWeather.find(
      city => city.city.toLowerCase() === searchTerm.toLowerCase()
    );
    if (foundCity) {
      setCityData(foundCity);
      setSelectedDayIndex(null); // Reset to current day on new search
      setSearchTerm(''); // Clear search term after selection
      setIsPopoverOpen(false); // Close popover
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

  const handleCitySelect = (city: WeatherData) => {
    setCityData(city);
    setSelectedDayIndex(null);
    setSearchTerm(''); // Clear search term after selection
    setIsPopoverOpen(false); // Close popover
  }
  
  const handleFavoriteCityClick = (cityName: string) => {
    const foundCity = indianCitiesWeather.find(
      city => city.city.toLowerCase() === cityName.toLowerCase()
    );
    if (foundCity) {
      setCityData(foundCity);
      setSelectedDayIndex(null);
    }
  }

  const toggleFavorite = () => {
    if (!cityData) return;
    const cityName = cityData.city;
    if (favoriteCities.includes(cityName)) {
      setFavoriteCities(favoriteCities.filter(favCity => favCity !== cityName));
      toast({ title: `${cityName} removed from favorites` });
    } else {
      setFavoriteCities([...favoriteCities, cityName]);
      toast({ title: `${cityName} added to favorites` });
    }
  };
  
  const isCurrentCityFavorite = cityData ? favoriteCities.includes(cityData.city) : false;

  const filteredCities = useMemo(() => {
    if (!searchTerm) return [];
    return indianCitiesWeather.filter(city =>
      city.city.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm.length > 0 && filteredCities.length > 0) {
      setIsPopoverOpen(true);
    } else {
      setIsPopoverOpen(false);
    }
  }, [searchTerm, filteredCities.length]);

  const displayWeather: DisplayWeather | null = useMemo(() => {
    if (!cityData) return null;
    
    if (selectedDayIndex !== null) {
      const forecastDay = cityData.forecast[selectedDayIndex];
      const dayDate = addDays(new Date(), selectedDayIndex + 1);
      return {
        city: cityData.city,
        country: cityData.country,
        temperature: Math.round((forecastDay.maxTemp + forecastDay.minTemp) / 2),
        feelsLike: forecastDay.feelsLike,
        condition: forecastDay.condition,
        humidity: cityData.humidity, // Using parent humidity as placeholder
        windSpeed: cityData.windSpeed, // Using parent windSpeed as placeholder
        aqi: forecastDay.aqi,
        day: format(dayDate, 'EEE, MMM d'),
        rainAlert: forecastDay.rainAlert,
      };
    }

    return {
      city: cityData.city,
      country: cityData.country,
      temperature: cityData.temperature,
      feelsLike: cityData.feelsLike,
      condition: cityData.condition,
      humidity: cityData.humidity,
      windSpeed: cityData.windSpeed,
      aqi: cityData.aqi,
      day: 'Today',
      rainAlert: cityData.rainAlert,
    };
  }, [cityData, selectedDayIndex]);

  const aqiInfo = displayWeather ? getAqiInfo(displayWeather.aqi) : null;
  
  const getFeelsLikePhrase = (temp: number, feelsLike: number) => {
    const diff = feelsLike - temp;
    if (diff > 2) return "Feels much hotter";
    if (diff > 0) return "Feels hotter";
    if (diff < -2) return "Feels much cooler";
    if (diff < 0) return "Feels cooler";
    return "Similar to actual temp";
  };

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
        
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <form onSubmit={handleSearch} className="flex w-full gap-2 mb-4">
            <PopoverAnchor asChild>
                <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for a city in India..."
                    className="flex-grow bg-card focus-visible:ring-accent"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    autoComplete="off"
                />
            </PopoverAnchor>
            <Button type="submit" variant="default" size="icon" aria-label="Search">
                <Search className="h-5 w-5" />
            </Button>
          </form>
          <PopoverContent 
            className="w-[--radix-popover-trigger-width] p-0" 
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            {filteredCities.length > 0 ? (
                <div className="flex flex-col">
                {filteredCities.map(city => (
                    <button
                    key={city.city}
                    onClick={() => handleCitySelect(city)}
                    className="text-left p-2 hover:bg-accent/50"
                    >
                    {city.city}
                    </button>
                ))}
                </div>
            ) : null}
          </PopoverContent>
        </Popover>

        {favoriteCities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <h3 className="text-sm font-semibold text-muted-foreground w-full">Favorites:</h3>
            {favoriteCities.map(favCity => (
              <Button
                key={favCity}
                variant="outline"
                size="sm"
                onClick={() => handleFavoriteCityClick(favCity)}
                className={cn(cityData?.city === favCity && "bg-primary/10 ring-2 ring-accent")}
              >
                {favCity}
              </Button>
            ))}
          </div>
        )}

        {cityData && displayWeather && aqiInfo ? (
          <div className="space-y-8 animate-in fade-in-50 duration-500">
            {/* Current Weather */}
            <Card className="overflow-hidden shadow-lg">
              <div className={cn("cursor-pointer hover:bg-primary/5 transition-colors")} onClick={handleCurrentWeatherClick}>
                <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6 bg-primary/10">
                  <div className="flex items-center gap-4">
                    <WeatherIcon condition={displayWeather.condition} className="w-20 h-20 text-accent" />
                    <div>
                      <p className="text-5xl font-bold">{displayWeather.temperature}°C</p>
                      <p className="text-lg text-muted-foreground">{displayWeather.condition}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xl font-medium">{displayWeather.city}, {displayWeather.country} ({displayWeather.day})</p>
                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); toggleFavorite(); }} className="h-8 w-8 -mr-2">
                          <Star className={cn("w-5 h-5", isCurrentCityFavorite ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground")} />
                          <span className="sr-only">Toggle Favorite</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-center sm:text-left">
                    <div className="flex items-center gap-2">
                        <Thermometer className="w-6 h-6 text-primary" />
                        <div>
                            <p className="font-bold">{displayWeather.feelsLike}°C</p>
                            <p className="text-sm text-muted-foreground">Feels Like</p>
                        </div>
                    </div>
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
                    <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                      <aqiInfo.Icon className={cn("w-6 h-6", aqiInfo.color)} />
                      <div>
                        <p className={cn("font-bold", aqiInfo.color)}>{displayWeather.aqi}</p>
                        <p className="text-sm text-muted-foreground">AQI ({aqiInfo.advice})</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
               {displayWeather.feelsLike !== displayWeather.temperature &&
                  <div className="px-6 py-2 bg-primary/10 border-t border-border text-sm text-center text-muted-foreground">
                    {getFeelsLikePhrase(displayWeather.temperature, displayWeather.feelsLike)}
                  </div>
                }
              {displayWeather.rainAlert && (
                <Alert variant="destructive" className="border-t-0 rounded-t-none">
                  <CloudRain className="h-4 w-4" />
                  <AlertTitle>Rain Alert</AlertTitle>
                  <AlertDescription>
                    {displayWeather.rainAlert}
                  </AlertDescription>
                </Alert>
              )}
            </Card>
            
            {/* 3-Day Forecast */}
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>3-Day Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        {cityData.forecast.map((day: DailyForecast, index: number) => {
                            const forecastDate = addDays(new Date(), index + 1);
                            return (
                                <div 
                                    key={index} 
                                    className={cn(
                                      "flex flex-col items-center p-4 rounded-lg bg-background hover:bg-primary/5 transition-colors cursor-pointer",
                                      selectedDayIndex === index && "bg-primary/10 ring-2 ring-accent"
                                    )}
                                    onClick={() => handleForecastClick(index)}
                                >
                                    <p className="font-bold text-lg">{format(forecastDate, 'EEE, d')}</p>
                                    <WeatherIcon condition={day.condition} className="w-12 h-12 my-2 text-accent" />
                                    <p className="font-semibold">{day.maxTemp}° / {day.minTemp}°</p>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
            
            {/* Weather Charts */}
            <WeatherCharts cityData={cityData} />

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
