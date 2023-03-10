import Base from "../components/Base";
import TakeBreak from "../components/TakeBreak";
import WithHeader from "../components/WithHeader";

export default function handle() {
  return (
    <Base>
      <WithHeader>
        <TakeBreak />
      </WithHeader>
    </Base>
  );
}
