import Base from "../components/Base";
import Search from "../components/Search";
import WithHeader from "../components/WithHeader";

export default function handle() {
  return (
    <Base>
      <WithHeader>
        <Search />
      </WithHeader>
    </Base>
  );
}
