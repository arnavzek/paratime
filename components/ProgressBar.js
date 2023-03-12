import styled from "styled-components";

const Container = styled.div`
  width: 62vw;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  height: 5px;
`;
const Progress = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #fff;
`;
// import ImageCapture from "image-capture";
export default function ProgressBar({ completed, total }) {
  return (
    <Container>
      <Progress style={{ width: (completed / total) * 100 }} />
    </Container>
  );
}
