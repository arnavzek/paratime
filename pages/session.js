import { useRouter } from "next/router";
import nookies from "nookies";
import Base from "../components/Base";

import SessionPage from "../components/SessionPage";

export default function Handle() {
  return (
    <Base>
      <SessionPage />
    </Base>
  );
}
