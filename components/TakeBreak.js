import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Brand from "./Brand";

const Container = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  flex-direction: column;
`;
const Message = styled.h3``;
const Heading = styled.h1``;
const List = styled.div`
  display: grid;
  flex-direction: row;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;
const Button = styled.button`
  background-color: #222;
  color: #fff;
  border: none;
  padding: 15px 25px;
  border-radius: 5px;
`;

export default function TakeBreak() {
  const [timer, setTimer] = useState(0);
  const [timerStatus, setTimerStatus] = useState(false);

  if (typeof window !== "undefined") {
    window.breakTimer = timer;
    window.timerStatus = timerStatus;
  }

  useEffect(() => {
    if (window.breakInterval) window.clearInterval(window.breakInterval);

    window.breakInterval = setInterval(() => {
      if (window.timerStatus) {
        setTimer(window.breakTimer - 1);
      }
    }, 1000);
  }, []);

  if (timerStatus == true && timer <= 0) {
    return (
      <Container>
        <Brand />

        <Message>Break Complete</Message>

        <Link href="/">
          <Button>Go To Home</Button>
        </Link>
      </Container>
    );
  }

  if (timerStatus == true) {
    return (
      <Container>
        <Brand />
        <Message>
          Break Time left {Math.floor(timer / 60)}:{timer % 60}
        </Message>
      </Container>
    );
  }

  return (
    <Container>
      <Brand />
      <Heading>Take a break</Heading>
      <List>
        <Button onClick={startTimer(5)}>5 Min</Button>
        <Button onClick={startTimer(15)}>15 Min</Button>
        <Button onClick={startTimer(30)}>30 Min</Button>
        <Button onClick={startTimer(60)}>60 Min</Button>
      </List>
    </Container>
  );

  function startTimer(theVal) {
    return () => {
      setTimerStatus(true);
      setTimer(theVal * 60);
    };
  }
}
