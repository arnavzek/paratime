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
  flex-direction: column;
  gap: 10px;
  position: relative;

  @media (min-width: 800px) {
    width: calc(62vw - 40px);
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
  height: calc((100vw - 40px) / 4);
  width: calc((100vw - 40px) / 4);
  filter: grayscale(1);
  object-fit: cover;

  @media (min-width: 800px) {
    height: calc((62vw - 40px) / 4);
    width: calc((62vw - 40px) / 4);
  }
`;
const BottomLabel = styled.div`
  backdrop-filter: blur(20px);

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
  gap: 5px;
  margin: 0;

  font-size: 10px;
`;
const Name = styled.div``;
const Duration = styled.div``;
const Status = styled.div`
  font-size: 10px;
`;

export default function SessionUserBox({ item }) {
  let images = [];

  let theImages = [...item.sessionImages];
  theImages = theImages.reverse();

  theImages.map((item, index) => {
    if (index < 4) {
      images.push(<TheImage src={getImageURL(item)} />);
    }
  });

  return (
    <Container>
      <Images>{images}</Images>
      <BottomLabel>
        <First>
          <Name>{item.name}</Name>
        </First>
        <SecondLine>
          <Duration>Today: {Math.floor(item.todaysDuration / 2)} Mins</Duration>
          <Rank>Rank {item.rank}</Rank>
        </SecondLine>
        <Status>{item.status}</Status>
      </BottomLabel>
    </Container>
  );
}
