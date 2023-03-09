import styled from "styled-components";
import getImageURL from "../controllers/frontend/getImageURL";
import Link from "next/link";

const Container = styled.div`
  width: calc(100vw - 40px);
  height: auto;
  border-radius: 5px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;

  @media (min-width: 800px) {
    width: auto;
  }

  :hover {
    overflow: visible;
  }
`;

const Images = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;

  @media (min-width: 800px) {
    width: auto;
  }
`;

const Rank = styled.div`
  font-size: 10px;
`;
const TheImage = styled.img`
  height: calc((100vw - 40px) / 4);
  width: calc((100vw - 40px) / 4);
  filter: grayscale(1) blur(1px);
  object-fit: cover;
  transition: 0.25s ease-in-out;
  z-index: 55;
  @media (min-width: 800px) {
    height: calc((80vw - 20vw - 30px) / 4);
    width: calc((80vw - 20vw - 30px) / 4);
  }

  :hover {
    z-index: 100;
    transform: scale(2);
  }
`;
const BottomLabel = styled.div`
  backdrop-filter: blur(20px);

  padding: 10px;
  width: 100%;
  flex: 1;
  border-radius: 5px 5px 0 0;
  justify-content: space-between;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 5px;
`;

const First = styled.h3`
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin: 0;
  /* font-size: 15px; */
`;

const SecondLine = styled.span`
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin: 0;
  font-size: 15px;

  @media (min-width: 800px) {
    width: auto;
  }
`;
const Name = styled.div``;
const Duration = styled.div``;
const Small = styled.div`
  /* font-size: 10px; */
`;

export default function UserBox({ item }) {
  let images = [];

  let theImages = [...item.sessionImages];
  theImages = theImages.reverse();

  theImages.map((imageItem, index) => {
    if (index < 4) {
      images.push(<TheImage src={getImageURL(imageItem)} />);
    }
  });

  return (
    <Link href={"/profile/" + item.username}>
      <Container>
        <Images>{images}</Images>
        <BottomLabel>
          <First>
            <Name>{item.name}</Name>
          </First>
          <SecondLine>
            <Small>Today: {Math.floor(item.todaysDuration / 2)} Mins</Small>
            <Small>Rank {item.rank}</Small>
            <Small>{item.status}</Small>
          </SecondLine>
        </BottomLabel>
      </Container>
    </Link>
  );
}
