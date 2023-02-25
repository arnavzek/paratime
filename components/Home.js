import { useContext, useEffect, useState } from "react";
import Context from "../Context";
import LoggedInHome from "./LoggedInHome";
import LoggedOutHomePage from "./pages/LoggedOutHomePage";

export default function Home() {
  const { loggedInUserID } = useContext(Context);

  if (!loggedInUserID) return <LoggedOutHomePage />;

  return <LoggedInHome />;
}
