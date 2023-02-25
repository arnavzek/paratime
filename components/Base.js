import Background from "./Background";
import Head from "next/head";
import { useRouter } from "next/router";
import styled, { TemplateProvider } from "styled-components";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "./AlertTemplate";
import { useEffect, useReducer, useState } from "react";
import reducer from "../reducer";
import Context from "../Context";
import DynamicForm from "./DynamicForm";
import getUserPreferences from "../controllers/frontend/getUserPreferences";
import getUserID from "../controllers/frontend/getUserID";
import { RiGoogleFill, RiGoogleLine } from "react-icons/ri";
import goToAuthScreen from "../controllers/frontend/goToAuthScreen";
import { serverLine } from "../controllers/frontend/serverLine";
import useSWR from "swr";
import Boilerplate from "./Boilerplate";
import Script from "next/script";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  containerStyle: {
    zIndex: 900,
    pointerEvents: "unset",
  },
  offset: "30px",
  transition: transitions.SCALE,
};

const Main = styled.div`
  padding: 0;
`;

export default function Base({
  children,
  headChildren,
  title,
  description,

  initialPageData,
  metadata,
}) {
  if (!title) title = "upon";
  if (!description) description = "Social Network for the productive";

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="keywords"
          content="social network professionals portfolio builder site builder"
        />

        <link rel="manifest" href="/manifest.json" />

        <link
          href="/icons/favicon-48-48.png"
          rel="icon"
          type="image/png"
          sizes="48x48"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />

        <meta name="description" content={description} />
        <link rel="icon" href="/icons/favicon-48-48.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={1}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={1}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          defer
          src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
        ></script>

        {metadata ? (
          <>
            <meta data-rh="true" property="og:title" content={metadata.title} />
            <meta data-rh="true" property="og:image" content={metadata.image} />
            <meta
              data-rh="true"
              property="og:description"
              content={metadata.description}
            />
            <meta data-rh="true" property="og:site_name" content="upon.one" />
          </>
        ) : null}

        {headChildren}
      </Head>
      <AlertProvider template={AlertTemplate} {...options}>
        <Boilerplate initialPageData={initialPageData}>{children}</Boilerplate>
      </AlertProvider>
    </div>
  );
}
