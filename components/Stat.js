import Link from "next/link";
import { useContext } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Context from "../Context";
import { serverLine } from "../controllers/frontend/serverLine";
import Brand from "./Brand";
import BarChart from "react-svg-bar-chart";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import Header from "./Header";
import WithHeader from "./WithHeader";
import LineGraph from "react-line-graph";
import { AxisOptions, Chart } from "react-charts";
import { useMemo } from "react";

const StatBox = styled.div`
  height: 300px;
  width: 100%;
  color: #fff;
`;
const Padding = styled.div`
  padding: 25px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  width: 100%;
`;

export default function Stat({ userData }) {
  const theData = useMemo(
    () => [
      {
        label: "Series 1",
        data: getStatData(),
      },
    ],
    [userData]
  );

  const axes = useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  return (
    <Padding>
      <StatBox>
        <Chart data={theData} axes={axes} />
      </StatBox>
    </Padding>
  );

  function getStatData() {
    let data = [];

    if (!userData) return data;

    let today = new Date();
    let thisMonth = today.getMonth();

    for (let key in userData.dailyUsageStat) {
      let item = userData.dailyUsageStat[key];
      let date = new Date(key);
      if (thisMonth !== date.getMonth()) continue;

      let item1 = parseInt(item);
      let item2 = item1.toFixed(2);
      // data.push({ x: date.getDate(), y: item2 });
      // data.push({ x: Math.random() * 30, y: Math.random() * 30 });
      // data.push({ x: Math.random() * 30, y: Math.random() * 30 });
      // data.push({ x: Math.random() * 30, y: Math.random() * 30 });
      data.push([date.getDate(), item2]);
      // data.push([Math.random() * 30, Math.random() * 30]);
      console.log(item1);
    }

    return data;
  }
}
