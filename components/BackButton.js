import styled from "styled-components";
import { MdKeyboardArrowLeft } from "react-icons/md";

const Button = styled.button`
  cursor: pointer;

  display: flex;
  background: transparent;
  font-size: 15px;
  margin-top: 0px;
  border: none;
  color: var(--prominantColor);
  background-color: var(--translucentColor);
  width: auto;
  padding: 0 10px;
  padding-right: 20px;
  height: 40px;
  text-align: left;
  margin-bottom: 0;
  border-radius: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font-size: 13px;
  text-transform: capitalize;
  font-weight: 950;
`;

const Icon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  font-size: 18px;
`;

function BackButton({ title, onClick }) {
  return (
    <Button onClick={onClick}>
      <Icon>
        <MdKeyboardArrowLeft />
      </Icon>

      <Text>{title}</Text>
    </Button>
  );
}

export default BackButton;
