import React from "react";
import random from "lodash/random";
import { clsx } from "clsx";
import { BarChart, type BarChartData } from "@components/bar-chart";

import styles from "./test-bar-chart.module.scss";
import type { TestBarChartProps } from "./test-bar-chart.interface";

const getRandomData = (length: number) => {
  return Array.from<unknown, BarChartData>({ length }, (_) => ({
    value: random(100, 5000),
  }));
};

export const TestBarChart: React.FC<TestBarChartProps> = ({ className }) => {
  const [data, setData] = React.useState<Array<BarChartData>>(getRandomData(6));

  const handlerClick = () => setData(getRandomData(random(3, 15)));

  return (
    <div className={clsx(className, styles.wrapper)}>
      <BarChart data={data} />

      <button onClick={handlerClick}>Сгенерировать новые данные</button>
    </div>
  );
};
