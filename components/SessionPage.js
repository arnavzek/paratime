import styled from "styled-components";
import SessionUserBox from "./SessionUserBox";
import { FiPlay } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlinePause } from "react-icons/ai";
import { BsStopFill } from "react-icons/bs";
import { serverLine } from "../controllers/frontend/serverLine";
import selectFileAndCheck from "../controllers/frontend/selectFileAndCheck";
import compressAndUploadFile from "../controllers/frontend/compressAndUploadFile";
import Context from "../Context";
import TakeBreak from "./TakeBreak";
import LoadingSection from "./LoadingSection";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Link from "next/link";
import initImageCapture from "../controllers/initImageCapture";
import getImageURL from "../controllers/frontend/getImageURL";
// import ImageCapture from "image-capture";

const Container = styled.div`
  @media (min-width: 800px) {
    width: 62vw;
    border-left: 1px solid #999;
    border-right: 1px solid #999;
    overflow-y: scroll;
    height: 100vh;
  }
`;
const Header = styled.div`
  background-color: #222;
  gap: 10px;
  cursor: pointer;
  flex-direction: row;
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  margin: 0;
  text-transform: capitalize;
  padding: 0;
`;

const SubTitle = styled.span`
  margin: 0;
  font-size: 10px;
  text-transform: capitalize;
  padding: 0;
`;
const Main = styled.div`
  padding: 20px;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;

  @media (min-width: 800px) {
    width: 62vw;
  }
`;
const BottomButtons = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  backdrop-filter: blur(50px);
  background-color: #222;
  width: 100vw;
  justify-content: space-between;

  @media (min-width: 800px) {
    width: 62vw;
  }
`;
const LastImage = styled.img`
  height: 76px;
  width: 76px;
  object-fit: cover;
  border-radius: 5px;
`;
const Timer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 52px;
  justify-content: space-between;
  height: 190px;

  @media (min-width: 800px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 45px;
    font-size: 125px;
  }
`;
const Time = styled.h1`
  height: 85px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  height: 190px;
  justify-content: space-between;
  flex-direction: column;
`;
const Button = styled.button`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  color: #fff;
  width: 180px;
  padding: 0 15px;
  border-radius: 5px;
  overflow: hidden;
  height: 35px;
  border: none;
  align-items: center;
  font-size: 15px;
  background-color: #111;
`;

const StartButton = styled(Button)`
  gap: 25px;
`;

const ButtonIcon = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;
const ButtonText = styled.div``;

const TimerButtons = styled.div`
  width: 180px;
  display: flex;
  gap: 15px;
  flex-direction: row;
  justify-content: space-between;
`;

const PauseButton = styled(Button)`
  width: 120px;
  gap: 20px;
`;

const EvenButton = styled(Button)`
  /* width: 50px; */
  padding: 0;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;
//ON, OFF30,
const BackButton = styled.div``;

const SectionHeading = styled.h3`
  text-align: center;
  font-weight: 100;
`;

const pomodoroOptions = [30, 60, 120, "OFF"];

const Message = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function SessionPage() {
  const [sessionStatus, setSessionStatus] = useState("OFF");
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const { loggedInUserID } = useContext(Context);
  const [error, setError] = useState(false);
  const [totalTimer, setTotalTimer] = useState(0);
  const [pomodoroTimer, setPodoroTimer] = useState(30);
  const [timer, setTimer] = useState(0);
  const [webcamImage, setWebcamImage] = useState(null);
  const router = useRouter();

  if (typeof window !== "undefined") {
    window.sessionStatus = sessionStatus;
    window.webcamEnabled = webcamEnabled;
    window.timer = timer;
    window.totalTimer = totalTimer;
    window.pomodoroTimer = pomodoroTimer;
  }

  useEffect(handleVideoPermission, []);

  useEffect(() => {
    if (webcamEnabled) {
      setSessionStatus("ON");
      setTimer(0);
    }
  }, [webcamEnabled]);

  useEffect(() => {
    if (window.featchInterval) window.clearInterval(window.featchInterval);
    if (!window.ImageCapture) initImageCapture();

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then((mediaStream) => {
        window.theMediaSteam = mediaStream;
      })
      .catch(console.log);

    function doIt() {
      fetchSessionData().then((data) => {
        setSessionData(data);
        postAttendance(data);
      });
    }

    doIt();

    window.featchInterval = setInterval(() => {
      if (window.sessionStatus == "ON") {
        doIt();
      }
    }, 30000);
  }, [sessionStatus]);

  useEffect(() => {
    if (window.timerController) {
      window.clearInterval(window.timerController);
    }

    window.timerController = setInterval(() => {
      if (window.sessionStatus == "ON") {
        setTimer(window.timer + 1);

        let mins = window.timer / 60;

        if (typeof window.pomodoroTimer == "number") {
          // console.log(window.pomodoroTimer, mins);
          if (mins > window.pomodoroTimer) {
            pauseSession();
            router.push("/break");
          }
        }

        setTotalTimer(window.totalTimer + 1);
      }
    }, 1000);
  }, []);

  let minAndSecs = getMinAndSeconds();

  if (!loggedInUserID)
    return (
      <Container>
        <Message>Login Required</Message>
      </Container>
    );

  if (error)
    return (
      <Container>
        <Message>{error}</Message>
      </Container>
    );

  if (!webcamEnabled)
    return (
      <Container>
        <Message>Webcam Required</Message>
      </Container>
    );

  if (!sessionData) return <LoadingSection />;

  if (!sessionData.me.continiousDuration) sessionData.me.continiousDuration = 0;

  return (
    <Container>
      <BottomButtons>
        <Buttons>
          <Link href="/">
            <Header>
              {/* <BackButton> */}
              <MdOutlineArrowBackIosNew />
              {/* </BackButton> */}
              <Title>Back</Title>
            </Header>
          </Link>
          {getTimerButtons()}
          <PomodoroButton
            sessionStatus={sessionStatus}
            onClick={updatePodoro}
            value={pomodoroTimer}
          />
        </Buttons>
        <Timer>
          <Time>{minAndSecs.mins}</Time>
          <Time>{minAndSecs.secs}</Time>
        </Timer>
      </BottomButtons>

      <SectionHeading>Ranking</SectionHeading>

      <Main>
        <SessionUserBox item={getYou()} />

        {renderUsers()}
      </Main>
    </Container>
  );

  function getYou() {
    if (!sessionData) return null;

    return {
      ...sessionData.me,
      rank: getYouRank(),
      name: "You",
    };
  }

  function getYouRank() {
    let rank = "NA";

    sessionData.allOnlineUsers.map((item, index) => {
      if (item._id == loggedInUserID) rank = index;
    });

    if (rank !== "NA") rank += 1;

    return rank;
  }

  function handleVideoPermission() {
    if (
      "mediaDevices" in navigator &&
      "getUserMedia" in navigator.mediaDevices
    ) {
      navigator.permissions
        .query({ name: "camera" })
        .then((permissionStatus) => {
          console.log(permissionStatus);
          if (permissionStatus.state == "denied") {
            return setError(
              "Webcam permission has been denied! Please allow webcam permission and refresh"
            );
          } else {
            if (permissionStatus.state == "granted") {
              setWebcamEnabled(true);
              askForWebcam();
            } else {
              askForWebcam();
              permissionStatus.onchange = (e) => {
                if (e.type === "change") {
                  // checking what the new permissionStatus state is
                  const newState = e.target.state;
                  if (newState === "denied") {
                    setError(
                      "Webcam permission is required for work evidence! Please allow it and refresh"
                    );
                  } else if (newState === "granted") {
                    askForWebcam();
                    setWebcamEnabled(true);
                  } else {
                    console.log("Thanks for reverting things back to normal");
                  }
                }
              };
            }
          }
        });
    } else {
      setError("Webcam not supported");
    }
  }

  function updatePodoro() {
    let currentIndex = pomodoroOptions.indexOf(pomodoroTimer);
    currentIndex = currentIndex + 1;
    if (currentIndex > pomodoroOptions.length - 1) currentIndex = 0;

    setPodoroTimer(pomodoroOptions[currentIndex]);
  }

  function askForWebcam() {
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
      },
    });
  }

  function getMinAndSeconds() {
    let mins = Math.floor(timer / 60);
    let secs = timer % 60;

    mins = mins.toString();
    secs = secs.toString();

    if (mins.length == 1) {
      mins = "0" + mins;
    }

    if (secs.length == 1) {
      secs = "0" + secs;
    }

    return { mins, secs };
  }

  async function fetchSessionData() {
    if (!loggedInUserID) return;
    let sessData = await serverLine.get(`session`);

    return sessData;
  }

  async function postAttendance(newSessionData) {
    if (!loggedInUserID) return;
    if (!window.theMediaSteam) return;

    let videoDevice = theMediaSteam.getVideoTracks()[0];
    let captureDevice = new ImageCapture(videoDevice);

    if (captureDevice) {
      console.log("Taking a photo");
      captureDevice
        .takePhoto()
        .then(async (blob) => {
          setWebcamImage(window.URL.createObjectURL(blob));
          console.log(blob);
          console.log(window.URL.createObjectURL(blob));

          try {
            blob.name = "webcam.jpeg";
            let imageUploaded = await compressAndUploadFile(
              newSessionData.imageToRemove,
              blob
            );

            console.log(imageUploaded, getImageURL(imageUploaded.fileName));
            serverLine.post("/attendance", {
              newImage: imageUploaded.fileName,
              imageToRemove: newSessionData.imageToRemove,
            });
          } catch (e) {
            return console.log(e);
          }
        })
        .catch(console.log);
    }
  }

  function startSession() {
    setSessionStatus("ON");
  }

  function pauseSession() {
    setSessionStatus("OFF");
  }

  function resetSession() {
    setSessionStatus("OFF");
    setTimer(0);
  }

  function renderUsers() {
    let users = [];

    if (!sessionData) return users;

    if (!sessionData.allOnlineUsers) return users;

    sessionData.allOnlineUsers.map((item, index) => {
      if (item._id !== loggedInUserID)
        users.push(<SessionUserBox item={{ ...item, rank: index + 1 }} />);
    });

    return users;
  }

  function getTimerButtons() {
    if (sessionStatus == "OFF" && timer > 0)
      return (
        <>
          <EvenButton onClick={startSession}>
            <ButtonIcon>
              <FiPlay />
            </ButtonIcon>
            <ButtonText>Play</ButtonText>
          </EvenButton>
          <EvenButton onClick={resetSession}>
            <ButtonIcon>
              <BsStopFill />
            </ButtonIcon>
            <ButtonText>Stop</ButtonText>
          </EvenButton>
        </>
      );

    if (sessionStatus == "OFF")
      return (
        <StartButton onClick={startSession}>
          <ButtonIcon>
            <FiPlay />
          </ButtonIcon>
          <ButtonText>Start Session</ButtonText>
        </StartButton>
      );

    return (
      <>
        <EvenButton onClick={pauseSession}>
          <ButtonIcon>
            <AiOutlinePause />
          </ButtonIcon>
          <ButtonText>Pause</ButtonText>
        </EvenButton>
        <EvenButton onClick={resetSession}>
          <ButtonIcon>
            <BsStopFill />
          </ButtonIcon>
          <ButtonText>Stop</ButtonText>
        </EvenButton>
      </>
    );
  }
}

const PomoButtonContainer = styled(Button)`
  padding-right: 0;
  justify-content: space-between;

  ${({ sessionStatus }) => {
    if (sessionStatus == "ON") {
      return `
        opacity: 0.5;
        pointer-events:none;
      `;
    }
  }}
`;
const PomoBtnText = styled.div``;
const PomoTimer = styled.div`
  background-color: transparent;
  border-left: 1px solid #555;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`;

function PomodoroButton({ onClick, value, sessionStatus }) {
  let newVal = value;
  if (typeof newVal == "number") newVal = newVal + " Mins";

  return (
    <PomoButtonContainer sessionStatus={sessionStatus} onClick={onClick}>
      <PomoBtnText>Break After</PomoBtnText>
      <PomoTimer>{newVal}</PomoTimer>
    </PomoButtonContainer>
  );
}
