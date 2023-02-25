import styled from "styled-components";

const Container = styled.div``;
const Title = styled.h3`
  margin: 0;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px 20px;
`;
const Main = styled.div`
  width: 100vw;
  padding: 20px;
`;
const CollegeSuggestions = styled.div``;
const Input = styled.input`
  width: 100%;
  border: 1px solid #fff;
  background-color: transparent;
  height: 50px;
  padding-left: 20px;
  color: #fff;
  border-radius: 5px;
`;
const SubmitButton = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px 0;
  border-radius: 15px 15px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SubTitle = styled.h3`
  font-weight: 100;
`;

const SuggestionList = styled.div``;

const Heading = styled.h2`
  font-weight: 900;
`;

export default function OnBoarding() {
  return (
    <Container>
      <Title>Paratime</Title>

      <Main>
        <Heading>Select College</Heading>
        <Input placeholder="Select College" />

        <CollegeSuggestions>
          <SubTitle>Suggestions</SubTitle>
          <SuggestionList></SuggestionList>
        </CollegeSuggestions>
        <SubmitButton>Submit</SubmitButton>
      </Main>
    </Container>
  );
}
