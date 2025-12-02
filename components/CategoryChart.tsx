"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { getCategoryColor } from "@/components/colors";
import { CategoryMetrics } from "@/types/categoryMetrics";

interface Props {
    data: CategoryMetrics[];
    width?: number;
    height?: number;
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white p-4 rounded-xl shadow-2xl border border-gray-100 min-w-[180px]">
                <div className="flex items-center gap-2 mb-2">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: payload[0].color }}
                    />
                    <p className="font-bold text-gray-900 text-sm">{data.category}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold">{data.count}</span> publicação{data.count !== 1 ? 's' : ''}
                    </p>
                    <p className="text-sm font-bold text-[#5421CD]">
                        {data.percent.toFixed(1)}% do total
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index
}: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent > 5) {
        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                className="text-xs font-bold drop-shadow-md"
                stroke="white"
                strokeWidth={0.5}
            >
                {`${percent.toFixed(0)}%`}
            </text>
        );
    }
    return null;
};

export default function CategoryChart({ 
    data, 
    width = 400, 
    height = 350 
}: Props) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-[350px] w-full bg-gray-50 rounded-lg">
                <p className="text-gray-500">Nenhum dado disponível</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center w-full h-[350px] bg-linear-to-br from-gray-50 to-white rounded-lg">
            <PieChart width={width} height={height}>
                <Pie
                    data={data}
                    dataKey="percent"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    innerRadius="40%"
                    paddingAngle={2}
                    label={renderCustomizedLabel}
                    labelLine={false}
                    animationBegin={0}
                    animationDuration={800}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={getCategoryColor(entry.category)}
                            stroke="#FFFFFF"
                            strokeWidth={2}
                            className="hover:opacity-80 transition-opacity cursor-pointer"
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
            </PieChart>
        </div>
    );
}