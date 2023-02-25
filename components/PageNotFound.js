import Base from "./Base";
import Link from "next/link";
import { useRouter } from "next/router";
import getUserID from "../controllers/frontend/getUserID";
import styled from "styled-components";
import Brand from "./Brand";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 100px;
  margin-top: 25px;
`;
const BrandContainer = styled.div``;
const Main = styled.div`
  font-size: 150px;
  font-weight: 900;
`;
const Main2 = styled.div`
  font-size: 23px;
  font-weight: 100;
`;
const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Secondary = styled.div`
  margin-top: 25px;
`;
const HomeButton = styled.div`
  text-decoration: underline;
  cursor: pointer;
`;

export default function PageNotFound() {
  return (
    <Base>
      <Container>
        <BrandContainer>
          <Brand />
        </BrandContainer>

        <Message>
          <Main>404</Main>
        </Message>

        <HomeButton onClick={getHomeLink}>Home</HomeButton>
      </Container>
    </Base>
  );
}

function getHomeLink() {
  window.location.href = window.location.origin;
}
