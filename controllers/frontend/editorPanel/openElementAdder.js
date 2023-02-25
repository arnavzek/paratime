import ElementAdder from "../../../components/editorPanel/ElementAdder";

export default function openElementAdder({
  setForm,
  pageData,
  setPageData,
  atBottom,
}) {
  let { profile } = pageData;

  let form = {
    component: <ElementAdder atBottom={atBottom} />,
  };

  setForm(form);
}
