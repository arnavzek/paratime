import styled from "styled-components";
import getImageURL from "../controllers/frontend/getImageURL";

const Container = styled.div`
  width: calc(100vw - 40px);
  height: auto;
  border-radius: 5px;
  overflow: hidden;
  /* width: 100%; */
  /* flex: 1; */
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: row;
  height: 76px;
  padding-right: 10px;
  gap: 10px;
  position: relative;

  @media (min-width: 800px) {
    width: auto;
  }
`;

const Images = styled.div`
  border-radius: 5px;
  overflow: hidden;
  width: 100%;

  display: flex;
  flex-direction: row;

  position: relative;
`;

const Rank = styled.div`
  font-size: 10px;
`;
const TheImage = styled.img`
  height: 76px;
  width: 76px;
  filter: grayscale(1);
  object-fit: cover;
`;
const BottomLabel = styled.div`
  backdrop-filter: blur(2px);

  padding: 10px;
  flex: 1;
  border-radius: 5px 5px 0 0;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const First = styled.h3`
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin: 0;
  font-size: 15px;
`;

const SecondLine = styled.span`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 0;
  opacity: 0.7;
  font-size: 10px;
`;
const Name = styled.div``;
const Duration = styled.div``;
const Status = styled.div`
  font-size: 10px;
`;

export default function HomeUserBox({ item }) {
  return (
    <Container>
      {getTheImage()}
      <BottomLabel>
        <First>
          <Name>{item.name}</Name>
        </First>

        <SecondLine>
          <Duration>
            This Month: {Math.floor(item.monthsDuration / 2)} Mins
          </Duration>
          <Duration>Today: {Math.floor(item.todaysDuration / 2)} Mins</Duration>
          <Duration>Rank {item.rank}</Duration>
        </SecondLine>

        <Status>{item.status}</Status>
      </BottomLabel>
    </Container>
  );

  function getTheImage() {
    if (!item.sessionImages.length) return null;
    let latestImage = item.sessionImages[item.sessionImages.length - 1];

    return <TheImage src={getImageURL(latestImage)} />;
  }
}

import styled from "styled-components";

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

// import ImageCapture from "image-capture";

const Main = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  gap: 20px;
`;

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

let tags = ["following", "World Wide"];

function RankingSection({ following, worldWide, me }) {
  const { loggedInUserID } = useContext(Context);
  const [selectedTag, setTag] = useState("following");

  return (
    <Container>
      <Tags>{renderTags()}</Tags>
      <Main>
        <UserBox item={getYou()} />
        {renderUsers()}
      </Main>
    </Container>
  );

  function renderTags() {
    return tags.map((item) => (
      <Tag key={item} highlight={selectedTag == item} onClick={selectTag(item)}>
        {item}
      </Tag>
    ));
  }

  function selectTag(item) {
    return () => {
      setTag(item);
    };
  }

  function renderUsers() {
    let users = [];

    let list = [];

    if (selectedTag == "following") {
      list = following;
    } else {
      list = worldWide;
    }

    list.map((item, index) => {
      if (item._id !== loggedInUserID)
        users.push(
          <UserBox key={item._id} item={{ ...item, rank: index + 1 }} />
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

    let list = [];

    if (selectedTag == "following") {
      list = following;
    } else {
      list = worldWide;
    }

    list.map((item, index) => {
      if (item._id == loggedInUserID) rank = index;
    });

    if (rank !== "NA") rank += 1;

    return rank;
  }
}
