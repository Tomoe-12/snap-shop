"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Data = {
  day: string;
  count: number;
};
type AnalyticChartProps = {
  data: Data[];
};

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig = {
  order: {
    label: "Order",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const AnalyticChart = ({ data }: AnalyticChartProps) => {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Orders Chart</CardTitle>
      <CardDescription>{data[0].day } - {data[data.length - 1].day}</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig} className=" mx-auto">
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
            top:20,
            bottom : 20 , 
          }}
        >
          <CartesianGrid vertical={true} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            // tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="count"
            type="natural"
            // stroke="var(--color-desktop)"
            stroke="black"
            strokeWidth={2}
            dot={{
            //   fill: "var(--color-desktop)",
            fill: 'white'
            }}
            activeDot={{
              r: 6,
            }}
          />
        </LineChart>
      </ChartContainer>
    </CardContent>
    {/* <CardFooter className="flex-col items-start gap-2 text-sm">
      <div className="flex gap-2 font-medium leading-none">
        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
      </div>
      <div className="leading-none text-muted-foreground">
        Showing total visitors for the last 6 months
      </div>
    </CardFooter> */}
  </Card>
  );
};

export default AnalyticChart;
