import { useContext } from "react";
import styled from "styled-components";
import Context from "../Context";
import getImageURL from "../controllers/frontend/getImageURL";
import getMonthsDuration from "../controllers/frontend/getMonthsDuration";
import getTodaysDuration from "../controllers/frontend/getTodaysDuration";
import getWeeksDuration from "../controllers/frontend/getWeeksDuration";
import toMinsOrHours from "../controllers/frontend/toMinOrHours";
import FollowButton from "./FollowButton";
import PostBox from "./PostBox";
import Stat from "./Stat";

const Container = styled.div`
  flex-direction: column;
  display: flex;
  gap: 80px;
  align-items: center;
  text-align: center;

  @media (min-width: 800px) {
    width: 80vw;
  }
`;
const Details = styled.div`
  flex-direction: column;
  display: flex;
  gap: 25px;
  margin-top: 50px;
  align-items: center;
  text-align: center;
`;

const Name = styled.h1`
  margin: 0;
  padding: 0;
`;
const SmallDetails = styled.div`
  display: flex;

  gap: 25px;

  flex-direction: column;

  @media (min-width: 800px) {
    flex-direction: row;
  }
`;
const Detail = styled.div``;
const StatSection = styled.div`
  width: 100%;
`;
const Photos = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  @media (min-width: 800px) {
    gap: 20px;
  }
`;
const Photo = styled.img`
  object-fit: cover;
  width: calc((100vw - 50px) / 2);
  height: calc((100vw - 50px) / 2);
  @media (min-width: 800px) {
    width: calc((80vw - 40px) / 3);
    height: calc((80vw - 40px) / 3);
  }
`;

const Posts = styled.div``;
const Post = styled.div``;
const PostTitle = styled.div``;
const PostContent = styled.div``;

export default function PostPage({ postData }) {
  return <PostBox item={postData} />;
}
