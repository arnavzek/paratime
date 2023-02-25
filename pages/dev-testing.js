import { useEffect, useState } from "react";
import LoggedInBoilerplate from "../components/LoggedInBoilerplate";

export default function DevTesting({}) {
  const [mode, setMode] = useState("");

  useEffect(() => {
    let data = window.matchMedia("(display-mode: standalone)");
    console.log(data);
    setMode(JSON.stringify(data.matches));
  }, []);

  return (
    <LoggedInBoilerplate>
      <div>{mode}</div>
    </LoggedInBoilerplate>
  );
}
