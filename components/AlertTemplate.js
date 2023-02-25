import { RiCloseFill } from "react-icons/ri";
import styled from "styled-components";

const Main = styled.div`
  background-color: var(--prominantColor);
  color: var(--dominantColor);
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 72px 0px #111111bf;
  font-family: Arial;
  width: 300px;
  margin: 25px;
  box-sizing: border-box;
`;

const Button = styled.div`
  color: var(--dominantColor);
  cursor: pointer;
  margin-left: 20px;
`;

const AlertTemplate = ({ message, options, style, close }) => {
  return (
    <Main>
      {options.type === "info"}
      {options.type === "success"}
      {options.type === "error"}
      <span style={{ flex: 2 }}>{message}</span>
      <Button onClick={close}>
        <RiCloseFill />
      </Button>
    </Main>
  );
};

export default AlertTemplate;
