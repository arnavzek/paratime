import "../styles/globals.css";
import Router from "next/router";
import NextNProgress from "nextjs-progressbar";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [progressbarStatus, setProgressBarStatus] = useState(true);

  return (
    <>
      {progressbarStatus ? (
        <NextNProgress
          color="var(--homeProminantColor)"
          options={{ showSpinner: false, color: "#888" }}
        />
      ) : null}

      <Component
        hello={"hello"}
        {...pageProps}
        toggleProgressBar={toggleProgressBar}
      />
    </>
  );

  function toggleProgressBar() {
    setProgressBarStatus(!progressbarStatus);
  }
}

export default MyApp;
