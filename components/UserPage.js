import { useContext } from "react";
import styled from "styled-components";
import Context from "../Context";
import getImageURL from "../controllers/frontend/getImageURL";
import FollowButton from "./FollowButton";
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
  flex-direction: row;
  gap: 25px;
`;
const Detail = styled.div``;
const StatSection = styled.div``;
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
  width: calc((100vw) / 3);
  @media (min-width: 800px) {
    width: calc((80vw - 40px) / 3);
  }
`;

export default function UserPage({ user, followStatus }) {
  return (
    <Container>
      <Details>
        <Name>{user.name}</Name>
        <SmallDetails>
          <Detail>@{user.username}</Detail>
          <Detail>{user.tag}</Detail>
          <Detail>Today's Duration {user.todaysDuration}</Detail>
          <Detail> Month's Duration {user.monthsDuration}</Detail>
        </SmallDetails>
        <FollowButton initialStatus={followStatus} receiverUserID={user._id} />
      </Details>

      <StatSection>
        <Stat userData={user} />
      </StatSection>

      <Photos>{renderPhotos()}</Photos>
    </Container>
  );

  function renderPhotos() {
    let theImages = [...user.sessionImages];
    theImages = theImages.reverse();

    theImages = theImages.slice(0, 50);
    return theImages.map((imageItem) => {
      return <Photo src={getImageURL(imageItem)} />;
    });
  }
}
