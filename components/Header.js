import Link from "next/link";
import { useContext } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Context from "../Context";
import { serverLine } from "../controllers/frontend/serverLine";
import Brand from "./Brand";
import HomeUserBox from "./HomeUserBox";
import LoadingSection from "./LoadingSection";
import BarChart from "react-svg-bar-chart";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";

const Container = styled.div`
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  align-items: center;
  border-radius: 0;
  background-color: transparent;
  border-bottom: 1px solid #555;

  @media (min-width: 800px) {
    padding: 20px 10vw;
  }
`;

const Brading = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
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

const LinkItem = styled.div`
  cursor: pointer;
`;

export default function Header() {
  return (
    <Container>
      <Link href="/">
        <Brading>
          <TheBrand />
          <BrandingText>Paratime</BrandingText>
        </Brading>
      </Link>
      <Links>
        <Link href="/settings">
          <LinkItem>
            <FiSettings />
          </LinkItem>
        </Link>
      </Links>
    </Container>
  );
}
