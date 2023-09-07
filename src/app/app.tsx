import React from "react";
import { TestBarChart } from "@widgets/test-bar-chart";
import styles from "./app.module.scss";

export const App: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <TestBarChart />
      <TestBarChart />
    </section>
  );
};
