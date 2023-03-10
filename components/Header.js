import Link from "next/link";
import { useContext } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Context from "../Context";
import { serverLine } from "../controllers/frontend/serverLine";
import Brand from "./Brand";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineBell } from "react-icons/hi";

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
const Links = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const LinkItem = styled.div`
  cursor: pointer;
  position: relative;
`;

const NotifIndication = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 50px;
  background-color: tomato;
  position: absolute;
  width: 100%;
  bottom: -8px;
`;

export default function Header() {
  const { loggedInUser, loggedInUserID } = useContext(Context);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    serverLine.get("notifications/?type=count").then(setNotificationCount);
  }, []);

  useEffect(() => {
    if (
      loggedInUserID == false &&
      window.location.pathname.indexOf("session") != -1
    ) {
      window.location.href = window.location.origin;
    }
  }, [loggedInUserID]);

  if (!loggedInUser) return null;

  return (
    <Container>
      <Link href="/">
        <Brading>
          <TheBrand />
          <BrandingText>Paratime</BrandingText>
        </Brading>
      </Link>
      <Links>
        <Link href="/search">
          <LinkItem>
            <FiSearch />
          </LinkItem>
        </Link>

        <Link href="/notifications">
          <LinkItem>
            <HiOutlineBell />

            {notificationCount ? <NotifIndication /> : null}
          </LinkItem>
        </Link>

        <Link href={"/profile/" + loggedInUser.username}>
          <LinkItem>
            <AiOutlineUser />
          </LinkItem>
        </Link>

        <Link href="/settings">
          <LinkItem>
            <FiSettings />
          </LinkItem>
        </Link>
      </Links>
    </Container>
  );
}
