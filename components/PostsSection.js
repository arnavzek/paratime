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
import PostBox from "./PostBox";

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

const Title = styled.h3``;

export default function PostsSection({ posts }) {
  return (
    <Container>
      <Title>Feeds</Title>
      <Main>{doRender()}</Main>
    </Container>
  );

  function doRender() {
    let content = [];

    posts.map((item) => {
      content.push(<PostBox key={item._id} item={item} />);
    });

    return content;
  }
}
