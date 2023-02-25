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
  gap: 10px;
  position: relative;
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

export default function HomeUserBox({ item }) {
  return (
    <Container>
      {item.sessionImages[0] ? (
        <TheImage src={getImageURL(item.sessionImages[0])} />
      ) : null}

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
