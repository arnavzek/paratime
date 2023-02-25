import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 0 0;
  overflow: hidden;
  overflow-y: scroll;
  color: var(--prominantColor);
  background-color: var(--dominantColor);
  background-size: 100% 130%;
`;

function Background({ children }) {
  return <Container>{children}</Container>;
}

export default Background;
