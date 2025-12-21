'use client';

import { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { explainWeatherInsights } from '@/ai/flows/explain-weather-insights';
import type { WeatherData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

type AIAssistantProps = {
  weatherData: WeatherData;
};

export function AIAssistant({ weatherData }: AIAssistantProps) {
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetInsights = async () => {
    setIsLoading(true);
    setExplanation('');
    try {
      const result = await explainWeatherInsights({
        location: weatherData.city,
        temperature: weatherData.temperature,
        humidity: weatherData.humidity,
        windSpeed: weatherData.windSpeed,
        weatherCondition: weatherData.condition,
      });
      setExplanation(result.explanation);
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      toast({
        variant: "destructive",
        title: "AI Assistant Error",
        description: "Could not generate weather insights. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="text-accent" />
          AI Weather Assistant
        </CardTitle>
        <CardDescription>Get a simple explanation of the current weather.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleGetInsights} disabled={isLoading} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-ring">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Insights...
            </>
          ) : (
            'Explain Today\'s Weather'
          )}
        </Button>
        {explanation && (
          <div className="p-4 bg-background rounded-lg border">
            <p className="text-sm leading-relaxed">{explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
