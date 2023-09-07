export interface BarChartData {
  value: number;
}

export interface BarChartProps {
  className?: string;
  gap?: number;
  color?: string;
  width?: number;
  height?: number;
  data: Array<BarChartData>;
}
