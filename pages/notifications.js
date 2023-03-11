import Base from "../components/Base";
import Notifications from "../components/Notifications";
import Search from "../components/Search";
import WithHeader from "../components/WithHeader";

export default function handle() {
  return (
    <Base>
      <WithHeader>
        <Notifications />
      </WithHeader>
    </Base>
  );
}
