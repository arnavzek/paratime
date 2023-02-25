import getProfileLink from "../getProfileLink";
import styled from "styled-components";
import checkPremiumUsernameAccess from "../../backend/utils/checkPremiumUsernameAccess";
import { useContext, useState } from "react";
import { VscClose } from "react-icons/vsc";
import { serverLine } from "../serverLine";
import Context from "../../../Context";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Padding = styled.div`
  padding: 40px 15px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 5px;
  padding: 8px;
  width: 100%;
  background: var(--translucentColor);
`;

const Input = styled.input`
  background: transparent;
  border: none;
  padding: 12px;
  font-weight: 500;
  text-transform: capitalize;
  width: 200px;
  outline: none;
  /* padding-left: 0; */
  font-size: 15px;
  opacity: 0.7;
`;

const SuffixPart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 6px;
  align-items: center;
  overflow: hidden;
  background: var(--translucentColor);
`;

const Suffix = styled.div`
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  opacity: 0.5;
  padding: 0 15px;
`;

const RemoveSuffixButton = styled.div`
  background: transparent;
  height: 100%;
  justify-content: center;
  align-items: center;
  opacity: 0.7;
  display: flex;
  cursor: pointer;
  padding: 0 15px;
  border-left: 1px solid var(--translucentColor);
`;

const SaveButton = styled.button`
  width: 100%;
  background: transparent;
  padding: 25px 0;
  border: none;
  cursor: pointer;
  background: var(--translucentColor);
  font-weight: 700;
`;

function UsernameForm() {
  const { pageData, setForm, popupAlert } = useContext(Context);
  let { profile } = pageData;
  let currentValue = profile.username;

  let [username, setUsername] = useState(getInitialData().uname);
  let [suffix, setSuffix] = useState(getInitialData().tag);

  let suffixPart = (
    <SuffixPart>
      <Suffix>{suffix}</Suffix>
      <RemoveSuffixButton onClick={howToRemoveSuffix}>
        <VscClose />
      </RemoveSuffixButton>
    </SuffixPart>
  );

  return (
    <Container>
      <Padding>
        <InputContainer>
          <Input value={username} onChange={valueChanged} />
          {suffix ? suffixPart : null}
        </InputContainer>
      </Padding>
      <SaveButton onClick={sendReq}>Save</SaveButton>
    </Container>
  );

  function addUsernameAndSuffix() {
    if (!suffix) return username;
    return username + suffix;
  }

  function howToRemoveSuffix() {
    popupAlert(
      "Buy Premium Username or get 100, to remove this suffix. we do this to prevent hoarding of usernames"
    );
  }

  function valueChanged(e) {
    setUsername(e.target.value);
  }

  function getInitialData() {
    let val = currentValue ? currentValue : profile.username;

    let uname = val;
    let tag = null;

    let hasPremiumUsername = checkPremiumUsernameAccess(profile);

    // console.log(hasPremiumUsername);
    if (!hasPremiumUsername) {
      uname = uname.substring(0, uname.length - 4);
      tag = val.substring(val.length - 4, val.length);
    }

    return { uname, tag };
  }

  function sendReq() {
    setForm({ loading: true });
    serverLine
      .patch(`/api/v1/profile/`, {
        changes: { username: addUsernameAndSuffix() },
        profileID: profile._id,
      })
      .then((newProfile) => {
        popupAlert("Changes Saved");
        window.location = getProfileLink({ username: newProfile.username });
      })
      .catch((e) => {
        setForm(null);
        popupAlert(e.message);
        console.log(e);
      });
  }
}

export default function openUsernameEditor({ setForm }) {
  let form = {
    component: [<UsernameForm />],
  };
  setForm(form);
}
