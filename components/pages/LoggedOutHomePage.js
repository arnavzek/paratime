import Base from "../Base";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import goToAuthScreen from "../../controllers/frontend/goToAuthScreen";
import { HiMenuAlt4 } from "react-icons/hi";
import { GrGoogle } from "react-icons/gr";
import { useContext } from "react";
import Context from "../../Context";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: #fff;
  background-color: #111;
  padding: 50px;

  @media (max-width: 950px) {
    padding: 25px;
  }
`;

const BrandContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  height: 55px;
  width: 55px;
  /* width: 159px; */
  margin-bottom: 38px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("/home/logo.svg");
`;

const MainButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  height: 60px;
  border: none;

  width: 100%;

  @media (min-width: 950px) {
    width: auto;
  }
`;

const Button = styled.button`
  width: auto;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  color: #111;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 172px;
  border: 1px solid;
  gap: 25px;
  background-color: #111;
  transition: 0.25s ease-in-out;
  color: #fff;
  :hover {
    transform: scale(0.9);
  }

  @media (min-width: 950px) {
    width: 300px;
  }
`;

const IntroImage = styled.div`
  background-repeat: no-repeat;
  background-image: url(/home/flowers.svg);
  height: 300px;
  width: 300px;
  position: absolute;
  right: 0;
  bottom: 0;
  @media (min-width: 950px) {
    height: 300px;
  }

  @media (max-width: 950px) {
    display: none;
  }
`;

const IntroImage2 = styled(IntroImage)`
  right: 300px;
  opacity: 0.7;
  transform: scale(0.8);
  bottom: -100px;
`;

const H1 = styled.h1`
  font-weight: 900;
  margin-top: 0;
  font-size: 71px;
  width: 90vw;
  margin-bottom: 15px;
  @media (min-width: 920px) {
    font-size: 30px;
  }
`;
const Medium = styled.div`
  width: 90vw;
  font-size: 15px;
  opacity: 0.8;
`;

const Words = styled.div`
  margin-top: 0;
  display: flex;
  margin-top: 20vh;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

export default function LoggedOutHomePage() {
  let { setForm } = useContext(Context);

  let date = new Date();

  // return (
  //   <>
  //     {date.getDate()} / {date.getMonth() + 1} / {date.getFullYear()}
  //   </>
  // );

  return (
    <Container>
      <IntroImage />
      <IntroImage2 />
      <Words>
        <BrandContainer />
        <H1>Paratime</H1>
        <Medium>
          Studying is fun when you can see your friends studying with you
        </Medium>
      </Words>

      <MainButtons>
        <Button onClick={goToAuthScreen}>
          <GrGoogle />
          Login With Google
        </Button>
        <Button
          onClick={openMoreMenu}
          style={{
            width: "60px",
            height: "60px",
            fontSize: "21px",
            opacity: 0.7,
            backgroundColor: "#fff",
            flex: "unset",
            color: "#111",
          }}
        >
          <HiMenuAlt4 />
        </Button>
      </MainButtons>
    </Container>
  );

  function open(link) {
    return () => {
      return (window.location = link);
    };
  }

  function openMoreMenu() {
    setForm({
      options: [
        {
          name: "About us",
          onClick: open("https://arnav.upon.one"),
        },
      ],
    });
  }
}
