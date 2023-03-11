import styled from "styled-components";
import UserBox from "./UserBox";
import { FiPlay } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlinePause } from "react-icons/ai";
import { BsStopFill } from "react-icons/bs";
import { serverLine } from "../controllers/frontend/serverLine";
import selectFileAndCheck from "../controllers/frontend/selectFileAndCheck";
import compressAndUploadFile from "../controllers/frontend/compressAndUploadFile";
import Context from "../Context";
import TakeBreak from "./TakeBreak";
import LoadingSection from "./LoadingSection";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Link from "next/link";
import initImageCapture from "../controllers/initImageCapture";
import getImageURL from "../controllers/frontend/getImageURL";
import initScreenshotCapture from "../controllers/initScreenshotCapture";
import UserBoxSmall from "./UserBoxSmall";

// import ImageCapture from "image-capture";

const Button = styled.button`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  color: #fff;
  width: calc(45vw - 15px);
  padding: 0 15px;
  border-radius: 5px;
  overflow: hidden;
  height: 35px;
  border: none;
  align-items: center;
  font-size: 15px;
  background-color: #111;

  @media (min-width: 800px) {
    width: 100%;
  }
`;

const Container = styled.div`
  margin-top: 50px;

  @media (min-width: 800px) {
    margin: 0;
    /* width: auto; */

    display: flex;
    /* flex: 1; */
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Tags = styled.div`
  display: grid;
  gap: 2px;
  background-color: #222;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 50px;
  grid-template-columns: 1fr 1fr;
`;

const Tag = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;
  text-transform: capitalize;
  height: 35px;
  padding: 0 25px;
  border-radius: 0;
  ${({ highlight }) => {
    if (highlight)
      return `
      background-color:#fff;
      color:#111;
    `;
  }}
`;

const Title = styled.h2`
  padding: 0;
  margin: 0;
  margin-bottom: 10px;
`;
const SubTitle = styled.div`
  opacity: 0.5;
  margin-bottom: 25px;
`;
const Main = styled.div`
  display: flex;
  gap: 25px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default function RankingSectionSmall({ followingUsers, me }) {
  const { loggedInUserID } = useContext(Context);

  return (
    <Container>
      <Title>Ranking</Title>
      <SubTitle>Your rank for this month, among the people you follow</SubTitle>
      <Main>
        <UserBoxSmall item={getYou()} />
        {renderUsers()}
      </Main>
    </Container>
  );

  function renderUsers() {
    let users = [];

    if (!followingUsers) return [];

    let list = followingUsers;

    list.map((item, index) => {
      if (item._id !== loggedInUserID)
        users.push(
          <UserBoxSmall key={item._id} item={{ ...item, rank: index + 1 }} />
        );
    });

    return users;
  }

  function getYou() {
    if (!me) return null;

    return {
      ...me,
      rank: getYouRank(),
      name: "You",
    };
  }

  function getYouRank() {
    let rank = "NA";

    let list = followingUsers;

    list.map((item, index) => {
      if (item._id == loggedInUserID) rank = index;
    });

    if (rank !== "NA") rank += 1;

    return rank;
  }
}
