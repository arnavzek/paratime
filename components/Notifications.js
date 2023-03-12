import WithHeader from "./WithHeader";
import { FiSearch } from "react-icons/fi";
import { serverLine } from "../controllers/frontend/serverLine";
import LoadingSection from "./LoadingSection";

import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;
const SearchBoxContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
  flex-direction: row;
  width: 90vw;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  height: 50px;
  @media (min-width: 800px) {
    width: calc(80vw - 20vw - 30px);
  }
`;
const SearchInput = styled.input`
  height: 50px;
  display: flex;
  color: #fff;
  padding-left: 15px;
  flex: 1;
  border: none;
  border: none;
  background-color: transparent;
`;
const SearchButton = styled.button`
  height: 50px;
  color: #fff;
  padding-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  border: none;
  font-size: 25px;
  background-color: transparent;
`;
const SearchResult = styled.div``;

const Notification = styled.div`
  background: #222;
  padding: 5px 15px;
  cursor: pointer;
  border-radius: 50px;

  ${({ seen }) => {
    if (!seen) return `background:#fff; color:#111;`;
  }}
`;

export default function Notifications() {
  const [res, setRes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    serverLine.get("notifications").then((data) => {
      setRes(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingSection />;

  return <Container>{renderResult()}</Container>;

  function renderResult() {
    if (!res) return [];
    if (!res.notifs) return [];
    return res.notifs.map((item) => {
      return getNotif({ item });
    });
  }

  function getNotif({ item }) {
    let seen = hasSeen(item.createdAt);

    if (item.type == "FOLLOW") {
      return (
        <Link href={"/profile/" + item.sender.username}>
          <Notification seen={seen} key={item.id}>
            {item.sender.username} started following you
          </Notification>
        </Link>
      );
    } else if (item.type == "LIKE") {
      return (
        <Link href={"/post/" + item.postID}>
          <Notification seen={seen} key={item.id}>
            {item.sender.username} started following you
          </Notification>
        </Link>
      );
    } else {
      return (
        <Link href={"/profile/" + item.sender.username}>
          <Notification seen={seen} key={item.id}>
            {item.sender.username} - {item.type}
          </Notification>
        </Link>
      );
    }
  }

  function hasSeen(createdAt) {
    let createdAtEpochs = new Date(createdAt).valueOf();
    let notificationsSeenAt = new Date(
      res.notificationsSeenAt ? res.notificationsSeenAt : 0
    ).valueOf();
    // console.log(createdAtEpochs, notificationsSeenAt);

    return createdAtEpochs < notificationsSeenAt;
  }
}
