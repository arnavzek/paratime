import Link from "next/link";
import { useContext } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";

const Container = styled.div`
  overflow-y: scroll;
  width: 100vw;
  height: 100vh;
  @media (min-width: 800px) {
    /* width: 62vw;
    border-left: 1px solid #999;
    border-right: 1px solid #999;
    overflow-y: scroll;
    height: 100vh; */
  }
`;

const Main = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;

  @media (min-width: 800px) {
    padding: 20px 10vw;
  }
`;

export default function WithHeader({ children }) {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
    </Container>
  );
}
