import WithHeader from "./WithHeader";
import { FiSearch } from "react-icons/fi";
import { serverLine } from "../controllers/frontend/serverLine";
import LoadingSection from "./LoadingSection";
import UserBox from "./UserBox";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div``;
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

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchRes, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(null);

  if (loading)
    return (
      <WithHeader>
        <LoadingSection />
      </WithHeader>
    );

  return (
    <WithHeader>
      <Container>
        <SearchBoxContainer>
          <SearchInput
            placeholder="Search Users"
            onKeyUp={detectEnter}
            onChange={updateQuery}
            value={searchQuery}
          />
          <SearchButton onClick={doSearch}>
            <FiSearch />
          </SearchButton>
        </SearchBoxContainer>
        <SearchResult>{renderResult()}</SearchResult>
      </Container>
    </WithHeader>
  );

  function renderResult() {
    if (!searchRes) return [];
    return searchRes.map((item) => {
      return <UserBox key={item.id} item={item} />;
    });
  }

  function detectEnter(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      doSearch(e.target.value);
    }
  }

  function updateQuery(e) {
    setSearchQuery(e.target.value);
  }

  function doSearch(newVal) {
    setLoading(true);
    let query = newVal ? newVal : searchQuery;
    serverLine.get("search/?query=" + query).then((data) => {
      setSearchResult(data);
      setLoading(false);
    });
  }
}
