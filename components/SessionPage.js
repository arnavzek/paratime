import styled from "styled-components";
import UserBox from "./UserBox";
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
import initScreenshotCapture from "../controllers/initScreenshotCapture";

// import ImageCapture from "image-capture";

const Container = styled.div`
  @media (min-width: 800px) {
    width: 80vw;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
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
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  gap: 20px;
`;
const BottomButtons = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: row;
  backdrop-filter: blur(50px);
  border-radius: 5px;
  gap: 20px;
  background-color: #222;
  justify-content: space-between;

  @media (min-width: 800px) {
    flex-direction: column;
    display: flex;
    width: 18vw;
    height: calc(100vh - 120px);
    justify-content: space-between;
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
    gap: calc(18vw / 3);
    height: auto;
    padding-bottom: 50px;
    font-size: calc(18vw / 3);
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
  width: calc(45vw - 15px);
  padding: 0 15px;
  border-radius: 5px;
  overflow: hidden;
  height: 35px;
  border: none;
  align-items: center;
  font-size: 15px;
  background-color: #111;

  @media (min-width: 800px) {
    width: 100%;
  }
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

const SectionHeading = styled.h1`
  text-align: center;
  font-weight: 100;
  margin-top: 0;
`;

const pomodoroOptions = [30, 60, 120, "OFF"];

const Message = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const MessageContainer = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 50px;
  align-items: center;
`;

const RankingSection = styled.div`
  @media (min-width: 800px) {
    width: auto;
    padding-left: 50px;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const AllowScreenshare = styled.button`
  background: transparent;
  padding: 15px 25px;
  font-size: 15px;
  cursor: pointer;
  color: #fff;
  border: 1px solid #999;
  border-radius: 50px;
`;

export default function SessionPage() {
  const [sessionStatus, setSessionStatus] = useState("OFF");
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const { loggedInUserID } = useContext(Context);
  const [error, setError] = useState(false);
  const [sessionTag, setSessionTag] = useState("work");
  const [pomodoroTimer, setPodoroTimer] = useState(30);
  const [timer, setTimer] = useState(60 * 60);
  const [screenshareEnabled, setScreenshareStatus] = useState(false);
  const router = useRouter();

  if (typeof window !== "undefined") {
    window.sessionStatus = sessionStatus;
    window.webcamEnabled = webcamEnabled;
    window.timer = timer;
    window.pomodoroTimer = pomodoroTimer;
  }

  useEffect(handleVideoPermission, []);

  useEffect(() => {
    if (router.isReady) {
      const { duration } = router.query;

      if (webcamEnabled && screenshareEnabled) {
        setSessionStatus("ON");
        setTimer(parseInt(duration) * 60);
      }
    }
  }, [router.query, webcamEnabled, screenshareEnabled]);

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
        setTimer(window.timer - 1);

        let mins = window.timer / 60;

        if (window.timer <= 0) {
          pauseSession();
          router.push("/break");
        }
      }
    }, 1000);
  }, []);

  let minAndSecs = getMinAndSeconds();

  if (!loggedInUserID)
    return (
      <MessageContainer>
        <Message>Login Required</Message>
      </MessageContainer>
    );

  if (error == "Screenshare Error: Permission denied")
    return (
      <MessageContainer>
        <Message>
          You denied screenshare permission. Without screenshare the session
          can't start, this is meant to prevent cheating
        </Message>

        <AllowScreenshare onClick={allowScreenshare}>
          Allow Screenshare
        </AllowScreenshare>
      </MessageContainer>
    );

  if (error)
    return (
      <MessageContainer>
        <Message>{error}</Message>
      </MessageContainer>
    );

  if (!webcamEnabled)
    return (
      <MessageContainer>
        <Message>Webcam Required</Message>
      </MessageContainer>
    );

  if (!screenshareEnabled)
    return (
      <MessageContainer>
        <Message>
          Please allow Screenshare so that there is evidence of your work. Don't
          worry about privacy we will blur the screenshare
        </Message>

        <AllowScreenshare onClick={allowScreenshare}>
          Allow Screenshare
        </AllowScreenshare>
      </MessageContainer>
    );

  if (!sessionData) return <LoadingSection />;

  // if (screenshareEnabled)
  //   return (
  //     <>
  //       <video
  //         src={window.screenshareStream}
  //         id="gum-local"
  //         autoplay
  //         playsinline
  //         muted
  //       ></video>
  //       <button onClick={takeScreenshot}>Take screenshot</button>

  //       <img src={webcamImage} />
  //     </>
  //   );

  return (
    <Container>
      <BottomButtons>
        <Buttons>
          <Link href="/">
            <Header>
              <MdOutlineArrowBackIosNew />
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

      <RankingSection>
        <SectionHeading>Ranking</SectionHeading>

        <Main>
          <UserBox item={getYou()} />
          {renderUsers()}
        </Main>
      </RankingSection>
    </Container>
  );

  function allowScreenshare() {
    initScreenshotCapture(onSuccess, onError, onEnd);

    function onEnd() {
      setScreenshareStatus(false);
      pauseSession();
    }

    function onSuccess() {
      setScreenshareStatus(true);

      if (error == "Screenshare Error: Permission denied") {
        setError(null);
      }
    }

    function onError(err) {
      console.log(err);
      setError("Screenshare Error: " + err.message);
    }
  }

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

  async function makePostAttendanceReq(blob, newSessionData) {
    let imageUploaded = await compressAndUploadFile(
      newSessionData.imageToRemove,
      blob
    );

    console.log(imageUploaded, getImageURL(imageUploaded.fileName));
    serverLine.post("/attendance", {
      newImage: imageUploaded.fileName,
      sessionTag: sessionTag,
      imageToRemove: newSessionData.imageToRemove,
    });
  }

  function takeScreenshot(newSessionData) {
    window.captureScreenshot().then((blob, itemURL) => {
      console.log(itemURL);
      console.log("Screenshot captured");

      blob.name = "screenshare.jpeg";
      makePostAttendanceReq(blob, newSessionData);
    });
  }

  function captureWebcamImage(newSessionData) {
    let videoDevice = theMediaSteam.getVideoTracks()[0];
    let captureDevice = new ImageCapture(videoDevice);

    if (captureDevice) {
      console.log("Taking a photo");
      captureDevice
        .takePhoto()
        .then(async (blob) => {
          console.log(blob);
          console.log(window.URL.createObjectURL(blob));

          try {
            blob.name = "webcam.jpeg";
            makePostAttendanceReq(blob, newSessionData);
          } catch (e) {
            return console.log(e);
          }
        })
        .catch(console.log);
    }
  }

  async function postAttendance(newSessionData) {
    if (!loggedInUserID) return;
    if (!window.theMediaSteam) return;
    if (!webcamEnabled) return;
    if (!screenshareEnabled) return;

    if (window.webcamTurn) {
      captureWebcamImage(newSessionData);
    } else {
      takeScreenshot(newSessionData);
    }

    window.webcamTurn = window.webcamTurn ? false : true;
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
        users.push(<UserBox item={{ ...item, rank: index + 1 }} />);
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
