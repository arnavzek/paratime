import styled from "styled-components";
import Base from "../components/Base";
import Brand from "../components/Brand";
import SendAuthCode from "../components/SendAuthCode";

const Head = styled.div`
  padding-top: 25px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function AuthRedirect() {
  return (
    <Base hideHeader={true}>
      <Head>
        <Brand />
      </Head>

      <SendAuthCode />
    </Base>
  );
}
