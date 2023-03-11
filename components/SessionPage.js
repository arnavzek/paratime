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
import RankingSection from "./RankingSection";
import PostsSection from "./PostsSection";
import ContentCreator from "./ContentCreator";
import CapturedImages from "./CapturedImages";
import RankingSectionSmall from "./RankingSectionSmall";

// import ImageCapture from "image-capture";

const Container = styled.div`
  @media (min-width: 800px) {
    width: calc(80vw);
    flex-direction: row;
    display: flex;
    gap: 50px;
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
  display: none;

  @media (min-width: 800px) {
    display: flex;
  }
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
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 50px;

  @media (max-width: 800px) {
    margin-top: 50px;
  }

  @media (min-width: 800px) {
    height: calc(100vh - 120px);
    overflow-y: scroll;
  }
`;
const BottomButtons = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column-reverse;
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
  flex-direction: row;
  font-size: 52px;
  justify-content: space-between;

  @media (min-width: 800px) {
    flex-direction: column;
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
  justify-content: space-between;
  flex-direction: row;
  gap: 25px;

  @media (min-width: 800px) {
    flex-direction: column;
  }
`;
const Button = styled.button`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  color: #fff;
  width: auto;
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
  padding: 10px 10px;
  flex: 1;
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

// const RankingSection = styled.div`
//   margin-top: 50px;

//   @media (min-width: 800px) {
//     margin: 0;
//     width: auto;
//     padding-left: 50px;
//     display: flex;
//     flex: 1;
//     flex-direction: column;
//     align-items: flex-start;
//   }
// `;

const AllowScreenshare = styled.button`
  background: transparent;
  padding: 15px 25px;
  font-size: 15px;
  cursor: pointer;
  color: #fff;
  border: 1px solid #999;
  border-radius: 50px;
`;

const Tags = styled.div`
  display: grid;
  gap: 2px;
  background-color: #222;
  border-radius: 5px;
  overflow: hidden;
  grid-template-columns: 1fr 1fr;
`;

const Tag = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;
  text-transform: capitalize;
  height: 35px;
  border-radius: 0;
  ${({ highlight }) => {
    if (highlight)
      return `
      background-color:#fff;
      color:#111;
    `;
  }}
`;

let tags = ["studying", "work", "programming", "art"];

export default function SessionPage() {
  const [sessionStatus, setSessionStatus] = useState("OFF");
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const { loggedInUserID } = useContext(Context);
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(60 * 60);
  const [screenshareEnabled, setScreenshareStatus] = useState(false);

  const router = useRouter();

  if (typeof window !== "undefined") {
    window.sessionStatus = sessionStatus;
    window.webcamEnabled = webcamEnabled;
    window.timer = timer;
    window.screenshareEnabled = screenshareEnabled;
  }

  useEffect(handleVideoPermission, []);

  useEffect(() => {
    return handleUnmount;
  }, []);

  useEffect(() => {
    if (router.isReady) {
      const { duration } = router.query;

      let innerWidth = window.innerWidth;

      if (webcamEnabled && (screenshareEnabled || innerWidth > 800)) {
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
      fetchSessionData().then(setSessionData);
      postAttendance();
    }

    doIt();

    window.featchInterval = setInterval(() => {
      console.log("THE INVE", window.sessionStatus);
      if (window.sessionStatus == "ON") {
        doIt();
      }
    }, 5000);
  }, [sessionStatus]);

  useEffect(() => {
    if (window.timerController) {
      window.clearInterval(window.timerController);
    }

    window.timerController = setInterval(() => {
      if (window.sessionStatus == "ON") {
        setTimer(window.timer - 1);

        if (window.timer <= 0) {
          // pauseSession();
          setSessionStatus("ENDED");

          // router.push("/break");
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
          {`You denied screenshare permission. Without screenshare the session
          can't start, this is meant to prevent cheating. Don't worry screenshot will only be posted after your approval`}
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
          {
            "Please allow Screenshare so that there is evidence of your work. Don't worry about privacy, it will only be posted after your approval"
          }
        </Message>

        <AllowScreenshare onClick={allowScreenshare}>
          Allow Screenshare
        </AllowScreenshare>
      </MessageContainer>
    );

  if (!sessionData) return <LoadingSection />;

  // if (sessionData == "ENDED")
  //   return <ContentCreator duration={getDuration()} imageBlobs={imagesBlobs} />;

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
        </Buttons>
        <Timer>
          <Time>{minAndSecs.mins}</Time>
          <Time>{minAndSecs.secs}</Time>
        </Timer>
      </BottomButtons>

      <Main>
        <RankingSectionSmall
          me={sessionData.me}
          followingUsers={sessionData.followingUsers}
        />
        <CapturedImages imageBlobs={getImageBlobs()} />
      </Main>
    </Container>
  );

  function getImageBlobs() {
    if (typeof window == "undefined") return [];
    if (!window.imageBlobList) return [];
    return window.imageBlobList;
  }

  function getDuration() {
    const { duration } = router.query;
    let total = parseInt(duration) * 60;
    return timer - total;
  }

  function handleUnmount() {
    console.log("un onmounting");
    if (window.screenshareStream) {
      var tracks = screenshareStream.getVideoTracks();
      for (var i = 0; i < tracks.length; i++) tracks[i].stop();
    }

    if (window.theMediaSteam) {
      var tracks = theMediaSteam.getVideoTracks();
      for (var i = 0; i < tracks.length; i++) tracks[i].stop();
    }

    if (window.featchInterval) window.clearInterval(window.featchInterval);
  }

  function allowScreenshare() {
    initScreenshotCapture(onSuccess, onError, onEnd);

    function onEnd() {
      console.log("DISABLED SCREEN SHARE");
      setScreenshareStatus(false);
      pauseSession();
    }

    function onSuccess() {
      console.log("ENABLED SCREEN SHARE");
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

  async function pushBlob(blob) {
    if (!window.imageBlobList) window.imageBlobList = [];
    window.imageBlobList.push(blob);
  }

  function takeScreenshot() {
    window.captureScreenshot().then((blob, itemURL) => {
      console.log(itemURL);
      console.log("Screenshot captured");

      blob.name = "screenshare.jpeg";
      pushBlob(blob);
    });
  }

  function captureWebcamImage() {
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
            pushBlob(blob);
          } catch (e) {
            return console.log(e);
          }
        })
        .catch(console.log);
    }
  }

  async function postAttendance() {
    console.log("Attempt Posting attendance...", window.screenshareEnabled);
    if (!loggedInUserID) return;
    if (!window.theMediaSteam) return;
    if (!window.webcamEnabled) return;

    let innerWidth = window.innerWidth;

    if (!window.screenshareEnabled && innerWidth > 800) return;

    console.log("Posting attendance");

    captureWebcamImage();
    takeScreenshot();
    serverLine.post("/attendance");
  }

  function startSession() {
    setSessionStatus("ON");
  }

  function pauseSession() {
    setSessionStatus("OFF");
  }

  function endSession() {
    setSessionStatus("ENDED");
    // setTimer(0);
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
          <EvenButton onClick={endSession}>
            <ButtonIcon>
              <BsStopFill />
            </ButtonIcon>
            <ButtonText>End Session</ButtonText>
          </EvenButton>
        </>
      );

    return (
      <>
        <EvenButton onClick={pauseSession}>
          <ButtonIcon>
            <AiOutlinePause />
          </ButtonIcon>
          <ButtonText>Pause</ButtonText>
        </EvenButton>
        <EvenButton onClick={endSession}>
          <ButtonIcon>
            <BsStopFill />
          </ButtonIcon>
          <ButtonText>End Session</ButtonText>
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
