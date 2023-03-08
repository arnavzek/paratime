import { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import Context from "../Context";
import { serverLine } from "../controllers/frontend/serverLine";

const Button = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  font-size: 18px;
  padding: 10px 25px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  border: none;
`;

export default function FollowButton({ initialStatus, receiverUserID }) {
  const [status, setStatus] = useState(initialStatus);
  const { loggedInUserID } = useContext(Context);

  if (receiverUserID == loggedInUserID) return null;

  return <Button onClick={onClick}>{status ? "Following" : "Follow"}</Button>;

  function onClick() {
    setStatus(status ? false : true);
    serverLine.post("/follow", { receiverUserID: receiverUserID });
  }
}
