import Link from "next/link";
import { useContext } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Context from "../Context";
import { serverLine } from "../controllers/frontend/serverLine";
import Brand from "./Brand";

import LoadingSection from "./LoadingSection";
import BarChart from "react-svg-bar-chart";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import Header from "./Header";
import logout from "../controllers/frontend/logout";
import WithHeader from "./WithHeader";

const Container = styled.div`
  @media (min-width: 800px) {
    width: 62vw;
    border-left: 1px solid #999;
    border-right: 1px solid #999;
    overflow-y: scroll;
    height: 100vh;
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
const BoxTitle = styled.h3``;
const BoxList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
`;

const MonthlyRankingItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Button = styled.div``;

export default function Settings() {
  return (
    <WithHeader>
      <Box>
        <Button onClick={logout}>Logout</Button>
      </Box>
    </WithHeader>
  );
}
