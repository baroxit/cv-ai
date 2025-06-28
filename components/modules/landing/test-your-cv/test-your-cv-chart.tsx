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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ImproveDescriptionSchema } from "@/utils/schemas"


const aspects: { label: string; key: keyof ImproveDescriptionSchema; tooltip: string }[] = [
    { label: 'Spelling', key: 'spelling', tooltip: 'Ensures there are no typos or misspelled words in the text.' },
    { label: 'Grammar', key: 'grammar', tooltip: 'Verifies proper sentence structure and enhances readability.' },
    { label: 'Metrics', key: 'metrics', tooltip: 'Checks for measurable outcomes, such as percentages, timeframes, or numerical improvements.' },
    { label: 'Keywords', key: 'keywords', tooltip: 'Analyzes the use of impactful action verbs and industry-specific terminology to improve clarity and effectiveness.' }
];

const chartData = [
  { aspect: "Spelling", score: 95 },
  { aspect: "Grammar", score: 88 },
  { aspect: "Metrics", score: 75 },
  { aspect: "Keywords", score: 92 },
]

const chartConfig = {
  score: {
    label: "Score",
    color: "#10b981",
  },
} satisfies ChartConfig

export function ChartRadarDots() {
  return (
    <Card className="mt-8">
      <CardHeader className="items-center">
        <CardTitle>Detailed analysis</CardTitle>
        <CardDescription>
          Showing CV performance across different aspects
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="aspect" />
            <PolarGrid />
            <Radar
              dataKey="score"
              fill="var(--color-score)"
              fillOpacity={0.5}
              dot={{
                r: 4,
                fillOpacity: 0.8,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <Accordion
        type="single"
        collapsible
        className="w-full"
        >
        {aspects.map((aspect, index) => (
          <AccordionItem key={`item-${index + 1}`} value={`item-${index + 1}`}>
            <AccordionTrigger className="text-sm py-2">{aspect.label}</AccordionTrigger>
            <AccordionContent className="text-left">
              <p>{aspect.tooltip}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
        </Accordion>
      </CardFooter>
    </Card>
  )
}

export default ChartRadarDots
