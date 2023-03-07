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
  padding: 25px;

  @media (min-width: 800px) {
    padding: 50px;
  }
`;

const BrandContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const Tagline = styled.div`
  font-weight: 300;
  font-size: 33px;
  background: linear-gradient(to bottom, #fff, #fff, #000);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;

  @media (min-width: 800px) {
    font-size: 96px;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  height: 40px;
  width: 40px;
  /* width: 159px; */
  margin: 0;
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
  cursor: pointer;
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
  font-size: 32px;
  width: auto;
  margin: 0;
  @media (min-width: 920px) {
    font-size: 30px;
  }
`;
const Medium = styled.div`
  width: 90vw;
  font-size: 15px;
  opacity: 0.8;
  font-weight: 200;

  @media (min-width: 800px) {
    width: 60vw;
    font-size: 20px;
  }
`;

const Words = styled.div`
  margin-top: 0;
  display: flex;
  margin-top: 0;
  gap: 100px;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  align-items: center;

  @media (min-width: 800px) {
    gap: 150px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 19px;
`;

const DecorationCircle = styled.div`
  width: 100vw;
  height: 100vw;
  position: fixed;
  border: 1px solid #fff;
  left: 0;
  top: calc(50vh - 50vw);
  border-radius: 5000px;
  opacity: 0.2;
  pointer-events: none;

  @media (max-width: 800px) {
    display: none;
  }
`;

const DecorationCircle2 = styled(DecorationCircle)`
  transform: scale(0.9);
  opacity: 0.5;
`;

const DecorationCircle3 = styled(DecorationCircle)`
  transform: scale(0.8);
  opacity: 1;
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
      {/* <IntroImage /> */}
      {/* <IntroImage2 /> */}

      <DecorationCircle />
      <DecorationCircle2 />
      <DecorationCircle3 />
      <Words>
        <BrandContainer>
          <Brand />
          <H1>Paratime</H1>
        </BrandContainer>

        <TextContainer>
          <Tagline>Virtual Study Room</Tagline>

          <Medium>
            When you are in a study room everyone can see what you are doing so
            you just can’t procrastinate, Paratime emulates the same by taking
            screenshot of your screen and photo from your webcam every 30
            seconds and everyone can see it and you can see what other are
            doing. Don’t worry about privacy we blur the image just enough to
            distinguish work from fun while respecting privacy, so your emails
            won’t be leaked.
          </Medium>
        </TextContainer>
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
            flex: "unset",
            opacity: 0.7,
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
