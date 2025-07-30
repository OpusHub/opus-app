"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

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

export const description = "Agent Performance: Resolved vs Escalated Tickets"

const chartData = [
  { month: "January", resolved: 150, escalated: 20 },
  { month: "February", resolved: 180, escalated: 25 },
  { month: "March", resolved: 170, escalated: 22 },
  { month: "April", resolved: 190, escalated: 18 },
  { month: "May", resolved: 200, escalated: 15 },
  { month: "June", resolved: 210, escalated: 10 },
]

const chartConfig = {
  resolved: {
    label: "Tickets Resolvidos",
    color: "var(--chart-1)",
  },
  escalated: {
    label: "Tickets Escalados para humano",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig

export function ChartAgentPerformance() {
  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>Performance do Agente</CardTitle>
        <CardDescription>Análise comparando tickets resolvidos pelo agente e escalados para humano</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ right: 16 }}
            className="mx-auto aspect-square max-h-[250px] w-full"
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <XAxis dataKey="resolved" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />

            <Bar
              dataKey="resolved"
              layout="vertical"
              fill="var(--color-resolved)"
              radius={4}
            >
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="resolved"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>

            <Bar
              dataKey="escalated"
              layout="vertical"
              fill="var(--color-escalated)"
              radius={4}
            >
              <LabelList
                dataKey="escalated"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
            5% do atendimentos resolvidos pelo agente <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Comparação de tickets resolvidos vs escalados para humano nos últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  )
}
