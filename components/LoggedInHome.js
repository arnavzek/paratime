import Link from "next/link";
import { useContext } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Context from "../Context";
import { serverLine } from "../controllers/frontend/serverLine";
import Brand from "./Brand";
import HomeUserBox from "./HomeUserBox";
import LoadingSection from "./LoadingSection";
import BarChart from "react-svg-bar-chart";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import Header from "./Header";
import WithHeader from "./WithHeader";
import LineGraph from "react-line-graph";
import { AxisOptions, Chart } from "react-charts";
import { useMemo } from "react";
import Stat from "./Stat";
import RankingSection from "./RankingSection";

const Container = styled.div`
  overflow-y: scroll;
  height: 100vh;

  @media (min-width: 800px) {
  }
`;

const Main = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;

  align-items: center;

  gap: 50px;
`;

const Box = styled.div`
  width: 100%;
`;

const Padding = styled.div`
  padding: 25px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  width: 100%;
`;

const BoxTitle = styled.h3`
  font-weight: 300;
`;
const BoxList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;

  @media (min-width: 800px) {
    justify-content: flex-start;
    gap: 50px;
  }
`;

const StartButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 0;
  margin-top: 30px;
  cursor: pointer;
  height: 100px;
  font-size: 30px;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding: 0 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  position: relative;

  :after {
    content: "";
    position: absolute;
    top: 5%;
    left: 3%;
    height: 90%;
    border-radius: 10px;
    width: 94%;
    background-color: rgba(255, 255, 255, 0.1);
  }

  :before {
    content: "";
    position: absolute;
    top: 10%;
    left: 7.5%;
    height: 80%;
    border-radius: 10px;
    width: 85%;
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (min-width: 800px) {
    width: 38vw;
  }
`;

const MonthlyRankingItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media (min-width: 800px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default function LoggedInHome() {
  const [homeData, setHomeData] = useState(null);
  const { loggedInUserID } = useContext(Context);

  const fakeData = useMemo(
    () => [
      {
        label: "Series 1",
        data: getStatData(),
      },
    ],
    [homeData]
  );

  const axes = useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );
  useEffect(() => {
    serverLine.get("home").then(setHomeData);
  }, []);

  if (!homeData) return <LoadingSection />;

  const data = getStatData();

  const props = {
    data,
    smoothing: 0.3,
    gridX: true,
    gridY: true,
    accent: "steelblue",
    debug: true,
    fillBelow: "rgba(255,255,255,0.1)",
    hover: true,
  };

  return (
    <WithHeader>
      <Box>
        <BoxTitle>Start New Session</BoxTitle>
        <BoxList>
          <SessionBox name={30} />
          <SessionBox name={60} />
          <SessionBox name={120} />
        </BoxList>
      </Box>

      <Box>
        <BoxTitle>Stat</BoxTitle>

        {/* <Chart data={fakeData} axes={axes} /> */}
        {homeData ? <Stat userData={homeData.me} /> : null}
        {/* <LineGraph {...props} /> */}
        {/* <BarChart data={getStatData()} /> */}

        {/* <BarChart data={getStatData()} /> */}
      </Box>

      <Box>
        <RankingSection
          following={homeData.followingUsers}
          worldWide={homeData.worldWideUsers}
          me={homeData.me}
        />
      </Box>
    </WithHeader>
  );

  function getStatData() {
    let data = [];

    if (!homeData) return data;

    let today = new Date();
    let thisMonth = today.getMonth();

    for (let key in homeData.me.dailyUsageStat) {
      let item = homeData.me.dailyUsageStat[key];
      for (let key2 in item) {
        let date = new Date(key2);
        if (thisMonth !== date.getMonth()) continue;

        let item1 = item[key2] / 2;
        let item2 = item1.toFixed(2);
        // data.push({ x: date.getDate(), y: item2 });
        // data.push({ x: Math.random() * 30, y: Math.random() * 30 });
        // data.push({ x: Math.random() * 30, y: Math.random() * 30 });
        // data.push({ x: Math.random() * 30, y: Math.random() * 30 });
        data.push([date.getDate(), item2]);
        // data.push([Math.random() * 30, Math.random() * 30]);
        console.log(item1);
      }
    }

    console.log(data, homeData);

    return data;
  }

  function renderUsers() {
    let users = [];

    if (!homeData) return users;

    if (!homeData.monthlyRanking) return users;

    homeData.monthlyRanking.map((item, index) => {
      if (index < 10) {
        if (item._id !== loggedInUserID)
          users.push(<HomeUserBox item={{ ...item, rank: index + 1 }} />);
      }
    });

    return users;
  }

  function getYou() {
    if (!homeData) return null;

    return {
      ...homeData.me,
      rank: getYouRank(),
      name: "You",
    };
  }

  function getYouRank() {
    let rank = "NA";

    homeData.monthlyRanking.map((item, index) => {
      if (item._id == loggedInUserID) rank = index;
    });

    if (rank !== "NA") rank += 1;

    return rank;
  }
}

const SessionBoxContainer = styled.div`
  width: auto;
  /* height: calc(90vw / 3); */

  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding: 15px 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  cursor: pointer;
  @media (min-width: 800px) {
    flex: unset;
    width: auto;
    flex-direction: row;
    padding: 15px 25px;
    gap: 20px;
  }
`;

const SessionIcon = styled.img`
  height: 52px;
  width: 52px;

  @media (min-width: 800px) {
    width: 25px;
    height: 25px;
  }
`;
const SessionText = styled.div`
  font-size: 18px;

  @media (min-width: 800px) {
    font-size: 22px;
  }
`;

function SessionBox({ name }) {
  return (
    <Link href={"/session/?duration=" + name}>
      <SessionBoxContainer>
        {/* <SessionIcon src={`/session-images/${name.toLowerCase()}.png`} /> */}
        <SessionText>{name} Mins</SessionText>
      </SessionBoxContainer>
    </Link>
  );
}
