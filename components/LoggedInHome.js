import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";
import { serverLine } from "../controllers/frontend/serverLine";
import Brand from "./Brand";
import LoadingSection from "./LoadingSection";

const Container = styled.div``;
const Header = styled.div`
  padding: 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 15px 15px;
  background-color: rgba(255, 255, 255, 0.1);
`;
const Main = styled.div`
  padding: 20px;
`;
const Brading = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const BrandingText = styled.h3`
  margin: 0;
`;

const TheBrand = styled(Brand)`
  height: 25px;
  width: 25px;
  margin: 0;
`;
const Links = styled.div``;
const Box = styled.div``;
const BoxTitle = styled.h1``;
const BoxList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
`;

const StartButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 80px 0;
  margin-top: 60px;
  height: 100px;
  font-size: 30px;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding: 0 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 500px;
  position: relative;

  :after {
    content: "";
    position: absolute;
    top: 5%;
    left: 3%;
    height: 90%;
    border-radius: 500px;
    width: 94%;
    background-color: rgba(255, 255, 255, 0.1);
  }

  :before {
    content: "";
    position: absolute;
    top: 10%;
    left: 7.5%;
    height: 80%;
    border-radius: 500px;
    width: 85%;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export default function LoggedInHome() {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    serverLine.get("home").then(setHomeData);
  }, []);

  if (!homeData) return <LoadingSection />;

  return (
    <Container>
      <Header>
        <Brading>
          <TheBrand />
          <BrandingText>Paratime</BrandingText>
        </Brading>
        <Links></Links>
      </Header>

      <Main>
        <Link href={"/session"}>
          <StartButton>Start</StartButton>
        </Link>
        <Box>
          <BoxTitle>Stat</BoxTitle>
        </Box>
        <Box>
          <BoxTitle>Montly Ranking</BoxTitle>
        </Box>
      </Main>
    </Container>
  );
}

const SessionBoxContainer = styled.div`
  width: calc((100vw - 60px) / 2);
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 15px 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
`;

const SessionIcon = styled.img`
  height: 52px;
  width: 52px;
`;
const SessionText = styled.div`
  font-size: 18px;
`;

// function SessionBox({ name }) {
//   return (
//     <Link href={"/session/?type=" + name.toLowerCase()}>
//       <SessionBoxContainer>
//         <SessionIcon src={`/session-images/${name.toLowerCase()}.png`} />
//         <SessionText>{name}</SessionText>
//       </SessionBoxContainer>
//     </Link>
//   );
// }

/*
        <Box>
          <BoxTitle>Select Session Type</BoxTitle>
          <BoxList>
            <SessionBox name={"Study"} />
            <SessionBox name={"Programming"} />
            <SessionBox name={"Art"} />
            <SessionBox name={"Exercise"} />
          </BoxList>
        </Box>

*/
