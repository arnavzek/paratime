import styled from "styled-components";
import { FaGoogle } from "react-icons/fa";
import BarLoader from "./BarLoader";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { useAlert } from "react-alert";
import Context from "../Context";
import LoadingSection from "./LoadingSection";
import { serverLine } from "../controllers/frontend/serverLine";

const Button = styled.button`
  border: 1px solid;
  background: transparent;
  display: flex;
  flex-direction: row;
  color: var(--prominantColor);
  gap: 10px;
  align-items: center;
  padding: 14px 20px;
  cursor: pointer;
  border-radius: 25px;
`;

const ErrorBox = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 500px;
`;

function SendAuthCode() {
  const router = useRouter();

  let { dispatch } = useContext(Context);
  let [error, setError] = useState(false);

  useEffect(() => {
    if (router.isReady) sendCode();
  }, [router.query]);

  if (error) return <ErrorBox>{error}</ErrorBox>;
  return <LoadingSection />;

  function done() {
    dispatch({ type: "UPDATE", field: "loggedIn", value: true });
    window.location = "/";
  }

  function sendCode() {
    let location = window.location.origin + window.location.pathname;
    const { code } = router.query;
    console.log(code, router.query);
    serverLine
      .post("/cookie", { code, location })
      .then(done)
      .catch(({ message }) => {
        if (typeof message == "object") message = JSON.stringify(message);
        setError(message);
      });
  }
}

export default SendAuthCode;
