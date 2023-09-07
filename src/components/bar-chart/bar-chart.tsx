import React from "react";
import type { BarChartProps } from "./bar-chart.interface";

export const BarChart: React.FC<BarChartProps> = ({
  className,
  data,
  color = "#468ec1",
  gap = 5,
  width = 640,
  height = 480,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const ctxRef = React.useRef<CanvasRenderingContext2D | null>(null);

  /**
   * Нормализация значений под высоту полотна
   * Все что внутри хука можно размести в helpers
   */
  const normalizeData = React.useMemo(() => {
    const maxValue = Math.max(...data.map(({ value }) => value));

    if (maxValue <= height) return data;

    const ratio = height / maxValue;

    return data.map(({ value }) => ({ value: value * ratio }));
  }, [data, height]);

  /**
   * Создание 2d контекста
   */
  React.useEffect(() => {
    if (!canvasRef.current) return void 0;

    const canvasElement = canvasRef.current;
    ctxRef.current = canvasElement.getContext("2d");
  }, []);

  /**
   * Отрисовка столбцов графика на полотне.
   */
  React.useEffect(() => {
    if (!canvasRef.current || !ctxRef.current) return void 0;

    const canvasElement = canvasRef.current;
    const ctx = ctxRef.current;
    const widthBar = (canvasElement.width - gap * (normalizeData.length - 1)) / normalizeData.length;

    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    normalizeData.forEach(({ value }, index) => {
      ctx.fillStyle = color;

      ctx.fillRect((widthBar + gap) * index, canvasElement.height - value, widthBar, value);
    });
  }, [gap, normalizeData, color]);

  return <canvas ref={canvasRef} width={width} height={height} className={className} />;
};
