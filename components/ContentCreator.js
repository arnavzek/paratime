import styled from "styled-components";
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
import ProgressBar from "./ProgressBar";
import toMinsOrHours from "../controllers/frontend/toMinOrHours";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// import ImageCapture from "image-capture";

const Container = styled.div``;
const Title = styled.div``;
const SubTitle = styled.div``;
const Buttons = styled.div``;
const Button = styled.button``;
const ImageSelector = styled.div``;
const ImageContainer = styled.div``;
const Acomplishment = styled.div``;
const Image = styled.img``;

export default function ContentCreator({ duration, imageBlobs, playSound }) {
  const { popupAlert } = useContext(Context);
  const [selectedBlobs, setSelectedBlobs] = useState([]);
  const [imagesUploaded, setImagesUploaded] = useState(0);
  const [postedContentID, setPostedContentID] = useState(false);
  const [uploadingStatus, setUploadingStatus] = useState(false);
  const [accomplishment, setAccomplishment] = useState("");

  useEffect(() => {
    playSound();
  }, []);

  let newImageBlobs = [...imageBlobs];
  newImageBlobs = newImageBlobs.reverse();

  let totalImages = selectedBlobs.length;

  let imagesAreUploading = (
    <>
      <SubTitle>
        Uploaded {imagesUploaded.length}/{totalImages}{" "}
      </SubTitle>
      <ProgressBar completed={imagesUploaded.length} total={totalImages} />
    </>
  );

  let contentIsBeingPosted = (
    <>
      <SubTitle>Finalizing, please wait </SubTitle>
      <LoadingSection />
    </>
  );

  if (postedContentID)
    return (
      <Container>
        <Title>Session Posted!</Title>
        <Buttons>
          <Link href={"/"}>
            <Button>Go Home</Button>
          </Link>
          <Link href={"/post/" + postedContentID}>
            <Button>Visit Post</Button>
          </Link>
          <Link href="/take-break">
            <Button>Take a break</Button>
          </Link>
        </Buttons>
      </Container>
    );

  if (uploadingStatus)
    return (
      <Container>
        <Title>Uploading...</Title>
        {imagesUploaded.length < selectedBlobs
          ? imagesAreUploading
          : contentIsBeingPosted}
      </Container>
    );

  return (
    <Container>
      <Title>
        Congrats! on completing a {toMinsOrHours({ unparsedSeconds: duration })}
      </Title>

      <SubTitle>
        Now, you can turn this session into a post, select the images you like
        (at most 6), type what you accomplished in this session and press post
      </SubTitle>

      <ImageSelector>
        <Masonry columnsCount={4} gutter="10px">
          {newImageBlobs.map((item, i) => {
            return (
              <ImageContainer
                isSelected={selectedBlobs.includes(i)}
                onClick={selectDeselectImage(i)}
              >
                <Image
                  key={i}
                  src={URL.createObjectURL(item)}
                  style={{ width: "100%", display: "block" }}
                />
              </ImageContainer>
            );
          })}
        </Masonry>
      </ImageSelector>
      <Acomplishment value={accomplishment} onChange={updateAccomplishment} />
      <Button onClick={postContent}>Post</Button>
    </Container>
  );

  function selectDeselectImage(i) {
    return () => {
      if (selectedBlobs.includes(i)) {
        let newList = [...selectedBlobs];
        newList.slice(selectedBlobs.indexOf(i), 1);
        setSelectedBlobs(newList);
      } else {
        if (selectedBlobs.length >= 6) {
          return popupAlert("You can't select more than 6 images");
        }

        let newList = [...selectedBlobs];
        newList.push(i);
        setSelectedBlobs(newList);
      }
    };
  }

  function updateAccomplishment(e) {
    setAccomplishment(e.target.value);
  }

  async function postContent() {
    if (!accomplishment)
      return popupAlert("Please! write the accomplishment of this session");
    if (!selectedBlobs) return popupAlert("Please! Select Images");

    if (accomplishment.length < 5)
      return popupAlert("Please! write proper accomplishment");
    if (selectedBlobs.length < 2)
      return popupAlert("Please! select atleast 2 images");

    setUploadingStatus(true);

    let uploadedImages = [];

    for (let index of selectedBlobs) {
      let uploadedImage = await compressAndUploadFile(
        null,
        newImageBlobs[index]
      );
      uploadedImages.push(uploadedImage.fileName);
      setImagesUploaded([...imagesUploaded, uploadedImage.fileName]);
    }

    let newPost = await serverLine.post("content", {
      images: uploadedImages,
      title: accomplishment,
      durationInMins: duration,
    });

    setPostedContentID(newPost.id);
  }
}
