import type { WeatherCondition } from '@/lib/types';
import { Sun, Cloudy, CloudRain, Wind, CloudSun } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

type WeatherIconProps = {
  condition: WeatherCondition;
} & LucideProps;

export function WeatherIcon({ condition, ...props }: WeatherIconProps) {
  switch (condition) {
    case 'Sunny':
      return <Sun {...props} />;
    case 'Cloudy':
      return <Cloudy {...props} />;
    case 'Rainy':
      return <CloudRain {...props} />;
    case 'Windy':
      return <Wind {...props} />;
    case 'Partly Cloudy':
      return <CloudSun {...props} />;
    default:
      return <Sun {...props} />;
  }
}
