import LinksEditor from "../../../components/editorPanel/LinksEditor";

export default function openLinksEditor({
  setForm,
  pageData,
  setPageData,
  alert,
}) {
  let { profile } = pageData;

  let form = {
    component: <LinksEditor />,
  };

  setForm(form);
}
