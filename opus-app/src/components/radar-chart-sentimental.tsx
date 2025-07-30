"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart with dots"

const chartData = [
  { month: "January", positive: 186 },
  { month: "February", negative: 305 },
  { month: "March", neutro: 237 },
  { month: "April", positive: 273 },
  { month: "May", negative: 209 },
  { month: "June", neutro: 214 },
]

const chartConfig = {
  positive: {
    label: "Sentimento Positivo",
    color: "var(--chart-1)",
  },
  negative: {
    label: "Sentimento Negativo",
    color: "var(--chart-2)",
  },
  neutro: {
    label: "Sentimento Neutro",
    color: "var(--chart-3)",
  },
  
} satisfies ChartConfig

export function ChartRadarDots() {
  return (
    <Card className="w-1/2 h-fit">
      <CardHeader className="items-center">
        <CardTitle>Análise de Sentimento do Cliente</CardTitle>
        <CardDescription>
            Análise de sentimento do cliente com base na pesquisa NPS pós atendimento do agente
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="positive"
              fill="var(--color-positive)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
            <Radar
              dataKey="negative"
              fill="var(--color-negative)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
            <Radar
              dataKey="neutro"
              fill="var(--color-white)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Aumento de 5.2% do sentimento neutro este mês <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
