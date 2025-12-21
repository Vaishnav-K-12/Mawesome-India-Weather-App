// src/ai/flows/explain-weather-insights.ts
'use server';

/**
 * @fileOverview AI-powered weather insights explanation flow.
 *
 * This flow takes weather data as input and provides a simplified explanation
 * of the weather conditions and their potential impact using an AI assistant.
 *
 * @exports explainWeatherInsights - The main function to trigger the weather insights explanation flow.
 * @exports ExplainWeatherInsightsInput - The input type for the explainWeatherInsights function.
 * @exports ExplainWeatherInsightsOutput - The output type for the explainWeatherInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainWeatherInsightsInputSchema = z.object({
  location: z.string().describe('The city or location for which to explain weather insights.'),
  temperature: z.number().describe('The current temperature in Celsius.'),
  humidity: z.number().describe('The current humidity percentage.'),
  windSpeed: z.number().describe('The current wind speed in kilometers per hour.'),
  weatherCondition: z.string().describe('A brief description of the current weather condition (e.g., sunny, rainy, cloudy).'),
});
export type ExplainWeatherInsightsInput = z.infer<typeof ExplainWeatherInsightsInputSchema>;

const ExplainWeatherInsightsOutputSchema = z.object({
  explanation: z.string().describe('A simplified explanation of the current weather conditions and their potential impact.'),
});
export type ExplainWeatherInsightsOutput = z.infer<typeof ExplainWeatherInsightsOutputSchema>;

export async function explainWeatherInsights(input: ExplainWeatherInsightsInput): Promise<ExplainWeatherInsightsOutput> {
  return explainWeatherInsightsFlow(input);
}

const explainWeatherInsightsPrompt = ai.definePrompt({
  name: 'explainWeatherInsightsPrompt',
  input: {schema: ExplainWeatherInsightsInputSchema},
  output: {schema: ExplainWeatherInsightsOutputSchema},
  prompt: `You are an AI-powered weather assistant designed to explain weather insights in a simple, understandable way.

  Provide a concise explanation of the current weather conditions in {{location}}, including the temperature, humidity, wind speed, and overall weather condition.
  Explain the potential impact of these conditions on daily life, such as what to wear or any precautions to take.

  Current Weather in {{location}}:
  - Temperature: {{temperature}}°C
  - Humidity: {{humidity}}%
  - Wind Speed: {{windSpeed}} km/h
  - Condition: {{weatherCondition}}

  Explanation:`,
});

const explainWeatherInsightsFlow = ai.defineFlow(
  {
    name: 'explainWeatherInsightsFlow',
    inputSchema: ExplainWeatherInsightsInputSchema,
    outputSchema: ExplainWeatherInsightsOutputSchema,
  },
  async input => {
    const {output} = await explainWeatherInsightsPrompt(input);
    return output!;
  }
);
