import { useRouter } from "next/router";
import nookies from "nookies";
import Base from "../components/Base";

import SessionPage from "../components/SessionPage";
import WithHeader from "../components/WithHeader";

export default function Handle() {
  return (
    <Base>
      <WithHeader>
        <SessionPage />
      </WithHeader>
    </Base>
  );
}
