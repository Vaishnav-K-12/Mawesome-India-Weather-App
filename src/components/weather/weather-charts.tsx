"use client"

import * as React from "react"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from "recharts"
import { addDays, format } from "date-fns"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import type { WeatherData } from "@/lib/types"

const tempChartConfig = {
  maxTemp: {
    label: "Max Temp",
    color: "hsl(var(--chart-1))",
  },
  minTemp: {
    label: "Min Temp",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const aqiChartConfig = {
    aqi: {
      label: "AQI",
      color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig

const precipitationChartConfig = {
    precipitation: {
        label: "Precipitation",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

type WeatherChartsProps = {
  cityData: WeatherData;
}

export function WeatherCharts({ cityData }: WeatherChartsProps) {
  const chartData = cityData.forecast.map((day, index) => ({
    date: format(addDays(new Date(), index + 1), 'EEE, d'),
    ...day,
  }));

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Forecast Charts</CardTitle>
        <CardDescription>Visualizing the next 3 days</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="temperature">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="temperature">Temperature</TabsTrigger>
                <TabsTrigger value="aqi">AQI</TabsTrigger>
                <TabsTrigger value="precipitation">Rain</TabsTrigger>
            </TabsList>
            <TabsContent value="temperature">
                <ChartContainer config={tempChartConfig} className="min-h-[200px] w-full">
                    <LineChart accessibilityLayer data={chartData}>
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => `${value}°C`}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Line
                            dataKey="maxTemp"
                            type="natural"
                            stroke="var(--color-maxTemp)"
                            strokeWidth={2}
                            dot={true}
                        />
                        <Line
                            dataKey="minTemp"
                            type="natural"
                            stroke="var(--color-minTemp)"
                            strokeWidth={2}
                            dot={true}
                        />
                    </LineChart>
                </ChartContainer>
            </TabsContent>
            <TabsContent value="aqi">
                <ChartContainer config={aqiChartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                    />
                     <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey="aqi" fill="var(--color-aqi)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </TabsContent>
            <TabsContent value="precipitation">
                <ChartContainer config={precipitationChartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => `${value}%`}
                        />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey="precipitation" fill="var(--color-precipitation)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
