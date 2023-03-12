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
import RankingSection from "./RankingSection";
import PostsSection from "./PostsSection";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Container = styled.div``;
const Title = styled.h2`
  padding: 0;
  margin: 0;
  margin-bottom: 10px;
`;
const SubTitle = styled.div`
  opacity: 0.5;
  margin-bottom: 25px;
`;
const List = styled.div``;
const Image = styled.img``;
// import ImageCapture from "image-capture";
export default function CapturedImages({ imageBlobs }) {
  let newImageBlobs = [...imageBlobs];
  newImageBlobs = newImageBlobs.reverse().slice(0, 12);
  return (
    <Container>
      <Title>Captures Images</Title>
      <SubTitle>
        These images will be posted when the session ends after your approval
      </SubTitle>
      <List>
        <Masonry columnsCount={4} gutter="10px">
          {newImageBlobs.map((item, i) => {
            return (
              <Image
                key={i}
                src={URL.createObjectURL(item)}
                style={{ width: "100%", display: "block" }}
              />
            );
          })}
        </Masonry>
      </List>
    </Container>
  );
}
