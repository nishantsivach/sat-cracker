"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Point = {
  day: string;
  accuracy: number;
};

type Props = {
  data: Point[];
};

export default function AccuracyChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C89B3C" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#C89B3C" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#E2E4E8"
        />

        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: "#5B6472" }}
        />

        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "1px solid #E2E4E8",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            fontSize: "13px",
          }}
        />

        <Area
          type="monotone"
          dataKey="accuracy"
          stroke="#C89B3C"
          strokeWidth={2.5}
          fill="url(#accuracyGradient)"
          dot={{
            r: 4,
            fill: "#C89B3C",
            stroke: "#fff",
            strokeWidth: 2,
          }}
          activeDot={{
            r: 6,
            fill: "#C89B3C",
            stroke: "#fff",
            strokeWidth: 2,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}