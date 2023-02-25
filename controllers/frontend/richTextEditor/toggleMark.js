import { Editor, Text, Transforms } from "slate";
import isFormatActive from "./isFormatActive";

const toggleMark = (editor, format) => {
  const isActive = isFormatActive(editor, format);

  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};

export default toggleMark;
