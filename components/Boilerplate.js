import { useRouter } from "next/router";
import styled from "styled-components";
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
import { useAlert } from "react-alert";

// function Boilerplate({ children, initialPageData }) {
//   return "Hello";
// }

function Boilerplate({ children, initialPageData }) {
  const [loggedInUserID, setLoggedInUserID] = useState(null);
  const [formData, setFormData] = useState(false);
  const [pageData, setPageData] = useState(initialPageData);
  const router = useRouter();
  const alert = useAlert();

  const loggedInUser = useSWR("logged-in-user", serverLine.get);

  const [state, dispatch] = useReducer(reducer, getUserPreferences());

  useEffect(() => {
    let userID = getUserID();
    window.theRouter = router;

    if (userID) {
      setLoggedInUserID(userID);
    } else {
      setLoggedInUserID(false);
    }
  }, []);

  useEffect(() => {
    if (loggedInUser.error) {
      let e = loggedInUser.error;
      if (e.message == "Invalid user") window.location = window.location.origin;
    }
  }, [loggedInUser.error]);

  useEffect(() => {
    removeFormQuery();

    let data = getUserPreferences();
    dispatch({ type: "NEW_STATE", value: data });
    backFeatures();
  }, []);

  return (
    <Context.Provider
      value={{
        promptLogin,
        router,
        loggedInUserID,
        state,
        popupAlert: alert.show,
        pageData: pageData,
        setPageData: setPageData,
        updateLoggedInUser: loggedInUser.mutate,
        loggedInUser: loggedInUser.data,
        loggedInUserIsValidating: loggedInUser.isValidating,
        dispatch,
        setForm: setForm,
      }}
    >
      <DynamicForm setForm={setForm} formData={formData} />
      {children}
    </Context.Provider>
  );

  function promptLogin() {
    setFormData({
      title: "Please Login",
      options: [
        {
          icon: <RiGoogleFill />,
          name: "Login / Signup",
          onClick: goToAuthScreen,
        },
      ],
    });
  }

  function backFeatures() {
    addEventListener("popstate", (event) => {
      removeFormOnBack();
    });
  }

  function removeFormOnBack() {
    const formPage = getUrlQuery("formPage");
    if (!formPage) {
      setFormData(null);
    }
  }

  function getUrlQuery(field) {
    if (typeof window == "undefined") return null;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(field);
  }

  function setForm(data) {
    let path = window.location.pathname;
    let queryObj = getUrlQueryObject();

    if (getUrlQuery("formPage") && !data) {
      closeForm();
    } else if (!getUrlQuery("formPage")) {
      queryObj.formPage = "true";

      let thePath = removeLastSlash(path) + queryObjToUrl(queryObj);

      router.push(thePath, undefined, {
        shallow: true,
      });

      setFormData(data);
    } else {
      setFormData(data);
    }
  }

  function removeLastSlash(urlString) {
    if (urlString[urlString.length - 1] == "/") {
      return urlString.slice(0, urlString.length - 1);
    } else {
      return urlString;
    }
  }

  function queryObjToUrl(queryInput) {
    let newQueryUrl = "/?";
    let i = 0;
    let queryLen = Object.keys(queryInput).length;
    for (let key in queryInput) {
      if (queryInput[key]) {
        if (i == queryLen - 1) {
          newQueryUrl += `${key}=${queryInput[key]}`;
        } else {
          newQueryUrl += `${key}=${queryInput[key]}&`;
          i++;
        }
      }
    }

    return newQueryUrl;
  }

  function getUrlQueryObject() {
    let data = {};
    let raw = window.location.search.replace(/\?/gi, "").replace(/\//gi, "");
    if (!raw) return data;
    raw = raw.split("&");
    for (let itm of raw) {
      if (!itm) continue;
      itm = itm.split("=");
      if (itm.length == 2) {
        if (itm[1].trim()) {
          data[itm[0]] = itm[1];
        }
      }
    }
    return data;
  }

  function removeFormQuery() {
    //this prevents bug
    //what bug?
    //if url already has form query then
    //on setFormData query won't be pushed

    if (getUrlQuery("formPage")) {
      let path = window.location.pathname;
      let queryObj = getUrlQueryObject();
      delete queryObj.formPage;
      router.replace(path + queryObjToUrl(queryObj));
    }
  }

  function closeForm() {
    //sometimes it takes a few seconds to push the router
    //if user presses back before then user might go 2 pages back
    if (getUrlQuery("formPage")) {
      router.back();
    }
  }
}

export default Boilerplate;
